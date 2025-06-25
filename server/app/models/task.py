#    python
from pydantic import BaseModel

class TaskRequest(BaseModel):
    prompt: str
