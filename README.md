# StudyPilot
School Study Pilot Project

Plan Smarter. Learn Better.

StudyPilot is being built as a school-exhibition friendly academic assistant with a local-first frontend and a Flask + SQLite backend scaffold.

The current workspace already contains a polished browser prototype in the project root. I added the missing backend foundation requested by the spec so the app can grow toward the full architecture in phases instead of all at once.

## What is included now

1. `backend/app.py` - Flask API with endpoints for students, tasks, homework, exams, curriculum, progress, exam readiness, planner, and settings.
2. `backend/database.py` - Small SQLite helper layer for opening connections and bootstrapping the schema.
3. `backend/scheduler.py` - Rule-based offline study planning helpers.
4. `backend/reminder.py` - Helpful, low-noise reminder generation.
5. `database/schema.sql` - SQLite schema for the requested tables.

## Local LLM

StudyPilot now supports a local LLM tutor path through [Ollama](https://ollama.com/). The backend will call Ollama when it is available and otherwise fall back to the offline CBSE knowledge base.

Default model:

- `tinyllama`

That model is small enough to run locally for a school exhibition and is suitable for retrieval-style tutoring, summaries, and simple explanations.

## Current frontend

The existing browser prototype still lives at the repository root:

- `index.html`
- `js/`
- `styles/`
- `assets/`
- `docs/`

That prototype remains usable on its own while we phase in the backend and later reorganize the frontend into the exact folder structure from the spec.

## Run the backend

Install Flask if needed, then start the API:

```bash
python -m backend.app
```

Health check:

```text
GET http://127.0.0.1:5000/api/health
```

Ollama check:

```text
GET http://localhost:11434/api/tags
```

Tutor endpoint:

```text
POST http://127.0.0.1:5000/api/tutor/respond
```

## Phase note

This is phase 1 of the larger rewrite: project foundation and data layer. The next phases can wire the frontend to the API and then replace remaining mock-only behavior one feature at a time.
