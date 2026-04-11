# Frontend Integration Guide

## Server URL

The backend exposes a single WebSocket endpoint for all real-time conversation analysis.

| Purpose | URL |
|---|---|
| WebSocket (conversation) | `ws://localhost:8000/ws/conversation` |
| Health check (HTTP GET) | `http://localhost:8000/health` |
| Interactive API docs | `http://localhost:8000/docs` |

---

## Quick Start

1. Start the server:
   ```bash
   docker compose up server
   ```
   > The diarization model loads on startup — allow ~30 seconds the first time.

2. Verify it's ready:
   ```bash
   curl http://localhost:8000/health
   # {"status":"ok","diarizer_ready":true}
   ```

3. Open a WebSocket connection to `ws://localhost:8000/ws/conversation` and begin sending audio.

---

## Audio Requirements

- **Format:** webm/opus — the default output of the browser's `MediaRecorder` API
- **Sample rate:** 16 000 Hz (configured via `AUDIO_SAMPLE_RATE` in `.env`)
- **Framing:** Send one **complete recording** per binary frame (i.e. the full `Blob` on `MediaRecorder` stop, not a stream of chunks)

---

## Wire Protocol

### Browser → Server

| Frame type | Content | When to send |
|---|---|---|
| Binary | Complete audio `Blob` (webm/opus) | After the user finishes speaking |
| Text (JSON) | `{"type": "end_session"}` | When the session should be closed |

### Server → Browser

All server messages are JSON text frames.

| `type` | Additional fields | Meaning |
|---|---|---|
| `processing` | — | Audio received; diarization + transcription running |
| `no_speech` | — | No speech detected in the clip |
| `transcript` | `speaker`, `text`, `turn_id`, `is_partial` | Transcribed speech for one speaker turn |
| `turn_complete` | `speaker`, `turn_id` | Turn has been finalized |
| `argument_update` | `speaker`, `role`, `delta`, `turn_id`, `is_final` | Streaming Claude response chunk |
| `argument_complete` | `speaker`, `turn_id` | Claude finished generating for this turn |
| `error` | `message` | Server-side error |
| `session_ended` | — | Server confirmed the session is closed |

#### `speaker` values
- `"speaker_a"` — first voice detected in the session
- `"speaker_b"` — second voice detected in the session

Speaker identity is determined automatically by pyannote; no manual labeling is required.

#### `role` values (on `argument_update`)
- `"argument"` — supporting point for the speaker
- `"counterargument"` — rebuttal to the opponent

---

## Minimal JavaScript Example

```js
const ws = new WebSocket("ws://localhost:8000/ws/conversation");

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);

  switch (msg.type) {
    case "transcript":
      console.log(`[${msg.speaker}] ${msg.text}`);
      break;
    case "argument_update":
      process.stdout.write(msg.delta); // stream tokens as they arrive
      break;
    case "argument_complete":
      console.log("\n-- argument complete --");
      break;
    case "error":
      console.error("Server error:", msg.message);
      break;
  }
};

// Send a recorded audio blob
async function sendAudio(blob) {
  const buffer = await blob.arrayBuffer();
  ws.send(buffer);
}

// End the session cleanly
function endSession() {
  ws.send(JSON.stringify({ type: "end_session" }));
}
```

---

## CORS

CORS is configured to allow all origins (`*`), so no proxy or special headers are needed during development.

---

## Environment Variables

The following `.env` values affect behavior visible to the frontend:

| Variable | Default | Effect |
|---|---|---|
| `AUDIO_SAMPLE_RATE` | `16000` | Expected sample rate of incoming audio |
| `MIN_TURN_WORDS` | `3` | Turns shorter than this skip Claude analysis |
| `MAX_SESSIONS` | `50` | Maximum concurrent WebSocket sessions |
