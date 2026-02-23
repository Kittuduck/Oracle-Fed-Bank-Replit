import React, { useState } from 'react';
import {
    ArrowLeft,
    ChevronRight,
    Fingerprint,
    CreditCard,
    CheckCircle2,
    Info,
    Camera,
    ShieldCheck,
    FileText
} from 'lucide-react';

interface OnboardingFlowProps {
    onComplete: () => void;
    onExit: () => void;
    isDarkMode: boolean;
    festival: 'DEFAULT' | 'DIWALI' | 'HOLI';
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onExit, isDarkMode, festival }) => {
    const [step, setStep] = useState(1);
    const [pan, setPan] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [otp, setOtp] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);

    const totalSteps = 4;

    const nextStep = () => {
        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            setStep(s => Math.min(s + 1, totalSteps));
        }, 1500);
    };

    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const renderStep1 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-federalblue-50 dark:bg-federalblue-900/20 border border-federalblue-100 dark:border-federalblue-900/30 p-4 rounded-xl flex items-start gap-3">
                <Info className="w-5 h-5 text-federalblue-900 dark:text-federalblue-200 mt-0.5" />
                <p className="text-xs text-federalblue-900 dark:text-federalblue-100 font-medium leading-relaxed">
                    Federal Bank requires a valid PAN card for tax compliance and identity verification as per RBI guidelines.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-[10px] text-slate-500 dark:text-zinc-400 mb-2 ml-1 font-bold uppercase tracking-widest">Enter PAN Number</label>
                    <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-zinc-500" />
                        <input
                            type="text"
                            value={pan}
                            onChange={(e) => setPan(e.target.value.toUpperCase())}
                            placeholder="ABCDE1234F"
                            maxLength={10}
                            className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl pl-12 pr-4 py-4 text-sm font-mono tracking-widest focus:border-federalblue-700 dark:text-white outline-none transition-all shadow-sm"
                        />
                    </div>
                </div>

                <div className="p-8 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-zinc-900 hover:bg-federalblue-50 dark:hover:bg-federalblue-900/10 hover:border-federalblue-200 transition-all cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center text-slate-400 group-hover:text-federalblue-700 shadow-sm transition-colors">
                        <Camera className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 group-hover:text-federalblue-900 dark:group-hover:text-white uppercase tracking-widest">Scan PAN Card</p>
                </div>
            </div>

            <button
                onClick={nextStep}
                disabled={pan.length < 10 || isVerifying}
                className="w-full py-4 bg-federalblue-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-sm font-bold shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {isVerifying ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/30 dark:border-zinc-900/30 border-t-white dark:border-t-zinc-900 rounded-full animate-spin" />
                        Verifying...
                    </>
                ) : 'Verify PAN'}
            </button>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
                <h3 className="text-lg font-bold text-federalblue-900 dark:text-zinc-100">Aadhaar Verification</h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">Fast-track your KYC with Secure OTP</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-[10px] text-slate-500 dark:text-zinc-400 mb-2 ml-1 font-bold uppercase tracking-widest">Enter 12-digit Aadhaar</label>
                    <div className="relative">
                        <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-zinc-500" />
                        <input
                            type="text"
                            value={aadhaar}
                            onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
                            placeholder="0000 0000 0000"
                            maxLength={12}
                            className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl pl-12 pr-4 py-4 text-sm font-mono tracking-widest focus:border-federalblue-700 dark:text-white outline-none transition-all shadow-sm"
                        />
                    </div>
                </div>

                {aadhaar.length === 12 && (
                    <div className="space-y-3 pt-2">
                        <label className="block text-[10px] text-slate-500 dark:text-zinc-400 mb-2 ml-1 font-bold uppercase tracking-widest">Enter OTP sent to XXXXXX4432</label>
                        <div className="grid grid-cols-6 gap-2">
                            {[...Array(6)].map((_, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    maxLength={1}
                                    className="w-full h-12 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg text-center text-lg font-bold focus:border-federalblue-700 dark:text-white outline-none"
                                />
                            ))}
                        </div>
                        <p className="text-[10px] text-federalblue-700 dark:text-federalblue-400 font-bold text-right cursor-pointer">Resend OTP</p>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <button
                    onClick={nextStep}
                    disabled={aadhaar.length < 12 || isVerifying}
                    className="w-full py-4 bg-federalblue-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-sm font-bold shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center min-h-[56px]"
                >
                    {isVerifying ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 dark:border-zinc-900/30 border-t-white dark:border-t-zinc-900 rounded-full animate-spin mr-2" />
                            Authenticating...
                        </>
                    ) : 'Secure Aadhaar Verified'}
                </button>
                <button onClick={prevStep} className="w-full py-2 text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Go Back</button>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-federalblue-900 dark:text-zinc-100 tracking-tight">Digital Consents</h4>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-zinc-950 rounded-lg">
                            <input type="checkbox" className="mt-1 accent-federalblue-900" defaultChecked />
                            <p className="text-[10px] text-slate-600 dark:text-zinc-400 leading-normal">I hereby authorize Federal Bank to fetch my KYC details from official repositories.</p>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-zinc-950 rounded-lg">
                            <input type="checkbox" className="mt-1 accent-federalblue-900" defaultChecked />
                            <p className="text-[10px] text-slate-600 dark:text-zinc-400 leading-normal">I agree to the Terms & Conditions for opening a Platinum Savings Account.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="block text-[10px] text-slate-500 dark:text-zinc-400 ml-1 font-bold uppercase tracking-widest">E-Signature</label>
                    <div className="h-32 bg-slate-50 dark:bg-zinc-950 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-xl flex items-center justify-center text-slate-400 dark:text-zinc-600 italic text-sm">
                        Sign here visually...
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <button onClick={nextStep} className="w-full py-4 bg-federalblue-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-sm font-bold shadow-lg active:scale-[0.98]">Confirm & Open Account</button>
                <button onClick={prevStep} className="w-full py-2 text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Go Back</button>
            </div>
        </div>
    );

    const renderSuccess = () => (
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-6 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-federalblue-900 dark:text-zinc-100">Welcome to Federal Bank</h2>
                <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-[240px]">Your Platinum Savings Account is now ready. AI FinCoach (Oracle) is waiting for you.</p>
            </div>

            <div className="w-full bg-federalblue-50 dark:bg-federalblue-900/20 border border-federalblue-100 dark:border-federalblue-900/30 rounded-xl p-5 text-left space-y-3">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-federalblue-900 dark:text-federalblue-400" />
                    <h4 className="text-xs font-bold text-federalblue-900 dark:text-zinc-100">Oracle's First Suggestion</h4>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">"Advait, since you prefer liquidity for your daughter's education, I've enabled the **Sweep-in Facility** automatically to earn 7% on your idle balance."</p>
            </div>

            <button onClick={onComplete} className="w-full py-4 bg-federalblue-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-sm font-bold shadow-lg active:scale-[0.98]">Enter Dashboard</button>
        </div>
    );

    return (
        <div className={`min-h-screen transition-all duration-700 font-sans flex flex-col pt-safe ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-white text-[#333333]'} ${festival !== 'DEFAULT' ? `theme-festive-${festival.toLowerCase()}` : ''}`}>
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-zinc-800">
                <button onClick={onExit} className="p-2 -ml-2 text-slate-400 dark:text-zinc-500 hover:text-federalblue-900 transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-federalblue-900 dark:bg-white flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-white dark:text-zinc-950" />
                    </div>
                    <span className="text-sm font-bold text-federalblue-900 dark:text-zinc-100 uppercase tracking-widest">Onboarding</span>
                </div>
                <div className="w-10"></div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-slate-100 dark:bg-zinc-900 overflow-hidden">
                <div
                    className="h-full bg-federalblue-700 dark:bg-federalblue-400 transition-all duration-500 ease-out"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                />
            </div>

            <div className="px-6 py-8 flex-1 overflow-y-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-extrabold text-federalblue-900 dark:text-zinc-100 tracking-tight">
                        {step === 1 && "Identity Check"}
                        {step === 2 && "Digital KYC"}
                        {step === 3 && "Secure Consent"}
                        {step === 4 && "Success!"}
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Step {step} of {totalSteps}</p>
                </div>

                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderSuccess()}
            </div>

            <div className="p-6 text-center space-y-2">
                <div className="flex justify-center items-center gap-1.5 text-slate-400">
                    <ShieldCheck className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Bank-Grade Encryption (AES-256)</span>
                </div>
            </div>
        </div>
    );
};

export default OnboardingFlow;
