import { CreditCard, Zap, Smartphone, Dumbbell, Target, ShieldCheck, TrendingUp, Wallet, Receipt, Users, Heart, GraduationCap, Briefcase, Home, Coffee, Globe, AlertTriangle, FileText, BarChart3, PiggyBank, Landmark, Baby, ShoppingCart, Flame, Music, Plane, BookOpen } from 'lucide-react';

export interface PersonaProfile {
  id: string;
  name: string;
  age: number;
  role: string;
  vibe: string;
  avatar: string;
  tagline: string;
  description: string;
  accentColor: string;
  features: PersonaFeature[];
  financials: PersonaFinancials;
  goals: PersonaGoal[];
  billers: PersonaBiller[];
  oracleBriefs: OracleBrief[];
  quickActions: QuickAction[];
  discoverCards: DiscoverCard[];
}

export type AppView = 'DASHBOARD' | 'PROFILE' | 'GOALS' | 'ORACLE' | 'ORACLE_HUB' | 'AUTOMATION_HUB' | 'PORTFOLIO' | 'EXPENDITURE' | 'PAYMENTS' | 'CARDS' | 'SUPPORT' | 'INVESTMENTS' | 'LOANS';

export interface PersonaFeature {
  title: string;
  description: string;
  icon: string;
  navigateTo?: AppView;
}

export interface PersonaFinancials {
  liquid: number;
  totalBalance: number;
  monthlyIncome: number;
  monthlySpend: number;
  safeToSpend: number;
  accountLabel: string;
  accountNumber: string;
  changePercent: number;
}

export interface PersonaGoal {
  id: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
  deadlineYear: number;
  status: 'ON_TRACK' | 'AT_RISK' | 'REBALANCED';
  monthlyContribution: number;
  description: string;
  insights: string[];
}

export interface PersonaBiller {
  id: string;
  name: string;
  amount: number;
  type: 'DUE' | 'AUTO';
  status?: 'ACTIVE' | 'PAUSED';
  dueDate: string;
  category: string;
}

export interface OracleBrief {
  id: string;
  title: string;
  summary: string;
  type: 'alert' | 'insight' | 'opportunity' | 'protection';
  actionLabel?: string;
}

export interface QuickAction {
  label: string;
  icon: string;
  color: string;
}

export interface DiscoverCard {
  title: string;
  subtitle: string;
  color: string;
  tag?: string;
  navigateTo?: AppView;
}

export const PERSONAS: PersonaProfile[] = [
  {
    id: 'advait',
    name: 'Advait',
    age: 34,
    role: 'Salaried Professional',
    vibe: 'Busy & Organized',
    avatar: 'A',
    tagline: 'Agile Orchestrator',
    description: 'The "Agile Orchestrator" balancing multi-generational support with "Fat FIRE" goals. Needs an autonomous Oracle.',
    accentColor: '#004d9c',
    features: [
      { title: 'Fat FIRE Planner', description: 'Track and optimize path to Financial Independence by 50.', icon: 'TrendingUp', navigateTo: 'GOALS' },
      { title: 'Family Shield', description: 'World-class healthcare management for parents. Auto-fund medical reserves.', icon: 'ShieldCheck', navigateTo: 'ORACLE' },
      { title: 'Smart Automation', description: 'Auto-move funds between goals, medical, and savings. Zero manual banking.', icon: 'Zap', navigateTo: 'AUTOMATION_HUB' },
    ],
    financials: {
      liquid: 1240500,
      totalBalance: 42000000,
      monthlyIncome: 425000,
      monthlySpend: 135000,
      safeToSpend: 290000,
      accountLabel: 'Federal Premium Savings',
      accountNumber: '**** 8842',
      changePercent: 4.8,
    },
    goals: [
      { id: 'adg1', title: 'Fat FIRE (Retirement by 50)', currentAmount: 42000000, targetAmount: 150000000, deadlineYear: 2040, status: 'ON_TRACK', monthlyContribution: 250000, description: 'Early retirement corpus to maintain current lifestyle adjusted for inflation.', insights: ['Current equity allocation is optimal.', 'Projected to hit target 14 months early.'] },
      { id: 'adg2', title: "Riya's Ivy League Fund", currentAmount: 5800000, targetAmount: 25000000, deadlineYear: 2040, status: 'ON_TRACK', monthlyContribution: 50000, description: 'Education corpus for daughter Riya (4 yrs) for international education.', insights: ['12% ahead of schedule.', 'Consider increasing SIP after bonus.'] },
      { id: 'adg3', title: 'Parents Healthcare Fund', currentAmount: 1200000, targetAmount: 3000000, deadlineYear: 2028, status: 'AT_RISK', monthlyContribution: 30000, description: 'Medical emergency and premium healthcare for parents.', insights: ['Medical inflation at 14%.', 'Add critical illness rider.'] },
    ],
    billers: [
      { id: 'adb1', name: 'Infinite Black Card', amount: 145000, type: 'DUE', dueDate: '3 days', category: 'Finance' },
      { id: 'adb2', name: 'Adani Electricity', amount: 4250, type: 'DUE', dueDate: '4 days', category: 'Utilities' },
      { id: 'adb3', name: 'Netflix Premium', amount: 649, type: 'AUTO', status: 'ACTIVE', dueDate: '5th of month', category: 'Entertainment' },
      { id: 'adb4', name: 'Amazon Prime', amount: 1499, type: 'AUTO', status: 'ACTIVE', dueDate: '12th of month', category: 'Entertainment' },
      { id: 'adb5', name: 'Parents Medical Insurance', amount: 12500, type: 'AUTO', status: 'ACTIVE', dueDate: '1st of month', category: 'Health' },
    ],
    oracleBriefs: [
      { id: 'adob1', title: 'FIRE Milestone Ahead', summary: 'Your retirement corpus crossed ₹4.2Cr. At current rate, you will hit Fat FIRE 14 months early by 2039.', type: 'insight', actionLabel: 'View Projection' },
      { id: 'adob2', title: 'Parent Health Alert', summary: "Father's prescription costs rose 22% this quarter. Consider switching to Federal Health Plus plan.", type: 'protection', actionLabel: 'Compare Plans' },
      { id: 'adob3', title: 'Smart Fund Move', summary: 'Surplus ₹1.8L detected. Auto-routing: ₹1L to FIRE, ₹50k to Riya Fund, ₹30k to Medical.', type: 'opportunity', actionLabel: 'Approve Split' },
      { id: 'adob4', title: 'Tax Optimization', summary: 'Claiming 80C + 80D + NPS can save ₹2.1L in taxes this FY. Action needed before March 31.', type: 'alert', actionLabel: 'Optimize Now' },
    ],
    quickActions: [
      { label: 'Send', icon: 'Send', color: '#1e3a5f' },
      { label: 'UPI', icon: 'Wallet', color: '#059669' },
      { label: 'Scan', icon: 'ScanLine', color: '#333333' },
      { label: 'Invest', icon: 'TrendingUp', color: '#f37021' },
    ],
    discoverCards: [
      { title: 'Fat FIRE Dashboard', subtitle: 'Track your path to early retirement.', color: 'from-blue-700 to-indigo-900', tag: 'FIRE', navigateTo: 'GOALS' },
      { title: 'Family Shield', subtitle: 'Healthcare & legacy for 3 generations.', color: 'from-emerald-600 to-teal-900', navigateTo: 'ORACLE' },
      { title: 'Auto-Pilot Banking', subtitle: 'Zero manual tasks. Oracle handles it all.', color: 'from-orange-500 to-red-700', tag: 'SMART', navigateTo: 'AUTOMATION_HUB' },
    ],
  },
  {
    id: 'kapoor',
    name: 'Mr. Kapoor',
    age: 68,
    role: 'Pensioner',
    vibe: 'Safe, Passive, Risk-averse',
    avatar: 'K',
    tagline: 'Wise Guardian',
    description: 'Retired bank manager. Prioritizes safety, health schemes, and protecting his pension from scams.',
    accentColor: '#065f46',
    features: [
      { title: 'Pension Orchestrator', description: 'Auto-split pension into medical, household, and savings wallets each month.', icon: 'Wallet', navigateTo: 'PORTFOLIO' },
      { title: 'Benefit Matchmaker', description: 'AI finds government health schemes and senior benefits you\'re eligible for.', icon: 'Heart', navigateTo: 'ORACLE' },
      { title: 'Deepfake Scrutiny', description: 'AI-powered fraud protection. Soft-locks on suspicious transfers. Voice verification.', icon: 'ShieldCheck', navigateTo: 'ORACLE' },
    ],
    financials: {
      liquid: 425000,
      totalBalance: 3800000,
      monthlyIncome: 65000,
      monthlySpend: 38000,
      safeToSpend: 27000,
      accountLabel: 'Federal Senior Savings',
      accountNumber: '**** 5501',
      changePercent: 1.8,
    },
    goals: [
      { id: 'kg1', title: 'Medical Emergency Fund', currentAmount: 800000, targetAmount: 1000000, deadlineYear: 2026, status: 'ON_TRACK', monthlyContribution: 15000, description: 'Emergency medical corpus for unforeseen health expenses.', insights: ['Fully funded by June 2026.', 'PMJAY scheme covers ₹5L additional.'] },
      { id: 'kg2', title: 'Grandson Education Gift', currentAmount: 250000, targetAmount: 500000, deadlineYear: 2030, status: 'ON_TRACK', monthlyContribution: 5000, description: 'Gift fund for grandson Aryan\'s higher education.', insights: ['Senior Citizen FD at 8.1% is optimal.', 'Tax-free under Section 80C.'] },
    ],
    billers: [
      { id: 'kb1', name: 'Apollo Health Insurance', amount: 8500, type: 'AUTO', status: 'ACTIVE', dueDate: '10th of month', category: 'Health' },
      { id: 'kb2', name: 'BSNL Landline + WiFi', amount: 1199, type: 'AUTO', status: 'ACTIVE', dueDate: '15th of month', category: 'Utilities' },
      { id: 'kb3', name: 'Municipal Property Tax', amount: 4200, type: 'DUE', dueDate: '10 days', category: 'Tax' },
      { id: 'kb4', name: 'Newspaper Subscription', amount: 350, type: 'AUTO', status: 'ACTIVE', dueDate: '1st of month', category: 'Lifestyle' },
      { id: 'kb5', name: 'Electricity Bill', amount: 2800, type: 'DUE', dueDate: '5 days', category: 'Utilities' },
    ],
    oracleBriefs: [
      { id: 'kob1', title: 'Fraud Alert Blocked', summary: 'A suspicious ₹45,000 transfer was soft-locked. Caller ID matched known scam pattern. Verify to proceed.', type: 'protection', actionLabel: 'Review Transfer' },
      { id: 'kob2', title: 'New Health Scheme', summary: 'Ayushman Bharat Senior Care now covers dental procedures. You\'re eligible for ₹50,000 coverage.', type: 'opportunity', actionLabel: 'Enroll Now' },
      { id: 'kob3', title: 'Pension Split Complete', summary: 'March pension of ₹65,000 auto-allocated: ₹25k Medical, ₹30k Household, ₹10k Savings.', type: 'insight', actionLabel: 'View Split' },
      { id: 'kob4', title: 'FD Maturity Reminder', summary: '₹3,00,000 FD matures on 15th March. Renew at 8.1% senior rate or withdraw?', type: 'alert', actionLabel: 'Decide' },
    ],
    quickActions: [
      { label: 'Send', icon: 'Send', color: '#065f46' },
      { label: 'Medical', icon: 'Heart', color: '#dc2626' },
      { label: 'Bills', icon: 'Receipt', color: '#f37021' },
      { label: 'SOS', icon: 'ShieldCheck', color: '#7c3aed' },
    ],
    discoverCards: [
      { title: 'Pension Orchestrator', subtitle: 'Auto-split pension into wallets.', color: 'from-emerald-600 to-green-900', tag: 'ACTIVE', navigateTo: 'PORTFOLIO' },
      { title: 'Benefit Matchmaker', subtitle: 'Government schemes you qualify for.', color: 'from-blue-500 to-indigo-800', navigateTo: 'ORACLE' },
      { title: 'Deepfake Scrutiny', subtitle: 'AI fraud shield. Sleep peacefully.', color: 'from-red-500 to-rose-800', tag: 'SHIELD', navigateTo: 'ORACLE' },
    ],
  },
  {
    id: 'rajesh',
    name: 'Rajesh',
    age: 45,
    role: 'Business Owner',
    vibe: 'Active, Risky, High-stress',
    avatar: 'R',
    tagline: 'Empire Builder',
    description: 'Runs a ₹4Cr textile export business. Juggles GST, vendors, and cash flow daily.',
    accentColor: '#004d9c',
    features: [
      { title: 'Auto-GST Reconciliation', description: 'Auto-match invoices with GSTN filings. Flag mismatches before deadlines.', icon: 'FileText', navigateTo: 'EXPENDITURE' },
      { title: 'Cash Flow Forecaster', description: 'Predict lean months and auto-suggest credit line drawdowns.', icon: 'TrendingUp', navigateTo: 'PORTFOLIO' },
      { title: 'Vendor Risk Alert', description: 'Monitor supplier credit ratings. Get warned before a vendor defaults.', icon: 'AlertTriangle', navigateTo: 'ORACLE' },
    ],
    financials: {
      liquid: 2450000,
      totalBalance: 18500000,
      monthlyIncome: 850000,
      monthlySpend: 620000,
      safeToSpend: 230000,
      accountLabel: 'Federal Business Current',
      accountNumber: '**** 7734',
      changePercent: 5.2,
    },
    goals: [
      { id: 'rg1', title: 'Business Expansion - New Unit', currentAmount: 8500000, targetAmount: 25000000, deadlineYear: 2028, status: 'ON_TRACK', monthlyContribution: 300000, description: 'New manufacturing unit in Surat for export scaling.', insights: ['Land acquisition on track.', 'Bank pre-approved ₹80L term loan.'] },
      { id: 'rg2', title: "Son's MBA Fund", currentAmount: 3200000, targetAmount: 12000000, deadlineYear: 2030, status: 'AT_RISK', monthlyContribution: 80000, description: 'IIM/ISB tuition + living expenses fund.', insights: ['Education inflation at 10%.', 'Consider increasing SIP by ₹20k/mo.'] },
    ],
    billers: [
      { id: 'rb1', name: 'GST Quarterly Filing', amount: 185000, type: 'DUE', dueDate: '5 days', category: 'Tax' },
      { id: 'rb2', name: 'Factory Electricity', amount: 34500, type: 'DUE', dueDate: '3 days', category: 'Utilities' },
      { id: 'rb3', name: 'Vendor - Surat Textiles', amount: 450000, type: 'DUE', dueDate: '7 days', category: 'Vendor' },
      { id: 'rb4', name: 'Tally Prime License', amount: 18000, type: 'AUTO', status: 'ACTIVE', dueDate: '1st of month', category: 'Software' },
      { id: 'rb5', name: 'Business Insurance', amount: 12500, type: 'AUTO', status: 'ACTIVE', dueDate: '15th of month', category: 'Insurance' },
    ],
    oracleBriefs: [
      { id: 'rob1', title: 'GST Mismatch Detected', summary: '₹2.3L invoice from Surat Textiles not reflected in GSTN portal. File before 20th to avoid penalty.', type: 'alert', actionLabel: 'Review GST' },
      { id: 'rob2', title: 'Cash Flow Warning', summary: 'Projected cash deficit of ₹3.8L in March due to delayed receivables from 2 clients.', type: 'protection', actionLabel: 'View Forecast' },
      { id: 'rob3', title: 'Vendor Credit Downgrade', summary: 'Mehta Fabrics credit rating dropped from A to BB+. Consider diversifying suppliers.', type: 'alert', actionLabel: 'Check Vendors' },
      { id: 'rob4', title: 'Tax Saving Opportunity', summary: 'You can save ₹1.2L by restructuring salary vs. dividend payouts this quarter.', type: 'opportunity', actionLabel: 'Optimize' },
    ],
    quickActions: [
      { label: 'Send', icon: 'Send', color: '#004d9c' },
      { label: 'Invoice', icon: 'FileText', color: '#f37021' },
      { label: 'Scan', icon: 'ScanLine', color: '#333333' },
      { label: 'GST', icon: 'Receipt', color: '#dc2626' },
    ],
    discoverCards: [
      { title: 'Auto-GST Reconciliation', subtitle: 'Match invoices with GSTN. Zero mismatches.', color: 'from-blue-600 to-blue-900', tag: 'NEW', navigateTo: 'EXPENDITURE' },
      { title: 'Cash Flow Forecaster', subtitle: 'AI predicts your next lean month.', color: 'from-amber-500 to-orange-700', navigateTo: 'PORTFOLIO' },
      { title: 'Vendor Risk Monitor', subtitle: 'Track supplier credit health live.', color: 'from-red-500 to-red-800', tag: 'ALERT', navigateTo: 'ORACLE' },
    ],
  },
  {
    id: 'ishan',
    name: 'Ishan',
    age: 21,
    role: 'Student',
    vibe: 'Creative, Independent, Tech-native',
    avatar: 'I',
    tagline: 'Digital Native',
    description: 'Engineering student at IIT. Manages part-time freelancing, subscriptions, and group expenses.',
    accentColor: '#7c3aed',
    features: [
      { title: 'Instant Bill Splitting', description: 'Split bills with friends instantly via UPI. Auto-send payment requests.', icon: 'Users', navigateTo: 'PAYMENTS' },
      { title: 'Goal Gamifier', description: 'Skip that coffee, save for Europe. Gamified saving streaks with rewards.', icon: 'Flame', navigateTo: 'GOALS' },
      { title: 'Subscription Clean-up', description: 'Find and cancel unused trials. Save ₹2k/month on forgotten subscriptions.', icon: 'Smartphone', navigateTo: 'EXPENDITURE' },
    ],
    financials: {
      liquid: 34500,
      totalBalance: 85000,
      monthlyIncome: 25000,
      monthlySpend: 18000,
      safeToSpend: 7000,
      accountLabel: 'Federal Savings',
      accountNumber: '**** 3312',
      changePercent: -2.1,
    },
    goals: [
      { id: 'ig1', title: 'Europe Trip Fund', currentAmount: 45000, targetAmount: 200000, deadlineYear: 2027, status: 'ON_TRACK', monthlyContribution: 5000, description: 'Backpacking through 5 countries. Flights + hostels + Eurail.', insights: ['Skip 3 coffees/week = ₹1.8k/mo saved.', '22-day streak! Keep going.'] },
      { id: 'ig2', title: 'New MacBook Pro', currentAmount: 28000, targetAmount: 120000, deadlineYear: 2026, status: 'AT_RISK', monthlyContribution: 3000, description: 'M4 MacBook Pro for development and design work.', insights: ['Freelance project could accelerate by 4 months.', 'Student discount saves ₹15k.'] },
    ],
    billers: [
      { id: 'ib1', name: 'Spotify Premium', amount: 119, type: 'AUTO', status: 'ACTIVE', dueDate: '5th of month', category: 'Entertainment' },
      { id: 'ib2', name: 'Netflix (shared)', amount: 162, type: 'AUTO', status: 'ACTIVE', dueDate: '12th of month', category: 'Entertainment' },
      { id: 'ib3', name: 'Figma Student', amount: 0, type: 'AUTO', status: 'ACTIVE', dueDate: '1st of month', category: 'Software' },
      { id: 'ib4', name: 'Adobe CC (unused)', amount: 1675, type: 'AUTO', status: 'PAUSED', dueDate: '20th of month', category: 'Software' },
      { id: 'ib5', name: 'Hostel Mess Fee', amount: 4500, type: 'DUE', dueDate: '2 days', category: 'Living' },
    ],
    oracleBriefs: [
      { id: 'iob1', title: 'Subscription Alert', summary: 'Adobe CC has been unused for 45 days. Cancel to save ₹1,675/mo. That\'s ₹20k/year!', type: 'insight', actionLabel: 'Cancel Now' },
      { id: 'iob2', title: 'Saving Streak!', summary: 'You skipped Starbucks 5 times this week. ₹1,250 saved toward your Europe trip!', type: 'opportunity', actionLabel: 'View Streak' },
      { id: 'iob3', title: 'Split Pending', summary: 'Arjun and Priya owe you ₹840 from last night\'s dinner. Auto-remind them?', type: 'alert', actionLabel: 'Send Reminder' },
      { id: 'iob4', title: 'Freelance Incoming', summary: 'Payment of ₹8,500 from Upwork expected in 2 days. Auto-route 40% to Europe fund?', type: 'opportunity', actionLabel: 'Set Rule' },
    ],
    quickActions: [
      { label: 'Split', icon: 'Users', color: '#7c3aed' },
      { label: 'UPI', icon: 'Wallet', color: '#059669' },
      { label: 'Scan', icon: 'ScanLine', color: '#333333' },
      { label: 'Save', icon: 'PiggyBank', color: '#f37021' },
    ],
    discoverCards: [
      { title: 'Instant Bill Splitting', subtitle: 'Split dinner. Auto-request friends.', color: 'from-violet-500 to-purple-800', tag: 'HOT', navigateTo: 'PAYMENTS' },
      { title: 'Goal Gamifier', subtitle: 'Skip coffee → Save for Europe.', color: 'from-orange-400 to-red-600', navigateTo: 'GOALS' },
      { title: 'Subscription Clean-up', subtitle: '₹2k/mo wasted on unused trials.', color: 'from-emerald-500 to-teal-700', tag: 'SAVE', navigateTo: 'EXPENDITURE' },
    ],
  },
  {
    id: 'anjali',
    name: 'Anjali',
    age: 38,
    role: 'Homemaker',
    vibe: 'Busy, Organized, Family CFO',
    avatar: 'A',
    tagline: 'Family Architect',
    description: 'Manages household of 5. Tracks 15+ bills, school fees, and builds savings for family milestones.',
    accentColor: '#be185d',
    features: [
      { title: 'Household Admin', description: 'Pay 15+ utility bills from one dashboard. Auto-pay, reminders, and payment history.', icon: 'Home', navigateTo: 'EXPENDITURE' },
      { title: 'Saving Architect', description: 'Optimize surplus cash for wedding fund, school fees, and emergency reserves.', icon: 'PiggyBank', navigateTo: 'GOALS' },
      { title: 'Spending Guardrails', description: 'Smart nudges when grocery or shopping trends exceed your monthly average.', icon: 'AlertTriangle', navigateTo: 'EXPENDITURE' },
    ],
    financials: {
      liquid: 285000,
      totalBalance: 1450000,
      monthlyIncome: 120000,
      monthlySpend: 92000,
      safeToSpend: 28000,
      accountLabel: 'Federal Family Savings',
      accountNumber: '**** 6689',
      changePercent: 3.4,
    },
    goals: [
      { id: 'ag1', title: "Daughter's Wedding Fund", currentAmount: 1200000, targetAmount: 5000000, deadlineYear: 2032, status: 'ON_TRACK', monthlyContribution: 25000, description: 'Wedding and ceremony fund for Meera.', insights: ['Gold SIP adding ₹5k/mo is smart hedge.', 'On track for ₹48L by 2032.'] },
      { id: 'ag2', title: 'Family Emergency Fund', currentAmount: 180000, targetAmount: 300000, deadlineYear: 2026, status: 'ON_TRACK', monthlyContribution: 10000, description: '6 months of household expenses as safety net.', insights: ['3.6 months covered currently.', 'Full coverage by September.'] },
      { id: 'ag3', title: 'Kids School Fee Reserve', currentAmount: 95000, targetAmount: 240000, deadlineYear: 2026, status: 'AT_RISK', monthlyContribution: 12000, description: 'Annual school fees for 2 children.', insights: ['Fee hike of 8% expected.', 'Start SIP in children\'s education fund.'] },
    ],
    billers: [
      { id: 'ab1', name: 'Electricity Bill', amount: 3200, type: 'DUE', dueDate: '3 days', category: 'Utilities' },
      { id: 'ab2', name: 'School Fee - Meera', amount: 18500, type: 'DUE', dueDate: '7 days', category: 'Education' },
      { id: 'ab3', name: 'School Fee - Arjun', amount: 15000, type: 'DUE', dueDate: '7 days', category: 'Education' },
      { id: 'ab4', name: 'Broadband - Jio Fiber', amount: 999, type: 'AUTO', status: 'ACTIVE', dueDate: '5th of month', category: 'Utilities' },
      { id: 'ab5', name: 'LPG Gas Cylinder', amount: 903, type: 'DUE', dueDate: '10 days', category: 'Household' },
      { id: 'ab6', name: 'Water Bill', amount: 450, type: 'DUE', dueDate: '15 days', category: 'Utilities' },
      { id: 'ab7', name: 'DTH - Tata Play', amount: 399, type: 'AUTO', status: 'ACTIVE', dueDate: '1st of month', category: 'Entertainment' },
      { id: 'ab8', name: 'Milk Subscription', amount: 2400, type: 'AUTO', status: 'ACTIVE', dueDate: 'Daily', category: 'Household' },
    ],
    oracleBriefs: [
      { id: 'aob1', title: 'Spending Alert', summary: 'Grocery spending is 18% above your 3-month average. You\'ve spent ₹12,400 vs usual ₹10,500.', type: 'alert', actionLabel: 'View Breakdown' },
      { id: 'aob2', title: 'Surplus Detected', summary: '₹8,200 surplus from last month. Route to Wedding Fund (₹5k) and Emergency (₹3.2k)?', type: 'opportunity', actionLabel: 'Auto-Route' },
      { id: 'aob3', title: 'Bill Reminder', summary: '3 bills due this week: Electricity (₹3.2k), Meera\'s fee (₹18.5k), Arjun\'s fee (₹15k). Total: ₹36.7k.', type: 'alert', actionLabel: 'Pay All' },
      { id: 'aob4', title: 'Smart Save Tip', summary: 'Switch LPG to PMUY subsidy plan. Save ₹200/cylinder × 12 = ₹2,400/year.', type: 'insight', actionLabel: 'Apply' },
    ],
    quickActions: [
      { label: 'Pay Bills', icon: 'Receipt', color: '#be185d' },
      { label: 'Transfer', icon: 'Send', color: '#004d9c' },
      { label: 'Scan', icon: 'ScanLine', color: '#333333' },
      { label: 'Save', icon: 'PiggyBank', color: '#059669' },
    ],
    discoverCards: [
      { title: 'Household Admin', subtitle: 'All 15+ bills in one dashboard.', color: 'from-pink-500 to-rose-800', tag: 'MANAGE', navigateTo: 'EXPENDITURE' },
      { title: 'Saving Architect', subtitle: 'Optimize surplus for family goals.', color: 'from-emerald-500 to-green-800', navigateTo: 'GOALS' },
      { title: 'Spending Guardrails', subtitle: 'Nudges when you overspend.', color: 'from-amber-500 to-orange-700', tag: 'SMART', navigateTo: 'EXPENDITURE' },
    ],
  },
];
