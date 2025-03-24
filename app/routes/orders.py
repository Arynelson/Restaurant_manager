from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from app import models, schemas, database
from sqlalchemy import func

router = APIRouter(prefix="/orders", tags=["Orders"])


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=schemas.OrderOut)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    customer = (
        db.query(models.Customer)
        .filter(models.Customer.id == order.customer_id)
        .first()
    )
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    new_order = models.Order(**order.dict())
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order


@router.put("/{order_id}", response_model=schemas.OrderOut)
def update_order(
    order_id: int, updated: schemas.OrderCreate, db: Session = Depends(get_db)
):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    for key, value in updated.dict().items():
        setattr(order, key, value)

    db.commit()
    db.refresh(order)
    return order


@router.get("/", response_model=list[schemas.OrderOut])
def list_orders(
    db: Session = Depends(get_db),
    status: Optional[str] = None,
    customer_id: Optional[int] = None,
):
    try:
        query = db.query(models.Order)
        if status:
            query = query.filter(models.Order.status == status)
        if customer_id:
            query = query.filter(models.Order.customer_id == customer_id)
        return query.order_by(models.Order.created_at.desc()).all()
    except Exception as e:
        print("Erro ao buscar pedidos:", e)
        raise HTTPException(status_code=500, detail="Erro interno ao buscar pedidos")


@router.get("/summary")
def get_global_summary(db: Session = Depends(get_db)):
    total_orders = db.query(func.count(models.Order.id)).scalar()
    total_amount = db.query(func.coalesce(func.sum(models.Order.amount), 0)).scalar()

    status_counts = {
        status: count
        for status, count in db.query(models.Order.status, func.count(models.Order.id))
        .group_by(models.Order.status)
        .all()
    }

    status_amounts = {
        status: float(amount)
        for status, amount in db.query(
            models.Order.status, func.coalesce(func.sum(models.Order.amount), 0)
        )
        .group_by(models.Order.status)
        .all()
    }

    return {
        "total_orders": total_orders,
        "total_amount": float(total_amount),
        "status_counts": status_counts,
        "status_amounts": status_amounts,
    }


@router.delete("/{order_id}", status_code=204)
def delete_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    db.delete(order)
    db.commit()
    return None

@router.get("/{order_id}", response_model=schemas.OrderOut)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
