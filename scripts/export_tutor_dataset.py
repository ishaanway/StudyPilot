"""Export supervised fine-tuning data for the StudyPilot tutor.

This script converts the imported syllabus tree and knowledge entries into a
JSONL dataset that can be used for LoRA / SFT training.
"""

from __future__ import annotations

import argparse
import json
import sqlite3
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATABASE_PATH = PROJECT_ROOT / "database" / "studypilot.db"
DEFAULT_OUTPUT = PROJECT_ROOT / "data" / "tutor_training.jsonl"

SYSTEM_PROMPT = (
    "You are StudyPilot, a calm and honest CBSE tutor. "
    "Explain concepts in simple language, stay grounded in the syllabus, and "
    "say when you need to be more specific."
)


def clean_text(value: object) -> str:
    return " ".join(str(value or "").split()).strip()


def clip(value: str, limit: int = 900) -> str:
    value = clean_text(value)
    if len(value) <= limit:
        return value
    return value[:limit].rsplit(" ", 1)[0].rstrip() + "..."


def connect() -> sqlite3.Connection:
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def fetch_all(conn: sqlite3.Connection, sql: str, params: tuple = ()) -> list[sqlite3.Row]:
    return conn.execute(sql, params).fetchall()


def node_summary(node: sqlite3.Row, children: list[sqlite3.Row]) -> str:
    content = clip(node["content"] or "", 1000)
    if content:
        return content

    child_titles = [clean_text(child["title"]) for child in children if clean_text(child["title"])]
    if child_titles:
        joined = "; ".join(child_titles[:8])
        return f"This {node['node_type']} covers: {joined}."

    pieces = [
        f"Grade {node['grade']}" if node["grade"] else None,
        node["subject"],
        node["book_title"],
        f"Chapter {node['chapter_number']}" if node["chapter_number"] else None,
        f"Section {node['section_number']}" if node["section_number"] else None,
        node["title"],
    ]
    pieces = [clean_text(piece) for piece in pieces if clean_text(piece)]
    return " ".join(pieces)


def add_sample(samples: list[dict], user_prompt: str, answer: str, metadata: dict) -> None:
    samples.append(
        {
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
                {"role": "assistant", "content": answer},
            ],
            "metadata": metadata,
        }
    )


def export_knowledge_entries(conn: sqlite3.Connection, samples: list[dict]) -> None:
    rows = fetch_all(conn, "SELECT * FROM knowledge_entries ORDER BY grade, subject, chapter_number")
    for row in rows:
        grade = row["grade"]
        subject = clean_text(row["subject"])
        chapter = clean_text(row["chapter_title"])
        summary = clip(row["summary"] or "", 1000)
        source_url = clean_text(row["source_url"])

        prompts = [
            f"Explain Grade {grade} {subject} chapter {chapter} in simple language.",
            f"Give me the key ideas from Grade {grade} {subject} chapter {chapter}.",
            f"I need a short revision note for Grade {grade} {subject} chapter {chapter}.",
        ]
        answers = [
            summary,
            f"Key ideas from {chapter}: {summary}",
            f"Revision note: {summary}",
        ]
        for idx, (prompt, answer) in enumerate(zip(prompts, answers), start=1):
            add_sample(
                samples,
                prompt,
                answer,
                {
                    "source": "knowledge_entries",
                    "grade": grade,
                    "subject": subject,
                    "chapter_title": chapter,
                    "source_url": source_url,
                    "variant": idx,
                },
            )


def export_syllabus_nodes(conn: sqlite3.Connection, samples: list[dict]) -> None:
    rows = fetch_all(
        conn,
        """
        SELECT *
        FROM syllabus_nodes
        ORDER BY grade, subject, book_title, chapter_number, section_number, order_index, id
        """,
    )
    rows_by_parent: dict[int | None, list[sqlite3.Row]] = {}
    for row in rows:
        rows_by_parent.setdefault(row["parent_id"], []).append(row)

    for row in rows:
        if row["node_type"] not in {"chapter", "section"}:
            continue

        children = rows_by_parent.get(row["id"], [])
        summary = node_summary(row, children)
        grade = row["grade"]
        subject = clean_text(row["subject"])
        book_title = clean_text(row["book_title"])
        chapter_number = row["chapter_number"]
        section_number = row["section_number"]
        title = clean_text(row["title"])
        source_url = clean_text(row["source_url"])
        pdf_url = clean_text(row["pdf_url"])

        if row["node_type"] == "chapter":
            prompts = [
                f"Teach me Grade {grade} {subject} chapter {title} in simple language.",
                f"What are the main ideas in Grade {grade} {subject} chapter {title}?",
            ]
        else:
            prompts = [
                f"Explain Grade {grade} {subject} section {section_number} of chapter {chapter_number} ({title}).",
                f"What should I remember from section {section_number} in {title}?",
            ]

        for idx, prompt in enumerate(prompts, start=1):
            add_sample(
                samples,
                prompt,
                summary,
                {
                    "source": "syllabus_nodes",
                    "grade": grade,
                    "subject": subject,
                    "book_title": book_title,
                    "chapter_number": chapter_number,
                    "section_number": section_number,
                    "node_type": row["node_type"],
                    "source_url": source_url,
                    "pdf_url": pdf_url,
                    "variant": idx,
                },
            )


def export_calculator_samples(samples: list[dict]) -> None:
    examples = [
        ("What is 1 + 1?", "1 + 1 = 2"),
        ("Calculate 18 - 6 / 2 + 5", "18 - 6 / 2 + 5 = 20"),
        ("What is (5 * 2) + 3?", "(5 * 2) + 3 = 13"),
    ]
    for idx, (prompt, answer) in enumerate(examples, start=1):
        add_sample(
            samples,
            prompt,
            answer,
            {
                "source": "calculator",
                "variant": idx,
            },
        )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Export StudyPilot tutor fine-tuning data.")
    parser.add_argument("--output", default=str(DEFAULT_OUTPUT), help="Path to the JSONL output file.")
    parser.add_argument("--skip-calculator", action="store_true", help="Skip arithmetic examples.")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    samples: list[dict] = []
    conn = connect()
    try:
        export_knowledge_entries(conn, samples)
        export_syllabus_nodes(conn, samples)
        if not args.skip_calculator:
            export_calculator_samples(samples)
    finally:
        conn.close()

    with output_path.open("w", encoding="utf-8") as handle:
        for sample in samples:
            handle.write(json.dumps(sample, ensure_ascii=False) + "\n")

    manifest = {
        "output": str(output_path),
        "samples": len(samples),
        "knowledge_entries": sum(1 for sample in samples if sample["metadata"]["source"] == "knowledge_entries"),
        "syllabus_nodes": sum(1 for sample in samples if sample["metadata"]["source"] == "syllabus_nodes"),
        "calculator": sum(1 for sample in samples if sample["metadata"]["source"] == "calculator"),
    }
    (output_path.parent / "tutor_training_manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(json.dumps(manifest, indent=2))


if __name__ == "__main__":
    main()
