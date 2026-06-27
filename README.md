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

StudyPilot now uses a Gemma-first local LLM tutor path through [Ollama](https://ollama.com/) by default. The tutor is tuned to prefer Google's Gemma family first, so the app stays lightweight and school-friendly while still working fully offline once a model is installed.

Preferred Ollama model:

- `gemma3:4b`

If Gemma is not installed yet, StudyPilot automatically falls back to smaller local models such as `gemma3:1b`, `gemma2:2b`, `qwen2.5:1.5b`, and `tinyllama:latest` so the tutor keeps working while the better model finishes downloading.

If you fine-tune a local model, point StudyPilot at it with:

- `STUDYPILOT_LLM_PROVIDER=transformers`
- `STUDYPILOT_LLM_MODEL_PATH=path/to/merged/model`

If you want to keep using Ollama, set:

- `STUDYPILOT_LLM_PROVIDER=ollama`
- `STUDYPILOT_OLLAMA_MODEL=your-ollama-model-name`

Fine-tuning steps are documented in [`docs/fine_tuning.md`](docs/fine_tuning.md).

## Current frontend

The existing browser prototype still lives at the repository root:

- `index.html`
- `js/`
- `styles/`
- `assets/`
- `docs/`

That prototype remains usable on its own while we phase in the backend and later reorganize the frontend into the exact folder structure from the spec.

## Run the backend

Install Flask if needed, then start the Flask app:

```bash
python -m backend.app
```

That command now serves both the frontend and the API from the same origin, which is the recommended way to use the local Ollama tutor.

Health check:

```text
GET http://127.0.0.1:5000/api/health
```

Ollama check:

```text
GET http://127.0.0.1:11434/api/tags
```

Tutor endpoint:

```text
POST http://127.0.0.1:5000/api/tutor/respond
```

If you are opening the static frontend from GitHub Pages or another host, point the app at your running backend with one of these options:

- `window.STUDYPILOT_API_BASE = "http://127.0.0.1:5000"`
- `?api=http://127.0.0.1:5000` in the URL
- `<meta name="studypilot-api-base" content="http://127.0.0.1:5000">`

This is the quickest way to keep the deployed frontend talking to your local Flask + Ollama backend.

## Phase note

This is phase 1 of the larger rewrite: project foundation and data layer. The next phases can wire the frontend to the API and then replace remaining mock-only behavior one feature at a time.
