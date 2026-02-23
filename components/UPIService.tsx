import React, { useState, useEffect } from 'react';
import {
    ArrowLeft, Smartphone, CheckCircle2, ChevronRight,
    Search, User, DollarSign, Wallet, ShieldCheck,
    Zap, Clock, History, QrCode, Plus, ArrowRight, X, Sparkles
} from 'lucide-react';

interface UPIServiceProps {
    onBack: () => void;
    currentBalance: number;
    isDarkMode: boolean;
    festival: 'DEFAULT' | 'DIWALI' | 'HOLI';
}

type UPIView = 'LANDING' | 'CREATE_ID' | 'PAY_ID' | 'PAY_SCAN' | 'PAYING' | 'SUCCESS';

const UPIService: React.FC<UPIServiceProps> = ({ onBack, currentBalance, isDarkMode, festival }) => {
    const [view, setView] = useState<UPIView>('LANDING');
    const [upiId, setUpiId] = useState<string | null>(null);
    const [targetId, setTargetId] = useState('');
    const [amount, setAmount] = useState('');
    const [searching, setSearching] = useState(false);
    const [successData, setSuccessData] = useState<any>(null);
    const [showQR, setShowQR] = useState(false);

    const handleCreateId = () => {
        setUpiId('advait@federal');
        setView('LANDING');
    };

    const handleStartPayment = () => {
        if (!targetId || !amount) return;
        setView('PAYING');
        setTimeout(() => {
            setSuccessData({
                to: targetId.includes('@') ? targetId : `${targetId}@upi`,
                amount: parseFloat(amount),
                ref: `FED${Math.floor(Math.random() * 1000000000)}`,
                date: new Date().toLocaleString()
            });
            setView('SUCCESS');
        }, 2000);
    };

    const renderLanding = () => (
        <div className="p-6 space-y-8 animate-in slide-in-from-bottom-5 duration-500">
            {/* UPI Status Card */}
            {!upiId ? (
                <div onClick={() => setView('CREATE_ID')} className="bg-federalblue-900 rounded-[2.5rem] p-8 text-white space-y-6 relative overflow-hidden cursor-pointer group shadow-hero">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <Plus className="w-6 h-6" />
                        </div>
                        <Smartphone className="w-6 h-6 text-federalgold-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Create your UPI ID</h3>
                        <p className="text-sm text-white/50 mt-1">Send & receive money instantly via @federal</p>
                    </div>
                    <div className="flex items-center gap-2 text-federalgold-400">
                        <span className="text-xs font-bold uppercase tracking-widest">Get Started</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            ) : (
                <div className="glass-card rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden border-t-white/90 dark:border-t-white/10 shadow-apple-lg">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-federalblue-50 dark:bg-white/5 text-federalblue-900 dark:text-federalblue-400 rounded-2xl flex items-center justify-center">
                            <Smartphone className="w-6 h-6" />
                        </div>
                        <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-800/20 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[10px] font-bold uppercase tracking-widest">UPI Active</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Your ID</p>
                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">{upiId}</h3>
                    </div>

                    {showQR && (
                        <div className="flex justify-center py-4 animate-in zoom-in-95 duration-300">
                            {/* Mock QR using CSS Grid for a stable visual without external image deps */}
                            <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-slate-100 dark:border-zinc-800">
                                <div className="grid grid-cols-4 grid-rows-4 gap-1 w-32 h-32">
                                    {Array.from({ length: 16 }).map((_, i) => (
                                        <div key={i} className={`bg-zinc-900 ${[0, 3, 12, 15].includes(i) ? 'rounded-lg border-4 border-zinc-900 bg-white' : Math.random() > 0.5 ? 'bg-zinc-900' : 'bg-transparent'}`}>
                                            {[0, 3, 12, 15].includes(i) && <div className="w-full h-full bg-zinc-900 rounded-sm scale-50"></div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <button onClick={() => setShowQR(!showQR)} className="flex-1 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-xs font-bold shadow-lg transition-transform active:scale-95">
                            {showQR ? 'Hide QR' : 'Show QR'}
                        </button>
                        <button className="p-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-xl hover:text-federalblue-900 transition-colors"><History className="w-5 h-5" /></button>
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setView('PAY_ID')} className="glass-card p-6 rounded-3xl spatial-hover flex flex-col gap-4 text-left border-t-white/90">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center"><User className="w-5 h-5" /></div>
                    <div>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">To UPI ID</h4>
                        <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mt-1">Instant Bank Transfer</p>
                    </div>
                </button>
                <button onClick={() => setView('PAY_SCAN')} className="glass-card p-6 rounded-3xl spatial-hover flex flex-col gap-4 text-left border-t-white/90">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><QrCode className="w-5 h-5" /></div>
                    <div>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Scan QR</h4>
                        <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mt-1">Pay Merchants</p>
                    </div>
                </button>
            </div>

            {/* Recent Payments */}
            <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Recent Payments</h3>
                    <button className="text-[10px] font-bold text-federalblue-900 dark:text-federalblue-400 uppercase tracking-widest">View All</button>
                </div>
                <div className="space-y-3">
                    {[
                        { name: 'Kushal B', id: 'kushal@okaxis', amount: 1200, date: '2h ago' },
                        { name: 'Starbucks BKC', id: 'sbux@paytm', amount: 450, date: 'Yesterday' },
                        { name: 'Amazon India', id: 'amzn@icici', amount: 28430, date: 'Feb 18' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 glass-card rounded-2xl border-t-white/90">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-federalblue-900/5 dark:bg-white/5 flex items-center justify-center text-federalblue-900 dark:text-white font-bold text-xs">
                                    {item.name[0]}
                                </div>
                                <div>
                                    <h5 className="text-sm font-bold text-zinc-900 dark:text-white leading-none mb-1">{item.name}</h5>
                                    <p className="text-[10px] text-zinc-400 font-medium">{item.id}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-zinc-900 dark:text-white">₹{item.amount.toLocaleString()}</p>
                                <p className="text-[10px] text-zinc-400 font-medium">{item.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderCreateId = () => (
        <div className="p-8 space-y-12 animate-in slide-in-from-right-4 duration-500 flex flex-col min-h-full">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Claim your Identity</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Choose a unique @federal handle for instant payments.</p>
            </div>

            <div className="space-y-6">
                <div className="relative group">
                    <div className="absolute inset-y-0 right-5 flex items-center text-zinc-400 font-bold group-focus-within:text-federalblue-600 transition-colors">@federal</div>
                    <input
                        type="text"
                        defaultValue="advait"
                        readOnly
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-5 text-lg font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-federalblue-600 transition-all opacity-80"
                    />
                </div>

                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">advait@federal is available.</p>
                </div>
            </div>

            <div className="mt-auto space-y-4">
                <div className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl">
                    <ShieldCheck className="w-5 h-5 text-federalblue-900 dark:text-federalblue-400" />
                    <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">By creating a UPI ID, you agree to the <span className="text-federalblue-900 dark:text-white font-bold underline">Terms of Service</span> and NPCI guidelines.</p>
                </div>
                <button onClick={handleCreateId} className="w-full py-5 bg-federalblue-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl text-sm font-bold shadow-xl active:scale-[0.98]">Confirm & Link Account</button>
            </div>
        </div>
    );

    const renderPayId = () => (
        <div className="p-8 space-y-10 animate-in slide-in-from-right-4 duration-500">
            <div className="space-y-6">
                <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 mb-2">Transfer to</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter UPI ID or Phone"
                            value={targetId}
                            onChange={(e) => setTargetId(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-5 text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-federalblue-600 transition-all"
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-federalblue-600">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 mb-2">Amount</label>
                    <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-light text-zinc-400">₹</span>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-12 pr-6 py-6 text-3xl font-light tabular-nums text-zinc-900 dark:text-white focus:outline-none focus:border-federalblue-600 transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-federalblue-50 dark:bg-federalblue-900/20 p-5 rounded-2xl border border-federalblue-100 dark:border-federalblue-800/20 space-y-2">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">From Primary Account</span>
                    <span className="text-federalblue-900 dark:text-white font-bold">₹{currentBalance.toLocaleString()}</span>
                </div>
                <div className="w-full h-1 bg-federalblue-100 dark:bg-federalblue-800/30 rounded-full overflow-hidden">
                    <div className="h-full bg-federalblue-600 w-1/3"></div>
                </div>
            </div>

            <button
                onClick={handleStartPayment}
                disabled={!targetId || !amount}
                className="w-full py-5 bg-federalblue-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl text-sm font-bold shadow-xl disabled:opacity-50 transition-all active:scale-[0.98]"
            >
                Secure Payment Entry
            </button>
        </div>
    );

    const renderPayScan = () => (
        <div className="absolute inset-0 z-[100] bg-black animate-in fade-in duration-300 flex flex-col pt-safe">
            <div className="px-6 py-4 flex items-center justify-between border-b-none text-white absolute top-0 w-full z-10 pt-safe-top">
                <button onClick={() => setView('LANDING')} className="p-2 -ml-2 text-white/70 hover:text-white transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5" />
                    <span className="text-sm font-bold tracking-widest uppercase">Scan QR</span>
                </div>
                <div className="w-10"></div>
            </div>

            {/* Simulated Viewfinder */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-0"></div>
                <div className="absolute inset-0 border-8 border-transparent rounded-[3rem] z-10 pointers-events-none"></div>

                {/* Scanner Frame */}
                <div className="relative z-20 w-64 h-64 border-2 border-white/20 rounded-3xl overflow-hidden shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] backdrop-blur-sm">
                    {/* Corner Markers */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-3xl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-3xl"></div>

                    {/* Scanning Laser */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-400 animate-scan-laser shadow-[0_0_20px_#34d399,0_0_8px_#34d399]"></div>

                    {/* Center Reticle */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <QrCode className="w-12 h-12 text-white" />
                    </div>
                </div>

                <div className="absolute bottom-32 z-20 text-center w-full px-8">
                    <p className="text-white/80 text-sm font-medium mb-8">Align QR code within the frame to scan.</p>
                    <button
                        onClick={() => { setTargetId('merchant@paytm'); setView('PAY_ID'); }}
                        className="py-4 px-8 bg-white text-black rounded-full font-bold shadow-xl flex items-center gap-2 mx-auto active:scale-95 transition-transform"
                    >
                        <Sparkles className="w-4 h-4" /> Simulate Successful Scan
                    </button>
                </div>
            </div>
        </div>
    );

    const renderPaying = () => (
        <div className="flex flex-col items-center justify-center p-12 space-y-8 animate-in zoom-in-95 duration-500 text-center min-h-[400px]">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-zinc-100 dark:border-zinc-900 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-federalblue-900 dark:border-white rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-federalblue-900 dark:text-white" />
                </div>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Authorizing Payment</h3>
                <p className="text-sm text-zinc-500">Securing your transaction with multi-layer encryption...</p>
            </div>
        </div>
    );

    const renderSuccess = () => (
        <div className="p-8 space-y-8 animate-in slide-in-from-bottom-5 duration-500 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-1">
                <h2 className="text-4xl font-light text-zinc-900 dark:text-white tabular-nums">₹{successData?.amount.toLocaleString()}</h2>
                <p className="text-sm font-bold text-emerald-600 flex items-center justify-center gap-2 uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4" /> Paid Successfully
                </p>
            </div>

            <div className="w-full p-6 glass-card rounded-3xl border-t-white/90 dark:border-t-white/10 space-y-4 text-left">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">Paid To</span>
                    <span className="text-zinc-900 dark:text-white font-bold">{successData?.to}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">Date & Time</span>
                    <span className="text-zinc-900 dark:text-white font-bold">{successData?.date}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">Ref ID</span>
                    <span className="text-zinc-900 dark:text-white font-bold font-mono">{successData?.ref}</span>
                </div>
            </div>

            <div className="p-4 bg-federalblue-50 dark:bg-federalblue-900/20 rounded-2xl border border-federalblue-100 dark:border-federalblue-800/20 flex items-center gap-3 w-full">
                <Sparkles className="w-5 h-5 text-federalblue-900 dark:text-federalblue-400" />
                <p className="text-[11px] text-federalblue-900 dark:text-federalblue-300 font-medium italic">"Great choice! This merchant is part of our Green Rewards program. +12 Points earned."</p>
            </div>

            <button
                onClick={() => setView('LANDING')}
                className="w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl text-sm font-bold shadow-lg"
            >
                Return to UPI Hub
            </button>
        </div>
    );

    return (
        <div className={`min-h-screen transition-all duration-700 font-sans flex flex-col pt-safe overflow-hidden ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-white text-[#333333]'} ${festival !== 'DEFAULT' ? `theme-festive-${festival.toLowerCase()}` : ''}`}>
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
                <button
                    onClick={view === 'LANDING' ? onBack : () => setView('LANDING')}
                    className="p-2 -ml-2 text-zinc-400 hover:text-federalblue-900 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-bold tracking-widest uppercase">Federal UPI</span>
                </div>
                <div className="w-10"></div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {view === 'LANDING' && renderLanding()}
                {view === 'CREATE_ID' && renderCreateId()}
                {view === 'PAY_ID' && renderPayId()}
                {view === 'PAY_SCAN' && renderPayId()}
                {view === 'PAYING' && renderPaying()}
                {view === 'SUCCESS' && renderSuccess()}
            </div>
        </div>
    );
};

export default UPIService;
