"""CBSE syllabus knowledge base helpers for StudyPilot."""

from __future__ import annotations

import re
from pathlib import Path
from typing import Any

from backend.database import execute, fetch_all, fetch_one


PROJECT_ROOT = Path(__file__).resolve().parent.parent


SEED_ENTRIES: list[dict[str, Any]] = [
    {
        "grade": 7,
        "subject": "Science",
        "book_title": "Curiosity",
        "chapter_number": 1,
        "chapter_title": "The Ever-Evolving World of Science",
        "summary": "Introduces science as observation, questioning, experimentation, and evidence-based thinking. Students learn how science connects physics, chemistry, biology, and earth science.",
        "keywords": "scientific method observation evidence hypothesis experiment discovery",
        "source_url": "https://ncert.nic.in/textbook.php?iesc1=7-15",
        "source_type": "NCERT",
    },
    {
        "grade": 7,
        "subject": "Science",
        "book_title": "Curiosity",
        "chapter_number": 2,
        "chapter_title": "Exploring Substances: Acidic, Basic, and Neutral",
        "summary": "Covers acids, bases, indicators such as litmus, and neutralization. Students compare everyday materials like lemon juice, soap solution, and baking soda solution.",
        "keywords": "acid base neutral litmus indicator neutralization vinegar lemon soap",
        "source_url": "https://ncert.nic.in/textbook/pdf/gecu102.pdf",
        "source_type": "NCERT",
    },
    {
        "grade": 7,
        "subject": "Science",
        "book_title": "Curiosity",
        "chapter_number": 3,
        "chapter_title": "Electricity: Circuits and Components",
        "summary": "Explains current, circuits, switches, batteries, bulbs, conductors, heating effect, magnetic effect, and fuses. Students learn why circuits need a closed path.",
        "keywords": "electricity circuit current battery fuse bulb electromagnet conductor switch",
        "source_url": "https://ncert.nic.in/textbook/pdf/gecu103.pdf",
        "source_type": "NCERT",
    },
    {
        "grade": 7,
        "subject": "Science",
        "book_title": "Curiosity",
        "chapter_number": 4,
        "chapter_title": "The World of Metals and Non-metals",
        "summary": "Describes physical properties, common uses, reactivity ideas, and how metals differ from non-metals in everyday life.",
        "keywords": "metals non-metals properties reactivity lustre malleability ductility",
        "source_url": "https://ncert.nic.in/textbook.php?iesc1=7-15",
        "source_type": "NCERT",
    },
    {
        "grade": 7,
        "subject": "Science",
        "book_title": "Curiosity",
        "chapter_number": 5,
        "chapter_title": "Changes Around Us: Physical and Chemical",
        "summary": "Helps students tell reversible physical changes apart from chemical changes that form new substances, such as rusting or burning.",
        "keywords": "physical change chemical change reversible irreversible rusting burning",
        "source_url": "https://ncert.nic.in/textbook/pdf/gecu105.pdf",
        "source_type": "NCERT",
    },
    {
        "grade": 7,
        "subject": "Mathematics",
        "book_title": "Ganita Prakash",
        "chapter_number": 1,
        "chapter_title": "Large Numbers Around Us",
        "summary": "Works with large numbers, place value, estimation, and comparing Indian and international number systems.",
        "keywords": "large numbers place value estimation indian system crore lakh",
        "source_url": "https://ncert.nic.in/textbook/pdf/gegp101.pdf",
        "source_type": "NCERT",
    },
    {
        "grade": 7,
        "subject": "Mathematics",
        "book_title": "Ganita Prakash",
        "chapter_number": 2,
        "chapter_title": "Arithmetic Expressions",
        "summary": "Builds BODMAS-style order of operations with brackets, multiplication, division, addition, and subtraction.",
        "keywords": "arithmetic expressions bodmas pemdas operations brackets multiplication division",
        "source_url": "https://ncert.nic.in/textbook/pdf/gegp102.pdf",
        "source_type": "NCERT",
    },
    {
        "grade": 7,
        "subject": "Mathematics",
        "book_title": "Ganita Prakash",
        "chapter_number": 3,
        "chapter_title": "A Peek Beyond the Point",
        "summary": "Introduces decimals, fractions, and number lines to help students compare and represent values precisely.",
        "keywords": "decimals fractions number line tenths hundredths",
        "source_url": "https://ncert.nic.in/textbook.php?jesc1=ps-13",
        "source_type": "NCERT",
    },
    {
        "grade": 7,
        "subject": "Mathematics",
        "book_title": "Ganita Prakash",
        "chapter_number": 4,
        "chapter_title": "Expressions using Letter-Numbers",
        "summary": "Builds algebraic thinking through variables, coefficients, and simple expressions that represent unknown quantities.",
        "keywords": "variables coefficients algebra expressions letters unknowns",
        "source_url": "https://ncert.nic.in/textbook.php?jesc1=ps-13",
        "source_type": "NCERT",
    },
    {
        "grade": 7,
        "subject": "Mathematics",
        "book_title": "Ganita Prakash",
        "chapter_number": 5,
        "chapter_title": "Parallel and Intersecting Lines",
        "summary": "Explores angle relationships formed by transversals, including corresponding, alternate interior, and supplementary angles.",
        "keywords": "parallel lines intersecting lines angles transversal corresponding alternate interior",
        "source_url": "https://ncert.nic.in/textbook.php?jesc1=ps-13",
        "source_type": "NCERT",
    },
    {
        "grade": 7,
        "subject": "Mathematics",
        "book_title": "Ganita Prakash",
        "chapter_number": 6,
        "chapter_title": "Number Play",
        "summary": "Uses parity, patterns, grids, magic squares, and Fibonacci-style sequences to build number sense and logic.",
        "keywords": "parity odd even magic square fibonacci patterns grids",
        "source_url": "https://ncert.nic.in/textbook/pdf/gegp106.pdf",
        "source_type": "NCERT",
    },
]


def seed_knowledge_base() -> None:
    """Populate the SQLite knowledge table the first time the app runs."""

    row = fetch_one("SELECT COUNT(*) AS total FROM knowledge_entries")
    if row and int(row["total"]) > 0:
        return

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
            "Try asking about the Grade 7 Science or Mathematics chapters that have been imported, "
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
