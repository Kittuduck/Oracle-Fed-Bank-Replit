import React, { useState } from 'react';
import {
    ArrowLeft,
    StopCircle,
    AlertTriangle,
    CheckCircle2,
    ChevronRight,
    ShieldAlert,
    BookOpen,
    User,
    Plus,
    Zap
} from 'lucide-react';

interface LegacyServicesProps {
    onBack: () => void;
    isDarkMode: boolean;
    festival: 'DEFAULT' | 'DIWALI' | 'HOLI';
}

const LegacyServices: React.FC<LegacyServicesProps> = ({ onBack, isDarkMode, festival }) => {
    const [view, setView] = useState<'SELECTION' | 'STOP_CHEQUE' | 'NOMINES' | 'MANDATES' | 'SUCCESS'>('SELECTION');
    const [chequeNumber, setChequeNumber] = useState('');
    const [reason, setReason] = useState('');
    const [agreeDisclaimer, setAgreeDisclaimer] = useState(false);

    const handleSubmit = () => {
        if (!chequeNumber || !reason || !agreeDisclaimer) return;
        setView('SUCCESS');
    };

    if (view === 'SUCCESS') {
        return (
            <div className={`min-h-screen transition-all duration-700 ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-white text-[#333333]'} flex flex-col items-center justify-center p-8 text-center space-y-6`}>
                <div className={`w-20 h-20 ${isDarkMode ? 'bg-emerald-950/40' : 'bg-emerald-50'} rounded-full flex items-center justify-center`}>
                    <CheckCircle2 className={`w-10 h-10 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-500'}`} />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-federalblue-900">Request Processed</h2>
                    <p className="text-sm text-slate-500">
                        Stop payment request for Cheque #<strong>{chequeNumber}</strong> has been successfully registered.
                    </p>
                </div>
                <button
                    onClick={onBack}
                    className="w-full py-4 bg-federalblue-900 text-white font-bold rounded-xl shadow-lg"
                >
                    Back to Services
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
                    {view === 'SELECTION' ? 'Banking Services' :
                        view === 'STOP_CHEQUE' ? 'Stop Cheque Payment' :
                            view === 'NOMINES' ? 'Nominee Management' : 'Digital Mandates'}
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {view === 'SELECTION' && (
                    <div className="space-y-4">
                        <div
                            onClick={() => setView('STOP_CHEQUE')}
                            className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 flex items-center gap-4 cursor-pointer hover:border-federalblue-300 transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-500 dark:text-red-400 flex items-center justify-center">
                                <StopCircle className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-[14px] font-bold text-federalblue-900 dark:text-zinc-100">Stop Cheque Payment</h4>
                                <p className="text-[10px] text-slate-500 dark:text-zinc-400">Instantly halt payment for a leaf</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300 dark:text-zinc-600 transition-colors" />
                        </div>

                        <div
                            onClick={() => setView('NOMINES')}
                            className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 flex items-center gap-4 cursor-pointer hover:border-federalblue-300 transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-federalblue-50 dark:bg-white/5 text-federalblue-900 dark:text-federalblue-400 flex items-center justify-center">
                                <User className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-[14px] font-bold text-federalblue-900 dark:text-zinc-100">Nominee Management</h4>
                                <p className="text-[10px] text-slate-500 dark:text-zinc-400">Update or add beneficiaries</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300 dark:text-zinc-600 transition-colors" />
                        </div>

                        <div
                            onClick={() => setView('MANDATES')}
                            className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 flex items-center gap-4 cursor-pointer hover:border-federalblue-300 transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-white/5 text-orange-500 dark:text-orange-400 flex items-center justify-center">
                                <Zap className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-[14px] font-bold text-federalblue-900 dark:text-zinc-100">Digital Mandates</h4>
                                <p className="text-[10px] text-slate-500 dark:text-zinc-400">Manage standing instructions</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300 dark:text-zinc-600 transition-colors" />
                        </div>

                        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-100 dark:border-zinc-800 flex items-center gap-4 cursor-pointer opacity-50 grayscale">
                            <div className="w-12 h-12 rounded-xl bg-federalblue-50 dark:bg-white/5 text-federalblue-600 flex items-center justify-center">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-[14px] font-bold text-federalblue-900 dark:text-zinc-100">Request New Cheque Book</h4>
                                <p className="text-[10px] text-slate-500 dark:text-zinc-400">25 leaves, door-step delivery</p>
                            </div>
                            <span className="text-[8px] font-black bg-slate-100 dark:bg-zinc-800 text-slate-400 px-1.5 py-0.5 rounded">COMING SOON</span>
                        </div>
                    </div>
                )}

                {view === 'NOMINES' && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 space-y-4">
                            <p className="text-xs text-slate-500 dark:text-zinc-400">Manage nominees for Account ****8912</p>
                            <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                                <div>
                                    <h5 className="text-sm font-bold text-federalblue-900 dark:text-white">Riya M.</h5>
                                    <p className="text-[10px] text-slate-500">Daughter • 100% Share</p>
                                </div>
                                <span className="text-[10px] font-bold text-emerald-600">Active</span>
                            </div>
                            <button className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-slate-400 hover:border-federalblue-300 transition-colors flex items-center justify-center gap-2">
                                <Plus className="w-4 h-4" /> Add Secondary Nominee
                            </button>
                        </div>
                    </div>
                )}

                {view === 'MANDATES' && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 space-y-4">
                            <h5 className="text-sm font-bold text-federalblue-900 dark:text-white">Active Mandates</h5>
                            <div className="space-y-3">
                                <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-bold text-zinc-900 dark:text-white">SIP: Mirae Asset</p>
                                        <p className="text-[10px] text-slate-500">₹2,50,000 • Monthly</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'STOP_CHEQUE' && (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cheque Number (6 digits)</label>
                                <input
                                    type="text"
                                    maxLength={6}
                                    placeholder="000123"
                                    className="w-full text-2xl font-mono font-bold text-federalblue-900 focus:outline-none placeholder:text-slate-100"
                                    value={chequeNumber}
                                    onChange={(e) => setChequeNumber(e.target.value.replace(/\D/g, ''))}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Reason for Stopping</label>
                                <select
                                    className="w-full p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-xl text-sm font-medium text-federalblue-900 dark:text-zinc-100 focus:outline-none focus:border-federalblue-300"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                >
                                    <option value="">Select a reason</option>
                                    <option value="LOST" className="dark:bg-zinc-800">Cheque Leaf Lost/Stolen</option>
                                    <option value="WRONG_AMOUNT" className="dark:bg-zinc-800">Incorrect Amount Written</option>
                                    <option value="FRAUD_SUSPECTED" className="dark:bg-zinc-800">Suspected Fraud</option>
                                    <option value="DUPLICATE" className="dark:bg-zinc-800">Duplicate Issue</option>
                                </select>
                            </div>
                        </div>

                        <div className="bg-red-50 p-4 rounded-xl border border-red-100 space-y-3">
                            <div className="flex gap-3">
                                <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                                <h4 className="text-xs font-bold text-red-900 uppercase tracking-tighter">Legal Disclaimer (NI Act)</h4>
                            </div>
                            <p className="text-[10px] text-red-800 leading-relaxed font-medium">
                                I understand that stopping payment of a legally issued cheque may have legal consequences under Section 138 of the Negotiable Instruments Act. I confirm that this request is based on valid reasons.
                            </p>
                            <label className="flex items-center gap-2 cursor-pointer pt-2">
                                <input
                                    type="checkbox"
                                    className="rounded text-federalblue-900"
                                    checked={agreeDisclaimer}
                                    onChange={(e) => setAgreeDisclaimer(e.target.checked)}
                                />
                                <span className="text-[10px] font-bold text-red-700">I Agree to the Terms</span>
                            </label>
                        </div>

                        <button
                            disabled={!chequeNumber || !reason || !agreeDisclaimer}
                            onClick={handleSubmit}
                            className="w-full py-4 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-200 disabled:opacity-50"
                        >
                            Confirm Stop Payment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LegacyServices;
