import express from "express";

const groqRouter = express.Router();

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

groqRouter.post("/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array zaroori hai" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY .env mein set nahi hai" });
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err?.error?.message || "Groq API error" });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Koi jawab nahi mila.";
    res.json({ reply });

  } catch (error) {
    console.error("Groq Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default groqRouter;