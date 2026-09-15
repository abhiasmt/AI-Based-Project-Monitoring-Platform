from fastapi import FastAPI
from dotenv import load_dotenv
import os

from app.routes import risk
from app.routes import delay
from app.routes import resource

load_dotenv()

app = FastAPI(
    title="AI-Based Project Monitoring Platform",
    description="AI service for project risk, delay, and resource prediction",
    version="1.0.0"
)


app.include_router(risk.router)
app.include_router(delay.router)
app.include_router(resource.router)


@app.get("/")
def root():
    return {
        "success": True,
        "message": "AI Service is running"
    }


@app.get("/health")
def health():
    return {
        "success": True,
        "service": "AI Service",
        "status": "healthy"
    }


if __name__ == "__main__":
    import uvicorn

    host = os.getenv(
        "AI_SERVICE_HOST",
        "0.0.0.0"
    )

    port = int(
        os.getenv(
            "AI_SERVICE_PORT",
            "8000"
        )
    )

    uvicorn.run(
        "app.main:app",
        host=host,
        port=port,
        reload=True
    )