import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    openai_key: str = os.getenv("OPENAI_API_KEY")
    google_cred: str = os.getenv("GOOGLE_CALENDAR_CRED")
    omni_key: str = os.getenv("OMNIDIMENSION_API_KEY")

settings = Settings()