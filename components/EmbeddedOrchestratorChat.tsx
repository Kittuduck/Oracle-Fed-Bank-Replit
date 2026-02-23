import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ArrowRight, Shield, Zap, Compass, AlertTriangle, TrendingUp, Calendar, CheckCircle2, Sparkles, X, FileUp, Loader2, Check, FileCheck, File, Mic } from 'lucide-react';
import { chatWithOrchestrator, SimulationUpdateData, NewGoalData } from '../services/geminiService';
import TradeOffVisualizer from './TradeOffVisualizer';

interface EmbeddedOrchestratorChatProps {
    onUpdateSimulation: (data: SimulationUpdateData) => void;
    onAddGoal: (data: NewGoalData) => void;
    onNavigateToGoals: () => void;
    onNavigateToPortfolio: () => void;
    onNavigateToExpenditure: () => void;
    onNavigateToDashboard: () => void;
    onPayCCBill: () => void;
    currentFinancials: { liquid: number, need: number, goal: number };
    oracleActive: boolean;
    initialPrompt?: string;
    persona?: any;
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

const EmbeddedOrchestratorChat: React.FC<EmbeddedOrchestratorChatProps> = ({
    onUpdateSimulation,
    onAddGoal,
    onNavigateToGoals,
    onNavigateToPortfolio,
    onNavigateToExpenditure,
    onNavigateToDashboard,
    onPayCCBill,
    currentFinancials,
    initialPrompt,
    persona
}) => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    // Upload Modal State
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'IDLE' | 'UPLOADING' | 'SUCCESS'>('IDLE');
    const [uploadSlot, setUploadSlot] = useState<number | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>([null, null, null, null]);
    const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
    const [displayedText, setDisplayedText] = useState<{ [key: string]: string }>({});

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

    // Content for the Windfall Logic
    const renderWindfallOptions = () => (
        <div className="space-y-4 animate-fade-in">
            <p>You’ve received a ₹15L windfall. There are three strong ways to use this, depending on your priority right now:</p>

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

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'init',
            role: 'model',
            state: 'PROTECTION',
            text: "Daily Financial Brief",
            content: (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-slate-900 dark:text-white">Daily Financial Brief</p>
                        <span className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">Today, 9:00 AM</span>
                    </div>
                    <div className="space-y-0.5">
                        <BriefingItem icon={AlertTriangle} color="federalgold" title="Anomaly Detected" subtitle="Unusual transaction at Club Aqua, London." pulse />
                        <BriefingItem icon={Zap} color="emerald" title="Windfall Detected" subtitle="ESOP sales credited. Allocation pending." />
                        <BriefingItem icon={Calendar} color="federalblue" title="Credit Card Bill Due" subtitle="Due in 3 days. Balance: ₹1.2L" />
                    </div>
                    <p className="text-xs text-slate-500 pt-2 border-t border-[#E0E0E0] dark:border-slate-800">Select a priority to analyze:</p>
                </div>
            ),
            actions: ['Review Anomaly', 'Pay Credit Card Bill', 'Windfall Allocation', 'Track Goals', 'Review Portfolio']
        }
    ]);

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
        if (text === "Review Expenditure" || text === "Review Anomaly") { onNavigateToExpenditure(); return; }

        // Windfall Interceptor
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
                content: null, // Will be set after streaming
                state: response.state,
                actions: response.suggestedActions,
                simulation: response.simulationUpdate
            };

            setMessages(prev => [...prev, aiMsg]);
            setStreamingMessageId(aiMsgId);

            // Simulate streaming
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

    const handleVoiceInput = () => {
        // Placeholder for voice interaction
        console.log("Voice input triggered");
    };

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
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        placeholder="Talk to Oracle.."
                        className="w-full bg-[#F6F6F6] dark:bg-[#0b0c10] border border-[#E0E0E0] dark:border-slate-800 rounded-lg pl-4 pr-24 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-federalblue-900 text-[#333333] dark:text-white transition-all"
                    />
                    <div className="absolute right-2 flex items-center gap-1">
                        <button
                            onClick={handleVoiceInput}
                            className="p-1.5 text-slate-400 hover:text-federalblue-900 transition-colors"
                            title="Voice search"
                        >
                            <Mic className="w-4 h-4" />
                        </button>
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

            {/* MULTI-FILE UPLOAD MODAL */}
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
                                    <p className="text-xs text-slate-500 mt-2">Checking travel impact on FIRE timeline.</p>
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
    // Map colors to classes manually to ensure Tailwind picks them up
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