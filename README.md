# 🛡️ JobShield: AI-Powered Job Fraud Detection

![License](https://img.shields.io/badge/license-MIT-green)
![Tech](https://img.shields.io/badge/Built%20With-React%20%7C%20Express%20%7C%20Ollama%20%7C%20jsPDF-blue)

> JobShield helps users detect fraudulent job offers using AI-powered analysis, PDF parsing, and red flag detection. Paste job descriptions or upload offer letters — we’ll handle the rest.

---

## 🌟 Features

- 🔍 **AI Risk Assessment** (via Ollama API - Mistral model)
- 📄 **PDF Upload** (Offer Letter text extraction)
- 🚩 **Red Flag Detector** (keywords + patterns)
- 📊 **Risk Score**: Low, Medium, or High
- 📥 **Download Report** (as a beautiful PDF)
- 💡 **Modern UI** (Dark mode + animated background)

---

## 📸 Demo

| Upload PDF | Get Analysis | Download Report |
|------------|--------------|-----------------|
| ![upload](./screenshots/upload.png) | ![analysis](./screenshots/analysis.png) | ![download](./screenshots/download.png) |

---

## 🧠 How it Works

1. **Frontend** (React):
   - Users can paste or upload job descriptions (PDF).
   - Text is analyzed using built-in red flag rules.
   - For deeper analysis, text is sent to **Ollama’s Mistral model** (running locally via REST API).

2. **Backend** (Node.js + Express):
   - Receives job description and forwards it to Ollama's API.
   - Parses AI response (risk level + reason).
   - Returns it to the frontend for display.

3. **PDF Handling**:
   - Uses `pdfjs-dist` to extract raw text from uploaded offer letters.
   - Uses `jsPDF` to generate downloadable PDF reports.

---

## ⚙️ Tech Stack

- **Frontend**: React, Tailwind CSS, jsPDF, PDF.js
- **Backend**: Node.js, Express
- **AI Engine**: [Ollama](https://ollama.com) (Mistral model via REST API)
- **Deployment**: GitHub + Local Ollama Runtime

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/SaurabhCodes-16/JobShield.git
cd JobShield
