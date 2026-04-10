#!/usr/bin/env bash
# Run from repo root: ./db/dump-db.sh
# Produces a SQL file you can send to your teammate (Drive, Slack, etc.).
set -euo pipefail
cd "$(dirname "$0")/.."
if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi
: "${POSTGRES_USER}"
: "${POSTGRES_PASSWORD}"
: "${POSTGRES_DB}"
mkdir -p db/dumps
out="${1:-db/dumps/${POSTGRES_DB}-$(date +%Y%m%d-%H%M%S).sql}"
docker compose exec -T -e "PGPASSWORD=${POSTGRES_PASSWORD}" db \
  pg_dump -U "$POSTGRES_USER" --clean --if-exists "$POSTGRES_DB" >"$out"
echo "Wrote $out — share this file with your teammate."
