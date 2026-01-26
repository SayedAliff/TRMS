from fastapi import APIRouter, HTTPException, Body
from app.db import db
from app.models import Taxpayer, Officer

router = APIRouter()

@router.post("/login/")
async def login(
    tin: int = Body(default=None),
    officer_id: int = Body(default=None),
    password: str = Body(...)
):
    # ---- Taxpayer (TIN) login ----
    if tin is not None:
        user = await db.taxpayer.find_one({"tin": tin, "password": password})
        if user:
            user["_id"] = str(user["_id"])
            user["user_type"] = "taxpayer"
            return {"user": user, "token": "fake-jwt-taxpayer"}
        raise HTTPException(401, detail="Invalid TIN or password")

    # ---- Officer (OfficerID) login ----
    if officer_id is not None:
        user = await db.tax_officer.find_one({"officer_id": officer_id, "password": password})
        if user:
            user["_id"] = str(user["_id"])
            # --- Rank-based dashboard ----
            # In frontend/file you have: Assistant, Officer, Inspector, Commissioner, Manager
            # Manager ranks:
            manager_ranks = ["Commissioner", "Manager"]
            if user["rank"] in manager_ranks:
                user["user_type"] = "manager"
            else:
                user["user_type"] = "officer"
            return {"user": user, "token": "fake-jwt-officer"}
        raise HTTPException(401, detail="Invalid Officer ID or password")
    
    raise HTTPException(400, detail="You must provide either TIN (for taxpayers) or officer_id (for officers) and password.")

@router.post("/register/")
async def register(user: Taxpayer):
    exists = await db.taxpayer.find_one({"tin": user.tin})
    if exists:
        raise HTTPException(409, detail="TIN already exists")
    await db.taxpayer.insert_one(user.dict())
    return {"message": "Taxpayer registered", "tin": user.tin}