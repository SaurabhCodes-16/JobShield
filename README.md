# 🛡️ JobShield: AI-Powered Job Fraud Detection

![License](https://img.shields.io/badge/license-MIT-green)
![Tech](https://img.shields.io/badge/Built%20With-React%20%7C%20Flask%20%7C%20scikit-learn%20%7C%20jsPDF-blue)

> JobShield helps users detect fraudulent job offers using an ML model trained on real scam patterns. Paste job descriptions or upload offer letters — we’ll handle the rest.

---

## 🌟 Features

- 🤖 **Machine Learning Model** (trained on scam/legit job data)
- 📄 **PDF Upload** (Offer Letter text extraction)
- 🚩 **Red Flag Heuristics** (common scam indicators)
- 📊 **Risk Score**: Low, Medium, or High
- 📥 **Download Report** (clean PDF summary)
- 💡 **Modern UI** (Dark mode + animated background)

---

## 📸 Demo

| Upload PDF | Get Analysis | Download Report |
|------------|--------------|-----------------|
| ![upload](./screenshots/upload.png) | ![analysis](./screenshots/analysis.png) | ![download](./screenshots/download.png) |

---

## 🧠 How it Works

### 1. **Frontend** – React
- Users can paste or upload job descriptions (PDFs).
- Text is extracted and sent to the backend for analysis.
- Final output includes AI-based risk level, score, and detected flags.

### 2. **Backend** – Python (Flask)
- A trained `scikit-learn` model (with `TfidfVectorizer`) evaluates job descriptions.
- Uses both ML prediction and red-flag heuristics for hybrid scoring.
- Returns fraud probability, risk level, and triggered flags.

### 3. **PDF Handling**
- `pdfjs-dist` extracts job text from uploaded PDFs in-browser.
- `jsPDF` generates a stylized report for download.

---

## ⚙️ Tech Stack

- **Frontend**: React, Tailwind CSS, jsPDF, PDF.js
- **Backend**: Python (Flask), scikit-learn, joblib
- **ML**: TfidfVectorizer + Logistic Regression (custom trained)
- **Deployment**: GitHub + Local Flask server

---

## 🚀 Getting Started Locally

### ✅ Prerequisites

- Python 3.8+
- Node.js + npm
- `joblib`, `scikit-learn`, `Flask`, `python-dotenv`
- (Optional) MongoDB if storing scam reports

---

### 🛠️ Backend Setup

```bash
cd Server
pip install -r requirements.txt
python app.py
