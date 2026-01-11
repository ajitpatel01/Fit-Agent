import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    """
    Application configuration loaded from environment variables.
    """

    GROQ_API_KEY: str | None = os.getenv("GROQ_API_KEY")


settings = Settings()
