from google.oauth2 import service_account
from googleapiclient.discovery import build
from ..config import settings

SCOPES = ['https://www.googleapis.com/auth/calendar']

creds = service_account.Credentials.from_service_account_file(
    settings.google_cred, scopes=SCOPES
)
service = build('calendar', 'v3', credentials=creds)

def add_calendar_event(booking: dict):
    event = {
        'summary': f"Appointment with {booking['provider']['name']}",
        'start': {'dateTime': booking['time']},
        'end':   {'dateTime': booking['time']},
    }
    created = service.events().insert(calendarId='primary', body=event).execute()
    return created