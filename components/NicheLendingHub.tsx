import React, { useState } from 'react';
import {
    ArrowLeft,
    Coins,
    Briefcase,
    TrendingUp,
    ChevronRight,
    Info,
    ShieldCheck,
    CheckCircle2,
    Building2,
    FileText,
    Zap
} from 'lucide-react';

interface NicheLendingHubProps {
    onBack: () => void;
    onApplySuccess: (type: string, amount: number) => void;
    isDarkMode: boolean;
    festival: 'DEFAULT' | 'DIWALI' | 'HOLI';
}

const NicheLendingHub: React.FC<NicheLendingHubProps> = ({ onBack, onApplySuccess, isDarkMode, festival }) => {
    const [view, setView] = useState<'SELECTION' | 'GOLD' | 'LAS' | 'BUSINESS' | 'SUCCESS'>('SELECTION');
    const [collateralValue, setCollateralValue] = useState<number>(0);
    const [loanType, setLoanType] = useState<string>('');

    const calculateLimit = (value: number, ltv: number) => {
        return Math.floor(value * ltv);
    };

    const handleApply = (type: string, amount: number) => {
        setLoanType(type);
        setView('SUCCESS');
        setTimeout(() => {
            onApplySuccess(type, amount);
        }, 3000);
    };

    if (view === 'SUCCESS') {
        return (
            <div className={`min-h-screen transition-all duration-700 ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-white text-[#333333]'} flex flex-col items-center justify-center p-8 text-center space-y-6`}>
                <div className={`w-20 h-20 ${isDarkMode ? 'bg-emerald-950/40' : 'bg-emerald-50'} rounded-full flex items-center justify-center animate-bounce`}>
                    <CheckCircle2 className={`w-10 h-10 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-500'}`} />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-federalblue-900">Application Submitted!</h2>
                    <p className="text-sm text-slate-500">
                        Your <strong>{loanType}</strong> application reference #FED{Math.floor(Math.random() * 90000) + 10000} is initiated.
                    </p>
                </div>
                <div className="bg-federalblue-50 p-4 rounded-xl border border-federalblue-100 w-full">
                    <p className="text-xs text-federalblue-800 font-medium">
                        {loanType === 'Gold Loan'
                            ? "Please visit your home branch with the gold for physical appraisal and instant disbursal."
                            : "Lien-marking request sent to NSDL/CDSL. Disbursal usually happens within 4 hours."}
                    </p>
                </div>
                <button
                    onClick={onBack}
                    className="w-full py-4 bg-federalblue-900 text-white font-bold rounded-xl shadow-lg"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-all duration-700 ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-slate-50 text-[#333333]'} flex flex-col font-sans ${festival !== 'DEFAULT' ? `theme-festive-${festival.toLowerCase()}` : ''}`}>
            <div className={`px-6 py-4 flex items-center gap-4 border-b sticky top-0 z-10 ${isDarkMode ? 'bg-zinc-950/90 border-zinc-800 backdrop-blur-md' : 'bg-white border-slate-100'}`}>
                <button onClick={view === 'SELECTION' ? onBack : () => setView('SELECTION')} className={`p-2 -ml-2 ${isDarkMode ? 'text-zinc-500 hover:text-white' : 'text-slate-400 hover:text-federalblue-900'} transition-colors`}>
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-sm font-bold text-federalblue-900 dark:text-federalblue-400 uppercase tracking-widest">
                    {view === 'SELECTION' ? 'Niche Lending Hub' : view + ' LOAN'}
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {view === 'SELECTION' && (
                    <>
                        <div className="bg-gradient-to-br from-federalblue-900 to-federalblue-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                            <div className="relative z-10 space-y-1">
                                <p className="text-xs font-medium opacity-80 uppercase tracking-wider">Asset Backed Credit</p>
                                <h3 className="text-2xl font-bold">Unlocking Hidden Capital</h3>
                                <p className="text-[11px] opacity-70 max-w-[200px] mt-2">Get instant liquidity against your gold, shares, or business receivables at the lowest rates.</p>
                            </div>
                            <Zap className="absolute right-[-10px] bottom-[-10px] w-32 h-32 text-white/10" />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Product</h3>

                            {/* Gold Loan */}
                            <div onClick={() => setView('GOLD')} className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 flex items-center gap-4 cursor-pointer hover:border-federalgold-300 dark:hover:border-federalgold-400 transition-colors group">
                                <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-500 dark:text-orange-400 flex items-center justify-center">
                                    <Coins className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-[14px] font-bold text-federalblue-900 dark:text-zinc-100">Gold Loan</h4>
                                    <p className="text-[10px] text-slate-500 dark:text-zinc-400">Instant Cash @ 8.25% p.a.</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300 dark:text-zinc-600 group-hover:translate-x-1 transition-transform" />
                            </div>

                            {/* LAS */}
                            <div onClick={() => setView('LAS')} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 cursor-pointer hover:border-federalgold-300 transition-colors group">
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-[14px] font-bold text-federalblue-900">Loan Against Shares</h4>
                                    <p className="text-[10px] text-slate-500">Leverage your Portfolio @ 9.50%</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
                            </div>

                            {/* Business Loan */}
                            <div onClick={() => setView('BUSINESS')} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 cursor-pointer hover:border-federalgold-300 transition-colors group">
                                <div className="w-12 h-12 rounded-xl bg-federalblue-50 text-federalblue-600 flex items-center justify-center">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-[14px] font-bold text-federalblue-900">MSME/Business Loan</h4>
                                    <p className="text-[10px] text-slate-500">Unsecured Credit for Growth</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </>
                )}

                {view === 'GOLD' && (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Collateral Estimation</label>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-[10px] text-slate-400 block mb-1">Estimated Gold Weight (gms)</span>
                                    <input
                                        type="number"
                                        placeholder="e.g. 50"
                                        className="w-full text-2xl font-bold text-federalblue-900 focus:outline-none"
                                        onChange={(e) => setCollateralValue(Number(e.target.value) * 5500)} // Mock rate 5500/gm
                                    />
                                </div>
                                <div className="pt-4 border-t border-slate-50 flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] text-slate-400">Eligible Sanction (75% LTV)</p>
                                        <h4 className="text-xl font-bold text-federalblue-900">₹{calculateLimit(collateralValue, 0.75).toLocaleString()}</h4>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-400">Interest Rate</p>
                                        <p className="font-bold text-emerald-600">8.25% p.a.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-federalgold-50 p-4 rounded-xl border border-federalgold-100 flex gap-3">
                            <Info className="w-5 h-5 text-federalgold-600 shrink-0" />
                            <p className="text-[10px] text-federalgold-800 leading-relaxed font-medium">
                                <strong>Physical Appraisal Required:</strong> Final sanction depends on the purity and net weight as assessed by our certified valuer at the branch.
                            </p>
                        </div>

                        <button
                            disabled={collateralValue <= 0}
                            onClick={() => handleApply('Gold Loan', calculateLimit(collateralValue, 0.75))}
                            className="w-full py-4 bg-federalblue-900 text-white font-bold rounded-xl shadow-lg disabled:opacity-50"
                        >
                            Initiate Application
                        </button>
                    </div>
                )}

                {view === 'LAS' && (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Holdings Summary</label>
                                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">NSDL Linked</span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                                    <span className="text-xs font-bold text-slate-700">RELIANCE IND</span>
                                    <span className="text-xs font-mono text-slate-500">50 Units @ ₹2,940</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                                    <span className="text-xs font-bold text-slate-700">HDFC BANK</span>
                                    <span className="text-xs font-mono text-slate-500">120 Units @ ₹1,420</span>
                                </div>
                                <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-900">Total Portfolio Value</span>
                                    <span className="text-lg font-bold text-federalblue-900">₹3,17,400</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-federalblue-50/50 p-6 rounded-2xl border border-federalblue-100 space-y-4">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Max Overdraft Limit (50% LTV)</p>
                                    <h4 className="text-2xl font-bold text-federalblue-900">₹1,58,700</h4>
                                </div>
                                <ShieldCheck className="w-10 h-10 text-federalblue-200" />
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-federalblue-100">
                                <input type="checkbox" className="rounded" />
                                <span className="text-[10px] text-slate-600 font-medium">I authorize Digital Lien-Marking of selected stocks.</span>
                            </div>
                        </div>

                        <button
                            onClick={() => handleApply('Loan Against Shares', 158700)}
                            className="w-full py-4 bg-federalblue-900 text-white font-bold rounded-xl shadow-lg"
                        >
                            Activate Overdraft
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NicheLendingHub;
