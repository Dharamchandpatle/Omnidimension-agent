from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.planner import plan_and_execute

router = APIRouter()

class TaskRequest(BaseModel):
    prompt: str

class TaskResponse(BaseModel):
    task_id: str
    status: str
    result: dict

@router.post("/", response_model=TaskResponse)
def create_task(req: TaskRequest):
    try:
        task_id, result = plan_and_execute(req.prompt)
        return TaskResponse(task_id=task_id, status="completed", result=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))