/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from '@google/genai';
import { ExerciseRecord, DietRecord, UserProfile } from '../types';

const ai = new GoogleGenAI({ apiKey: (import.meta as any).env?.GEMINI_API_KEY || '' });

export async function parseNaturalLanguage(input: string, user: UserProfile) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        You are a fitness and nutrition expert. Parse the following user input into a structured format.
        User input: "${input}"
        User profile: ${JSON.stringify(user)}
        
        Return a JSON object with:
        - type: "exercise", "diet", or "unknown"
        - data: (if exercise) { type, duration, calories, distance, intensity }
        - data: (if diet) { food, calories, protein, carbs, fat, mealType }
        - response: A friendly confirmation message or a question if data is missing.
      `,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING, enum: ['exercise', 'diet', 'unknown'] },
            data: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                duration: { type: Type.NUMBER },
                calories: { type: Type.NUMBER },
                distance: { type: Type.NUMBER },
                intensity: { type: Type.STRING },
                food: { type: Type.STRING },
                protein: { type: Type.NUMBER },
                carbs: { type: Type.NUMBER },
                fat: { type: Type.NUMBER },
                mealType: { type: Type.STRING },
              },
            },
            response: { type: Type.STRING },
          },
          required: ['type', 'response'],
        },
      },
    });

    const result = JSON.parse(response.text);
    return result;
  } catch (error) {
    console.error('AI parse error:', error);
    throw error;
  }
}

export async function getPersonalizedAdvice(
  user: UserProfile,
  exercises: ExerciseRecord[],
  diets: DietRecord[]
) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Based on the following data, provide 3 actionable health/fitness recommendations.
        User Profile: ${JSON.stringify(user)}
        Recent Exercises: ${JSON.stringify(exercises.slice(0, 5))}
        Recent Diet: ${JSON.stringify(diets.slice(0, 5))}
        
        Provide recommendations in JSON format:
        - recommendations: Array of { title, content, basis }
        Where 'basis' is the scientific or nutritional principle behind the advice.
      `,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  content: { type: Type.STRING },
                  basis: { type: Type.STRING },
                },
                required: ['title', 'content', 'basis'],
              },
            },
          },
          required: ['recommendations'],
        },
      },
    });

    const result = JSON.parse(response.text);
    return result;
  } catch (error) {
    console.error('AI advice error:', error);
    throw error;
  }
}
