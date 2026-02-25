import React, { useState } from 'react';
import {
    ArrowLeft,
    ChevronRight,
    Home,
    Car,
    User,
    Briefcase,
    Coins,
    PieChart,
    FileText,
    CheckCircle2,
    Info,
    ShieldCheck,
    Zap,
    Plane
} from 'lucide-react';

interface ActiveTravelLoan {
    amount: number;
    emi: number;
    tenure: number;
    rate: number;
    destination?: string;
}

interface LoansHubProps {
    onBack: () => void;
    onApplyLoan: (type: string, amount: number) => void;
    isDarkMode: boolean;
    festival: 'DEFAULT' | 'DIWALI' | 'HOLI';
    activeTravelLoan?: ActiveTravelLoan | null;
    persona?: any;
}

const LoansHub: React.FC<LoansHubProps> = ({ onBack, onApplyLoan, isDarkMode, festival, activeTravelLoan, persona }) => {
    const [view, setView] = useState<'MAIN' | 'APPLY_LOAN' | 'SUCCESS'>('MAIN');
    const [loanType, setLoanType] = useState<string | null>(null);
    const [loanAmount, setLoanAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loanCategories = [
        { id: 'PERSONAL', name: 'Personal Loan', icon: User, rate: '10.5%', desc: 'For lifestyle & needs' },
        { id: 'CAR', name: 'Car Loan', icon: Car, rate: '8.4%', desc: 'Drive your dream car' },
        { id: 'HOME', name: 'Home Loan', icon: Home, rate: '7.2%', desc: 'Lowest-in-market rates' },
        { id: 'BUSINESS', name: 'Business Loan', icon: Briefcase, rate: '12.0%', desc: 'Scale your ambitions' },
        { id: 'GOLD', name: 'Gold Loan', icon: Coins, rate: '9.0%', desc: 'Instant cash vs gold' },
        { id: 'LAS', name: 'Loan vs Shares', icon: PieChart, rate: '10.0%', desc: 'Liquidity vs portfolio' },
    ];

    if (loanType && view === 'APPLY_LOAN') {
        const activeLoan = loanCategories.find(l => l.id === loanType);
        return (
            <div className={`min-h-screen transition-all duration-700 ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-white text-[#333333]'} flex flex-col font-sans`}>
                <div className={`px-6 py-4 flex items-center gap-4 border-b sticky top-0 z-10 ${isDarkMode ? 'bg-zinc-950/90 border-zinc-800 backdrop-blur-md' : 'bg-white border-slate-100'}`}>
                    <button onClick={() => setView('MAIN')} className={`p-2 -ml-2 ${isDarkMode ? 'text-zinc-500 hover:text-white' : 'text-slate-400 hover:text-federalblue-900'} transition-colors`}>
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h2 className="text-sm font-bold text-federalblue-900 uppercase tracking-widest">{activeLoan?.name} Application</h2>
                </div>

                <div className="flex-1 p-6 space-y-8 overflow-y-auto">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Required Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">₹</span>
                                <input
                                    type="number"
                                    placeholder="e.g. 5,00,000"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(e.target.value)}
                                    className="w-full pl-10 p-5 bg-slate-50 border border-slate-200 rounded-2xl text-2xl font-bold text-federalblue-900 outline-none focus:ring-2 focus:ring-federalblue-900 transition-all font-mono"
                                />
                            </div>
                            <p className="text-[10px] text-slate-500 font-medium ml-1">Repayment Tenure: Up to 60 Months</p>
                        </div>

                        <div className="bg-federalblue-50 border border-federalblue-100 rounded-2xl p-4 flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white border border-federalblue-100 flex items-center justify-center text-federalblue-900 shadow-sm">
                                <Zap className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-federalblue-900">Pre-Approved Offer</p>
                                <p className="text-[10px] text-slate-600">You are eligible for instant disbursal up to <span className="font-bold text-federalblue-900">₹12,00,000</span>.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Key Fact Statement (KFS)</h3>
                            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden text-xs">
                                <div className="p-4 space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Interest Rate</span>
                                        <span className="font-bold text-federalblue-900">{activeLoan?.rate} p.a.</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Processing Fee</span>
                                        <span className="font-bold text-federalblue-900">1% + GST</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Estimated EMI</span>
                                        <span className="font-bold text-federalblue-900">₹{(Number(loanAmount) * 0.02 || 0).toLocaleString()}/mo</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-federalblue-900" />
                                        <span className="font-bold text-federalblue-900">View Detailed Schedule</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                            <div className="space-y-0.5">
                                <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Digital Process</p>
                                <p className="text-[10px] text-slate-600">No physical documentation required. E-mandate will be setup for EMI.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white border-t border-slate-100">
                    <button
                        onClick={() => {
                            setIsSubmitting(true);
                            setTimeout(() => {
                                setIsSubmitting(false);
                                setView('SUCCESS');
                                onApplyLoan(activeLoan?.name || 'Loan', Number(loanAmount));
                            }, 2000);
                        }}
                        disabled={!loanAmount || Number(loanAmount) <= 0 || isSubmitting}
                        className="w-full bg-federalblue-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>Apply for Disbursal <ChevronRight className="w-5 h-5" /></>
                        )}
                    </button>
                </div>
            </div>
        );
    }

    if (view === 'SUCCESS') {
        const activeLoan = loanCategories.find(l => l.id === loanType);
        return (
            <div className="min-h-screen bg-federalblue-900 flex flex-col items-center justify-center p-8 text-center text-white space-y-8 animate-in fade-in duration-500">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                </div>
                <div className="space-y-3">
                    <h2 className="text-3xl font-black italic tracking-tighter uppercase">Disbursed!</h2>
                    <p className="text-federalblue-100 text-sm max-w-xs mx-auto leading-relaxed">
                        Your {activeLoan?.name} of ₹{Number(loanAmount).toLocaleString()} has been approved and moved to your savings account.
                    </p>
                </div>
                <button
                    onClick={() => setView('MAIN')}
                    className="w-full bg-white text-federalblue-900 py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-2xl mt-12"
                >
                    Back to Loans
                </button>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-all duration-700 ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-slate-50 text-[#333333]'} flex flex-col font-sans ${festival !== 'DEFAULT' ? `theme-festive-${festival.toLowerCase()}` : ''}`}>
            <div className={`px-6 py-4 flex items-center gap-4 border-b sticky top-0 z-10 ${isDarkMode ? 'bg-zinc-950/90 border-zinc-800 backdrop-blur-md' : 'bg-white border-slate-100'}`}>
                <button onClick={onBack} className="p-2 -ml-2 text-slate-400">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-sm font-bold text-federalblue-900 uppercase tracking-widest">Loans & Credit</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div className="bg-federalblue-900 rounded-3xl p-6 text-white space-y-6 shadow-xl relative overflow-hidden">
                    <div className="relative z-10 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Credit Score (Simulated)</span>
                                <h3 className="text-4xl font-black tracking-tighter italic">782</h3>
                            </div>
                            <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-500/20">
                                EXCELLENT
                            </div>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full flex">
                            <div className="h-full w-[80%] bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.5)]" />
                        </div>
                        <p className="text-[10px] opacity-70 leading-relaxed max-w-[80%]">
                            High score unlocks preferential interest rates on Home and Personal loans.
                        </p>
                    </div>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-federalgold-500/5 -mr-16 -mt-16 rounded-full blur-3xl" />
                </div>

                {activeTravelLoan && (
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Active Loans</h3>
                        <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                        <Plane className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-emerald-100 font-bold uppercase tracking-widest">Travel Bridge Loan</p>
                                        <p className="text-lg font-bold text-white">{activeTravelLoan.destination || 'Travel'} Trip</p>
                                    </div>
                                </div>
                                <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className={`text-[10px] uppercase tracking-wider font-bold ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Loan Amount</p>
                                        <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹{activeTravelLoan.amount.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className={`text-[10px] uppercase tracking-wider font-bold ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Monthly EMI</p>
                                        <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹{activeTravelLoan.emi.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className={`text-[10px] uppercase tracking-wider font-bold ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Tenure</p>
                                        <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeTravelLoan.tenure} months</p>
                                    </div>
                                    <div>
                                        <p className={`text-[10px] uppercase tracking-wider font-bold ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Interest Rate</p>
                                        <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeTravelLoan.rate}% p.a.</p>
                                    </div>
                                </div>
                                <div className={`h-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`} />
                                <div className="flex items-center justify-between text-xs">
                                    <span className={isDarkMode ? 'text-zinc-400' : 'text-slate-500'}>Next EMI: 5th April 2026</span>
                                    <span className="text-emerald-600 font-bold">On Track</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Lending Products</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {loanCategories.map((loan) => {
                            const Icon = loan.icon;
                            return (
                                <button
                                    key={loan.id}
                                    onClick={() => {
                                        setLoanType(loan.id);
                                        setView('APPLY_LOAN');
                                    }}
                                    className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 flex justify-between items-center hover:border-federalblue-300 dark:hover:border-federalblue-400 transition-all group shadow-sm"
                                >
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-federalblue-900/40 flex items-center justify-center text-federalblue-900 dark:text-federalblue-400 group-hover:bg-federalblue-50 dark:group-hover:bg-federalblue-800 transition-colors">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm font-bold text-federalblue-900 dark:text-zinc-100">{loan.name}</h4>
                                                <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded uppercase tracking-tighter">from {loan.rate}</span>
                                            </div>
                                            <p className="text-[10px] text-slate-500 dark:text-zinc-400 mt-0.5">{loan.desc}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300 dark:text-zinc-600 group-hover:text-federalblue-900 dark:group-hover:text-federalblue-400 transition-all" />
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-slate-900 rounded-3xl p-6 text-white flex justify-between items-center group cursor-pointer overflow-hidden relative">
                    <div className="relative z-10 space-y-1">
                        <span className="text-[10px] font-bold text-federalgold-400 uppercase tracking-widest leading-none">Flash Credit</span>
                        <h4 className="text-sm font-black italic tracking-tighter">Get ₹25,000 instantly</h4>
                        <p className="text-[9px] opacity-60">Pay back in 3 interest-free EMIs.</p>
                    </div>
                    <button className="relative z-10 bg-white text-slate-900 px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest group-hover:scale-105 active:scale-95 transition-all">
                        Activate
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-r from-federalblue-900/50 to-transparent pointer-events-none" />
                </div>
            </div>
        </div>
    );
};

export default LoansHub;
