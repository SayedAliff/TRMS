from fastapi import FastAPI
from app.routes import user, taxpayer, officer, payments, returns, tickets
from fastapi.middleware.cors import CORSMiddleware




app = FastAPI()


app.include_router(user.router, prefix="/api/users", tags=["users"])
app.include_router(taxpayer.router, prefix="/api/taxpayers", tags=["taxpayers"])
app.include_router(officer.router, prefix="/api/officers", tags=["officers"])
app.include_router(payments.router, prefix="/api/payments", tags=["payments"])
app.include_router(returns.router, prefix="/api/returns", tags=["returns"])
app.include_router(tickets.router, prefix="/api/tickets", tags=["tickets"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"]
)