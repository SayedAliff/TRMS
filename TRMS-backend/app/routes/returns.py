from fastapi import APIRouter, HTTPException
from app.db import db
from app.models import TaxReturn

router = APIRouter()

@router.get("/", response_model=list[TaxReturn])
async def all_returns():
    docs = []
    async for item in db.tax_return.find():
        item["_id"] = str(item["_id"])
        docs.append(item)
    return docs

@router.get("/{return_id}", response_model=TaxReturn)
async def get_return(return_id: int):
    item = await db.tax_return.find_one({"return_id": return_id})
    if not item:
        raise HTTPException(404)
    item["_id"] = str(item["_id"])
    return item

@router.post("/", response_model=TaxReturn)
async def add_return(new: TaxReturn):
    exists = await db.tax_return.find_one({"return_id": new.return_id})
    if exists:
        raise HTTPException(409)
    await db.tax_return.insert_one(new.dict())
    return new

@router.put("/{return_id}")
async def update_return(return_id: int, updates: TaxReturn):
    res = await db.tax_return.update_one({"return_id": return_id}, {"$set": updates.dict()})
    if res.modified_count == 0:
        raise HTTPException(404)
    return {"message": "updated"}

@router.delete("/{return_id}")
async def delete(return_id: int):
    res = await db.tax_return.delete_one({"return_id": return_id})
    if res.deleted_count == 0:
        raise HTTPException(404)
    return {"message": "deleted"}