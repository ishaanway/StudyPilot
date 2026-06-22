"""Local LLM integration for StudyPilot.

StudyPilot uses Ollama as the default and preferred text generation engine.
A local Hugging Face/transformers model can still be enabled explicitly for
developer experiments, but the production path is Ollama-first so the tutor
behaves consistently across chat, greetings, and explanation prompts.
"""

from __future__ import annotations

import json
import os
from urllib.error import URLError
from urllib.request import Request, urlopen


OLLAMA_BASE_URL = os.getenv("STUDYPILOT_OLLAMA_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv(
    "STUDYPILOT_OLLAMA_MODEL",
    os.getenv("STUDYPILOT_LLM_MODEL", "qwen2.5:1.5b"),
)
LLM_PROVIDER = os.getenv("STUDYPILOT_LLM_PROVIDER", "ollama").strip().lower()
HF_MODEL_PATH = os.getenv(
    "STUDYPILOT_LLM_MODEL_PATH",
    os.getenv("STUDYPILOT_FINE_TUNED_MODEL_PATH", ""),
).strip()

_TRANSFORMERS_CACHE: dict[str, object | None] = {
    "model_path": None,
    "tokenizer": None,
    "model": None,
}


def ollama_is_available(timeout: float = 1.5) -> bool:
    try:
        with urlopen(f"{OLLAMA_BASE_URL}/api/tags", timeout=timeout) as response:
            return response.status == 200
    except Exception:
        return False


def generate_with_ollama(
    system_prompt: str,
    user_prompt: str,
    model: str | None = None,
    timeout: float = 90.0,
) -> str | None:
    payload = {
        "model": model or OLLAMA_MODEL,
        "stream": False,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "options": {
            "temperature": 0.2,
            "num_predict": 180,
        },
    }
    request = Request(
        f"{OLLAMA_BASE_URL}/api/chat",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urlopen(request, timeout=timeout) as response:
            data = json.loads(response.read().decode("utf-8"))
            message = data.get("message", {})
            content = message.get("content")
            return content.strip() if isinstance(content, str) else None
    except (URLError, TimeoutError, json.JSONDecodeError, OSError):
        return None


def _load_transformers_model(model_path: str):
    if not model_path:
        return None, None

    if _TRANSFORMERS_CACHE["model_path"] == model_path:
        return _TRANSFORMERS_CACHE["tokenizer"], _TRANSFORMERS_CACHE["model"]

    try:
        import torch
        from transformers import AutoModelForCausalLM, AutoTokenizer
    except Exception:
        return None, None

    try:
        tokenizer = AutoTokenizer.from_pretrained(model_path, use_fast=True)
        model = AutoModelForCausalLM.from_pretrained(
            model_path,
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            low_cpu_mem_usage=True,
        )
        if hasattr(model, "eval"):
            model.eval()
        if hasattr(model, "to"):
            model = model.to(torch.device("cuda" if torch.cuda.is_available() else "cpu"))
    except Exception:
        return None, None

    _TRANSFORMERS_CACHE["model_path"] = model_path
    _TRANSFORMERS_CACHE["tokenizer"] = tokenizer
    _TRANSFORMERS_CACHE["model"] = model
    return tokenizer, model


def generate_with_transformers(
    system_prompt: str,
    user_prompt: str,
    model_path: str | None = None,
    max_new_tokens: int = 384,
) -> str | None:
    tokenizer, model = _load_transformers_model(model_path or HF_MODEL_PATH)
    if tokenizer is None or model is None:
        return None

    try:
        import torch
    except Exception:
        return None

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ]

    if hasattr(tokenizer, "apply_chat_template"):
        prompt_text = tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True,
        )
    else:
        prompt_text = f"{system_prompt}\n\nUser: {user_prompt}\nAssistant:"

    inputs = tokenizer(prompt_text, return_tensors="pt")
    device = next(model.parameters()).device if hasattr(model, "parameters") else torch.device("cpu")
    inputs = {key: value.to(device) for key, value in inputs.items()}

    try:
        with torch.no_grad():
            generated = model.generate(
                **inputs,
                max_new_tokens=max_new_tokens,
                do_sample=False,
                pad_token_id=getattr(tokenizer, "eos_token_id", None),
            )
        prompt_length = inputs["input_ids"].shape[-1]
        text = tokenizer.decode(generated[0][prompt_length:], skip_special_tokens=True).strip()
        return text or None
    except Exception:
        return None


def generate_tutor_response(system_prompt: str, user_prompt: str) -> tuple[str | None, str]:
    """Generate a tutor response using the configured local model stack."""

    provider = LLM_PROVIDER
    if provider in {"ollama", "auto", ""} or provider not in {"transformers", "hf"}:
        if ollama_is_available():
            response = generate_with_ollama(system_prompt, user_prompt)
            if response:
                return response, "ollama"

    if provider in {"transformers", "hf"}:
        response = generate_with_transformers(system_prompt, user_prompt, HF_MODEL_PATH)
        if response:
            return response, "transformers"

    return None, "offline_knowledge"
