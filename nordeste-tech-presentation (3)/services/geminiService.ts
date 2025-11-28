import { GoogleGenAI } from "@google/genai";
import { FULL_CONTEXT_TEXT } from '../constants';

// Initialize Gemini
// NOTE: Process.env.API_KEY is handled by the build environment/user settings
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askGeminiAboutPresentation = async (question: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
      You are an intelligent assistant presenting a business case for "Nordeste", a company that saved money by building internal software.
      
      Here is the full context of the presentation:
      ---
      ${FULL_CONTEXT_TEXT}
      ---
      
      User Question: ${question}
      
      Answer briefly, professionally, and enthusiastically in Portuguese. Emphasize the cost savings and efficiency.
      If the user asks about specific numbers, use the data provided in the context.
      `,
    });

    return response.text || "Desculpe, não consegui processar sua pergunta agora.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Houve um erro ao conectar com a IA. Verifique sua chave de API.";
  }
};