import os
import sys

# Ensure imports work in Vercel serverless environment
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data import portfolio_projects, notifications, categories, blog_posts, profiles

app = FastAPI(title="Portfolio API", version="0.1.0")

# Dev: localhost; production (Vercel): same origin + custom domain
_origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]
if os.environ.get("VERCEL_URL"):
    _origins.extend([
        f"https://{os.environ['VERCEL_URL']}",
        "https://brianacebo.com",
    ])

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api")
def root(path: str | None = None, query: str | None = None):
    # Vercel rewrites /api/* to /api?path=...; dispatch so API routes work with static outputDirectory
    if path is not None and path != "":
        return _dispatch(path, query)
    return {"message": "Portfolio API", "docs": "/docs"}


def _dispatch(path: str, search_query: str | None) -> any:
    parts = path.strip("/").split("/")
    if path == "health":
        return {"status": "ok"}
    if path == "projects":
        return portfolio_projects
    if path == "profiles":
        return profiles
    if path == "notifications":
        return notifications
    if path == "posts":
        return blog_posts
    if path == "categories":
        categories_with_projects = []
        for c in categories:
            c_copy = dict(c)
            c_copy["projects"] = [p for p in portfolio_projects if p["category_id"] == c["id"]]
            categories_with_projects.append(c_copy)
        return categories_with_projects
    if path == "search":
        q = (search_query or "").strip().lower()
        if not q:
            return []
        return [
            p for p in portfolio_projects
            if q in p["title"].lower()
            or _matches_query(q, p.get("tags", []))
            or q in p["project_type"].lower()
            or _matches_query(q, p.get("tech_stack", []))
        ]
    if len(parts) >= 2:
        key, rest = parts[0], "/".join(parts[1:])
        if key == "project":
            try:
                pid = int(rest)
                p = next((x for x in portfolio_projects if x["id"] == pid), None)
                return p
            except ValueError:
                pass
        if key == "category":
            try:
                cid = int(rest)
                c = next((x for x in categories if x["id"] == cid), None)
                return c
            except ValueError:
                pass
        if key == "profile":
            try:
                pid = int(rest)
                p = next((x for x in profiles if x["id"] == pid), None)
                return p
            except ValueError:
                pass
        if key == "post":
            post = next((p for p in blog_posts if p["slug"] == rest), None)
            return post
    from fastapi.responses import JSONResponse
    return JSONResponse(content={"detail": "Not Found"}, status_code=404)

def _matches_query(q: str, value) -> bool:
    q = q.lower()
    if isinstance(value, str):
        return q in value.lower()
    if isinstance(value, list):
        return any(q in (item.lower() if isinstance(item, str) else str(item).lower()) for item in value)
    return False


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