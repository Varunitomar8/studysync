const express = require("express");
const axios = require("axios");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/summarize", verifyToken, async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes) {
      return res.status(400).json({
        message: "Notes are required",
      });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-oss-20b:free",

        provider: {
          order: ["NovitaAI"]
        },

        messages: [
          {
            role: "system",
            content:
              "You are an experienced teacher. Summarize notes into concise revision bullet points."
          },
          {
            role: "user",
            content: notes
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).json({
      summary: response.data.choices[0].message.content
    });

  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      message: "AI request failed"
    });
  }
});

module.exports = router;