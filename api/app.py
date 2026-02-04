import os
import sys

# Ensure imports work correctly
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, Response
from starlette.middleware.base import BaseHTTPMiddleware
from data import portfolio_projects, notifications, categories, blog_posts, profiles

app = FastAPI(title="Portfolio API", version="0.1.0")


# Security headers middleware
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        # HSTS - enforce HTTPS
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        # Prevent clickjacking
        response.headers["X-Frame-Options"] = "SAMEORIGIN"
        # Cross-Origin-Opener-Policy
        response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
        # Content-Security-Policy (permissive for SPA, tighten as needed)
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline'; "
            "style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data: https:; "
            "font-src 'self'; "
            "connect-src 'self' https:; "
            "frame-ancestors 'self';"
        )
        # Prevent MIME type sniffing
        response.headers["X-Content-Type-Options"] = "nosniff"
        return response


app.add_middleware(SecurityHeadersMiddleware)

# CORS for development (in production, same origin so not needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _matches_query(q: str, value) -> bool:
    q = q.lower()
    if isinstance(value, str):
        return q in value.lower()
    if isinstance(value, list):
        return any(q in (item.lower() if isinstance(item, str) else str(item).lower()) for item in value)
    return False


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api")
def api_root():
    return {"message": "Portfolio API", "docs": "/docs"}


@app.get("/api/search")
def search(query: str):
    q = query.strip().lower()
    if not q:
        return []
    return [
        p for p in portfolio_projects
        if q in p["title"].lower()
        or _matches_query(q, p.get("tags", []))
        or q in p["project_type"].lower()
        or _matches_query(q, p.get("tech_stack", []))
    ]

@app.get("/api/projects")
def get_projects():
    return portfolio_projects

@app.get("/api/project/{id}")
def get_project(id: int):
    project = next((p for p in portfolio_projects if p["id"] == id), None)
    if project:
        return project
    return None

@app.get("/api/categories")
def get_categories():
    categories_with_projects = []
    for category in categories:
        category["projects"] = [p for p in portfolio_projects if p["category_id"] == category["id"]]
        categories_with_projects.append(category)
    return categories_with_projects

@app.get("/api/category/{id}")
def get_category(id: int):
    category = next((c for c in categories if c["id"] == id), None)
    if category:
        return category
    return None

@app.get("/api/notifications")
def get_notifications():
    return notifications


@app.get("/api/posts")
def get_posts():
    return blog_posts


@app.get("/api/post/{slug}")
def get_post_by_slug(slug: str):
    post = next((p for p in blog_posts if p["slug"] == slug), None)
    if post:
        return post
    return None

@app.get("/api/profiles")
def get_profiles():
    return profiles

@app.get("/api/profile/{id}")
def get_profile(id: int):
    profile = next((p for p in profiles if p["id"] == id), None)
    if profile:
        return profile
    return None


# ----- Static file serving for production (Fly.io) -----
# Serve React build - must be mounted AFTER API routes
DIST_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "dist")

if os.path.exists(DIST_DIR):
    # Serve static assets (js, css, images, etc.)
    app.mount("/assets", StaticFiles(directory=os.path.join(DIST_DIR, "assets")), name="assets")
    
    # Serve files from dist root (favicon, starwars.js, etc.)
    @app.get("/favicon.ico")
    async def favicon():
        return FileResponse(os.path.join(DIST_DIR, "favicon.ico"))
    
    @app.get("/robots.txt")
    async def robots():
        return FileResponse(os.path.join(DIST_DIR, "robots.txt"), media_type="text/plain")
    
    @app.get("/sitemap.xml")
    async def sitemap():
        return FileResponse(os.path.join(DIST_DIR, "sitemap.xml"), media_type="application/xml")
    
    # Cache headers for static assets (1 year for immutable assets)
    CACHE_LONG = "public, max-age=31536000, immutable"
    CACHE_SHORT = "public, max-age=86400"  # 1 day for mutable assets
    
    @app.get("/{filename:path}.js")
    async def serve_js(filename: str):
        response = FileResponse(os.path.join(DIST_DIR, f"{filename}.js"), media_type="application/javascript")
        response.headers["Cache-Control"] = CACHE_LONG
        return response
    
    @app.get("/images/{path:path}")
    async def images(path: str):
        response = FileResponse(os.path.join(DIST_DIR, "images", path))
        response.headers["Cache-Control"] = CACHE_LONG
        return response
    
    @app.get("/files/{path:path}")
    async def files(path: str):
        response = FileResponse(os.path.join(DIST_DIR, "files", path))
        response.headers["Cache-Control"] = CACHE_SHORT
        return response
    
    @app.get("/videos/{path:path}")
    async def videos(path: str):
        response = FileResponse(os.path.join(DIST_DIR, "videos", path))
        response.headers["Cache-Control"] = CACHE_LONG
        return response
    
    @app.get("/fonts/{path:path}")
    async def fonts(path: str):
        response = FileResponse(os.path.join(DIST_DIR, "fonts", path))
        response.headers["Cache-Control"] = CACHE_LONG
        return response
    
    # Catch-all for SPA routing - serve index.html for all other routes
    @app.get("/{path:path}")
    async def spa_catch_all(path: str):
        return FileResponse(os.path.join(DIST_DIR, "index.html"))
    
    @app.get("/")
    async def spa_root():
        return FileResponse(os.path.join(DIST_DIR, "index.html"))