"""Utilities for indexing local textbook PDFs into the tutor RAG store."""

from __future__ import annotations

import re
import sys
from functools import lru_cache
from pathlib import Path
from typing import Any

from backend.database import execute, fetch_one


PROJECT_ROOT = Path(__file__).resolve().parent.parent
BOOK_ROOT = PROJECT_ROOT / "assets" / "books"

LOCAL_LIBRARY_PROVIDER = "Local Library"
UPLOADED_PROVIDER = "Uploaded"

SUBJECT_HINTS: list[tuple[str, str]] = [
    ("social science", "Social Science"),
    ("social_science", "Social Science"),
    ("computer science", "Computer Science"),
    ("computer", "Computer Science"),
    ("mathematics", "Mathematics"),
    ("maths", "Mathematics"),
    ("math", "Mathematics"),
    ("science", "Science"),
    ("english", "English"),
    ("tamil", "Tamil"),
    ("sst", "Social Science"),
]


def _runtime_site_packages() -> list[Path]:
    home = Path.home()
    base = home / ".cache" / "codex-runtimes" / "codex-primary-runtime" / "dependencies" / "python" / "Lib" / "site-packages"
    return [base] if base.exists() else []


def _ensure_pdf_runtime() -> None:
    for path in _runtime_site_packages():
        path_str = str(path)
        if path_str not in sys.path:
            sys.path.append(path_str)


@lru_cache(maxsize=1)
def _load_pdf_reader():
    _ensure_pdf_runtime()
    from pypdf import PdfReader  # type: ignore

    return PdfReader


def _clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def _slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", value.lower()).strip("_")


def _title_case_from_stem(stem: str) -> str:
    cleaned = re.sub(r"[_\-]+", " ", stem)
    cleaned = _clean_text(cleaned)
    if not cleaned:
        return "Textbook"
    return cleaned.title()


def _guess_subject(stem: str, path_parts: tuple[str, ...]) -> str:
    lower = " ".join((*path_parts, stem)).lower()
    for token, subject in SUBJECT_HINTS:
        if token in lower:
            return subject
    return ""


def _guess_grade(stem: str, path_parts: tuple[str, ...]) -> int | None:
    lower = " ".join((*path_parts, stem)).lower()
    patterns = [
        r"\bgrade\s*([0-9]{1,2})\b",
        r"\bclass\s*([0-9]{1,2})\b",
        r"\bg\s*([0-9]{1,2})\b",
    ]
    for pattern in patterns:
        match = re.search(pattern, lower)
        if match:
            try:
                return int(match.group(1))
            except (TypeError, ValueError):
                continue
    return None


def _infer_metadata(pdf_path: Path) -> dict[str, Any]:
    path_parts = tuple(part.lower() for part in pdf_path.parts)
    stem = pdf_path.stem
    lower_stem = stem.lower()

    board = "CBSE"
    source_provider = LOCAL_LIBRARY_PROVIDER
    grade = _guess_grade(stem, path_parts)
    subject = _guess_subject(stem, path_parts)
    book_title = _title_case_from_stem(stem)
    chapter_number = None
    chapter_label = ""

    if "tamil" in path_parts or "samacheer" in lower_stem or "tn" in lower_stem:
        board = "Tamil Nadu"
        subject = subject or "Tamil"

    if "planner_chapters" in path_parts:
        board = "CBSE"
        match = re.search(r"([sm])_ch(\d+)", lower_stem)
        chapter_no = int(match.group(2)) if match else None
        chapter_number = chapter_no
        if match and match.group(1) == "s":
            subject = "Science"
            book_title = "Curiosity"
        elif match:
            subject = "Mathematics"
            book_title = "Ganita Prakash"
        chapter_label = f"Chapter {chapter_no}" if chapter_no else "Chapter"

    if "ncert" in path_parts and grade is not None:
        subject = subject or _guess_subject(stem, path_parts) or ""
        remainder = re.sub(r"^grade\s*\d+\s*[-_ ]*", "", lower_stem)
        remainder = re.sub(
            r"^(science|mathematics|maths|math|english|tamil|social science|social_science)\s*[-_ ]*",
            "",
            remainder,
        )
        remainder = remainder.replace("_", " ").replace("-", " ")
        remainder = re.sub(r"\b(pdf|book)\b", "", remainder, flags=re.I)
        remainder = _clean_text(remainder)
        if remainder:
            book_title = remainder.title()
        elif subject:
            book_title = subject

    if not subject:
        if "math" in lower_stem:
            subject = "Mathematics"
        elif "science" in lower_stem:
            subject = "Science"
        elif "english" in lower_stem:
            subject = "English"

    return {
        "board": board,
        "grade": grade,
        "subject": subject or "General",
        "book_title": book_title,
        "chapter_number": chapter_number,
        "chapter_label": chapter_label,
        "source_provider": source_provider,
        "local_path": str(pdf_path),
        "source_url": pdf_path.as_uri() if pdf_path.exists() else "",
    }


def _extract_pdf_chunks(pdf_path: Path, pages_per_chunk: int = 2) -> list[dict[str, Any]]:
    PdfReader = _load_pdf_reader()
    reader = PdfReader(str(pdf_path))

    chunks: list[dict[str, Any]] = []
    total_pages = len(reader.pages)
    for start in range(0, total_pages, max(1, pages_per_chunk)):
        end = min(start + max(1, pages_per_chunk), total_pages)
        texts: list[str] = []
        for page_index in range(start, end):
            try:
                page_text = reader.pages[page_index].extract_text() or ""
            except Exception:
                page_text = ""
            if page_text.strip():
                texts.append(page_text)

        combined = _clean_text("\n".join(texts))
        if combined:
            chunks.append(
                {
                    "title": f"Pages {start + 1}-{end}",
                    "content": combined,
                    "start_page": start + 1,
                    "end_page": end,
                }
            )

    return chunks


def _find_existing_root(local_path: str, source_provider: str) -> dict[str, Any] | None:
    return fetch_one(
        """
        SELECT id
        FROM syllabus_nodes
        WHERE source_provider = ? AND local_path = ? AND node_type = 'book'
        LIMIT 1
        """,
        (source_provider, local_path),
    )


def index_local_textbook(
    pdf_path: Path,
    *,
    board: str | None = None,
    grade: int | None = None,
    subject: str | None = None,
    book_title: str | None = None,
    source_provider: str = LOCAL_LIBRARY_PROVIDER,
    pages_per_chunk: int = 2,
    refresh: bool = False,
) -> dict[str, Any]:
    pdf_path = Path(pdf_path)
    if not pdf_path.exists():
        raise FileNotFoundError(f"Missing textbook PDF: {pdf_path}")

    metadata = _infer_metadata(pdf_path)
    resolved_board = board or metadata["board"]
    resolved_grade = grade if grade is not None else metadata["grade"]
    resolved_subject = subject or metadata["subject"]
    resolved_title = book_title or metadata["book_title"]

    existing = _find_existing_root(str(pdf_path), source_provider)
    if existing and not refresh:
        return {
            "ok": True,
            "indexed": False,
            "skipped": True,
            "board": resolved_board,
            "grade": resolved_grade,
            "subject": resolved_subject,
            "book_title": resolved_title,
            "local_path": str(pdf_path),
            "source_provider": source_provider,
        }

    if existing and refresh:
        execute("DELETE FROM syllabus_nodes WHERE id = ?", (existing["id"],))

    chunks = _extract_pdf_chunks(pdf_path, pages_per_chunk=pages_per_chunk)
    if not chunks:
        raise ValueError(f"No extractable text found in {pdf_path.name}")

    root_title = resolved_title or pdf_path.stem.replace("_", " ").replace("-", " ").title()
    root_id = execute(
        """
        INSERT INTO syllabus_nodes (
            parent_id, node_type, source_provider, board, grade, subject, book_title,
            title, content, source_url, local_path, order_index
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            None,
            "book",
            source_provider,
            resolved_board,
            resolved_grade,
            resolved_subject,
            root_title,
            root_title,
            f"Local textbook imported from {pdf_path.name}",
            metadata["source_url"],
            str(pdf_path),
            1,
        ),
    )

    for index, chunk in enumerate(chunks, start=1):
        execute(
            """
            INSERT INTO syllabus_nodes (
                parent_id, node_type, source_provider, board, grade, subject, book_title,
                chapter_number, title, content, source_url, local_path, order_index
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                root_id,
                "section",
                source_provider,
                resolved_board,
                resolved_grade,
                resolved_subject,
                root_title,
                metadata["chapter_number"],
                chunk["title"],
                chunk["content"],
                metadata["source_url"],
                str(pdf_path),
                index,
            ),
        )

    return {
        "ok": True,
        "indexed": True,
        "skipped": False,
        "board": resolved_board,
        "grade": resolved_grade,
        "subject": resolved_subject,
        "book_title": root_title,
        "local_path": str(pdf_path),
        "source_provider": source_provider,
        "pages": len(chunks),
    }


def discover_local_textbook_pdfs() -> list[Path]:
    roots = [
        BOOK_ROOT / "ncert",
        BOOK_ROOT / "tamil",
    ]

    pdfs: list[Path] = []
    seen: set[str] = set()
    for root in roots:
        if not root.exists():
            continue
        for path in root.glob("*.pdf"):
            resolved = str(path.resolve()).lower()
            if resolved in seen:
                continue
            seen.add(resolved)
            pdfs.append(path)
    return sorted(pdfs, key=lambda item: str(item).lower())


def sync_local_textbooks(refresh: bool = False) -> list[dict[str, Any]]:
    results: list[dict[str, Any]] = []
    for pdf_path in discover_local_textbook_pdfs():
        try:
            results.append(index_local_textbook(pdf_path, refresh=refresh))
        except Exception as exc:
            metadata = _infer_metadata(pdf_path)
            results.append(
                {
                    "ok": False,
                    "indexed": False,
                    "skipped": False,
                    "error": str(exc),
                    "board": metadata["board"],
                    "grade": metadata["grade"],
                    "subject": metadata["subject"],
                    "book_title": metadata["book_title"],
                    "local_path": str(pdf_path),
                    "source_provider": metadata["source_provider"],
                }
            )
    return results
