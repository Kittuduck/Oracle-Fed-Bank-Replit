import React, { useState } from 'react';
import { ArrowLeft, Sun, Moon, TrendingUp, Filter, Download, Sparkles, Zap, ArrowRight, AlertCircle, Loader2, Check, X, FileText, PieChart as PieChartIcon, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { PersonaProfile } from '../data/personas';

interface PortfolioPageProps {
    onBack: () => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
    festival: 'DEFAULT' | 'DIWALI' | 'HOLI';
    persona: PersonaProfile | null;
}

const getPersonaPortfolioData = (personaId: string) => {
    const data: Record<string, any> = {
        advait: {
            summary: { totalValue: 8540200, investedValue: 7290000, totalReturns: 1250200, returnsPercentage: 17.15, dayChange: 45120, dayChangePercentage: 0.53 },
            displayValue: '₹85,40,200',
            allocation: [
                { name: 'Equity', value: 5124120, color: '#004d9c' },
                { name: 'Debt', value: 2135050, color: '#333333' },
                { name: 'Gold', value: 854020, color: '#f37021' },
                { name: 'Cash', value: 427010, color: '#059669' },
            ],
            holdings: [
                { id: 1, name: 'Mirae Asset Large Cap', type: 'Equity', category: 'Large Cap', value: 1250000, returns: 18.5, allocation: 15 },
                { id: 2, name: 'Parag Parikh Flexi Cap', type: 'Equity', category: 'Flexi Cap', value: 1840000, returns: 22.1, allocation: 21 },
                { id: 3, name: 'Kotak Emerging Equity', type: 'Equity', category: 'Mid Cap', value: 950000, returns: 28.4, allocation: 11 },
                { id: 4, name: 'Sovereign Gold Bond', type: 'Gold', category: 'SGB', value: 854020, returns: 12.2, allocation: 10 },
                { id: 5, name: 'HDFC Corporate Bond', type: 'Debt', category: 'Corporate', value: 1200000, returns: 7.8, allocation: 14 },
                { id: 6, name: 'Liquid Fund', type: 'Debt', category: 'Liquid', value: 935050, returns: 6.5, allocation: 11 },
            ],
            insight1: {
                title: 'Allocation Alert',
                tag: 'Opportunity',
                text: 'Equity exposure (60%) has surpassed your 55% target due to the recent Mid-Cap rally.',
                highlight: 'Rebalancing ₹4.2L',
                detail: 'into Debt instruments helps lock in profits and reduce volatility.',
                rebalanceResult: '₹4.2L moved to Debt. Risk reduced by 4%.',
            },
            insight2: {
                title: 'Sector Concentration',
                tag: 'Risk Note',
                overlapPercent: '32%',
                text: 'in Banking & Finance across "Mirae Asset" and "Kotak Emerging". Consider diversifying into Pharma or IT for better downside protection.',
                fund1: 'Mirae Asset Large Cap', fund1Exposure: '28%',
                fund2: 'Kotak Emerging Equity', fund2Exposure: '34%',
                sellFund: 'Mirae Asset Large Cap', sellAmount: '₹4,00,000',
                buyFund: 'Nifty Pharma Index ETF', buyAmount: '₹4,00,000',
                overlapAfter: '12%', returnBoost: '+0.8%',
            }
        },
        kapoor: {
            summary: { totalValue: 4520000, investedValue: 3850000, totalReturns: 670000, returnsPercentage: 17.4, dayChange: 8200, dayChangePercentage: 0.18 },
            displayValue: '₹45,20,000',
            allocation: [
                { name: 'Debt/FD', value: 2260000, color: '#333333' },
                { name: 'Pension Fund', value: 1130000, color: '#004d9c' },
                { name: 'Gold', value: 678000, color: '#f37021' },
                { name: 'PPF', value: 452000, color: '#059669' },
            ],
            holdings: [
                { id: 1, name: 'SBI Fixed Deposit', type: 'Debt', category: 'FD (5yr)', value: 1200000, returns: 7.2, allocation: 27 },
                { id: 2, name: 'Senior Citizen Savings', type: 'Debt', category: 'SCSS', value: 1060000, returns: 8.2, allocation: 23 },
                { id: 3, name: 'NPS Tier-1', type: 'Pension', category: 'Pension Fund', value: 1130000, returns: 10.5, allocation: 25 },
                { id: 4, name: 'Sovereign Gold Bond', type: 'Gold', category: 'SGB 2029', value: 678000, returns: 12.8, allocation: 15 },
                { id: 5, name: 'PPF Account', type: 'PPF', category: 'Tax-Free', value: 452000, returns: 7.1, allocation: 10 },
            ],
            insight1: {
                title: 'FD Maturity Alert',
                tag: 'Action Required',
                text: 'Your SBI FD of ₹12L matures in 30 days at 7.2%.',
                highlight: 'Reinvesting in SCSS at 8.2%',
                detail: 'would increase annual interest income by ₹12,000 with similar safety.',
                rebalanceResult: '₹12L moved to SCSS. Annual income increased by ₹12,000.',
            },
            insight2: {
                title: 'Tax Efficiency',
                tag: 'Savings Tip',
                overlapPercent: '₹18,000',
                text: 'in avoidable TDS on FD interest. Moving ₹5L to Senior Citizen Savings Scheme saves tax under Section 80TTB.',
                fund1: 'SBI Fixed Deposit', fund1Exposure: '₹86,400 TDS',
                fund2: 'Canara Bank FD', fund2Exposure: '₹42,000 TDS',
                sellFund: 'Canara Bank FD (Partial)', sellAmount: '₹5,00,000',
                buyFund: 'Senior Citizen Savings', buyAmount: '₹5,00,000',
                overlapAfter: '₹6,000', returnBoost: '+1.0%',
            }
        },
        rajesh: {
            summary: { totalValue: 25800000, investedValue: 21200000, totalReturns: 4600000, returnsPercentage: 21.7, dayChange: 185000, dayChangePercentage: 0.72 },
            displayValue: '₹2,58,00,000',
            allocation: [
                { name: 'Equity', value: 10320000, color: '#004d9c' },
                { name: 'Real Estate', value: 7740000, color: '#333333' },
                { name: 'Business Capital', value: 5160000, color: '#f37021' },
                { name: 'Debt/Liquid', value: 2580000, color: '#059669' },
            ],
            holdings: [
                { id: 1, name: 'HDFC Top 100 Fund', type: 'Equity', category: 'Large Cap', value: 4200000, returns: 19.8, allocation: 16 },
                { id: 2, name: 'Nippon India Small Cap', type: 'Equity', category: 'Small Cap', value: 3100000, returns: 32.5, allocation: 12 },
                { id: 3, name: 'Axis Mid Cap Fund', type: 'Equity', category: 'Mid Cap', value: 3020000, returns: 24.1, allocation: 12 },
                { id: 4, name: 'Commercial Property Fund', type: 'Real Estate', category: 'REIT', value: 7740000, returns: 14.2, allocation: 30 },
                { id: 5, name: 'Business Working Capital', type: 'Business', category: 'Operating', value: 5160000, returns: 18.0, allocation: 20 },
                { id: 6, name: 'ICICI Liquid Fund', type: 'Debt', category: 'Liquid', value: 2580000, returns: 6.8, allocation: 10 },
            ],
            insight1: {
                title: 'Liquidity Warning',
                tag: 'Urgent',
                text: 'Working capital locked in real estate (30%) limits business agility.',
                highlight: 'Freeing ₹15L from REIT',
                detail: 'into liquid funds provides a 6-month operational buffer for your textile business.',
                rebalanceResult: '₹15L moved to Liquid. Business liquidity improved by 3 months.',
            },
            insight2: {
                title: 'Concentration Risk',
                tag: 'Risk Note',
                overlapPercent: '42%',
                text: 'in Real Estate & Infrastructure. Market correction in realty could impact ₹77L. Diversify into IT and Pharma sectors.',
                fund1: 'Commercial Property Fund', fund1Exposure: '30% of Portfolio',
                fund2: 'Nippon India Small Cap', fund2Exposure: '15% Real Estate',
                sellFund: 'Commercial Property (Partial)', sellAmount: '₹15,00,000',
                buyFund: 'ICICI Prudential IT Fund', buyAmount: '₹15,00,000',
                overlapAfter: '22%', returnBoost: '+1.2%',
            }
        },
        ishan: {
            summary: { totalValue: 148500, investedValue: 125000, totalReturns: 23500, returnsPercentage: 18.8, dayChange: 1250, dayChangePercentage: 0.84 },
            displayValue: '₹1,48,500',
            allocation: [
                { name: 'Index Funds', value: 74250, color: '#004d9c' },
                { name: 'Stocks', value: 37125, color: '#333333' },
                { name: 'Digital Gold', value: 22275, color: '#f37021' },
                { name: 'Savings', value: 14850, color: '#059669' },
            ],
            holdings: [
                { id: 1, name: 'Nifty 50 Index SIP', type: 'Equity', category: 'Index Fund', value: 45000, returns: 16.2, allocation: 30 },
                { id: 2, name: 'Nifty Next 50 SIP', type: 'Equity', category: 'Index Fund', value: 29250, returns: 22.5, allocation: 20 },
                { id: 3, name: 'Zomato Shares', type: 'Stock', category: 'Mid Cap', value: 18000, returns: 45.0, allocation: 12 },
                { id: 4, name: 'Tata Motors Shares', type: 'Stock', category: 'Large Cap', value: 19125, returns: 28.3, allocation: 13 },
                { id: 5, name: 'Jar Digital Gold', type: 'Gold', category: 'Digital Gold', value: 22275, returns: 11.5, allocation: 15 },
                { id: 6, name: 'Fi Money Savings', type: 'Savings', category: 'High Yield', value: 14850, returns: 7.0, allocation: 10 },
            ],
            insight1: {
                title: 'SIP Streak',
                tag: 'On Track',
                text: 'Your Nifty 50 SIP of ₹2,500/month has been consistent for 18 months.',
                highlight: 'Increasing SIP by ₹500',
                detail: 'would grow your corpus by an extra ₹1.8L over 5 years at current returns.',
                rebalanceResult: 'SIP increased to ₹3,000. Projected corpus: ₹6.2L in 5 years.',
            },
            insight2: {
                title: 'Stock Concentration',
                tag: 'Risk Note',
                overlapPercent: '25%',
                text: 'of your portfolio is in just 2 individual stocks. A single stock drop could significantly impact your small portfolio.',
                fund1: 'Zomato Shares', fund1Exposure: '12% of Portfolio',
                fund2: 'Tata Motors Shares', fund2Exposure: '13% of Portfolio',
                sellFund: 'Tata Motors (Partial)', sellAmount: '₹8,000',
                buyFund: 'Nifty 50 Index SIP (Top-up)', buyAmount: '₹8,000',
                overlapAfter: '15%', returnBoost: '+0.5%',
            }
        },
        anjali: {
            summary: { totalValue: 2840000, investedValue: 2380000, totalReturns: 460000, returnsPercentage: 19.3, dayChange: 12500, dayChangePercentage: 0.44 },
            displayValue: '₹28,40,000',
            allocation: [
                { name: 'Gold', value: 852000, color: '#f37021' },
                { name: 'PPF/SSY', value: 710000, color: '#004d9c' },
                { name: 'Mutual Funds', value: 852000, color: '#333333' },
                { name: 'FD/RD', value: 426000, color: '#059669' },
            ],
            holdings: [
                { id: 1, name: 'Physical Gold + SGB', type: 'Gold', category: 'Gold', value: 852000, returns: 14.5, allocation: 30 },
                { id: 2, name: 'PPF Account', type: 'PPF', category: 'Tax-Free', value: 420000, returns: 7.1, allocation: 15 },
                { id: 3, name: 'Sukanya Samriddhi (Meera)', type: 'SSY', category: "Children's Fund", value: 290000, returns: 8.2, allocation: 10 },
                { id: 4, name: 'SBI Balanced Advantage', type: 'Equity', category: 'Hybrid', value: 480000, returns: 15.8, allocation: 17 },
                { id: 5, name: 'HDFC Children Gift Fund', type: 'Equity', category: 'Education', value: 372000, returns: 18.2, allocation: 13 },
                { id: 6, name: 'Post Office RD', type: 'FD', category: 'Recurring', value: 426000, returns: 6.9, allocation: 15 },
            ],
            insight1: {
                title: 'Education Fund Gap',
                tag: 'Important',
                text: "Meera's college fund (SSY + Gift Fund) has ₹6.6L but projected need is ₹15L in 8 years.",
                highlight: 'Starting a ₹5,000/month SIP',
                detail: "in HDFC Children Gift Fund would bridge the ₹8.4L gap comfortably.",
                rebalanceResult: 'SIP of ₹5,000 started. Education goal on track for ₹15L.',
            },
            insight2: {
                title: 'Gold Overweight',
                tag: 'Risk Note',
                overlapPercent: '30%',
                text: 'in Gold is above the recommended 10-15%. Consider moving some to balanced equity funds for better long-term growth.',
                fund1: 'Physical Gold', fund1Exposure: '18% of Portfolio',
                fund2: 'Sovereign Gold Bond', fund2Exposure: '12% of Portfolio',
                sellFund: 'Physical Gold (Partial)', sellAmount: '₹3,00,000',
                buyFund: 'SBI Balanced Advantage', buyAmount: '₹3,00,000',
                overlapAfter: '19%', returnBoost: '+1.5%',
            }
        }
    };
    return data[personaId] || data['advait'];
};

const PortfolioPage: React.FC<PortfolioPageProps> = ({ onBack, isDarkMode, toggleTheme, festival, persona }) => {
    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
    const [rebalanceStatus, setRebalanceStatus] = useState<'IDLE' | 'PROCESSING' | 'COMPLETED'>('IDLE');
    const [overlapStatus, setOverlapStatus] = useState<'IDLE' | 'PROCESSING' | 'COMPLETED' | 'EXECUTED'>('IDLE');
    const [showReport, setShowReport] = useState(false);
    const [executionStep, setExecutionStep] = useState<'DETAILS' | 'PROCESSING' | 'SUCCESS'>('DETAILS');

    const pData = getPersonaPortfolioData(persona?.id || 'advait');

    const portfolioSummary = pData.summary;
    const allocationData = pData.allocation;
    const holdings = pData.holdings;

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

                <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-20">
                    {/* Summary Card */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="lg:col-span-2 bg-white dark:bg-[#15161a] rounded-xl p-4 sm:p-6 border border-[#E0E0E0] dark:border-slate-800 shadow-federal dark:shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-federalblue-900/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div className="flex justify-between items-start mb-4 sm:mb-6 gap-3">
                                    <div className="min-w-0">
                                        <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Portfolio Value</p>
                                        <h2 className="text-2xl sm:text-4xl font-light text-[#333333] dark:text-white tracking-tight truncate">
                                            {pData.displayValue}<span className="text-slate-400 text-lg sm:text-2xl">.00</span>
                                        </h2>
                                    </div>
                                    <div className="flex flex-col items-end flex-shrink-0">
                                        <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md text-xs sm:text-sm font-bold whitespace-nowrap">
                                            <TrendingUp className="w-3.5 h-3.5" />
                                            +{portfolioSummary.returnsPercentage}%
                                        </span>
                                        <span className="text-[10px] sm:text-xs text-slate-500 mt-1">All Time Returns</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 sm:gap-8 border-t border-[#E0E0E0] dark:border-slate-800/50 pt-4 sm:pt-6">
                                    <div>
                                        <p className="text-[10px] sm:text-xs text-slate-500 mb-1">Invested Amount</p>
                                        <p className="text-sm sm:text-lg font-medium text-slate-700 dark:text-slate-300">{formatCurrency(portfolioSummary.investedValue)}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] sm:text-xs text-slate-500 mb-1">1 Day Change</p>
                                        <p className="text-sm sm:text-lg font-medium text-emerald-700 dark:text-emerald-400">
                                            +{formatCurrency(portfolioSummary.dayChange)}
                                            <span className="text-[10px] sm:text-xs font-normal opacity-80 ml-1">({portfolioSummary.dayChangePercentage}%)</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Allocation Chart Card */}
                        <div className="bg-white dark:bg-[#15161a] rounded-xl p-4 sm:p-6 border border-[#E0E0E0] dark:border-slate-800 shadow-federal dark:shadow-sm flex flex-col relative overflow-hidden">
                            <h3 className="text-sm font-bold text-[#333333] dark:text-white mb-2 z-10 relative">Asset Allocation</h3>

                            <div className="flex items-center justify-between flex-1 min-h-[180px] relative z-10">
                                <div className="relative w-[50%] sm:w-[55%] h-[180px] flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RePieChart>
                                            <Pie
                                                activeIndex={activeIndex}
                                                activeShape={renderActiveShape}
                                                data={allocationData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius="60%"
                                                outerRadius="82%"
                                                paddingAngle={4}
                                                dataKey="value"
                                                onMouseEnter={onPieEnter}
                                                onMouseLeave={onPieLeave}
                                                cornerRadius={4}
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

                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 text-center px-1 truncate w-full">
                                            {activeItem ? activeItem.name : 'Total'}
                                        </span>
                                        <span className={`font-bold text-[#333333] dark:text-white tracking-tighter ${activeItem ? 'text-sm sm:text-lg' : 'text-base sm:text-xl'}`}>
                                            {activeItem
                                                ? (activeItem.value / 100000).toFixed(1) + 'L'
                                                : (portfolioSummary.totalValue / 100000).toFixed(1) + 'L'
                                            }
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center gap-2.5 w-[48%] sm:w-[40%] pl-1 sm:pl-2">
                                    {allocationData.map((item, index) => (
                                        <div
                                            key={item.name}
                                            className={`flex items-center gap-1.5 sm:gap-2 transition-opacity duration-300 group cursor-default ${activeIndex !== undefined && activeIndex !== index ? 'opacity-40' : 'opacity-100'}`}
                                            onMouseEnter={() => setActiveIndex(index)}
                                            onMouseLeave={() => setActiveIndex(undefined)}
                                        >
                                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shadow-sm flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-200 leading-tight truncate">{item.name}</span>
                                                <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium">{Math.round((item.value / portfolioSummary.totalValue) * 100)}%</span>
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

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Insight 1 */}
                            <div className="bg-gradient-to-br from-white to-[#F9F9F9] dark:from-[#15161a] dark:to-[#1c1e24] border border-federalblue-100 dark:border-federalblue-800/30 rounded-xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-600"></div>
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-emerald-700 dark:text-emerald-400">
                                            <Zap className="w-3.5 h-3.5" />
                                        </div>
                                        <h4 className="text-sm font-bold text-[#333333] dark:text-white">{pData.insight1.title}</h4>
                                    </div>
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                                        {pData.insight1.tag}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                                    {pData.insight1.text} <span className="font-semibold text-[#333333] dark:text-white">{pData.insight1.highlight}</span> {pData.insight1.detail}
                                </p>

                                {rebalanceStatus === 'COMPLETED' ? (
                                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 flex items-start gap-2 animate-fade-in border border-emerald-100 dark:border-emerald-800/30">
                                        <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Orders Placed</p>
                                            <p className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80 mt-0.5">{pData.insight1.rebalanceResult}</p>
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
                                        <h4 className="text-sm font-bold text-[#333333] dark:text-white">{pData.insight2.title}</h4>
                                    </div>
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-federalgold-50 dark:bg-federalgold-900/20 text-federalgold-600 dark:text-federalgold-400 uppercase tracking-wide">
                                        {pData.insight2.tag}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                                    Your portfolio has a <span className="font-semibold text-[#333333] dark:text-white">high overlap ({pData.insight2.overlapPercent})</span> {pData.insight2.text}
                                </p>

                                {overlapStatus === 'EXECUTED' ? (
                                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 flex items-start gap-2 animate-fade-in border border-emerald-100 dark:border-emerald-800/30">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Optimization Active</p>
                                            <p className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80 mt-0.5">
                                                Orders executed. Overlap reduced to {pData.insight2.overlapAfter}.
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
                            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-[#E0E0E0] dark:border-slate-800 bg-[#F9F9F9] dark:bg-[#1c1e24]/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <div className="col-span-5 lg:col-span-4">Asset Name</div>
                                <div className="col-span-3 hidden lg:block">Category</div>
                                <div className="col-span-4 lg:col-span-3 text-right">Current Value</div>
                                <div className="col-span-3 lg:col-span-2 text-right">Returns</div>
                            </div>

                            <div className="divide-y divide-[#E0E0E0] dark:divide-slate-800">
                                {holdings.map((holding) => (
                                    <div key={holding.id} className="p-4 hover:bg-[#F9F9F9] dark:hover:bg-slate-800/30 transition-colors cursor-pointer group">
                                        <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
                                            <div className="col-span-5 lg:col-span-4">
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
                                            <div className="col-span-3 hidden lg:block text-sm text-slate-600 dark:text-slate-400">
                                                {holding.category}
                                            </div>
                                            <div className="col-span-4 lg:col-span-3 text-right">
                                                <p className="text-sm font-medium text-[#333333] dark:text-white">{formatCurrency(holding.value)}</p>
                                                <p className="text-xs text-slate-500">{holding.allocation}%</p>
                                            </div>
                                            <div className="col-span-3 lg:col-span-2 text-right">
                                                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">+{holding.returns}%</p>
                                                <p className="text-xs text-slate-500 hidden lg:block">CAGR</p>
                                            </div>
                                        </div>
                                        <div className="sm:hidden flex justify-between items-center">
                                            <div className="min-w-0 flex-1 mr-3">
                                                <h4 className="text-sm font-semibold text-[#333333] dark:text-white truncate">{holding.name}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`text-[9px] px-1.5 py-0.5 rounded-sm border ${holding.type === 'Equity' ? 'bg-federalblue-50 dark:bg-federalblue-900/10 text-federalblue-900 dark:text-federalblue-400 border-federalblue-100 dark:border-federalblue-800/30' :
                                                        holding.type === 'Gold' ? 'bg-federalgold-50 dark:bg-federalgold-900/10 text-federalgold-600 dark:text-federalgold-400 border-federalgold-100 dark:border-federalgold-800/30' :
                                                            'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                                                        }`}>
                                                        {holding.type}
                                                    </span>
                                                    <span className="text-[9px] text-slate-400">{holding.category}</span>
                                                </div>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="text-sm font-medium text-[#333333] dark:text-white">{formatCurrency(holding.value)}</p>
                                                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">+{holding.returns}%</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Optimization Report Modal */}
                {showReport && (
                    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white dark:bg-[#15161a] rounded-t-xl sm:rounded-xl w-full sm:max-w-2xl border border-[#E0E0E0] dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
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
                                                    Our algorithms detected a <span className="font-semibold text-[#333333] dark:text-white">{pData.insight2.overlapPercent} overlap</span> {pData.insight2.text}
                                                </p>
                                                <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                                                    <div className="flex-1 bg-white dark:bg-[#15161a] p-3 rounded-lg border border-[#E0E0E0] dark:border-slate-800/50">
                                                        <p className="text-xs text-slate-500 mb-1 truncate">{pData.insight2.fund1}</p>
                                                        <p className="text-base sm:text-lg font-bold text-[#333333] dark:text-white">{pData.insight2.fund1Exposure} <span className="text-xs font-medium text-slate-400">Exposure</span></p>
                                                    </div>
                                                    <div className="flex-1 bg-white dark:bg-[#15161a] p-3 rounded-lg border border-[#E0E0E0] dark:border-slate-800/50">
                                                        <p className="text-xs text-slate-500 mb-1 truncate">{pData.insight2.fund2}</p>
                                                        <p className="text-base sm:text-lg font-bold text-[#333333] dark:text-white">{pData.insight2.fund2Exposure} <span className="text-xs font-medium text-slate-400">Exposure</span></p>
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
                                                                <p className="font-semibold text-[#333333] dark:text-white">{pData.insight2.sellFund}</p>
                                                            </div>
                                                            <p className="text-sm font-mono font-medium text-slate-600 dark:text-slate-400">{pData.insight2.sellAmount}</p>
                                                        </div>
                                                    </div>
                                                    <div className="relative pl-10">
                                                        <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 flex items-center justify-center">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                                                        </div>
                                                        <div className="bg-white dark:bg-[#15161a] border border-[#E0E0E0] dark:border-slate-800 rounded-lg p-4 flex justify-between items-center">
                                                            <div>
                                                                <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">Buy</p>
                                                                <p className="font-semibold text-[#333333] dark:text-white">{pData.insight2.buyFund}</p>
                                                            </div>
                                                            <p className="text-sm font-mono font-medium text-slate-600 dark:text-slate-400">{pData.insight2.buyAmount}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Section 3: Projected Impact */}
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">3. Projected Impact</h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                                <div className="p-4 rounded-lg bg-federalblue-50 dark:bg-federalblue-900/10 border border-federalblue-100 dark:border-federalblue-900/20 text-center">
                                                    <PieChartIcon className="w-5 h-5 text-federalblue-900 mx-auto mb-2" />
                                                    <p className="text-xs text-slate-500 mb-1">Overlap</p>
                                                    <p className="text-lg font-bold text-[#333333] dark:text-white">{pData.insight2.overlapPercent} <span className="text-slate-400">→</span> {pData.insight2.overlapAfter}</p>
                                                </div>
                                                <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 text-center">
                                                    <ArrowUpRight className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
                                                    <p className="text-xs text-slate-500 mb-1">Exp. Return</p>
                                                    <p className="text-lg font-bold text-[#333333] dark:text-white">{pData.insight2.returnBoost}</p>
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
                                        Placing orders to sell {pData.insight2.sellFund} and buy {pData.insight2.buyFund}...
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
                                        Your portfolio has been rebalanced. The overlap is now reduced to {pData.insight2.overlapAfter} and projected returns have improved by {pData.insight2.returnBoost}.
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