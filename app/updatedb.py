from app import models, database

# Exclui todas as tabelas
models.Base.metadata.drop_all(bind=database.engine)
# Cria as tabelas novamente com a nova estrutura
models.Base.metadata.create_all(bind=database.engine)

print("Banco atualizado com sucesso!")
