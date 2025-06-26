# 🛡️ JobShield: AI-Powered Job Fraud Detection

![License](https://img.shields.io/badge/license-MIT-green)
![Tech](https://img.shields.io/badge/Built%20With-React%20%7C%20Express%20%7C%20OpenRouter%20%7C%20jsPDF-blue)

> JobShield helps users detect fraudulent job offers using AI-powered analysis, PDF parsing, and red flag detection. Paste job descriptions or upload offer letters — we’ll handle the rest.

---

## 🌟 Features

- 🔍 **AI Risk Assessment** (via OpenRouter API using Mistral model)
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

### 1. **Frontend** – React
- Paste or upload job descriptions (PDFs).
- Text is locally scanned for red-flag patterns.
- Then it's sent to the backend for deep analysis using Mistral via OpenRouter.

### 2. **Backend** – Node.js + Express
- Receives job description via `/analyze` route.
- Forwards it to OpenRouter’s REST API (Mistral model).
- Parses and returns the AI-generated risk level + reasoning.

### 3. **PDF Handling**
- `pdfjs-dist` is used to extract job text from uploaded PDFs.
- `jsPDF` generates downloadable, stylized PDF reports with the analysis.

---

## ⚙️ Tech Stack

- **Frontend**: React, Tailwind CSS, jsPDF, PDF.js
- **Backend**: Node.js, Express
- **AI Model**: [OpenRouter](https://openrouter.ai) (Mistral 7B)
- **Deployment**: GitHub + Local Hosting

---

## 🚀 Getting Started Locally

### ✅ Prerequisites
- Node.js and npm installed
- OpenRouter API key (free tier available)

---

### 📦 Step-by-Step Installation

```bash
# Clone the repository
git clone https://github.com/SaurabhCodes-16/JobShield.git
cd JobShield
