FROM python:3.12-slim

WORKDIR /app

# System libs required by librosa / soundfile / pyannote
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    libsndfile1 \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Python deps before copying source for layer caching.
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

# Copy source into /app/server/ so "from server.X import Y" resolves correctly.
COPY . ./server/

EXPOSE 8000

CMD ["uvicorn", "server.main:app", "--host", "0.0.0.0", "--port", "8000"]
