const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

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
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: "No response from model." });
    }

    res.json({ result: reply });
  } catch (err) {
    console.error("OpenRouter Error:", err.message);
    res.status(500).send("OpenRouter API failed");
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
