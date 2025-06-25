from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Any, Dict

from ..services.planner import plan_and_execute

router = APIRouter()

class TaskRequest(BaseModel):
    prompt: str

class TaskResponse(BaseModel):
    task_id: str
    status: str
    result: Dict[str, Any]

@router.post("/", response_model=TaskResponse, summary="Create a new orchestration task")
def create_task(req: TaskRequest):
    try:
        task_id, result = plan_and_execute(req.prompt)
        return TaskResponse(task_id=task_id, status="completed", result=result)
    except Exception as e:
        print("🔥 Task execution error:", repr(e))
        raise HTTPException(status_code=500, detail=str(e))
