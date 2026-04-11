from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.ws.conversation import router as conversation_router

# TODO: Import and include existing FITON routers here as the project grows.

app = FastAPI(
    title="FITON — Real-time Conversation Analysis",
    description=(
        "WebSocket-based backend: audio → ElevenLabs Scribe v2 Realtime "
        "→ Claude argument generation."
    ),
    version="0.1.0",
)

# TODO: Tighten CORS origins for production — restrict to the deployed client URL.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ────────────────────────────────────────────────────────────────────

app.include_router(conversation_router, tags=["conversation"])

# TODO: Register additional HTTP routers (auth, users, etc.) from server/routes/.


# ── Health check ───────────────────────────────────────────────────────────────


@app.get("/health", tags=["meta"])
def health_check():
    """Liveness probe — returns 200 when the server is accepting requests."""
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("server.main:app", host="0.0.0.0", port=8000, reload=True)
