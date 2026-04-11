# Policy Ingest Pipeline — Implementation Plan

This document covers everything needed to build the policy scraping and AI enrichment pipeline. The n8n workflow already exists (ID: `6gNHaz92LYa80hWC`, "Policy Scrape & Ingest") and will POST raw policy data to `POST /ingest/policy` once the FastAPI side is built.

---

## Overview

```
n8n (daily cron)
  → Fetch EP Open Data API
  → Fetch EUR-Lex full text per policy
  → POST raw payload to FastAPI /ingest/policy
      → Claude enriches the policy (structured output)
      → Write enriched policy to DB
```

---

## 1. Add Dependency

```bash
uv add anthropic
```

Adds `anthropic` to `pyproject.toml`. Also requires `ANTHROPIC_API_KEY` in the environment.

---

## 2. DB Migration — `database/init/003_create_policies_table.sql`

```sql
CREATE TABLE IF NOT EXISTS policies (
    id                    SERIAL PRIMARY KEY,
    official_name         VARCHAR NOT NULL,
    source_url            VARCHAR NOT NULL UNIQUE,
    raw_text              TEXT,
    draft_text            TEXT,
    final_text            TEXT,
    emotional_title       VARCHAR,
    tension_score         FLOAT,
    plain_summary         TEXT,
    stakeholder_positions JSONB,
    diff_annotation       TEXT,
    scraped_at            TIMESTAMPTZ,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_policies_source_url ON policies (source_url);
```

---

## 3. SQLAlchemy Model — `server/data_access/models/policy.py`

Fields mirror the migration above:

- `id` — serial PK
- `official_name` — `String`, not null
- `source_url` — `String`, unique, indexed
- `raw_text`, `draft_text`, `final_text` — `Text`, nullable (raw scraped content)
- `emotional_title` — `String`, nullable (AI-generated hook question)
- `tension_score` — `Float`, nullable (AI-generated, 0.0–10.0)
- `plain_summary` — `Text`, nullable (AI-generated)
- `stakeholder_positions` — `JSONB`, nullable (AI-generated, shape: `{"pro": [...], "against": [...]}`)
- `diff_annotation` — `Text`, nullable (AI-generated, what changed between draft and final)
- `scraped_at` — `DateTime(timezone=True)`, nullable
- `created_at` — `DateTime(timezone=True)`, server default `now()`

---

## 4. Pydantic Schemas — `server/schemas/policy.py`

### `PolicyIngest`
What n8n POSTs to the endpoint:

| Field | Type | Notes |
|---|---|---|
| `official_name` | `str` | |
| `source_url` | `str` | Used as dedup key |
| `raw_text` | `str` | Full scraped text |
| `draft_text` | `str` | Default `""` if not available |
| `final_text` | `str` | Adopted text |
| `scraped_at` | `datetime` | ISO timestamp from n8n |

### `PolicyEnrichment`
Internal Pydantic model for Claude's structured output:

| Field | Type | Notes |
|---|---|---|
| `emotional_title` | `str` | Hook question, e.g. "Should landlords profit from evictions?" |
| `tension_score` | `float` | 0.0–10.0, how genuinely contested |
| `plain_summary` | `str` | Plain language summary with source references |
| `stakeholder_positions` | `dict` | `{"pro": [...], "against": [...]}` — emotional logic of each side |
| `diff_annotation` | `str` | What got softened/removed/added between draft and final, and who pushed for it |

### `PolicyOut`
What the API returns after ingest. All model fields with `model_config = {"from_attributes": True}`.

---

## 5. AI Service — `server/services/ai.py`

- Reads `ANTHROPIC_API_KEY` from env
- Instantiates `anthropic.Anthropic()` client once at module level
- Single function: `enrich_policy(official_name, raw_text, draft_text, final_text) -> PolicyEnrichment`
  - Calls `client.messages.create()` with model `claude-3-5-sonnet-latest`
  - System prompt instructs Claude to return a JSON object matching `PolicyEnrichment` exactly
  - If `draft_text` is empty, the prompt notes no draft is available and `diff_annotation` should reflect that
  - Parse response text as JSON, validate with `PolicyEnrichment.model_validate()`

---

## 6. Ingest Route — `server/routes/ingest.py`

`POST /ingest/policy` — **no auth** (open for demo)

Logic:
1. Accept `PolicyIngest` body
2. Query DB for existing `Policy` by `source_url` — if found, return `{"status": "already_exists"}` (idempotent, HTTP 200)
3. Call `enrich_policy(...)` from the AI service
4. Create a `Policy` DB record combining the raw payload fields + all enrichment fields
5. Commit, refresh, return `PolicyOut`

Router: `APIRouter(prefix="/ingest", tags=["ingest"])` — no auth dependency on any route.

---

## 7. Wire into `main.py`

Two additions:

```python
# Make create_tables() aware of the Policy model
from data_access.models import policy  # noqa: F401

# Register the router
from routes.ingest import router as ingest_router
app.include_router(ingest_router)
```

---

## 8. Environment Variables

| Variable | Where used |
|---|---|
| `ANTHROPIC_API_KEY` | `server/services/ai.py` |
| `SECRET_KEY` | Already present (session middleware) |
| `DATABASE_URL` | Already present |

---

## n8n Workflow Reference

- **Workflow ID**: `6gNHaz92LYa80hWC`
- **Name**: Policy Scrape & Ingest
- **Status**: Created, inactive (safe to activate once the FastAPI endpoint exists)
- The POST node targets `http://localhost:8000/ingest/policy` — update to the deployed hostname before going live
- Payload shape sent by n8n matches `PolicyIngest` above
