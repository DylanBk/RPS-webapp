from modules import *


app = Flask(__name__, static_folder='../frontend/build')
CORS(app)

app.secret_key = "secret"
app.permanent_session_lifetime = timedelta(minutes=10)




if __name__ == "__main__":
    app.run(port=5000)
    db.setup()