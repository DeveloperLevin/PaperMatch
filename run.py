from app import create_app

# Instantiate the flask app
app = create_app()

if __name__ == "__main__":
    app.run(debug=true)