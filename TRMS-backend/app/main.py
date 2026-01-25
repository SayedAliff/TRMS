from fastapi import FastAPI
from app.routes import user
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(user.router, prefix="/api/users", tags=["users"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # dev only, prod-এ ঠিক করো
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)