from fastapi import APIRouter, Query
from typing import Optional
from services.firebase_service import fetch_prediction_logs

router = APIRouter()

@router.get("/logs")
async def get_logs(
    search: Optional[str] = Query("", description="Search term for prompts or categories"),
    category: Optional[str] = Query("", description="Category or status filter"),
    date_filter: Optional[str] = Query("", description="Date filter YYYY-MM-DD"),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100)
):
    return fetch_prediction_logs(
        search_query=search,
        category=category,
        date_filter=date_filter,
        page=page,
        limit=limit
    )
