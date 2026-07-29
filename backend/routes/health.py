from fastapi import APIRouter
import time

router = APIRouter()

from services.gemini_service import is_gemini_configured

_START_TIME = time.time()

@router.get("/health")
async def health_check():
    return {
        "status": "online",
        "service": "SecurePrompt AI Engine",
        "version": "1.0.0",
        "gemini_api_configured": is_gemini_configured(),
        "gemini_model": "gemini-2.5-flash",
        "gemini_key_status": "Active Key Loaded from .env" if is_gemini_configured() else "Placeholder / Key Not Set",
        "uptime_seconds": round(time.time() - _START_TIME, 2)
    }
