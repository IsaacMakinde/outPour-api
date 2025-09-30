import axios from "axios";

async function callHuggingFace(modelUrl, text) {
  const HF_TOKEN = process.env.HF_API_TOKEN;
  const response = await axios.post(
    modelUrl,
    { inputs: text },
    {
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function analyzeSentiment(text) {
  return callHuggingFace(process.env.HF_SENTIMENT_URL, text);
}

export async function analyzeEmotion(text) {
  return callHuggingFace(process.env.HF_EMOTION_URL, text);
}
