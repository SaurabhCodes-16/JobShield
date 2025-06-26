const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  const { jobText } = req.body;

 const prompt = `You are an AI job scam detector. Analyze the following job description for potential fraud. 

1. Classify the risk as: Low, Medium, or High.
2. Assign a fraud score (0–100).
3. Identify and list red flags, if any.
4. Explain briefly.

Job Description:
"${jobText}"

Respond strictly in JSON format like:
{
  "risk_level": "High",
  "fraud_score": 85,
  "red_flags": ["Training fee requested", "Unverified email address"],
  "reason": "Job requests a processing fee and uses a generic Gmail address."
}
`;




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
