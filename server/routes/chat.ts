import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { messages } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is missing');
    return res.status(500).json({ error: 'Gemini API Key is missing. Please add it to the server .env file.' });
  }

  try {
    // Convert to Gemini format
    // Gemini history MUST start with 'user' role.
    const contents = messages
      .filter((msg: any, index: number) => !(index === 0 && msg.role === 'assistant'))
      .map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: contents,
      system_instruction: {
        parts: [{ text: "You are an AI assistant for Arul Dharan S's portfolio. Arul is a dedicated Full-Stack Developer specializing in the MERN stack and TypeScript. \n\nProfile Summary:\nA dedicated and highly motivated Full-Stack Developer with expertise in the MERN stack and TypeScript. Passionate about building scalable web applications with clean, efficient code and intuitive user interfaces. Recently graduated and committed to continuous learning to deliver high-quality software solutions.\n\nContact Details:\n- Phone: +91 8778243567\n- Email: aruldharan94@gmail.com\n- GitHub: github.com/aruldharan\n- LinkedIn: linkedin.com/in/aruldharan\n\nAnswer questions about Arul's skills, projects, and background based on these details. Be professional, concise, and helpful." }]
      },
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error:', JSON.stringify(data, null, 2));
      throw new Error(data.error?.message || `Gemini API returned ${response.status}`);
    }

    const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!aiMessage) {
      throw new Error('No response from AI');
    }

    res.json({ role: 'assistant', content: aiMessage });
  } catch (error: any) {
    console.error('Chat Route Error:', error?.message || error);
    res.status(500).json({ error: error?.message || 'Failed to connect to AI' });
  }
});

export default router;
