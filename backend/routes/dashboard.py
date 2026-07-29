from fastapi import APIRouter
from services.firebase_service import fetch_dashboard_analytics

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard_metrics():
    return fetch_dashboard_analytics()
