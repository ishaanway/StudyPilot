"""NCERT library catalog and local cache helpers."""

from __future__ import annotations

import json
import re
from functools import lru_cache
from pathlib import Path
from typing import Any
from urllib.request import urlopen


PROJECT_ROOT = Path(__file__).resolve().parent.parent
MANIFEST_PATH = PROJECT_ROOT / "docs" / "syllabus_sources" / "ncert_manifest.json"
CACHE_DIR = PROJECT_ROOT / "assets" / "books" / "ncert" / "cache"


def _slug(value: Any) -> str:
    return re.sub(r"[^a-z0-9]+", "_", str(value or "").strip().lower()).strip("_") or "item"


@lru_cache(maxsize=1)
def load_manifest() -> dict[str, Any]:
    if not MANIFEST_PATH.exists():
        return {"classes": []}
    return json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))


@lru_cache(maxsize=1)
def build_catalog() -> list[dict[str, Any]]:
    manifest = load_manifest()
    catalog: list[dict[str, Any]] = []

    for class_entry in manifest.get("classes", []):
        if not isinstance(class_entry, dict):
            continue
        grade = class_entry.get("grade")
        grade_label = class_entry.get("label") or f"Class {grade}"
        for subject_entry in class_entry.get("subjects", []):
            if not isinstance(subject_entry, dict):
                continue
            subject = subject_entry.get("subject") or "Unknown"
            for book_entry in subject_entry.get("books", []):
                if not isinstance(book_entry, dict):
                    continue
                book_title = book_entry.get("title") or subject
                chapters = [chapter for chapter in book_entry.get("chapters", []) if isinstance(chapter, dict)]
                for chapter_index, chapter in enumerate(chapters):
                    pdf_url = chapter.get("pdf_url") or ""
                    page_url = chapter.get("page_url") or book_entry.get("page_url") or ""
                    label = chapter.get("label") or f"Chapter {chapter_index + 1}"
                    item_id = _slug(f"g{grade}_{subject}_{book_title}_{label}")
                    filename = f"{item_id}.pdf"
                    catalog.append(
                        {
                            "id": item_id,
                            "grade": grade,
                            "grade_label": grade_label,
                            "subject": subject,
                            "book_title": book_title,
                            "chapter_label": label,
                            "chapter_index": chapter_index + 1,
                            "page_url": page_url,
                            "pdf_url": pdf_url,
                            "cache_file": filename,
                            "local_url": f"/api/library/books/{item_id}/file",
                            "downloaded": (CACHE_DIR / filename).exists(),
                        }
                    )

    return catalog


def refresh_catalog_state() -> list[dict[str, Any]]:
    catalog = build_catalog()
    refreshed: list[dict[str, Any]] = []
    for item in catalog:
        refreshed.append({**item, "downloaded": (CACHE_DIR / str(item["cache_file"])).exists()})
    return refreshed


def find_catalog_item(item_id: str) -> dict[str, Any] | None:
    item_id = _slug(item_id)
    for item in build_catalog():
        if item.get("id") == item_id:
            item = {**item, "downloaded": (CACHE_DIR / str(item["cache_file"])).exists()}
            return item
    return None


def filtered_catalog(
    grade: int | None = None,
    subject: str | None = None,
    query: str | None = None,
    downloaded: bool | None = None,
) -> list[dict[str, Any]]:
    items = refresh_catalog_state()
    subject_lower = (subject or "").strip().lower()
    query_lower = (query or "").strip().lower()

    def matches(item: dict[str, Any]) -> bool:
        if grade is not None and int(item.get("grade") or 0) != int(grade):
            return False
        if subject_lower and subject_lower not in str(item.get("subject") or "").lower():
            return False
        if downloaded is True and not item.get("downloaded"):
            return False
        if downloaded is False and item.get("downloaded"):
            return False
        if query_lower:
            haystack = " ".join(
                [
                    str(item.get("grade_label") or ""),
                    str(item.get("subject") or ""),
                    str(item.get("book_title") or ""),
                    str(item.get("chapter_label") or ""),
                    str(item.get("page_url") or ""),
                ]
            ).lower()
            if query_lower not in haystack:
                return False
        return True

    return [item for item in items if matches(item)]


def book_file_path(item_id: str) -> Path:
    item = find_catalog_item(item_id)
    if not item:
        raise KeyError(f"Unknown book item: {item_id}")
    return CACHE_DIR / str(item["cache_file"])


def ensure_downloaded(item_id: str) -> dict[str, Any]:
    item = find_catalog_item(item_id)
    if not item:
        raise KeyError(f"Unknown book item: {item_id}")
    if not item.get("pdf_url"):
        raise ValueError("This NCERT entry does not have a downloadable PDF yet.")

    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    target = CACHE_DIR / str(item["cache_file"])
    if target.exists() and target.stat().st_size > 0:
        return {**item, "downloaded": True, "local_path": f"/api/library/books/{item['id']}/file"}

    with urlopen(str(item["pdf_url"]), timeout=90) as response:
        target.write_bytes(response.read())

    return {**item, "downloaded": True, "local_path": f"/api/library/books/{item['id']}/file"}


def delete_download(item_id: str) -> dict[str, Any]:
    item = find_catalog_item(item_id)
    if not item:
        raise KeyError(f"Unknown book item: {item_id}")

    target = CACHE_DIR / str(item["cache_file"])
    if target.exists():
        target.unlink()

    return {**item, "downloaded": False}
