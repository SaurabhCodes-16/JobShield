const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  const { jobText } = req.body;

  const prompt = `You are an AI job scam detector. Analyze the job description below and classify it as Low, Medium, or High risk. Also explain why.

Job Description:
"${jobText}"

Return the result in this format:
Risk Level: <Low/Medium/High>
Reason: <explanation>`;

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "mistral", // or any model you pulled via Ollama
      prompt: prompt,
      stream: false
    });

    const reply = response.data.response;
    res.json({ result: reply });
  } catch (err) {
    console.error("Ollama Error:", err.message);
    res.status(500).send("Ollama API failed");
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
