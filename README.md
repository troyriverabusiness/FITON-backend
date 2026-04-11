# FITON — Real-time Conversation Analysis

Two participants speak into a browser microphone. Press and hold the record button, then release when done. The audio is sent to the FastAPI backend, where:

1. **pyannote.audio** diarizes the recording (identifies which voice is SPEAKER_00 vs SPEAKER_01)
2. **faster-whisper** transcribes each speaker's words
3. **Claude** generates an argument and counterargument per speaker turn, streamed token-by-token back to the browser

---

## Prerequisites

- Docker Desktop (includes Docker Compose) — everything runs in containers
- A [HuggingFace](https://huggingface.co) account (free) — required to download the diarization model
- An [Anthropic](https://console.anthropic.com) API key — for Claude argument generation

---

## First-time setup

### 1. Clone and create your `.env`

```bash
git clone <repo-url>
cd FITON-backend
cp .env.example .env
```

### 2. Fill in `.env`

Open `.env` and set the following values:

```
ANTHROPIC_API_KEY=sk-ant-...        # from console.anthropic.com/settings/keys
HF_TOKEN=hf_...                     # see "HuggingFace token" section below
```

Everything else in `.env` can stay as-is for local development.

### 3. HuggingFace token (required for diarization)

The speaker diarization model (`pyannote/speaker-diarization-3.1`) is gated — you must accept its terms of use before downloading.

**Steps (takes ~2 minutes):**

1. Create a **read** token at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Accept the terms on each of these three model pages (must be logged in):
   - [pyannote/speaker-diarization-3.1](https://huggingface.co/pyannote/speaker-diarization-3.1)
   - [pyannote/segmentation-3.0](https://huggingface.co/pyannote/segmentation-3.0)
   - [pyannote/embedding](https://huggingface.co/pyannote/embedding)
3. Paste the token into `.env`:
   ```
   HF_TOKEN=hf_your_token_here
   ```

### 4. Build and start everything

```bash
docker compose up --build
```

> **First build takes ~5–10 minutes.** Docker installs ML libraries (PyTorch, pyannote, whisper) and downloads the diarization + transcription models (~2 GB total). Subsequent starts are fast since the image is cached.

Open [http://localhost:3000](http://localhost:3000) when the logs show:

```
server-1  | INFO:     Application startup complete.
client-1  | ▲ Next.js ... ready
```

---

## Using the app

1. Click **Start session**
2. **Press and hold** the record button while speaking (both speakers can talk, then release)
3. Wait a few seconds — the transcript and arguments appear on screen
4. Record again for the next turn

---

## How it works (data flow)

```
Browser mic (MediaRecorder → audio/webm;codecs=opus blob)
  → [binary WebSocket frame]
  → server/ws/conversation.py
      → ffmpeg converts webm → 16kHz mono WAV
      → pyannote.audio  (speaker diarization)
      → faster-whisper  (transcription per segment)
      → services/claude.py (argument generation, streaming)
  → [JSON WebSocket frames] → browser
  → page.tsx (transcript + argument panels)
```

---

## Repo structure

```
FITON-backend/
├── .env.example              # Copy to .env and fill in secrets
├── compose.yaml              # Docker Compose — all services
│
├── server/                   # FastAPI backend
│   ├── Dockerfile
│   ├── main.py               # App entry point, loads diarizer at startup
│   ├── config.py             # Env-based config (API keys, model names, timeouts)
│   ├── pyproject.toml        # Python dependencies
│   │
│   ├── ws/
│   │   └── conversation.py   # WebSocket route — audio in, transcripts + args out
│   │
│   ├── models/
│   │   └── turn.py           # Pydantic: Turn, SpeakerBuffer, ArgumentUpdate
│   │
│   └── services/
│       ├── diarization.py    # pyannote + faster-whisper (speaker detection + STT)
│       └── claude.py         # Claude argument generation (streaming)
│
└── client/                   # Next.js 15 frontend (App Router, TypeScript)
    ├── app/
    │   └── page.tsx           # Main UI — record button, transcript, argument panels
    └── lib/
        └── socket.ts          # WebSocket client + MediaRecorder audio capture
```

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Server crashes on startup with `HF_TOKEN is not set` | Missing or placeholder token in `.env` | Set a real token (see setup step 3) |
| Server crashes with `pipeline is None` / authentication error | Token is valid but model terms not accepted | Visit all three HuggingFace model pages and click Accept |
| `Format not recognised` error after recording | ffmpeg missing from image | Rebuild: `docker compose build server` |
| No transcript returned | Recording too short or too quiet | Hold for at least 3–4 seconds with clear speech |
| Arguments not generated | Missing or invalid `ANTHROPIC_API_KEY` | Check the key in `.env` |

---

## Where to write what

| What you're adding | Where it goes |
|---|---|
| Diarization / transcription logic | `server/services/diarization.py` |
| Claude prompt logic | `server/services/claude.py` |
| WebSocket session orchestration | `server/ws/conversation.py` |
| New Pydantic data shape | `server/models/turn.py` |
| New env variable | `.env.example` + `server/config.py` |
| Frontend socket / recording logic | `client/lib/socket.ts` |
| UI changes | `client/app/page.tsx` |
