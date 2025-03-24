# app/schemas.py
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class CustomerBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None

class CustomerCreate(CustomerBase):
    pass

class CustomerOut(CustomerBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class OrderBase(BaseModel):
    description: Optional[str] = None
    amount: float
    status: Optional[str] = "pending"
    table_number: int  # novo campo

class OrderCreate(OrderBase):
    customer_id: int

class OrderOut(OrderBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class MenuItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    image: Optional[str] = None
    price: float

class MenuItemCreate(MenuItemBase):
    pass

class MenuItemOut(MenuItemBase):
    id: int

    class Config:
        orm_mode = True
