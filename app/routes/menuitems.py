from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import models, schemas, database

router = APIRouter(prefix="/menuitems", tags=["MenuItems"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.MenuItemOut])
def list_menu_items(db: Session = Depends(get_db)):
    return db.query(models.MenuItem).all()
