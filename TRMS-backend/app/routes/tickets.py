from fastapi import APIRouter, HTTPException
from app.db import db
from app.models import SupportTicket

router = APIRouter()

@router.get("/", response_model=list[SupportTicket])
async def list_tickets():
    tickets = []
    async for ticket in db.support_ticket.find():
        ticket["_id"] = str(ticket["_id"])
        tickets.append(ticket)
    return tickets

@router.get("/{ticket_id}", response_model=SupportTicket)
async def get_ticket(ticket_id: int):
    ticket = await db.support_ticket.find_one({"ticket_id": ticket_id})
    if not ticket:
        raise HTTPException(404)
    ticket["_id"] = str(ticket["_id"])
    return ticket

@router.post("/", response_model=SupportTicket)
async def add_ticket(ticket: SupportTicket):
    exists = await db.support_ticket.find_one({"ticket_id": ticket.ticket_id})
    if exists:
        raise HTTPException(409)
    await db.support_ticket.insert_one(ticket.dict())
    return ticket

@router.put("/{ticket_id}")
async def update_ticket(ticket_id: int, ticket: SupportTicket):
    res = await db.support_ticket.update_one({"ticket_id": ticket_id}, {"$set": ticket.dict()})
    if res.modified_count == 0:
        raise HTTPException(404)
    return {"message": "Ticket updated"}

@router.delete("/{ticket_id}")
async def delete_ticket(ticket_id: int):
    res = await db.support_ticket.delete_one({"ticket_id": ticket_id})
    if res.deleted_count == 0:
        raise HTTPException(404)
    return {"message": "Ticket deleted"}