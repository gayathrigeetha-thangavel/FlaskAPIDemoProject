from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

user_input = None

@app.route("/")
def home():
    return "<h1>Hello, Flask Demo Project!</h1>"


@app.route('/user', methods=['POST'])
def add_message():
    global user_input
    data = request.get_json()
    if not data or 'message' not in data:   
        return jsonify ({"Error": "Messages should not be empty"}), 400
    user_input = data['message']
    return jsonify({"Message":"Message saved successfully"}), 201
    

@app.route('/user', methods=['GET'])
def get_message():
    global user_input
    print(f"Current message: {user_input}")
    if user_input is None:
        return jsonify({'Error': 'No message found'}), 404
    return jsonify({'message': user_input}),200


if __name__ == '__main__':
    app.run(debug=True)