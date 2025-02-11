import bcrypt
import os
from random import randint
from sqlalchemy import create_engine, Column, String, Integer, ForeignKey, inspect, MetaData, select, insert, and_
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import time

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

class Queue(base):
    __tablename__ = "Queue"

    id = Column(String, unique=True, primary_key=True)
    p_id = Column(Integer, ForeignKey('Users.id'))

    def __init__(self, id, p_id):
        self.id = id
        self.p_id = p_id

class Server(base):
    __tablename__ = "Server"

    id = Column(String, unique=True, primary_key=True)
    p1_id = Column(Integer, ForeignKey('Users.id'))
    p2_id = Column(Integer, ForeignKey('Users.id'))
    p1_move = Column(Integer) # 0 = rock, 1 = paper, 2 = scissors
    p2_move = Column(Integer)
    p1_points = Column(Integer, default=0)
    p2_points = Column(Integer, default=0)

    def __init__(self, id, p1_id, p2_id):
        self.id = id
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
    with Session() as s:
        check = s.query(User).filter(and_(User.email == "admin@rps.com")).one_or_none()

    if check:
        return

    pw = "password"
    admin = User(email="admin@rps.com", password=pw, username="Admin", role="Admin")

    with Session() as s:
        s.add(admin)
        s.commit()

    print("db setup complete")


# --- USER ---

# AUTH

def user_exists(email):

    with Session() as s:
        user = s.query(User).filter(and_(User.email == email)).one_or_none()

    if user:
        return True
    return False

def enc_pw(pw):
    b = pw.encode('utf-8')
    s = bcrypt.gensalt(12)
    h_pw = bcrypt.hashpw(b, s)

    return h_pw

def check_pw(email, pw):
    with Session() as s:
        user = s.query(User).filter(and_(User.email == email))

    h_pw = user.password
    b = pw.encode('utf-8')

    return bcrypt.checkpw(b, h_pw)

def get_session_data(email):
    with Session() as s:
        pass

# CRUD

def create_user(email, pw, username):
    pw = enc_pw(pw)

    user = User(email=email, password=pw, username=username)

    with Session() as s:
        s.add(user)
        s.commit()

def get_user(*kwargs):
    id = kwargs.get('id', None)
    email = kwargs.get('email', None)

    with Session() as s:
        if id:
            user = s.query(User).filter(and_(User.id == id)).one_or_none()
        else:
            user = s.query(User).filter(and_(User.email == email)).one_or_none()

    return user

def update_user(id, updates):
    with Session() as s:
        user = s.query(User).filter(and_(User.id == id)).one_or_none()

        for col, v in updates.items():
            setattr(user, col, v)

        s.commit()

def delete_user(id):
    with Session() as s:
        user = s.query(User).filter(and_(User.id == id)).one_or_none()

        s.delete(user)
        s.commit()


# --- QUEUE ---

def queue_exists():
    with Session() as s:
        queue = s.query(Queue).first()

    if queue:
        return True
    return False

def join_queue(p_id):
    r_int = randint(1000, 9999)
    ts = str(int(time.time()))
    id = f"{ts}-{r_int}"

    queue = Queue(id, p_id)

    with Session() as s:
        s.add(queue)
        s.commit()

def get_queued_user():
    with Session() as s:
        queue = s.query(Queue).first()

    return queue.p_id


# --- SERVER ---

def create_server(p1_id, p2_id):
    r_int = randint(1000, 9999)
    ts = str(int(time.time()))
    id = f"{ts}-{r_int}" # unique server id = epoch timestamp + random int

    server = Server(id=id, p1_id=p1_id, p2_id=p2_id)

    with Session() as s: # remove user from queue and move them to server
        queue = s.query(Queue).filter(and_(Queue.p_id == p2_id)).one_or_none()
        s.delete(queue)
        s.add(server)
        s.commit()

def move_check(s_id):
    with Session() as s:
        server = s.query(Server).filter(and_(Server.id == s_id)).one_or_none()

    if server.p1_move and server.p2_move:
        print("both players moved")
        return True
    return False

def add_move(s_id, p_id, move):
    with Session() as s:
        server = s.query(Server).filter(and_(Server.id == s_id)).one_or_none()

        if server.p1_id == p_id:
            setattr(server, 'p1_move', move)
        else:
            setattr(server, 'p2_move', move)

        s.commit()

def add_point(s_id, p):
    with Session() as s:
        server = s.query(Server).filter(and_(Server.id == s_id))

        match p:
            case 'p1':
                setattr(server, 'p1_points', (server.p1_points + 1))
            case 'p2':
                setattr(server, 'p2_points', (server.p2_points + 1))

        s.commit()