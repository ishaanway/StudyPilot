"""SQLite helpers for StudyPilot.

This module owns the low-level database connection and schema bootstrap so the
rest of the backend can stay small and readable.
"""

from __future__ import annotations

import sqlite3
from pathlib import Path
from typing import Iterable, Sequence


PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATABASE_DIR = PROJECT_ROOT / "database"
DATABASE_PATH = DATABASE_DIR / "studypilot.db"
SCHEMA_PATH = DATABASE_DIR / "schema.sql"


def get_connection() -> sqlite3.Connection:
    """Return a SQLite connection with sensible defaults enabled."""
    DATABASE_DIR.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON;")
    return connection


def init_db() -> None:
    """Create the database schema if it does not already exist."""
    if not SCHEMA_PATH.exists():
        raise FileNotFoundError(f"Missing schema file: {SCHEMA_PATH}")

    schema_sql = SCHEMA_PATH.read_text(encoding="utf-8")
    with get_connection() as connection:
        connection.executescript(schema_sql)


def row_to_dict(row: sqlite3.Row | None) -> dict | None:
    if row is None:
        return None
    return {key: row[key] for key in row.keys()}


def fetch_all(query: str, params: Sequence | None = None) -> list[dict]:
    with get_connection() as connection:
        rows = connection.execute(query, params or []).fetchall()
    return [row_to_dict(row) for row in rows if row is not None]


def fetch_one(query: str, params: Sequence | None = None) -> dict | None:
    with get_connection() as connection:
        row = connection.execute(query, params or []).fetchone()
    return row_to_dict(row)


def execute(query: str, params: Sequence | None = None) -> int:
    with get_connection() as connection:
        cursor = connection.execute(query, params or [])
        connection.commit()
        return cursor.lastrowid


def executemany(query: str, rows: Iterable[Sequence]) -> None:
    with get_connection() as connection:
        connection.executemany(query, rows)
        connection.commit()
