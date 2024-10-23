from flask import Blueprint

main = Blueprint('main', __name__)

@main.route('/api/recommend', methods=['POST'])
def home():
    return 
