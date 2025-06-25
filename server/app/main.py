from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers.tasks import router as tasks_router
from .routers.calls import router as calls_router
from .routers.agents import router as agents_router

app = FastAPI(title="OmniDimension Multi-Agent API")

# Enable CORS for local frontend (adjust origin in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

# Router registration
app.include_router(tasks_router,  prefix="/api/tasks", tags=["tasks"])
app.include_router(calls_router,  prefix="/api/calls", tags=["calls"])
app.include_router(agents_router, prefix="/api/agents", tags=["agents"])
