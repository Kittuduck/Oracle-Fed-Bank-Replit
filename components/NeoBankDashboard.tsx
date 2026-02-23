/**
 * THE JONY IVE SPATIAL UI MASTERPIECE
 * 
 * DESIGN CRITIQUE: Flat design is a failure of imagination. It reduces the complex, high-stakes emotionality 
 * of the user's life savings into the visual equivalent of a parking lot. It has no depth, no hierarchy, 
 * and no soul. For a premium institution like Federal Bank, flat design feels "cheap." 
 * It ignores the physical world we inhabit. Our software should feel like a physical object — 
 * a piece of glass and light that you can reach out and touch.
 */

import React from 'react';
import {
    CreditCard, LayoutGrid, ChevronRight, Zap, Wallet,
    Sun, Moon, Smartphone, Send, RefreshCw, Sparkles,
    TrendingUp, CheckCircle2, AlertTriangle, GraduationCap,
    PlusCircle, X, Target, Plus, EyeOff, ShieldCheck, StopCircle, Search, UserPlus, ArrowRight,
    Home, PieChart, BarChart3, Gift, Laptop, HeartPulse, Cpu, Globe, ArrowUpRight
} from 'lucide-react';
import { Biller } from '../App';
import GrowthEngine from './GrowthEngine';

interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    targetDate: string;
}

interface GoalTrackerProps {
    goals: Goal[];
    onAddGoal: (goal: Goal) => void;
    onUpdateGoal: (goal: Goal) => void;
    isDarkMode: boolean;
    festival: 'DEFAULT' | 'DIWALI' | 'HOLI';
}

interface PortfolioPageProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
    festival: 'DEFAULT' | 'DIWALI' | 'HOLI';
}

interface ExpenditurePageProps {
    billers: Biller[];
    onToggleAutopay: (id: string) => void;
    festival: 'DEFAULT' | 'DIWALI' | 'HOLI';
}

interface NeoBankDashboardProps {
    onOpenProfile: () => void;
    onOpenCards: () => void;
    onOpenSOS: () => void;
    onOpenScanner: () => void;
    onOpenBillPay: (biller: Biller) => void;
    onOpenTransfer: () => void;
    onOpenInvestments: () => void;
    onOpenLoans: () => void;
    onOpenCardApply: () => void;
    onOpenNicheLoans: () => void;
    onOpenLegacyServices: () => void;
    onOpenOnboarding: () => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
    onNavigate: (page: any) => void;
    festival: 'DEFAULT' | 'DIWALI' | 'HOLI';
    setFestival: (f: 'DEFAULT' | 'DIWALI' | 'HOLI') => void;
}

const NeoBankDashboard: React.FC<NeoBankDashboardProps> = ({
    onOpenProfile,
    onOpenCards,
    onOpenSOS,
    onOpenScanner,
    onOpenBillPay,
    onOpenTransfer,
    onOpenInvestments,
    onOpenLoans,
    onOpenCardApply,
    onOpenNicheLoans,
    onOpenLegacyServices,
    onOpenOnboarding,
    isDarkMode,
    toggleTheme,
    currentFinancials,
    oracleActive,
    onNavigate,
    festival,
    setFestival,
}) => {
    const totalBalance = currentFinancials.liquid;
    const [showCardDetails, setShowCardDetails] = React.useState(false);
    const [showCVC, setShowCVC] = React.useState(false);
    const [copied, setCopied] = React.useState<string | null>(null);

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className={`min-h-screen pb-32 animate-fade-in font-sans selection:bg-federalgold-100 selection:text-federalgold-900 bg-zinc-50 dark:bg-zinc-950 transition-all duration-700 ${festival !== 'DEFAULT' ? `theme-festive-${festival.toLowerCase()}` : ''}`}>
            {/* --- Atmospheric Header --- */}
            <div className="sticky top-0 z-50 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-3xl px-6 py-6 flex justify-between items-center transition-colors duration-500 border-b border-white/20">
                <div className="flex items-center gap-3 group cursor-pointer" onClick={onOpenProfile}>
                    <div className="relative w-11 h-11">
                        <div className="absolute inset-0 bg-federalblue-900/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Advait"
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover border-2 border-white shadow-apple relative z-10"
                        />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">Welcome back,</p>
                        <h1 className="text-sm font-bold text-zinc-900 dark:text-white leading-none">Advait</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                const next: Record<string, 'DEFAULT' | 'DIWALI' | 'HOLI'> = {
                                    'DEFAULT': 'DIWALI',
                                    'DIWALI': 'HOLI',
                                    'HOLI': 'DEFAULT'
                                };
                                setFestival(next[festival]);
                            }}
                            className={`p-2 rounded-full transition-all ${festival !== 'DEFAULT' ? 'bg-federalgold-500/20 text-federalgold-600 dark:text-federalgold-400' : 'text-zinc-500 hover:text-federalblue-900'}`}
                            title="Cycle Festival Theme"
                        >
                            <Gift className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-zinc-500 hover:text-federalblue-900 transition-colors"
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" strokeWidth={1.5} /> : <Moon className="w-5 h-5" strokeWidth={1.5} />}
                        </button>
                    </div>
                    <button className="p-2 text-zinc-500 hover:text-federalblue-900 transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="px-6 space-y-10 max-w-md mx-auto pt-4">
                {/* --- Hero: The Titanium Balance Card --- */}
                <div className="relative group cursor-pointer" onClick={() => setShowCardDetails(true)}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-federalblue-600 to-federalblue-900 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative aspect-[1.618/1] w-full rounded-[2rem] bg-gradient-to-br from-[#004d9c] via-[#003a80] to-[#011a41] p-10 flex flex-col justify-between shadow-hero overflow-hidden border border-white/10 transition-transform active:scale-[0.98]">
                        {/* Decorative Atmospheric Glow */}
                        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-[80px] -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-federalgold-500/10 rounded-full blur-[60px] -ml-10 -mb-10"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">Total Liquidity</span>
                            </div>
                            <h2 className="text-5xl font-light text-white tabular-nums tracking-tighter drop-shadow-sm">
                                ₹{totalBalance.toLocaleString('en-IN')}
                            </h2>
                            <p className="text-white/40 text-[10px] font-medium tracking-tight mt-1 flex items-center gap-2">
                                <TrendingUp className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">+2.4%</span> vs last month
                            </p>
                        </div>

                        <div className="relative z-10 flex justify-between items-end">
                            <div>
                                <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest leading-none mb-2">Primary Account</p>
                                <p className="text-white/90 text-sm font-medium tracking-tight leading-none italic">Federal Imperial **** 8921</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3 text-white/40">
                                    <CreditCard className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Agentic Mode Quick Entry --- */}
                <div
                    onClick={() => {
                        onNavigate('ORACLE');
                    }}
                    className="relative z-20 -mt-8 mb-4 px-6 flex justify-center cursor-pointer group/search"
                >
                    <div className="w-full max-w-sm glass-card rounded-full p-1 pl-4 flex items-center justify-between shadow-oracle border border-federalgold-500/30 group-hover/search:scale-[1.02] transition-transform duration-300 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-4 h-4 text-federalgold-500 animate-pulse" />
                            <span className="text-sm font-medium text-slate-500 dark:text-zinc-500">Ask Oracle anything...</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-federalblue-900 to-federalblue-700 flex items-center justify-center shadow-md">
                            <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>

                {/* --- Quick Action Glass Pill (The floating bar) --- */}
                <div className="relative">
                    <div className="glass-card rounded-[2rem] p-3 flex items-center justify-between shadow-apple-lg border-t-white/90 dark:border-t-white/10 transform -translate-y-6">
                        {[
                            { icon: Send, label: 'Send', color: 'bg-federalblue-900', hover: 'hover:bg-federalblue-800', onClick: onOpenTransfer },
                            { icon: Smartphone, label: 'UPI', color: 'bg-emerald-600', hover: 'hover:bg-emerald-700', onClick: () => onNavigate('UPI') },
                            { icon: Smartphone, label: 'Scan', color: 'bg-zinc-800 dark:bg-zinc-700', hover: 'hover:bg-black', onClick: onOpenScanner },
                            { icon: AlertTriangle, label: 'SOS', color: 'bg-red-600', hover: 'hover:bg-red-700', onClick: onOpenSOS },
                        ].map((action, i) => (
                            <React.Fragment key={action.label}>
                                <button
                                    onClick={action.onClick}
                                    className="flex-1 group py-3 px-1 rounded-[1.25rem] hover:bg-white/40 dark:hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center gap-1.5 active:scale-95 text-center"
                                >
                                    <div className={`w-10 h-10 rounded-full ${action.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <action.icon className="w-5 h-5" strokeWidth={2.5} />
                                    </div>
                                    <span className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">{action.label}</span>
                                </button>
                                {i < 3 && <div className="w-px h-8 bg-zinc-200/50 dark:bg-zinc-800/50"></div>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* --- Services: The Frosted Grid --- */}
                <div className="space-y-6 pt-2">
                    <div className="flex justify-between items-center px-1">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-none tracking-tight">Explore</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        {[
                            { icon: Zap, label: 'Loans', desc: 'Asset Backed', color: 'text-orange-500', bg: 'bg-orange-50', onClick: onOpenLoans },
                            { icon: TrendingUp, label: 'Wealth', desc: 'Yield Engine', color: 'text-indigo-600', bg: 'bg-indigo-50', onClick: onOpenInvestments },
                            { icon: CreditCard, label: 'Services', desc: 'Management', color: 'text-federalblue-900', bg: 'bg-federalblue-50', onClick: onOpenCards },
                            { icon: UserPlus, label: 'Onboard', desc: 'New Account', color: 'text-emerald-600', bg: 'bg-emerald-50', onClick: onOpenOnboarding },
                        ].map((item) => (
                            <div
                                key={item.label}
                                onClick={item.onClick}
                                className="glass-card p-6 rounded-3xl spatial-hover cursor-pointer relative group overflow-hidden border-t-white/90"
                            >
                                <div className={`w-12 h-12 rounded-2xl ${item.bg} dark:bg-white/5 ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                                    <item.icon className="w-6 h-6" strokeWidth={2} />
                                </div>
                                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">{item.label}</h4>
                                <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">{item.desc}</p>
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transform duration-500">
                                    <ArrowRight className="w-4 h-4 text-zinc-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- AI Growth Engine --- */}
                <div className="pt-6 animate-fade-in relative">
                    <div className="flex items-center gap-3 px-1 mb-6">
                        <div className="w-8 h-8 rounded-full bg-federalgold-500 flex items-center justify-center text-white shadow-oracle">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-none">Curated for You</h3>
                    </div>

                    <div className="glass-card p-2 rounded-[2.5rem] border-t-white/90 overflow-hidden shadow-apple-lg">
                        <GrowthEngine
                            onOpenCardApply={onOpenCardApply}
                            onOpenLoans={onOpenLoans}
                            onOpenOnboarding={onOpenOnboarding}
                        />
                    </div>
                </div>
            </div>

            {/* --- Debit Card Details Modal --- */}
            {showCardDetails && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="w-full max-w-sm bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:to-black p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/20 shadow-2xl space-y-8 relative overflow-hidden transition-colors">
                        {/* Background Glows */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-federalblue-600/10 dark:bg-federalblue-600/20 rounded-full blur-[60px] -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-federalgold-500/5 dark:bg-federalgold-500/10 rounded-full blur-[60px] -ml-20 -mb-20"></div>

                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Federal Imperial</h3>
                                <p className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest mt-1">Debit Card</p>
                            </div>
                            <button
                                onClick={() => setShowCardDetails(false)}
                                className="p-2 -mr-2 text-slate-400 hover:text-slate-600 dark:text-white/40 dark:hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div className="space-y-2 group cursor-pointer" onClick={() => handleCopy('4321 5432 9876 8921', 'Card Number')}>
                                <p className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-[0.2em]">Card Number</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-2xl font-light text-slate-900 dark:text-white tracking-[0.1em] tabular-nums">4321 5432 9876 8921</p>
                                    <div className="flex items-center gap-2">
                                        {copied === 'Card Number' && <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Copied!</span>}
                                        <Smartphone className="w-4 h-4 text-slate-300 dark:text-white/20 group-hover:text-slate-600 dark:group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-12">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest">Expiry</p>
                                    <p className="text-lg font-medium text-slate-900 dark:text-white tracking-widest">12/28</p>
                                </div>
                                <div className="space-y-2 flex-1">
                                    <p className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest">CVC</p>
                                    <div className="flex items-center justify-between group cursor-pointer" onClick={() => handleCopy('452', 'CVC')}>
                                        <div className="flex items-center gap-4">
                                            <p className="text-lg font-bold text-slate-900 dark:text-white tracking-[0.3em]">
                                                {showCVC ? '452' : '•••'}
                                            </p>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setShowCVC(!showCVC); }}
                                                className="text-slate-400 hover:text-slate-600 dark:text-white/40 dark:hover:text-white transition-colors"
                                            >
                                                {showCVC ? <EyeOff className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {copied === 'CVC' && <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Copied!</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 dark:border-white/10 relative z-10 flex justify-between items-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-8 opacity-60 dark:opacity-80 drop-shadow-sm" />
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                                <span className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest">Encrypted</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Global Mesh Gradient Overlay (Very subtle) */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-50">
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-federalblue-50 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-federalgold-50 rounded-full blur-[100px]"></div>
            </div>
        </div>
    );
};

export default NeoBankDashboard;