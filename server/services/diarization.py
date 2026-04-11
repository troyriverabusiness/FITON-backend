"""Speaker diarization + transcription service.

Uses pyannote.audio for speaker diarization and faster-whisper for
transcription.  Both models run fully locally — no ElevenLabs or other
streaming API required.

The module-level ``diarizer`` singleton is imported by ``server/main.py``
which triggers model loading once at process startup (~15–30 s on first run
while weights download from HuggingFace, then cached locally).

HuggingFace setup
-----------------
Set ``HF_TOKEN`` in .env to a read-access token from
huggingface.co/settings/tokens.  The account must have accepted the terms
for these three models:
  huggingface.co/pyannote/speaker-diarization-3.1
  huggingface.co/pyannote/segmentation-3.0
  huggingface.co/pyannote/embedding

Thread safety
-------------
``process_audio_chunk`` is synchronous and CPU/GPU-bound.  Always call it
via ``await asyncio.to_thread(diarizer.process_audio_chunk, audio_bytes)``.
"""

from __future__ import annotations

import logging
import os
import tempfile

import numpy as np
import soundfile as sf
import torch
from faster_whisper import WhisperModel
from pyannote.audio import Pipeline

logger = logging.getLogger(__name__)


class SpeakerDiarizer:
    """Loads once at startup; call ``process_audio_chunk`` per recording."""

    def __init__(self) -> None:
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        logger.info("SpeakerDiarizer: device=%s", self.device)

        hf_token = os.getenv("HF_TOKEN", "")
        if not hf_token:
            raise RuntimeError(
                "HF_TOKEN is not set in .env.\n"
                "  1. Create a read token at huggingface.co/settings/tokens\n"
                "  2. Accept model terms at:\n"
                "       huggingface.co/pyannote/speaker-diarization-3.1\n"
                "       huggingface.co/pyannote/segmentation-3.0\n"
                "       huggingface.co/pyannote/embedding"
            )

        logger.info("SpeakerDiarizer: loading pyannote pipeline…")
        self._pipeline = Pipeline.from_pretrained(
            "pyannote/speaker-diarization-3.1",
            use_auth_token=hf_token,
        )
        if self._pipeline is None:
            raise RuntimeError(
                "pyannote failed to load — check that HF_TOKEN is correct and "
                "you have accepted the model terms at:\n"
                "  https://huggingface.co/pyannote/speaker-diarization-3.1\n"
                "  https://huggingface.co/pyannote/segmentation-3.0\n"
                "  https://huggingface.co/pyannote/embedding"
            )
        self._pipeline.to(torch.device(self.device))

        compute_type = "float16" if self.device == "cuda" else "int8"
        logger.info("SpeakerDiarizer: loading Whisper medium (%s)…", compute_type)
        self._whisper = WhisperModel("medium", device=self.device, compute_type=compute_type)

        # Maps pyannote's internal labels → stable "SPEAKER_00" / "SPEAKER_01".
        self._registry: dict[str, str] = {}
        self._counter: int = 0
        logger.info("SpeakerDiarizer: ready.")

    def reset(self) -> None:
        """Clear speaker memory — call at the start of each new session."""
        self._registry = {}
        self._counter = 0

    def _label(self, raw: str) -> str:
        if raw not in self._registry:
            self._registry[raw] = f"SPEAKER_{self._counter:02d}"
            self._counter += 1
        return self._registry[raw]

    def process_audio_chunk(
        self,
        audio_bytes: bytes,
        sample_rate: int = 16_000,
    ) -> list[dict]:
        """Diarize + transcribe raw 16-bit PCM bytes.

        Returns::

            [{"speaker": "SPEAKER_00"|"SPEAKER_01",
              "text": "...", "start": float, "end": float}, ...]

        Always call via ``asyncio.to_thread`` — this method is synchronous.
        """
        audio_array = np.frombuffer(audio_bytes, dtype=np.int16)
        audio_float = audio_array.astype(np.float32) / 32_768.0

        fd, tmp_path = tempfile.mkstemp(suffix=".wav")
        os.close(fd)
        try:
            sf.write(tmp_path, audio_float, sample_rate)

            diarization = self._pipeline(tmp_path, min_speakers=2, max_speakers=2)

            raw_segments, _ = self._whisper.transcribe(
                tmp_path,
                language=None,
                word_timestamps=True,
                vad_filter=True,
            )
            segments = list(raw_segments)

            if not segments:
                return []

            result: list[dict] = []
            for seg in segments:
                text = seg.text.strip()
                if not text:
                    continue

                # Find the speaker with the most overlap during this segment.
                overlap_times: dict[str, float] = {}
                for turn, _, spk in diarization.itertracks(yield_label=True):
                    overlap = max(
                        0.0,
                        min(seg.end, turn.end) - max(seg.start, turn.start),
                    )
                    if overlap > 0:
                        overlap_times[spk] = overlap_times.get(spk, 0.0) + overlap

                if not overlap_times:
                    dominant = "SPEAKER_00"
                else:
                    dominant = self._label(max(overlap_times, key=overlap_times.get))  # type: ignore[arg-type]

                result.append({
                    "speaker": dominant,
                    "text": text,
                    "start": round(seg.start, 2),
                    "end": round(seg.end, 2),
                })

            return result
        finally:
            try:
                os.unlink(tmp_path)
            except OSError:
                pass


diarizer = SpeakerDiarizer()
