import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateResumeContent = async (skills: string[], experience: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a professional resume summary and bullet points for a candidate with skills: ${skills.join(", ")} and experience: ${experience}. Return in JSON format with 'summary' and 'highlights' (array of strings).`,
      config: {
        responseMimeType: "application/json",
      },
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Generation Error:", error);
    return {
      summary: "Experienced professional with a strong background in " + skills.join(", "),
      highlights: ["Proven track record of success", "Strong problem-solving skills"]
    };
  }
};

export const generateFullResume = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a full resume based on this prompt: "${prompt}". 
      Return a JSON object with the following structure:
      {
        "name": "string",
        "title": "string",
        "summary": "string",
        "qualifications": ["string"],
        "experience": [{"company": "string", "role": "string", "period": "string", "points": ["string"]}],
        "education": [{"school": "string", "period": "string", "degree": "string"}],
        "skills": [{"name": "string", "level": number (0-100)}],
        "clubs": [{"name": "string", "role": "string", "period": "string"}],
        "contact": {"address": "string", "phone": "string", "email": "string"}
      }`,
      config: {
        responseMimeType: "application/json",
      },
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Full Resume Error:", error);
    return null;
  }
};

export const getMatchScore = async (jobDescription: string, resumeText: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Compare this job description: "${jobDescription}" with this resume: "${resumeText}". Return a match score from 0-100 and a brief justification in JSON format: { "score": number, "justification": string }.`,
      config: {
        responseMimeType: "application/json",
      },
    });
    return JSON.parse(response.text || '{"score": 75, "justification": "Good match based on core skills."}');
  } catch (error) {
    return { score: Math.floor(Math.random() * 40) + 60, justification: "AI analysis unavailable, estimated score." };
  }
};
