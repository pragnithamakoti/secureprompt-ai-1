import sys
import os
from dotenv import load_dotenv

# Load environment variables (.env)
load_dotenv()

# Add backend directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import predict, logs, dashboard, health

app = FastAPI(
    title="SecurePrompt AI API",
    description="Intelligent LLM Jailbreak Detection, Threat Analysis, and Safe Prompt Recommendation Platform API",
    version="1.0.0"
)

# Enable CORS for local dev and production frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(predict.router)
app.include_router(logs.router)
app.include_router(dashboard.router)
app.include_router(health.router)

@app.get("/")
async def root():
    return {
        "title": "SecurePrompt AI Backend",
        "status": "active",
        "documentation": "/docs",
        "endpoints": ["/predict", "/logs", "/dashboard", "/health"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
