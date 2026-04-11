# FITON-backend

## Running locally

From the repo root:

1. Copy `.env.example` to `.env` and adjust values if needed.
2. Run `docker compose up` (add `-d` to run in the background).

This starts Postgres and the API server (API on port `8000`, Postgres on `5432`).

---

## Repo structure

```
FITON-backend/
├── compose.yaml              # Docker Compose — defines the API + Postgres containers
├── .env.example              # Copy to .env and fill in secrets
│
├── database/
│   └── init/                 # SQL files that run once when Postgres first starts
│       └── 001_create_users_table.sql   # Add new .sql files here for schema changes
│
└── server/                   # All Python / FastAPI code lives here
    ├── main.py               # App entry point — registers routers and middleware
    ├── pyproject.toml        # Python dependencies (add new packages here)
    │
    ├── routes/               # HTTP endpoints — one file per feature area
    │   ├── user.py           # Auth routes: /auth/signup, /auth/login, /auth/me …
    │   └── endpoints.py      # Placeholder routes (feed, effects) — flesh these out
    │
    ├── schemas/              # Request/response shapes (Pydantic models)
    │   └── user.py           # UserCreate, UserLogin, UserOut — add new schemas here
    │
    ├── services/             # Business logic — called by routes, not by each other
    │   └── auth.py           # signup_user, login_user, get_current_user
    │
    └── data_access/          # Everything that touches the database
        ├── database.py       # DB connection, session factory, Base class
        └── models/           # SQLAlchemy ORM table definitions
            └── user.py       # User model — add new models (tables) here
```

---

## Where to write what

| What you're adding | Where it goes |
|---|---|
| New API endpoint | `server/routes/` — create a new file (e.g. `workout.py`) and register its router in `main.py` |
| Request/response body shape | `server/schemas/` — add a Pydantic class |
| Business logic (calculations, rules) | `server/services/` — keep it out of routes |
| Database query / data operation | `server/data_access/` — models go in `models/`, raw queries stay in `services/` for now |
| New database table | `server/data_access/models/` **and** `database/init/` (new numbered `.sql` file) |
| New Python package | Run `uv add <package>` inside `server/` — it updates `pyproject.toml` automatically |

---

## Request flow

```
HTTP request
  → routes/        (validate input with schema, call service)
  → services/      (business logic, calls data_access)
  → data_access/   (ORM model, DB session)
  → Postgres
```

Keep this layering intact — routes should never query the DB directly, and models should have no business logic.