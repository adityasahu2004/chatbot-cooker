from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/save-layout', methods=['POST'])
def save_layout():
    data = request.json
    return jsonify({"status": "success", "received": data}), 200

@app.route('/')
def home():
    return 'Backend is running!'

if __name__ == '__main__':
    app.run(debug=True, port=5000)