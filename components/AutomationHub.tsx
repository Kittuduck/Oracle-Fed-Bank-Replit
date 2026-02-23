import React, { useState } from 'react';
import {
    Zap,
    ShieldCheck,
    ChevronRight,
    RefreshCw,
    Target,
    ArrowRight,
    LayoutGrid,
    CheckCircle2,
    Lock,
    Settings,
    Info
} from 'lucide-react';

interface AutomationHubProps {
    isDarkMode: boolean;
    onBack: () => void;
}

const AutomationHub: React.FC<AutomationHubProps> = ({ isDarkMode, onBack }) => {
    const [rules, setRules] = useState([
        { id: 'roundup', name: 'Smart Round-ups', desc: 'Round up to nearest ₹50 and save the difference.', active: true, icon: RefreshCw, color: 'text-federalblue-900', bg: 'bg-federalblue-50' },
        { id: 'sip', name: 'AI Smart SIP', desc: 'Auto-boost SIP when liquidity > ₹10L.', active: false, icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { id: 'anomaly', name: 'Price Hike Guard', desc: 'Flag recurring bills that increase by > 5%.', active: true, icon: ShieldCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
        { id: 'tax', name: 'Tax Optimizer', desc: 'Auto-allocation to ELSS at quarter end.', active: false, icon: Zap, color: 'text-indigo-600', bg: 'bg-indigo-50' }
    ]);

    const toggleRule = (id: string) => {
        setRules(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
    };

    return (
        <div className={`flex flex-col h-full bg-white dark:bg-[#0b0c10] transition-all duration-700 ${isDarkMode ? 'dark' : ''}`}>
            <nav className="p-6 flex justify-between items-center border-b border-slate-100 dark:border-zinc-800">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-federalblue-900 rounded-full transition-all">
                        <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <div>
                        <h2 className="text-lg font-bold text-federalblue-900 dark:text-white">Automation Hub</h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Powered by Oracle AI</p>
                    </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-federalblue-900 transition-colors">
                    <Settings className="w-5 h-5" />
                </button>
            </nav>

            <div className="flex-1 overflow-y-auto p-6 pb-32 space-y-8">
                {/* --- Hero: Efficiency Score --- */}
                <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-900 to-federalblue-900 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">Banking Efficiency</h3>
                            <p className="text-4xl font-light">94<span className="text-xl opacity-60">%</span></p>
                        </div>
                        <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-emerald-400 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-emerald-400" />
                        </div>
                    </div>
                </div>

                {/* --- Active Rules Section --- */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end px-2">
                        <h3 className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-[0.2em]">Configured Rules</h3>
                        <p className="text-[10px] font-bold text-federalblue-900 dark:text-federalblue-400 underline cursor-pointer">View History</p>
                    </div>

                    <div className="space-y-3">
                        {rules.map((rule) => (
                            <div
                                key={rule.id}
                                className={`p-5 rounded-3xl border transition-all duration-300 flex items-center gap-4 ${rule.active
                                    ? 'bg-white dark:bg-zinc-900/50 border-federalblue-100 dark:border-federalblue-900/40 shadow-sm'
                                    : 'bg-slate-50/50 dark:bg-zinc-950/20 border-slate-100 dark:border-zinc-900 opacity-60'}`}
                            >
                                <div className={`p-3 rounded-2xl ${rule.bg} dark:bg-zinc-800 ${rule.color}`}>
                                    <rule.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 space-y-0.5">
                                    <h4 className="text-sm font-bold text-federalblue-900 dark:text-white">{rule.name}</h4>
                                    <p className="text-[10px] text-slate-500 dark:text-zinc-400 leading-tight">{rule.desc}</p>
                                </div>
                                <button
                                    onClick={() => toggleRule(rule.id)}
                                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${rule.active ? 'bg-emerald-500' : 'bg-slate-300'}`}
                                >
                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${rule.active ? 'translate-x-6' : ''}`}></div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Suggested Rule Box --- */}
                <div className="p-6 bg-federalgold-50 dark:bg-federalgold-950/20 rounded-[2rem] border border-federalgold-200 dark:border-federalgold-900/30 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white dark:bg-zinc-900 rounded-xl text-federalgold-600">
                            <Info className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-bold text-federalgold-900 dark:text-federalgold-100 uppercase tracking-widest">New Rule Suggestion</h4>
                    </div>
                    <p className="text-xs text-federalgold-800 dark:text-federalgold-200/70 leading-relaxed italic">
                        "I calculate you could save an additional **₹12,400** monthly by automating transfers to your Retirement Fund on Salary Day. Enable 'Zero-Day SIP'?"
                    </p>
                    <button className="w-full py-4 bg-federalgold-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-federalgold-200/50 dark:shadow-none">Enable Zero-Day SIP</button>
                </div>
            </div>
        </div>
    );
};

export default AutomationHub;
