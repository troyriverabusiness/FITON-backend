# FITON — Real-time Conversation Analysis

Two participants speak into a browser microphone; their audio streams over WebSocket to a FastAPI backend, where ElevenLabs Scribe v2 Realtime transcribes and diarizes the speech in real time, and Claude generates a live argument and counterargument for each speaker as the conversation unfolds — both displayed token-by-token in a split-screen Next.js UI.

---

## Local setup

### Prerequisites

- Python ≥ 3.14 with [uv](https://docs.astral.sh/uv/)
- Node.js ≥ 20 with npm
- Docker + Docker Compose (for Postgres)

### 1. Clone and configure

```bash
git clone <repo-url>
cd FITON-backend
cp .env.example .env
# Fill in ELEVENLABS_API_KEY and ANTHROPIC_API_KEY in .env
```

### 2. Start the database

```bash
docker compose up -d
```

### 3. Start the Python backend

```bash
cd server
uv sync
uv run uvicorn server.main:app --reload --port 8000
```

The API is now available at `http://localhost:8000`.  
WebSocket endpoint: `ws://localhost:8000/ws/conversation`

### 4. Start the Next.js frontend

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Repo structure

```
FITON-backend/
├── .env.example              # Copy to .env and fill in secrets
├── compose.yaml              # Docker Compose — Postgres container
│
├── server/                   # FastAPI backend
│   ├── main.py               # App entry point — registers routers
│   ├── config.py             # Env-based config (API keys, model names, timeouts)
│   ├── pyproject.toml        # Python dependencies
│   │
│   ├── ws/
│   │   └── conversation.py   # WebSocket route — audio in, transcripts + args out
│   │
│   ├── models/
│   │   └── turn.py           # Pydantic: Turn, SpeakerBuffer, ArgumentUpdate, SessionState
│   │
│   ├── services/
│   │   ├── elevenlabs.py     # ElevenLabs Scribe v2 Realtime client
│   │   └── claude.py         # Claude argument generation (streaming)
│   │
│   ├── routes/               # Existing HTTP routes (auth, etc.)
│   ├── schemas/              # Existing Pydantic request/response models
│   └── data_access/          # Existing DB layer (SQLAlchemy + Postgres)
│
└── client/                   # Next.js 15 frontend (App Router, TypeScript)
    ├── app/
    │   ├── layout.tsx         # Root HTML shell + global CSS
    │   └── page.tsx           # Main UI — transcript + argument panels
    ├── lib/
    │   └── socket.ts          # WebSocket client, mic capture, shared types
    └── components/
        ├── TranscriptPanel/   # Rolling live transcript, colour-coded by speaker
        └── ArgumentPanel/     # Argument + counterargument per speaker, streams in
```

---

## Data flow

```
Browser mic (PCM)
  → [binary WS frame: 1-byte speaker tag + PCM]
  → server/ws/conversation.py
  → services/elevenlabs.py  (Scribe v2 Realtime WebSocket)
  → TranscriptWord events → SessionState (Turn, SpeakerBuffer)
  → services/claude.py      (on turn finalisation)
  → ArgumentUpdate stream
  → [JSON WS frame] → browser
  → TranscriptPanel / ArgumentPanel
```

---

## Where to write what

| What you're adding | Where it goes |
|---|---|
| Scribe WebSocket integration | `server/services/elevenlabs.py` |
| Claude prompt logic | `server/services/claude.py` |
| WebSocket session orchestration | `server/ws/conversation.py` |
| New Pydantic data shape | `server/models/turn.py` |
| New env variable | `.env.example` + `server/config.py` |
| Frontend socket logic | `client/lib/socket.ts` |
| New UI component | `client/components/` |
