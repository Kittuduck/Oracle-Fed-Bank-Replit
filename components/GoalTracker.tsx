import React, { useState, useMemo } from 'react';
import { TrendingUp, GraduationCap, AlertCircle, CheckCircle2, Plus, X, Target, Save, Wallet, Pencil, Sparkles, ChevronDown, ShieldCheck, ArrowRight, RefreshCw, Info, FileText, ExternalLink, Zap, AlertTriangle } from 'lucide-react';

export interface Goal {
    id: string;
    title: string;
    icon: React.ElementType;
    currentAmount: number;
    targetAmount: number;
    deadlineYear: number;
    status: 'ON_TRACK' | 'AT_RISK' | 'REBALANCED';
    projectedimpact?: string;
    history?: number[];
    fundingSource?: string;
    monthlyContribution?: number;
    description?: string;
    insights?: string[];
}

interface GoalTrackerProps {
    goals: Goal[];
    onAddGoal: (goal: Goal) => void;
    onUpdateGoal: (goal: Goal) => void;
    isDarkMode: boolean;
    festival: 'DEFAULT' | 'DIWALI' | 'HOLI';
}

const FUNDING_SOURCES = [
    'SIP (Equity)',
    'Hybrid Debt Instruments',
    'High-Growth Equity Portfolio',
    'Surplus Cash & Savings',
    'ESOP Liquidation',
    'Bonus Allocation',
    'Real Estate Yield'
];

const GoalTracker: React.FC<GoalTrackerProps> = ({ goals, onAddGoal, onUpdateGoal, isDarkMode, festival }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

    // AI Interactive State
    const [selectedRetireAge, setSelectedRetireAge] = useState<50 | 55 | 60>(50);
    const [rebalanceStep, setRebalanceStep] = useState<'IDLE' | 'ANALYZING' | 'REPORT_READY' | 'DONE'>('IDLE');
    const [showFullReport, setShowFullReport] = useState(false);
    const [exploreError, setExploreError] = useState(false);
    const [isExploring, setIsExploring] = useState(false);

    // New/Edit Goal State
    const [newTitle, setNewTitle] = useState('');
    const [newTarget, setNewTarget] = useState('');
    const [newYear, setNewYear] = useState('');
    const [newFundingSource, setNewFundingSource] = useState(FUNDING_SOURCES[0]);
    const [newContribution, setNewContribution] = useState('');

    const formatCurrency = (amount: number) => {
        if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
        if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
        return `₹${amount.toLocaleString()}`;
    };

    const getStatusColor = (status: Goal['status']) => {
        switch (status) {
            case 'ON_TRACK':
            case 'REBALANCED':
                return 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 border-emerald-500/20';
            case 'AT_RISK':
                return 'text-federalgold-600 dark:text-federalgold-400 bg-federalgold-100 dark:bg-federalgold-500/10 border-federalgold-500/20';
            default:
                return 'text-slate-400';
        }
    };

    const retireMetrics = useMemo(() => {
        switch (selectedRetireAge) {
            case 50: return { corpus: 150000000, sip: 250000, habit: "Requires 40% savings rate. Cut luxury travel by 20%." };
            case 55: return { corpus: 120000000, sip: 145000, habit: "Balanced 30% savings rate. Maintain current lifestyle." };
            case 60: return { corpus: 95000000, sip: 85000, habit: "Relaxed 20% savings rate. Surplus for lifestyle upgrades." };
        }
    }, [selectedRetireAge]);

    const handleAnalyze = () => {
        setRebalanceStep('ANALYZING');
        setTimeout(() => setRebalanceStep('REPORT_READY'), 1800);
    };

    const executeStrategy = () => {
        setShowFullReport(false);
        setRebalanceStep('DONE');
    };

    const handleExploreFunds = () => {
        setIsExploring(true);
        setTimeout(() => {
            setIsExploring(false);
            setExploreError(true);
            setTimeout(() => setExploreError(false), 3000);
        }, 1000);
    };

    const handleSaveNew = () => {
        if (!newTitle || !newTarget || !newYear) return;
        const newGoal: Goal = {
            id: `g-${Date.now()}`,
            title: newTitle,
            icon: Target,
            currentAmount: 0,
            targetAmount: parseFloat(newTarget),
            deadlineYear: parseInt(newYear),
            status: 'AT_RISK',
            projectedimpact: 'New Entry',
            fundingSource: newFundingSource,
            monthlyContribution: newContribution ? parseFloat(newContribution) : 0,
            description: 'Newly created strategic goal.',
            insights: []
        };
        onAddGoal(newGoal);
        setIsAdding(false);
        setNewTitle(''); setNewTarget(''); setNewYear(''); setNewFundingSource(FUNDING_SOURCES[0]);
    };

    const startEditing = (goal: Goal) => {
        setEditingGoal(goal);
        setNewTitle(goal.title);
        setNewTarget(goal.targetAmount.toString());
        setNewYear(goal.deadlineYear.toString());
        setNewFundingSource(goal.fundingSource || FUNDING_SOURCES[0]);
    };

    return (
        <>
            <div className={`grid grid-cols-1 gap-8 pb-20 transition-all duration-700 ${isDarkMode ? 'dark text-zinc-100' : 'text-[#333333]'} ${festival !== 'DEFAULT' ? `theme-festive-${festival.toLowerCase()}` : ''}`}>
                {goals.map((goal) => {
                    const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
                    const isFIRE = goal.id === 'g1';
                    const isEdu = goal.id === 'g2';

                    return (
                        <div
                            key={goal.id}
                            className="group bg-white dark:bg-[#15161a] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 transition-all duration-300 shadow-federal dark:shadow-none relative overflow-hidden"
                        >
                            {/* Federal Blue Abstract Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-federalblue-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Left Section: Goal Info & Progress */}
                                <div className="flex-1 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1c1e24] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                                                <goal.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-federalblue-900 dark:text-white tracking-tight">{goal.title}</h3>
                                                <p className="text-xs text-slate-500 font-medium">Target Year: {isFIRE && selectedRetireAge === 55 ? 2045 : isFIRE && selectedRetireAge === 60 ? 2050 : goal.deadlineYear}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => startEditing(goal)}
                                            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-federalblue-900 dark:hover:text-white transition-all border border-slate-200 dark:border-slate-700"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-3 h-6">
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border uppercase shrink-0 ${getStatusColor(goal.status)}`}>
                                            {goal.status === 'REBALANCED' || goal.status === 'ON_TRACK' ? 'ON TRACK' : goal.status.replace('_', ' ')}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <div className="text-3xl font-bold text-[#333333] dark:text-white tracking-tighter">
                                                {formatCurrency(goal.currentAmount)}
                                            </div>
                                            <div className="text-xs text-slate-500 font-bold">
                                                Goal: {formatCurrency(isFIRE ? retireMetrics?.corpus! : goal.targetAmount)}
                                            </div>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-1000 ease-out ${goal.status === 'AT_RISK' ? 'bg-federalgold-500' : 'bg-emerald-500'}`}
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Section: Oracle Panel */}
                                <div className="flex-1 bg-slate-50 dark:bg-[#0b0c10]/40 rounded-3xl p-6 border border-slate-100 dark:border-slate-800/50 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Sparkles className="w-4 h-4 text-federalblue-600 dark:text-federalblue-400" />
                                            <h4 className="text-[10px] font-bold text-federalblue-900 dark:text-white uppercase tracking-widest">Oracle insights</h4>
                                        </div>

                                        {isFIRE && (
                                            <div className="space-y-6">
                                                <div className="space-y-3">
                                                    <div className="flex justify-between text-xs font-bold text-slate-500">
                                                        <span>Retire at Age: <span className="text-federalblue-600 dark:text-federalblue-400">{selectedRetireAge}</span></span>
                                                        <span>SIP: {formatCurrency(retireMetrics?.sip!)}/mo</span>
                                                    </div>
                                                    <div className="relative px-2 py-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                                                        <div className="flex justify-between relative z-10">
                                                            {[50, 55, 60].map(age => (
                                                                <button
                                                                    key={age}
                                                                    onClick={() => setSelectedRetireAge(age as any)}
                                                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${selectedRetireAge === age ? 'bg-federalblue-900 text-white scale-110 shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                                                                >
                                                                    {age}
                                                                </button>
                                                            ))}
                                                        </div>
                                                        <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-100 dark:bg-slate-700 -translate-y-1/2"></div>
                                                    </div>
                                                    <div className="p-3 bg-federalblue-50 dark:bg-federalblue-500/10 border border-federalblue-100 dark:border-federalblue-500/20 rounded-xl">
                                                        <p className="text-[11px] text-federalblue-700 dark:text-federalblue-300 font-medium italic">
                                                            "{retireMetrics?.habit}"
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="pt-2 border-t border-slate-200 dark:border-slate-800/50">
                                                    {rebalanceStep === 'IDLE' && (
                                                        <button onClick={handleAnalyze} className="w-full py-3 bg-federalblue-900 dark:bg-white text-white dark:text-federalblue-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90">
                                                            <RefreshCw className="w-4 h-4" /> Analyze
                                                        </button>
                                                    )}
                                                    {rebalanceStep === 'ANALYZING' && (
                                                        <div className="flex flex-col items-center py-2 animate-pulse">
                                                            <RefreshCw className="w-6 h-6 animate-spin text-federalblue-500 mb-2" />
                                                            <span className="text-[10px] font-bold text-slate-500 uppercase">Analyzing Exposure...</span>
                                                        </div>
                                                    )}
                                                    {rebalanceStep === 'REPORT_READY' && (
                                                        <div className="space-y-3 animate-fade-in">
                                                            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
                                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                                Analysis complete.
                                                            </p>
                                                            <button
                                                                onClick={() => setShowFullReport(true)}
                                                                className="w-full py-3 bg-federalblue-50 dark:bg-federalblue-900/20 border border-federalblue-100 dark:border-federalblue-800 text-federalblue-700 dark:text-federalblue-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-federalblue-100 dark:hover:bg-federalblue-900/40"
                                                            >
                                                                <FileText className="w-4 h-4" /> View Full Report
                                                            </button>
                                                        </div>
                                                    )}
                                                    {rebalanceStep === 'DONE' && (
                                                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs animate-fade-in py-2">
                                                            <ShieldCheck className="w-5 h-5" /> Portfolio Optimized
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {isEdu && (
                                            <div className="space-y-4">
                                                {exploreError ? (
                                                    <div className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/20 rounded-xl flex items-center gap-2 animate-fade-in">
                                                        <AlertTriangle className="w-4 h-4 text-red-500" />
                                                        <span className="text-xs font-bold text-red-600 dark:text-red-400">Try again later.</span>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={handleExploreFunds}
                                                        disabled={isExploring}
                                                        className="w-full py-3 bg-federalblue-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-federalblue-800 transition-all disabled:opacity-50"
                                                    >
                                                        {isExploring ? <RefreshCw className="w-4 h-4 animate-spin" /> : <>Explore International Funds <ExternalLink className="w-4 h-4" /></>}
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Funding: {goal.fundingSource}</span>
                                        <span className={`text-[10px] font-bold ${goal.projectedimpact?.toLowerCase().includes('shortfall') ? 'text-federalgold-500' : 'text-emerald-500'}`}>
                                            {goal.projectedimpact?.startsWith('+') ? goal.projectedimpact : `+${goal.projectedimpact}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <button
                    onClick={() => { setIsAdding(true); setNewTitle(''); setNewTarget(''); setNewYear(''); setNewFundingSource(FUNDING_SOURCES[0]); }}
                    className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl hover:border-federalblue-500/50 hover:bg-federalblue-50 dark:hover:bg-federalblue-500/5 transition-all group min-h-[200px]"
                >
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-federalblue-500 transition-colors mb-4">
                        <Plus className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-xs">Add New Strategic Goal</span>
                </button>
            </div>

            {/* Full Report Modal */}
            {showFullReport && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-[#15161a] w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
                        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-[#1c1e24]/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-federalblue-100 dark:bg-federalblue-500/10 rounded-lg text-federalblue-600 dark:text-federalblue-400">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Optimization Strategy</h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Fat FIRE Rebalancing</p>
                                </div>
                            </div>
                            <button onClick={() => setShowFullReport(false)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto space-y-8">
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Risk Analysis</h4>
                                <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-500/20 rounded-2xl flex gap-3">
                                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                        Current equity exposure is <span className="font-bold text-slate-900 dark:text-white">78%</span>. Rebalancing is required to protect ₹42L corpus and lock in profits.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Execution Steps</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#0b0c10] border border-slate-200 dark:border-slate-800 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-red-100 dark:bg-red-500/10 rounded-lg text-red-500"><TrendingUp className="w-4 h-4 rotate-180" /></div>
                                            <span className="text-sm font-semibold text-slate-900 dark:text-white">Sell Mid-Cap Equity</span>
                                        </div>
                                        <span className="text-sm font-mono font-bold text-slate-500">₹45.0 L</span>
                                    </div>
                                    <div className="flex items-center justify-center h-4 text-slate-300">
                                        <ArrowRight className="w-4 h-4 rotate-90" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#0b0c10] border border-slate-200 dark:border-slate-800 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-emerald-100 dark:bg-emerald-500/10 rounded-lg text-emerald-500"><TrendingUp className="w-4 h-4" /></div>
                                            <span className="text-sm font-semibold text-slate-900 dark:text-white">Buy Hybrid Debt Funds</span>
                                        </div>
                                        <span className="text-sm font-mono font-bold text-slate-500">₹45.0 L</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-federalblue-50 dark:bg-federalblue-900/10 border border-federalblue-100 dark:border-federalblue-500/20 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-4 h-4 text-federalblue-500" />
                                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">Oracle Forecast</span>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Locks in <span className="font-bold text-emerald-500">14% unrealized gains</span> and secures the portfolio against the upcoming quarter volatility.
                                </p>
                            </div>
                        </div>

                        <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#0b0c10] flex gap-4">
                            <button onClick={() => setShowFullReport(false)} className="flex-1 py-4 text-sm font-bold text-slate-500 hover:text-slate-900">Cancel</button>
                            <button
                                onClick={executeStrategy}
                                className="flex-[2] py-4 bg-federalblue-900 dark:bg-white text-white dark:text-federalblue-900 font-bold rounded-2xl hover:opacity-90 flex items-center justify-center gap-2"
                            >
                                <Zap className="w-4 h-4" /> Execute Strategy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Goal Modal */}
            {(isAdding || editingGoal) && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-[#15161a] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-[#1c1e24]/50">
                            <h3 className="font-bold text-slate-900 dark:text-white">
                                {editingGoal ? 'Edit Strategic Goal' : 'New Strategic Goal'}
                            </h3>
                            <button
                                onClick={() => { setIsAdding(false); setEditingGoal(null); }}
                                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest ml-1">Goal Title</label>
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-[#0b0c10] border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-federalblue-500 transition-all"
                                    placeholder="e.g. Weekend Villa"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest ml-1">Target Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-5 top-4 text-slate-400 font-bold">₹</span>
                                        <input
                                            type="number"
                                            value={newTarget}
                                            onChange={(e) => setNewTarget(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-[#0b0c10] border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-5 py-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-federalblue-500 transition-all"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest ml-1">Target Year</label>
                                    <input
                                        type="number"
                                        value={newYear}
                                        onChange={(e) => setNewYear(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-[#0b0c10] border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-federalblue-500 transition-all"
                                        placeholder="2035"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest ml-1">Funding Source</label>
                                <select
                                    value={newFundingSource}
                                    onChange={(e) => setNewFundingSource(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-[#0b0c10] border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-federalblue-500 transition-all appearance-none"
                                >
                                    {FUNDING_SOURCES.map(source => (
                                        <option key={source} value={source}>{source}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#0b0c10] flex gap-4">
                            <button
                                onClick={() => { setIsAdding(false); setEditingGoal(null); }}
                                className="flex-1 py-4 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={editingGoal ? () => {
                                    onUpdateGoal({
                                        ...editingGoal,
                                        title: newTitle,
                                        targetAmount: parseFloat(newTarget),
                                        deadlineYear: parseInt(newYear),
                                        fundingSource: newFundingSource
                                    });
                                    setEditingGoal(null);
                                } : handleSaveNew}
                                className="flex-[2] py-4 bg-federalblue-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                {editingGoal ? 'Update Goal' : 'Initialize Goal'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GoalTracker;