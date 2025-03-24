# app/models.py
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func, Float, Enum, Text
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime
import enum

class StatusEnum(enum.Enum):
    pending = "pending"
    paid = "paid"
    cancelled = "cancelled"

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String)
    created_at = Column(DateTime, server_default=func.now())

    orders = relationship("Order", back_populates="customer")

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=True)
    amount = Column(Float, nullable=False)
    status = Column(Enum(StatusEnum), default=StatusEnum.pending)
    created_at = Column(DateTime, default=datetime.utcnow)
    table_number = Column(Integer, nullable=False) 

    customer_id = Column(Integer, ForeignKey("customers.id"))
    customer = relationship("Customer", back_populates="orders")

class MenuItem(Base):
    __tablename__ = "menuitems"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    image = Column(String, nullable=True)
    price = Column(Float, nullable=False)
