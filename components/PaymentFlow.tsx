import React, { useState } from 'react';
import {
    ArrowLeft,
    Send,
    Smartphone,
    Search,
    Zap,
    Wifi,
    Tv,
    Droplets,
    CheckCircle2,
    AlertCircle,
    Clock,
    ChevronRight,
    ShieldCheck,
    Fingerprint,
    QrCode
} from 'lucide-react';

interface PaymentFlowProps {
    onBack: () => void;
    onPaymentSuccess: (amount: number) => void;
    currentBalance: number;
    isDarkMode: boolean;
    initialTab?: 'SEND' | 'BILL' | 'SCAN';
}

const PaymentFlow: React.FC<PaymentFlowProps> = ({ onBack, onPaymentSuccess, currentBalance, isDarkMode, initialTab = 'SEND' }) => {
    const [tab, setTab] = useState<'SEND' | 'BILL' | 'SCAN'>(initialTab);
    const [step, setStep] = useState<'IDLE' | 'AMOUNT' | 'VERIFY' | 'SUCCESS'>('IDLE');
    const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
    const [amount, setAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const recipients = [
        { id: 1, name: 'Advait (Self)', account: 'XX8842', initial: 'A', color: 'bg-federalblue-900' },
        { id: 2, name: 'Riya Montessori', account: 'XX1190', initial: 'R', color: 'bg-federalgold-600' },
        { id: 3, name: 'Aditya Birla', account: 'XX5531', initial: 'A', color: 'bg-emerald-600' },
        { id: 4, name: 'Mumbai Electricity', account: 'BPPS', initial: 'M', color: 'bg-slate-600' },
    ];

    const billers = [
        { icon: Zap, name: 'Electricity', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/20' },
        { icon: Smartphone, name: 'Mobile', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20' },
        { icon: Wifi, name: 'Broadband', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/20' },
        { icon: Tv, name: 'DTH', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/20' },
        { icon: Droplets, name: 'Water', color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-950/20' },
    ];

    const handleProcessPayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setStep('SUCCESS');
            onPaymentSuccess(Number(amount));
        }, 2000);
    };

    const renderHeader = () => (
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-0 z-20">
            <button onClick={step === 'IDLE' ? onBack : () => setStep('IDLE')} className="p-2 -ml-2 text-slate-400 dark:text-zinc-500 hover:text-federalblue-900 dark:hover:text-white transition-colors">
                <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-1.5 p-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-[1.25rem] md:min-w-[300px]">
                {(['SEND', 'BILL', 'SCAN'] as const).map((t) => (
                    <button
                        key={t}
                        onClick={() => { setTab(t); setStep('IDLE'); }}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap ${tab === t ? 'bg-federalblue-900 text-white shadow-lg' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'}`}
                    >
                        {t === 'SEND' ? 'Transfer' : t === 'BILL' ? 'Bill Pay' : 'Scan'}
                    </button>
                ))}
            </div>
            <div className="w-10"></div>
        </div>
    );

    if (step === 'SUCCESS') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-federalblue-900 dark:text-white">Payment Successful</h3>
                <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 mb-8">₹{Number(amount).toLocaleString()} sent to {selectedRecipient?.name}</p>

                <div className="w-full bg-slate-50 dark:bg-zinc-900 rounded-xl p-4 text-left border border-slate-100 dark:border-zinc-800 space-y-3 mb-8">
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-400 dark:text-zinc-500">Transaction ID</span>
                        <span className="font-mono font-bold text-slate-700 dark:text-zinc-200">FT992817265</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-400 dark:text-zinc-500">Date & Time</span>
                        <span className="font-bold text-slate-700 dark:text-zinc-200">21 Feb 2026, 2:30 PM</span>
                    </div>
                </div>

                <button onClick={onBack} className="w-full py-4 bg-federalblue-900 text-white rounded-xl text-sm font-bold shadow-lg active:scale-95 transition-all">
                    Done
                </button>
            </div>
        );
    }

    const handleAmountSelection = (amt: string) => {
        setAmount(amt);
        setStep('AMOUNT');
    };

    if (step === 'VERIFY') {
        return (
            <div className={`flex flex-col h-full bg-white dark:bg-zinc-950 ${isDarkMode ? 'dark' : ''}`}>
                {renderHeader()}
                <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4">
                    <div className="w-20 h-20 bg-federalblue-50 text-federalblue-900 rounded-full flex items-center justify-center relative">
                        <Fingerprint className="w-10 h-10" />
                        <div className="absolute inset-0 border-2 border-federalblue-900 rounded-full animate-ping opacity-20"></div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-federalblue-900 dark:text-white">Biometric Verification</h3>
                        <p className="text-sm text-slate-500 dark:text-zinc-400">Authorize payment of ₹{Number(amount).toLocaleString()} to {selectedRecipient?.name}</p>
                    </div>

                    <div className="w-full max-w-xs p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">Federal Secure Channel Active</span>
                    </div>

                    <button
                        onClick={handleProcessPayment}
                        disabled={isProcessing}
                        className="w-full py-4 bg-federalblue-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-sm font-bold shadow-lg disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                    >
                        {isProcessing ? (
                            <>
                                <Clock className="w-4 h-4 animate-spin" />
                                Processing Transaction...
                            </>
                        ) : 'Confirm with Biometrics'}
                    </button>
                </div>
            </div>
        );
    }

    if (step === 'AMOUNT') {
        return (
            <div className={`flex flex-col h-full bg-white dark:bg-zinc-950 ${isDarkMode ? 'dark' : ''}`}>
                {renderHeader()}
                <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800">
                        <div className={`w-12 h-12 rounded-full ${selectedRecipient.color} flex items-center justify-center text-white font-bold text-lg shadow-sm font-sans`}>
                            {selectedRecipient.initial}
                        </div>
                        <div>
                            <h4 className="font-bold text-federalblue-900 dark:text-zinc-100">{selectedRecipient.name}</h4>
                            <p className="text-xs text-slate-500 dark:text-zinc-400">{selectedRecipient.account}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Enter Amount</label>
                        <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-federalblue-900 dark:text-federalblue-400">₹</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full bg-white dark:bg-zinc-900 border-2 border-slate-100 dark:border-zinc-800 py-6 pl-14 pr-6 rounded-2xl text-4xl font-bold text-federalblue-900 dark:text-white focus:border-federalblue-900 transition-all outline-none"
                                autoFocus
                            />
                        </div>
                        <div className="flex justify-between items-center px-2">
                            <span className="text-xs text-slate-500">Available: ₹{currentBalance.toLocaleString()}</span>
                            {Number(amount) > currentBalance && (
                                <span className="text-[10px] text-red-500 font-bold uppercase flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> Insufficient Funds
                                </span>
                            )}
                        </div>
                    </div>

                    <button
                        disabled={!amount || Number(amount) <= 0 || Number(amount) > currentBalance}
                        onClick={() => setStep('VERIFY')}
                        className="w-full py-4 bg-federalblue-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-sm font-bold shadow-lg disabled:opacity-50 transition-all active:scale-[0.98]"
                    >
                        Review Payment
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col h-full min-h-screen bg-white dark:bg-zinc-950 ${isDarkMode ? 'dark' : ''} transition-all duration-700`}>
            {renderHeader()}

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-8">
                {tab === 'SEND' ? (
                    <>
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Name, Account, or Mobile"
                                    className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 py-3 pl-12 pr-4 rounded-xl text-sm text-zinc-900 dark:text-white focus:bg-white dark:focus:bg-zinc-800 focus:border-federalblue-200 outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Recent Transfers</h3>
                                <div className="space-y-1">
                                    {recipients.map(r => (
                                        <div
                                            key={r.id}
                                            onClick={() => { setSelectedRecipient(r); setStep('AMOUNT'); }}
                                            className="flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl cursor-pointer transition-colors active:scale-[0.98]"
                                        >
                                            <div className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center text-white font-bold text-sm shadow-sm font-sans`}>
                                                {r.initial}
                                            </div>
                                            <div className="flex-1 text-left">
                                                <h4 className="text-sm font-bold text-federalblue-900 dark:text-zinc-100 leading-tight">{r.name}</h4>
                                                <p className="text-[10px] text-slate-500 dark:text-zinc-400">{r.account}</p>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-zinc-600" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Bill Categories</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {billers.map((b, i) => (
                                <div key={i} className="p-4 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl shadow-sm hover:border-federalblue-200 dark:hover:border-federalblue-700 transition-all cursor-pointer flex flex-col items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${b.bg} ${b.color} flex items-center justify-center`}>
                                        <b.icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-bold text-federalblue-900 dark:text-zinc-100">{b.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-slate-50 dark:bg-zinc-900 rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800 flex flex-col items-center gap-2 text-center">
                            <p className="text-[10px] text-slate-500 dark:text-zinc-500 font-medium">Biller not listed?</p>
                            <button className="text-[10px] font-bold text-federalblue-900 dark:text-white uppercase tracking-widest underline underline-offset-4 decoration-federalgold-500">Register New Biller</button>
                        </div>
                    </div>
                )}
                {tab === 'SCAN' && (
                    <div className="p-6 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="relative aspect-square w-full max-w-sm mx-auto rounded-[3rem] overflow-hidden border-4 border-federalblue-900/20 shadow-2xl group">
                            {/* Mock Camera Feed */}
                            <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center p-12 text-center gap-6">
                                <div className="absolute inset-0 opacity-20">
                                    <div className="h-full w-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                                </div>
                                <div className="relative">
                                    <div className="w-64 h-64 border-2 border-dashed border-federalblue-400/50 rounded-3xl animate-pulse"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <QrCode className="w-16 h-16 text-federalblue-400 opacity-20" />
                                    </div>
                                    {/* Scanning Animation */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-federalblue-400 to-transparent shadow-[0_0_15px_rgba(0,123,255,0.8)] animate-scan"></div>
                                </div>
                                <p className="text-[10px] font-bold text-federalblue-400 uppercase tracking-[0.3em] animate-pulse">Align QR Code to Pay</p>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-8 left-8 w-8 h-8 border-t-4 border-l-4 border-federalblue-400 rounded-tl-xl transition-all group-hover:scale-110"></div>
                            <div className="absolute top-8 right-8 w-8 h-8 border-t-4 border-r-4 border-federalblue-400 rounded-tr-xl transition-all group-hover:scale-110"></div>
                            <div className="absolute bottom-8 left-8 w-8 h-8 border-b-4 border-l-4 border-federalblue-400 rounded-bl-xl transition-all group-hover:scale-110"></div>
                            <div className="absolute bottom-8 right-8 w-8 h-8 border-b-4 border-r-4 border-federalblue-400 rounded-br-xl transition-all group-hover:scale-110"></div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">Or enter manually</h4>
                            <div className="flex gap-3">
                                <button className="flex-1 py-4 glass-card rounded-2xl flex items-center justify-center gap-2 hover:bg-federalblue-50 transition-colors">
                                    <Smartphone className="w-4 h-4 text-federalblue-900" />
                                    <span className="text-xs font-bold text-federalblue-900">Phone Number</span>
                                </button>
                                <button className="flex-1 py-4 glass-card rounded-2xl flex items-center justify-center gap-2 hover:bg-federalblue-50 transition-colors">
                                    <Search className="w-4 h-4 text-federalblue-900" />
                                    <span className="text-xs font-bold text-federalblue-900">UPI ID</span>
                                </button>
                            </div>
                        </div>

                        <div className="p-6 bg-federalblue-900 rounded-[2.5rem] text-white flex items-center justify-between shadow-hero">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h5 className="font-bold text-sm">Secure Merchant Scan</h5>
                                    <p className="text-[10px] opacity-60">Verified by Federal Shield</p>
                                </div>
                            </div>
                            <div className="p-2 border border-white/20 rounded-full">
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentFlow;
