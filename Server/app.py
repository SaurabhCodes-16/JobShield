from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient(os.getenv("MONGO_URI"))
db = client['jobshield_db']
scam_collection = db['scam_reports']

@app.route('/analyze', methods=['POST'])
def analyze_text():
    data = request.json
    text = data.get("text", "")

    red_flags = ["registration fee", "no interview", "gmail.com", "urgent hiring", "pay to apply"]
    score = sum(flag in text.lower() for flag in red_flags) * 20

    return jsonify({"fraud_score": score})

@app.route('/report', methods=['POST'])
def report_scam():
    scam = request.json
    scam_collection.insert_one(scam)
    return jsonify({"message": "Scam report submitted successfully"})

@app.route('/search', methods=['GET'])
def search_scams():
    query = request.args.get("query", "")
    results = scam_collection.find({"scam_text": {"$regex": query, "$options": "i"}})
    response = [{"scam_text": r["scam_text"], "suspected_company": r.get("suspected_company", "")} for r in results]
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
