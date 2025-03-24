from fastapi import FastAPI
from app import models, database
from app.routes import customers, orders, menuitems  # Adicionado menuitems aqui
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(customers.router)
app.include_router(orders.router)
app.include_router(menuitems.router)  # Nova rota adicionada aqui

@app.on_event("startup")
def on_start():
    models.Base.metadata.create_all(bind=database.engine)

@app.get("/")
def read_root():
    return {"msg": "API is running"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
