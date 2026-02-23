import React, { useState } from 'react';
import { ArrowLeft, Sun, Moon, Target, Sparkles, CreditCard, Zap, Smartphone, Dumbbell, GraduationCap, EyeOff } from 'lucide-react';
import GoalTracker, { Goal } from './components/GoalTracker';
import NeoBankDashboard from './components/NeoBankDashboard';
import AutomationHub from './components/AutomationHub';
import ProfileSection from './components/ProfileSection';
import EmbeddedOrchestratorChat from './components/EmbeddedOrchestratorChat';
import PortfolioPage from './components/PortfolioPage';
import OracleBriefHub from './components/OracleBriefHub';
import ExpenditurePage from './components/ExpenditurePage';
import OnboardingFlow from './components/OnboardingFlow';
import PaymentFlow from './components/PaymentFlow';
import UPIService from './components/UPIService';
import CardManagement from './components/CardManagement';
import SupportService from './components/SupportService';
import InvestmentsHub from './components/InvestmentsHub';
import LoansHub from './components/LoansHub';
import CardApplicationFlow from './components/CardApplicationFlow';
import NicheLendingHub from './components/NicheLendingHub';
import LegacyServices from './components/LegacyServices';
import BottomNav from './components/BottomNav';
import { SimulationUpdateData, NewGoalData } from './services/geminiService';

export interface Biller {
    id: string;
    name: string;
    amount: number;
    type: 'DUE' | 'AUTO';
    status?: 'ACTIVE' | 'PAUSED';
    dueDate: string;
    icon: any;
    category: string;
}

const App: React.FC = () => {
    const [view, setView] = useState<'DASHBOARD' | 'PROFILE' | 'GOALS' | 'ORACLE' | 'ORACLE_HUB' | 'AUTOMATION_HUB' | 'PORTFOLIO' | 'EXPENDITURE' | 'ONBOARDING' | 'PAYMENTS' | 'CARDS' | 'SUPPORT' | 'INVESTMENTS' | 'LOANS' | 'CARD_APPLY' | 'NICHE_LOANS' | 'LEGACY_SERVICES'>('DASHBOARD');
    const [payTab, setPayTab] = useState<'SEND' | 'BILL' | 'SCAN'>('SEND');
    // Default isDarkMode to false for Federal Bank Light Mode Brand
    const [isDarkMode, setIsDarkMode] = useState(false);

    // GLOBAL ORACLE STATE: Defaults to TRUE (Agentic Mode)
    const [oracleActive, setOracleActive] = useState(true);

    // FESTIVAL THEME: 'DEFAULT' | 'DIWALI' | 'HOLI'
    const [festival, setFestival] = useState<'DEFAULT' | 'DIWALI' | 'HOLI'>('DEFAULT');

    // State to handle transfer pre-fills from Oracle actions
    const [transferPrefill, setTransferPrefill] = useState<{ recipient: string, amount: string } | null>(null);
    const [oraclePrompt, setOraclePrompt] = useState<string>('');

    // Shared state for financial context across views
    const [goals, setGoals] = useState<Goal[]>([
        {
            id: 'g1',
            title: 'Fat FIRE (Retirement)',
            icon: Target,
            currentAmount: 42000000,
            targetAmount: 150000000,
            deadlineYear: 2040,
            status: 'ON_TRACK',
            projectedimpact: '+0.4% CAGR',
            history: [40800000, 41200000, 41500000, 41100000, 42000000],
            fundingSource: 'High-Growth Equity Portfolio',
            monthlyContribution: 250000,
            description: 'Early retirement corpus to maintain current lifestyle adjusted for inflation.',
            insights: [
                'Current equity allocation is optimal.',
                'Projected to hit target 14 months early at current rate.'
            ]
        },
        {
            id: 'g2',
            title: "Daughter's Education",
            icon: Target,
            currentAmount: 6500000,
            targetAmount: 25000000,
            deadlineYear: 2035,
            status: 'AT_RISK',
            projectedimpact: 'Shortfall Detected',
            fundingSource: 'Hybrid Debt Instruments',
            monthlyContribution: 50000,
            description: 'Ivy League tuition fund for Riya (Series A + Living expenses).',
            insights: [
                'Inflation for education sector trending at 11%.',
                'Recommended: Increase SIP by ₹15k/mo to bridge gap.'
            ]
        }
    ]);

    // Global billers state shared between Dashboard and Expenditure
    const [billers, setBillers] = useState<Biller[]>([
        { id: 'b1', name: 'Infinite Black Card', amount: 145000, type: 'DUE', dueDate: '3 days', icon: CreditCard, category: 'Finance' },
        { id: 'b2', name: 'Adani Electricity', amount: 4250, type: 'DUE', dueDate: '4 days', icon: Zap, category: 'Utilities' },
        { id: 'b3', name: 'Netflix Premium', amount: 649, type: 'AUTO', status: 'ACTIVE', dueDate: '5th of month', icon: Smartphone, category: 'Entertainment' },
        { id: 'b4', name: "Gold's Gym", amount: 3500, type: 'AUTO', status: 'ACTIVE', dueDate: '1st of month', icon: Dumbbell, category: 'Health' },
        { id: 'b5', name: 'Adobe Creative Cloud', amount: 4230, type: 'AUTO', status: 'PAUSED', dueDate: '15th of month', icon: Smartphone, category: 'Software' }
    ]);

    // Basic financial context for the orchestrator
    const [currentFinancials, setCurrentFinancials] = useState({
        liquid: 1240500,
        need: 0,
        goal: 25000000 // Daughter's education target
    });

    const handleAddGoal = (newGoal: Goal) => {
        setGoals(prev => [...prev, newGoal]);
    };

    const handleUpdateGoal = (updatedGoal: Goal) => {
        setGoals(prev => prev.map(g => g.id === updatedGoal.id ? updatedGoal : g));
    };

    const handleAddBiller = (newBiller: Biller) => {
        setBillers(prev => [...prev, newBiller]);
    };

    const handleToggleAutopay = (id: string) => {
        setBillers(prev => prev.map(b =>
            (b.id === id && b.type === 'AUTO') ? { ...b, status: b.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : b
        ));
    };

    const handleOracleGoalAdd = (data: NewGoalData) => {
        const newGoal: Goal = {
            id: `g-${Date.now()}`,
            title: data.title,
            icon: Target, // Default icon
            currentAmount: 0,
            targetAmount: data.targetAmount,
            deadlineYear: data.deadlineYear,
            status: 'ON_TRACK',
            projectedimpact: data.projectedImpact || 'Initiated via Oracle',
            fundingSource: data.fundingSource,
            history: [0],
            monthlyContribution: 0,
            description: `Strategic goal initiated via Oracle Intelligence.`,
            insights: ['Goal initialized. Setup auto-pay to begin tracking.']
        };
        handleAddGoal(newGoal);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleSimulationUpdate = (data: SimulationUpdateData) => {
        if (data.liquidCash) {
            setCurrentFinancials(prev => ({ ...prev, liquid: data.liquidCash }));
        }
        console.log("Simulation Update Received:", data);
    };

    const handlePayCreditCardBill = () => {
        setTransferPrefill({
            recipient: 'Infinite Black Card **** 1290',
            amount: '120000'
        });
        setView('DASHBOARD');
    };

    const handlePaymentSuccess = (amount: number) => {
        setCurrentFinancials(prev => ({ ...prev, liquid: prev.liquid - amount }));
    };

    const handleBookFD = (amount: number) => {
        setCurrentFinancials(prev => ({
            ...prev,
            liquid: prev.liquid - amount,
            goal: prev.goal + amount
        }));
    };

    const handleLoanDisbursal = (type: string, amount: number) => {
        setCurrentFinancials(prev => ({ ...prev, liquid: prev.liquid + amount }));
    };

    const renderContent = () => {
        if (view === 'PAYMENTS') {
            return (
                <PaymentFlow
                    onBack={() => setView('DASHBOARD')}
                    onPaymentSuccess={handlePaymentSuccess}
                    currentBalance={currentFinancials.liquid}
                    isDarkMode={isDarkMode}
                    initialTab={payTab}
                />
            );
        }

        if (view === 'CARDS') {
            return (
                <CardManagement
                    onBack={() => setView('DASHBOARD')}
                    isDarkMode={isDarkMode}
                />
            );
        }

        if (view === 'SUPPORT') {
            return (
                <SupportService
                    onBack={() => setView('DASHBOARD')}
                    isDarkMode={isDarkMode}
                    festival={festival}
                />
            );
        }

        if (view === 'INVESTMENTS') {
            return (
                <InvestmentsHub
                    onBack={() => setView('DASHBOARD')}
                    onBookFD={handleBookFD}
                    onViewPortfolio={() => setView('PORTFOLIO')}
                    currentBalance={currentFinancials.liquid}
                    isDarkMode={isDarkMode}
                    festival={festival}
                />
            );
        }

        if (view === 'LOANS') {
            return (
                <LoansHub
                    onBack={() => setView('DASHBOARD')}
                    onApplyLoan={handleLoanDisbursal}
                    isDarkMode={isDarkMode}
                    festival={festival}
                />
            );
        }

        if (view === 'CARD_APPLY') {
            return (
                <CardApplicationFlow
                    onBack={() => setView('DASHBOARD')}
                    onApplySuccess={() => setView('DASHBOARD')}
                    userProfile={{
                        income: 425000,
                        liquidCash: currentFinancials.liquid,
                        monthlySpend: 135000,
                        primarySpend: 'Lifestyle & Travel',
                        lifeStage: 'Early Career Professional'
                    }}
                    isDarkMode={isDarkMode}
                    festival={festival}
                />
            );
        }

        if (view === 'NICHE_LOANS') {
            return (
                <NicheLendingHub
                    onBack={() => setView('DASHBOARD')}
                    onApplySuccess={handleLoanDisbursal}
                    isDarkMode={isDarkMode}
                    festival={festival}
                />
            );
        }

        if (view === 'LEGACY_SERVICES') {
            return (
                <LegacyServices
                    onBack={() => setView('DASHBOARD')}
                    isDarkMode={isDarkMode}
                    festival={festival}
                />
            );
        }

        if (view === 'ONBOARDING') {
            return (
                <OnboardingFlow
                    onComplete={() => setView('DASHBOARD')}
                    onExit={() => setView('DASHBOARD')}
                    isDarkMode={isDarkMode}
                    festival={festival}
                />
            );
        }

        if (view === 'PROFILE') {
            return (
                <ProfileSection
                    onBack={() => setView('DASHBOARD')}
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                    oracleActive={oracleActive}
                    setOracleActive={setOracleActive}
                    festival={festival}
                />
            );
        }

        if (view === 'PORTFOLIO') {
            return (
                <PortfolioPage
                    onBack={() => setView('DASHBOARD')}
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                    festival={festival}
                />
            );
        }

        if (view === 'EXPENDITURE') {
            return (
                <ExpenditurePage
                    onBack={() => setView('DASHBOARD')}
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                    billers={billers}
                    onToggleAutopay={handleToggleAutopay}
                    onAddBiller={handleAddBiller}
                    festival={festival}
                />
            );
        }

        if (view === 'UPI') {
            return (
                <UPIService
                    onBack={() => setView('DASHBOARD')}
                    currentBalance={currentFinancials.liquid}
                    isDarkMode={isDarkMode}
                    festival={festival}
                />
            );
        }

        if (view === 'ORACLE') {
            return (
                <div className="fixed inset-0 z-[50] w-full max-w-md mx-auto bg-white dark:bg-[#15161a] transition-colors duration-300 shadow-2xl overflow-hidden shadow-apple-lg border-x-2 border-slate-800 flex flex-col">
                    <nav className="border-b border-[#E0E0E0] dark:border-slate-800/50 bg-white/95 dark:bg-[#15161a]/95 backdrop-blur-md shrink-0 py-4 px-6 flex justify-between items-center relative z-10 transition-colors">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setView('DASHBOARD')}
                                className="p-2 -ml-2 text-slate-500 hover:text-federalblue-900 dark:hover:text-white rounded-full transition-all active:scale-95"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-tr from-federalblue-900 to-federalblue-700 text-white shadow-md">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <div>
                                <h1 className="font-semibold text-sm tracking-tight text-federalblue-900 dark:text-white leading-none">Oracle AI</h1>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                    <p className="text-[10px] text-slate-500 font-medium tracking-tight">Agentic Mode Active</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-slate-500 hover:text-federalblue-900 dark:hover:text-white transition-colors active:scale-95"
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </nav>

                    <div className="flex-1 min-h-0 relative z-0 flex flex-col">
                        <EmbeddedOrchestratorChat
                            onUpdateSimulation={handleSimulationUpdate}
                            onAddGoal={handleOracleGoalAdd}
                            onNavigateToGoals={() => setView('GOALS')}
                            onNavigateToPortfolio={() => setView('PORTFOLIO')}
                            onNavigateToExpenditure={() => setView('EXPENDITURE')}
                            onNavigateToDashboard={() => setView('DASHBOARD')}
                            onPayCCBill={handlePayCreditCardBill}
                            currentFinancials={currentFinancials}
                            oracleActive={oracleActive}
                            initialPrompt={oraclePrompt}
                        />
                    </div>
                </div>
            );
        }

        if (view === 'ORACLE_HUB') {
            return (
                <div className="fixed inset-0 z-[40] w-full max-w-md mx-auto bg-white dark:bg-[#0b0c10] flex flex-col transition-colors duration-300 pb-20 border-x-2 border-slate-800 shadow-2xl overflow-hidden">
                    <nav className="border-b border-[#E0E0E0] dark:border-slate-800/50 bg-white/95 dark:bg-[#0b0c10]/95 backdrop-blur-md sticky top-0 z-50 shrink-0">
                        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setView('DASHBOARD')}
                                    className="p-2 -ml-2 text-slate-500 hover:text-federalblue-900 rounded-full transition-all"
                                >
                                    <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
                                </button>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-tr from-federalblue-900 to-federalblue-700 text-white shadow-sm">
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h1 className="font-semibold text-sm tracking-tight text-federalblue-900 dark:text-white leading-none">Oracle AI Hub</h1>
                                        <p className="text-[10px] text-slate-500 font-medium mt-1">Advanced Financial Insights</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={toggleTheme}
                                className="p-2 text-slate-500 hover:text-federalblue-900 transition-colors"
                            >
                                {isDarkMode ? <Sun className="w-5 h-5" strokeWidth={1.5} /> : <Moon className="w-5 h-5" strokeWidth={1.5} />}
                            </button>
                        </div>
                    </nav>
                    <div className="flex-1 overflow-hidden">
                        <OracleBriefHub
                            isDarkMode={isDarkMode}
                            festival={festival}
                            currentFinancials={currentFinancials}
                            onAction={(action) => {
                                if (action === 'Chat' || action === 'Windfall Allocation') {
                                    setOraclePrompt(action === 'Windfall Allocation' ? 'Windfall Allocation' : '');
                                    setView('ORACLE');
                                } else if (action === 'Track Goals') {
                                    setView('GOALS');
                                } else if (action === 'Investigate' || action === 'Review Plan' || action === 'OptimizeSubscriptions') {
                                    setView('EXPENDITURE');
                                } else if (action === 'Automation') {
                                    setView('AUTOMATION_HUB');
                                }
                            }}
                        />
                    </div>
                </div>
            );
        }

        if (view === 'AUTOMATION_HUB') {
            return (
                <div className="fixed inset-0 z-[40] w-full max-w-md mx-auto overflow-hidden">
                    <AutomationHub
                        isDarkMode={isDarkMode}
                        onBack={() => setView('ORACLE_HUB')}
                    />
                </div>
            );
        }

        if (view === 'GOALS') {
            return (
                <div className="min-h-screen bg-white dark:bg-[#0b0c10] text-slate-900 dark:text-slate-200 font-sans animate-fade-in transition-colors duration-300 pb-20">
                    <nav className="border-b border-[#E0E0E0] dark:border-slate-800/50 bg-white/95 dark:bg-[#0b0c10]/95 backdrop-blur-md sticky top-0 z-50">
                        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setView('DASHBOARD')}
                                    className="p-2 -ml-2 text-slate-500 hover:text-federalblue-900 rounded-full transition-all"
                                >
                                    <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
                                </button>
                                <span className="font-semibold text-lg tracking-tight text-federalblue-900 dark:text-white">Strategic Goals</span>
                            </div>
                            <button
                                onClick={toggleTheme}
                                className="p-2 text-slate-500 hover:text-federalblue-900 transition-colors"
                            >
                                {isDarkMode ? <Sun className="w-5 h-5" strokeWidth={1.5} /> : <Moon className="w-5 h-5" strokeWidth={1.5} />}
                            </button>
                        </div>
                    </nav>
                    <main className="max-w-6xl mx-auto px-6 py-10">
                        <GoalTracker
                            goals={goals}
                            onAddGoal={handleAddGoal}
                            onUpdateGoal={handleUpdateGoal}
                            isDarkMode={isDarkMode}
                            festival={festival}
                        />
                    </main>
                </div>
            );
        }

        return (
            <NeoBankDashboard
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                onOpenProfile={() => setView('PROFILE')}
                onOpenPortfolio={() => setView('PORTFOLIO')}
                onOpenExpenditure={() => setView('EXPENDITURE')}
                onOpenScanner={() => { setPayTab('SCAN'); setView('PAYMENTS'); }}
                onOpenCards={() => setView('CARDS')}
                onOpenSOS={() => setView('SUPPORT')}
                onOpenTransfer={() => { setPayTab('SEND'); setView('PAYMENTS'); }}
                onOpenInvestments={() => setView('INVESTMENTS')}
                onOpenLoans={() => setView('LOANS')}
                onOpenCardApply={() => setView('CARD_APPLY')}
                onOpenOnboarding={() => setView('ONBOARDING')}
                onOpenNicheLoans={() => setView('NICHE_LOANS')}
                onOpenLegacyServices={() => setView('LEGACY_SERVICES')}
                goals={goals}
                billers={billers}
                currentFinancials={currentFinancials}
                oracleActive={oracleActive}
                onNavigate={(page) => {
                    if (page === 'ORACLE') setOraclePrompt('');
                    setView(page);
                }}
                festival={festival}
                setFestival={setFestival}
            />
        );
    };

    return (
        <div className={`h-full ${isDarkMode ? 'dark' : ''} ${festival !== 'DEFAULT' ? `theme-festive-${festival.toLowerCase()}` : ''} bg-gray-50 dark:bg-gray-900 flex justify-center min-h-screen`}>
            <div className="w-full max-w-md h-full min-h-screen bg-white dark:bg-zinc-950 border-2 border-slate-800 shadow-2xl relative overflow-hidden">
                {renderContent()}
                {(view !== 'ONBOARDING' && view !== 'PAYMENTS' && view !== 'CARDS' && view !== 'SUPPORT' && view !== 'INVESTMENTS' && view !== 'LOANS' && view !== 'CARD_APPLY' && view !== 'NICHE_LOANS' && view !== 'LEGACY_SERVICES' && view !== 'ORACLE') && (
                    <BottomNav
                        activePage={view as any}
                        onNavigate={(page) => setView(page)}
                    />
                )}
            </div>
        </div>
    );
};

export default App;