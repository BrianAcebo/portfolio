import os
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
def root():
    return {"message": "Portfolio API", "docs": "/docs"}

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