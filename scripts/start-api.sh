#!/bin/bash
# Start the Portfolio API (Python/FastAPI)

cd "$(dirname "$0")/../api"

# Use venv if present (only affects this script's process, not your terminal)
if [ -d ".venv" ]; then
    source .venv/bin/activate
elif [ -d "venv" ]; then
    source venv/bin/activate
fi

# Dev: --reload; Start (preview): no reload
if [ "$1" = "start" ]; then
    exec uvicorn main:app --host 0.0.0.0 --port 3000
else
    exec uvicorn main:app --reload --port 3000
fi
