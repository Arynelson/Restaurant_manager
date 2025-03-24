from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
print("Conectando ao banco em:", DATABASE_URL)

engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))  # 👈 corrigido usando text()
        print("Conexão com banco funcionando perfeitamente:", result.fetchone())
except Exception as e:
    print("Erro ao conectar no banco:", e)