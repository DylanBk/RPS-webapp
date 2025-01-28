import bcrypt
import datetime
import os
from sqlalchemy import create_engine, Column, String, Integer, ForeignKey, inspect, MetaData, select, insert, and_
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

base = declarative_base()

class User(base):
    __tablename__ = "Users"

    id = Column(Integer, autoincrement=True, unique=True, primary_key=True)
    email = Column(String, unique=True)
    password = Column(String)
    role = Column(String, default="User")
    username = Column(String)
    level = Column(Integer, default=0)
    rank = Column(String, default="Unranked")
    wins = Column(Integer, default=0)
    losses = Column(Integer, default=0)
    draws = Column(Integer, default=0)
    rocks = Column(Integer, default=0)
    papers = Column(Integer, default=0)
    scissors = Column(Integer, default=0)
    #TODO: add column for recent matches, needs: result, roll, opponent (if not anonymous mode)

    def __init__(self, email, password, username, role=None):
        self.email = email
        self.password = password
        self.username = username

        if role: # admin role can be passed in on creation of admin accounts
            self.role = role

class Server(base):
    __tablename__ = "Server"

    id = Column(Integer, unique=True, primary_key=True)
    init = Column(String) # pass in datetime
    p1_id = Column(Integer, ForeignKey('Users.id'))
    p2_id = Column(Integer, ForeignKey('Users.id'))
    p1_roll = Column(Integer) # 0 = rock, 1 = paper, 2 = scissors
    p2_roll = Column(Integer)
    p1_points = Column(Integer, default=0)
    p2_points = Column(Integer, default=0)

    def __init__(self, id, init, p1_id, p2_id):
        self.id = id
        self.init = init
        self.p1_id = p1_id
        self.p2_id = p2_id


basedir = os.path.abspath(os.path.dirname(__file__))
instance_dir = os.path.join(basedir, '..', 'instance')
instance_dir = os.path.abspath(instance_dir)

if not os.path.exists(instance_dir):
    os.makedirs(instance_dir)

db_path = os.path.join(instance_dir, 'mydb.db')

engine = create_engine(f"sqlite:///{db_path}", echo=True)
base.metadata.create_all(bind=engine)
md = MetaData()
md.reflect(bind=engine)
Session = sessionmaker(bind=engine)
inspector = inspect(engine)


# --- DATABASE FUNCTIONS ---


def setup():
    with Session as s:
        check = s.query(User).filter(and_(User.email == "admin@rps.com")).one_or_none()

    if check:
        return

    pw = "password"
    admin = User(email="admin@rps.com", password=pw, username="Admin", role="Admin")

    with Session as s:
        s.add(admin)
        s.commit()

    print("db setup complete")