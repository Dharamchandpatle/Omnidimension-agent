from fastapi import FastAPI
from .routers import tasks

app = FastAPI(title="Multi-Agent Task Orchestrator")

# include routers
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])

@app.get("/")
def root():
    return {"message": "API is running!"}