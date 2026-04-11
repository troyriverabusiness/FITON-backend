#!/usr/bin/env bash
# Run from repo root: ./db/restore-db.sh path/to/dump.sql
# Requires: docker compose up -d db (empty volume is fine).
set -euo pipefail
cd "$(dirname "$0")/.."
if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi
: "${POSTGRES_USER:=fiton}"
: "${POSTGRES_PASSWORD:=fiton}"
: "${POSTGRES_DB:=fiton}"
file="${1:?Usage: $0 path/to/dump.sql}"
test -f "$file" || { echo "Not a file: $file" >&2; exit 1; }
docker compose exec -T -e "PGPASSWORD=${POSTGRES_PASSWORD}" db \
  psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -v ON_ERROR_STOP=1 <"$file"
echo "Restore finished."
