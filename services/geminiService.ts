import { GoogleGenerativeAI } from "@google/generative-ai";

// API key obtained from environment variable per coding guidelines
const ai = new GoogleGenerativeAI(process.env.API_KEY!);

export const getFaqAnswer = async (question: string): Promise<string> => {
    try {
        const model = ai.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
            systemInstruction: `You are an expert AI assistant for Green Turn Solar, a premier rooftop solar installation company based in Nagpur, India.
- Answer the user's question concisely, accurately, and in a friendly tone.
- Keep answers to 2-3 sentences.
- If the question is about pricing or specific quotes, gently guide them to contact the company directly for a free site assessment.
- Always maintain a positive and helpful tone, promoting the benefits of solar energy and Green Turn Solar's services.
- Do not answer questions unrelated to solar energy, renewable power, or Green Turn Solar.`,
        });

        const response = await model.generateContent(question);
        const text = response.response.text();
        
        if (text && text.trim().length > 0) {
            return text;
        } else {
            return "I'm sorry, I couldn't generate a specific answer for that. Could you please try rephrasing your question?";
        }

    } catch (error) {
        console.error("Error fetching FAQ answer:", error);
        throw new Error("Sorry, but this feature is not available now.");
    }
};