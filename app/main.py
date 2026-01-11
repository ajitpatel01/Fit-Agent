from fastapi import FastAPI

from app.routes import router as fitagent_router


def create_app() -> FastAPI:
    """
    Application factory for FitAgent.
    Creates and configures the FastAPI app instance.
    """
    app = FastAPI(
        title="FitAgent API",
        description="AI-powered internship fit and resume analysis service",
        version="1.0.0",
    )

    # Register API routes
    app.include_router(fitagent_router)

    return app


app = create_app()
