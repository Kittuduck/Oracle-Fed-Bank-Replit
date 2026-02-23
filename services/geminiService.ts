import { GoogleGenAI, Type } from "@google/genai";
import { TradeOffAnalysis } from "../types";

const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const MODEL_NAME = 'gemini-2.0-flash';

const SYSTEM_INSTRUCTION = `
Role: You are "Oracle," the proactive, agentic financial mind of a premium banking app (Federal Bank).
Identity: Professional, highly intelligent, empathetic, and ultra-concise.

Core Architecture:
1. State Management:
   - PROTECTION: Risk mitigation (fraud, anomalies, overspending).
   - GUIDANCE: Milestone planning (travel, goals, loans).
   - AUTONOMY: Instant execution/arbitrage (moving funds, tax-saving).

2. Knowledge Base (Advait, 34, Mumbai):
   - Daughter: Riya (4 yrs). Goal: ₹2.5Cr Ivy League Fund.
   - Ambition: Fat FIRE (Retirement) by 2040 (Target: ₹15Cr).
   - Current Liquid Cash: ~₹12.4L.

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
  currentContext?: { liquid: number, need: number, goal: number }
): Promise<OrchestratorResponse> => {

  const lowerMsg = message.toLowerCase();
  const lastModelMsg = (history.length > 0 && history[history.length - 1].role === 'model')
    ? history[history.length - 1].parts[0].text.toLowerCase()
    : "";

  // ---------------------------------------------------------
  // INSTANT RESPONSE PATTERNS (Conversational Trip Logic)
  // ---------------------------------------------------------

  const isTripQuery = lowerMsg.includes("trip") || lowerMsg.includes("travel") || lowerMsg.includes("vacation");
  const hasBali = lowerMsg.includes("bali");
  const hasManualDetails = (lowerMsg.includes("days") || lowerMsg.includes("member") || lowerMsg.includes("cities")) && (hasBali || lastModelMsg.includes("choice"));
  const hasUploadConfirmation = lowerMsg.includes("uploaded") || lowerMsg.includes("itinerary");

  // Step 1: Initial Ask
  if (isTripQuery && lowerMsg.includes("can i")) {
    return {
      state: "GUIDANCE",
      textResponse: "That sounds exciting. Where are you planning to travel?",
      suggestedActions: []
    };
  }

  // Step 2: Destination Provided (e.g., Bali)
  if (lastModelMsg.includes("planning to travel") || (isTripQuery && (lowerMsg.includes("going to") || lowerMsg.includes("visit")))) {
    return {
      state: "GUIDANCE",
      textResponse: "Nice choice. To help you properly, could you share how many family members will be traveling and how long the trip is? If you already have an itinerary, that would help me give you clearer guidance.",
      suggestedActions: ["Upload itinerary", "Upload flight/hotel booking"]
    };
  }

  // Step 3: Detailed Response / Affordability Analysis
  if (hasManualDetails || hasUploadConfirmation) {
    // Logic: Trip to Bali for family of 3 (7-10 days) ~ ₹3.5L
    const tripCost = 350000;
    const liquid = currentContext?.liquid || 1240500;
    const educationGoal = currentContext?.goal || 25000000;

    return {
      state: "PROTECTION",
      textResponse: `[Oracle Insight] **Verdict: Affordable with Caveats**\n\n• **Data:** ₹3.5L trip vs ₹12.4L liquid.\n• **Impact:** Reduces Riya's fund growth by **4 months**.\n• **Advice:** Go ahead, but skip the luxury upgrade to stay on track.`,
      suggestedActions: ["Set Travel Goal", "View Strategic Goals"],
      simulationUpdate: {
        liquidCash: liquid,
        immediateNeed: tripCost,
        longTermGoal: educationGoal,
        analysis: {
          scenario: "International Trip (Bali)",
          primaryGoal: "Riya's Education Fund",
          conflictingEvent: "Vacation Outflow (₹3.5L)",
          financialImpact: "₹3.5L Upfront Cost",
          longTermConsequence: "Compounding loss of 4 months",
          recommendation: "Book now, but cap discretionary spending this quarter."
        }
      }
    };
  }

  // ---------------------------------------------------------
  // Other Scenarios (Windfall, Car, Job Loss, etc.)
  // ---------------------------------------------------------

  // LOGIC UPDATE FOR LUXURY CAR PURCHASE
  if (lowerMsg.includes("buy") && (lowerMsg.includes("car") || lowerMsg.includes("vehicle")) && (lowerMsg.includes("20") || lowerMsg.includes("20l"))) {
    return {
      state: "GUIDANCE",
      textResponse: `[Oracle Insight] **Verdict: Cash Purchase is Suboptimal**\n\n• **The Trade-off:** Paying ₹20L cash delays your FIRE target from age 50 to **53**.\n• **The Smart Move:** You are pre-approved for an Auto-loan at **8.25%**.\n• **Advice:** Finance it. Your investments compound at ~12%, effectively 'earning' you the car over time.`,
      suggestedActions: ["Show EMI vs Cash Impact", "Check Loan Details"],
      simulationUpdate: {
        liquidCash: 1240500,
        immediateNeed: 2000000,
        longTermGoal: 42000000,
        analysis: {
          scenario: "Luxury Car Purchase (₹20L)",
          primaryGoal: "Fat FIRE (Retirement)",
          conflictingEvent: "Capital Outflow",
          financialImpact: "Retirement delayed by 3 years",
          longTermConsequence: "Loss of compounding on ₹20L",
          recommendation: "Use Pre-approved Loan (8.25%)"
        }
      }
    };
  }

  // LOGIC UPDATE FOR EMI VS CASH COMPARISON
  if (lowerMsg.includes("emi vs cash")) {
    return {
      state: "AUTONOMY",
      textResponse: `[Oracle Insight] **Smart Arbitrage Analysis (5 Years)**\n\n**Option A: Pay Cash**\n• Immediate Outflow: ₹20L\n• Opportunity Cost (12% return): ₹15.2L lost\n• **True Cost: ₹35.2L**\n\n**Option B: Finance (8.25%)**\n• Interest Paid: ₹4.4L\n• Investment Growth Retained: ₹15.2L\n• **Net Benefit:** You are **₹10.8L richer** by taking the loan.`,
      suggestedActions: ["Apply for Loan", "Customize EMI"],
      simulationUpdate: {
        liquidCash: 1240500,
        immediateNeed: 0,
        longTermGoal: 0,
        analysis: {
          scenario: "Financing Arbitrage",
          primaryGoal: "Wealth Maximization",
          conflictingEvent: "Loan Interest",
          financialImpact: "Net Gain of ₹10.8L",
          longTermConsequence: "Wealth preservation",
          recommendation: "Proceed with Loan"
        }
      }
    }
  }

  // LOGIC UPDATE FOR LOAN DETAILS
  if (lowerMsg.includes("loan details") || (lowerMsg.includes("details") && lastModelMsg.includes("loan"))) {
    return {
      state: "GUIDANCE",
      textResponse: `[Oracle Insight] **Pre-approved Auto Loan Offer**\n\n• **Principal:** ₹20,00,000\n• **Rate:** 8.25% p.a. (Fixed)\n• **Tenure:** 60 Months\n• **EMI:** ₹40,775/month\n\n**Privilege:** Zero processing fee & 4-hour disbursement.`,
      suggestedActions: ["Apply Now", "Customize EMI"],
    };
  }

  // LOGIC UPDATE FOR CUSTOMIZE EMI
  if (lowerMsg.includes("customize") || lowerMsg.includes("emi options")) {
    return {
      state: "AUTONOMY",
      textResponse: `[Oracle Insight] **Tenure Options**\n\n• **3 Years:** ₹62,900/mo (Save ₹1.2L interest)\n• **5 Years:** ₹40,775/mo (Balanced)\n• **7 Years:** ₹31,400/mo (Lowest Outflow)\n\nSelect a plan to proceed.`,
      suggestedActions: ["Select 3 Years", "Select 5 Years", "Select 7 Years"],
    };
  }

  // LOGIC UPDATE FOR TENURE SELECTION
  if (lowerMsg.includes("select") && (lowerMsg.includes("year") || lowerMsg.includes("yr"))) {
    const tenure = lowerMsg.includes("3") ? "3 Years" : lowerMsg.includes("7") ? "7 Years" : "5 Years";
    const emi = lowerMsg.includes("3") ? "₹62,900" : lowerMsg.includes("7") ? "₹31,400" : "₹40,775";

    return {
      state: "AUTONOMY",
      textResponse: `[Oracle Insight] **Plan Selected: ${tenure}**\n\n• **EMI:** ${emi}/month\n• **Rate:** 8.25%\n• **Down Payment:** ₹0 (100% Financing)\n\nReady to disburse?`,
      suggestedActions: ["Apply Now", "Change Plan"],
    };
  }

  // LOGIC UPDATE FOR APPLY LOAN
  if (lowerMsg.includes("apply") || lowerMsg.includes("proceed") || lowerMsg.includes("disburse")) {
    return {
      state: "AUTONOMY",
      textResponse: `[Financial State: AUTONOMY] **Application Submitted**\n\n• **Status:** Auto-Approved\n• **Disbursement:** Scheduled for today (4:00 PM)\n• **Agreement:** Sent to advait.tech@example.com\n\nCongratulations on your new car!`,
      suggestedActions: ["Track Status", "View Dashboard"],
      simulationUpdate: {
        liquidCash: 1240500,
        immediateNeed: 0,
        longTermGoal: 42000000,
        analysis: {
          scenario: "Loan Disbursement",
          primaryGoal: "Car Purchase",
          conflictingEvent: "None",
          financialImpact: "EMI Started",
          longTermConsequence: "FIRE Corpus Intact",
          recommendation: "Setup Auto-pay"
        }
      }
    };
  }

  // LOGIC UPDATE FOR TRACK STATUS
  if (lowerMsg.includes("track status") || lowerMsg.includes("application status")) {
    return {
      state: "AUTONOMY",
      textResponse: `[Oracle Insight] **Loan Application Status**\n\n• **Ref ID:** #AX-VL-2024\n• **Stage:** Disbursal In-Progress (Step 3/4)\n• **ETA:** Funds will reflect in A/C XX8842 by 4:00 PM today.`,
      suggestedActions: ["View Dashboard", "Set up Auto-debit"],
    };
  }

  // 3. Option C / Balance (Windfall follow-up)
  if (lowerMsg.includes("option c") || lowerMsg.includes("balance")) {
    return {
      state: "GUIDANCE",
      textResponse: `[Oracle Insight] **Strategy: Balanced**\n\n• **Impact:** +0.2% CAGR boost.\n• **Safety:** Medical buffers secured.\n• **Status:** Ready to execute.`,
      suggestedActions: ["Execute Strategy"],
      simulationUpdate: {
        liquidCash: (currentContext?.liquid || 1240500),
        immediateNeed: 0,
        longTermGoal: (currentContext?.goal || 25000000),
        analysis: {
          scenario: "Balanced Allocation Strategy",
          primaryGoal: "Fat FIRE & Education",
          conflictingEvent: "Windfall Allocation",
          financialImpact: "+0.2% CAGR",
          longTermConsequence: "Optimal balance achieved",
          recommendation: "Execute Strategy"
        }
      }
    };
  }

  // 4. Execute Strategy
  if (lowerMsg.includes("execute") || lowerMsg.includes("strategy")) {
    return {
      state: "AUTONOMY",
      textResponse: `[Financial State: AUTONOMY] **Execution Complete**\n\n• **₹5L** → Retirement Portfolio\n• **₹5L** → Riya's Education Goal\n• **₹5L** → Medical Buffers`,
      suggestedActions: ["View Updated Goals"],
      simulationUpdate: {
        liquidCash: (currentContext?.liquid || 1240500) + 500000,
        immediateNeed: 0,
        longTermGoal: (currentContext?.goal || 25000000) + 500000,
        analysis: {
          scenario: "Strategy Executed",
          primaryGoal: "Multiple",
          conflictingEvent: "None",
          financialImpact: "Allocated ₹15L",
          longTermConsequence: "Goals on track",
          recommendation: "Monitor performance"
        }
      }
    };
  }

  // REAL API CALL
  try {
    if (!ai) throw new Error("API key not configured.");

    // Inject current financials into the context for the model
    const contextPrompt = `
      CURRENT FINANCIAL STATE:
      - Liquid Cash: ₹${currentContext?.liquid || 1240500}
      - Primary Goal Target (Education): ₹${currentContext?.goal || 25000000}
      - Needs detected: ₹${currentContext?.need || 0}
      
      User Message: ${message}
    `;

    // Reverting to the pattern that was working in the codebase
    const chat = (ai as any).chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
      },
      // Transform history if the SDK expects a specific format
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message: contextPrompt });
    return JSON.parse(result.text) as OrchestratorResponse;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Fallback to minimal response if API fails
    return {
      state: 'PROTECTION',
      textResponse: "I'm monitoring your financials carefully. However, I'm having a slight connectivity ripple in my analysis engine. Let's stick to the core dashboard for a moment.",
      suggestedActions: ["Retry Analysis", "View Dashboard"]
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

/**
 * AI-Powered Credit Card Recommendation
 */
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

  if (!ai) return fallback;

  try {
    const prompt = `
      User Profile: [Income: ₹\${profile.income}, Liquid: ₹\${profile.liquidCash}, Spend: ₹\${profile.monthlySpend}/mo, Focus: \${profile.primarySpend}, Stage: \${profile.lifeStage}]
      Recommend one: CELESTA (>3L income), IMPERIO (>1L), or SIGNET.
      Return JSON only: {cardCode, reason, apr, annualFee, benefits[], kfsLink}
    `;

    const chat = (ai as any).chats.create({
      model: MODEL_NAME,
      config: {
        responseMimeType: "application/json",
      },
      history: []
    });

    const result = await chat.sendMessage({ message: prompt });
    return JSON.parse(result.text);
  } catch (error) {
    console.error("Card Recommendation Error:", error);
    return fallback;
  }
}
