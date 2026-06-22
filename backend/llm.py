"""Local LLM integration for StudyPilot.

The backend talks to Ollama on localhost and falls back to the offline syllabus
knowledge base when the runtime or chosen model is unavailable.
"""

from __future__ import annotations

import json
import os
from urllib.error import URLError
from urllib.request import Request, urlopen


OLLAMA_BASE_URL = os.getenv("STUDYPILOT_OLLAMA_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("STUDYPILOT_LLM_MODEL", "tinyllama")


def ollama_is_available(timeout: float = 1.5) -> bool:
    try:
        with urlopen(f"{OLLAMA_BASE_URL}/api/tags", timeout=timeout) as response:
            return response.status == 200
    except Exception:
        return False


def generate_with_ollama(system_prompt: str, user_prompt: str, model: str | None = None, timeout: float = 30.0) -> str | None:
    payload = {
        "model": model or OLLAMA_MODEL,
        "stream": False,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "options": {
            "temperature": 0.2,
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
