import React, { useState } from 'react';
import { ArrowLeft, Sun, Moon, AlertTriangle, ShieldAlert, PauseCircle, PlayCircle, Snowflake, CheckCircle2, Zap, TrendingUp, Calendar, CreditCard, ChevronDown, RefreshCw, ShoppingBag, Utensils, Plane, Car, Home, TrendingDown, Plus, X, Globe, Smartphone, Dumbbell, Receipt } from 'lucide-react';
import { ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { Biller } from '../App';

interface ExpenditurePageProps {
    onBack: () => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
    billers: Biller[];
    onToggleAutopay: (id: string) => void;
    onAddBiller: (biller: Biller) => void;
    festival: 'DEFAULT' | 'DIWALI' | 'HOLI';
}

type TimeFrame = 'DAILY' | 'MONTHLY' | 'YEARLY';

const ExpenditurePage: React.FC<ExpenditurePageProps> = ({ onBack, isDarkMode, toggleTheme, billers, onToggleAutopay, onAddBiller, festival }) => {
    const [timeframe, setTimeframe] = useState<TimeFrame>('MONTHLY');
    const [anomalyStatus, setAnomalyStatus] = useState<'PENDING' | 'VERIFIED' | 'FROZEN'>('PENDING');
    const [showAddBiller, setShowAddBiller] = useState(false);
    const [newBiller, setNewBiller] = useState({
        name: '',
        amount: '',
        category: 'Utilities',
        type: 'AUTO' as 'AUTO' | 'DUE'
    });

    // Enhanced Mock Chart Data with Averages
    const dailyData = [
        { name: 'Mon', amount: 1200, average: 4000 },
        { name: 'Tue', amount: 4500, average: 4000 },
        { name: 'Wed', amount: 850, average: 4000 },
        { name: 'Thu', amount: 12000, average: 4200 },
        { name: 'Fri', amount: 3200, average: 5500 },
        { name: 'Sat', amount: 15400, average: 6000 },
        { name: 'Sun', amount: 6500, average: 6000 }
    ];

    const monthlyData = [
        { name: 'Week 1', amount: 12500, average: 25000 },
        { name: 'Week 2', amount: 45000, average: 28000 },
        { name: 'Week 3', amount: 28000, average: 26000 },
        { name: 'Week 4', amount: 32000, average: 30000 }
    ];

    const yearlyData = [
        { name: 'Jan', amount: 120000, average: 110000 },
        { name: 'Feb', amount: 145000, average: 115000 },
        { name: 'Mar', amount: 180000, average: 120000 },
        { name: 'Apr', amount: 130000, average: 120000 },
        { name: 'May', amount: 160000, average: 125000 },
        { name: 'Jun', amount: 140000, average: 130000 }
    ];

    // Category Breakdown Data (Updated colors to match Federal Bank Palette)
    // Federal Blue = Shopping/Lifestyle (Primary)
    // Federal Orange/Gold = Dining (Accent)
    // Slate = Transport/Utilities (Neutral)
    const categoryData = {
        DAILY: [
            { name: 'Shopping', amount: 12400, percent: 55, icon: ShoppingBag, color: 'bg-federalblue-900', textColor: 'text-federalblue-900' },
            { name: 'Dining', amount: 4200, percent: 18, icon: Utensils, color: 'bg-federalgold-500', textColor: 'text-federalgold-600' },
            { name: 'Transport', amount: 1500, percent: 7, icon: Car, color: 'bg-slate-600', textColor: 'text-slate-600' },
        ],
        MONTHLY: [
            { name: 'Travel', amount: 45000, percent: 38, icon: Plane, color: 'bg-federalblue-700', textColor: 'text-federalblue-700' },
            { name: 'Housing', amount: 35000, percent: 29, icon: Home, color: 'bg-slate-800', textColor: 'text-slate-800' },
            { name: 'Lifestyle', amount: 22000, percent: 18, icon: ShoppingBag, color: 'bg-federalblue-500', textColor: 'text-federalblue-500' },
        ],
        YEARLY: [
            { name: 'Investments', amount: 600000, percent: 45, icon: TrendingUp, color: 'bg-federalblue-900', textColor: 'text-federalblue-900' },
            { name: 'Housing', amount: 420000, percent: 30, icon: Home, color: 'bg-slate-700', textColor: 'text-slate-700' },
            { name: 'Travel', amount: 150000, percent: 11, icon: Plane, color: 'bg-federalgold-500', textColor: 'text-federalgold-600' },
        ]
    };

    const insightData = {
        DAILY: {
            icon: ShoppingBag,
            colorClass: 'text-federalblue-900',
            message: (
                <>
                    <span className="font-semibold text-[#333333] dark:text-white">Insight:</span> Unusual spike in <span className="font-medium text-federalblue-900">Shopping</span> today (+₹12.4k).
                </>
            )
        },
        MONTHLY: {
            icon: Plane,
            colorClass: 'text-federalblue-700',
            message: (
                <>
                    <span className="font-semibold text-[#333333] dark:text-white">Insight:</span> Spending is elevated this month due to <span className="font-medium text-federalblue-700">Travel bookings</span> (+₹45k).
                </>
            )
        },
        YEARLY: {
            icon: TrendingUp,
            colorClass: 'text-emerald-700',
            message: (
                <>
                    <span className="font-semibold text-[#333333] dark:text-white">Insight:</span> Investment allocation has increased by <span className="font-medium text-emerald-700">45%</span> year-over-year.
                </>
            )
        }
    };

    const getData = () => {
        switch (timeframe) {
            case 'DAILY': return dailyData;
            case 'MONTHLY': return monthlyData;
            case 'YEARLY': return yearlyData;
        }
    };

    const getCategoryBreakdown = () => {
        return categoryData[timeframe];
    };

    const getCurrentInsight = () => {
        return insightData[timeframe];
    };

    const formatCurrency = (val: number) => {
        return val >= 1000 ? `₹${(val / 1000).toFixed(1)}k` : `₹${val}`;
    };

    const autopayBillers = billers.filter(b => b.type === 'AUTO');

    const handleFreeze = () => {
        setAnomalyStatus('FROZEN');
    };

    const handleVerify = () => {
        setAnomalyStatus('VERIFIED');
    };

    const InsightIcon = getCurrentInsight().icon;

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const biller: Biller = {
            id: `b-${Date.now()}`,
            name: newBiller.name,
            amount: parseFloat(newBiller.amount),
            type: newBiller.type,
            status: newBiller.type === 'AUTO' ? 'ACTIVE' : undefined,
            dueDate: 'Next month',
            icon: newBiller.category === 'Utilities' ? Zap : Receipt,
            category: newBiller.category
        };
        onAddBiller(biller);
        setShowAddBiller(false);
        setNewBiller({ name: '', amount: '', category: 'Utilities', type: 'AUTO' });
    };

    if (showAddBiller) {
        return (
            <div className={`min-h-screen flex flex-col transition-all duration-700 ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-white text-[#333333]'}`}>
                <nav className="px-6 py-4 flex items-center justify-between border-b border-[#E0E0E0] dark:border-zinc-800">
                    <button onClick={() => setShowAddBiller(false)} className="p-2 -ml-2 text-slate-500 hover:text-federalblue-900 rounded-full">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <span className="font-bold text-lg">Add New Biller</span>
                    <div className="w-10"></div>
                </nav>

                <main className="flex-1 p-6 max-w-xl mx-auto w-full space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                    <form onSubmit={handleAddSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest ml-1">Biller Name</label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. Jio Fiber, Tata Play"
                                value={newBiller.name}
                                onChange={e => setNewBiller({ ...newBiller, name: e.target.value })}
                                className="w-full p-4 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-federalblue-900 dark:text-white font-medium focus:ring-2 focus:ring-federalblue-900 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest ml-1">Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                <input
                                    required
                                    type="number"
                                    placeholder="0.00"
                                    value={newBiller.amount}
                                    onChange={e => setNewBiller({ ...newBiller, amount: e.target.value })}
                                    className="w-full p-4 pl-8 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-federalblue-900 dark:text-white font-medium focus:ring-2 focus:ring-federalblue-900 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest ml-1">Category</label>
                                <select
                                    value={newBiller.category}
                                    onChange={e => setNewBiller({ ...newBiller, category: e.target.value })}
                                    className="w-full p-4 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-federalblue-900 dark:text-white font-medium outline-none transition-all appearance-none"
                                >
                                    <option value="Utilities">Utilities</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest ml-1">Payment Method</label>
                                <select
                                    value={newBiller.type}
                                    onChange={e => setNewBiller({ ...newBiller, type: e.target.value as 'AUTO' | 'DUE' })}
                                    className="w-full p-4 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-federalblue-900 dark:text-white font-medium outline-none transition-all appearance-none"
                                >
                                    <option value="AUTO">Autopay</option>
                                    <option value="DUE">Manual Pay</option>
                                </select>
                            </div>
                        </div>

                        <div className="p-4 bg-federalblue-50 dark:bg-federalblue-900/10 border border-federalblue-100 dark:border-federalblue-800/30 rounded-xl flex items-center gap-3">
                            <Globe className="w-5 h-5 text-federalblue-700 dark:text-federalblue-400" />
                            <p className="text-[11px] text-slate-600 dark:text-slate-300">Adding a biller via <span className="font-bold">Bharat Bill Pay (BBPS)</span> for instant confirmation.</p>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-federalblue-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold shadow-xl active:scale-[0.98] transition-all"
                        >
                            Save Biller
                        </button>
                    </form>
                </main>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-all duration-700 ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-white text-[#333333]'} ${festival !== 'DEFAULT' ? `theme-festive-${festival.toLowerCase()}` : ''}`}>
            <div className="bg-transparent min-h-screen font-sans pb-24">

                {/* Navigation */}
                <nav className="sticky top-0 bg-white/95 dark:bg-zinc-950/90 backdrop-blur-md z-50 border-b border-[#E0E0E0] dark:border-zinc-800 transition-colors">
                    <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-federalblue-900 rounded-full hover:bg-[#F6F6F6] dark:hover:bg-slate-800/50 transition-colors">
                                <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
                            </button>
                            <span className="font-semibold text-lg text-[#333333] dark:text-white">Expenditure Intelligence</span>
                        </div>
                        <button onClick={toggleTheme} className="p-2 text-slate-500 hover:text-federalblue-900 transition-colors">
                            {isDarkMode ? <Sun className="w-5 h-5" strokeWidth={1.5} /> : <Moon className="w-5 h-5" strokeWidth={1.5} />}
                        </button>
                    </div>
                </nav>

                <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">

                    {/* Anomaly Detection Section - Federal Style: Flat card, sharp borders */}
                    {anomalyStatus === 'PENDING' && (
                        <div className="bg-white dark:bg-[#15161a] border border-federalblue-100 dark:border-federalblue-900/30 rounded-xl p-5 animate-fade-in shadow-federal relative overflow-hidden">
                            {/* Subtle Warning Pattern */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-federalgold-600"></div>
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                <AlertTriangle className="w-32 h-32 text-federalgold-900" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-federalgold-50 dark:bg-federalgold-900/20 text-federalgold-700 dark:text-federalgold-400 rounded-lg">
                                        <ShieldAlert className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-[#333333] dark:text-white">Anomaly Detected</h3>
                                </div>

                                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed max-w-xl">
                                    We noticed an unusual transaction of <span className="font-bold text-[#333333] dark:text-white">₹12,400</span> at <span className="font-bold text-[#333333] dark:text-white">Club Aqua, London</span>.
                                </p>

                                <div className="flex gap-3">
                                    <button onClick={handleFreeze} className="flex items-center gap-2 px-4 py-2.5 bg-federalyellow-500 hover:bg-federalyellow-600 text-[#333333] text-xs font-bold rounded-lg shadow-sm transition-all">
                                        <Snowflake className="w-4 h-4" /> Freeze Card
                                    </button>
                                    <button onClick={handleVerify} className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-transparent border border-[#E0E0E0] dark:border-slate-700 hover:bg-[#F6F6F6] dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg transition-all">
                                        <CheckCircle2 className="w-4 h-4" /> It was me
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Oracle Insight - Federal Style */}
                    <div className="bg-gradient-to-r from-federalblue-50/80 to-white dark:from-federalblue-900/10 dark:to-[#1c1e24] border border-federalblue-100 dark:border-federalblue-800/30 rounded-xl p-5 relative overflow-hidden">
                        <div className="flex items-start gap-3 relative z-10">
                            <div className="p-2 bg-white dark:bg-[#15161a] border border-[#E0E0E0] dark:border-federalblue-800/20 rounded-lg text-federalblue-900 dark:text-federalblue-400 shadow-sm">
                                <Zap className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="text-xs font-bold text-federalblue-900 dark:text-federalblue-400 uppercase tracking-wider">Oracle Insight</h4>
                                    <span className="text-[10px] text-slate-400">Just now</span>
                                </div>
                                <p className="text-sm text-slate-700 dark:text-slate-200 font-medium mb-3">
                                    You haven't visited "Gold's Gym" in 45 days, but the ₹3,500 auto-pay is scheduled for tomorrow.
                                </p>
                                <button
                                    onClick={() => onToggleAutopay('b4')}
                                    disabled={billers.find(a => a.id === 'b4')?.status === 'PAUSED'}
                                    className="text-xs bg-white border border-[#E0E0E0] hover:border-federalblue-500 hover:text-federalblue-900 dark:bg-[#1c1e24] dark:border-slate-700 dark:hover:border-federalblue-500 text-slate-700 dark:text-white px-4 py-2 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                >
                                    {billers.find(a => a.id === 'b4')?.status === 'PAUSED' ? 'Suggestion Executed' : 'Pause Subscription'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Insightful Spending Trends */}
                    <div className="bg-white dark:bg-[#15161a] border border-[#E0E0E0] dark:border-slate-800 rounded-xl p-6 shadow-federal dark:shadow-none">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-[#333333] dark:text-white">Spending Analysis</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                                    Current Period: <span className="font-semibold text-[#333333] dark:text-white">₹1,18,500</span>
                                </p>
                            </div>

                            <div className="flex bg-[#F6F6F6] dark:bg-[#0b0c10] p-1 rounded-lg border border-[#E0E0E0] dark:border-slate-800">
                                {(['DAILY', 'MONTHLY', 'YEARLY'] as TimeFrame[]).map((tf) => (
                                    <button
                                        key={tf}
                                        onClick={() => setTimeframe(tf)}
                                        className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${timeframe === tf
                                            ? 'bg-white dark:bg-[#1c1e24] text-federalblue-900 dark:text-white shadow-sm border border-[#E0E0E0] dark:border-slate-700'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                            }`}
                                    >
                                        {tf.charAt(0) + tf.slice(1).toLowerCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-2">
                                <div className="h-[250px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={getData()} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                            <CartesianGrid vertical={false} stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeDasharray="3 3" opacity={0.4} />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }} tickFormatter={formatCurrency} />
                                            <Tooltip
                                                cursor={{ fill: isDarkMode ? '#1e293b' : '#f1f5f9', opacity: 0.4 }}
                                                contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', borderRadius: '8px', color: isDarkMode ? '#fff' : '#000' }}
                                            />
                                            <Bar dataKey="amount" radius={[4, 4, 0, 0]} maxBarSize={40}>
                                                {getData().map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={isDarkMode ? '#004d9c' : '#004d9c'} />
                                                ))}
                                            </Bar>
                                            <Line type="monotone" dataKey="average" stroke={isDarkMode ? '#94a3b8' : '#64748b'} strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3, fill: isDarkMode ? '#15161a' : '#fff' }} />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between h-full bg-[#F9F9F9] dark:bg-[#1c1e24] rounded-xl p-5 border border-[#E0E0E0] dark:border-slate-800">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Where it went</h4>
                                    <div className="space-y-4">
                                        {getCategoryBreakdown().map((cat) => (
                                            <div key={cat.name}>
                                                <div className="flex justify-between items-center mb-1.5">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`p-1.5 rounded-md ${cat.color} bg-opacity-10 dark:bg-opacity-20 text-white`}>
                                                            <cat.icon className={`w-3 h-3 ${cat.textColor}`} />
                                                        </div>
                                                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{cat.name}</span>
                                                    </div>
                                                    <span className="text-xs font-semibold text-[#333333] dark:text-white">{formatCurrency(cat.amount)}</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-[#E0E0E0] dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.percent}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Autopay Manager - Federal Style */}
                    <div className="bg-white dark:bg-[#15161a] border border-[#E0E0E0] dark:border-slate-800 rounded-xl overflow-hidden shadow-federal dark:shadow-none">
                        <div className="px-6 py-4 border-b border-[#E0E0E0] dark:border-slate-800 flex justify-between items-center bg-[#F9F9F9] dark:bg-[#1c1e24]/30">
                            <h3 className="font-bold text-[#333333] dark:text-white flex items-center gap-2">
                                <RefreshCw className="w-4 h-4 text-slate-500" />
                                Autopay Manager
                            </h3>
                            <button
                                onClick={() => setShowAddBiller(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-federalblue-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg text-[10px] font-bold shadow-lg active:scale-95 transition-all"
                            >
                                <Plus className="w-3.5 h-3.5" /> ADD BILLER
                            </button>
                        </div>

                        <div className="divide-y divide-[#E0E0E0] dark:divide-slate-800">
                            {autopayBillers.map((item) => (
                                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-[#F9F9F9] dark:hover:bg-slate-800/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${item.status === 'ACTIVE'
                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400'
                                            : 'bg-[#F6F6F6] dark:bg-slate-800 border-[#E0E0E0] dark:border-slate-700 text-slate-400'
                                            }`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className={`text-sm font-semibold ${item.status === 'ACTIVE' ? 'text-[#333333] dark:text-white' : 'text-slate-500 line-through'}`}>
                                                {item.name}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">₹{item.amount.toLocaleString()}</span>
                                                <span className="text-[10px] text-slate-400">• {item.dueDate}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button onClick={() => onToggleAutopay(item.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${item.status === 'ACTIVE'
                                        ? 'bg-[#F6F6F6] dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#E0E0E0] dark:hover:bg-slate-700'
                                        : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                                        }`}>
                                        {item.status === 'ACTIVE' ? <><PauseCircle className="w-3.5 h-3.5" /> Pause</> : <><PlayCircle className="w-3.5 h-3.5" /> Resume</>}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ExpenditurePage;