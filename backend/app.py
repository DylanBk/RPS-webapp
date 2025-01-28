import eventlet.wsgi
from modules import *


app = Flask(__name__, static_folder='../frontend/build')
socket = SocketIO(app=app, debug=True, cors_allowed_origins="*", async_mode='eventlet')
CORS(app)

app.secret_key = "secret"
app.permanent_session_lifetime = timedelta(minutes=10)

@socket.on('connect')
def handle_connect():
    print("Client connected to server")

@socket.on('disconnect')
def handle_disconnect():
    print("Client disconnected from server")


if __name__ == "__main__":
    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 5000)), app)
    db.setup()