# Vercel serverless function entry point
# All /api/* requests are rewritten to /api?path=... and dispatched here
import sys
import os

# Ensure the api directory is in the path for imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import app

# Vercel requires 'app' to be exposed at module level for ASGI
handler = app
