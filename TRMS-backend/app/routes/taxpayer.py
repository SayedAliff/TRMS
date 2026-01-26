from fastapi import APIRouter, HTTPException
from app.db import db
from app.models import Taxpayer

router = APIRouter()

@router.get("/", response_model=list[Taxpayer])
async def all_taxpayers():
    docs = []
    async for item in db.taxpayer.find():
        item["_id"] = str(item["_id"])
        docs.append(item)
    return docs

@router.get("/{tin}", response_model=Taxpayer)
async def get_taxpayer(tin: int):
    item = await db.taxpayer.find_one({"tin": tin})
    if not item:
        raise HTTPException(404)
    item["_id"] = str(item["_id"])
    return item

@router.put("/{tin}")
async def update_taxpayer(tin: int, updates: Taxpayer):
    res = await db.taxpayer.update_one({"tin": tin}, {"$set": updates.dict()})
    if res.modified_count == 0:
        raise HTTPException(404)
    return {"message": "updated"}

@router.delete("/{tin}")
async def delete(tin: int):
    res = await db.taxpayer.delete_one({"tin": tin})
    if res.deleted_count == 0:
        raise HTTPException(404)
    return {"message": "deleted"}