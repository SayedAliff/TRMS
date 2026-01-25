from pydantic import BaseModel
from typing import Optional

class Taxpayer(BaseModel):
    tin: int
    first_name: str
    last_name: str
    date_of_birth: str
    gender: str
    house_no: str
    street: str
    city: str
    zip_code: str
    username: str
    password: str
    phone_number_1: str
    phone_number_2: Optional[str] = None
    phone_number_3: Optional[str] = None
    zone_code: int

class Officer(BaseModel):
    officer_id: int
    first_name: str
    last_name: str
    rank: str
    branch: str
    house_no: str
    street: str
    city: str
    zip_code: str
    password: str

