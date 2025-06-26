from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

# Load ML model and vectorizer
model = joblib.load("../Model/model/fraud_model.pkl")
vectorizer = joblib.load("../Model/model/vectorizer.pkl")

@app.route('/analyze', methods=['POST'])
def analyze_text():
    data = request.json
    text = data.get("text", "")

    # Heuristic red flags
    red_flags = ["registration fee", "no interview", "gmail.com", "urgent hiring", "pay to apply"]
    rule_score = sum(flag in text.lower() for flag in red_flags) * 20

    


    # ML model prediction
    text_vector = vectorizer.transform([text])
    prediction = model.predict(text_vector)[0]
    probability = model.predict_proba(text_vector)[0][1]

    return jsonify({
        "fraud_score": rule_score,
        "model_label": "fraudulent" if prediction == 1 else "legit",
        "fraud_probability": round(float(probability), 3)
    })

if __name__ == '__main__':
    app.run(debug=True)
