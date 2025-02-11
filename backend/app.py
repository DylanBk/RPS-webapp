from modules import *


app = Flask(__name__, static_folder='../frontend/build')
app.secret_key = "secret"
app.permanent_session_lifetime = timedelta(minutes=10)
CORS(app)
socket = SocketIO(app=app, debug=True, cors_allowed_origins="*", async_mode='eventlet')

@socket.on('connect')
def handle_connect():
    print("Client connected to server")
    socket.emit('message', 'websocket connection established')

    if db.queue_exists():
        print('joining server')
        p2_id = db.get_queued_user()
        session['id'] = 1
        db.create_server(p1_id=session['id'], p2_id=p2_id)

        socket.emit("joining_room", {"message": "connecting to server", "room": "server"}), 200
    else:
        print('no queue')
        session['id'] = 2
        db.join_queue(p_id=session['id'])

        socket.emit("joining_room", {"message": "joining queue", "room": "queue"}), 200

# @socket.on('move')
# def handle_roll(data):
#     s_id, p_id, move = data.values()
#     print(s_id, p_id, move)
#     socket.emit('message', f"server received: {data}")

#     if db.move_check(s_id):
#         p1_move, p2_move = db.get_moves(s_id)

#         match p1_move: # 0 rock, 1 paper, 2 scissors
#             case 0:
#                 if p2_move == 0:
#                     pass # return draw
#                 elif p2_move == 1:
#                     db.add_point(s_id, 'p2')
#                 else:
#                     db.add_point(s_id, 'p1')
#             case 1:
#                 if p2_move == 0:
#                     db.add_point(s_id, 'p1')
#                 elif p2_move == 1:
#                     pass # return draw
#                 else:
#                     db.add_point(s_id, 'p2')
#             case 2:
#                 if p2_move == 0:
#                     db.add_point(s_id, 'p2')
#                 elif p2_move == 1:
#                     db.add_point(s_id, 'p1')
#                 else:
#                     pass # return draw
#     else:
#         db.add_move(s_id, p_id, move)


@socket.on('disconnect')
def handle_disconnect():
    print("Client disconnected from server")


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if session:
        return jsonify({"error": "Already signed in"}, 400)
    if request.method == 'POST':
        username, email, pw = request.get_json().values()
        print(username, email, pw)
        if db.user_exists(email):
            return jsonify({"error": "A user with that email already exists"})

        db.create_user(email, pw, username)

        return jsonify({"message": "Signed up successfully"}), 200
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if session:
        return jsonify({"error": "Already signed in"}), 400
    if request.method == 'POST':
        email, pw = request.get_json().values()
        print(email, pw)
        if db.user_exists(email):
            if db.check_pw(email, pw):
                data = db.get_session_data(email)

                session['id'] = data['id']
                session['email'] = email
                session['role'] = data['role']

                return jsonify({"message": "User signed in successfully"}), 200
            return jsonify({"error": "Incorrect Password"}), 400
        return jsonify({"error": "A user with that email does not exist"}), 400


if __name__ == "__main__":
    socket.run(app)
    db.setup()