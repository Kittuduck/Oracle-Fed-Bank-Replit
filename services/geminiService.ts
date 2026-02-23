import { GoogleGenAI, Type } from "@google/genai";
import { TradeOffAnalysis } from "../types";

const apiKey = (process.env as any).AI_INTEGRATIONS_GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

const isReplit = typeof window !== 'undefined' && (window.location.hostname.includes('replit') || window.location.hostname.includes('repl.co'));

const ai = isReplit && apiKey ? new GoogleGenAI({
  apiKey,
  httpOptions: { apiVersion: "", baseUrl: window.location.origin + '/gemini-proxy' },
}) : null;

const MODEL_NAME = isReplit ? 'gemini-2.5-flash' : 'gemini-2.5-flash-lite';

const getSystemInstruction = (persona?: { name: string; age: number; role: string; goals: string; frustrations: string }) => {
  const name = persona?.name || 'Advait';
  const age = persona?.age || 34;
  const role = persona?.role || 'Salaried Professional';
  const goals = persona?.goals || "Fat FIRE by 50, Daughter Riya's Ivy League Fund, Parents healthcare";
  return `
Role: You are "Oracle," the proactive, agentic financial mind of a premium banking app (Federal Bank).
Identity: Professional, highly intelligent, empathetic, and ultra-concise.

Core Architecture:
1. State Management:
   - PROTECTION: Risk mitigation (fraud, anomalies, overspending).
   - GUIDANCE: Milestone planning (travel, goals, loans).
   - AUTONOMY: Instant execution/arbitrage (moving funds, tax-saving).

2. Current User: ${name}, ${age}, ${role}
   ${goals}

Constraint: You MUST respond in JSON format matching the OrchestratorResponse interface.

JSON Schema:
{
  "state": "PROTECTION" | "GUIDANCE" | "AUTONOMY",
  "textResponse": "Concise insights with **bold** highlights. Use bullet points.",
  "suggestedActions": ["Action 1", "Action 2"],
  "simulationUpdate": { 
     "liquidCash": number, 
     "immediateNeed": number, 
     "longTermGoal": number, 
     "analysis": { "scenario": string, "primaryGoal": string, "conflictingEvent": string, "financialImpact": string, "longTermConsequence": string, "recommendation": string }
  },
  "newGoalData": { "title": string, "targetAmount": number, "deadlineYear": number }
}
`;
};

async function callGeminiProxy(model: string, contents: any[], config: any): Promise<string> {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, contents, config }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errData.error || `API returned ${response.status}`);
  }

  const data = await response.json();
  return data.text || '{}';
}

export interface NewGoalData {
  title: string;
  targetAmount: number;
  deadlineYear: number;
  fundingSource?: string;
  projectedImpact?: string;
}

export interface SimulationUpdateData {
  liquidCash: number;
  immediateNeed: number;
  longTermGoal: number;
  analysis: TradeOffAnalysis;
}

export interface OrchestratorResponse {
  state: 'AUTONOMY' | 'GUIDANCE' | 'PROTECTION';
  textResponse: string;
  suggestedActions: string[];
  simulationUpdate?: SimulationUpdateData;
  newGoalData?: NewGoalData;
}

export interface CardRecommendation {
  cardCode: "CELESTA" | "IMPERIO" | "SIGNET";
  reason: string;
  apr: string;
  annualFee: string;
  benefits: string[];
  kfsLink: string;
}

export const chatWithOrchestrator = async (
  history: { role: 'user' | 'model'; parts: { text: string }[] }[],
  message: string,
  currentContext?: { liquid: number, need: number, goal: number },
  personaContext?: { name: string; age: number; role: string; goals: string; frustrations: string }
): Promise<OrchestratorResponse> => {

  try {
    const contextPrompt = `
      CURRENT FINANCIAL STATE:
      - Liquid Cash: ₹${currentContext?.liquid || 1240500}
      - Primary Goal Target (Education): ₹${currentContext?.goal || 25000000}
      - Needs detected: ₹${currentContext?.need || 0}
      
      User Message: ${message}
    `;

    const contents = [
      ...history.map(h => ({
        role: h.role,
        parts: h.parts
      })),
      { role: 'user' as const, parts: [{ text: contextPrompt }] }
    ];

    const config = {
      systemInstruction: getSystemInstruction(personaContext),
      responseMimeType: "application/json",
      maxOutputTokens: 8192,
    };

    let text: string;

    if (isReplit && ai) {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents,
        config,
      });
      text = response.text || '{}';
    } else {
      text = await callGeminiProxy(MODEL_NAME, contents, config);
    }

    return JSON.parse(text) as OrchestratorResponse;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return {
      state: 'PROTECTION',
      textResponse: "I'm monitoring your financials carefully. However, I'm experiencing a brief connectivity issue. Please try again in a moment.",
      suggestedActions: ["Retry", "View Dashboard"]
    };
  }
};

export const analyzeTradeOff = async (liquidCash: number, surgeryCost: number, educationGoal: number): Promise<TradeOffAnalysis> => {
  return {
    scenario: "Liquidity vs. Protection",
    primaryGoal: "Riya's Education Fund",
    conflictingEvent: "Unexpected Expense",
    financialImpact: "₹3.5L Outflow",
    longTermConsequence: "Compounding delay on primary goal",
    recommendation: "Proceed but optimize near-term discretionary spend"
  };
};

export async function getCardRecommendation(profile: {
  income: number;
  liquidCash: number;
  monthlySpend: number;
  primarySpend: string;
  lifeStage: string;
}): Promise<CardRecommendation> {
  const fallback: CardRecommendation = {
    cardCode: profile.income > 200000 ? "CELESTA" : profile.income > 80000 ? "IMPERIO" : "SIGNET",
    reason: "Based on your income and spending pattern, this card offers the best value-to-cost ratio.",
    apr: "36%",
    annualFee: "₹1,500",
    benefits: ["Cashback on all spends", "Airport Lounge Access"],
    kfsLink: "https://www.federalbank.co.in/kfs"
  };

  try {
    const prompt = `User Profile: [Income: ₹${profile.income}, Liquid: ₹${profile.liquidCash}, Spend: ₹${profile.monthlySpend}/mo, Focus: ${profile.primarySpend}, Stage: ${profile.lifeStage}]
Recommend one: CELESTA (>3L income), IMPERIO (>1L), or SIGNET.
Return JSON only: {cardCode, reason, apr, annualFee, benefits[], kfsLink}`;

    const contents = [{ role: 'user', parts: [{ text: prompt }] }];
    const config = {
      responseMimeType: "application/json",
      maxOutputTokens: 8192,
    };

    let text: string;

    if (isReplit && ai) {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents,
        config,
      });
      text = response.text || '{}';
    } else {
      text = await callGeminiProxy(MODEL_NAME, contents, config);
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Card Recommendation Error:", error);
    return fallback;
  }
}
