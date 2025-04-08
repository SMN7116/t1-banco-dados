from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Conexão com o MySQL (substitua com suas credenciais)
DATABASE_URL = "mysql+pymysql://root:password@localhost/sistema_db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Modelo de Tarefa
class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100))
    completed = Column(Boolean, default=False)

# Cria as tabelas no banco de dados
Base.metadata.create_all(bind=engine)