# app/seed.py
import sys
import os
import json
from faker import Faker
from app import models, database
from sqlalchemy.orm import Session
import random

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

fake = Faker()
db: Session = database.SessionLocal()

def seed_menuitems():
    import os
    # Obtém o diretório onde seed.py está localizado
    current_dir = os.path.dirname(os.path.abspath(__file__))
    menu_path = os.path.join(current_dir, "menus.json")
    with open(menu_path, encoding='utf-8') as f:
        menu_items = json.load(f)
    
    print("Itens lidos do menus.json:", len(menu_items))  # Mensagem de debug

    for item in menu_items:
        menu_item = models.MenuItem(
            name=item['name'],
            description=item['description'],
            image=item['image'],
            price=float(item['price'])
        )
        db.add(menu_item)


def seed_customers_and_orders():
    for _ in range(8):
        customer = models.Customer(
            name=fake.name(),
            email=fake.unique.email(),
            phone=fake.phone_number()
        )
        db.add(customer)
        db.flush()  # para obter o ID do cliente

        for _ in range(3):
            order = models.Order(
                description=fake.sentence(),
                amount=random.uniform(10, 500),
                customer_id=customer.id,
                status=random.choice(["pending", "paid", "cancelled"]),
                table_number=random.randint(1, 99)  # atribuindo mesa aleatória
            )
            db.add(order)

def seed():
    seed_menuitems()
    seed_customers_and_orders()
    db.commit()
    db.close()
    print("✅ Banco populado com sucesso!")

if __name__ == "__main__":
    seed()
