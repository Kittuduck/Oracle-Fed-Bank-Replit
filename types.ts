export type StateCategory = 'AUTONOMY' | 'GUIDANCE' | 'PROTECTION';

export interface ActionItem {
  id: string;
  category: StateCategory;
  title: string;
  description: string;
  impact?: string;
  status: 'PENDING' | 'STAGED' | 'EXECUTED';
  amount?: number;
}

export interface TradeOffAnalysis {
  scenario: string;
  primaryGoal: string;
  conflictingEvent: string;
  financialImpact: string;
  longTermConsequence: string;
  recommendation: string;
}

export interface DashboardData {
  netWorth: number;
  liquidCash: number;
  notifications: ActionItem[];
  tradeOff: TradeOffAnalysis | null;
}

export interface Message {
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
}