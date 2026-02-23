import React, { useState } from 'react';
import {
    ArrowLeft,
    AlertTriangle,
    ShieldAlert,
    CheckCircle2,
    MessageSquare,
    ChevronRight,
    HandHelping,
    PhoneCall,
    Clock,
    History
} from 'lucide-react';

interface SupportServiceProps {
    onBack: () => void;
    isDarkMode: boolean;
    festival: 'DEFAULT' | 'DIWALI' | 'HOLI';
}

// Define Transaction interface as it's used in this component
interface Transaction {
    id: string;
    merchant: string;
    amount: number;
    date: string;
    type: 'DEBIT' | 'CREDIT';
}

const SupportService: React.FC<SupportServiceProps> = ({ onBack, isDarkMode, festival }) => {
    const [view, setView] = useState<'IDLE' | 'DISPUTE' | 'FRAUD' | 'TICKETS' | 'SUCCESS'>('IDLE');
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
    const [disputeReason, setDisputeReason] = useState('');
    const [toastMsg, setToastMsg] = useState('');

    const showToast = (msg: string) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(''), 3000);
    };

    const transactions: Transaction[] = [
        { id: 't1', merchant: 'Apple Store BKC', amount: 129990, date: 'Today, 10:20 AM', type: 'DEBIT' },
        { id: 't2', merchant: 'Uber India', amount: 450, date: 'Yesterday, 8:45 PM', type: 'DEBIT' },
        { id: 't3', merchant: 'Oracle Dividend', amount: 5200, date: '20 Feb 2026', type: 'CREDIT' },
        { id: 't4', merchant: 'Starbucks Coffee', amount: 320, date: '20 Feb 2026', type: 'DEBIT' },
    ];

    const renderHeader = (title: string) => (
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-0 z-20 transition-colors">
            <button onClick={view === 'IDLE' ? onBack : () => setView('IDLE')} className="p-2 -ml-2 text-slate-400 hover:text-federalblue-900 transition-colors">
                <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-sm font-bold text-federalblue-900 dark:text-zinc-100 uppercase tracking-widest">{title}</h2>
            <div className="w-10"></div>
        </div>
    );

    if (view === 'SUCCESS') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center animate-in zoom-in-95 duration-500 bg-white dark:bg-zinc-950">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-federalblue-900 dark:text-white">Request Registered</h3>
                <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 mb-8">Case ID: #FB-{Math.floor(100000 + Math.random() * 900000)} is active. A compliance officer will review it shortly.</p>
                <button onClick={onBack} className="w-full py-4 bg-federalblue-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-sm font-bold shadow-lg">Done</button>
            </div>
        );
    }

    if (view === 'FRAUD') {
        return (
            <div className={`flex flex-col h-full min-h-screen bg-white dark:bg-zinc-950 transition-all duration-700 ${festival !== 'DEFAULT' ? `theme-festive-${festival.toLowerCase()}` : ''}`}>
                {renderHeader('Report Fraud')}
                <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4">
                    <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 flex flex-col items-center text-center gap-4">
                        <ShieldAlert className="w-12 h-12 text-red-600 dark:text-red-500" />
                        <div className="space-y-1">
                            <h4 className="font-bold text-red-900 dark:text-red-100">Unauthorized Transaction?</h4>
                            <p className="text-xs text-red-700 dark:text-red-400 opacity-80">This will immediately block your card and initiate a fraud investigation.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Select Transaction</h3>
                        <div className="space-y-2">
                            {transactions.filter(t => t.type === 'DEBIT').map(t => (
                                <div key={t.id} onClick={() => setSelectedTx(t)} className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedTx?.id === t.id ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-white dark:bg-zinc-900 border-slate-100 dark:border-zinc-800 hover:border-red-100 dark:hover:border-red-900/50'}`}>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-federalblue-900 dark:text-zinc-100">{t.merchant}</span>
                                        <span className="text-sm font-bold text-red-600 dark:text-red-500">- ₹{t.amount.toLocaleString()}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 dark:text-zinc-400 mt-1">{t.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        disabled={!selectedTx}
                        onClick={() => setView('SUCCESS')}
                        className="w-full py-4 bg-red-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-200 active:scale-95 disabled:opacity-50"
                    >
                        Report & Block Card
                    </button>
                </div>
            </div>
        );
    }

    if (view === 'DISPUTE') {
        return (
            <div className={`flex flex-col h-full min-h-screen bg-white dark:bg-zinc-950 transition-all duration-700 ${festival !== 'DEFAULT' ? `theme-festive-${festival.toLowerCase()}` : ''}`}>
                {renderHeader('Raise Dispute')}
                <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4">
                    <div className="bg-federalblue-50 dark:bg-federalblue-900/20 p-6 rounded-2xl border border-federalblue-100 dark:border-federalblue-900/30 flex flex-col items-center text-center gap-4">
                        <AlertTriangle className="w-12 h-12 text-federalblue-900 dark:text-federalblue-400" />
                        <div className="space-y-1">
                            <h4 className="font-bold text-federalblue-900 dark:text-white">Transaction Issue?</h4>
                            <p className="text-xs text-slate-500 dark:text-zinc-400">Select the transaction you want to dispute and provide a reason.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">1. Select Transaction</h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {transactions.map(t => (
                                <div key={t.id} onClick={() => setSelectedTx(t)} className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedTx?.id === t.id ? 'bg-federalblue-50 dark:bg-federalblue-900/20 border-federalblue-200 dark:border-federalblue-800' : 'bg-white dark:bg-zinc-900 border-slate-100 dark:border-zinc-800 hover:border-federalblue-100 dark:hover:border-federalblue-900/50'}`}>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-federalblue-900 dark:text-zinc-100">{t.merchant}</span>
                                        <span className={`text-sm font-bold ${t.type === 'DEBIT' ? 'text-zinc-900 dark:text-white' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                            {t.type === 'DEBIT' ? '-' : '+'} ₹{t.amount.toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 dark:text-zinc-400 mt-1">{t.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedTx && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">2. Dispute Reason</h3>
                            <textarea
                                placeholder="Please describe the issue (e.g., amount mismatch, service not received)"
                                value={disputeReason}
                                onChange={(e) => setDisputeReason(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-federalblue-500 min-h-[100px]"
                            />
                        </div>
                    )}

                    <button
                        disabled={!selectedTx || !disputeReason.trim()}
                        onClick={() => setView('SUCCESS')}
                        className="w-full py-4 bg-federalblue-900 text-white rounded-xl text-sm font-bold shadow-lg disabled:opacity-50 active:scale-95 transition-all"
                    >
                        Submit Dispute
                    </button>
                </div>
            </div>
        );
    }

    if (view === 'TICKETS') {
        return (
            <div className={`flex flex-col h-full min-h-screen bg-white dark:bg-zinc-950 transition-all duration-700 ${festival !== 'DEFAULT' ? `theme-festive-${festival.toLowerCase()}` : ''}`}>
                {renderHeader('Ticket History')}
                <div className="p-6 space-y-4 animate-in fade-in slide-in-from-right-4">
                    {[
                        { id: 'TKT-2026-X8Y', status: 'In Review', issue: 'POS Double Charge', date: 'Yesterday' },
                        { id: 'TKT-2026-A1B', status: 'Resolved', issue: 'Cashback not credited', date: '12 Feb 2026' }
                    ].map((tkt, i) => (
                        <div key={i} className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 space-y-3">
                            <div className="flex justify-between items-center">
                                <h4 className="font-bold text-sm text-federalblue-900 dark:text-white">{tkt.issue}</h4>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${tkt.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30' : 'bg-amber-50 text-amber-600 dark:bg-amber-900/30'}`}>
                                    {tkt.status}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-slate-500 dark:text-zinc-400">
                                <span className="font-mono">{tkt.id}</span>
                                <span>{tkt.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col min-h-screen transition-all duration-700 ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-[#333333]'} ${festival !== 'DEFAULT' ? `theme-festive-${festival.toLowerCase()}` : ''}`}>
            {renderHeader('Support & Safety')}

            <div className="p-6 space-y-8 flex-1">
                <div className="grid grid-cols-2 gap-4 text-zinc-900 dark:text-white">
                    <div onClick={() => setView('FRAUD')} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col items-center text-center gap-4 cursor-pointer hover:border-red-200 dark:hover:border-red-800 transition-all active:scale-[0.98]">
                        <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold">Report Fraud</h4>
                            <p className="text-[9px] text-slate-500 dark:text-zinc-400 mt-1">SOS Card/Account Block</p>
                        </div>
                    </div>

                    <div onClick={() => setView('DISPUTE')} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col items-center text-center gap-4 cursor-pointer hover:border-federalblue-200 dark:hover:border-federalblue-800 transition-all active:scale-[0.98]">
                        <div className="w-12 h-12 rounded-full bg-federalblue-50 dark:bg-federalblue-900/40 text-federalblue-900 dark:text-federalblue-400 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold">Raise Dispute</h4>
                            <p className="text-[9px] text-slate-500 dark:text-zinc-400 mt-1">Issues with Transaction</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Connect with us</h3>
                    <div className="space-y-2">
                        <div onClick={() => showToast('Connecting to Live Chat Advisor...')} className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-800 flex items-center justify-between group cursor-pointer shadow-sm active:scale-95 transition-transform">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-federalblue-50 dark:bg-federalblue-900/40 text-federalblue-900 dark:text-federalblue-400 rounded-lg flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-federalblue-900 dark:text-white">Live Chat</h4>
                                    <p className="text-[10px] text-slate-500 dark:text-zinc-400">Wait time: ~2 mins</p>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-zinc-600 group-hover:text-federalblue-900 dark:group-hover:text-white transition-all" />
                        </div>

                        <div onClick={() => showToast('Calling Federal Privilege Line (1800-425-1199)...')} className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-800 flex items-center justify-between group cursor-pointer shadow-sm active:scale-95 transition-transform">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
                                    <PhoneCall className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-federalblue-900 dark:text-white">Dedicated Support</h4>
                                    <p className="text-[10px] text-slate-500 dark:text-zinc-400">24/7 Federal Privilege Line</p>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-zinc-600 group-hover:text-federalblue-900 dark:group-hover:text-white transition-all" />
                        </div>
                    </div>
                </div>

                <div onClick={() => setView('TICKETS')} className="p-6 bg-federalblue-900 rounded-2xl text-white space-y-4 relative overflow-hidden cursor-pointer group active:scale-95 transition-transform">
                    <HandHelping className="w-10 h-10 opacity-20 absolute -right-2 -bottom-2 group-hover:scale-110 transition-transform" />
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold">Help Desk Ticket History</h4>
                        <p className="text-[10px] opacity-70">Track your active dispute cases.</p>
                    </div>
                    <button className="text-[10px] font-bold uppercase tracking-widest underline underline-offset-4 decoration-federalgold-500">View Active Items</button>
                </div>
            </div>

            {toastMsg && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-6 py-3 rounded-full text-xs font-bold shadow-2xl animate-in fade-in slide-in-from-bottom-5 z-50">
                    {toastMsg}
                </div>
            )}

            <div className="p-6 text-center text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                <Clock className="w-3 h-3" />
                Response SLA: 4 Hours for Disputes
            </div>
        </div>
    );
};

export default SupportService;
