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
    Home, PieChart, BarChart3, Gift, Laptop, HeartPulse, Cpu, Globe, ArrowUpRight, Circle,
    FileText, Users, Heart, Receipt, PiggyBank, Flame, ScanLine, Plane
} from 'lucide-react';
import { Biller } from '../App';
import GrowthEngine from './GrowthEngine';
import { PersonaProfile } from '../data/personas';

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
    onOpenBillPay?: (biller: Biller) => void;
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
    persona?: PersonaProfile | null;
    onResetPersona?: () => void;
    activeLoan?: { amount: number; emi: number; tenure: number; rate: number; destination?: string } | null;
    savedLoanOffer?: { destination: string; amount: number; emi: number; rate: number; tenure: number } | null;
    onResumeLoanOffer?: () => void;
}

const iconMap: Record<string, any> = {
    Send, FileText, Smartphone, Receipt, Users, PiggyBank, Heart, ShieldCheck, Flame, ScanLine, Wallet, TrendingUp,
};

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
    persona,
    onResetPersona,
    activeLoan,
    savedLoanOffer,
    onResumeLoanOffer,
}) => {
    const totalBalance = persona ? persona.financials.liquid : currentFinancials.liquid;
    const [showCardDetails, setShowCardDetails] = React.useState(false);
    const [showCVC, setShowCVC] = React.useState(false);
    const [copied, setCopied] = React.useState<string | null>(null);

    const displayName = persona ? persona.name : 'Advait';
    const accountLabel = persona ? persona.financials.accountLabel : 'Federal Imperial';
    const accountNumber = persona ? persona.financials.accountNumber : '**** 8921';
    const changePercent = persona ? persona.financials.changePercent : 2.4;

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
                        {persona ? (
                            <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-apple relative z-10" style={{ backgroundColor: persona.accentColor }}>
                                {persona.avatar}
                            </div>
                        ) : (
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Advait"
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover border-2 border-white shadow-apple relative z-10"
                            />
                        )}
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">Welcome back,</p>
                        <h1 className="text-sm font-bold text-zinc-900 dark:text-white leading-none">{displayName}</h1>
                        {persona && <p className="text-[9px] text-zinc-500 mt-0.5">{persona.role}</p>}
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    {onResetPersona && (
                        <button
                            onClick={onResetPersona}
                            className="p-2 text-zinc-500 hover:text-federalblue-900 dark:hover:text-white transition-colors"
                            title="Switch Persona"
                        >
                            <Circle className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                    )}
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
            </div>

            <div className="px-6 space-y-10 max-w-md mx-auto pt-4">
                {/* --- Hero: The Titanium Balance Card --- */}
                <div className="relative group cursor-pointer" onClick={() => setShowCardDetails(true)}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-federalblue-600 via-federalgold-500/30 to-federalblue-900 rounded-[2.5rem] blur-2xl opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative aspect-[1.618/1] w-full rounded-[2rem] bg-gradient-to-br from-[#001d3d] via-federalblue-900 to-[#003566] px-8 py-7 flex flex-col justify-center shadow-hero overflow-hidden border border-white/10 transition-all duration-500 active:scale-[0.98]">
                        <div className="absolute top-0 right-0 w-72 h-72 bg-federalgold-500/15 rounded-full blur-[80px] -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-56 h-56 bg-federalblue-400/10 rounded-full blur-[70px] -ml-16 -mb-16"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent rotate-[25deg]"></div>

                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Total Liquidity</span>

                            <div className="flex-1 flex flex-col justify-center -mt-1">
                                <h2 className="text-[2.75rem] font-extralight text-white tabular-nums tracking-tighter drop-shadow-lg leading-none">
                                    ₹{totalBalance.toLocaleString('en-IN')}
                                </h2>
                                <p className="text-white/50 text-[10px] font-medium tracking-tight mt-2.5 flex items-center gap-2">
                                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                                    <span className={changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}>{changePercent >= 0 ? '+' : ''}{changePercent}%</span> vs last month
                                </p>
                            </div>

                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-white/60 text-[9px] font-bold uppercase tracking-widest leading-none mb-1.5">Primary Account</p>
                                    <p className="text-white/90 text-[13px] font-medium tracking-tight leading-none italic">{accountLabel} {accountNumber}</p>
                                </div>
                                <CreditCard className="w-5 h-5 text-white/40" />
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
                        <div className="w-10 h-10 rounded-full bg-federalblue-900 flex items-center justify-center shadow-md">
                            <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>

                {/* --- Quick Action Glass Pill (The floating bar) --- */}
                <div className="relative">
                    <div className="glass-card rounded-[2rem] p-3 flex items-center justify-between shadow-apple-lg border-t-white/90 dark:border-t-white/10 transform -translate-y-6">
                        {(persona ? persona.quickActions.map(qa => ({
                            icon: iconMap[qa.icon] || Send,
                            label: qa.label,
                            color: `bg-[${qa.color}]`,
                            onClick: qa.label === 'Send' || qa.label === 'Transfer' ? onOpenTransfer
                                : qa.label === 'UPI' ? () => onNavigate('UPI')
                                : qa.label === 'Scan' ? onOpenScanner
                                : qa.label === 'SOS' || qa.label === 'Medical' ? onOpenSOS
                                : qa.label === 'Pay Bills' || qa.label === 'Bills' ? () => onNavigate('EXPENDITURE')
                                : qa.label === 'Save' ? () => onNavigate('GOALS')
                                : qa.label === 'Split' ? onOpenTransfer
                                : qa.label === 'Invoice' || qa.label === 'GST' ? () => onNavigate('EXPENDITURE')
                                : onOpenTransfer
                        })) : [
                            { icon: Send, label: 'Send', color: 'bg-federalblue-900', onClick: onOpenTransfer },
                            { icon: Smartphone, label: 'UPI', color: 'bg-emerald-600', onClick: () => onNavigate('UPI') },
                            { icon: Smartphone, label: 'Scan', color: 'bg-zinc-800', onClick: onOpenScanner },
                            { icon: AlertTriangle, label: 'SOS', color: 'bg-red-600', onClick: onOpenSOS },
                        ]).map((action, i, arr) => (
                            <React.Fragment key={action.label}>
                                <button
                                    onClick={action.onClick}
                                    className="flex-1 group py-3 px-1 rounded-[1.25rem] hover:bg-white/40 dark:hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center gap-1.5 active:scale-95 text-center"
                                >
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`} style={{ backgroundColor: persona ? `${persona.accentColor}15` : 'rgba(0, 77, 156, 0.08)' }}>
                                        <action.icon className="w-5 h-5" strokeWidth={2} style={{ color: persona ? persona.accentColor : '#004d9c' }} />
                                    </div>
                                    <span className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">{action.label}</span>
                                </button>
                                {i < arr.length - 1 && <div className="w-px h-8 bg-zinc-200/50 dark:bg-zinc-800/50"></div>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* --- Persona Discover Cards --- */}
                {persona && persona.discoverCards.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-none tracking-tight">Discover</h3>
                        </div>

                        <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 snap-x snap-mandatory sleek-scroll">
                            {savedLoanOffer && (
                                <div
                                    className="min-w-[220px] snap-center p-4 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white shadow-lg relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform border border-white/15"
                                    onClick={() => onResumeLoanOffer?.()}
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-[30px] -mr-8 -mt-8"></div>
                                    <span className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md mb-1 inline-block">SAVED OFFER</span>
                                    <h4 className="text-[13px] font-bold mt-1 mb-0.5 leading-snug">✈️ {savedLoanOffer.destination} Trip Loan</h4>
                                    <p className="text-[10px] text-white/70 leading-relaxed">Pre-approved ₹{savedLoanOffer.amount.toLocaleString('en-IN')} at {savedLoanOffer.rate}% p.a.</p>
                                    <div className="mt-2.5 flex items-center gap-1 text-[9px] font-bold text-white/90 uppercase tracking-widest">
                                        <span>Resume</span>
                                        <ArrowRight className="w-2.5 h-2.5" />
                                    </div>
                                </div>
                            )}
                            {persona.discoverCards.map((card, i) => (
                                <div
                                    key={i}
                                    className={`min-w-[200px] snap-center p-4 rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-lg relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform backdrop-blur-md bg-opacity-80 border border-white/15`}
                                    onClick={() => card.navigateTo && onNavigate(card.navigateTo)}
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-[30px] -mr-8 -mt-8"></div>
                                    {card.tag && (
                                        <span className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md mb-1 inline-block">{card.tag}</span>
                                    )}
                                    <h4 className="text-[13px] font-bold mt-1 mb-0.5 leading-snug">{card.title}</h4>
                                    <p className="text-[10px] text-white/70 leading-relaxed">{card.subtitle}</p>
                                    <div className="mt-2.5 flex items-center gap-1 text-[9px] font-bold text-white/60 uppercase tracking-widest">
                                        <span>Explore</span>
                                        <ArrowRight className="w-2.5 h-2.5" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- Oracle Daily Brief Preview --- */}
                {persona && persona.oracleBriefs.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 px-1">
                            <div className="w-8 h-8 rounded-2xl bg-federalgold-50 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-federalgold-500" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-none">Oracle Daily Brief</h3>
                        </div>
                        <div className="space-y-3">
                            {persona.oracleBriefs.slice(0, 3).map((brief) => (
                                <div
                                    key={brief.id}
                                    className="glass-card p-5 rounded-[1.75rem] border border-slate-100 dark:border-zinc-800 space-y-2 cursor-pointer active:scale-[0.98] transition-transform"
                                    onClick={() => onNavigate('ORACLE_HUB')}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`w-2 h-2 rounded-full ${
                                                    brief.type === 'alert' ? 'bg-red-500' :
                                                    brief.type === 'protection' ? 'bg-amber-500' :
                                                    brief.type === 'opportunity' ? 'bg-emerald-500' :
                                                    'bg-blue-500'
                                                }`} />
                                                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{brief.title}</h4>
                                            </div>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{brief.summary}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0 mt-1" />
                                    </div>
                                    {brief.actionLabel && (
                                        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-federalblue-900 dark:text-federalblue-300">
                                            <span>{brief.actionLabel}</span>
                                            <ArrowRight className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

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
                {!persona && (
                <div className="pt-6 animate-fade-in relative">
                    <div className="flex items-center gap-3 px-1 mb-6">
                        <div className="w-8 h-8 rounded-2xl bg-federalgold-50 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-federalgold-500" />
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
                )}

                {activeLoan && (
                    <div className="space-y-4 pt-2">
                        <div className="flex justify-between items-center px-1">
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-none tracking-tight">Active Loan</h3>
                            <button
                                onClick={() => onNavigate('LOANS')}
                                className="text-xs font-bold text-federalblue-900 dark:text-federalblue-400 hover:underline flex items-center gap-1"
                            >
                                View Details <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>
                        <div
                            onClick={() => onNavigate('LOANS')}
                            className="glass-card rounded-[1.75rem] border border-emerald-200 dark:border-emerald-800/30 overflow-hidden cursor-pointer hover:shadow-md transition-all"
                        >
                            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-3 flex items-center gap-3">
                                <Plane className="w-4 h-4 text-white" />
                                <span className="text-xs font-bold text-white tracking-wide">Travel Bridge — {activeLoan.destination || 'Trip'}</span>
                            </div>
                            <div className="px-5 py-4 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-widest">Loan Amount</p>
                                    <p className="text-lg font-bold text-zinc-900 dark:text-white">₹{activeLoan.amount.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-widest">EMI</p>
                                    <p className="text-lg font-bold text-federalblue-900 dark:text-federalblue-400">₹{activeLoan.emi.toLocaleString('en-IN')}<span className="text-[10px] font-normal text-slate-400 dark:text-zinc-500">/mo</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- Recent Transactions --- */}
                {persona && persona.transactions && (
                    <div className="space-y-4 pt-2">
                        <div className="flex justify-between items-center px-1">
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-none tracking-tight">Recent Transactions</h3>
                            <button
                                onClick={() => onNavigate('TRANSACTIONS')}
                                className="text-xs font-bold text-federalblue-900 dark:text-federalblue-400 hover:underline flex items-center gap-1"
                            >
                                Show All <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>
                        <div className="glass-card rounded-[1.75rem] border border-slate-100 dark:border-zinc-800 divide-y divide-slate-100 dark:divide-zinc-800 overflow-hidden">
                            {persona.transactions.slice(0, 3).map((tx, i) => {
                                const TxIcon = iconMap[tx.icon] || Receipt;
                                return (
                                    <div key={tx.id} className="flex items-center gap-4 px-5 py-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tx.type === 'credit' ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-slate-100 dark:bg-zinc-800'}`}>
                                            <TxIcon className={`w-5 h-5 ${tx.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-zinc-400'}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white truncate">{tx.name}</h4>
                                            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">{tx.date} · {tx.method}</p>
                                        </div>
                                        <span className={`text-sm font-bold tabular-nums ${tx.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-800 dark:text-zinc-200'}`}>
                                            {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
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