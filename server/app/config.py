# server/app/config.py

from dotenv import load_dotenv
import os

# .env को रूट सर्वर डायरेक्टरी से लोड करो
load_dotenv()  

class Settings:
    omni_key    = os.getenv("OMNIDIM_API_KEY")
    openai_key  = os.getenv("OPENAI_API_KEY")
    google_cred = os.getenv("GOOGLE_CALENDAR_CRED")

    def __post_init__(self):
        # मिसिंग key पर फेल फास्ट करना
        if not self.omni_key:
            raise RuntimeError("OmniDimension API key missing! Check OMNIDIM_API_KEY in .env")
        if not self.openai_key:
            raise RuntimeError("OpenAI API key missing! Check OPENAI_API_KEY in .env")
        if not self.google_cred:
            raise RuntimeError("Google Calendar cred missing! Check GOOGLE_CALENDAR_CRED in .env")

settings = Settings()
