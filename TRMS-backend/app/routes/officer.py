from fastapi import APIRouter, HTTPException
from app.db import db
from app.models import Officer

router = APIRouter()

@router.get("/", response_model=list[Officer])
async def list_officers():
    officers = []
    async for officer in db.tax_officer.find():
        officer["_id"] = str(officer["_id"])
        officers.append(officer)
    return officers

@router.get("/{officer_id}", response_model=Officer)
async def get_officer(officer_id: int):
    officer = await db.tax_officer.find_one({"officer_id": officer_id})
    if not officer:
        raise HTTPException(404)
    officer["_id"] = str(officer["_id"])
    return officer

@router.put("/{officer_id}/promote")
async def promote_officer(officer_id: int):
    promote_order = ['Assistant', 'Officer', 'Inspector', 'Commissioner', 'Manager']
    officer = await db.tax_officer.find_one({"officer_id": officer_id})
    if not officer:
        raise HTTPException(404)
    try:
        idx = promote_order.index(officer['rank'])
        if idx + 1 < len(promote_order):
            new_rank = promote_order[idx+1]
            await db.tax_officer.update_one({"officer_id": officer_id}, {"$set": {"rank": new_rank}})
            return {"message": f"Promoted to {new_rank}"}
        else:
            return {"message": "Already highest rank"}
    except ValueError:
        raise HTTPException(400, detail="Invalid rank value.")

@router.put("/{officer_id}/demote")
async def demote_officer(officer_id: int):
    demote_order = ['Manager', 'Commissioner', 'Inspector', 'Officer', 'Assistant']
    demote_order = demote_order[::-1]
    officer = await db.tax_officer.find_one({"officer_id": officer_id})
    if not officer:
        raise HTTPException(404)
    try:
        idx = demote_order.index(officer['rank'])
        if idx + 1 < len(demote_order):
            new_rank = demote_order[idx+1]
            await db.tax_officer.update_one({"officer_id": officer_id}, {"$set": {"rank": new_rank}})
            return {"message": f"Demoted to {new_rank}"}
        else:
            return {"message": "Already lowest rank"}
    except ValueError:
        raise HTTPException(400, detail="Invalid rank value.")