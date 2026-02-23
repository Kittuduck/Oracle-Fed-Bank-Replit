import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!ai) {
    return res.status(500).json({ error: 'Gemini API key not configured' });
  }

  try {
    const { model, contents, config } = req.body;

    const response = await ai.models.generateContent({
      model: model || 'gemini-2.5-flash-lite',
      contents,
      config,
    });

    return res.status(200).json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini proxy error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
