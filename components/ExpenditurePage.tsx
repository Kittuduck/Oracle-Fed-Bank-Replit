import React, { useState } from 'react';
import { ArrowLeft, Sun, Moon, AlertTriangle, ShieldAlert, PauseCircle, PlayCircle, Snowflake, CheckCircle2, Zap, TrendingUp, Calendar, CreditCard, ChevronDown, RefreshCw, ShoppingBag, Utensils, Plane, Car, Home, TrendingDown, Plus, X, Globe, Smartphone, Dumbbell, Receipt, Heart, BookOpen, GraduationCap, Fuel, ArrowRight, Wallet, Users, Briefcase, Coffee, FileText, BarChart3, PiggyBank, Target, ShoppingCart, Flame, Music, ShieldCheck, ScanLine } from 'lucide-react';
import { ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { Biller } from '../App';
import { PersonaProfile } from '../data/personas';

const txIconMap: Record<string, any> = {
    CreditCard, Zap, Smartphone, TrendingUp, Wallet, Receipt, Users, Heart,
    GraduationCap, Briefcase, Home, Coffee, Globe, AlertTriangle, FileText,
    BarChart3, PiggyBank, Target, ShoppingCart, Flame, Music, ShieldCheck, ScanLine
};

interface ExpenditurePageProps {
    onBack: () => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
    billers: Biller[];
    onToggleAutopay: (id: string) => void;
    onAddBiller: (biller: Biller) => void;
    festival: 'DEFAULT' | 'DIWALI' | 'HOLI';
    persona: PersonaProfile | null;
    onNavigate?: (page: any) => void;
}

type TimeFrame = 'DAILY' | 'MONTHLY' | 'YEARLY';

const getPersonaExpenditureData = (personaId: string) => {
    const data: Record<string, any> = {
        advait: {
            anomaly: { amount: '₹12,400', location: 'Club Aqua, London' },
            insight: { text: 'You haven\'t visited "Gold\'s Gym" in 45 days, but the ₹3,500 auto-pay is scheduled for tomorrow.', action: 'Pause Subscription', billerId: 'adb3' },
            daily: [
                { name: 'Mon', amount: 2800, average: 4500 },
                { name: 'Tue', amount: 5200, average: 4500 },
                { name: 'Wed', amount: 1200, average: 4500 },
                { name: 'Thu', amount: 12400, average: 4800 },
                { name: 'Fri', amount: 3800, average: 5500 },
                { name: 'Sat', amount: 8500, average: 6000 },
                { name: 'Sun', amount: 4200, average: 5000 }
            ],
            monthly: [
                { name: 'Week 1', amount: 18000, average: 28000 },
                { name: 'Week 2', amount: 45000, average: 32000 },
                { name: 'Week 3', amount: 32000, average: 30000 },
                { name: 'Week 4', amount: 40000, average: 35000 }
            ],
            yearly: [
                { name: 'Jan', amount: 120000, average: 110000 },
                { name: 'Feb', amount: 145000, average: 115000 },
                { name: 'Mar', amount: 180000, average: 120000 },
                { name: 'Apr', amount: 130000, average: 125000 },
                { name: 'May', amount: 160000, average: 130000 },
                { name: 'Jun', amount: 140000, average: 135000 }
            ],
            totalSpend: '₹1,35,000',
            categories: {
                DAILY: [
                    { name: 'Shopping', amount: 12400, percent: 45, icon: ShoppingBag, color: 'bg-federalblue-900', textColor: 'text-federalblue-900' },
                    { name: 'Dining', amount: 4200, percent: 22, icon: Utensils, color: 'bg-federalgold-500', textColor: 'text-federalgold-600' },
                    { name: 'Transport', amount: 2500, percent: 13, icon: Car, color: 'bg-slate-600', textColor: 'text-slate-600' },
                ],
                MONTHLY: [
                    { name: 'Travel', amount: 45000, percent: 33, icon: Plane, color: 'bg-federalblue-700', textColor: 'text-federalblue-700' },
                    { name: 'Housing', amount: 42000, percent: 31, icon: Home, color: 'bg-slate-800', textColor: 'text-slate-800' },
                    { name: 'Lifestyle', amount: 28000, percent: 21, icon: ShoppingBag, color: 'bg-federalblue-500', textColor: 'text-federalblue-500' },
                ],
                YEARLY: [
                    { name: 'Investments', amount: 600000, percent: 45, icon: TrendingUp, color: 'bg-federalblue-900', textColor: 'text-federalblue-900' },
                    { name: 'Housing', amount: 420000, percent: 30, icon: Home, color: 'bg-slate-700', textColor: 'text-slate-700' },
                    { name: 'Travel', amount: 180000, percent: 13, icon: Plane, color: 'bg-federalgold-500', textColor: 'text-federalgold-600' },
                ]
            },
            insights: {
                DAILY: { icon: ShoppingBag, colorClass: 'text-federalblue-900', text: 'Unusual spike in Shopping today (+₹12.4k).', highlight: 'Shopping', highlightColor: 'text-federalblue-900' },
                MONTHLY: { icon: Plane, colorClass: 'text-federalblue-700', text: 'Spending is elevated this month due to Travel bookings (+₹45k).', highlight: 'Travel bookings', highlightColor: 'text-federalblue-700' },
                YEARLY: { icon: TrendingUp, colorClass: 'text-emerald-700', text: 'Investment allocation has increased by 45% year-over-year.', highlight: '45%', highlightColor: 'text-emerald-700' },
            }
        },
        kapoor: {
            anomaly: { amount: '₹45,000', location: 'Unknown UPI Transfer' },
            insight: { text: 'Your BSNL Landline bill of ₹1,199 can be reduced by switching to the Senior Citizen plan at ₹799/month.', action: 'Compare Plans', billerId: 'kb2' },
            daily: [
                { name: 'Mon', amount: 800, average: 1200 },
                { name: 'Tue', amount: 1500, average: 1200 },
                { name: 'Wed', amount: 600, average: 1200 },
                { name: 'Thu', amount: 2200, average: 1300 },
                { name: 'Fri', amount: 900, average: 1400 },
                { name: 'Sat', amount: 3200, average: 1500 },
                { name: 'Sun', amount: 1100, average: 1200 }
            ],
            monthly: [
                { name: 'Week 1', amount: 8000, average: 9000 },
                { name: 'Week 2', amount: 12000, average: 9500 },
                { name: 'Week 3', amount: 9000, average: 9500 },
                { name: 'Week 4', amount: 9000, average: 10000 }
            ],
            yearly: [
                { name: 'Jan', amount: 35000, average: 38000 },
                { name: 'Feb', amount: 42000, average: 38000 },
                { name: 'Mar', amount: 38000, average: 38000 },
                { name: 'Apr', amount: 36000, average: 38000 },
                { name: 'May', amount: 40000, average: 38000 },
                { name: 'Jun', amount: 39000, average: 38000 }
            ],
            totalSpend: '₹38,000',
            categories: {
                DAILY: [
                    { name: 'Medical', amount: 1800, percent: 40, icon: Heart, color: 'bg-red-600', textColor: 'text-red-600' },
                    { name: 'Groceries', amount: 1200, percent: 27, icon: ShoppingBag, color: 'bg-federalblue-900', textColor: 'text-federalblue-900' },
                    { name: 'Utilities', amount: 800, percent: 18, icon: Zap, color: 'bg-slate-600', textColor: 'text-slate-600' },
                ],
                MONTHLY: [
                    { name: 'Medical', amount: 15000, percent: 39, icon: Heart, color: 'bg-red-600', textColor: 'text-red-600' },
                    { name: 'Household', amount: 12000, percent: 32, icon: Home, color: 'bg-slate-800', textColor: 'text-slate-800' },
                    { name: 'Utilities', amount: 6000, percent: 16, icon: Zap, color: 'bg-federalgold-500', textColor: 'text-federalgold-600' },
                ],
                YEARLY: [
                    { name: 'Medical', amount: 180000, percent: 39, icon: Heart, color: 'bg-red-600', textColor: 'text-red-600' },
                    { name: 'Household', amount: 144000, percent: 31, icon: Home, color: 'bg-slate-700', textColor: 'text-slate-700' },
                    { name: 'Insurance', amount: 102000, percent: 22, icon: ShieldAlert, color: 'bg-federalblue-900', textColor: 'text-federalblue-900' },
                ]
            },
            insights: {
                DAILY: { icon: Heart, colorClass: 'text-red-600', text: 'Medical expenses above average today. Pharmacy bill of ₹1,800.', highlight: 'Medical', highlightColor: 'text-red-600' },
                MONTHLY: { icon: Heart, colorClass: 'text-red-600', text: 'Medical spending rose 18% this month. Consider claiming PMJAY benefits.', highlight: 'Medical spending', highlightColor: 'text-red-600' },
                YEARLY: { icon: ShieldAlert, colorClass: 'text-federalblue-900', text: 'Insurance premiums saved ₹12k via senior citizen discount this year.', highlight: '₹12k', highlightColor: 'text-emerald-700' },
            }
        },
        rajesh: {
            anomaly: { amount: '₹2,30,000', location: 'Unverified Vendor Transfer' },
            insight: { text: 'GST filing deadline is in 5 days. ₹1,85,000 quarterly payment is due. Auto-pay is not set up yet.', action: 'Set Up Auto-Pay', billerId: 'rb1' },
            daily: [
                { name: 'Mon', amount: 15000, average: 20000 },
                { name: 'Tue', amount: 45000, average: 20000 },
                { name: 'Wed', amount: 8000, average: 20000 },
                { name: 'Thu', amount: 62000, average: 22000 },
                { name: 'Fri', amount: 25000, average: 22000 },
                { name: 'Sat', amount: 12000, average: 18000 },
                { name: 'Sun', amount: 5000, average: 10000 }
            ],
            monthly: [
                { name: 'Week 1', amount: 120000, average: 150000 },
                { name: 'Week 2', amount: 280000, average: 155000 },
                { name: 'Week 3', amount: 145000, average: 155000 },
                { name: 'Week 4', amount: 175000, average: 160000 }
            ],
            yearly: [
                { name: 'Jan', amount: 580000, average: 620000 },
                { name: 'Feb', amount: 720000, average: 620000 },
                { name: 'Mar', amount: 650000, average: 620000 },
                { name: 'Apr', amount: 600000, average: 620000 },
                { name: 'May', amount: 690000, average: 620000 },
                { name: 'Jun', amount: 640000, average: 620000 }
            ],
            totalSpend: '₹6,20,000',
            categories: {
                DAILY: [
                    { name: 'Vendor Pay', amount: 45000, percent: 52, icon: Receipt, color: 'bg-federalblue-900', textColor: 'text-federalblue-900' },
                    { name: 'Operations', amount: 18000, percent: 21, icon: Dumbbell, color: 'bg-slate-700', textColor: 'text-slate-700' },
                    { name: 'Utilities', amount: 12000, percent: 14, icon: Zap, color: 'bg-federalgold-500', textColor: 'text-federalgold-600' },
                ],
                MONTHLY: [
                    { name: 'Vendors', amount: 320000, percent: 44, icon: Receipt, color: 'bg-federalblue-700', textColor: 'text-federalblue-700' },
                    { name: 'GST & Tax', amount: 185000, percent: 26, icon: Globe, color: 'bg-slate-800', textColor: 'text-slate-800' },
                    { name: 'Factory Ops', amount: 115000, percent: 16, icon: Home, color: 'bg-federalblue-500', textColor: 'text-federalblue-500' },
                ],
                YEARLY: [
                    { name: 'Vendors', amount: 3800000, percent: 50, icon: Receipt, color: 'bg-federalblue-900', textColor: 'text-federalblue-900' },
                    { name: 'Tax & GST', amount: 2200000, percent: 29, icon: Globe, color: 'bg-slate-700', textColor: 'text-slate-700' },
                    { name: 'Operations', amount: 1500000, percent: 20, icon: Home, color: 'bg-federalgold-500', textColor: 'text-federalgold-600' },
                ]
            },
            insights: {
                DAILY: { icon: Receipt, colorClass: 'text-federalblue-900', text: 'Large vendor payment of ₹45k to Surat Textiles. Invoice pending GSTN match.', highlight: 'Surat Textiles', highlightColor: 'text-federalblue-900' },
                MONTHLY: { icon: Globe, colorClass: 'text-slate-800', text: 'GST outflow is 26% of monthly spend. ₹12k input credit claimable.', highlight: '₹12k input credit', highlightColor: 'text-emerald-700' },
                YEARLY: { icon: TrendingUp, colorClass: 'text-emerald-700', text: 'Vendor costs down 8% YoY after renegotiating with 3 suppliers.', highlight: '8%', highlightColor: 'text-emerald-700' },
            }
        },
        ishan: {
            anomaly: { amount: '₹4,800', location: 'Steam Games Store' },
            insight: { text: 'Your Adobe CC subscription (₹1,675/mo) has been unused for 45 days. Cancel to save ₹20k/year.', action: 'Cancel Subscription', billerId: 'ib4' },
            daily: [
                { name: 'Mon', amount: 350, average: 600 },
                { name: 'Tue', amount: 800, average: 600 },
                { name: 'Wed', amount: 200, average: 600 },
                { name: 'Thu', amount: 1500, average: 650 },
                { name: 'Fri', amount: 2200, average: 800 },
                { name: 'Sat', amount: 3500, average: 900 },
                { name: 'Sun', amount: 1200, average: 700 }
            ],
            monthly: [
                { name: 'Week 1', amount: 3500, average: 4200 },
                { name: 'Week 2', amount: 5800, average: 4500 },
                { name: 'Week 3', amount: 4200, average: 4500 },
                { name: 'Week 4', amount: 4500, average: 4800 }
            ],
            yearly: [
                { name: 'Jan', amount: 16000, average: 18000 },
                { name: 'Feb', amount: 22000, average: 18000 },
                { name: 'Mar', amount: 19000, average: 18000 },
                { name: 'Apr', amount: 17000, average: 18000 },
                { name: 'May', amount: 20000, average: 18000 },
                { name: 'Jun', amount: 18000, average: 18000 }
            ],
            totalSpend: '₹18,000',
            categories: {
                DAILY: [
                    { name: 'Food', amount: 1500, percent: 42, icon: Utensils, color: 'bg-federalgold-500', textColor: 'text-federalgold-600' },
                    { name: 'Subscriptions', amount: 800, percent: 22, icon: Smartphone, color: 'bg-federalblue-900', textColor: 'text-federalblue-900' },
                    { name: 'Transport', amount: 500, percent: 14, icon: Car, color: 'bg-slate-600', textColor: 'text-slate-600' },
                ],
                MONTHLY: [
                    { name: 'Food & Mess', amount: 7500, percent: 42, icon: Utensils, color: 'bg-federalgold-500', textColor: 'text-federalgold-600' },
                    { name: 'Subscriptions', amount: 3500, percent: 19, icon: Smartphone, color: 'bg-federalblue-700', textColor: 'text-federalblue-700' },
                    { name: 'Social', amount: 4000, percent: 22, icon: ShoppingBag, color: 'bg-federalblue-500', textColor: 'text-federalblue-500' },
                ],
                YEARLY: [
                    { name: 'Food', amount: 90000, percent: 42, icon: Utensils, color: 'bg-federalgold-500', textColor: 'text-federalgold-600' },
                    { name: 'Subscriptions', amount: 42000, percent: 19, icon: Smartphone, color: 'bg-federalblue-900', textColor: 'text-federalblue-900' },
                    { name: 'Social', amount: 48000, percent: 22, icon: ShoppingBag, color: 'bg-slate-700', textColor: 'text-slate-700' },
                ]
            },
            insights: {
                DAILY: { icon: Utensils, colorClass: 'text-federalgold-600', text: 'You spent ₹1.5k on food today. Hostel mess saves ₹800/day on average.', highlight: 'Hostel mess', highlightColor: 'text-emerald-700' },
                MONTHLY: { icon: Smartphone, colorClass: 'text-federalblue-700', text: '3 unused subscriptions detected. Cancel to save ₹2k/month.', highlight: '₹2k/month', highlightColor: 'text-emerald-700' },
                YEARLY: { icon: TrendingUp, colorClass: 'text-emerald-700', text: 'Freelance income covered 55% of yearly expenses. Great progress!', highlight: '55%', highlightColor: 'text-emerald-700' },
            }
        },
        anjali: {
            anomaly: { amount: '₹8,500', location: 'Unknown Online Payment' },
            insight: { text: 'School fees for Meera (₹18,500) and Arjun (₹15,000) are due in 7 days. Total: ₹33,500. Sufficient balance available.', action: 'Pay All Fees', billerId: 'ab2' },
            daily: [
                { name: 'Mon', amount: 1200, average: 2800 },
                { name: 'Tue', amount: 3500, average: 2800 },
                { name: 'Wed', amount: 800, average: 2800 },
                { name: 'Thu', amount: 4200, average: 3000 },
                { name: 'Fri', amount: 2500, average: 3200 },
                { name: 'Sat', amount: 5800, average: 3500 },
                { name: 'Sun', amount: 2200, average: 2800 }
            ],
            monthly: [
                { name: 'Week 1', amount: 18000, average: 22000 },
                { name: 'Week 2', amount: 35000, average: 23000 },
                { name: 'Week 3', amount: 22000, average: 23000 },
                { name: 'Week 4', amount: 17000, average: 24000 }
            ],
            yearly: [
                { name: 'Jan', amount: 85000, average: 92000 },
                { name: 'Feb', amount: 98000, average: 92000 },
                { name: 'Mar', amount: 92000, average: 92000 },
                { name: 'Apr', amount: 88000, average: 92000 },
                { name: 'May', amount: 95000, average: 92000 },
                { name: 'Jun', amount: 90000, average: 92000 }
            ],
            totalSpend: '₹92,000',
            categories: {
                DAILY: [
                    { name: 'Groceries', amount: 2800, percent: 42, icon: ShoppingBag, color: 'bg-federalblue-900', textColor: 'text-federalblue-900' },
                    { name: 'Household', amount: 1500, percent: 22, icon: Home, color: 'bg-slate-700', textColor: 'text-slate-700' },
                    { name: 'Kids', amount: 1200, percent: 18, icon: GraduationCap, color: 'bg-federalgold-500', textColor: 'text-federalgold-600' },
                ],
                MONTHLY: [
                    { name: 'School Fees', amount: 33500, percent: 36, icon: GraduationCap, color: 'bg-federalblue-700', textColor: 'text-federalblue-700' },
                    { name: 'Groceries', amount: 25000, percent: 27, icon: ShoppingBag, color: 'bg-slate-800', textColor: 'text-slate-800' },
                    { name: 'Utilities', amount: 15000, percent: 16, icon: Zap, color: 'bg-federalgold-500', textColor: 'text-federalgold-600' },
                ],
                YEARLY: [
                    { name: 'Education', amount: 402000, percent: 36, icon: GraduationCap, color: 'bg-federalblue-900', textColor: 'text-federalblue-900' },
                    { name: 'Groceries', amount: 300000, percent: 27, icon: ShoppingBag, color: 'bg-slate-700', textColor: 'text-slate-700' },
                    { name: 'Utilities', amount: 180000, percent: 16, icon: Zap, color: 'bg-federalgold-500', textColor: 'text-federalgold-600' },
                ]
            },
            insights: {
                DAILY: { icon: ShoppingBag, colorClass: 'text-federalblue-900', text: 'Grocery spending is 18% above your 3-month daily average.', highlight: 'Grocery', highlightColor: 'text-federalblue-900' },
                MONTHLY: { icon: GraduationCap, colorClass: 'text-federalblue-700', text: 'School fees account for 36% of monthly spend. Fee hike of 8% expected next term.', highlight: 'School fees', highlightColor: 'text-federalblue-700' },
                YEARLY: { icon: TrendingDown, colorClass: 'text-emerald-700', text: 'Utility costs dropped 12% after switching to auto-pay discounts.', highlight: '12%', highlightColor: 'text-emerald-700' },
            }
        }
    };
    return data[personaId] || data['advait'];
};

const ExpenditurePage: React.FC<ExpenditurePageProps> = ({ onBack, isDarkMode, toggleTheme, billers, onToggleAutopay, onAddBiller, festival, persona, onNavigate }) => {
    const [timeframe, setTimeframe] = useState<TimeFrame>('MONTHLY');
    const [anomalyStatus, setAnomalyStatus] = useState<'PENDING' | 'VERIFIED' | 'FROZEN'>('PENDING');
    const [showAddBiller, setShowAddBiller] = useState(false);
    const [newBiller, setNewBiller] = useState({
        name: '',
        amount: '',
        category: 'Utilities',
        type: 'AUTO' as 'AUTO' | 'DUE'
    });

    const pData = getPersonaExpenditureData(persona?.id || 'advait');

    const dailyData = pData.daily;
    const monthlyData = pData.monthly;
    const yearlyData = pData.yearly;

    const categoryData = pData.categories;

    const insightData = {
        DAILY: {
            icon: pData.insights.DAILY.icon,
            colorClass: pData.insights.DAILY.colorClass,
            message: (
                <>
                    <span className="font-semibold text-[#333333] dark:text-white">Insight:</span> <span className={`font-medium ${pData.insights.DAILY.highlightColor}`}>{pData.insights.DAILY.highlight}</span> — {pData.insights.DAILY.text}
                </>
            )
        },
        MONTHLY: {
            icon: pData.insights.MONTHLY.icon,
            colorClass: pData.insights.MONTHLY.colorClass,
            message: (
                <>
                    <span className="font-semibold text-[#333333] dark:text-white">Insight:</span> <span className={`font-medium ${pData.insights.MONTHLY.highlightColor}`}>{pData.insights.MONTHLY.highlight}</span> — {pData.insights.MONTHLY.text}
                </>
            )
        },
        YEARLY: {
            icon: pData.insights.YEARLY.icon,
            colorClass: pData.insights.YEARLY.colorClass,
            message: (
                <>
                    <span className="font-semibold text-[#333333] dark:text-white">Insight:</span> <span className={`font-medium ${pData.insights.YEARLY.highlightColor}`}>{pData.insights.YEARLY.highlight}</span> — {pData.insights.YEARLY.text}
                </>
            )
        }
    };

    const getData = () => {
        switch (timeframe) {
            case 'DAILY': return dailyData;
            case 'MONTHLY': return monthlyData;
            case 'YEARLY': return yearlyData;
        }
    };

    const getCategoryBreakdown = () => {
        return categoryData[timeframe];
    };

    const getCurrentInsight = () => {
        return insightData[timeframe];
    };

    const formatCurrency = (val: number) => {
        return val >= 1000 ? `₹${(val / 1000).toFixed(1)}k` : `₹${val}`;
    };

    const autopayBillers = billers.filter(b => b.type === 'AUTO');

    const handleFreeze = () => {
        setAnomalyStatus('FROZEN');
    };

    const handleVerify = () => {
        setAnomalyStatus('VERIFIED');
    };

    const InsightIcon = getCurrentInsight().icon;

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const biller: Biller = {
            id: `b-${Date.now()}`,
            name: newBiller.name,
            amount: parseFloat(newBiller.amount),
            type: newBiller.type,
            status: newBiller.type === 'AUTO' ? 'ACTIVE' : undefined,
            dueDate: 'Next month',
            icon: newBiller.category === 'Utilities' ? Zap : Receipt,
            category: newBiller.category
        };
        onAddBiller(biller);
        setShowAddBiller(false);
        setNewBiller({ name: '', amount: '', category: 'Utilities', type: 'AUTO' });
    };

    if (showAddBiller) {
        return (
            <div className={`min-h-screen flex flex-col transition-all duration-700 ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-white text-[#333333]'}`}>
                <nav className="px-6 py-4 flex items-center justify-between border-b border-[#E0E0E0] dark:border-zinc-800">
                    <button onClick={() => setShowAddBiller(false)} className="p-2 -ml-2 text-slate-500 hover:text-federalblue-900 rounded-full">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <span className="font-bold text-lg">Add New Biller</span>
                    <div className="w-10"></div>
                </nav>

                <main className="flex-1 p-6 max-w-xl mx-auto w-full space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                    <form onSubmit={handleAddSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest ml-1">Biller Name</label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. Jio Fiber, Tata Play"
                                value={newBiller.name}
                                onChange={e => setNewBiller({ ...newBiller, name: e.target.value })}
                                className="w-full p-4 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-federalblue-900 dark:text-white font-medium focus:ring-2 focus:ring-federalblue-900 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest ml-1">Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                <input
                                    required
                                    type="number"
                                    placeholder="0.00"
                                    value={newBiller.amount}
                                    onChange={e => setNewBiller({ ...newBiller, amount: e.target.value })}
                                    className="w-full p-4 pl-8 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-federalblue-900 dark:text-white font-medium focus:ring-2 focus:ring-federalblue-900 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest ml-1">Category</label>
                                <select
                                    value={newBiller.category}
                                    onChange={e => setNewBiller({ ...newBiller, category: e.target.value })}
                                    className="w-full p-4 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-federalblue-900 dark:text-white font-medium outline-none transition-all appearance-none"
                                >
                                    <option value="Utilities">Utilities</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest ml-1">Payment Method</label>
                                <select
                                    value={newBiller.type}
                                    onChange={e => setNewBiller({ ...newBiller, type: e.target.value as 'AUTO' | 'DUE' })}
                                    className="w-full p-4 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-federalblue-900 dark:text-white font-medium outline-none transition-all appearance-none"
                                >
                                    <option value="AUTO">Autopay</option>
                                    <option value="DUE">Manual Pay</option>
                                </select>
                            </div>
                        </div>

                        <div className="p-4 bg-federalblue-50 dark:bg-federalblue-900/10 border border-federalblue-100 dark:border-federalblue-800/30 rounded-xl flex items-center gap-3">
                            <Globe className="w-5 h-5 text-federalblue-700 dark:text-federalblue-400" />
                            <p className="text-[11px] text-slate-600 dark:text-slate-300">Adding a biller via <span className="font-bold">Bharat Bill Pay (BBPS)</span> for instant confirmation.</p>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-federalblue-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold shadow-xl active:scale-[0.98] transition-all"
                        >
                            Save Biller
                        </button>
                    </form>
                </main>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-all duration-700 ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-white text-[#333333]'} ${festival !== 'DEFAULT' ? `theme-festive-${festival.toLowerCase()}` : ''}`}>
            <div className="bg-transparent min-h-screen font-sans pb-24">

                {/* Navigation */}
                <nav className="sticky top-0 bg-white/95 dark:bg-zinc-950/90 backdrop-blur-md z-50 border-b border-[#E0E0E0] dark:border-zinc-800 transition-colors">
                    <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-federalblue-900 rounded-full hover:bg-[#F6F6F6] dark:hover:bg-slate-800/50 transition-colors">
                                <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
                            </button>
                            <span className="font-semibold text-lg text-[#333333] dark:text-white">Expenditure Intelligence</span>
                        </div>
                        <button onClick={toggleTheme} className="p-2 text-slate-500 hover:text-federalblue-900 transition-colors">
                            {isDarkMode ? <Sun className="w-5 h-5" strokeWidth={1.5} /> : <Moon className="w-5 h-5" strokeWidth={1.5} />}
                        </button>
                    </div>
                </nav>

                <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">

                    {/* Anomaly Detection Section - Federal Style: Flat card, sharp borders */}
                    {anomalyStatus === 'PENDING' && (
                        <div className="bg-white dark:bg-[#15161a] border border-federalblue-100 dark:border-federalblue-900/30 rounded-xl p-5 animate-fade-in shadow-federal relative overflow-hidden">
                            {/* Subtle Warning Pattern */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-federalgold-600"></div>
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                <AlertTriangle className="w-32 h-32 text-federalgold-900" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-federalgold-50 dark:bg-federalgold-900/20 text-federalgold-700 dark:text-federalgold-400 rounded-lg">
                                        <ShieldAlert className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-[#333333] dark:text-white">Anomaly Detected</h3>
                                </div>

                                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed max-w-xl">
                                    We noticed an unusual transaction of <span className="font-bold text-[#333333] dark:text-white">{pData.anomaly.amount}</span> at <span className="font-bold text-[#333333] dark:text-white">{pData.anomaly.location}</span>.
                                </p>

                                <div className="flex gap-3">
                                    <button onClick={handleFreeze} className="flex items-center gap-2 px-4 py-2.5 bg-federalyellow-500 hover:bg-federalyellow-600 text-[#333333] text-xs font-bold rounded-lg shadow-sm transition-all">
                                        <Snowflake className="w-4 h-4" /> Freeze Card
                                    </button>
                                    <button onClick={handleVerify} className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-transparent border border-[#E0E0E0] dark:border-slate-700 hover:bg-[#F6F6F6] dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg transition-all">
                                        <CheckCircle2 className="w-4 h-4" /> It was me
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Oracle Insight - Federal Style */}
                    <div className="bg-gradient-to-r from-federalblue-50/80 to-white dark:from-federalblue-900/10 dark:to-[#1c1e24] border border-federalblue-100 dark:border-federalblue-800/30 rounded-xl p-5 relative overflow-hidden">
                        <div className="flex items-start gap-3 relative z-10">
                            <div className="p-2 bg-white dark:bg-[#15161a] border border-[#E0E0E0] dark:border-federalblue-800/20 rounded-lg text-federalblue-900 dark:text-federalblue-400 shadow-sm">
                                <Zap className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="text-xs font-bold text-federalblue-900 dark:text-federalblue-400 uppercase tracking-wider">Oracle Insight</h4>
                                    <span className="text-[10px] text-slate-400">Just now</span>
                                </div>
                                <p className="text-sm text-slate-700 dark:text-slate-200 font-medium mb-3">
                                    {pData.insight.text}
                                </p>
                                <button
                                    onClick={() => onToggleAutopay(pData.insight.billerId)}
                                    disabled={billers.find(a => a.id === pData.insight.billerId)?.status === 'PAUSED'}
                                    className="text-xs bg-white border border-[#E0E0E0] hover:border-federalblue-500 hover:text-federalblue-900 dark:bg-[#1c1e24] dark:border-slate-700 dark:hover:border-federalblue-500 text-slate-700 dark:text-white px-4 py-2 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                >
                                    {billers.find(a => a.id === pData.insight.billerId)?.status === 'PAUSED' ? 'Suggestion Executed' : pData.insight.action}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Insightful Spending Trends */}
                    <div className="bg-white dark:bg-[#15161a] border border-[#E0E0E0] dark:border-slate-800 rounded-xl p-6 shadow-federal dark:shadow-none">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-[#333333] dark:text-white">Spending Analysis</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                                    Current Period: <span className="font-semibold text-[#333333] dark:text-white">{pData.totalSpend}</span>
                                </p>
                            </div>

                            <div className="flex bg-[#F6F6F6] dark:bg-[#0b0c10] p-1 rounded-lg border border-[#E0E0E0] dark:border-slate-800">
                                {(['DAILY', 'MONTHLY', 'YEARLY'] as TimeFrame[]).map((tf) => (
                                    <button
                                        key={tf}
                                        onClick={() => setTimeframe(tf)}
                                        className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${timeframe === tf
                                            ? 'bg-white dark:bg-[#1c1e24] text-federalblue-900 dark:text-white shadow-sm border border-[#E0E0E0] dark:border-slate-700'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                            }`}
                                    >
                                        {tf.charAt(0) + tf.slice(1).toLowerCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-2">
                                <div className="h-[250px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={getData()} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                            <CartesianGrid vertical={false} stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeDasharray="3 3" opacity={0.4} />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }} tickFormatter={formatCurrency} />
                                            <Tooltip
                                                cursor={{ fill: isDarkMode ? '#1e293b' : '#f1f5f9', opacity: 0.4 }}
                                                contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', borderRadius: '8px', color: isDarkMode ? '#fff' : '#000' }}
                                            />
                                            <Bar dataKey="amount" radius={[4, 4, 0, 0]} maxBarSize={40}>
                                                {getData().map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={isDarkMode ? '#004d9c' : '#004d9c'} />
                                                ))}
                                            </Bar>
                                            <Line type="monotone" dataKey="average" stroke={isDarkMode ? '#94a3b8' : '#64748b'} strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3, fill: isDarkMode ? '#15161a' : '#fff' }} />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between h-full bg-[#F9F9F9] dark:bg-[#1c1e24] rounded-xl p-5 border border-[#E0E0E0] dark:border-slate-800">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Where it went</h4>
                                    <div className="space-y-4">
                                        {getCategoryBreakdown().map((cat) => (
                                            <div key={cat.name}>
                                                <div className="flex justify-between items-center mb-1.5">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`p-1.5 rounded-md ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                                                            <cat.icon className={`w-3 h-3 ${isDarkMode ? 'text-zinc-300' : cat.textColor}`} />
                                                        </div>
                                                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{cat.name}</span>
                                                    </div>
                                                    <span className="text-xs font-semibold text-[#333333] dark:text-white">{formatCurrency(cat.amount)}</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-[#E0E0E0] dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.percent}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Autopay Manager - Federal Style */}
                    <div className="bg-white dark:bg-[#15161a] border border-[#E0E0E0] dark:border-slate-800 rounded-xl overflow-hidden shadow-federal dark:shadow-none">
                        <div className="px-6 py-4 border-b border-[#E0E0E0] dark:border-slate-800 flex justify-between items-center bg-[#F9F9F9] dark:bg-[#1c1e24]/30">
                            <h3 className="font-bold text-[#333333] dark:text-white flex items-center gap-2">
                                <RefreshCw className="w-4 h-4 text-slate-500" />
                                Autopay Manager
                            </h3>
                            <button
                                onClick={() => setShowAddBiller(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-federalblue-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg text-[10px] font-bold shadow-lg active:scale-95 transition-all"
                            >
                                <Plus className="w-3.5 h-3.5" /> ADD BILLER
                            </button>
                        </div>

                        <div className="divide-y divide-[#E0E0E0] dark:divide-slate-800">
                            {autopayBillers.map((item) => (
                                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-[#F9F9F9] dark:hover:bg-slate-800/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${item.status === 'ACTIVE'
                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400'
                                            : 'bg-[#F6F6F6] dark:bg-slate-800 border-[#E0E0E0] dark:border-slate-700 text-slate-400'
                                            }`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className={`text-sm font-semibold ${item.status === 'ACTIVE' ? 'text-[#333333] dark:text-white' : 'text-slate-500 line-through'}`}>
                                                {item.name}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">₹{item.amount.toLocaleString()}</span>
                                                <span className="text-[10px] text-slate-400">• {item.dueDate}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button onClick={() => onToggleAutopay(item.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${item.status === 'ACTIVE'
                                        ? 'bg-[#F6F6F6] dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#E0E0E0] dark:hover:bg-slate-700'
                                        : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                                        }`}>
                                        {item.status === 'ACTIVE' ? <><PauseCircle className="w-3.5 h-3.5" /> Pause</> : <><PlayCircle className="w-3.5 h-3.5" /> Resume</>}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {persona && persona.transactions && persona.transactions.length > 0 && (
                        <div className="space-y-4 pt-2">
                            <div className="flex justify-between items-center px-1">
                                <h3 className="text-sm font-bold text-[#333333] dark:text-zinc-100">Recent Transactions</h3>
                                <button
                                    onClick={() => onNavigate && onNavigate('TRANSACTIONS')}
                                    className="text-[10px] font-bold text-federalblue-900 dark:text-federalblue-400 hover:underline flex items-center gap-1"
                                >
                                    Show All <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                            <div className="bg-white dark:bg-[#15161a] rounded-xl border border-[#E0E0E0] dark:border-zinc-800 divide-y divide-[#E0E0E0] dark:divide-zinc-800 overflow-hidden">
                                {persona.transactions.slice(0, 3).map((tx) => {
                                    const TxIcon = txIconMap[tx.icon] || Receipt;
                                    return (
                                        <div key={tx.id} className="flex items-center gap-4 px-4 py-3">
                                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${tx.type === 'credit' ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-[#F6F6F6] dark:bg-zinc-800'}`}>
                                                <TxIcon className={`w-4 h-4 ${tx.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-zinc-400'}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-xs font-semibold text-[#333333] dark:text-white truncate">{tx.name}</h4>
                                                <p className="text-[10px] text-slate-400 dark:text-zinc-500">{tx.date} · {tx.method}</p>
                                            </div>
                                            <span className={`text-xs font-bold tabular-nums ${tx.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#333333] dark:text-zinc-200'}`}>
                                                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ExpenditurePage;