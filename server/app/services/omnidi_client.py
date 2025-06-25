import os
from omnidimension import Client

# Env se ya settings se key lo
api_key = os.getenv("OMNIDIM_API_KEY")
client = Client(api_key)

def list_agents():
    # Account ke saare AI voice agents list karta hai
    return client.agent.list()

def create_call(to_phone: str, script: str):
    # Ye function call initiate karega
    response = client.call.create(
        to=to_phone,
        script=script,
        caller_id="+911234567890"  # apna verified caller ID
    )
    return response

def get_call_status(call_id: str):
    # Pahle se kiye call ka status laata hai
    return client.call.get(call_id)
