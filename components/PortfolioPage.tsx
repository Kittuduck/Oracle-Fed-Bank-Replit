import React, { useState } from 'react';
import { ArrowLeft, Sun, Moon, TrendingUp, Filter, Download, Sparkles, Zap, ArrowRight, AlertCircle, Loader2, Check, X, FileText, PieChart as PieChartIcon, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector, BarChart, Bar, XAxis, YAxis } from 'recharts';

interface PortfolioPageProps {
    onBack: () => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
    festival: 'DEFAULT' | 'DIWALI' | 'HOLI';
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ onBack, isDarkMode, toggleTheme, festival }) => {
    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
    const [rebalanceStatus, setRebalanceStatus] = useState<'IDLE' | 'PROCESSING' | 'COMPLETED'>('IDLE');
    const [overlapStatus, setOverlapStatus] = useState<'IDLE' | 'PROCESSING' | 'COMPLETED' | 'EXECUTED'>('IDLE');
    const [showReport, setShowReport] = useState(false);
    const [executionStep, setExecutionStep] = useState<'DETAILS' | 'PROCESSING' | 'SUCCESS'>('DETAILS');

    // Mock Data
    const portfolioSummary = {
        totalValue: 8540200,
        investedValue: 7290000,
        totalReturns: 1250200,
        returnsPercentage: 17.15,
        dayChange: 45120,
        dayChangePercentage: 0.53
    };

    const allocationData = [
        { name: 'Equity', value: 5124120, color: '#004d9c' }, // Federal Blue
        { name: 'Debt', value: 2135050, color: '#333333' },   // Slate
        { name: 'Gold', value: 854020, color: '#f37021' },    // Federal Orange
        { name: 'Cash', value: 427010, color: '#059669' },    // Emerald Green
    ];

    const holdings = [
        { id: 1, name: 'Mirae Asset Large Cap', type: 'Equity', category: 'Large Cap', value: 1250000, returns: 18.5, allocation: 15 },
        { id: 2, name: 'Parag Parikh Flexi Cap', type: 'Equity', category: 'Flexi Cap', value: 1840000, returns: 22.1, allocation: 21 },
        { id: 3, name: 'Kotak Emerging Equity', type: 'Equity', category: 'Mid Cap', value: 950000, returns: 28.4, allocation: 11 },
        { id: 4, name: 'Sovereign Gold Bond', type: 'Gold', category: 'SGB', value: 854020, returns: 12.2, allocation: 10 },
        { id: 5, name: 'HDFC Corporate Bond', type: 'Debt', category: 'Corporate', value: 1200000, returns: 7.8, allocation: 14 },
        { id: 6, name: 'Liquid Fund', type: 'Debt', category: 'Liquid', value: 935050, returns: 6.5, allocation: 11 },
    ];

    const formatCurrency = (val: number) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
        return `₹${val.toLocaleString()}`;
    };

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    const onPieLeave = () => {
        setActiveIndex(undefined);
    };

    const handleRebalance = () => {
        setRebalanceStatus('PROCESSING');
        // Simulate API call
        setTimeout(() => {
            setRebalanceStatus('COMPLETED');
        }, 2000);
    };

    const handleOverlapAnalysis = () => {
        setOverlapStatus('PROCESSING');
        // Simulate API call
        setTimeout(() => {
            setOverlapStatus('COMPLETED');
        }, 2000);
    };

    const handleExecuteStrategy = () => {
        setExecutionStep('PROCESSING');
        // Simulate execution delay
        setTimeout(() => {
            setExecutionStep('SUCCESS');
            setOverlapStatus('EXECUTED');
        }, 2000);
    };

    const handleCloseReport = () => {
        setShowReport(false);
        // Reset after animation
        setTimeout(() => setExecutionStep('DETAILS'), 500);
    };

    // Custom renderer for the active slice (hover effect)
    const renderActiveShape = (props: any) => {
        const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
        return (
            <g>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 6} // Expand slice slightly less
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                    cornerRadius={6}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={innerRadius - 2}
                    outerRadius={outerRadius + 6}
                    fill={fill}
                    opacity={0.2} // Glow effect
                    cornerRadius={8}
                />
            </g>
        );
    };

    // Determine what to show in the center
    const activeItem = activeIndex !== undefined ? allocationData[activeIndex] : null;

    return (
        <div className={`min-h-screen transition-all duration-700 ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-white text-[#333333]'} ${festival !== 'DEFAULT' ? `theme-festive-${festival.toLowerCase()}` : ''}`}>
            <div className="bg-transparent min-h-screen font-sans">

                {/* Navigation */}
                <nav className="sticky top-0 bg-white/95 dark:bg-zinc-950/90 backdrop-blur-xl z-50 border-b border-[#E0E0E0] dark:border-zinc-800 transition-colors">
                    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-federalblue-900 rounded-full hover:bg-[#F6F6F6] dark:hover:bg-slate-800/50 transition-colors">
                                <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
                            </button>
                            <span className="font-semibold text-lg text-[#333333] dark:text-white">Investment Portfolio</span>
                        </div>
                        <button onClick={toggleTheme} className="p-2 text-slate-500 hover:text-federalblue-900 transition-colors">
                            {isDarkMode ? <Sun className="w-5 h-5" strokeWidth={1.5} /> : <Moon className="w-5 h-5" strokeWidth={1.5} />}
                        </button>
                    </div>
                </nav>

                <main className="max-w-6xl mx-auto px-6 py-8 space-y-8 pb-20">
                    {/* Summary Card */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 bg-white dark:bg-[#15161a] rounded-xl p-6 border border-[#E0E0E0] dark:border-slate-800 shadow-federal dark:shadow-sm relative overflow-hidden group">
                            {/* Decoration */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-federalblue-900/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Portfolio Value</p>
                                        <h2 className="text-4xl font-light text-[#333333] dark:text-white tracking-tight">
                                            ₹85,40,200<span className="text-slate-400 text-2xl">.00</span>
                                        </h2>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-md text-sm font-bold">
                                            <TrendingUp className="w-4 h-4" />
                                            +{portfolioSummary.returnsPercentage}%
                                        </span>
                                        <span className="text-xs text-slate-500 mt-1.5">All Time Returns</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 border-t border-[#E0E0E0] dark:border-slate-800/50 pt-6">
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Invested Amount</p>
                                        <p className="text-lg font-medium text-slate-700 dark:text-slate-300">{formatCurrency(portfolioSummary.investedValue)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">1 Day Change</p>
                                        <p className="text-lg font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                                            +{formatCurrency(portfolioSummary.dayChange)}
                                            <span className="text-xs font-normal opacity-80">({portfolioSummary.dayChangePercentage}%)</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Allocation Chart Card */}
                        <div className="bg-white dark:bg-[#15161a] rounded-xl p-6 border border-[#E0E0E0] dark:border-slate-800 shadow-federal dark:shadow-sm flex flex-col h-full relative overflow-hidden">
                            <h3 className="text-sm font-bold text-[#333333] dark:text-white mb-2 z-10 relative">Asset Allocation</h3>

                            <div className="flex items-center justify-between flex-1 min-h-[200px] relative z-10">
                                {/* Chart Section - Left */}
                                <div className="relative w-[55%] h-[200px] flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RePieChart>
                                            <Pie
                                                activeIndex={activeIndex}
                                                activeShape={renderActiveShape}
                                                data={allocationData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius="65%" // Responsive relative size
                                                outerRadius="85%" // Responsive relative size
                                                paddingAngle={5}
                                                dataKey="value"
                                                onMouseEnter={onPieEnter}
                                                onMouseLeave={onPieLeave}
                                                cornerRadius={5}
                                                stroke="none"
                                            >
                                                {allocationData.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={entry.color}
                                                        stroke={isDarkMode ? '#09090b' : '#ffffff'}
                                                        strokeWidth={2}
                                                        style={{
                                                            opacity: activeIndex === undefined || activeIndex === index ? 1 : 0.6,
                                                            transition: 'opacity 0.3s'
                                                        }}
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                                                    border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                                    padding: '8px 12px'
                                                }}
                                                itemStyle={{
                                                    fontSize: '12px',
                                                    fontWeight: 500,
                                                    color: isDarkMode ? '#fff' : '#000'
                                                }}
                                                formatter={(value: number) => [formatCurrency(value), 'Value']}
                                                separator=": "
                                            />
                                        </RePieChart>
                                    </ResponsiveContainer>

                                    {/* Dynamic Center Label - Perfectly Centered via Absolute */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 text-center px-2 truncate w-full">
                                            {activeItem ? activeItem.name : 'Total'}
                                        </span>
                                        <span className={`font-bold text-[#333333] dark:text-white tracking-tighter ${activeItem ? 'text-lg' : 'text-xl'}`}>
                                            {activeItem
                                                ? (activeItem.value / 100000).toFixed(2) + 'L'
                                                : (portfolioSummary.totalValue / 100000).toFixed(1) + 'L'
                                            }
                                        </span>
                                    </div>
                                </div>

                                {/* Legend Section - Right Side */}
                                <div className="flex flex-col justify-center gap-3 w-[40%] pl-2">
                                    {allocationData.map((item, index) => (
                                        <div
                                            key={item.name}
                                            className={`flex items-start gap-2 transition-opacity duration-300 group cursor-default ${activeIndex !== undefined && activeIndex !== index ? 'opacity-40' : 'opacity-100'}`}
                                            onMouseEnter={() => setActiveIndex(index)}
                                            onMouseLeave={() => setActiveIndex(undefined)}
                                        >
                                            <div className="w-2.5 h-2.5 rounded-full shadow-sm mt-1 flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-none truncate">{item.name}</span>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span className="text-[10px] text-slate-500 font-medium">{Math.round((item.value / portfolioSummary.totalValue) * 100)}%</span>
                                                    <span className="text-[10px] text-slate-300 dark:text-slate-600">|</span>
                                                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{(item.value / 100000).toFixed(1)}L</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Oracle Portfolio Insights */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-federalblue-50 dark:bg-federalblue-900/20 rounded-lg">
                                <Sparkles className="w-4 h-4 text-federalblue-900 dark:text-federalblue-400" />
                            </div>
                            <h3 className="text-lg font-bold text-[#333333] dark:text-white">Oracle Portfolio Insights</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Insight 1 */}
                            <div className="bg-gradient-to-br from-white to-[#F9F9F9] dark:from-[#15161a] dark:to-[#1c1e24] border border-federalblue-100 dark:border-federalblue-800/30 rounded-xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-600"></div>
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-emerald-700 dark:text-emerald-400">
                                            <Zap className="w-3.5 h-3.5" />
                                        </div>
                                        <h4 className="text-sm font-bold text-[#333333] dark:text-white">Allocation Alert</h4>
                                    </div>
                                    {/* Smaller Tag */}
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                                        Opportunity
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                                    Equity exposure (60%) has surpassed your 55% target due to the recent Mid-Cap rally. <span className="font-semibold text-[#333333] dark:text-white">Rebalancing ₹4.2L</span> into Debt instruments helps lock in profits and reduce volatility.
                                </p>

                                {rebalanceStatus === 'COMPLETED' ? (
                                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 flex items-start gap-2 animate-fade-in border border-emerald-100 dark:border-emerald-800/30">
                                        <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Rebalancing Orders Placed</p>
                                            <p className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80 mt-0.5">₹4.2L moved to Debt. Risk reduced by 4%.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleRebalance}
                                        disabled={rebalanceStatus === 'PROCESSING'}
                                        className="text-xs font-semibold text-white bg-federalblue-900 dark:bg-white dark:text-federalblue-900 px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {rebalanceStatus === 'PROCESSING' ? (
                                            <>Processing <Loader2 className="w-3 h-3 animate-spin" /></>
                                        ) : (
                                            <>Review Rebalancing <ArrowRight className="w-3 h-3" /></>
                                        )}
                                    </button>
                                )}
                            </div>

                            {/* Insight 2 */}
                            <div className="bg-gradient-to-br from-white to-[#F9F9F9] dark:from-[#15161a] dark:to-[#1c1e24] border border-[#E0E0E0] dark:border-slate-800 rounded-xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all">
                                <div className="absolute top-0 left-0 w-1 h-full bg-federalgold-500"></div>
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-federalgold-50 dark:bg-federalgold-900/20 rounded-full text-federalgold-600 dark:text-federalgold-400">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                        </div>
                                        <h4 className="text-sm font-bold text-[#333333] dark:text-white">Sector Concentration</h4>
                                    </div>
                                    {/* Smaller Tag */}
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-federalgold-50 dark:bg-federalgold-900/20 text-federalgold-600 dark:text-federalgold-400 uppercase tracking-wide">
                                        Risk Note
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                                    Your portfolio has a <span className="font-semibold text-[#333333] dark:text-white">high overlap (32%)</span> in Banking & Finance across "Mirae Asset" and "Kotak Emerging". Consider diversifying into Pharma or IT for better downside protection.
                                </p>

                                {overlapStatus === 'EXECUTED' ? (
                                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 flex items-start gap-2 animate-fade-in border border-emerald-100 dark:border-emerald-800/30">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Optimization Active</p>
                                            <p className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80 mt-0.5">
                                                Orders executed. Overlap reduced to 12%.
                                            </p>
                                        </div>
                                    </div>
                                ) : overlapStatus === 'COMPLETED' ? (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-100 dark:border-blue-800/30 animate-fade-in">
                                        <div className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-blue-700 dark:text-blue-400 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Optimization Report Ready</p>
                                                <p className="text-[10px] text-blue-600/80 dark:text-blue-400/80 mt-0.5 mb-2">Analysis complete. Overlap reduction strategy prepared.</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setShowReport(true)}
                                            className="w-full py-1.5 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/40 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1"
                                        >
                                            <FileText className="w-3 h-3" />
                                            View Full Report
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleOverlapAnalysis}
                                        disabled={overlapStatus === 'PROCESSING'}
                                        className="text-xs font-semibold text-slate-600 dark:text-slate-300 border border-[#E0E0E0] dark:border-slate-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {overlapStatus === 'PROCESSING' ? (
                                            <>Analyzing <Loader2 className="w-3 h-3 animate-spin" /></>
                                        ) : (
                                            <>Analyze Overlap <ArrowRight className="w-3 h-3" /></>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Holdings Section */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-[#333333] dark:text-white">Your Holdings</h3>
                            <div className="flex gap-2">
                                <button className="p-2 text-slate-500 hover:text-federalblue-900 dark:hover:text-white transition-colors bg-white dark:bg-[#15161a] border border-[#E0E0E0] dark:border-slate-800 rounded-lg">
                                    <Filter className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-slate-500 hover:text-federalblue-900 dark:hover:text-white transition-colors bg-white dark:bg-[#15161a] border border-[#E0E0E0] dark:border-slate-800 rounded-lg">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#15161a] border border-[#E0E0E0] dark:border-slate-800 rounded-xl overflow-hidden shadow-federal dark:shadow-none">
                            <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#E0E0E0] dark:border-slate-800 bg-[#F9F9F9] dark:bg-[#1c1e24]/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <div className="col-span-5 md:col-span-4">Asset Name</div>
                                <div className="col-span-3 hidden md:block">Category</div>
                                <div className="col-span-4 md:col-span-3 text-right">Current Value</div>
                                <div className="col-span-3 md:col-span-2 text-right">Returns</div>
                            </div>

                            <div className="divide-y divide-[#E0E0E0] dark:divide-slate-800">
                                {holdings.map((holding) => (
                                    <div key={holding.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#F9F9F9] dark:hover:bg-slate-800/30 transition-colors cursor-pointer group">
                                        <div className="col-span-5 md:col-span-4">
                                            <h4 className="text-sm font-semibold text-[#333333] dark:text-white group-hover:text-federalblue-900 dark:group-hover:text-federalblue-400 transition-colors">{holding.name}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded-sm border ${holding.type === 'Equity' ? 'bg-federalblue-50 dark:bg-federalblue-900/10 text-federalblue-900 dark:text-federalblue-400 border-federalblue-100 dark:border-federalblue-800/30' :
                                                    holding.type === 'Gold' ? 'bg-federalgold-50 dark:bg-federalgold-900/10 text-federalgold-600 dark:text-federalgold-400 border-federalgold-100 dark:border-federalgold-800/30' :
                                                        'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                                                    }`}>
                                                    {holding.type}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-span-3 hidden md:block text-sm text-slate-600 dark:text-slate-400">
                                            {holding.category}
                                        </div>
                                        <div className="col-span-4 md:col-span-3 text-right">
                                            <p className="text-sm font-medium text-[#333333] dark:text-white">{formatCurrency(holding.value)}</p>
                                            <p className="text-xs text-slate-500">{holding.allocation}% of Portfolio</p>
                                        </div>
                                        <div className="col-span-3 md:col-span-2 text-right">
                                            <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">+{holding.returns}%</p>
                                            <p className="text-xs text-slate-500 hidden md:block">CAGR</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Optimization Report Modal */}
                {showReport && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white dark:bg-[#15161a] rounded-xl w-full max-w-2xl border border-[#E0E0E0] dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                            <div className="px-6 py-4 border-b border-[#E0E0E0] dark:border-slate-800 flex justify-between items-center bg-[#F9F9F9] dark:bg-[#1c1e24]/50">
                                <div className="flex items-center gap-3">
                                    {executionStep !== 'SUCCESS' && (
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-400">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                    )}
                                    {executionStep !== 'SUCCESS' && (
                                        <div>
                                            <h3 className="font-bold text-[#333333] dark:text-white text-base">Portfolio Optimization Report</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">Ref: OR-2024-88 • Generated just now</p>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={handleCloseReport}
                                    className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {executionStep === 'DETAILS' && (
                                <>
                                    <div className="p-6 overflow-y-auto space-y-8">
                                        {/* Section 1: The Analysis */}
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">1. The Analysis</h4>
                                            <div className="bg-[#F9F9F9] dark:bg-[#0b0c10] border border-[#E0E0E0] dark:border-slate-800 rounded-lg p-4">
                                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                                    Our algorithms detected a <span className="font-semibold text-[#333333] dark:text-white">32% sector overlap</span> in Banking & Financial Services (BFSI). This high concentration increases portfolio volatility during sector-specific downturns.
                                                </p>
                                                <div className="mt-4 flex gap-4">
                                                    <div className="flex-1 bg-white dark:bg-[#15161a] p-3 rounded-lg border border-[#E0E0E0] dark:border-slate-800/50">
                                                        <p className="text-xs text-slate-500 mb-1">Mirae Asset Large Cap</p>
                                                        <p className="text-lg font-bold text-[#333333] dark:text-white">28% <span className="text-xs font-medium text-slate-400">BFSI Exposure</span></p>
                                                    </div>
                                                    <div className="flex-1 bg-white dark:bg-[#15161a] p-3 rounded-lg border border-[#E0E0E0] dark:border-slate-800/50">
                                                        <p className="text-xs text-slate-500 mb-1">Kotak Emerging Equity</p>
                                                        <p className="text-lg font-bold text-[#333333] dark:text-white">34% <span className="text-xs font-medium text-slate-400">BFSI Exposure</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Section 2: Recommended Strategy */}
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">2. Recommended Strategy</h4>
                                            <div className="relative">
                                                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-[#E0E0E0] dark:bg-slate-800"></div>
                                                <div className="space-y-4">
                                                    <div className="relative pl-10">
                                                        <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 flex items-center justify-center">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                                        </div>
                                                        <div className="bg-white dark:bg-[#15161a] border border-[#E0E0E0] dark:border-slate-800 rounded-lg p-4 flex justify-between items-center">
                                                            <div>
                                                                <p className="text-xs text-red-600 font-bold uppercase tracking-wider mb-1">Sell (Partial)</p>
                                                                <p className="font-semibold text-[#333333] dark:text-white">Mirae Asset Large Cap</p>
                                                            </div>
                                                            <p className="text-sm font-mono font-medium text-slate-600 dark:text-slate-400">₹4,00,000</p>
                                                        </div>
                                                    </div>
                                                    <div className="relative pl-10">
                                                        <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 flex items-center justify-center">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                                                        </div>
                                                        <div className="bg-white dark:bg-[#15161a] border border-[#E0E0E0] dark:border-slate-800 rounded-lg p-4 flex justify-between items-center">
                                                            <div>
                                                                <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">Buy</p>
                                                                <p className="font-semibold text-[#333333] dark:text-white">Nifty Pharma Index ETF</p>
                                                            </div>
                                                            <p className="text-sm font-mono font-medium text-slate-600 dark:text-slate-400">₹4,00,000</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Section 3: Projected Impact */}
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">3. Projected Impact</h4>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="p-4 rounded-lg bg-federalblue-50 dark:bg-federalblue-900/10 border border-federalblue-100 dark:border-federalblue-900/20 text-center">
                                                    <PieChartIcon className="w-5 h-5 text-federalblue-900 mx-auto mb-2" />
                                                    <p className="text-xs text-slate-500 mb-1">Overlap</p>
                                                    <p className="text-lg font-bold text-[#333333] dark:text-white">32% <span className="text-slate-400">→</span> 12%</p>
                                                </div>
                                                <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 text-center">
                                                    <ArrowUpRight className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
                                                    <p className="text-xs text-slate-500 mb-1">Exp. Return</p>
                                                    <p className="text-lg font-bold text-[#333333] dark:text-white">+0.8%</p>
                                                </div>
                                                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 text-center">
                                                    <Shield className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                                                    <p className="text-xs text-slate-500 mb-1">Risk Score</p>
                                                    <p className="text-lg font-bold text-[#333333] dark:text-white">High <span className="text-slate-400">→</span> Optimal</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 border-t border-[#E0E0E0] dark:border-slate-800 bg-[#F9F9F9] dark:bg-[#0b0c10] flex gap-3">
                                        <button
                                            onClick={handleCloseReport}
                                            className="flex-1 py-3 text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                                        >
                                            Close
                                        </button>
                                        <button
                                            onClick={handleExecuteStrategy}
                                            className="flex-[2] py-3 bg-federalblue-900 dark:bg-white text-white dark:text-black text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
                                        >
                                            Execute Strategy
                                        </button>
                                    </div>
                                </>
                            )}

                            {executionStep === 'PROCESSING' && (
                                <div className="p-12 flex flex-col items-center justify-center min-h-[400px] text-center">
                                    <div className="relative">
                                        <div className="w-16 h-16 border-4 border-[#E0E0E0] dark:border-slate-800 border-t-federalblue-900 dark:border-t-federalblue-500 rounded-full animate-spin"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Sparkles className="w-6 h-6 text-federalblue-900 dark:text-federalblue-500 animate-pulse" />
                                        </div>
                                    </div>
                                    <h3 className="mt-6 text-xl font-bold text-[#333333] dark:text-white">Executing Strategy</h3>
                                    <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xs">
                                        Placing orders to sell Mirae Asset and buy Nifty Pharma ETF...
                                    </p>
                                </div>
                            )}

                            {executionStep === 'SUCCESS' && (
                                <div className="p-12 flex flex-col items-center justify-center min-h-[400px] text-center animate-fade-in">
                                    <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-500">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#333333] dark:text-white">Optimization Complete</h3>
                                    <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-sm leading-relaxed">
                                        Your portfolio has been rebalanced. The overlap is now reduced to 12% and projected returns have improved by 0.8%.
                                    </p>

                                    <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-sm">
                                        <div className="bg-[#F9F9F9] dark:bg-[#0b0c10] p-4 rounded-lg border border-[#E0E0E0] dark:border-slate-800">
                                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Sell Order</p>
                                            <p className="font-bold text-[#333333] dark:text-white">Complete</p>
                                        </div>
                                        <div className="bg-[#F9F9F9] dark:bg-[#0b0c10] p-4 rounded-lg border border-[#E0E0E0] dark:border-slate-800">
                                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Buy Order</p>
                                            <p className="font-bold text-[#333333] dark:text-white">Processing</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCloseReport}
                                        className="mt-10 px-8 py-3 bg-federalblue-900 dark:bg-white text-white dark:text-black font-bold rounded-lg hover:opacity-90 transition-opacity w-full max-w-sm"
                                    >
                                        Done
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Internal Shield icon to match other lucide imports if needed, though most are imported
const Shield = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
);

export default PortfolioPage;