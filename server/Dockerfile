FROM python:3.12-slim

WORKDIR /app

# System libs required by librosa / soundfile / pyannote
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    libsndfile1 \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Python deps
COPY pyproject.toml ./
RUN pip install --no-cache-dir \
    "huggingface_hub==0.24.7" \
    fastapi \
    "uvicorn[standard]" \
    python-multipart \
    "pydantic-settings>=2.0" \
    python-dotenv \
    "anthropic>=0.30" \
    "pyannote.audio==3.3.2" \
    "faster-whisper==1.1.0" \
    "torch==2.3.0" \
    "torchaudio==2.3.0" \
    "numpy==1.26.4" \
    "soundfile==0.12.1" \
    "librosa==0.10.2" \
    sqlalchemy \
    psycopg2-binary \
    "passlib[bcrypt]" \
    itsdangerous

# ── Pre-download models at build time so startup is instant ───────────────────
# Pass your HuggingFace token: docker compose build --build-arg HF_TOKEN=hf_xxx
ARG HF_TOKEN
# Disable XetHub CDN (times out) — forces standard huggingface.co download.
# Increase timeout to 5 min for large model files on slow connections.
ENV HF_HUB_DISABLE_XET=1 \
    HF_HUB_HTTP_TIMEOUT=300
RUN python - <<'EOF'
import os, torch
from pyannote.audio import Pipeline
from faster_whisper import WhisperModel

token = os.environ.get("HF_TOKEN") or ""
if not token:
    raise SystemExit("HF_TOKEN build arg is required. Run: docker compose build --build-arg HF_TOKEN=hf_xxx server")

print("Downloading pyannote/speaker-diarization-3.1…")
pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization-3.1", use_auth_token=token)
print("Downloading faster-whisper medium…")
WhisperModel("medium", device="cpu", compute_type="int8")
print("Models downloaded successfully.")
EOF

# Copy the server source into /app/server/
COPY . ./server/

EXPOSE 8000

CMD ["uvicorn", "server.main:app", "--host", "0.0.0.0", "--port", "8000"]
