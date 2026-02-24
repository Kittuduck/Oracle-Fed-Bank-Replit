import React, { useState } from 'react';
import {
    ArrowLeft,
    TrendingUp,
    Plus,
    ChevronRight,
    Clock,
    Target,
    PieChart,
    BarChart3,
    ArrowUpRight,
    ShieldCheck,
    Info,
    CheckCircle2
} from 'lucide-react';

interface InvestmentsHubProps {
    onBack: () => void;
    onBookFD: (amount: number) => void;
    onViewPortfolio: () => void;
    currentBalance: number;
    isDarkMode: boolean;
    festival: 'DEFAULT' | 'DIWALI' | 'HOLI';
}

const InvestmentsHub: React.FC<InvestmentsHubProps> = ({ onBack, onBookFD, onViewPortfolio, currentBalance, isDarkMode, festival }) => {
    const [view, setView] = useState<'MAIN' | 'BOOK_FD' | 'SUCCESS'>('MAIN');
    const [fdAmount, setFdAmount] = useState('');
    const [duration, setDuration] = useState('12'); // months
    const [isProcessing, setIsProcessing] = useState(false);

    const fdRates = [
        { months: '6', rate: '6.5%' },
        { months: '12', rate: '7.5%' },
        { months: '24', rate: '7.8%' },
        { months: '36', rate: '8.1%' },
    ];

    if (view === 'BOOK_FD') {
        return (
            <div className={`min-h-screen transition-all duration-700 ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-white text-[#333333]'} flex flex-col font-sans`}>
                <div className={`px-6 py-4 flex items-center justify-between border-b sticky top-0 z-10 ${isDarkMode ? 'bg-zinc-950/90 border-zinc-800 backdrop-blur-md' : 'bg-white border-slate-100'}`}>
                    <button onClick={() => setView('MAIN')} className="p-2 -ml-2 text-slate-400">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h2 className="text-sm font-bold text-federalblue-900 uppercase tracking-widest">Book Fixed Deposit</h2>
                    <div className="w-10" />
                </div>

                <div className="flex-1 p-6 space-y-8 overflow-y-auto">
                    <div className="bg-federalblue-900 rounded-3xl p-6 text-white space-y-4 shadow-xl">
                        <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Available Balance</span>
                        <h3 className="text-3xl font-bold">₹{currentBalance.toLocaleString()}</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Investment Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">₹</span>
                                <input
                                    type="number"
                                    placeholder="Enter Amount"
                                    value={fdAmount}
                                    onChange={(e) => setFdAmount(e.target.value)}
                                    className="w-full pl-10 p-5 bg-slate-50 border border-slate-200 rounded-2xl text-2xl font-bold text-federalblue-900 outline-none focus:ring-2 focus:ring-federalblue-900 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tenure (Months)</label>
                            <div className="grid grid-cols-4 gap-2">
                                {fdRates.map((item) => (
                                    <button
                                        key={item.months}
                                        onClick={() => setDuration(item.months)}
                                        className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${duration === item.months ? 'bg-federalblue-900 border-federalblue-900 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-600'}`}
                                    >
                                        <span className="text-sm font-bold">{item.months}m</span>
                                        <span className={`text-[9px] ${duration === item.months ? 'text-federalgold-300' : 'text-emerald-600'} font-bold`}>{item.rate}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-600">Maturity Amount</span>
                                <span className="text-sm font-bold text-emerald-700">₹{(Number(fdAmount) * 1.075 || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-emerald-100 pt-2">
                                <span className="text-xs text-slate-600">Interest Earned</span>
                                <span className="text-sm font-bold text-emerald-700">₹{(Number(fdAmount) * 0.075 || 0).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                                Premature withdrawal is allowed subject to a 1% penalty on the applicable rate of interest. TDS is applicable as per Income Tax rules.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white border-t border-slate-100">
                    <button
                        onClick={() => {
                            setIsProcessing(true);
                            setTimeout(() => {
                                setIsProcessing(false);
                                setView('SUCCESS');
                                onBookFD(Number(fdAmount));
                            }, 2000);
                        }}
                        disabled={!fdAmount || Number(fdAmount) <= 0 || isProcessing}
                        className="w-full bg-federalblue-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {isProcessing ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>Confirm Investment <ArrowUpRight className="w-5 h-5" /></>
                        )}
                    </button>
                </div>
            </div>
        );
    }

    if (view === 'SUCCESS') {
        return (
            <div className="min-h-screen bg-federalblue-900 flex flex-col items-center justify-center p-8 text-center text-white space-y-8 animate-in fade-in duration-500">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-black italic tracking-tighter uppercase">FD Booked!</h2>
                    <p className="text-federalblue-100 text-sm max-w-xs mx-auto">
                        Your Fixed Deposit of ₹{Number(fdAmount).toLocaleString()} for {duration} months has been generated successfully.
                    </p>
                </div>
                <button
                    onClick={() => setView('MAIN')}
                    className="w-full bg-white text-federalblue-900 py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-2xl mt-8"
                >
                    View Portfolio
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
                <h2 className="text-sm font-bold text-federalblue-900 uppercase tracking-widest">Investments & Wealth</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 pb-32 space-y-8">
                {/* Wealth Overview Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-federal border border-slate-100 dark:border-zinc-800 space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Net Investment Value</span>
                            <h3 className="text-2xl font-bold text-federalblue-900 dark:text-white">₹1,24,50,000</h3>
                        </div>
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> +12.4%
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1 h-3 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                            <div className="w-[40%] h-full bg-federalblue-900" />
                            <div className="w-[30%] h-full bg-federalgold-500" />
                            <div className="w-[20%] h-full bg-emerald-500" />
                            <div className="w-[10%] h-full bg-slate-300 dark:bg-zinc-600" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-federalblue-900" />
                            <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase">Mutual Funds</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-federalgold-500" />
                            <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase">Fixed Deposits</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setView('BOOK_FD')}
                        className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col gap-3 hover:border-federalblue-300 transition-all text-left group"
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${isDarkMode ? 'bg-zinc-800 text-federalblue-400' : 'bg-federalblue-50 text-federalblue-900'}`}>
                            <Plus className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-[11px] font-bold text-federalblue-900 dark:text-zinc-100 uppercase tracking-widest leading-none">Open FD</span>
                            <p className="text-[9px] text-slate-500 dark:text-zinc-400 mt-1">Earn up to 8.1% p.a.</p>
                        </div>
                    </button>
                    <button className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col gap-3 hover:border-federalblue-300 transition-all text-left group">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${isDarkMode ? 'bg-zinc-800 text-federalgold-400' : 'bg-federalgold-50 text-federalgold-600'}`}>
                            <PieChart className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-[11px] font-bold text-federalblue-900 dark:text-zinc-100 uppercase tracking-widest leading-none">Invest MF</span>
                            <p className="text-[9px] text-slate-500 dark:text-zinc-400 mt-1">Top-rated Equity Funds</p>
                        </div>
                    </button>
                </div>

                {/* Investment List */}
                <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Current Holdings</h3>
                    <div className="space-y-3">
                        <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 flex justify-between items-center group cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800/60 transition-colors">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-zinc-800 flex items-center justify-center text-federalblue-900 dark:text-federalblue-400">
                                    <BarChart3 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-federalblue-900 dark:text-zinc-100">Equity Bluechip Fund</h4>
                                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest mt-0.5">+14.2% Return</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300 dark:text-zinc-600 group-hover:text-federalblue-900 dark:group-hover:text-federalblue-400 transition-colors" />
                        </div>
                        <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 flex justify-between items-center group cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800/60 transition-colors">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-zinc-800 flex items-center justify-center text-federalblue-900 dark:text-federalblue-400">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-federalblue-900 dark:text-zinc-100">Fixed Deposit (3Y)</h4>
                                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Expires Oct 2026</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300 dark:text-zinc-600 group-hover:text-federalblue-900 dark:group-hover:text-federalblue-400 transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Wealth Insights */}
                <div className={`rounded-3xl p-6 relative overflow-hidden group cursor-pointer ${isDarkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-federalblue-50 border border-federalblue-100'}`}>
                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-federalblue-900 dark:text-federalblue-400" />
                            <span className="text-[10px] font-black text-federalblue-900 dark:text-federalblue-300 uppercase tracking-widest">Portfolio Health</span>
                        </div>
                        <p className="text-sm font-bold text-federalblue-900 dark:text-zinc-200 leading-tight">Your portfolio is well-diversified. Consider hedging with <span className="text-federalgold-600 dark:text-federalgold-400 underline">Gold Mutual Funds</span>.</p>
                        <button className="text-[10px] font-black text-federalblue-900 bg-white px-3 py-1.5 rounded-full shadow-sm hover:translate-x-1 transition-transform flex items-center gap-1 uppercase tracking-widest">
                            Analyze Mix <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-federalgold-500/10 -mr-8 -mt-8 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
                </div>

                {/* View Full Portfolio Button */}
                <button
                    onClick={onViewPortfolio}
                    className="w-full bg-federalblue-900 dark:bg-federalblue-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-federalblue-800 dark:hover:bg-federalblue-700 transition-colors"
                >
                    View Stocks and Mutual Funds <ArrowUpRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default InvestmentsHub;
