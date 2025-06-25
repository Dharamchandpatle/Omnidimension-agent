from ..services.omnidi_client import create_call

def book_appointment(provider: dict):
    # 1) (Optional) apna booking logic ya mock booking
    booking = {
        "booking_id": "book123",
        "provider": provider,
        "time": "2025-06-26T18:00:00"
    }

    # 2) OmniDimension call bhejo
    script_text = (
        f"Hello {provider['name']}, "
        f"yahan automated call hai aapke appointment confirm karne ke liye on {booking['time']}."
    )
    call_resp = create_call(provider["phone"], script_text)

    # 3) Booking + call response return karo
    return {
        **booking,
        "call": call_resp
    }
