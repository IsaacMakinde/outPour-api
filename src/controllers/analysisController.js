// src/controllers/analysisController.js
import {
  analyzeSentiment,
  analyzeEmotion,
} from "../services/huggingFaceService.js";

export const analysisController = {
  sentiment: async (req, res, next) => {
    try {
      const { text } = req.body;
      if (!text) return res.status(400).json({ error: "text is required" });

      const result = await analyzeSentiment(text);
      res.json(result);
    } catch (err) {
      console.error("Sentiment analysis failed:", err.message);
      res.status(500).json({ error: "Failed to analyze sentiment" });
    }
  },

  emotion: async (req, res, next) => {
    try {
      const { text } = req.body;
      if (!text) return res.status(400).json({ error: "text is required" });

      const result = await analyzeEmotion(text);
      res.json(result);
    } catch (err) {
      console.error("Emotion analysis failed:", err.message);
      res.status(500).json({ error: "Failed to analyze emotion", err });
    }
  },

  test: (req, res, next) => {
    return res.json({ message: "You this endpoint" });
  },
};
