import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

interface GeneratedContent {
  title: string;
  description: string;
  tags: string[];
}

export const generateDescriptionFromImage = async (base64ImageData: string, mimeType: string): Promise<GeneratedContent> => {
  const prompt = `Analiza esta imagen de un alimento. Proporciona un título conciso y atractivo, una descripción apetitosa de 2-3 frases y 3 etiquetas de categoría relevantes (como 'Panadería', 'Vegano', 'Postre'). Responde SÓLO con un objeto JSON con el formato: { "title": "...", "description": "...", "tags": ["...", "...", "..."] }. No incluyas nada más en tu respuesta, ni siquiera los marcadores de código JSON.`;

  try {
    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: base64ImageData,
      },
    };

    const textPart = {
      text: prompt,
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
      }
    });
    
    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedData = JSON.parse(jsonStr) as GeneratedContent;
    return parsedData;

  } catch (error) {
    console.error("Error generating description with Gemini:", error);
    throw new Error("No se pudo generar la descripción. Por favor, inténtalo de nuevo o escríbela manualmente.");
  }
};
