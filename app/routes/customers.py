from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, database 
from sqlalchemy import func

router = APIRouter(prefix="/customers", tags=["Customers"])


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=schemas.CustomerOut)
def create_customer(customer: schemas.CustomerCreate, db: Session = Depends(get_db)):
    db_customer = db.query(models.Customer).filter(models.Customer.email == customer.email).first()
    if db_customer:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_customer = models.Customer(**customer.dict())
    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)
    return new_customer


@router.get("/", response_model=list[schemas.CustomerOut])
def get_customers(db: Session = Depends(get_db)):
    return db.query(models.Customer).all()

@router.get("/{customer_id}/orders/summary")
def get_customer_order_summary(customer_id: int, db: Session = Depends(get_db)):
    # Verifica existência do cliente
    customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    # Total de pedidos e valor
    total_orders = db.query(func.count(models.Order.id)).filter(models.Order.customer_id == customer_id).scalar()
    total_amount = db.query(func.coalesce(func.sum(models.Order.amount), 0)).filter(models.Order.customer_id == customer_id).scalar()

    # Contagem por status
    status_counts_query = db.query(models.Order.status, func.count()).filter(models.Order.customer_id == customer_id).group_by(models.Order.status).all()
    status_counts = {status: count for status, count in status_counts_query}

    # Soma de valores por status
    status_amounts_query = db.query(models.Order.status, func.coalesce(func.sum(models.Order.amount), 0)).filter(models.Order.customer_id == customer_id).group_by(models.Order.status).all()
    status_amounts = {status: float(amount) for status, amount in status_amounts_query}

    return {
        "total_orders": total_orders,
        "total_amount": float(total_amount),
        "status_counts": status_counts,
        "status_amounts": status_amounts
    }
