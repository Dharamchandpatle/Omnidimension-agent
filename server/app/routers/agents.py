# server/app/routers/agents.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Any

from ..services.omnidi_client import list_agents

router = APIRouter()

class Agent(BaseModel):
    id: int
    name: str

@router.get("/", response_model=List[Agent], summary="List available agents")
def get_agents():
    try:
        raw = list_agents()   # यहाँ SDK कॉल होगा
        return raw
    except Exception as e:
        # Console में पूरा ट्रेस देखो
        import traceback; traceback.print_exc()
        # API से आया साफ़ मैसेज क्लाइंट को भेजो
        raise HTTPException(status_code=502, detail=f"Agents fetch failed: {e}")
