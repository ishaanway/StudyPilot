"""CBSE syllabus knowledge base helpers for StudyPilot."""

from __future__ import annotations

import ast
import re
from pathlib import Path
from typing import Any

from backend.database import execute, fetch_all, fetch_one


PROJECT_ROOT = Path(__file__).resolve().parent.parent


SEED_ENTRIES: list[dict[str, Any]] = [
    {
        "grade": 10,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 2,
        "chapter_title": "Acids, Bases and Salts",
        "summary": "Introduces acids, bases, indicators, pH, and neutralisation with original study help focused on everyday applications.",
        "keywords": "acid base salt indicator ph neutralisation neutralization vinegar baking soda litmus",
        "source_url": "https://ncert.nic.in/textbook/pdf/jesc102.pdf",
        "source_type": "NCERT Official",
    },
    {
        "grade": 10,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 9,
        "chapter_title": "Light - Reflection and Refraction",
        "summary": "Covers reflection, refraction, mirrors, lenses, dispersion, and atmospheric refraction using the official NCERT chapter as the source link.",
        "keywords": "light reflection refraction mirror lens dispersion rainbow atmospheric refraction",
        "source_url": "https://ncert.nic.in/textbook/pdf/jesc109.pdf",
        "source_type": "NCERT Official",
    },
    {
        "grade": 10,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 11,
        "chapter_title": "Electricity",
        "summary": "Explains electric current, circuits, potential difference, Ohm's law, resistance, and circuit safety with official textbook links only.",
        "keywords": "electricity current circuit ohm resistance potential difference ammeter voltmeter fuse heating effect",
        "source_url": "https://ncert.nic.in/textbook/pdf/jesc111.pdf",
        "source_type": "NCERT Official",
    },
]


def seed_knowledge_base() -> None:
    """Populate the SQLite knowledge table the first time the app runs."""

    row = fetch_one("SELECT COUNT(*) AS total FROM knowledge_entries")
    if row and int(row["total"]) > 0:
        expected = fetch_one(
            """
            SELECT COUNT(*) AS total
            FROM knowledge_entries
            WHERE grade = 10
              AND subject = 'Science'
              AND chapter_number IN (2, 9, 11)
            """
        )
        if expected and int(expected["total"]) >= 3:
            return
        execute("DELETE FROM knowledge_entries")

    for entry in SEED_ENTRIES:
        execute(
            """
            INSERT INTO knowledge_entries (
                grade, subject, book_title, chapter_number, chapter_title,
                summary, keywords, source_url, source_type
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                entry["grade"],
                entry["subject"],
                entry["book_title"],
                entry["chapter_number"],
                entry["chapter_title"],
                entry["summary"],
                entry["keywords"],
                entry["source_url"],
                entry["source_type"],
            ),
        )


def seed_official_curriculum_catalog() -> None:
    """Seed a tiny official-textbook syllabus tree for the Grade 10 demo."""

    row = fetch_one(
        """
        SELECT COUNT(*) AS total
        FROM syllabus_nodes
        WHERE source_provider = 'NCERT Official'
          AND grade = 10
          AND subject = 'Science'
        """
    )
    if row and int(row["total"]) > 0:
        return

    board_id = execute(
        """
        INSERT INTO syllabus_nodes (
            node_type, source_provider, board, title, content, source_url, order_index
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        ("board", "NCERT Official", "CBSE", "CBSE", "Official Grade 10 NCERT Science catalog", "", 1),
    )
    grade_id = execute(
        """
        INSERT INTO syllabus_nodes (
            parent_id, node_type, source_provider, board, grade, title, content, source_url, order_index
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (board_id, "grade", "NCERT Official", "CBSE", 10, "Grade 10", "Official NCERT Science chapters only.", "", 1),
    )
    subject_id = execute(
        """
        INSERT INTO syllabus_nodes (
            parent_id, node_type, source_provider, board, grade, subject, title, content, source_url, order_index
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (grade_id, "subject", "NCERT Official", "CBSE", 10, "Science", "Science", "Official Grade 10 Science textbook links.", "", 1),
    )
    book_id = execute(
        """
        INSERT INTO syllabus_nodes (
            parent_id, node_type, source_provider, board, grade, subject, book_title, title, content, source_url, order_index
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            subject_id,
            "book",
            "NCERT Official",
            "CBSE",
            10,
            "Science",
            "Science",
            "NCERT Science",
            "Official textbook page for Grade 10 Science.",
            "https://ncert.nic.in/textbook.php?jesc1=1-16",
            1,
        ),
    )

    chapters = [
        (2, "Acids, Bases and Salts", "https://ncert.nic.in/textbook/pdf/jesc102.pdf", "Study acids, bases, indicators, pH, and neutralisation from the official chapter."),
        (9, "Light - Reflection and Refraction", "https://ncert.nic.in/textbook/pdf/jesc109.pdf", "Study reflection, refraction, mirrors, lenses, and dispersion from the official chapter."),
        (11, "Electricity", "https://ncert.nic.in/textbook/pdf/jesc111.pdf", "Study current, circuits, Ohm's law, resistance, and safety from the official chapter."),
    ]

    for index, (chapter_number, title, source_url, content) in enumerate(chapters, start=1):
        execute(
            """
            INSERT INTO syllabus_nodes (
                parent_id, node_type, source_provider, board, grade, subject, book_title,
                chapter_number, title, content, source_url, pdf_url, order_index
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                book_id,
                "chapter",
                "NCERT Official",
                "CBSE",
                10,
                "Science",
                "Science",
                chapter_number,
                title,
                content,
                source_url,
                source_url,
                index,
            ),
        )


def _tokenize(text: str) -> set[str]:
    stopwords = {
        "what",
        "is",
        "the",
        "and",
        "a",
        "an",
        "to",
        "of",
        "for",
        "me",
        "in",
        "on",
        "about",
        "explain",
        "tell",
        "my",
        "please",
        "chapter",
        "chapters",
        "subject",
    }
    words = re.findall(r"[a-z0-9]+", text.lower())
    return {word for word in words if word not in stopwords}


def _extract_arithmetic_expression(query: str) -> str:
    text = re.sub(r"\s+", " ", query).strip()
    text = text.replace("×", "*").replace("÷", "/").replace("−", "-").replace("–", "-")

    prefix_patterns = [
        r"^(what is|whats|what's|calculate|compute|solve|evaluate)\s*[:\-]?\s*",
        r"^(can you\s+)?(what is|whats|what's|calculate|compute|solve|evaluate)\s*[:\-]?\s*",
    ]
    for pattern in prefix_patterns:
      text = re.sub(pattern, "", text, flags=re.IGNORECASE)

    text = text.strip().rstrip("?.!")
    candidate = re.sub(r"[^0-9\.\+\-\*\/\(\)\s]", " ", text)
    candidate = re.sub(r"\s+", " ", candidate).strip()
    return candidate


def _safe_eval_arithmetic(expression: str) -> str | None:
    if not expression or not re.search(r"[0-9]", expression) or not re.search(r"[\+\-\*\/]", expression):
        return None

    allowed_binops = {
        ast.Add: lambda a, b: a + b,
        ast.Sub: lambda a, b: a - b,
        ast.Mult: lambda a, b: a * b,
        ast.Div: lambda a, b: a / b,
        ast.FloorDiv: lambda a, b: a // b,
        ast.Mod: lambda a, b: a % b,
    }
    allowed_unary = {
        ast.UAdd: lambda a: a,
        ast.USub: lambda a: -a,
    }

    def _eval(node: ast.AST) -> float:
        if isinstance(node, ast.Expression):
            return _eval(node.body)
        if isinstance(node, ast.Constant) and isinstance(node.value, (int, float)):
            return float(node.value)
        if isinstance(node, ast.UnaryOp) and type(node.op) in allowed_unary:
            return allowed_unary[type(node.op)](_eval(node.operand))
        if isinstance(node, ast.BinOp) and type(node.op) in allowed_binops:
            left = _eval(node.left)
            right = _eval(node.right)
            return float(allowed_binops[type(node.op)](left, right))
        raise ValueError("Unsupported arithmetic expression")

    try:
        parsed = ast.parse(expression, mode="eval")
        value = _eval(parsed)
    except Exception:
        return None

    if value.is_integer():
        return str(int(value))
    return ("{:.10f}".format(value)).rstrip("0").rstrip(".")


def simple_math_answer(query: str) -> str | None:
    """Return a direct answer for basic arithmetic questions."""

    expression = _extract_arithmetic_expression(query)
    value = _safe_eval_arithmetic(expression)
    if value is None:
        return None
    return f"{expression} = {value}"


def search_knowledge(query: str, grade: int | None = None, subject: str | None = None, limit: int = 4) -> list[dict]:
    """Return the most relevant syllabus entries for a question."""

    entries = fetch_all("SELECT * FROM knowledge_entries ORDER BY grade, subject, chapter_number")
    query_tokens = _tokenize(query)
    subject_lower = subject.lower().strip() if subject else ""

    scored: list[tuple[int, dict]] = []
    for entry in entries:
        score = 0
        entry_text = " ".join(
            [
                str(entry.get("subject", "")),
                str(entry.get("book_title", "")),
                str(entry.get("chapter_title", "")),
                str(entry.get("summary", "")),
                str(entry.get("keywords", "")),
            ]
        ).lower()

        if grade and int(entry.get("grade") or 0) == int(grade):
            score += 3
        if subject_lower and subject_lower in str(entry.get("subject", "")).lower():
            score += 5

        for token in query_tokens:
            if token in entry_text:
                score += 2
        if any(token in entry_text for token in query_tokens):
            score += 1

        if score > 0:
            scored.append((score, entry))

    scored.sort(key=lambda pair: (-pair[0], pair[1]["grade"], pair[1]["subject"], pair[1]["chapter_number"]))
    return [entry for _, entry in scored[:limit]]


def format_knowledge_context(entries: list[dict]) -> str:
    if not entries:
        return "No matching syllabus entries were found in the local CBSE knowledge base."

    lines = ["Relevant CBSE/NCERT syllabus context:"]
    for entry in entries:
        lines.append(
            f"- Grade {entry['grade']} {entry['subject']} | {entry['book_title']} Ch {entry['chapter_number']}: "
            f"{entry['chapter_title']}. {entry['summary']}"
        )
    return "\n".join(lines)


def offline_answer(query: str, entries: list[dict]) -> str:
    if not entries:
        return (
            "I do not have enough local syllabus detail for that yet. "
            "Try asking about the official Grade 10 Science chapters that have been imported, "
            "or connect the local LLM for broader answers."
        )

    primary = entries[0]
    subject = primary["subject"]
    chapter = primary["chapter_title"]
    if "quiz" in query.lower():
        return (
            f"Here is a quick quiz idea from {subject} - {chapter}:\n"
            "1. Ask one definition question.\n"
            "2. Ask one example question.\n"
            "3. Ask one application question.\n"
            "If you want, I can turn this into 5 MCQs next."
        )

    return (
        f"Based on Grade {primary['grade']} {subject} - {chapter}, "
        f"here is the short study help: {primary['summary']} "
        "If you want a deeper explanation, connect the local LLM so StudyPilot can expand this with examples."
    )


def search_syllabus_nodes(query: str, grade: int | None = None, subject: str | None = None, limit: int = 8) -> list[dict]:
    """Search the full imported syllabus tree for matching titles and content."""

    tokens = [token for token in _tokenize(query) if len(token) > 2]
    if not tokens:
      tokens = [query.lower().strip()]

    clauses = []
    params: list[object] = []
    for token in tokens[:6]:
        clauses.append("(LOWER(title) LIKE ? OR LOWER(content) LIKE ?)")
        params.extend([f"%{token}%", f"%{token}%"])

    where_sql = " OR ".join(clauses) if clauses else "1=1"
    if grade is not None:
        where_sql = f"({where_sql}) AND (grade IS NULL OR grade = ?)"
        params.append(int(grade))
    if subject:
        where_sql = f"({where_sql}) AND (subject IS NULL OR LOWER(subject) LIKE ?)"
        params.append(f"%{subject.lower().strip()}%")

    rows = fetch_all(
        f"""
        SELECT * FROM syllabus_nodes
        WHERE {where_sql}
        ORDER BY
          CASE node_type
            WHEN 'section' THEN 1
            WHEN 'chapter' THEN 2
            WHEN 'book' THEN 3
            WHEN 'subject' THEN 4
            WHEN 'grade' THEN 5
            ELSE 6
          END,
          grade,
          subject,
          book_title,
          chapter_number,
          section_number
        LIMIT ?
        """,
        (*params, limit),
    )
    return rows


def solve_simple_arithmetic(query: str) -> str | None:
    """Solve a small arithmetic question like 'what is 1+1?' safely."""

    text = re.sub(r"\s+", " ", query or "").strip()
    text = text.replace("\u00d7", "*").replace("\u00f7", "/").replace("\u2212", "-").replace("\u2013", "-")
    text = re.sub(
        r"^(can you\s+)?(what is|whats|what's|calculate|compute|solve|evaluate)\s*[:\-]?\s*",
        "",
        text,
        flags=re.IGNORECASE,
    )
    expression = re.sub(r"[^0-9\.\+\-\*\/\(\)\s]", " ", text)
    expression = re.sub(r"\s+", " ", expression).strip().rstrip("?.!")

    if not expression or not re.search(r"[0-9]", expression) or not re.search(r"[\+\-\*\/]", expression):
        return None

    allowed_binops = {
        ast.Add: lambda a, b: a + b,
        ast.Sub: lambda a, b: a - b,
        ast.Mult: lambda a, b: a * b,
        ast.Div: lambda a, b: a / b,
        ast.FloorDiv: lambda a, b: a // b,
        ast.Mod: lambda a, b: a % b,
    }
    allowed_unary = {
        ast.UAdd: lambda a: a,
        ast.USub: lambda a: -a,
    }

    def _eval(node: ast.AST) -> float:
        if isinstance(node, ast.Expression):
            return _eval(node.body)
        if isinstance(node, ast.Constant) and isinstance(node.value, (int, float)):
            return float(node.value)
        if isinstance(node, ast.UnaryOp) and type(node.op) in allowed_unary:
            return allowed_unary[type(node.op)](_eval(node.operand))
        if isinstance(node, ast.BinOp) and type(node.op) in allowed_binops:
            left = _eval(node.left)
            right = _eval(node.right)
            return float(allowed_binops[type(node.op)](left, right))
        raise ValueError("Unsupported arithmetic expression")

    try:
        parsed = ast.parse(expression, mode="eval")
        value = _eval(parsed)
    except Exception:
        return None

    answer = str(int(value)) if float(value).is_integer() else ("{:.10f}".format(value)).rstrip("0").rstrip(".")
    return f"{expression} = {answer}"
