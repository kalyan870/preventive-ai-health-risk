
import { GoogleGenAI, Type } from "@google/genai";
import { UserHealthData, PredictionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getHealthRiskPrediction = async (data: UserHealthData): Promise<PredictionResult> => {
  const prompt = `Analyze the following health data for risk assessment:
    Age: ${data.age}, Gender: ${data.gender}, Weight: ${data.weight}kg, Height: ${data.height}cm.
    Vitals: BP ${data.systolicBP}/${data.diastolicBP}, Cholesterol: ${data.cholesterol}.
    Lifestyle: Smoking: ${data.smokingStatus}, Alcohol: ${data.alcoholConsumption}, Activity: ${data.physicalActivity}.
    Known Conditions: ${data.existingConditions.join(', ') || 'None'}.
    Reported Symptoms: ${data.symptoms.join(', ') || 'None'}.

    Assess risks for Cardiovascular, Metabolic, and Lifestyle-related diseases. Provide specific recommendations.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      systemInstruction: "You are a world-class AI medical consultant. Analyze user vitals and lifestyle data to predict potential health risks. Focus on preventive measures. Always output data in a structured JSON format matching the schema provided. Be medically accurate but clear that this is an AI screening, not a diagnosis.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          risks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                riskLevel: { type: Type.STRING },
                score: { type: Type.NUMBER },
                description: { type: Type.STRING },
                recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["category", "riskLevel", "score", "description", "recommendations"]
            }
          },
          lifestyleAnalysis: {
            type: Type.OBJECT,
            properties: {
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              concerns: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["strengths", "concerns"]
          },
          preventivePlan: {
            type: Type.OBJECT,
            properties: {
              immediate: { type: Type.ARRAY, items: { type: Type.STRING } },
              longTerm: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["immediate", "longTerm"]
          },
          consultationUrgency: { type: Type.STRING }
        },
        required: ["summary", "risks", "lifestyleAnalysis", "preventivePlan", "consultationUrgency"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text);
};
