import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ArrowRight, Shield, Zap, Compass, AlertTriangle, TrendingUp, Calendar, CheckCircle2, Sparkles, X, FileUp, Loader2, Check, FileCheck, File, Mic, Volume2 } from 'lucide-react';
import { chatWithOrchestrator, SimulationUpdateData, NewGoalData } from '../services/geminiService';
import TradeOffVisualizer from './TradeOffVisualizer';
import LoanJourneyOrchestrator from './LoanJourneyOrchestrator';
import type { LoanJourneyHandle } from './LoanJourneyOrchestrator';

interface EmbeddedOrchestratorChatProps {
    onUpdateSimulation: (data: SimulationUpdateData) => void;
    onAddGoal: (data: NewGoalData) => void;
    onNavigateToGoals: () => void;
    onNavigateToPortfolio: () => void;
    onNavigateToExpenditure: () => void;
    onNavigateToDashboard: () => void;
    onPayCCBill: () => void;
    onNavigate?: (page: string) => void;
    onLoanDisbursed?: (loanData: { amount: number; emi: number; tenure: number; rate: number; destination?: string }) => void;
    onSaveLoanOffer?: (offer: { destination: string; amount: number; emi: number; rate: number; tenure: number }) => void;
    currentFinancials: { liquid: number, need: number, goal: number };
    oracleActive: boolean;
    initialPrompt?: string;
    persona?: any;
    isDarkMode?: boolean;
}

interface Message {
    id: string;
    role: 'user' | 'model';
    content: React.ReactNode;
    text: string;
    state?: 'AUTONOMY' | 'GUIDANCE' | 'PROTECTION';
    actions?: string[];
    simulation?: SimulationUpdateData;
}

const briefTypeToIcon = (type: string) => {
    switch (type) {
        case 'protection': return AlertTriangle;
        case 'alert': return Zap;
        case 'opportunity': return TrendingUp;
        case 'insight': return Compass;
        default: return Sparkles;
    }
};

const briefTypeToColor = (type: string) => {
    switch (type) {
        case 'protection': return 'federalgold';
        case 'alert': return 'emerald';
        case 'opportunity': return 'federalblue';
        case 'insight': return 'federalblue';
        default: return 'federalblue';
    }
};

const briefTypeToState = (type: string): 'PROTECTION' | 'GUIDANCE' | 'AUTONOMY' => {
    switch (type) {
        case 'protection': return 'PROTECTION';
        case 'alert': return 'PROTECTION';
        case 'opportunity': return 'AUTONOMY';
        case 'insight': return 'GUIDANCE';
        default: return 'GUIDANCE';
    }
};

const EmbeddedOrchestratorChat: React.FC<EmbeddedOrchestratorChatProps> = ({
    onUpdateSimulation,
    onAddGoal,
    onNavigateToGoals,
    onNavigateToPortfolio,
    onNavigateToExpenditure,
    onNavigateToDashboard,
    onPayCCBill,
    onNavigate,
    onLoanDisbursed,
    onSaveLoanOffer,
    currentFinancials,
    initialPrompt,
    persona,
    isDarkMode = false
}) => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);
    const handleSendRef = useRef<(text?: string) => void>(() => {});
    const loanJourneyRef = useRef<LoanJourneyHandle | null>(null);

    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'IDLE' | 'UPLOADING' | 'SUCCESS'>('IDLE');
    const [uploadSlot, setUploadSlot] = useState<number | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>([null, null, null, null]);
    const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
    const [displayedText, setDisplayedText] = useState<{ [key: string]: string }>({});
    const [loanJourneyActive, setLoanJourneyActive] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.files && e.target.files[0]) {
            const newFiles = [...selectedFiles];
            newFiles[index] = e.target.files[0];
            setSelectedFiles(newFiles);
        }
    };

    const handleUpload = () => {
        const activeFiles = selectedFiles.filter(f => f !== null);
        if (activeFiles.length === 0) return;

        setUploadStatus('UPLOADING');
        setTimeout(() => {
            setUploadStatus('SUCCESS');
            setTimeout(() => {
                setIsUploadModalOpen(false);
                setUploadStatus('IDLE');
                setSelectedFiles([null, null, null, null]);
                handleSend(`I've uploaded my ${activeFiles.length > 1 ? 'documents' : 'itinerary'}.`);
            }, 1500);
        }, 2500);
    };

    const renderWindfallOptions = () => (
        <div className="space-y-4 animate-fade-in">
            <p>You've received a ₹15L windfall. There are three strong ways to use this, depending on your priority right now:</p>

            <div className="space-y-3">
                <div className="p-3 bg-white/80 dark:bg-white/5 rounded-lg border border-[#E0E0E0] dark:border-slate-700/50 opacity-80">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">Option A — Accelerate Independence</p>
                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 text-xs pl-1 mt-1 space-y-0.5 opacity-90">
                        <li>Invest ₹10L into long-term growth</li>
                        <li>Retire ~2 years earlier</li>
                    </ul>
                </div>

                <div className="p-3 bg-white/80 dark:bg-white/5 rounded-lg border border-[#E0E0E0] dark:border-slate-700/50 opacity-80">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">Option B — Strengthen Family Protection</p>
                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 text-xs pl-1 mt-1 space-y-0.5 opacity-90">
                        <li>Boost medical & emergency buffers</li>
                        <li>Reduce downside risk</li>
                    </ul>
                </div>

                <div className="p-3 bg-white dark:bg-white/10 rounded-lg border border-emerald-500/30 dark:border-emerald-500/30 relative overflow-hidden cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors shadow-sm" onClick={() => handleSend('Option C — Balance')}>
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-600"></div>
                    <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">Option C — Balance</p>
                        <span className="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">Recommended</span>
                    </div>
                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 text-xs pl-1 mt-1 space-y-0.5 opacity-90">
                        <li>Split between growth, safety, and tax optimization</li>
                        <li>Improves FIRE timeline and resilience</li>
                    </ul>
                </div>
            </div>
        </div>
    );

    const buildInitialMessage = (): Message => {
        const briefs = persona?.oracleBriefs || [];
        const personaName = persona?.name || 'User';
        const primaryState = briefs.length > 0 ? briefTypeToState(briefs[0].type) : 'PROTECTION';

        const actions = briefs.length > 0
            ? briefs.slice(0, 3).map((b: any) => b.actionLabel || b.title)
            : ['Review Anomaly', 'Pay Credit Card Bill', 'Track Goals'];

        const allActions = [...actions, 'Track Goals', 'Review Portfolio'].filter((v, i, a) => a.indexOf(v) === i).slice(0, 5);

        return {
            id: 'init',
            role: 'model',
            state: primaryState,
            text: "Daily Financial Brief",
            content: (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-900 dark:text-white">Good Morning, {personaName}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">Your Daily Financial Brief</p>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">Today, 9:00 AM</span>
                    </div>
                    <div className="space-y-0.5">
                        {briefs.length > 0 ? briefs.slice(0, 3).map((brief: any, idx: number) => {
                            const Icon = briefTypeToIcon(brief.type);
                            const color = briefTypeToColor(brief.type);
                            return (
                                <BriefingItem
                                    key={brief.id || idx}
                                    icon={Icon}
                                    color={color}
                                    title={brief.title}
                                    subtitle={brief.summary.length > 80 ? brief.summary.substring(0, 80) + '...' : brief.summary}
                                    pulse={idx === 0}
                                />
                            );
                        }) : (
                            <>
                                <BriefingItem icon={AlertTriangle} color="federalgold" title="Anomaly Detected" subtitle="Unusual transaction at Club Aqua, London." pulse />
                                <BriefingItem icon={Zap} color="emerald" title="Windfall Detected" subtitle="ESOP sales credited. Allocation pending." />
                                <BriefingItem icon={Calendar} color="federalblue" title="Credit Card Bill Due" subtitle="Due in 3 days. Balance: ₹1.2L" />
                            </>
                        )}
                    </div>
                    <p className="text-xs text-slate-500 pt-2 border-t border-[#E0E0E0] dark:border-slate-800">Select a priority to analyze:</p>
                </div>
            ),
            actions: allActions
        };
    };

    const [messages, setMessages] = useState<Message[]>([buildInitialMessage()]);

    useEffect(() => {
        setMessages([buildInitialMessage()]);
        processedPromptRef.current = false;
    }, [persona?.id]);

    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
                recognitionRef.current = null;
            }
        };
    }, []);

    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const processedPromptRef = useRef(false);
    useEffect(() => {
        if (initialPrompt && !processedPromptRef.current && messages.length === 1) {
            processedPromptRef.current = true;
            setTimeout(() => {
                handleSend(initialPrompt);
            }, 500);
        }
    }, [initialPrompt, messages.length]);

    const startVoiceInput = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Voice input is not supported in this browser. Please use Chrome or Edge.');
            return;
        }

        if (recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current = null;
            setIsListening(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN';
        recognition.interimResults = true;
        recognition.continuous = false;
        recognition.maxAlternatives = 1;
        recognitionRef.current = recognition;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: any) => {
            let finalTranscript = '';
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }
            if (finalTranscript) {
                setInput(finalTranscript);
                setTimeout(() => handleSendRef.current(finalTranscript), 300);
            } else {
                setInput(interimTranscript);
            }
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
            if (event.error === 'not-allowed') {
                alert('Microphone access was denied. Please allow microphone permissions in your browser settings.');
            }
        };

        recognition.onend = () => {
            setIsListening(false);
            recognitionRef.current = null;
        };

        recognition.start();
    };

    const handleSend = async (text: string = input) => {
        if (!text.trim()) return;

        if (text === "Upload itinerary" || text === "Upload flight/hotel booking") {
            setIsUploadModalOpen(true);
            return;
        }

        if (text === "View Dashboard") { onNavigateToDashboard(); return; }
        if (text === "Pay Credit Card Bill") { onPayCCBill(); return; }
        if (text === "Track Goals" || text === "View Strategic Goals" || text === "View Updated Goals") { onNavigateToGoals(); return; }
        if (text === "Review Portfolio") { onNavigateToPortfolio(); return; }
        if (text === "Review Expenditure" || text === "Review Anomaly" || text === "Track in Expenditure") { onNavigateToExpenditure(); return; }
        if (text === "View My Loans") { onNavigate?.('LOANS'); return; }

        if (text === "Windfall Allocation") {
            const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, text };
            setMessages(prev => [...prev, userMsg]);
            setInput('');
            setLoading(true);

            setTimeout(() => {
                const aiMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'model',
                    state: 'GUIDANCE',
                    text: "Windfall Options",
                    content: renderWindfallOptions()
                };
                setMessages(prev => [...prev, aiMsg]);
                setLoading(false);
            }, 800);
            return;
        }

        const isTripRelated = (msg: string): boolean => {
            const t = msg.toLowerCase();
            const words = ['trip', 'travel', 'travelling', 'traveling', 'vacation', 'holiday', 'abroad', 'international', 'overseas', 'foreign', 'flight', 'tour', 'japan', 'dubai', 'thailand', 'singapore', 'varanasi', 'goa', 'kashmir', 'bali', 'europe', 'maldives', 'vietnam', 'sri lanka', 'srilanka'];
            if (words.some(w => t.includes(w))) return true;
            const phrases = [
                /plan.*(trip|vacation|holiday|travel)/,
                /afford.*(trip|travel|vacation)/,
                /go\s+(abroad|somewhere|on\s+a)/,
                /visit\s+another\s+country/,
                /see\s+the\s+world/,
                /outside\s+india/,
                /fund.*(trip|travel)/,
                /funding\s+gap/,
                /extra\s+funds/,
                /additional\s+(money|amount|funds)/,
                /fall\s+short/,
                /enough\s+money/,
                /financial.*(stress|support)/,
                /shortfall/,
                /explore\s+another\s+country/,
                /take\s+(a|my|an|the)\s+(family\s+)?(trip|vacation|holiday)/,
                /go\s+on\s+(a|an)\s+(trip|vacation|holiday)/,
                /thinking\s+(of|about)\s+(travel|going|a\s+trip)/,
                /interested\s+in.*(travel|trip)/,
                /help\s+(me\s+)?plan/,
                /considering\s+travel/,
                /travel\s+(is\s+)?on\s+my\s+mind/,
                /travel\s+(budget|expenses|plans|planning)/,
                /family\s+(trip|vacation|holiday|travel)/,
            ];
            return phrases.some(p => p.test(t));
        };

        if (!loanJourneyActive && isTripRelated(text)) {
            const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, text };
            setMessages(prev => [...prev, userMsg]);
            setInput('');
            setLoading(true);
            setLoanJourneyActive(true);

            setTimeout(() => {
                const aiMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'model',
                    state: 'GUIDANCE',
                    text: "Travel Bridge - Loan Journey",
                    content: (
                        <LoanJourneyOrchestrator
                            voiceRef={loanJourneyRef}
                            persona={persona}
                            isDarkMode={isDarkMode}
                            currentFinancials={currentFinancials}
                            onNavigate={onNavigate}
                            onComplete={(loanData) => {
                                onLoanDisbursed?.({
                                    amount: loanData.amount,
                                    emi: loanData.emi,
                                    tenure: loanData.tenure,
                                    rate: loanData.rate,
                                    destination: loanData.destination
                                });
                            }}
                            onDismiss={(savedOffer) => {
                                setLoanJourneyActive(false);
                                if (savedOffer) {
                                    onSaveLoanOffer?.(savedOffer);
                                    const dismissMsg: Message = {
                                        id: (Date.now() + 3).toString(),
                                        role: 'model',
                                        state: 'GUIDANCE',
                                        text: "No problem! This offer is saved in your 'Discover' section on the dashboard. Tap on it anytime to resume.",
                                        content: <p>No problem! This offer is saved in your <strong>'Discover'</strong> section on the dashboard. Tap on it anytime to resume.</p>,
                                        actions: ['View Dashboard', 'Track Goals']
                                    };
                                    setMessages(prev => [...prev, dismissMsg]);
                                }
                            }}
                        />
                    )
                };
                setMessages(prev => [...prev, aiMsg]);
                setLoading(false);
            }, 1000);
            return;
        }

        if (loanJourneyActive && loanJourneyRef.current) {
            const handled = loanJourneyRef.current.handleVoiceCommand(text);
            if (handled) {
                setInput('');
                return;
            }
        }

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const history = messages.filter(m => m.id !== 'init').map(m => ({ role: m.role, parts: [{ text: m.text }] }));
            const response = await chatWithOrchestrator(history, text, currentFinancials, persona ? {
                name: persona.name,
                age: persona.age,
                role: persona.role,
                goals: persona.goals.map((g: any) => g.title).join(', '),
                frustrations: ''
            } : undefined);

            const aiMsgId = (Date.now() + 1).toString();
            const aiMsg: Message = {
                id: aiMsgId,
                role: 'model',
                text: response.textResponse,
                content: null,
                state: response.state,
                actions: response.suggestedActions,
                simulation: response.simulationUpdate
            };

            setMessages(prev => [...prev, aiMsg]);
            setStreamingMessageId(aiMsgId);

            let currentText = "";
            const fullText = response.textResponse;
            const speechMarks = fullText.split(' ');

            for (let i = 0; i < speechMarks.length; i++) {
                currentText += (i === 0 ? "" : " ") + speechMarks[i];
                setDisplayedText(prev => ({ ...prev, [aiMsgId]: currentText }));
                await new Promise(resolve => setTimeout(resolve, 40 + Math.random() * 40));
            }

            setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, content: formatMessageText(fullText) } : m));
            setStreamingMessageId(null);

            if (response.simulationUpdate) onUpdateSimulation(response.simulationUpdate);
            if (response.newGoalData) onAddGoal(response.newGoalData);
        } catch (e) {
            setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Error", content: "I'm having trouble analyzing that. Let's try again.", state: 'GUIDANCE' }]);
        } finally {
            setLoading(false);
        }
    };

    handleSendRef.current = handleSend;

    return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-[#15161a] transition-colors relative">
            <div className="flex-1 overflow-y-auto min-h-0 p-6 space-y-6" ref={scrollRef}>
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-200 dark:bg-slate-700' : 'bg-federalblue-900 dark:bg-federalblue-900/20 text-white dark:text-federalblue-400'
                            }`}>
                            {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                        </div>
                        <div className={`flex flex-col ${msg.id === 'init' ? 'flex-1' : 'max-w-[85%]'} ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            {msg.role === 'model' && msg.state && (
                                <div className={`inline-flex items-center gap-1 mb-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border ${getStateColor(msg.state)}`}>
                                    {getStateIcon(msg.state)} {msg.state}
                                </div>
                            )}
                            <div className={`px-4 py-3 rounded-xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm transition-all duration-300 ${msg.role === 'user'
                                ? 'bg-federalblue-900 text-white rounded-tr-sm'
                                : 'bg-white dark:bg-[#1c1e24] text-[#333333] dark:text-slate-200 border border-[#E0E0E0] dark:border-slate-800 rounded-tl-sm'
                                } ${msg.id === 'init' ? 'w-full' : ''}`}>
                                {msg.content || (
                                    <div className="flex flex-col">
                                        <span>{displayedText[msg.id] || ""}</span>
                                        {streamingMessageId === msg.id && (
                                            <span className="w-1.5 h-4 bg-federalblue-900 dark:bg-federalblue-400 inline-block ml-1 animate-pulse align-middle"></span>
                                        )}
                                    </div>
                                )}
                                {msg.role === 'model' && msg.simulation && !streamingMessageId && (
                                    <div className="mt-4">
                                        <TradeOffVisualizer
                                            liquidCash={msg.simulation.liquidCash}
                                            immediateNeed={msg.simulation.immediateNeed}
                                            longTermGoal={msg.simulation.longTermGoal}
                                            analysis={msg.simulation.analysis}
                                        />
                                    </div>
                                )}
                            </div>
                            {msg.actions && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {msg.actions.map(action => (
                                        <button
                                            key={action}
                                            onClick={() => handleSend(action)}
                                            className={`px-4 py-2 bg-white dark:bg-federalblue-900/10 border border-federalblue-200 dark:border-federalblue-800 hover:bg-federalblue-50 dark:hover:bg-federalblue-900/20 text-xs font-semibold text-federalblue-900 dark:text-federalblue-300 rounded-lg shadow-sm transition-all flex items-center gap-1.5`}
                                        >
                                            {action} <ArrowRight className="w-3 h-3 opacity-60" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {loading && <div className="flex items-center gap-2 text-slate-400 text-xs ml-12 animate-pulse"><Sparkles className="w-3 h-3 animate-spin text-federalblue-900" /> Oracle is thinking...</div>}
            </div>

            <div className="shrink-0 p-4 bg-white dark:bg-[#15161a] border-t border-[#E0E0E0] dark:border-slate-800 sticky bottom-0 z-10">
                <div className="relative flex items-center gap-2">
                    <button
                        onClick={startVoiceInput}
                        className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all shrink-0 border ${
                            isListening
                                ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 animate-pulse'
                                : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-federalblue-900 dark:hover:text-white hover:border-federalblue-300 dark:hover:border-federalblue-700'
                        }`}
                        title={isListening ? "Stop listening" : "Speak to Oracle"}
                    >
                        {isListening ? (
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                <span>Listening...</span>
                            </div>
                        ) : (
                            <>
                                <Volume2 className="w-4 h-4" />
                                <span>Speak</span>
                            </>
                        )}
                    </button>
                    <div className="relative flex-1 flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            placeholder="Talk to Oracle.."
                            className="w-full bg-[#F6F6F6] dark:bg-[#0b0c10] border border-[#E0E0E0] dark:border-slate-800 rounded-lg pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-federalblue-900 text-[#333333] dark:text-white transition-all"
                        />
                        <div className="absolute right-2 flex items-center">
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || loading}
                                className="p-1.5 bg-federalblue-900 dark:bg-white text-white dark:text-black rounded-md hover:opacity-90 disabled:opacity-50 shadow-sm transition-all"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isUploadModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-[#1c1e24] w-full max-w-sm rounded-xl shadow-federal-lg overflow-hidden border border-[#E0E0E0] dark:border-slate-800">
                        <div className="px-6 py-4 border-b border-[#E0E0E0] dark:border-slate-800 flex justify-between items-center bg-[#F9F9F9] dark:bg-[#1c1e24]/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-federalblue-50 dark:bg-federalblue-900/10 rounded-lg text-federalblue-900 dark:text-federalblue-400">
                                    <FileUp className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-[#333333] dark:text-white">Document Hub</h3>
                            </div>
                            <button
                                onClick={() => { setIsUploadModalOpen(false); setUploadStatus('IDLE'); setSelectedFiles([null, null, null, null]); }}
                                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6">
                            {uploadStatus === 'IDLE' && (
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Supported: PDF, JPG, PNG (Max 5MB)</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {selectedFiles.map((file, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => { setUploadSlot(i); document.getElementById(`slot-upload-${i}`)?.click(); }}
                                                    className={`relative h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer ${file ? 'border-emerald-500/50 bg-emerald-50/10' : 'border-[#E0E0E0] dark:border-slate-800 hover:border-federalblue-500/40 hover:bg-federalblue-50/10'
                                                        }`}
                                                >
                                                    <input
                                                        id={`slot-upload-${i}`}
                                                        type="file"
                                                        className="hidden"
                                                        accept=".pdf,.png,.jpg,.jpeg"
                                                        onChange={(e) => handleFileChange(e, i)}
                                                    />
                                                    {file ? (
                                                        <>
                                                            <FileCheck className="w-6 h-6 text-emerald-500 mb-1" />
                                                            <span className="text-[8px] font-bold text-emerald-600 px-2 truncate w-full text-center">{file.name}</span>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); const nf = [...selectedFiles]; nf[i] = null; setSelectedFiles(nf); }}
                                                                className="absolute -top-1.5 -right-1.5 p-1 bg-red-500 text-white rounded-full shadow-lg"
                                                            >
                                                                <X className="w-2.5 h-2.5" />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <File className="w-6 h-6 text-slate-300 dark:text-slate-700 mb-1" />
                                                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Slot {i + 1}</span>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        disabled={selectedFiles.every(f => f === null)}
                                        onClick={handleUpload}
                                        className="w-full py-4 bg-federalblue-900 dark:bg-white text-white dark:text-black font-bold rounded-lg disabled:opacity-50"
                                    >
                                        Start Financial Analysis
                                    </button>
                                </div>
                            )}

                            {uploadStatus === 'UPLOADING' && (
                                <div className="py-12 flex flex-col items-center justify-center text-center">
                                    <Loader2 className="w-12 h-12 text-federalblue-900 animate-spin mb-4" />
                                    <h4 className="text-lg font-bold text-[#333333] dark:text-white tracking-tight">Oracle is Processing</h4>
                                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">Cross-referencing bookings with your <br /> current net worth and goals...</p>
                                </div>
                            )}

                            {uploadStatus === 'SUCCESS' && (
                                <div className="py-12 flex flex-col items-center justify-center text-center animate-fade-in">
                                    <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-4 text-emerald-700">
                                        <Check className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-lg font-bold text-[#333333] dark:text-white">Analysis Ready</h4>
                                    <p className="text-xs text-slate-500 mt-1">Oracle has processed your documents.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const formatMessageText = (text: string) => {
    const parts = text.split(/(\[Oracle Insight\]|\[Financial State: [^\]]+\])/g);
    return (
        <span className="block">
            {parts.map((part, i) => {
                if (part === '[Oracle Insight]') return <span key={i} className="font-bold text-federalblue-900 dark:text-federalblue-400 mr-2 inline-block mb-1">✨ Oracle Insight</span>;
                if (part.startsWith('[Financial State:')) return null;
                const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
                return (
                    <span key={i}>
                        {boldParts.map((subPart, j) => {
                            if (subPart.startsWith('**') && subPart.endsWith('**')) return <span key={j} className="font-bold text-[#333333] dark:text-white">{subPart.slice(2, -2)}</span>;
                            return <span key={j}>{subPart}</span>;
                        })}
                    </span>
                );
            })}
        </span>
    );
};

const getStateColor = (state?: string) => {
    switch (state) {
        case 'PROTECTION': return 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30';
        case 'AUTONOMY': return 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30';
        default: return 'text-federalblue-900 dark:text-federalblue-300 bg-federalblue-50 dark:bg-federalblue-900/20 border-federalblue-100 dark:border-federalblue-800/30';
    }
};

const getStateIcon = (state?: string) => {
    switch (state) {
        case 'PROTECTION': return <Shield className="w-3 h-3" />;
        case 'AUTONOMY': return <Zap className="w-3 h-3" />;
        default: return <Compass className="w-3 h-3" />;
    }
};

const BriefingItem = ({ icon: Icon, color, title, subtitle, pulse }: any) => {
    let bgClass = 'bg-slate-100';
    let textClass = 'text-slate-600';

    if (color === 'federalblue') {
        bgClass = 'bg-federalblue-50 dark:bg-federalblue-900/20';
        textClass = 'text-federalblue-900 dark:text-federalblue-400';
    } else if (color === 'emerald') {
        bgClass = 'bg-emerald-50 dark:bg-emerald-900/20';
        textClass = 'text-emerald-700 dark:text-emerald-400';
    } else if (color === 'federalgold') {
        bgClass = 'bg-federalgold-50 dark:bg-federalgold-900/20';
        textClass = 'text-federalgold-600 dark:text-federalgold-400';
    }

    return (
        <div className="flex gap-3 p-3 hover:bg-[#F9F9F9] dark:hover:bg-slate-800/30 rounded-lg transition-colors items-start group border border-transparent hover:border-[#E0E0E0] dark:hover:border-slate-700">
            <div className={`mt-0.5 p-1 ${bgClass} rounded-md`}>
                <Icon className={`w-3.5 h-3.5 ${textClass}`} />
            </div>
            <div className="flex-1">
                <p className="text-xs font-semibold text-[#333333] dark:text-white flex items-center gap-2">
                    {title}
                    {pulse && <span className="w-1.5 h-1.5 rounded-full bg-federalgold-500 animate-pulse"></span>}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-tight">{subtitle}</p>
            </div>
        </div>
    )
};

export default EmbeddedOrchestratorChat;
