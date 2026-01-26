from pydantic import BaseModel
from typing import Optional

# Taxpayer model (for login, registration, dashboard)
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

# Officer model (role/rank required for dashboard selection)
class Officer(BaseModel):
    officer_id: int
    first_name: str
    last_name: str
    rank: str  # "Assistant", "Officer", "Inspector", "Commissioner", "Manager"
    branch: str
    house_no: str
    street: str
    city: str
    zip_code: str
    password: str

# Tax Return
class TaxReturn(BaseModel):
    return_id: int
    assessment_year: str
    total_income: float
    taxable_amount: float
    filing_date: str
    tin: int
    category_id: int
    officer_id: int

# Payment
class Payment(BaseModel):
    payment_id: int
    amount: float
    method: str
    status: str
    transaction_time: str
    return_id: int

# Support Ticket
class SupportTicket(BaseModel):
    ticket_id: int
    issue_desc: str
    sub_date: str
    res_status: str
    tin: int
    officer_id: int