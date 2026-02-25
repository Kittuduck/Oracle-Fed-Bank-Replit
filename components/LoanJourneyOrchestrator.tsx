import React, { useState, useEffect, useRef } from 'react';
import {
  Plane, TrendingUp, Shield, CheckCircle2, Sparkles, ChevronRight,
  IndianRupee, Calendar, Lock, FileText, ArrowRight, PartyPopper,
  CreditCard, Building2, Fingerprint, Smartphone, Check, X, Clock,
  AlertCircle, Wallet, BarChart3, DollarSign
} from 'lucide-react';

interface LoanJourneyProps {
  persona: any;
  isDarkMode: boolean;
  onComplete: (loanData: LoanData) => void;
  onDismiss: () => void;
  currentFinancials: { liquid: number; need: number; goal: number };
}

interface LoanData {
  amount: number;
  tenure: number;
  emi: number;
  rate: number;
  accountNumber: string;
}

type Phase = 'GAP_ANALYSIS' | 'PRE_APPROVED' | 'CUSTOMIZATION' | 'COMPLIANCE' | 'DISBURSEMENT';
type ComplianceStep = 'TERMS' | 'AADHAAR' | 'ENACH';

const getPersonaTripData = (persona: any, currentFinancials?: { liquid: number; need: number; goal: number }) => {
  const id = persona?.id || 'advait';
  const name = persona?.name || 'User';
  const liquid = currentFinancials?.liquid || persona?.financials?.liquid || 1240500;

  const tripData: Record<string, { destination: string; travelers: string; estimatedCost: number; emoji: string; breakdown: { flights: number; hotels: number; activities: number; food: number; visa: number } }> = {
    advait: {
      destination: 'Japan',
      travelers: 'family of 3 (you, spouse & Riya)',
      estimatedCost: 650000,
      emoji: '🇯🇵',
      breakdown: { flights: 280000, hotels: 180000, activities: 85000, food: 65000, visa: 40000 }
    },
    kapoor: {
      destination: 'Varanasi & Rishikesh',
      travelers: 'you and your spouse',
      estimatedCost: 180000,
      emoji: '🙏',
      breakdown: { flights: 45000, hotels: 65000, activities: 30000, food: 25000, visa: 15000 }
    },
    rajesh: {
      destination: 'Dubai',
      travelers: 'family of 4',
      estimatedCost: 850000,
      emoji: '🇦🇪',
      breakdown: { flights: 320000, hotels: 260000, activities: 120000, food: 95000, visa: 55000 }
    },
    ishan: {
      destination: 'Thailand',
      travelers: 'you and 3 friends',
      estimatedCost: 120000,
      emoji: '🇹🇭',
      breakdown: { flights: 35000, hotels: 30000, activities: 25000, food: 20000, visa: 10000 }
    },
    anjali: {
      destination: 'Singapore',
      travelers: 'family of 4 (you, spouse, Meera & Arjun)',
      estimatedCost: 480000,
      emoji: '🇸🇬',
      breakdown: { flights: 180000, hotels: 140000, activities: 75000, food: 55000, visa: 30000 }
    }
  };

  const trip = tripData[id] || tripData.advait;
  const savings = Math.min(liquid * 0.4, trip.estimatedCost * 0.6);
  const shortfall = Math.max(trip.estimatedCost - savings, 50000);

  return { ...trip, name, savings: Math.round(savings), shortfall: Math.round(shortfall), liquid };
};

const getPersonaTone = (persona: any) => {
  const id = persona?.id || 'advait';
  const tones: Record<string, { greeting: string; style: string }> = {
    advait: { greeting: 'Advait', style: 'analytical' },
    kapoor: { greeting: 'Mr. Kapoor', style: 'respectful' },
    rajesh: { greeting: 'Rajesh', style: 'direct' },
    ishan: { greeting: 'Ishan', style: 'encouraging' },
    anjali: { greeting: 'Anjali', style: 'supportive' }
  };
  return tones[id] || tones.advait;
};

const formatCurrency = (amount: number) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  return `₹${amount.toLocaleString('en-IN')}`;
};

const LoanJourneyOrchestrator: React.FC<LoanJourneyProps> = ({
  persona,
  isDarkMode,
  onComplete,
  onDismiss,
  currentFinancials
}) => {
  const [phase, setPhase] = useState<Phase>('GAP_ANALYSIS');
  const [animateIn, setAnimateIn] = useState(false);
  const [cibilConsent, setCibilConsent] = useState(false);
  const [loanAmount, setLoanAmount] = useState(0);
  const [tenure, setTenure] = useState(24);
  const [complianceStep, setComplianceStep] = useState<ComplianceStep>('TERMS');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [enachConfirmed, setEnachConfirmed] = useState(false);
  const [disbursed, setDisbursed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const tripData = getPersonaTripData(persona, currentFinancials);
  const tone = getPersonaTone(persona);
  const rate = 10.49;
  const processingFee = 999;

  useEffect(() => {
    setLoanAmount(tripData.shortfall);
  }, [persona?.id]);

  useEffect(() => {
    setAnimateIn(false);
    const timer = setTimeout(() => setAnimateIn(true), 50);
    return () => clearTimeout(timer);
  }, [phase, complianceStep]);

  const calculateEMI = (principal: number, months: number) => {
    if (months <= 0 || principal <= 0) return 0;
    const r = rate / 12 / 100;
    const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    return Math.round(emi);
  };

  const emi = calculateEMI(loanAmount, tenure);
  const totalPayable = emi * tenure;
  const totalInterest = totalPayable - loanAmount;

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const sendOtp = () => {
    setOtpSent(true);
    setTimeout(() => {
      setOtp(['8', '4', '2', '7', '5', '1']);
      setTimeout(() => {
        setOtpVerified(true);
        setTimeout(() => setComplianceStep('ENACH'), 1200);
      }, 1500);
    }, 2000);
  };

  const completeDisbursement = () => {
    setDisbursed(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
    onComplete({
      amount: loanAmount,
      tenure,
      emi,
      rate,
      accountNumber: 'XXXX XXXX 4821'
    });
  };

  const progressPercent = () => {
    const phases: Phase[] = ['GAP_ANALYSIS', 'PRE_APPROVED', 'CUSTOMIZATION', 'COMPLIANCE', 'DISBURSEMENT'];
    return ((phases.indexOf(phase) + 1) / phases.length) * 100;
  };

  const cardClass = `rounded-2xl p-5 border transition-all duration-500 ${isDarkMode
    ? 'bg-zinc-900 border-zinc-800'
    : 'bg-white border-slate-100 shadow-sm'}`;

  const renderGapAnalysis = () => {
    const savingsPercent = Math.round((tripData.savings / tripData.estimatedCost) * 100);
    const shortfallPercent = 100 - savingsPercent;

    return (
      <div className={`space-y-4 transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className={cardClass}>
          <div className="flex items-center gap-2 mb-4">
            <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-federalblue-900/30' : 'bg-federalblue-50'}`}>
              <Plane className={`w-4 h-4 ${isDarkMode ? 'text-federalblue-400' : 'text-federalblue-900'}`} />
            </div>
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Trip Feasibility</p>
              <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{tripData.destination} {tripData.emoji}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className={isDarkMode ? 'text-zinc-400' : 'text-slate-500'}>Estimated Trip Cost ({tripData.travelers})</span>
              <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{formatCurrency(tripData.estimatedCost)}</span>
            </div>

            <div className="space-y-1.5">
              {Object.entries(tripData.breakdown).map(([key, val]) => (
                <div key={key} className="flex justify-between text-[11px]">
                  <span className={`capitalize ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>{key === 'visa' ? 'Visa & Insurance' : key}</span>
                  <span className={isDarkMode ? 'text-zinc-300' : 'text-slate-600'}>{formatCurrency(val)}</span>
                </div>
              ))}
            </div>

            <div className={`h-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`} />

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Available Savings</span>
                <span className="text-xs font-bold text-emerald-600">{formatCurrency(tripData.savings)}</span>
              </div>
              <div className={`h-3 rounded-full overflow-hidden flex ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                <div className="h-full bg-emerald-500 rounded-l-full transition-all duration-1000" style={{ width: `${savingsPercent}%` }} />
                <div className="h-full bg-federalgold-500 rounded-r-full transition-all duration-1000" style={{ width: `${shortfallPercent}%` }} />
              </div>
              <div className="flex justify-between text-[10px] font-medium">
                <span className="text-emerald-600">{savingsPercent}% Covered</span>
                <span className="text-federalgold-600">{shortfallPercent}% Gap</span>
              </div>
            </div>

            <div className={`rounded-xl p-3 mt-2 ${isDarkMode ? 'bg-federalgold-900/10 border border-federalgold-800/20' : 'bg-federalgold-50 border border-federalgold-100'}`}>
              <p className={`text-xs font-semibold ${isDarkMode ? 'text-federalgold-400' : 'text-federalgold-700'}`}>
                You're {formatCurrency(tripData.shortfall)} away from your {tripData.destination} dream.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setPhase('PRE_APPROVED')}
          className="w-full py-3.5 bg-federalblue-900 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] shadow-lg"
        >
          Bridge This Gap <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const renderPreApproved = () => (
    <div className={`space-y-4 transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className={cardClass}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className={`w-4 h-4 ${isDarkMode ? 'text-federalgold-400' : 'text-federalgold-600'}`} />
          <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-federalgold-400' : 'text-federalgold-600'}`}>Pre-Approved Offer</p>
        </div>

        <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
          Hello {tone.greeting} 👋 Based on your profile and interest in this trip, I've unlocked a <span className="font-bold text-federalblue-900 dark:text-federalblue-400">pre-approved personal loan offer</span> to bridge this gap instantly.
        </p>

        <div className={`rounded-xl overflow-hidden border ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
          <div className="bg-gradient-to-r from-federalblue-900 to-federalblue-700 p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] text-federalblue-200 font-bold uppercase tracking-widest">Eligible Amount</p>
                <p className="text-2xl font-bold text-white mt-1">Up to {formatCurrency(Math.round(tripData.shortfall * 2))}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-4 space-y-3 ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className={`text-[10px] ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'} uppercase tracking-wider font-bold`}>Interest Rate</p>
                <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{rate}% <span className="text-[10px] font-normal text-slate-400">p.a.</span></p>
              </div>
              <div>
                <p className={`text-[10px] ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'} uppercase tracking-wider font-bold`}>Processing Fee</p>
                <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹{processingFee}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <Clock className={`w-3.5 h-3.5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>Instant disbursal in 2 minutes</span>
            </div>
          </div>
        </div>

        <div className={`mt-4 p-3 rounded-xl flex items-start gap-3 cursor-pointer transition-all ${
          cibilConsent
            ? (isDarkMode ? 'bg-emerald-900/20 border border-emerald-800/30' : 'bg-emerald-50 border border-emerald-200')
            : (isDarkMode ? 'bg-zinc-800 border border-zinc-700' : 'bg-slate-50 border border-slate-200')
        }`} onClick={() => setCibilConsent(!cibilConsent)}>
          <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
            cibilConsent
              ? 'bg-emerald-500 border-emerald-500'
              : (isDarkMode ? 'border-zinc-600' : 'border-slate-300')
          }`}>
            {cibilConsent && <Check className="w-3 h-3 text-white" />}
          </div>
          <div>
            <p className={`text-xs font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-slate-700'}`}>
              I authorize Federal Bank to fetch my credit report
            </p>
            <p className={`text-[10px] mt-0.5 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
              CIBIL score check for this application only. No impact on your score.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setPhase('CUSTOMIZATION')}
        disabled={!cibilConsent}
        className="w-full py-3.5 bg-federalblue-900 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Customize My Loan <ArrowRight className="w-4 h-4" />
      </button>

      <button
        onClick={onDismiss}
        className={`w-full py-3 text-xs font-medium rounded-xl transition-all ${isDarkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-slate-400 hover:text-slate-600'}`}
      >
        Maybe later
      </button>
    </div>
  );

  const renderCustomization = () => {
    const minLoan = 25000;
    const maxLoan = Math.round(tripData.shortfall * 2);
    const minTenure = 6;
    const maxTenure = 60;

    return (
      <div className={`space-y-4 transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className={cardClass}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className={`w-4 h-4 ${isDarkMode ? 'text-federalblue-400' : 'text-federalblue-900'}`} />
            <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Loan Modeler</p>
          </div>

          <p className={`text-xs mb-5 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            Shape your loan exactly how you want it, {tone.greeting}. Adjust the sliders below.
          </p>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Loan Amount</span>
                <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{formatCurrency(loanAmount)}</span>
              </div>
              <input
                type="range"
                min={minLoan}
                max={maxLoan}
                step={5000}
                value={loanAmount}
                onChange={e => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-federalblue-900"
                style={{
                  background: `linear-gradient(to right, ${isDarkMode ? '#004d9c' : '#004d9c'} ${((loanAmount - minLoan) / (maxLoan - minLoan)) * 100}%, ${isDarkMode ? '#27272a' : '#e2e8f0'} ${((loanAmount - minLoan) / (maxLoan - minLoan)) * 100}%)`
                }}
              />
              <div className="flex justify-between text-[10px] mt-1">
                <span className={isDarkMode ? 'text-zinc-600' : 'text-slate-300'}>{formatCurrency(minLoan)}</span>
                <span className={isDarkMode ? 'text-zinc-600' : 'text-slate-300'}>{formatCurrency(maxLoan)}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Tenure</span>
                <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{tenure} months</span>
              </div>
              <input
                type="range"
                min={minTenure}
                max={maxTenure}
                step={6}
                value={tenure}
                onChange={e => setTenure(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-federalblue-900"
                style={{
                  background: `linear-gradient(to right, ${isDarkMode ? '#004d9c' : '#004d9c'} ${((tenure - minTenure) / (maxTenure - minTenure)) * 100}%, ${isDarkMode ? '#27272a' : '#e2e8f0'} ${((tenure - minTenure) / (maxTenure - minTenure)) * 100}%)`
                }}
              />
              <div className="flex justify-between text-[10px] mt-1">
                <span className={isDarkMode ? 'text-zinc-600' : 'text-slate-300'}>{minTenure} mo</span>
                <span className={isDarkMode ? 'text-zinc-600' : 'text-slate-300'}>{maxTenure} mo</span>
              </div>
            </div>
          </div>

          <div className={`h-px my-4 ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`} />

          <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-50'}`}>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className={`text-[10px] ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'} uppercase tracking-wider font-bold`}>EMI</p>
                <p className={`text-base font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-federalblue-900'}`}>{formatCurrency(emi)}</p>
                <p className={`text-[10px] ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>/month</p>
              </div>
              <div>
                <p className={`text-[10px] ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'} uppercase tracking-wider font-bold`}>Interest</p>
                <p className={`text-base font-bold mt-1 ${isDarkMode ? 'text-federalgold-400' : 'text-federalgold-600'}`}>{formatCurrency(totalInterest)}</p>
                <p className={`text-[10px] ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>total</p>
              </div>
              <div>
                <p className={`text-[10px] ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'} uppercase tracking-wider font-bold`}>Total</p>
                <p className={`text-base font-bold mt-1 ${isDarkMode ? 'text-zinc-200' : 'text-slate-700'}`}>{formatCurrency(totalPayable)}</p>
                <p className={`text-[10px] ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>payable</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setPhase('COMPLIANCE')}
          className="w-full py-3.5 bg-gradient-to-r from-federalblue-900 to-federalblue-700 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] shadow-lg"
        >
          Accept Final Offer — {formatCurrency(emi)}/mo <CheckCircle2 className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const renderCompliance = () => {
    const maskedPhone = persona?.name === 'Mr. Kapoor' ? '*****4392' : persona?.name === 'Rajesh' ? '*****7834' : persona?.name === 'Ishan' ? '*****2156' : persona?.name === 'Anjali' ? '*****6789' : '*****5678';
    const accountNum = persona?.financials?.accountNumber || '**** 8842';

    return (
      <div className={`space-y-4 transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex gap-1 mb-2">
          {(['TERMS', 'AADHAAR', 'ENACH'] as ComplianceStep[]).map((step, idx) => (
            <div key={step} className="flex-1 flex flex-col items-center gap-1">
              <div className={`h-1.5 w-full rounded-full transition-all ${
                complianceStep === step
                  ? 'bg-federalblue-900'
                  : (['TERMS', 'AADHAAR', 'ENACH'].indexOf(complianceStep) > idx ? 'bg-emerald-500' : (isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'))
              }`} />
              <span className={`text-[9px] uppercase tracking-widest font-bold ${
                complianceStep === step
                  ? (isDarkMode ? 'text-white' : 'text-federalblue-900')
                  : (isDarkMode ? 'text-zinc-600' : 'text-slate-400')
              }`}>{step === 'AADHAAR' ? 'e-Sign' : step === 'ENACH' ? 'Mandate' : 'Terms'}</span>
            </div>
          ))}
        </div>

        {complianceStep === 'TERMS' && (
          <div className={cardClass}>
            <div className="flex items-center gap-2 mb-4">
              <FileText className={`w-4 h-4 ${isDarkMode ? 'text-federalblue-400' : 'text-federalblue-900'}`} />
              <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Terms & Conditions</p>
            </div>

            <div className="space-y-3">
              {[
                { icon: IndianRupee, text: `Loan Amount: ${formatCurrency(loanAmount)} at ${rate}% p.a.` },
                { icon: Calendar, text: `Tenure: ${tenure} months with EMI of ${formatCurrency(emi)}` },
                { icon: CreditCard, text: `Processing Fee: ₹${processingFee} (deducted from disbursal)` },
                { icon: AlertCircle, text: 'Late payment penalty: 2% per month on overdue EMI' },
                { icon: Shield, text: 'Prepayment allowed after 6 months with no foreclosure charges' },
                { icon: Building2, text: 'Governed by RBI regulations and Federal Bank lending policies' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <item.icon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`} />
                  <p className={`text-xs ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>{item.text}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setTermsAccepted(true); setComplianceStep('AADHAAR'); }}
              className="w-full mt-4 py-3.5 bg-federalblue-900 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98]"
            >
              I Accept <Check className="w-4 h-4" />
            </button>
          </div>
        )}

        {complianceStep === 'AADHAAR' && (
          <div className={cardClass}>
            <div className="flex items-center gap-2 mb-4">
              <Fingerprint className={`w-4 h-4 ${isDarkMode ? 'text-federalblue-400' : 'text-federalblue-900'}`} />
              <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Aadhaar e-Sign</p>
            </div>

            <p className={`text-xs mb-4 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              Sending a secure OTP to your Aadhaar-linked mobile ({maskedPhone}) to e-sign your agreement.
            </p>

            {!otpSent ? (
              <button
                onClick={sendOtp}
                className="w-full py-3.5 bg-federalblue-900 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98]"
              >
                <Lock className="w-4 h-4" /> Send Secure OTP
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => { otpRefs.current[i] = el; }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                      className={`w-10 h-12 text-center text-lg font-bold rounded-xl border-2 transition-all focus:outline-none ${
                        otpVerified
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                          : (isDarkMode
                            ? 'border-zinc-700 bg-zinc-800 text-white focus:border-federalblue-500'
                            : 'border-slate-200 bg-white text-slate-900 focus:border-federalblue-500')
                      }`}
                      readOnly={otpVerified}
                    />
                  ))}
                </div>

                {otpVerified ? (
                  <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" /> e-Sign Verified Successfully
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <div className="w-4 h-4 border-2 border-federalblue-900 border-t-transparent rounded-full animate-spin" />
                    <span className={isDarkMode ? 'text-zinc-400' : 'text-slate-500'}>Verifying OTP...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {complianceStep === 'ENACH' && (
          <div className={cardClass}>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className={`w-4 h-4 ${isDarkMode ? 'text-federalblue-400' : 'text-federalblue-900'}`} />
              <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>e-NACH Auto-Repayment</p>
            </div>

            <div className={`rounded-xl p-4 space-y-3 ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-50'}`}>
              <div className="flex justify-between text-xs">
                <span className={isDarkMode ? 'text-zinc-400' : 'text-slate-500'}>Debit Account</span>
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Federal Bank {accountNum}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className={isDarkMode ? 'text-zinc-400' : 'text-slate-500'}>EMI Amount</span>
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{formatCurrency(emi)}/month</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className={isDarkMode ? 'text-zinc-400' : 'text-slate-500'}>Debit Date</span>
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>5th of every month</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className={isDarkMode ? 'text-zinc-400' : 'text-slate-500'}>Duration</span>
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{tenure} months</span>
              </div>
            </div>

            <button
              onClick={() => { setEnachConfirmed(true); setPhase('DISBURSEMENT'); completeDisbursement(); }}
              className="w-full mt-4 py-3.5 bg-gradient-to-r from-federalblue-900 to-federalblue-700 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] shadow-lg"
            >
              Confirm Mandate & Disburse <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderDisbursement = () => {
    const loanAccNo = `FBLPL${Math.floor(Math.random() * 9000000 + 1000000)}`;

    return (
      <div className={`space-y-4 transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 10}%`,
                  width: `${6 + Math.random() * 6}px`,
                  height: `${6 + Math.random() * 6}px`,
                  borderRadius: i % 2 === 0 ? '50%' : '2px',
                  backgroundColor: i % 3 === 0 ? '#f37021' : i % 3 === 1 ? '#004d9c' : '#10b981',
                  animationDelay: `${Math.random() * 1.5}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className={`rounded-2xl overflow-hidden border ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
          <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="absolute w-24 h-24 rounded-full border border-white/20" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
              ))}
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Funds Credited</p>
              <p className="text-3xl font-bold text-white mt-2">{formatCurrency(loanAmount)}</p>
            </div>
          </div>

          <div className={`p-5 space-y-4 ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
            <p className={`text-sm font-medium text-center ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
              Congratulations, {tone.greeting}! Your {tripData.destination} trip is officially a 'Go'! ✈️
            </p>

            <div className={`h-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`} />

            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className={isDarkMode ? 'text-zinc-400' : 'text-slate-500'}>Loan Account</span>
                <span className={`font-bold font-mono ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{loanAccNo}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className={isDarkMode ? 'text-zinc-400' : 'text-slate-500'}>EMI Schedule</span>
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{formatCurrency(emi)} × {tenure} months</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className={isDarkMode ? 'text-zinc-400' : 'text-slate-500'}>First EMI</span>
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>5th April 2026</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className={isDarkMode ? 'text-zinc-400' : 'text-slate-500'}>Interest Rate</span>
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{rate}% p.a.</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className={`w-full py-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${isDarkMode ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Track in Expenditure <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <div className={`h-1 flex-1 rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>
          <div
            className="h-full bg-gradient-to-r from-federalblue-900 to-federalblue-500 rounded-full transition-all duration-700"
            style={{ width: `${progressPercent()}%` }}
          />
        </div>
        <span className={`text-[9px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>
          {Math.round(progressPercent())}%
        </span>
      </div>

      {phase === 'GAP_ANALYSIS' && renderGapAnalysis()}
      {phase === 'PRE_APPROVED' && renderPreApproved()}
      {phase === 'CUSTOMIZATION' && renderCustomization()}
      {phase === 'COMPLIANCE' && renderCompliance()}
      {phase === 'DISBURSEMENT' && renderDisbursement()}
    </div>
  );
};

export default LoanJourneyOrchestrator;
