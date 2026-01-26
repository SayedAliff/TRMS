from fastapi import APIRouter, HTTPException, Body
from app.db import db
from app.models import Taxpayer

router = APIRouter()

@router.post("/login/")
async def login(
    tin: int = Body(default=None),
    officer_id: int = Body(default=None),
    password: str = Body(...)
):
    # Taxpayer login (dashboard: taxpayer)
    if tin is not None:
        user = await db.taxpayer.find_one({"tin": tin, "password": password})
        if user:
            user["_id"] = str(user["_id"])
            user["user_type"] = "taxpayer"
            return {"user": user, "token": "fake-jwt"}
        raise HTTPException(401, detail="Invalid TIN or password")

    # Officer/manager login (dashboard: officer/manager)
    if officer_id is not None:
        user = await db.tax_officer.find_one({"officer_id": officer_id, "password": password})
        if user:
            user["_id"] = str(user["_id"])
            manager_ranks = ["Manager", "Commissioner"]
            if user["rank"] in manager_ranks:
                user["user_type"] = "manager"
            else:
                user["user_type"] = "officer"
            return {"user": user, "token": "fake-jwt"}
        raise HTTPException(401, detail="Invalid Officer ID or password")

    raise HTTPException(400, detail="Must provide either tin or officer_id and password.")

@router.post("/register/")
async def register(user: Taxpayer):
    exists = await db.taxpayer.find_one({"tin": user.tin})
    if exists:
        raise HTTPException(409, detail="TIN already exists")
    await db.taxpayer.insert_one(user.dict())
    return {"message": "Taxpayer registered", "tin": user.tin, "user_type": "taxpayer"}