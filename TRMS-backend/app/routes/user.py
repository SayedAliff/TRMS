from fastapi import APIRouter, HTTPException
from app.db import db
from app.models import Taxpayer
router = APIRouter()

@router.post("/login/")
async def login(data: dict):
    user = await db.taxpayer.find_one({"tin": int(data["tin"]), "password": data["password"]})
    if user:
        user["_id"] = str(user["_id"])
        return {"user": user, "token": "fake-jwt"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.post("/register/")
async def register(user: Taxpayer):
    exists = await db.taxpayer.find_one({"tin": user.tin})
    if exists:
        raise HTTPException(status_code=409, detail="TIN already exists")
    await db.taxpayer.insert_one(user.dict())
    return {"message": "Taxpayer registered"}