import eventlet.wsgi
from modules import *


app = Flask(__name__, static_folder='../frontend/build')
app.secret_key = "secret"
app.permanent_session_lifetime = timedelta(minutes=10)
CORS(app)
socket = SocketIO(app=app, debug=True, cors_allowed_origins="*", async_mode='eventlet')

@socket.on('connect')
def handle_connect():
    print("Client connected to server")

@socket.on('message')
def handle_message(data):
    print(f"data sent from client: {data}")
    socket.emit('message', f"server received: {data}")

@socket.on('roll')
def handle_roll(data):
    id, move = data.values()
    print(id, move)
    socket.emit('message', f"server received: {data}")

@socket.on('disconnect')
def handle_disconnect():
    print("Client disconnected from server")


if __name__ == "__main__":
    socket.run(app)
    db.setup()