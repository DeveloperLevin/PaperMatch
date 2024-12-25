from app import create_app
from flask_cors import CORS

# Instantiate the flask app
app = create_app()
CORS(app)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)