"""Local LLM integration for StudyPilot.

StudyPilot prefers a Gemma-first Ollama tutor stack when it is available. The
tutor falls back across installed Ollama models so the app stays responsive
even if the preferred model is still downloading.
"""

from __future__ import annotations

import json
import os
from urllib.error import URLError
from urllib.request import Request, urlopen


OLLAMA_BASE_URL = os.getenv("STUDYPILOT_OLLAMA_URL", "http://127.0.0.1:11434")
LLM_PROVIDER = os.getenv("STUDYPILOT_LLM_PROVIDER", "ollama").strip().lower()


def _dedupe_models(models: list[str]) -> list[str]:
    ordered: list[str] = []
    seen: set[str] = set()
    for model in models:
        cleaned = model.strip()
        if not cleaned or cleaned in seen:
            continue
        ordered.append(cleaned)
        seen.add(cleaned)
    return ordered


OLLAMA_MODEL_PREFERENCE = _dedupe_models(
    [
        os.getenv("STUDYPILOT_OLLAMA_MODEL", "").strip(),
        os.getenv("STUDYPILOT_LLM_MODEL", "").strip(),
        "qwen2.5:1.5b",
        "gemma3:4b",
        "gemma3:1b",
        "gemma3:12b",
        "gemma2:9b",
        "gemma2:2b",
        "qwen3:8b",
        "llama3.1:8b",
        "phi4",
        "tinyllama:latest",
    ]
)
OLLAMA_MODEL = OLLAMA_MODEL_PREFERENCE[0] if OLLAMA_MODEL_PREFERENCE else "gemma3:4b"
OLLAMA_REQUEST_TIMEOUT = float(os.getenv("STUDYPILOT_OLLAMA_TIMEOUT", "20"))


def _is_meaningful_json_response(response: str) -> bool:
    text = (response or "").strip()
    if not text:
        return False
    if text in {"{}", "[]"}:
        return False
    return True

def ollama_is_available(timeout: float = 1.5) -> bool:
    try:
        with urlopen(f"{OLLAMA_BASE_URL}/api/tags", timeout=timeout) as response:
            return response.status == 200
    except Exception:
        return False


def _installed_ollama_models(timeout: float = 3.0) -> set[str]:
    try:
        with urlopen(f"{OLLAMA_BASE_URL}/api/tags", timeout=timeout) as response:
            if response.status != 200:
                return set()
            data = json.loads(response.read().decode("utf-8"))
    except Exception:
        return set()

    models = data.get("models", [])
    if not isinstance(models, list):
        return set()

    installed: set[str] = set()
    for model in models:
        if isinstance(model, dict):
            name = model.get("name")
            if isinstance(name, str) and name.strip():
                installed.add(name.strip())
            model_name = model.get("model")
            if isinstance(model_name, str) and model_name.strip():
                installed.add(model_name.strip())
    return installed


def _available_ollama_models(timeout: float = 3.0) -> list[str]:
    installed_models = _installed_ollama_models(timeout=timeout)
    if not installed_models:
        return []

    ordered: list[str] = []
    seen: set[str] = set()

    for model in OLLAMA_MODEL_PREFERENCE:
        if model in installed_models and model not in seen:
            ordered.append(model)
            seen.add(model)

    for model in sorted(installed_models, key=_model_sort_key):
        if model not in seen:
            ordered.append(model)
            seen.add(model)

    return ordered


def _pretty_model_label(model_name: str) -> str:
    lower = model_name.lower()
    if lower.startswith("gemma"):
        return f"Gemma - {model_name}"
    if lower.startswith("phi"):
        return f"Phi - {model_name}"
    if lower.startswith("qwen"):
        return f"Qwen - {model_name}"
    if lower.startswith("mistral"):
        return f"Mistral - {model_name}"
    if lower.startswith("llama"):
        return f"Llama - {model_name}"
    if lower.startswith("tinyllama"):
        return f"TinyLlama - {model_name}"
    return model_name


def _model_sort_key(model_name: str) -> tuple[int, str]:
    lower = model_name.lower()
    if lower.startswith("gemma"):
        priority = 0
    elif lower.startswith("qwen"):
        priority = 1
    elif lower.startswith("llama"):
        priority = 2
    elif lower.startswith("phi"):
        priority = 3
    elif lower.startswith("mistral"):
        priority = 4
    elif lower.startswith("tinyllama"):
        priority = 9
    else:
        priority = 5
    return priority, lower


def list_local_model_options() -> list[dict[str, str | bool]]:
    options: list[dict[str, str | bool]] = [
        {
            "provider": "auto",
            "model": "",
            "label": "Auto",
            "description": "Use the best available local model and fail over automatically.",
            "available": True,
            "recommended": True,
        }
    ]

    ollama_models = _available_ollama_models()
    for index, model_name in enumerate(ollama_models):
        options.append(
            {
                "provider": "ollama",
                "model": model_name,
                "label": _pretty_model_label(model_name),
                "description": "Installed Ollama model",
                "available": True,
                "recommended": index == 0,
            }
        )

    return options


def generate_with_ollama(
    system_prompt: str,
    user_prompt: str,
    model: str | None = None,
    timeout: float = OLLAMA_REQUEST_TIMEOUT,
    json_mode: bool = False,
) -> str | None:
    payload = {
        "model": model or OLLAMA_MODEL,
        "stream": False,
        "keep_alive": "10m",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "options": {
            "temperature": 0.2,
            "num_predict": 512 if json_mode else 768,
            "num_ctx": 4096,
        },
    }
    if json_mode:
        payload["format"] = "json"
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


def generate_with_ollama_fallbacks(
    system_prompt: str,
    user_prompt: str,
    models: list[str] | None = None,
    explicit_model: str | None = None,
    json_mode: bool = False,
) -> tuple[str | None, str | None]:
    preferred_models = _dedupe_models(models or OLLAMA_MODEL_PREFERENCE)
    installed_models = _available_ollama_models()
    if not installed_models:
        return None, None

    candidate_models: list[str] = []

    if explicit_model and explicit_model.strip() in installed_models:
        candidate_models.append(explicit_model.strip())

    for model in preferred_models:
        if model in installed_models and model not in candidate_models:
            candidate_models.append(model)

    for model in installed_models:
        if model not in candidate_models:
            candidate_models.append(model)

    candidate_models = candidate_models[:2]

    for model in candidate_models:
        response = generate_with_ollama(system_prompt, user_prompt, model=model, json_mode=json_mode)
        if response and (not json_mode or _is_meaningful_json_response(response)):
            return response, model

    return None, None


def generate_tutor_response(
    system_prompt: str,
    user_prompt: str,
    provider: str | None = None,
    model: str | None = None,
    json_mode: bool = False,
) -> tuple[str | None, str]:
    """Generate a tutor response using the configured local model stack."""

    return generate_tutor_response_with_choice(
        system_prompt,
        user_prompt,
        provider=provider,
        model=model,
        json_mode=json_mode,
    )


def generate_tutor_response_with_choice(
    system_prompt: str,
    user_prompt: str,
    provider: str | None = None,
    model: str | None = None,
    json_mode: bool = False,
) -> tuple[str | None, str]:
    requested_provider = (provider or LLM_PROVIDER or "auto").strip().lower()
    requested_model = (model or "").strip()
    if requested_model.lower() == "auto":
        requested_model = ""

    if requested_provider in {"ollama", "auto", ""}:
        if not ollama_is_available():
            return None, "offline_knowledge"

        preferred_models = []
        if requested_model:
            preferred_models.append(requested_model)
        preferred_models.extend(OLLAMA_MODEL_PREFERENCE)
        response, used_model = generate_with_ollama_fallbacks(
            system_prompt,
            user_prompt,
            models=_dedupe_models(preferred_models),
            explicit_model=requested_model or None,
            json_mode=json_mode,
        )
        if response:
            return response, f"ollama:{used_model}" if used_model else "ollama"

    return None, "offline_knowledge"
