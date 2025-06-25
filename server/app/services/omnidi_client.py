# server/app/services/omnidi_client.py

from ..config import settings
from omnidimension import Client

# Initialize the OmniDimension SDK client
client = Client(settings.omni_key)

# -------------------------------------------------------------------
# Dispatch a voice call via OmniDimension
# -------------------------------------------------------------------
def create_call(agent_id: int, to_phone: str, script: str) -> dict:
    """
    Dispatches a call using the specified agent.

    :param agent_id:   ID of the OmniDimension agent
    :param to_phone:   Destination phone number in E.164 format
    :param script:     Text to speak during the call
    :return:           Raw response dict from the SDK
    """
    try:
        return client.call.dispatch_call(
            agent_id=agent_id,
            to_number=to_phone,
            call_context={"script": script}
        )
    except Exception as e:
        # Propagate as RuntimeError for router handling
        raise RuntimeError(f"Call dispatch failed: {e}")

# -------------------------------------------------------------------
# Fetch a paginated list of call logs
# -------------------------------------------------------------------

def get_call_logs(page: int = 1, page_size: int = 30, agent_id: int | None = None) -> list[dict]:
    """
    Retrieves call logs with optional agent filter.

    :param page:       Page number
    :param page_size:  Number of items per page
    :param agent_id:   Optional agent ID to filter logs
    :return:           List of call log dicts
    """
    try:
        params = {"page": page, "page_size": page_size}
        if agent_id is not None:
            params["agent_id"] = agent_id
        return client.call.get_call_logs(**params)
    except Exception as e:
        raise RuntimeError(f"Fetch call logs failed: {e}")

# -------------------------------------------------------------------
# Fetch details for a single call log
# -------------------------------------------------------------------

def get_call_log(call_id: str) -> dict:
    """
    Retrieves a single call log detail.

    :param call_id: ID of the call to fetch
    :return:        Call log dict
    """
    try:
        return client.call.get_call_log(call_id)
    except Exception as e:
        raise RuntimeError(f"Fetch call log failed: {e}")

# -------------------------------------------------------------------
# List all available agents for the API key
# -------------------------------------------------------------------

def list_agents() -> list[dict]:
    """
    Returns the list of agents accessible by the current API key.

    Parses the SDK response or HTTP response to return a plain list of agent dicts.
    """
    try:
        resp = client.agent.list()
        # If resp is a Response-like object
        if hasattr(resp, 'json'):
            data = resp.json()
        else:
            # SDK may wrap JSON under 'json' key
            data = resp.get('json', resp)
        # Most SDKs return agents under 'bots' key
        agents = data.get('bots', data)
        return agents
    except Exception as e:
        raise RuntimeError(f"Fetch agents failed: {e}")
