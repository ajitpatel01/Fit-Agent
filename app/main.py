from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse

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
# API Routes
# -------------------------------------------------

app.include_router(router)

# -------------------------------------------------
# Serve Frontend (IMPORTANT)
# -------------------------------------------------

# Mount frontend directory for static assets (CSS, JS)
app.mount("/static", StaticFiles(directory="frontend"), name="static")

# Serve main frontend page
@app.get("/", response_class=HTMLResponse)
def serve_frontend():
    with open("frontend/index.html", "r", encoding="utf-8") as f:
        return f.read()
