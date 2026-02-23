import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Sparkles,
    CheckCircle2,
    ChevronRight,
    Info,
    FileText,
    Lock,
    Zap,
    CreditCard,
    ShieldCheck
} from 'lucide-react';
import { getCardRecommendation, CardRecommendation } from '../services/geminiService';

interface CardApplicationFlowProps {
    onBack: () => void;
    onApplySuccess: (cardName: string) => void;
    userProfile: {
        income: number;
        liquidCash: number;
        monthlySpend: number;
        primarySpend: string;
        lifeStage: string;
    };
    isDarkMode: boolean;
    festival: 'DEFAULT' | 'DIWALI' | 'HOLI';
}

const CardApplicationFlow: React.FC<CardApplicationFlowProps> = ({ onBack, onApplySuccess, userProfile, isDarkMode, festival }) => {
    const [step, setStep] = useState<'ANALYZING' | 'REVEAL' | 'FORM' | 'SUCCESS'>('ANALYZING');
    const [recommendation, setRecommendation] = useState<CardRecommendation | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchRec = async () => {
            const rec = await getCardRecommendation(userProfile);
            setTimeout(() => {
                setRecommendation(rec);
                setStep('REVEAL');
            }, 3000); // Simulate thinking time for effect
        };
        fetchRec();
    }, [userProfile]);

    const getCardStyles = (code: string) => {
        switch (code) {
            case 'CELESTA': return 'bg-gradient-to-br from-slate-900 via-federalblue-950 to-slate-900 text-white border-federalgold-500/30';
            case 'IMPERIO': return 'bg-gradient-to-br from-federalblue-800 to-federalblue-600 text-white border-white/20';
            case 'SIGNET': return 'bg-gradient-to-br from-slate-100 to-slate-300 text-federalblue-900 border-slate-200';
            default: return 'bg-slate-800 text-white';
        }
    };

    if (step === 'ANALYZING') {
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-8 transition-colors duration-700 ${isDarkMode ? 'dark bg-zinc-950' : 'bg-white'}`}>
                <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-federalblue-50 dark:border-zinc-800 border-t-federalblue-900 animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-federalgold-600 animate-pulse" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-federalblue-900 dark:text-white">Oracle is Analyzing...</h2>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-xs mx-auto">
                        Synthesizing your financial footprint to find your perfect match.
                    </p>
                </div>
            </div>
        );
    }

    if (step === 'REVEAL' && recommendation) {
        return (
            <div className={`min-h-screen flex flex-col font-sans transition-all duration-700 ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-slate-50 text-[#333333]'}`}>
                <div className="px-6 py-4 flex items-center gap-4 bg-white dark:bg-zinc-950 border-b border-slate-100 dark:border-zinc-800">
                    <button onClick={onBack} className="p-2 -ml-2 text-slate-400 dark:text-zinc-500">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h2 className="text-sm font-bold text-federalblue-900 dark:text-zinc-100 uppercase tracking-widest">Recommended For You</h2>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Card Reveal Animation */}
                    <div className={`aspect-[1.58/1] w-full rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-1000 transform animate-in slide-in-from-bottom-12 fade-in ${getCardStyles(recommendation.cardCode)}`}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Federal Bank</p>
                                <h3 className="text-2xl font-black tracking-tighter italic">{recommendation.cardCode}</h3>
                            </div>
                            <Zap className="w-8 h-8 text-federalgold-500 fill-federalgold-500" />
                        </div>
                        <div className="mt-auto space-y-4">
                            <div className="flex gap-4">
                                <div className="w-10 h-6 bg-white/20 rounded-md border border-white/10" />
                                <div className="text-[10px] font-mono opacity-80 mt-1 uppercase">Jane Doe</div>
                            </div>
                        </div>
                        {/* Decorative background elements */}
                        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-federalgold-500/10 rounded-full blur-3xl" />
                    </div>

                    <div className="space-y-6">
                        <div className="bg-federalgold-50 dark:bg-federalgold-950/20 border border-federalgold-100 dark:border-federalgold-900/30 rounded-2xl p-4 flex gap-4">
                            <Sparkles className="w-6 h-6 text-federalgold-600 dark:text-federalgold-500 shrink-0 mt-1" />
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-federalblue-900 dark:text-white">Oracle's Decision Logic</p>
                                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed italic">"{recommendation.reason}"</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {recommendation.benefits.map((benefit, i) => (
                                <div key={i} className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-100 dark:border-zinc-800 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                    <span className="text-[11px] font-bold text-slate-700 dark:text-zinc-200">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 overflow-hidden">
                            <div className="px-4 py-3 bg-slate-50 dark:bg-zinc-950 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Compliance & Charges</span>
                                <Info className="w-4 h-4 text-slate-300 dark:text-zinc-600" />
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500 dark:text-zinc-400">Interest (APR)</span>
                                    <span className="font-bold text-federalblue-900 dark:text-white">{recommendation.apr} p.a.</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500 dark:text-zinc-400">Annual Membership</span>
                                    <span className="font-bold text-federalblue-900 dark:text-white">{recommendation.annualFee}</span>
                                </div>
                                <a
                                    href={recommendation.kfsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 bg-federalblue-50/50 dark:bg-white/5 rounded-xl border border-federalblue-100 dark:border-white/10 group"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-federalblue-700 dark:text-federalblue-400" />
                                        <span className="text-xs font-bold text-federalblue-900 dark:text-zinc-100">Key Fact Statement (KFS)</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-zinc-950 border-t border-slate-100 dark:border-zinc-800">
                    <button
                        onClick={() => setStep('FORM')}
                        className="w-full bg-federalblue-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-all"
                    >
                        Apply Instantly
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    <p className="text-[10px] text-center text-slate-400 mt-4 px-4 font-medium uppercase tracking-tighter">
                        By applying, you agree to our terms and allow Federal Bank to perform a soft credit check.
                    </p>
                </div>
            </div>
        );
    }

    if (step === 'FORM') {
        return (
            <div className={`min-h-screen transition-all duration-700 font-sans flex flex-col pt-safe ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-white text-[#333333]'} ${festival !== 'DEFAULT' ? `theme-festive-${festival.toLowerCase()}` : ''}`}>
                {/* Header */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-zinc-800">
                    <button onClick={onBack} className="p-2 -ml-2 text-slate-400 dark:text-zinc-500 hover:text-federalblue-900 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-federalblue-900 dark:bg-zinc-100 flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-white dark:text-zinc-950" />
                        </div>
                        <span className="text-sm font-bold text-federalblue-900 dark:text-zinc-100 uppercase tracking-widest">Card Application</span>
                    </div>
                    <div className="w-10"></div>
                </div>

                <div className="flex-1 p-6 space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-federalblue-900 dark:text-zinc-100">Almost there, Jane</h1>
                        <p className="text-sm text-slate-500 dark:text-zinc-400">Just verify your mobile and office details.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Work Email</label>
                            <input
                                type="text"
                                defaultValue="jane.doe@techcorp.com"
                                className="w-full p-4 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-federalblue-900 dark:text-white font-medium focus:ring-2 focus:ring-federalblue-900 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Office Address</label>
                            <textarea
                                rows={3}
                                defaultValue="Building 7, BKC, Mumbai - 400051"
                                className="w-full p-4 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-federalblue-900 dark:text-white font-medium focus:ring-2 focus:ring-federalblue-900 outline-none transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            <div className="space-y-0.5">
                                <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">KYC Verified</p>
                                <p className="text-[11px] text-zinc-600 dark:text-zinc-400">Your Aadhaar KYC from onboarding is reusable.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-zinc-950 border-t border-slate-100 dark:border-zinc-800">
                    <button
                        onClick={() => {
                            setIsSubmitting(true);
                            setTimeout(() => {
                                setIsSubmitting(false);
                                setStep('SUCCESS');
                            }, 2000);
                        }}
                        disabled={isSubmitting}
                        className="w-full bg-federalblue-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>Submit Application <ChevronRight className="w-5 h-5" /></>
                        )}
                    </button>
                </div>
            </div>
        );
    }

    if (step === 'SUCCESS') {
        return (
            <div className="min-h-screen bg-federalblue-900 flex flex-col items-center justify-center p-8 text-center text-white space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center relative">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-pulse" />
                    <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-federalgold-500" />
                </div>
                <div className="space-y-3">
                    <h2 className="text-3xl font-black italic tracking-tighter">Application Sent!</h2>
                    <p className="text-federalblue-100 text-sm max-w-xs mx-auto leading-relaxed">
                        Your {recommendation?.cardCode} Card is under final review. You'll receive a digital version in <span className="text-federalgold-400 font-bold underline">2 hours</span>.
                    </p>
                </div>
                <button
                    onClick={() => onApplySuccess(recommendation?.cardCode || 'Credit Card')}
                    className="w-full bg-white text-federalblue-900 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 active:scale-95 transition-all shadow-2xl mt-12"
                >
                    Back to Dashboard
                </button>
                <div className="absolute top-0 right-0 w-64 h-64 bg-federalgold-500/5 -mr-32 -mt-32 rounded-full blur-3xl pointer-events-none" />
            </div>
        );
    }

    return null;
};

export default CardApplicationFlow;
