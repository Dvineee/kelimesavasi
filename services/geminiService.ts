
import { GoogleGenAI, Type } from "@google/genai";

// Lazy-init helper to prevent top-level crashes if process.env is not defined yet
const getAI = () => {
  const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : '';
  return new GoogleGenAI({ apiKey: apiKey || '' });
};

export const validateWord = async (word: string, category: string, letter: string): Promise<{ isValid: boolean; reason?: string }> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Soru: "${word}" kelimesi "${category}" kategorisine uygun ve "${letter}" harfi ile başlayan geçerli bir Türkçe kelime midir?`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isValid: { type: Type.BOOLEAN },
            reason: { type: Type.STRING }
          },
          required: ["isValid"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Validation error:", error);
    // Fallback logic
    return { 
      isValid: word.toLowerCase().startsWith(letter.toLowerCase()) && word.length > 2,
      reason: "Bağlantı hatası nedeniyle temel kontrol yapıldı."
    };
  }
};

export const getBotResponse = async (category: string, letter: string, usedWords: string[]): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Bana "${category}" kategorisinde olan ve "${letter}" harfi ile başlayan, daha önce kullanılmamış bir Türkçe kelime söyle. Sadece kelimeyi döndür. Daha önce kullanılanlar: ${usedWords.join(", ")}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text.trim().split(' ')[0].replace(/[^a-zA-ZçÇğĞıİöÖşŞüÜ]/g, '');
  } catch (error) {
    console.error("Bot AI error:", error);
    return "";
  }
};
