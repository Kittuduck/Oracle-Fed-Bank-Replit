import React, { useState, useEffect, useRef } from 'react';
import {
  Plane, TrendingUp, Shield, CheckCircle2, Sparkles, ChevronRight,
  IndianRupee, Calendar, Lock, FileText, ArrowRight, PartyPopper,
  CreditCard, Building2, Fingerprint, Smartphone, Check, X, Clock,
  AlertCircle, Wallet, BarChart3, DollarSign, MapPin, Users, Globe,
  Compass, Sun, Send, Upload, FileUp, Loader2, MessageSquare
} from 'lucide-react';

interface LoanJourneyProps {
  persona: any;
  isDarkMode: boolean;
  onComplete: (loanData: LoanData) => void;
  onDismiss: (savedOffer?: { destination: string; amount: number; emi: number; rate: number; tenure: number }) => void;
  onNavigate?: (page: string) => void;
  currentFinancials: { liquid: number; need: number; goal: number };
}

interface LoanData {
  amount: number;
  tenure: number;
  emi: number;
  rate: number;
  accountNumber: string;
  destination?: string;
}

interface TripDetails {
  destination: string;
  emoji: string;
  travelers: number;
  travelerDesc: string;
  days: number;
  cities: string[];
  interests: string[];
  estimatedCost: number;
  breakdown: { flights: number; hotels: number; activities: number; food: number; visa: number };
}

type Phase = 'INTAKE' | 'GAP_ANALYSIS' | 'PRE_APPROVED' | 'CUSTOMIZATION' | 'COMPLIANCE' | 'DISBURSEMENT';
type IntakeStep = 'DESTINATION' | 'TRAVELERS' | 'DURATION' | 'CITIES' | 'ANALYZING';
type ComplianceStep = 'TERMS' | 'AADHAAR' | 'ENACH';

const DESTINATIONS: Record<string, { emoji: string; perPersonPerDay: number; flightBase: number; visaCost: number }> = {
  'Japan': { emoji: '🇯🇵', perPersonPerDay: 8000, flightBase: 55000, visaCost: 3000 },
  'Thailand': { emoji: '🇹🇭', perPersonPerDay: 4000, flightBase: 18000, visaCost: 2500 },
  'Dubai': { emoji: '🇦🇪', perPersonPerDay: 10000, flightBase: 25000, visaCost: 5500 },
  'Singapore': { emoji: '🇸🇬', perPersonPerDay: 9000, flightBase: 22000, visaCost: 2000 },
  'Bali': { emoji: '🇮🇩', perPersonPerDay: 5000, flightBase: 28000, visaCost: 3500 },
  'Europe': { emoji: '🇪🇺', perPersonPerDay: 12000, flightBase: 65000, visaCost: 6000 },
  'Maldives': { emoji: '🇲🇻', perPersonPerDay: 15000, flightBase: 20000, visaCost: 0 },
  'Vietnam': { emoji: '🇻🇳', perPersonPerDay: 3500, flightBase: 22000, visaCost: 2500 },
  'Sri Lanka': { emoji: '🇱🇰', perPersonPerDay: 4500, flightBase: 12000, visaCost: 2000 },
  'Varanasi': { emoji: '🙏', perPersonPerDay: 3000, flightBase: 6000, visaCost: 0 },
  'Goa': { emoji: '🏖️', perPersonPerDay: 4000, flightBase: 5000, visaCost: 0 },
  'Kashmir': { emoji: '🏔️', perPersonPerDay: 3500, flightBase: 7000, visaCost: 0 },
};

const CITY_SUGGESTIONS: Record<string, string[]> = {
  'Japan': ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima', 'Nara', 'Hakone'],
  'Thailand': ['Bangkok', 'Chiang Mai', 'Phuket', 'Krabi', 'Pattaya', 'Koh Samui'],
  'Dubai': ['Downtown Dubai', 'Abu Dhabi', 'Desert Safari', 'Palm Jumeirah'],
  'Singapore': ['Sentosa', 'Marina Bay', 'Chinatown', 'Gardens by the Bay'],
  'Bali': ['Ubud', 'Seminyak', 'Kuta', 'Nusa Dua', 'Uluwatu'],
  'Europe': ['Paris', 'Rome', 'Barcelona', 'Amsterdam', 'London', 'Prague'],
  'Maldives': ['Malé', 'Resort Island', 'Water Villa', 'Snorkeling Tours'],
  'Vietnam': ['Hanoi', 'Ho Chi Minh', 'Ha Long Bay', 'Hoi An', 'Da Nang'],
  'Sri Lanka': ['Colombo', 'Kandy', 'Sigiriya', 'Galle', 'Ella'],
  'Varanasi': ['Ghats', 'Sarnath', 'Allahabad', 'Rishikesh'],
  'Goa': ['North Goa', 'South Goa', 'Old Goa', 'Dudhsagar Falls'],
  'Kashmir': ['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonmarg', 'Dal Lake'],
};

const INTEREST_OPTIONS = ['Culture & History', 'Adventure & Outdoors', 'Food & Cuisine', 'Shopping', 'Relaxation & Spa', 'Nightlife', 'Photography', 'Nature & Wildlife'];

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
  onNavigate,
  currentFinancials
}) => {
  const [phase, setPhase] = useState<Phase>('INTAKE');
  const [intakeStep, setIntakeStep] = useState<IntakeStep>('DESTINATION');
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedDestination, setSelectedDestination] = useState('');
  const [travelerCount, setTravelerCount] = useState(2);
  const [tripDays, setTripDays] = useState(7);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customDestination, setCustomDestination] = useState('');
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [itineraryParsing, setItineraryParsing] = useState(false);
  const [itineraryParsed, setItineraryParsed] = useState(false);
  const [itinerarySummary, setItinerarySummary] = useState('');

  const tone = getPersonaTone(persona);
  const rate = 10.49;
  const processingFee = 999;
  const liquid = currentFinancials?.liquid || persona?.financials?.liquid || 1240500;

  useEffect(() => {
    setAnimateIn(false);
    const timer = setTimeout(() => setAnimateIn(true), 50);
    return () => clearTimeout(timer);
  }, [phase, intakeStep, complianceStep]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'text/plain',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const allowedExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.txt', '.docx'];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();

    if (file.size > maxSize) {
      alert('File size must be under 5MB');
      return;
    }
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(ext)) {
      alert('Please upload a PDF, image (PNG/JPG), TXT, or DOCX file');
      return;
    }

    setUploadedFile(file);
    setItineraryParsing(true);

    setTimeout(() => {
      const personaId = persona?.id || 'advait';
      const defaultDest = personaId === 'kapoor' ? 'Varanasi' : personaId === 'rajesh' ? 'Dubai' : personaId === 'ishan' ? 'Thailand' : personaId === 'anjali' ? 'Singapore' : 'Japan';
      const destData = DESTINATIONS[defaultDest] || DESTINATIONS['Japan'];

      setSelectedDestination(defaultDest);
      setTravelerCount(personaId === 'anjali' ? 4 : personaId === 'advait' ? 3 : personaId === 'ishan' ? 4 : 2);
      setTripDays(personaId === 'kapoor' ? 5 : personaId === 'ishan' ? 8 : 10);
      const cities = CITY_SUGGESTIONS[defaultDest]?.slice(0, 3) || ['City Center', 'Old Town'];
      setSelectedCities(cities);
      setSelectedInterests(['Culture & History', 'Food & Cuisine']);

      setItinerarySummary(`Extracted from "${file.name}": ${defaultDest} trip for ${personaId === 'anjali' ? 4 : personaId === 'advait' ? 3 : personaId === 'ishan' ? 4 : 2} travelers, ${personaId === 'kapoor' ? 5 : personaId === 'ishan' ? 8 : 10} days covering ${cities.join(', ')}.`);
      setItineraryParsing(false);
      setItineraryParsed(true);
    }, 2500);
  };

  const buildTripDetails = (): TripDetails => {
    const dest = selectedDestination || 'Japan';
    const destData = DESTINATIONS[dest] || DESTINATIONS['Japan'];
    const flightCost = destData.flightBase * travelerCount;
    const dailyCost = destData.perPersonPerDay * travelerCount;
    const hotelCost = Math.round(dailyCost * 0.4 * tripDays);
    const hasLuxuryInterests = selectedInterests.some(i => ['Relaxation & Spa', 'Shopping', 'Nightlife'].includes(i));
    const interestMultiplier = hasLuxuryInterests ? 1.15 : 1;
    const notesMultiplier = additionalNotes.length > 0 ? 1.05 : 1;
    const activityCost = Math.round(dailyCost * 0.25 * tripDays * (1 + selectedCities.length * 0.05) * interestMultiplier * notesMultiplier);
    const foodCost = Math.round(dailyCost * 0.2 * tripDays * (selectedInterests.includes('Food & Cuisine') ? 1.1 : 1));
    const visaCost = destData.visaCost * travelerCount;
    const totalCost = flightCost + hotelCost + activityCost + foodCost + visaCost;

    let travelerDesc = `${travelerCount} traveler${travelerCount > 1 ? 's' : ''}`;
    if (persona?.id === 'advait' && travelerCount <= 3) travelerDesc = travelerCount === 3 ? 'you, spouse & Riya' : travelerDesc;
    if (persona?.id === 'anjali' && travelerCount === 4) travelerDesc = 'you, spouse, Meera & Arjun';

    return {
      destination: dest,
      emoji: destData.emoji,
      travelers: travelerCount,
      travelerDesc,
      days: tripDays,
      cities: selectedCities,
      interests: selectedInterests,
      estimatedCost: totalCost,
      breakdown: { flights: flightCost, hotels: hotelCost, activities: activityCost, food: foodCost, visa: visaCost }
    };
  };

  const startAnalysis = () => {
    setIntakeStep('ANALYZING');
    const details = buildTripDetails();
    setTimeout(() => {
      setTripDetails(details);
      const savings = Math.min(liquid * 0.4, details.estimatedCost * 0.6);
      const shortfall = Math.max(details.estimatedCost - savings, 25000);
      setLoanAmount(Math.round(shortfall));
      setPhase('GAP_ANALYSIS');
    }, 2000);
  };

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
    setTimeout(() => setShowConfetti(false), 6500);
    onComplete({
      amount: loanAmount,
      tenure,
      emi,
      rate,
      accountNumber: 'XXXX XXXX 4821',
      destination: tripDetails?.destination || selectedDestination
    });
  };

  const progressPercent = () => {
    if (phase === 'INTAKE') return 5;
    const phases: Phase[] = ['INTAKE', 'GAP_ANALYSIS', 'PRE_APPROVED', 'CUSTOMIZATION', 'COMPLIANCE', 'DISBURSEMENT'];
    return ((phases.indexOf(phase)) / (phases.length - 1)) * 100;
  };

  const cardClass = `rounded-2xl p-5 border transition-all duration-500 ${isDarkMode
    ? 'bg-zinc-900 border-zinc-800'
    : 'bg-white border-slate-100 shadow-sm'}`;

  const chipClass = (selected: boolean) => `px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
    selected
      ? (isDarkMode ? 'bg-federalblue-900 border-federalblue-700 text-white' : 'bg-federalblue-900 border-federalblue-900 text-white')
      : (isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-400')
  }`;

  const oracleMsgClass = `text-sm leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`;
  const labelClass = `text-[10px] font-bold uppercase tracking-widest mb-3 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`;

  const renderIntake = () => (
    <div className={`space-y-4 transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {intakeStep === 'DESTINATION' && (
        <div className={cardClass}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className={`w-4 h-4 ${isDarkMode ? 'text-federalgold-400' : 'text-federalgold-600'}`} />
            <p className={labelClass} style={{marginBottom: 0}}>Oracle Travel Bridge</p>
          </div>
          <p className={oracleMsgClass}>
            That sounds exciting, {tone.greeting}! ✈️ I'd love to help you plan this. Let me understand your trip first — <strong>where are you thinking of going?</strong>
          </p>

          <div className={`mt-4 rounded-xl border-2 border-dashed p-4 text-center transition-all ${
            itineraryParsed
              ? (isDarkMode ? 'border-emerald-700 bg-emerald-900/10' : 'border-emerald-300 bg-emerald-50')
              : itineraryParsing
                ? (isDarkMode ? 'border-federalblue-700 bg-federalblue-900/10' : 'border-federalblue-300 bg-federalblue-50')
                : (isDarkMode ? 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-500' : 'border-slate-200 bg-slate-50 hover:border-slate-400')
          }`}>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.txt,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />

            {itineraryParsing ? (
              <div className="py-3">
                <Loader2 className={`w-6 h-6 mx-auto mb-2 animate-spin ${isDarkMode ? 'text-federalblue-400' : 'text-federalblue-600'}`} />
                <p className={`text-xs font-semibold ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>Parsing your itinerary...</p>
                <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Extracting destination, travelers, duration & cities</p>
              </div>
            ) : itineraryParsed ? (
              <div className="py-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className={`text-xs font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Itinerary Parsed</span>
                </div>
                <p className={`text-[11px] ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{itinerarySummary}</p>
                <button
                  onClick={() => { setUploadedFile(null); setItineraryParsed(false); setItinerarySummary(''); }}
                  className={`mt-2 text-[10px] font-semibold ${isDarkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Remove & choose manually
                </button>
              </div>
            ) : (
              <button onClick={() => fileInputRef.current?.click()} className="w-full py-3">
                <Upload className={`w-6 h-6 mx-auto mb-2 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`} />
                <p className={`text-xs font-semibold ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>Have a ready itinerary? Upload it</p>
                <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>PDF, PNG, JPG, DOCX or TXT — max 5MB</p>
              </button>
            )}
          </div>

          {!itineraryParsed && !itineraryParsing && (
            <>
              <div className={`flex items-center gap-3 my-4 ${isDarkMode ? 'text-zinc-600' : 'text-slate-300'}`}>
                <div className="flex-1 h-px bg-current" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Or choose below</span>
                <div className="flex-1 h-px bg-current" />
              </div>

              <div>
                <p className={labelClass}>Popular Destinations</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(DESTINATIONS).map(([name, data]) => (
                    <button
                      key={name}
                      onClick={() => setSelectedDestination(name)}
                      className={chipClass(selectedDestination === name)}
                    >
                      {data.emoji} {name}
                    </button>
                  ))}
                </div>

                <div className="mt-3">
                  <div className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 ${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-slate-50 border-slate-200'}`}>
                    <MapPin className={`w-3.5 h-3.5 flex-shrink-0 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`} />
                    <input
                      type="text"
                      placeholder="Or type a different destination..."
                      value={customDestination}
                      onChange={e => { setCustomDestination(e.target.value); if (e.target.value) setSelectedDestination(''); }}
                      className={`flex-1 bg-transparent text-xs outline-none ${isDarkMode ? 'text-white placeholder-zinc-600' : 'text-slate-900 placeholder-slate-400'}`}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <button
            onClick={() => {
              if (itineraryParsed) {
                startAnalysis();
                return;
              }
              if (customDestination && !selectedDestination) {
                const match = Object.keys(DESTINATIONS).find(d => d.toLowerCase() === customDestination.toLowerCase());
                setSelectedDestination(match || customDestination);
                if (!match) {
                  DESTINATIONS[customDestination] = { emoji: '🌍', perPersonPerDay: 7000, flightBase: 40000, visaCost: 4000 };
                  CITY_SUGGESTIONS[customDestination] = ['City Center', 'Old Town', 'Coastal Area', 'Mountain Region'];
                }
              }
              setIntakeStep('TRAVELERS');
            }}
            disabled={!selectedDestination && !customDestination && !itineraryParsed}
            className="w-full mt-4 py-3 bg-federalblue-900 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {itineraryParsed ? <><Sparkles className="w-4 h-4" /> Analyze My Trip</> : <>Continue <ArrowRight className="w-4 h-4" /></>}
          </button>
        </div>
      )}

      {intakeStep === 'TRAVELERS' && (
        <div className={cardClass}>
          <p className={oracleMsgClass}>
            {(DESTINATIONS[selectedDestination]?.emoji || '🌍')} <strong>{selectedDestination || customDestination}</strong> — great choice! Now, <strong>how many people are travelling</strong>, and <strong>how many days</strong> are you planning for?
          </p>

          <div className="mt-4 space-y-5">
            <div>
              <p className={labelClass}>
                <Users className="w-3 h-3 inline mr-1" /> Number of Travelers
              </p>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                  <button
                    key={n}
                    onClick={() => setTravelerCount(n)}
                    className={`py-2.5 rounded-xl text-sm font-bold transition-all ${
                      travelerCount === n
                        ? 'bg-federalblue-900 text-white shadow-md'
                        : (isDarkMode ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100')
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <p className={labelClass} style={{marginBottom: 0}}>
                  <Calendar className="w-3 h-3 inline mr-1" /> Trip Duration
                </p>
                <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{tripDays} days</span>
              </div>
              <input
                type="range"
                min={3}
                max={45}
                step={1}
                value={tripDays}
                onChange={e => setTripDays(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #004d9c ${((tripDays - 3) / 42) * 100}%, ${isDarkMode ? '#27272a' : '#e2e8f0'} ${((tripDays - 3) / 42) * 100}%)`
                }}
              />
              <div className="flex justify-between text-[10px] mt-1">
                <span className={isDarkMode ? 'text-zinc-600' : 'text-slate-300'}>3 days</span>
                <span className={isDarkMode ? 'text-zinc-600' : 'text-slate-300'}>45 days</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIntakeStep('CITIES')}
            className="w-full mt-4 py-3 bg-federalblue-900 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98]"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {intakeStep === 'CITIES' && (
        <div className={cardClass}>
          <p className={oracleMsgClass}>
            {travelerCount} traveler{travelerCount > 1 ? 's' : ''}, {tripDays} days in {selectedDestination} — sounds wonderful! 🗺️ <strong>Which places do you want to cover?</strong> And what kind of experiences are you looking for?
          </p>

          <div className="mt-4 space-y-5">
            <div>
              <p className={labelClass}>
                <MapPin className="w-3 h-3 inline mr-1" /> Places to Visit
              </p>
              <div className="flex flex-wrap gap-2">
                {(CITY_SUGGESTIONS[selectedDestination] || ['City Center', 'Historical Sites', 'Beaches', 'Mountains']).map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCities(prev => prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city])}
                    className={chipClass(selectedCities.includes(city))}
                  >
                    {selectedCities.includes(city) && <Check className="w-3 h-3 inline mr-1" />}
                    {city}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className={labelClass}>
                <Compass className="w-3 h-3 inline mr-1" /> Travel Interests
              </p>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map(interest => (
                  <button
                    key={interest}
                    onClick={() => setSelectedInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest])}
                    className={chipClass(selectedInterests.includes(interest))}
                  >
                    {selectedInterests.includes(interest) && <Check className="w-3 h-3 inline mr-1" />}
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className={labelClass}>
                <MessageSquare className="w-3 h-3 inline mr-1" /> Anything Else?
              </p>
              <textarea
                value={additionalNotes}
                onChange={e => setAdditionalNotes(e.target.value)}
                placeholder={`e.g. "We want to try street food in ${selectedDestination}", "Need wheelchair-accessible hotels", "Budget-friendly options preferred"...`}
                rows={3}
                className={`w-full rounded-xl border px-3 py-2.5 text-xs resize-none outline-none transition-all ${
                  isDarkMode
                    ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-600 focus:border-federalblue-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-federalblue-500'
                }`}
              />
            </div>
          </div>

          <button
            onClick={startAnalysis}
            disabled={selectedCities.length === 0 && additionalNotes.trim().length === 0}
            className="w-full mt-4 py-3 bg-gradient-to-r from-federalblue-900 to-federalblue-700 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4" /> Analyze My Trip
          </button>
        </div>
      )}

      {intakeStep === 'ANALYZING' && (
        <div className={cardClass}>
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-federalblue-900 to-federalblue-600 flex items-center justify-center mb-4 shadow-lg">
              <Globe className="w-6 h-6 text-white animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Oracle is building your itinerary</h4>
            <p className={`text-xs mt-2 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
              Estimating costs for {travelerCount} travelers, {tripDays} days in {selectedDestination}...
            </p>
            <div className="mt-4 flex gap-1">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-federalblue-900 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderGapAnalysis = () => {
    if (!tripDetails) return null;
    const savings = Math.min(liquid * 0.4, tripDetails.estimatedCost * 0.6);
    const shortfall = Math.max(tripDetails.estimatedCost - savings, 25000);
    const savingsPercent = Math.round((savings / tripDetails.estimatedCost) * 100);
    const shortfallPercent = 100 - savingsPercent;

    return (
      <div className={`space-y-4 transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className={cardClass}>
          <p className={`${oracleMsgClass} mb-4`}>
            Here's what I've put together for your <strong>{tripDetails.destination}</strong> trip, {tone.greeting}. Let me break down the finances:
          </p>

          <div className="flex items-center gap-2 mb-4">
            <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-zinc-800' : 'bg-federalblue-50'}`}>
              <Plane className={`w-4 h-4 ${isDarkMode ? 'text-federalblue-400' : 'text-federalblue-900'}`} />
            </div>
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Trip Estimate</p>
              <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{tripDetails.destination} {tripDetails.emoji} · {tripDetails.days} days · {tripDetails.travelers} traveler{tripDetails.travelers > 1 ? 's' : ''}</p>
            </div>
          </div>

          {tripDetails.cities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tripDetails.cities.map(city => (
                <span key={city} className={`text-[10px] px-2 py-1 rounded-full font-medium ${isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-slate-100 text-slate-500'}`}>
                  📍 {city}
                </span>
              ))}
            </div>
          )}

          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className={isDarkMode ? 'text-zinc-400' : 'text-slate-500'}>Total Estimated Cost</span>
              <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{formatCurrency(tripDetails.estimatedCost)}</span>
            </div>

            <div className="space-y-1.5">
              {[
                { label: 'Flights', value: tripDetails.breakdown.flights },
                { label: 'Hotels & Stays', value: tripDetails.breakdown.hotels },
                { label: 'Activities & Sightseeing', value: tripDetails.breakdown.activities },
                { label: 'Food & Dining', value: tripDetails.breakdown.food },
                ...(tripDetails.breakdown.visa > 0 ? [{ label: 'Visa & Insurance', value: tripDetails.breakdown.visa }] : [])
              ].map(item => (
                <div key={item.label} className="flex justify-between text-[11px]">
                  <span className={isDarkMode ? 'text-zinc-500' : 'text-slate-400'}>{item.label}</span>
                  <span className={isDarkMode ? 'text-zinc-300' : 'text-slate-600'}>{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>

            <div className={`h-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`} />

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Your Available Savings</span>
                <span className="text-xs font-bold text-emerald-600">{formatCurrency(Math.round(savings))}</span>
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
                You're {formatCurrency(Math.round(shortfall))} away from making this {tripDetails.destination} trip happen.
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
          Based on your profile and this {tripDetails?.destination} plan, I've unlocked a <span className={`font-bold ${isDarkMode ? 'text-federalblue-400' : 'text-federalblue-900'}`}>pre-approved personal loan offer</span> to bridge this gap instantly, {tone.greeting}.
        </p>

        <div className={`rounded-xl overflow-hidden border ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
          <div className="bg-gradient-to-r from-federalblue-900 to-federalblue-700 p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] text-federalblue-200 font-bold uppercase tracking-widest">Eligible Amount</p>
                <p className="text-2xl font-bold text-white mt-1">Up to {formatCurrency(Math.round(loanAmount * 2))}</p>
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
        onClick={() => onDismiss({
          destination: tripDetails?.destination || selectedDestination || 'Travel',
          amount: loanAmount,
          emi,
          rate,
          tenure
        })}
        className={`w-full py-3 text-xs font-medium rounded-xl transition-all ${isDarkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-slate-400 hover:text-slate-600'}`}
      >
        Maybe later
      </button>
    </div>
  );

  const renderCustomization = () => {
    const minLoan = 25000;
    const maxLoan = Math.round(loanAmount * 2);
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
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #004d9c ${((loanAmount - minLoan) / (maxLoan - minLoan)) * 100}%, ${isDarkMode ? '#27272a' : '#e2e8f0'} ${((loanAmount - minLoan) / (maxLoan - minLoan)) * 100}%)`
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
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #004d9c ${((tenure - minTenure) / (maxTenure - minTenure)) * 100}%, ${isDarkMode ? '#27272a' : '#e2e8f0'} ${((tenure - minTenure) / (maxTenure - minTenure)) * 100}%)`
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
                          ? (isDarkMode ? 'border-emerald-500 bg-emerald-900/20 text-emerald-400' : 'border-emerald-500 bg-emerald-50 text-emerald-700')
                          : (isDarkMode
                            ? 'border-zinc-700 bg-zinc-800 text-white focus:border-federalblue-500'
                            : 'border-slate-200 bg-white text-slate-900 focus:border-federalblue-500')
                      }`}
                      readOnly={otpVerified}
                    />
                  ))}
                </div>

                {otpVerified ? (
                  <div className={`flex items-center justify-center gap-2 text-xs font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
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

  const loanAccNoRef = useRef(`FBLPL${Math.floor(Math.random() * 9000000 + 1000000)}`);

  const renderDisbursement = () => {
    const loanAccNo = loanAccNoRef.current;

    return (
      <div className={`space-y-4 transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {Array.from({ length: 80 }).map((_, i) => {
              const colors = ['#f37021', '#004d9c', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#ef4444'];
              const variant = (i % 3) + 1;
              const shapes = ['50%', '2px', '0'];
              return (
                <div
                  key={i}
                  className={`absolute animate-confetti-${variant}`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-${Math.random() * 15}%`,
                    width: `${8 + Math.random() * 10}px`,
                    height: `${8 + Math.random() * 10}px`,
                    borderRadius: shapes[i % 3],
                    backgroundColor: colors[i % colors.length],
                    animationDelay: `${Math.random() * 2.5}s`,
                    animationDuration: `${3 + Math.random() * 3}s`,
                    boxShadow: `0 0 ${4 + Math.random() * 4}px ${colors[i % colors.length]}66`,
                  }}
                />
              );
            })}
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
              Congratulations, {tone.greeting}! Your {tripDetails?.destination} trip is officially a 'Go'! ✈️
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

        <div className="flex gap-2">
          <button
            onClick={() => { onDismiss(); onNavigate?.('LOANS'); }}
            className="flex-1 py-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all bg-federalblue-900 text-white hover:opacity-90"
          >
            Track My Loan <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => { onDismiss(); onNavigate?.('DASHBOARD'); }}
            className={`flex-1 py-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${isDarkMode ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            Go to Dashboard <ArrowRight className="w-3 h-3" />
          </button>
        </div>
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

      {phase === 'INTAKE' && renderIntake()}
      {phase === 'GAP_ANALYSIS' && renderGapAnalysis()}
      {phase === 'PRE_APPROVED' && renderPreApproved()}
      {phase === 'CUSTOMIZATION' && renderCustomization()}
      {phase === 'COMPLIANCE' && renderCompliance()}
      {phase === 'DISBURSEMENT' && renderDisbursement()}
    </div>
  );
};

export default LoanJourneyOrchestrator;
