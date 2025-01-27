import bcrypt
from sqlalchemy import create_engine, Column, String, Integer, ForeignKey, inspect, MetaData, select, insert, and_
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

base = declarative_base()

class User(base):
    __tablename__ = "Users"

    id = Column(Integer, autoincrement=True, unique=True)
    email = Column(String, unique=True)
    password = Column(String)
    username = Column(String)
    level = Column(Integer)
    rank = Column(String)
    record = Column(String) # number of wins, losses, draws
    rolls = Column(String) # number of rocks, papers, scissors rolled
    #TODO: add column for recent matches, needs: result, roll, opponent (if not anonymous mode)

    def __init__(self, id, email, password, username):