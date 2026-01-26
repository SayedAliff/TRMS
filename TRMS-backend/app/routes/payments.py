from fastapi import APIRouter, HTTPException
from app.db import db
from app.models import Payment

router = APIRouter()

@router.get("/", response_model=list[Payment])
async def list_payments():
    payments = []
    async for payment in db.payment.find():
        payment["_id"] = str(payment["_id"])
        payments.append(payment)
    return payments

@router.get("/{payment_id}", response_model=Payment)
async def get_payment(payment_id: int):
    payment = await db.payment.find_one({"payment_id": payment_id})
    if not payment:
        raise HTTPException(404)
    payment["_id"] = str(payment["_id"])
    return payment

@router.post("/", response_model=Payment)
async def add_payment(payment: Payment):
    exists = await db.payment.find_one({"payment_id": payment.payment_id})
    if exists:
        raise HTTPException(409)
    await db.payment.insert_one(payment.dict())
    return payment

@router.put("/{payment_id}")
async def update_payment(payment_id: int, payment: Payment):
    res = await db.payment.update_one({"payment_id": payment_id}, {"$set": payment.dict()})
    if res.modified_count == 0:
        raise HTTPException(404)
    return {"message": "Payment updated"}

@router.delete("/{payment_id}")
async def delete_payment(payment_id: int):
    res = await db.payment.delete_one({"payment_id": payment_id})
    if res.deleted_count == 0:
        raise HTTPException(404)
    return {"message": "Payment deleted"}