from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Any, List, Optional
import json

from ..services.omnidi_client import create_call, get_call_logs

router = APIRouter()

class DispatchRequest(BaseModel):
    agent_id: int
    to_number: str
    call_context: dict = {}

class DispatchResponse(BaseModel):
    call_id: str
    status: str
    raw: Any

class CallLog(BaseModel):
    call_id: str
    status: str
    timestamp: str
    raw: Any

@router.post("/dispatch", response_model=DispatchResponse, summary="Dispatch a voice call")
def dispatch_call(req: DispatchRequest):
    try:
        resp = create_call(
            agent_id=req.agent_id,
            to_phone=req.to_number,
            script=req.call_context.get("script", "")
        )
        return DispatchResponse(
            call_id=resp.get("id", ""),
            status=str(resp.get("status", "")),
            raw=resp
        )
    except Exception as e:
        print("🔥 Dispatch error:", repr(e))
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/logs", response_model=List[CallLog], summary="List call logs")
def fetch_call_logs(
    page: int = 1,
    page_size: int = 30,
    agent_id: Optional[int] = None
):
    try:
        raw_logs = get_call_logs(page=page, page_size=page_size, agent_id=agent_id)
        formatted: List[CallLog] = []
        for entry in raw_logs:
            # If entry is a JSON string, parse it first
            if isinstance(entry, str):
                try:
                    lg = json.loads(entry)
                except json.JSONDecodeError:
                    continue
            elif isinstance(entry, dict):
                lg = entry
            else:
                # unsupported type
                continue

            formatted.append(CallLog(
                call_id=lg.get("id", ""),
                status=str(lg.get("status", "")),
                timestamp=lg.get("created_at", lg.get("timestamp", "")),
                raw=lg
            ))
        return formatted
    except Exception as e:
        print("🔥 Logs fetch error:", repr(e))
        raise HTTPException(status_code=500, detail=str(e))
