FROM python:3.12-slim

WORKDIR /app

# System libs required by librosa / soundfile / pyannote
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    libsndfile1 \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install uv
RUN curl -Ls https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.local/bin:$PATH"

# Install Python deps from lockfile — this is the single source of truth
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev --no-install-project

# ── Pre-download models at build time so startup is instant ───────────────────
# Pass your HuggingFace token: docker compose build --build-arg HF_TOKEN=hf_xxx
ARG HF_TOKEN
# Expose token as env var — huggingface_hub reads HF_TOKEN automatically,
# so from_pretrained() needs no explicit auth kwarg regardless of version.
ENV HF_TOKEN=$HF_TOKEN \
    HF_HUB_DISABLE_XET=1 \
    HF_HUB_HTTP_TIMEOUT=300
RUN uv run python - <<'EOF'
import os
from pyannote.audio import Pipeline
from faster_whisper import WhisperModel

if not os.environ.get("HF_TOKEN"):
    raise SystemExit("HF_TOKEN build arg is required. Run: docker compose build --build-arg HF_TOKEN=hf_xxx server")

print("Downloading pyannote/speaker-diarization-3.1…")
pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization-3.1")
print("Downloading faster-whisper medium…")
WhisperModel("medium", device="cpu", compute_type="int8")
print("Models downloaded successfully.")
EOF

# Copy the server source into /app/server/
COPY . ./server/

EXPOSE 8000

CMD ["uv", "run", "uvicorn", "server.main:app", "--host", "0.0.0.0", "--port", "8000"]
