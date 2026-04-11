import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from contextlib import asynccontextmanager

from server.db import init_db
from server.routes.conversations import router as conversations_router
from server.ws.conversation import router as conversation_router

# Importing diarizer triggers model loading at startup so the first
# WebSocket connection doesn't pay the cold-start penalty.
from server.services.diarization import diarizer  # noqa: F401

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s [%(name)s] %(message)s",
)

@asynccontextmanager
async def lifespan(application: FastAPI):
    await init_db()
    yield


app = FastAPI(
    title="FITON — Real-time Conversation Analysis",
    description=(
        "WebSocket-based backend: audio → pyannote diarization "
        "→ faster-whisper transcription → Claude argument generation."
    ),
    version="0.2.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(conversation_router, tags=["conversation"])
app.include_router(conversations_router)


@app.get("/health", tags=["meta"])
def health_check():
    """Liveness probe."""
    return {
        "status": "ok",
        "diarizer_ready": diarizer is not None,
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("server.main:app", host="0.0.0.0", port=8000, reload=True)
