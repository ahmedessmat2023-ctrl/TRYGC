/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";

// Initialize with lazy-load safety as per guidelines
let aiInstance: any = null;

const getAI = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is required for discovery operations.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export interface SuggestedInfluencer {
  handle: string;
  platform: string;
  followers: string;
  engagement: string;
  niche: string;
  location: string;
  relevanceReason: string;
}

export async function discoverInfluencers(
  country: string, 
  niche: string, 
  followerRange: string, 
  count: number = 5
): Promise<SuggestedInfluencer[]> {
  const ai = getAI();
  const prompt = `Find at least ${count} real influencers in ${country} focusing on the ${niche} niche with a follower range of ${followerRange}. 
  Use Google Search to find current, high-performing creators. 
  For each influencer, provide their platform handle, platform (Instagram, TikTok, etc), follower count, estimated engagement rate, and why they are relevant.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              handle: { type: Type.STRING },
              platform: { type: Type.STRING },
              followers: { type: Type.STRING },
              engagement: { type: Type.STRING },
              niche: { type: Type.STRING },
              location: { type: Type.STRING },
              relevanceReason: { type: Type.STRING }
            },
            required: ["handle", "platform", "followers", "engagement", "niche", "location", "relevanceReason"]
          }
        }
      }
    });

    const results = JSON.parse(response.text);
    return results;
  } catch (error) {
    console.error("Discovery Error:", error);
    throw error;
  }
}
