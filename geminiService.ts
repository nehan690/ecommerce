
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from "./constants";

const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getShoppingAssistantResponse = async (userMessage: string, cartItems: any[]) => {
  // Check if API key is missing
  if (!apiKey || !ai) {
    return "I'm currently unavailable, but you can browse our curated collections above! Use the search bar or category filters to find exactly what you're looking for.";
  }

  const productsContext = PRODUCTS.map(p => `${p.name} ($${p.price}) in ${p.category}: ${p.description}`).join('\n');
  const cartContext = cartItems.length > 0 
    ? `Current items in user's cart: ${cartItems.map(i => `${i.name} (Qty: ${i.quantity})`).join(', ')}` 
    : "The user's cart is empty.";

  const systemInstruction = `
    You are Nova, the elite AI shopping assistant for NovaMarket.
    Your personality: Professional, helpful, slightly luxurious, and concise.
    Your goal: Help users find products, give gift advice based on NovaMarket's catalog, and answer product questions.
    
    Catalog Context:
    ${productsContext}
    
    Shopping Context:
    ${cartContext}
    
    If the user asks for something we don't have, politely suggest the closest alternative from our catalog.
    Always format your response using professional markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request right now. How else can I assist you with your shopping?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a brief technical moment. Please try again or browse our latest collections!";
  }
};
