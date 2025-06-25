# server/app/agents/booking_agent.py

from ..services.omnidi_client import create_call

def book_appointment(provider: dict):
    """
    provider dict must include:
      - provider['agent_id']: int
      - provider['phone']: str (E.164 format)
      - provider['name']: str
    """
    # 1) (Optional) अपना mock booking logic
    booking = {
        "booking_id": "book123",
        "provider": provider,
        "time": "2025-06-26T18:00:00"
    }

    # 2) OmniDimension call भेजो अब तीन arguments के साथ
    script = (
        f"Hello {provider['name']}, "
        f"your appointment is confirmed at {booking['time']}."
    )
    call_resp = create_call(
        agent_id=provider["agent_id"],  # अब dynamic agent_id पास करो
        to_phone=provider["phone"],
        script=script
    )

    # 3) Booking + call response return करो
    return {
        **booking,
        "call": call_resp
    }
