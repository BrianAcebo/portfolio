# Vercel FastAPI entrypoint at project root (https://vercel.com/docs/frameworks/backend/fastapi).
# Imports the API app and mounts the built frontend (dist/) so one function serves both.
import os

from api.app import app
from fastapi.staticfiles import StaticFiles

# On Vercel, serve the built React app from dist/ for all non-API routes (SPA fallback via html=True).
if os.environ.get("VERCEL") and os.path.isdir("dist"):
    app.mount("/", StaticFiles(directory="dist", html=True), name="static")
