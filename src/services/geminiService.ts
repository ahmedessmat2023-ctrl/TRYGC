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
  recentPerformance: string;
  audienceAlignment: string;
}

export async function discoverInfluencers(
  country: string, 
  niche: string, 
  followerRange: string, 
  count: number = 6,
  targetCampaign: string = 'none'
): Promise<SuggestedInfluencer[]> {
  const ai = getAI();
  
  const systemInstruction = `You are a professional Influencer Discovery Engineer. 
  Your goal is to find active, high-performing influencers that match the user's criteria.
  Use Google Search to verify recent activity (last 30 days), follower counts, and engagement metrics.
  Return a diverse list of creators from different cities within the target country if applicable.`;

  const campaignContextStr = targetCampaign !== 'none' ? `These influencers are intended for the '${targetCampaign}' campaign.` : '';

  const prompt = `Find ${count} high-performing influencers in ${country} for the ${niche} niche. 
  Target Follower Range: ${followerRange}.
  ${campaignContextStr}
  
  For each influencer, you must provide:
  1. handle: The social media tag (e.g. @username).
  2. platform: The primary platform (Instagram, TikTok, Snapchat, YouTube).
  3. followers: Current follower count (abbreviated, e.g. 1.2M).
  4. engagement: Estimated engagement rate (e.g. 4.2%).
  5. niche: Their specific Content Pillar (e.g. Sustainable Fashion).
  6. location: Specific city and country.
  7. relevanceReason: A clear, summarized reason for relevance.
  8. recentPerformance: Granular analysis detailing their recent activity patterns (e.g., '12% follower growth in 30 days', 'Consistent high reel views').
  9. audienceAlignment: Analysis of their audience demographics and how they align with the ${niche} niche and target audience expectations.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: prompt,
      config: {
        systemInstruction,
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
              relevanceReason: { type: Type.STRING },
              recentPerformance: { type: Type.STRING },
              audienceAlignment: { type: Type.STRING }
            },
            required: ["handle", "platform", "followers", "engagement", "niche", "location", "relevanceReason", "recentPerformance", "audienceAlignment"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Discovery Error:", error);
    throw error;
  }
}
