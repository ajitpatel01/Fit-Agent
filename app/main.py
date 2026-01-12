from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pathlib import Path

from app.routes import router

# -------------------------------------------------
# FastAPI App Initialization
# -------------------------------------------------

app = FastAPI(
    title="FitAgent API",
    description="AI-powered internship fit and resume analysis service",
    version="1.0.0",
)

# -------------------------------------------------
# CORS (safe for demo / assignment)
# -------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # OK for assignment/demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------
# Paths (IMPORTANT FOR RENDER)
# -------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

# -------------------------------------------------
# Static Files (CSS / JS)
# -------------------------------------------------

app.mount(
    "/static",
    StaticFiles(directory=BASE_DIR / "static"),
    name="static",
)

# -------------------------------------------------
# API Routes
# -------------------------------------------------

app.include_router(router)

# -------------------------------------------------
# Serve Frontend HTML
# -------------------------------------------------

@app.get("/", response_class=HTMLResponse)
def serve_frontend():
    html_path = BASE_DIR / "frontend" / "index.html"
    return html_path.read_text(encoding="utf-8")
