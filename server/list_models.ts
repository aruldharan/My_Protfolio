import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function listAllModels() {
  try {
    const list = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }).listModels();
    // Wait, listModels is actually on the genAI object in some versions? No, it's a separate client usually.
    // In the latest @google/generative-ai, it might be different.
    // Let's try the direct fetch way if the SDK fails.
  } catch (e) {
    // If SDK fails, try manual fetch
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    data.models.forEach((m: any) => console.log(m.name));
  }
}

listAllModels();
