import uuid
from ..agents.search_agent import search_providers
from ..agents.booking_agent import book_appointment
from ..agents.calendar_agent import add_calendar_event

# Orchestrator: sequentially invoke each agent
# Returns a structured result with task_id and detail payload

def plan_and_execute(prompt: str):
    task_id = str(uuid.uuid4())

    # 1) Find providers
    raw_providers = search_providers(prompt)
    if not raw_providers:
        raise RuntimeError("No providers found for the given prompt.")

    # 2) Attach default_agent_id from your OmniDimension account
    default_agent_id = 2137  # Update this to one of the valid agent IDs from GET /api/agents/
    providers = [{
        "agent_id": default_agent_id,
        "phone": p["phone"],
        "name": p.get("name", "Provider")
    } for p in raw_providers]

    # 3) Book appointment
    booking = book_appointment(providers[0])

    # 4) Add to calendar
    event = add_calendar_event({
        "provider": booking,
        "title": f"Appointment with {booking['provider']['name']}",
        "start_time": booking['time'],
        "description": booking['call']['call_context']['script']
    })

    # 5) Return task_id and orchestration result
    return task_id, {
        "providers": providers,
        "booking": booking,
        "event": event
    }
