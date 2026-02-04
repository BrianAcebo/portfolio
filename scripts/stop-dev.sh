#!/bin/bash
# Stop all dev services (API, frontend, AI voice, ngrok)

kill_port() {
  local port=$1
  local pids
  pids=$(lsof -nP -iTCP:"$port" -sTCP:LISTEN -t 2>/dev/null)
  [ -n "$pids" ] && echo "$pids" | xargs kill -9 2>/dev/null || true
}

echo "[stop-dev] Stopping all dev services..."

# Kill API server (port 3000)
echo "[stop-dev] → Stopping API server (port 3000)"
kill_port 3000
pkill -f "tsx .*api/src/index.ts" 2>/dev/null || true
pkill -f "node .*api/dist" 2>/dev/null || true
pkill -f "uvicorn main:app" 2>/dev/null || true

# Kill frontend dev server (port 5173)
echo "[stop-dev] → Stopping frontend (port 5173)"
kill_port 5173
pkill -f "vite" 2>/dev/null || true

echo "[stop-dev] ✓ All services stopped."
