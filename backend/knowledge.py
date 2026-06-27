"""CBSE syllabus knowledge base helpers for StudyPilot."""

from __future__ import annotations

import ast
import json
import re
from pathlib import Path
from typing import Any

from backend.database import execute, fetch_all, fetch_one


PROJECT_ROOT = Path(__file__).resolve().parent.parent
NCERT_MANIFEST_PATH = PROJECT_ROOT / "docs" / "syllabus_sources" / "ncert_manifest.json"


SEED_ENTRIES: list[dict[str, Any]] = [
    {
        "grade": 6,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 1,
        "chapter_title": "Food and Its Sources",
        "summary": "Introduces the idea that food comes from plants and animals and builds healthy eating vocabulary for younger learners.",
        "keywords": "food sources plants animals nutrition healthy eating",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 6,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 2,
        "chapter_title": "Sorting Materials into Groups",
        "summary": "Covers properties such as hardness, transparency, solubility, and grouping materials by shared features.",
        "keywords": "sorting materials properties transparent opaque soluble insoluble",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 6,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 3,
        "chapter_title": "Motion and Measurement of Distances",
        "summary": "Explains measurement, standard units, and simple ideas of motion using familiar everyday examples.",
        "keywords": "motion measurement distance unit length metre",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 7,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 1,
        "chapter_title": "Nutrition in Plants",
        "summary": "Teaches photosynthesis, chlorophyll, and how plants make food from sunlight, water, and carbon dioxide.",
        "keywords": "nutrition plants photosynthesis chlorophyll food",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 7,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 2,
        "chapter_title": "Heat",
        "summary": "Introduces temperature, heat transfer, and the three common modes of heat movement.",
        "keywords": "heat temperature conduction convection radiation",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 7,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 3,
        "chapter_title": "Acids, Bases and Salts",
        "summary": "Builds understanding of indicators, neutralisation, and everyday acidic and basic substances.",
        "keywords": "acid base salt indicator neutralisation",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 8,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 1,
        "chapter_title": "Crop Production and Management",
        "summary": "Explains how soil is prepared, seeds are sown, and crops are cared for and stored safely.",
        "keywords": "crop production soil manure irrigation storage",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 8,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 2,
        "chapter_title": "Microorganisms: Friend and Foe",
        "summary": "Introduces helpful and harmful microbes, food preservation, and diseases caused by microorganisms.",
        "keywords": "microorganism microbes bacteria fungi preservation disease",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 8,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 3,
        "chapter_title": "Force and Pressure",
        "summary": "Covers push and pull, pressure, and how force changes the motion of objects.",
        "keywords": "force pressure push pull motion",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 9,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 1,
        "chapter_title": "Matter in Our Surroundings",
        "summary": "Explains the states of matter, diffusion, evaporation, and how matter behaves around us.",
        "keywords": "matter surroundings diffusion evaporation solid liquid gas",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 9,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 2,
        "chapter_title": "Is Matter Around Us Pure",
        "summary": "Covers mixtures, solutions, suspensions, colloids, and separation methods.",
        "keywords": "pure matter mixture solution suspension colloid separation",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
    {
        "grade": 9,
        "subject": "Science",
        "book_title": "Science",
        "chapter_number": 3,
        "chapter_title": "Atoms and Molecules",
        "summary": "Introduces laws of chemical combination, atomic mass, molecular mass, and formula writing.",
        "keywords": "atom molecule formula mass conservation chemical combination",
        "source_url": "https://epathshala.ncert.gov.in/",
        "source_type": "NCERT Official",
    },
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


def clean_text(value: object) -> str:
    return " ".join(str(value or "").split()).strip()


def seed_knowledge_base() -> None:
    """Populate the SQLite knowledge table the first time the app runs."""

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
    """Seed an official-textbook syllabus tree from the NCERT manifest."""

    if not NCERT_MANIFEST_PATH.exists():
        return

    existing = fetch_one(
        """
        SELECT COUNT(*) AS total
        FROM syllabus_nodes
        WHERE source_provider = 'NCERT Official'
        """
    )
    if existing and int(existing["total"]) > 0:
        return

    manifest = json.loads(NCERT_MANIFEST_PATH.read_text(encoding="utf-8"))
    classes = manifest.get("classes", [])
    if not classes:
        return

    execute("DELETE FROM syllabus_nodes WHERE source_provider = 'NCERT Official'")

    board_id = execute(
        """
        INSERT INTO syllabus_nodes (
            node_type, source_provider, board, title, content, source_url, order_index
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        ("board", "NCERT Official", "CBSE", "CBSE", "Official NCERT textbook catalog metadata.", manifest.get("source", ""), 1),
    )

    for class_entry in classes:
        grade = class_entry.get("grade")
        if grade is None or int(grade) < 6 or int(grade) > 10:
            continue

        grade_id = execute(
            """
            INSERT INTO syllabus_nodes (
                parent_id, node_type, source_provider, board, grade, title, content, source_url, order_index
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                board_id,
                "grade",
                "NCERT Official",
                "CBSE",
                int(grade),
                f"Grade {grade}",
                class_entry.get("label", ""),
                manifest.get("source", ""),
                int(grade),
            ),
        )

        for subject_index, subject_entry in enumerate(class_entry.get("subjects", []), start=1):
            subject_name = subject_entry.get("subject", "")
            if int(grade) == 10 and subject_name.lower() == "science":
                continue

            subject_id = execute(
                """
                INSERT INTO syllabus_nodes (
                    parent_id, node_type, source_provider, board, grade, subject, title, content, source_url, order_index
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    grade_id,
                    "subject",
                    "NCERT Official",
                    "CBSE",
                    int(grade),
                    subject_name,
                    subject_name,
                    "",
                    manifest.get("source", ""),
                    subject_index,
                ),
            )

            for book_index, book_entry in enumerate(subject_entry.get("books", []), start=1):
                book_title = book_entry.get("title", "")
                book_id = execute(
                    """
                    INSERT INTO syllabus_nodes (
                        parent_id, node_type, source_provider, board, grade, subject, book_title, title,
                        content, source_url, order_index
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        subject_id,
                        "book",
                        "NCERT Official",
                        "CBSE",
                        int(grade),
                        subject_name,
                        book_title,
                        book_title,
                        "Official textbook metadata only.",
                        book_entry.get("page_url", ""),
                        book_index,
                    ),
                )

                for chapter_index, chapter_entry in enumerate(book_entry.get("chapters", []), start=1):
                    chapter_label = clean_text(chapter_entry.get("label", f"Chapter {chapter_index}"))
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
                            int(grade),
                            subject_name,
                            book_title,
                            chapter_index,
                            chapter_label,
                            f"Official NCERT chapter link for {subject_name} {book_title}.",
                            chapter_entry.get("page_url", ""),
                            chapter_entry.get("pdf_url", ""),
                            chapter_index,
                        ),
                    )

    # Keep the Grade 10 Science demo chapters with real chapter names and official links.
    manual_science = fetch_one(
        """
        SELECT COUNT(*) AS total
        FROM syllabus_nodes
        WHERE source_provider = 'NCERT Official Science'
          AND grade = 10
          AND subject = 'Science'
        """
    )
    if manual_science and int(manual_science["total"]) == 0:
        board_id = fetch_one("SELECT id FROM syllabus_nodes WHERE source_provider = 'NCERT Official' AND node_type = 'board' LIMIT 1")
        board_ref = board_id["id"] if board_id else None
        grade_ref = execute(
            """
            INSERT INTO syllabus_nodes (
                parent_id, node_type, source_provider, board, grade, title, content, source_url, order_index
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (board_ref, "grade", "NCERT Official Science", "CBSE", 10, "Grade 10", "Official NCERT Science chapters only.", "", 10),
        )
        subject_ref = execute(
            """
            INSERT INTO syllabus_nodes (
                parent_id, node_type, source_provider, board, grade, subject, title, content, source_url, order_index
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (grade_ref, "subject", "NCERT Official Science", "CBSE", 10, "Science", "Science", "Official Grade 10 Science textbook links.", "", 1),
        )
        book_ref = execute(
            """
            INSERT INTO syllabus_nodes (
                parent_id, node_type, source_provider, board, grade, subject, book_title, title, content, source_url, order_index
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                subject_ref,
                "book",
                "NCERT Official Science",
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
            (2, "Acids, Bases and Salts", "https://ncert.nic.in/textbook/pdf/jesc102.pdf"),
            (9, "Light - Reflection and Refraction", "https://ncert.nic.in/textbook/pdf/jesc109.pdf"),
            (11, "Electricity", "https://ncert.nic.in/textbook/pdf/jesc111.pdf"),
        ]
        for index, (chapter_number, title, source_url) in enumerate(chapters, start=1):
            execute(
                """
                INSERT INTO syllabus_nodes (
                    parent_id, node_type, source_provider, board, grade, subject, book_title,
                    chapter_number, title, content, source_url, pdf_url, order_index
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    book_ref,
                    "chapter",
                    "NCERT Official Science",
                    "CBSE",
                    10,
                    "Science",
                    "Science",
                    chapter_number,
                    title,
                    f"Official NCERT chapter link for Grade 10 Science chapter {chapter_number}.",
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


def _expand_query_tokens(tokens: set[str]) -> set[str]:
    aliases = {
        "photosynthesis": {"photosynthesis", "nutrition", "chlorophyll", "plants"},
        "respiration": {"respiration", "breathing", "cellular"},
        "evaporation": {"evaporation", "heat", "water"},
        "light": {"light", "reflection", "refraction", "mirror", "lens"},
        "electricity": {"electricity", "current", "circuit", "resistance", "ohm"},
        "acid": {"acid", "acids", "base", "bases", "salt", "pH"},
        "acids": {"acid", "acids", "base", "bases", "salt", "pH"},
        "math": {"math", "mathematics", "algebra", "fraction", "equation"},
        "mathematics": {"math", "mathematics", "algebra", "fraction", "equation"},
    }

    expanded = set(tokens)
    for token in tokens:
        expanded.update(aliases.get(token, set()))
    return expanded


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
    query_tokens = _expand_query_tokens(_tokenize(query))
    query_text = (query or "").lower().strip()
    subject_lower = subject.lower().strip() if subject else ""

    scored: list[tuple[int, dict]] = []
    for entry in entries:
        score = 0
        matched_token = False
        entry_text = " ".join(
            [
                str(entry.get("subject", "")),
                str(entry.get("book_title", "")),
                str(entry.get("chapter_title", "")),
                str(entry.get("summary", "")),
                str(entry.get("keywords", "")),
            ]
        ).lower()

        if subject_lower and subject_lower in str(entry.get("subject", "")).lower():
            score += 2

        chapter_title = str(entry.get("chapter_title", "")).lower()
        if query_text and chapter_title and chapter_title in query_text:
            score += 6

        for token in query_tokens:
            if token in entry_text:
                score += 2
                matched_token = True
        if grade and int(entry.get("grade") or 0) == int(grade) and matched_token:
            score += 1
        if matched_token:
            score += 1

        should_keep = matched_token or (subject_lower and query_text == subject_lower)
        if score > 0 and should_keep:
            scored.append((score, entry))

    scored.sort(key=lambda pair: (-pair[0], pair[1]["grade"], pair[1]["subject"], pair[1]["chapter_number"]))
    if grade is not None:
      same_grade = [pair for pair in scored if int(pair[1].get("grade") or 0) == int(grade)]
      if same_grade:
          scored = same_grade
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
            "Try asking about the official NCERT chapters that have been imported, "
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
