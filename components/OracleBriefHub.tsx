import React from 'react';
import {
    Sparkles,
    AlertTriangle,
    Zap,
    Calendar,
    TrendingUp,
    ShieldCheck,
    ChevronRight,
    Target,
    Settings,
    CreditCard as CardIcon,
    Layers,
    ArrowRight,
    ArrowDownRight,
    ArrowUpRight
} from 'lucide-react';
import PredictiveChart from './PredictiveChart';
import { PersonaProfile } from '../data/personas';

interface OracleBriefHubProps {
    isDarkMode: boolean;
    festival: 'DEFAULT' | 'DIWALI' | 'HOLI';
    onAction: (action: string) => void;
    currentFinancials: { liquid: number, need: number, goal: number };
    persona?: PersonaProfile | null;
}

const OracleBriefHub: React.FC<OracleBriefHubProps> = ({ isDarkMode, festival, onAction, currentFinancials, persona }) => {
    return (
        <div className={`flex flex-col h-full bg-white dark:bg-[#0b0c10] transition-all duration-700 ${festival !== 'DEFAULT' ? `theme-festive-${festival.toLowerCase()}` : ''}`}>
            <div className="p-6 space-y-8 overflow-y-auto">
                {/* --- Hero: Safe to Spend --- */}
                <div className="p-6 bg-gradient-to-br from-federalblue-900 via-[#003a80] to-[#011a41] rounded-[2.5rem] text-white shadow-hero relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-[60px] -mr-10 -mt-10"></div>
                    <div className="relative z-10 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Safe to Spend
                            </span>
                            <span className="px-2 py-1 bg-white/20 rounded text-[9px] font-bold uppercase tracking-wider backdrop-blur-md">Updated Just Now</span>
                        </div>
                        <h2 className="text-4xl font-light tabular-nums tracking-tighter">
                            ₹{persona ? persona.financials.safeToSpend.toLocaleString('en-IN') : '68,540'} <span className="text-sm font-medium text-white/60">left this month</span>
                        </h2>
                        {persona && (
                            <p className="text-[10px] text-white/50">{persona.name}'s {persona.role} Dashboard</p>
                        )}
                    </div>
                </div>

                {/* --- Persona Oracle Briefs --- */}
                {persona && persona.oracleBriefs.length > 0 && (
                    <div className="space-y-3">
                        <h3 className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-[0.2em] ml-2">
                            Oracle Briefs for {persona.name}
                        </h3>
                        {persona.oracleBriefs.map((brief) => (
                            <div
                                key={brief.id}
                                className={`p-5 rounded-[1.75rem] border space-y-3 ${
                                    brief.type === 'alert' ? 'bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30' :
                                    brief.type === 'protection' ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30' :
                                    brief.type === 'opportunity' ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30' :
                                    'bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                                        brief.type === 'alert' ? 'bg-red-100 dark:bg-red-900/40 text-red-600' :
                                        brief.type === 'protection' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600' :
                                        brief.type === 'opportunity' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600' :
                                        'bg-blue-100 dark:bg-blue-900/40 text-blue-600'
                                    }`}>
                                        {brief.type === 'alert' ? <AlertTriangle className="w-4 h-4" /> :
                                         brief.type === 'protection' ? <ShieldCheck className="w-4 h-4" /> :
                                         brief.type === 'opportunity' ? <TrendingUp className="w-4 h-4" /> :
                                         <Sparkles className="w-4 h-4" />}
                                    </div>
                                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{brief.title}</h4>
                                </div>
                                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">{brief.summary}</p>
                                {brief.actionLabel && (
                                    <button
                                        onClick={() => onAction(brief.actionLabel || 'Chat')}
                                        className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"
                                        style={{ color: persona.accentColor }}
                                    >
                                        {brief.actionLabel} <ChevronRight className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* --- Predictive Prompt Top --- */}
                <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] border border-slate-100 dark:border-zinc-800 text-center space-y-4 shadow-sm animate-in slide-in-from-top-4">
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold text-federalblue-900 dark:text-white">Ask Oracle Anything</h4>
                        <p className="text-[10px] text-slate-500 dark:text-zinc-400">Type "Can I afford a trip to Bali?" or track expenses.</p>
                    </div>
                    <button onClick={() => onAction('Chat')} className="w-full py-4 bg-federalblue-900 dark:bg-white text-white dark:text-black rounded-2xl text-xs font-bold flex items-center justify-center gap-2 group shadow-lg active:scale-95 transition-transform">
                        <Sparkles className="w-4 h-4 text-federalgold-500" />
                        Enter Agentic Mode
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>

                {/* --- Predictive Chart Section --- */}
                < PredictiveChart isDarkMode={isDarkMode} />

                {/* --- Performance Section --- */}
                < div className="grid grid-cols-2 gap-4" >
                    <div className="p-5 glass-card rounded-3xl border border-slate-100 dark:border-zinc-800 space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 rounded-xl">
                                <TrendingUp className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold text-emerald-500">+12.4%</span>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Assets Growth</p>
                            <h4 className="text-lg font-bold text-federalblue-900 dark:text-white">Portfolio</h4>
                        </div>
                    </div>
                    <div className="p-5 glass-card rounded-3xl border border-slate-100 dark:border-zinc-800 space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg- federalgold-50 dark:bg-federalgold-950/40 text-federalgold-600 rounded-xl">
                                <ArrowDownRight className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold text-federalgold-500">-8.2%</span>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Burn Rate</p>
                            <h4 className="text-lg font-bold text-federalblue-900 dark:text-white">Spending</h4>
                        </div>
                    </div>
                </div >

                {/* --- AI Insight: Anomaly Detected --- */}
                < div className="p-6 bg-amber-50 dark:bg-amber-950/20 rounded-[2rem] border border-amber-100 dark:border-amber-900/30 space-y-4" >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-amber-900 dark:text-amber-100">Anomaly Analysis</h4>
                            <p className="text-[10px] text-amber-700 dark:text-amber-400 opacity-80">Unusual spend at London Club</p>
                        </div>
                    </div>
                    <p className="text-xs text-amber-800 dark:text-amber-200/70 leading-relaxed italic">
                        "I noticed a transaction of **₹24,500** which deviated from your typical travel pattern. Would you like to flag this or protect your account?"
                    </p>
                    <div className="flex gap-2 pt-2">
                        <button onClick={() => onAction('Investigate')} className="flex-1 py-3 bg-amber-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-amber-200 dark:shadow-none">Investigate</button>
                        <button onClick={() => onAction('Dismiss')} className="flex-1 py-3 bg-white dark:bg-zinc-900 text-amber-600 border border-amber-200 dark:border-amber-800/50 rounded-xl text-[10px] font-bold uppercase tracking-widest">Mark Safe</button>
                    </div>
                </div >

                {/* --- AI Subscription Manager --- */}
                < div className="space-y-4" >
                    <div className="flex justify-between items-end px-2">
                        <h3 className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-[0.2em]">Subscription Optimizer</h3>
                        <Layers className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div
                        onClick={() => onAction('OptimizeSubscriptions')}
                        className="p-6 bg-white dark:bg-zinc-900 rounded-[2rem] border border-slate-100 dark:border-zinc-800 shadow-sm relative overflow-hidden group cursor-pointer spatial-hover"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-federalblue-900/5 rounded-full blur-2xl -mr-8 -mt-8"></div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                <CardIcon className="w-5 h-5 text-federalblue-900 dark:text-federalblue-400" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-federalblue-900 dark:text-white">Active Recurrings</h4>
                                <p className="text-[10px] text-slate-500 dark:text-zinc-400">₹4,250 / month across 8 services</p>
                            </div>
                        </div>
                        <div className="p-3 bg-federalblue-50 dark:bg-federalblue-900/10 rounded-xl flex items-center justify-between">
                            <span className="text-[10px] font-bold text-federalblue-900 dark:text-federalblue-300">Optimization spotted: Cancel Duplicates</span>
                            <button className="text-[10px] font-bold text-federalblue-900 dark:text-federalblue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                                Fix Now <ChevronRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </div >

                {/* --- Automation Quick Link --- */}
                < div
                    onClick={() => onAction('Automation')}
                    className="p-6 bg-federalblue-900 dark:bg-federalblue-900/20 rounded-[2rem] text-white cursor-pointer group spatial-hover"
                >
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div className="p-3 bg-white/10 dark:bg-federalblue-400/20 rounded-2xl group-hover:scale-110 transition-transform">
                                <Settings className="w-6 h-6 text-white dark:text-federalblue-400" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold tracking-tight">Smart Automation</h4>
                                <p className="text-[10px] opacity-60">Manage your Round-ups & Smart SIP</p>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-federalblue-900 transition-all">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </div>
                </div >


            </div >
        </div >
    );
};

const BriefingItem = ({ icon: Icon, color, title, subtitle, action, onAction }: any) => {
    let bgClass = 'bg-slate-100';
    let textClass = 'text-slate-600';

    if (color === 'federalblue') {
        bgClass = 'bg-federalblue-50 dark:bg-federalblue-900/20';
        textClass = 'text-federalblue-900 dark:text-federalblue-400';
    } else if (color === 'emerald') {
        bgClass = 'bg-emerald-50 dark:bg-emerald-950/20';
        textClass = 'text-emerald-700 dark:text-emerald-400';
    } else if (color === 'federalgold') {
        bgClass = 'bg-federalgold-50 dark:bg-federalgold-950/20';
        textClass = 'text-federalgold-600 dark:text-federalgold-400';
    }

    return (
        <div onClick={onAction} className="flex gap-4 p-5 bg-white dark:bg-zinc-900/50 rounded-3xl border border-slate-100 dark:border-zinc-800/50 hover:border-federalblue-200 dark:hover:border-federalblue-800 transition-all group cursor-pointer active:scale-95 shadow-sm">
            <div className={`mt-0.5 p-2.5 ${bgClass} rounded-2xl transition-transform group-hover:scale-110`}>
                <Icon className={`w-5 h-5 ${textClass}`} />
            </div>
            <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-federalblue-900 dark:text-white">{title}</h4>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-zinc-400 leading-tight">{subtitle}</p>
                <div className="pt-2">
                    <div className="text-[9px] font-bold text-federalblue-900 dark:text-federalblue-400 uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                        {action} <ChevronRight className="w-2.5 h-2.5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OracleBriefHub;
