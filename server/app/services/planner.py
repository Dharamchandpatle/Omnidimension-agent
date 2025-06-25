import uuid
from ..agents.search_agent import search_providers
from ..agents.booking_agent import book_appointment
from ..agents.calendar_agent import add_calendar_event
from ..config import settings
# Example: orchestrate agents sequentially
def plan_and_execute(prompt: str):
    # generate a plan using OpenAI (skipped for brevity)
    task_id = str(uuid.uuid4())
    # 1. search
    providers = search_providers(prompt)
    # 2. book
    booking = book_appointment(providers[0])
    # 3. calendar
    event = add_calendar_event(booking)
    return task_id, {"providers": providers, "booking": booking, "event": event}