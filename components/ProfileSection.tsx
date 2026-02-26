import React, { useState } from 'react';
import { ArrowLeft, User, Shield, Bell, Settings, LogOut, ChevronRight, HelpCircle, FileText, Smartphone, Fingerprint, Mail, Sun, Moon, Briefcase, Users, Sparkles, TrendingUp, AlertTriangle, PlayCircle, ArrowRight, Wallet, Lock, X, CheckCircle2, RefreshCw, Zap, CreditCard, ChevronDown, Pencil, Check, Trash2, PlusCircle, BrainCircuit, Sliders, FileWarning, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ProfileSectionProps {
    onBack: () => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
    oracleActive: boolean;
    setOracleActive: (active: boolean) => void;
    persona?: any;
    festival?: string;
}

interface FamilyMember {
    id: string;
    name: string;
    role: string;
    initials: string;
    colorClass: string;
    accessLabel: string;
    walletBalance?: number;
    spendLimit?: number;
    isLocked?: boolean;
    permission: 'VIEW_ONLY' | 'FULL_ACCESS' | 'SPEND_ONLY' | 'WALLET_ONLY';
    features?: string[];
    legacyAlert?: string;
    policyStatus?: string;
}

interface Dependent {
    id: string;
    name: string;
    relation: string;
}

const SettingsGroup = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">{title}</h3>
        <div className="bg-white dark:bg-[#15161a] border border-[#E0E0E0] dark:border-slate-800 rounded-xl overflow-hidden shadow-federal dark:shadow-none transition-colors">
            {children}
        </div>
    </div>
);

const SettingsItem = ({ icon: Icon, label, value, valueColor = "text-slate-500", toggle, hasArrow }: any) => (
    <div className="flex items-center justify-between p-4 hover:bg-[#F9F9F9] dark:hover:bg-slate-800/30 transition-colors cursor-pointer border-b border-[#E0E0E0] dark:border-slate-800/50 last:border-0 group">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-federalblue-900 dark:group-hover:text-white transition-colors border border-slate-200 dark:border-slate-700">
                <Icon className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-[#333333] dark:group-hover:text-slate-200 transition-colors">{label}</span>
        </div>

        {toggle ? (
            <div className="w-10 h-5 bg-federalblue-900 rounded-full relative cursor-pointer">
                <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full shadow"></div>
            </div>
        ) : (
            <div className="flex items-center gap-2">
                {value && <span className={`text-xs font-medium ${valueColor}`}>{value}</span>}
                {hasArrow && <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-federalblue-900 transition-colors" />}
            </div>
        )}
    </div>
);

const getMembersForPersona = (p: any): FamilyMember[] => {
    if (!p || p.id === 'advait') return [
        { id: 'PR', name: 'Priya', role: 'Spouse', initials: 'PR', colorClass: 'bg-federalblue-50 dark:bg-federalblue-900/20 text-federalblue-900 dark:text-federalblue-400', accessLabel: 'Investments', isLocked: true, permission: 'VIEW_ONLY', features: ['View Portfolio', 'View Goals'], spendLimit: 50000 },
        { id: 'RJ', name: 'Rajesh', role: 'Father', initials: 'RJ', colorClass: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400', accessLabel: 'Legacy Vault', walletBalance: 15000, spendLimit: 20000, permission: 'WALLET_ONLY', features: ['Wallet Access', 'Utility Payments'], legacyAlert: 'Nomination Missing', policyStatus: 'Medical Policy Expires in 12d' },
        { id: 'SU', name: 'Sunita', role: 'Mother', initials: 'SU', colorClass: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400', accessLabel: 'Wallet', walletBalance: 8500, spendLimit: 10000, permission: 'WALLET_ONLY', features: ['Wallet Access'] },
    ];
    switch (p.id) {
        case 'rajesh': return [
            { id: 'MN', name: 'Meena', role: 'Spouse', initials: 'MN', colorClass: 'bg-federalblue-50 dark:bg-federalblue-900/20 text-federalblue-900 dark:text-federalblue-400', accessLabel: 'Business Accounts', isLocked: true, permission: 'VIEW_ONLY', features: ['View Accounts', 'Transaction History'], spendLimit: 100000 },
            { id: 'VK', name: 'Vikram', role: 'Son', initials: 'VK', colorClass: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400', accessLabel: 'Wallet', walletBalance: 25000, spendLimit: 30000, permission: 'WALLET_ONLY', features: ['Wallet Access', 'UPI Payments'] },
        ];
        case 'ishan': return [
            { id: 'RM', name: 'Roommate Split', role: 'Shared', initials: 'RS', colorClass: 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400', accessLabel: 'Bill Splitting', permission: 'SPEND_ONLY', features: ['Split Bills', 'Shared Expenses'], spendLimit: 5000 },
        ];
        case 'kapoor': return [
            { id: 'SN', name: 'Sunita', role: 'Spouse', initials: 'SN', colorClass: 'bg-federalblue-50 dark:bg-federalblue-900/20 text-federalblue-900 dark:text-federalblue-400', accessLabel: 'Joint Account', isLocked: false, permission: 'FULL_ACCESS', features: ['Full Access', 'Pension View'], spendLimit: 80000 },
            { id: 'AR', name: 'Aryan', role: 'Grandson', initials: 'AR', colorClass: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400', accessLabel: 'Education Wallet', walletBalance: 5000, spendLimit: 8000, permission: 'WALLET_ONLY', features: ['Wallet Access'] },
        ];
        case 'anjali': return [
            { id: 'VH', name: 'Vikram', role: 'Husband', initials: 'VH', colorClass: 'bg-federalblue-50 dark:bg-federalblue-900/20 text-federalblue-900 dark:text-federalblue-400', accessLabel: 'Primary Account', isLocked: false, permission: 'FULL_ACCESS', features: ['Full Access', 'Investment View'], spendLimit: 200000 },
            { id: 'MR', name: 'Meera', role: 'Daughter', initials: 'MR', colorClass: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400', accessLabel: 'Savings Wallet', walletBalance: 3000, spendLimit: 5000, permission: 'WALLET_ONLY', features: ['Wallet Access'] },
            { id: 'AJ', name: 'Arjun', role: 'Son', initials: 'AJ', colorClass: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400', accessLabel: 'Savings Wallet', walletBalance: 2500, spendLimit: 4000, permission: 'WALLET_ONLY', features: ['Wallet Access'] },
        ];
        default: return [];
    }
};

const ProfileSection: React.FC<ProfileSectionProps> = ({ onBack, isDarkMode, toggleTheme, oracleActive, setOracleActive, persona }) => {
    const { theme, setTheme } = useTheme();
    const [members, setMembers] = useState<FamilyMember[]>(getMembersForPersona(persona));

    React.useEffect(() => {
        setMembers(getMembersForPersona(persona));
    }, [persona?.id]);

    // UI State
    const [activeModal, setActiveModal] = useState<'NONE' | 'TOPUP' | 'MANAGE'>('NONE');
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
    const [topUpAmount, setTopUpAmount] = useState('');
    const [processing, setProcessing] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // Manage Modal Local State
    const [tempLimit, setTempLimit] = useState<string>('');
    const [tempFeatures, setTempFeatures] = useState<string[]>([]);

    // Toast State
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Governance State
    const [oracleGuardianMode, setOracleGuardianMode] = useState(true);

    const getEmploymentForPersona = (p: any) => {
        if (!p) return { role: 'Product Lead', company: 'Tech Mahindra Ltd' };
        switch (p.id) {
            case 'rajesh': return { role: 'Business Owner', company: '₹4Cr Textile Export Business' };
            case 'ishan': return { role: 'Engineering Student', company: 'IIT' };
            case 'kapoor': return { role: 'Retired Bank Manager', company: 'Federal Bank (Retired)' };
            case 'anjali': return { role: 'Homemaker', company: 'Household Management' };
            default: return { role: 'Product Lead', company: 'Tech Mahindra Ltd' };
        }
    };

    const getDependentsForPersona = (p: any): Dependent[] => {
        if (!p) return [
            { id: 'd1', name: 'Priya', relation: 'Wife' },
            { id: 'd2', name: 'Riya', relation: 'Daughter' },
            { id: 'd3', name: 'Rajesh', relation: 'Father' },
            { id: 'd4', name: 'Sunita', relation: 'Mother' },
        ];
        switch (p.id) {
            case 'rajesh': return [
                { id: 'd1', name: 'Meena', relation: 'Wife' },
                { id: 'd2', name: 'Vikram', relation: 'Son' },
            ];
            case 'ishan': return [];
            case 'kapoor': return [
                { id: 'd1', name: 'Aryan', relation: 'Grandson' },
                { id: 'd2', name: 'Sunita', relation: 'Wife' },
            ];
            case 'anjali': return [
                { id: 'd1', name: 'Meera', relation: 'Daughter' },
                { id: 'd2', name: 'Arjun', relation: 'Son' },
                { id: 'd3', name: 'Vikram', relation: 'Husband' },
            ];
            default: return [
                { id: 'd1', name: 'Priya', relation: 'Wife' },
                { id: 'd2', name: 'Riya', relation: 'Daughter' },
                { id: 'd3', name: 'Rajesh', relation: 'Father' },
                { id: 'd4', name: 'Sunita', relation: 'Mother' },
            ];
        }
    };

    const [employment, setEmployment] = useState(getEmploymentForPersona(persona));

    const [dependentsList, setDependentsList] = useState<Dependent[]>(getDependentsForPersona(persona));

    // Individual Edit States
    const [editingEmployment, setEditingEmployment] = useState(false);
    const [editingDependents, setEditingDependents] = useState(false);

    const [tempEmployment, setTempEmployment] = useState(employment);
    const [tempDependentsList, setTempDependentsList] = useState<Dependent[]>([]);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleOpenTopUp = (id: string) => {
        setSelectedMemberId(id);
        setTopUpAmount('');
        setActiveModal('TOPUP');
    };

    const handleOpenManage = () => {
        setActiveModal('MANAGE');
        setSelectedMemberId(null);
    };

    const handleSelectMemberForManage = (id: string) => {
        const member = members.find(m => m.id === id);
        if (member) {
            setSelectedMemberId(id);
            setTempLimit(member.spendLimit?.toString() || '0');
            setTempFeatures(member.features || []);
        }
    };

    const handleSaveMemberSettings = () => {
        if (!selectedMemberId) return;
        setProcessing(true);
        setTimeout(() => {
            setMembers(prev => prev.map(m => {
                if (m.id === selectedMemberId) {
                    return { ...m, spendLimit: parseInt(tempLimit), features: tempFeatures };
                }
                return m;
            }));
            setProcessing(false);
            showToast('Access limits updated successfully');
            setSelectedMemberId(null); // Go back to list
        }, 800);
    };

    const handleExecuteTopUp = () => {
        if (!topUpAmount || !selectedMemberId) return;
        setProcessing(true);

        // Simulate API
        setTimeout(() => {
            setMembers(prev => prev.map(m => {
                if (m.id === selectedMemberId && m.walletBalance !== undefined) {
                    return { ...m, walletBalance: m.walletBalance + parseInt(topUpAmount) };
                }
                return m;
            }));
            setProcessing(false);
            setSuccessMsg(`₹${parseInt(topUpAmount).toLocaleString()} added successfully!`);

            // Close after showing success
            setTimeout(() => {
                setSuccessMsg(null);
                setActiveModal('NONE');
                setSelectedMemberId(null);
            }, 1500);
        }, 1500);
    };

    const togglePermission = (id: string) => {
        if (oracleGuardianMode) return; // Cannot change if Oracle is managing

        setMembers(prev => prev.map(m => {
            if (m.id === id) {
                // Cycle permissions logic for demo
                if (m.role === 'Spouse') {
                    const newPerm = m.permission === 'VIEW_ONLY' ? 'FULL_ACCESS' : 'VIEW_ONLY';
                    return { ...m, permission: newPerm, isLocked: newPerm === 'VIEW_ONLY' };
                }
            }
            return m;
        }));
    };

    const handleSaveEmployment = () => {
        setEmployment(tempEmployment);
        setEditingEmployment(false);
        showToast('Employment details updated');
    };

    // Dependent Management Functions
    const handleSaveDependents = () => {
        setDependentsList(tempDependentsList);
        setEditingDependents(false);
        showToast('Dependents details updated');
    };

    const handleAddDependent = () => {
        setTempDependentsList([...tempDependentsList, { id: `new-${Date.now()}`, name: '', relation: '' }]);
    };

    const handleRemoveDependent = (id: string) => {
        setTempDependentsList(tempDependentsList.filter(d => d.id !== id));
    };

    const handleDependentChange = (id: string, field: 'name' | 'relation', value: string) => {
        setTempDependentsList(tempDependentsList.map(d => d.id === id ? { ...d, [field]: value } : d));
    };

    const startEditingDependents = () => {
        setTempDependentsList(dependentsList);
        setEditingDependents(true);
    };

    const toggleFeature = (feature: string) => {
        if (tempFeatures.includes(feature)) {
            setTempFeatures(tempFeatures.filter(f => f !== feature));
        } else {
            setTempFeatures([...tempFeatures, feature]);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b0c10] text-[#333333] dark:text-slate-200 font-sans animate-fade-in transition-colors duration-300 relative">
            {/* Navigation */}
            <nav className="sticky top-0 bg-white/95 dark:bg-[#0b0c10]/90 backdrop-blur-md z-40 px-6 py-4 flex justify-between items-center border-b border-[#E0E0E0] dark:border-slate-800 transition-colors">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-federalblue-900 rounded-full hover:bg-[#F6F6F6] dark:hover:bg-slate-800/50 transition-colors">
                        <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                    <span className="font-semibold text-lg text-[#333333] dark:text-white">Profile</span>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={toggleTheme} className="p-2 text-slate-500 hover:text-federalblue-900 transition-colors">
                        {isDarkMode ? <Sun className="w-5 h-5" strokeWidth={1.5} /> : <Moon className="w-5 h-5" strokeWidth={1.5} />}
                    </button>
                    <button className="relative p-2 -mr-2 text-slate-500 hover:text-federalblue-900 transition-colors">
                        <Bell className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                </div>
            </nav>

            {/* Global Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3 rounded-full text-sm font-bold shadow-2xl flex items-center gap-2 animate-fade-in z-50">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    {toastMessage}
                </div>
            )}

            <div className="p-6 space-y-8 pb-24">
                {/* User Card */}
                <div className="flex flex-col items-center">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-federalblue-900 to-federalblue-700 p-[2px] mb-4">
                            <div className="w-full h-full rounded-full bg-white dark:bg-[#15161a] flex items-center justify-center text-2xl font-bold text-federalblue-900 dark:text-white relative overflow-hidden transition-colors">
                                <span className="z-10">{persona?.avatar || 'AD'}</span>
                            </div>
                        </div>
                        <div className="absolute bottom-4 right-0 bg-white dark:bg-[#0b0c10] rounded-full p-1.5 border border-[#E0E0E0] dark:border-slate-800 cursor-pointer hover:border-federalblue-500 transition-colors">
                            <div className="bg-[#F6F6F6] dark:bg-slate-800 p-1.5 rounded-full">
                                <Settings className="w-3 h-3 text-slate-700 dark:text-white" />
                            </div>
                        </div>
                    </div>

                    <h2 className="text-xl font-medium text-[#333333] dark:text-white">{persona?.name || 'Advait'}</h2>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                        <Mail className="w-3 h-3" />
                        <span>{persona?.name?.toLowerCase() || 'advait'}.user@example.com</span>
                    </div>

                    <div className="mt-5 flex gap-3">
                        <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold tracking-wider border border-emerald-100 dark:border-emerald-800 uppercase">Verified</span>
                        <span className="px-3 py-1 rounded-full bg-federalblue-50 dark:bg-federalblue-900/20 text-federalblue-900 dark:text-federalblue-400 text-[10px] font-semibold tracking-wider border border-federalblue-100 dark:border-federalblue-800 uppercase">Premium</span>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-[#15161a] border border-[#E0E0E0] dark:border-slate-800 rounded-xl p-4 flex flex-col items-center text-center shadow-federal dark:shadow-none transition-colors">
                        <span className="text-2xl font-light text-[#333333] dark:text-white">820</span>
                        <span className="text-xs text-slate-500 mt-1">Credit Score</span>
                    </div>
                    <div className="bg-white dark:bg-[#15161a] border border-[#E0E0E0] dark:border-slate-800 rounded-xl p-4 flex flex-col items-center text-center shadow-federal dark:shadow-none transition-colors">
                        <span className="text-2xl font-light text-[#333333] dark:text-white">12</span>
                        <span className="text-xs text-slate-500 mt-1">Active Services</span>
                    </div>
                </div>

                {/* Intelligence & Privacy Section - Contains Oracle Toggle */}
                <SettingsGroup title="Intelligence & Privacy">
                    <div className="flex items-center justify-between p-4 hover:bg-[#F9F9F9] dark:hover:bg-slate-800/30 transition-colors cursor-pointer group border-b border-[#E0E0E0] dark:border-slate-800/50 last:border-0">
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors border ${oracleActive
                                ? 'bg-federalblue-50 dark:bg-federalblue-900/20 text-federalblue-900 dark:text-federalblue-400 border-federalblue-100 dark:border-federalblue-800'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                                }`}>
                                <BrainCircuit className="w-4 h-4" strokeWidth={1.5} />
                            </div>
                            <div>
                                <span className="block text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-[#333333] dark:group-hover:text-slate-200 transition-colors">Proactive Oracle Intelligence</span>
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5 max-w-[200px] leading-tight">
                                    {oracleActive ? 'Goals monitored. Financial life automated.' : 'Passive mode. On-demand responses only.'}
                                </span>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                setOracleActive(!oracleActive);
                                showToast(oracleActive ? 'Oracle Silent Mode Activated' : 'Proactive Intelligence Enabled');
                            }}
                            className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${oracleActive ? 'bg-federalblue-900' : 'bg-slate-300 dark:bg-slate-700'}`}
                        >
                            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${oracleActive ? 'left-[22px]' : 'left-0.5'}`}></div>
                        </div>
                    </div>
                    <SettingsItem icon={Fingerprint} label="Biometric Login" toggle />
                    <SettingsItem icon={Shield} label="Fraud Guard & Alerts" value="Always On" valueColor="text-emerald-700 dark:text-emerald-500" />
                </SettingsGroup>

                {/* Dynamic Themes Section */}
                <SettingsGroup title="Interface & Themes">
                    <div className="p-4 space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center border border-orange-100">
                                <Palette className="w-4 h-4" />
                            </div>
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Active Atmosphere</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { id: 'DEFAULT', name: 'Federal Standard', color: '#004d9c', gradientFrom: '#004d9c', gradientTo: '#001d3d' },
                                { id: 'DIWALI', name: 'Diwali Festival', color: '#800020', gradientFrom: '#800020', gradientTo: '#4a0012' },
                                { id: 'ONAM', name: 'Harvest Onam', color: '#1b4d3e', gradientFrom: '#1b4d3e', gradientTo: '#0d2920' },
                                { id: 'NEW_YEAR', name: 'Premium New Year', color: '#000080', gradientFrom: '#000080', gradientTo: '#000040' }
                            ].map((t) => (
                                <div
                                    key={t.id}
                                    onClick={() => setTheme(t.id as any)}
                                    className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col gap-2 ${theme === t.id
                                        ? 'shadow-md'
                                        : 'border-[#E0E0E0] dark:border-slate-800 hover:border-slate-300'
                                        }`}
                                    style={theme === t.id ? { borderColor: t.color, backgroundColor: `${t.color}08` } : {}}
                                >
                                    <div className="w-full h-3 rounded-lg" style={{ background: `linear-gradient(to right, ${t.gradientFrom}, ${t.gradientTo})` }}></div>
                                    <span className={`text-[10px] font-bold text-slate-600 dark:text-slate-300`}>{t.name}</span>
                                    {theme === t.id && (
                                        <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Active</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 hover:bg-[#F9F9F9] dark:hover:bg-slate-800/30 transition-colors cursor-pointer border-t border-[#E0E0E0] dark:border-slate-800/50" onClick={toggleTheme}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </div>
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{isDarkMode ? 'Dark Mode On' : 'Dark Mode Off'}</span>
                        </div>
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${isDarkMode ? 'bg-federalblue-900' : 'bg-slate-300'}`}>
                            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${isDarkMode ? 'left-[22px]' : 'left-0.5'}`}></div>
                        </div>
                    </div>
                </SettingsGroup>

                {/* Employment & Dependents Cards (Moved ABOVE Financial Hub) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Employment Card */}
                    <div className={`bg-white dark:bg-[#15161a] border rounded-xl p-4 shadow-federal dark:shadow-none transition-all ${editingEmployment ? 'border-federalblue-500/50 ring-1 ring-federalblue-500/20' : 'border-[#E0E0E0] dark:border-slate-800'}`}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                    <Briefcase className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Occupation</p>
                            </div>
                            {!editingEmployment && (
                                <button onClick={() => { setTempEmployment(employment); setEditingEmployment(true); }} className="text-slate-400 hover:text-federalblue-900 transition-colors p-1">
                                    <Pencil className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {editingEmployment ? (
                            <div className="space-y-3 animate-fade-in">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Role</label>
                                    <input
                                        value={tempEmployment.role}
                                        onChange={e => setTempEmployment({ ...tempEmployment, role: e.target.value })}
                                        className="w-full bg-[#F6F6F6] dark:bg-slate-800/50 border border-[#E0E0E0] dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-[#333333] dark:text-white focus:outline-none focus:border-federalblue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Company</label>
                                    <input
                                        value={tempEmployment.company}
                                        onChange={e => setTempEmployment({ ...tempEmployment, company: e.target.value })}
                                        className="w-full bg-[#F6F6F6] dark:bg-slate-800/50 border border-[#E0E0E0] dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-[#333333] dark:text-white focus:outline-none focus:border-federalblue-500 transition-colors"
                                    />
                                </div>
                                <div className="flex gap-2 pt-1">
                                    <button onClick={() => setEditingEmployment(false)} className="flex-1 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">Cancel</button>
                                    <button onClick={handleSaveEmployment} className="flex-1 py-1.5 bg-federalblue-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 hover:opacity-90">
                                        <Check className="w-3 h-3" /> Save
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="pl-1 pb-1">
                                <p className="text-sm font-semibold text-[#333333] dark:text-white">{employment.role}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{employment.company}</p>
                            </div>
                        )}
                    </div>

                    {/* Dependents Card */}
                    <div className={`bg-white dark:bg-[#15161a] border rounded-xl p-4 shadow-federal dark:shadow-none transition-all ${editingDependents ? 'border-federalblue-500/50 ring-1 ring-federalblue-500/20 col-span-1 sm:col-span-2' : 'border-[#E0E0E0] dark:border-slate-800'}`}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-federalblue-50 dark:bg-federalblue-900/20 flex items-center justify-center text-federalblue-900 dark:text-federalblue-400 border border-federalblue-100 dark:border-federalblue-800">
                                    <Users className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Dependents</p>
                                    {!editingDependents && (
                                        <p className="text-sm font-bold text-[#333333] dark:text-white mt-0.5">{dependentsList.length} Active</p>
                                    )}
                                </div>
                            </div>
                            {!editingDependents && (
                                <button onClick={startEditingDependents} className="text-slate-400 hover:text-federalblue-900 transition-colors p-1">
                                    <Pencil className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {editingDependents ? (
                            <div className="space-y-4 animate-fade-in">
                                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                                    {tempDependentsList.map((dep) => (
                                        <div key={dep.id} className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-end p-2 rounded-lg bg-[#F6F6F6] dark:bg-slate-800/30 border border-[#E0E0E0] dark:border-slate-800">
                                            <div className="flex-1">
                                                <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Name</label>
                                                <input
                                                    value={dep.name}
                                                    onChange={(e) => handleDependentChange(dep.id, 'name', e.target.value)}
                                                    placeholder="Name"
                                                    className="w-full bg-white dark:bg-[#0b0c10] border border-[#E0E0E0] dark:border-slate-700 rounded-lg px-2 py-1.5 text-sm text-[#333333] dark:text-white focus:outline-none focus:border-federalblue-500 transition-colors"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Relation</label>
                                                <input
                                                    value={dep.relation}
                                                    onChange={(e) => handleDependentChange(dep.id, 'relation', e.target.value)}
                                                    placeholder="Relation"
                                                    className="w-full bg-white dark:bg-[#0b0c10] border border-[#E0E0E0] dark:border-slate-700 rounded-lg px-2 py-1.5 text-sm text-[#333333] dark:text-white focus:outline-none focus:border-federalblue-500 transition-colors"
                                                />
                                            </div>
                                            <button onClick={() => handleRemoveDependent(dep.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    <button onClick={handleAddDependent} className="w-full py-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-500 hover:text-federalblue-900 hover:border-federalblue-300 hover:bg-federalblue-50 dark:hover:bg-federalblue-900/10 transition-colors flex items-center justify-center gap-1">
                                        <PlusCircle className="w-3.5 h-3.5" /> Add Dependent
                                    </button>
                                </div>
                                <div className="flex gap-2 pt-1 border-t border-[#E0E0E0] dark:border-slate-800/50">
                                    <button onClick={() => setEditingDependents(false)} className="flex-1 py-2 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">Cancel</button>
                                    <button onClick={handleSaveDependents} className="flex-1 py-2 bg-federalblue-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 hover:opacity-90">
                                        <Check className="w-3 h-3" /> Update List
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1 pb-1">
                                {dependentsList.map(dep => (
                                    <div key={dep.id} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-federalblue-400"></div>
                                        <p className="text-sm text-slate-700 dark:text-slate-300">
                                            {dep.name} <span className="text-xs text-slate-500">({dep.relation})</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Financial Hub - Family Manager (Moved Below Dependents) */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Financial Hub</h3>
                        <button
                            onClick={() => {
                                setOracleGuardianMode(!oracleGuardianMode);
                                showToast(!oracleGuardianMode ? 'Oracle Guardian Activated' : 'Manual Override Enabled');
                            }}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${oracleGuardianMode
                                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 shadow-sm'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                        >
                            <Shield className="w-3 h-3" />
                            <span>{oracleGuardianMode ? 'Guardian Active' : 'Manual Mode'}</span>
                            {/* Micro Toggle Switch */}
                            <div className={`w-6 h-3.5 rounded-full relative transition-colors ${oracleGuardianMode ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'} ml-1`}>
                                <div className={`absolute top-0.5 w-2.5 h-2.5 bg-white rounded-full shadow-sm transition-transform ${oracleGuardianMode ? 'translate-x-3' : 'translate-x-0.5'}`}></div>
                            </div>
                        </button>
                    </div>
                    <div className="bg-white dark:bg-[#15161a] border border-[#E0E0E0] dark:border-slate-800 rounded-xl overflow-hidden shadow-federal dark:shadow-none transition-colors">
                        {members.map((member) => (
                            <div key={member.id} className="p-4 border-b border-[#E0E0E0] dark:border-slate-800/50 last:border-0 hover:bg-[#F9F9F9] dark:hover:bg-slate-800/30 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${member.colorClass}`}>
                                            {member.initials}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-[#333333] dark:text-white">{member.name}</p>
                                            <p className="text-xs text-slate-500">{member.role} • {member.accessLabel}</p>

                                            {/* Legacy Vault Alerts */}
                                            {member.legacyAlert && (
                                                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded border border-amber-100 dark:border-amber-800/30 w-fit">
                                                    <AlertTriangle className="w-3 h-3" />
                                                    {member.legacyAlert}
                                                </div>
                                            )}
                                            {member.policyStatus && (
                                                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-federalblue-600 bg-federalblue-50 dark:bg-federalblue-900/20 px-2 py-0.5 rounded border border-federalblue-100 dark:border-federalblue-800/30 w-fit">
                                                    <FileWarning className="w-3 h-3" />
                                                    {member.policyStatus}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-1.5">
                                        {member.permission === 'WALLET_ONLY' ? (
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-[#333333] dark:text-white">₹{member.walletBalance?.toLocaleString()}</p>
                                                <button
                                                    onClick={() => handleOpenTopUp(member.id)}
                                                    className="text-[10px] font-bold text-federalblue-900 hover:text-federalblue-700 dark:text-federalblue-400 dark:hover:text-federalblue-300 mt-0.5 flex items-center gap-1 justify-end"
                                                >
                                                    <PlusCircle className="w-3 h-3" /> Top Up
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => togglePermission(member.id)}
                                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${member.isLocked
                                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                                                    : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                                                    }`}
                                            >
                                                {member.permission.replace('_', ' ')}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="p-3 bg-[#F9F9F9] dark:bg-[#0b0c10] text-center border-t border-[#E0E0E0] dark:border-slate-800 flex items-center justify-center gap-4">
                            <button onClick={handleOpenManage} className="text-xs font-bold text-slate-500 hover:text-federalblue-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1">
                                <Settings className="w-3 h-3" /> Manage Access & Limits
                            </button>
                        </div>
                    </div>
                </div>

                {/* General Settings */}
                <SettingsGroup title="General">
                    <SettingsItem icon={CreditCard} label="Cards & Accounts" hasArrow />
                    <SettingsItem icon={Settings} label="App Preferences" hasArrow />
                    <SettingsItem icon={HelpCircle} label="Help & Support" hasArrow />
                    <SettingsItem icon={FileText} label="Terms & Conditions" hasArrow />
                </SettingsGroup>

                {/* Logout */}
                <button className="w-full py-4 text-[#333333] font-bold text-sm bg-federalyellow-500 rounded-xl hover:bg-federalyellow-600 transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>

            {/* Top Up Modal */}
            {activeModal === 'TOPUP' && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-[#15161a] w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-[#E0E0E0] dark:border-slate-800">
                        <div className="p-6 text-center border-b border-[#E0E0E0] dark:border-slate-800/50">
                            <div className="w-16 h-16 bg-federalblue-50 dark:bg-federalblue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-federalblue-900 dark:text-federalblue-400">
                                <Wallet className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-[#333333] dark:text-white">Top Up Wallet</h3>
                            <p className="text-sm text-slate-500 mt-1">
                                For {members.find(m => m.id === selectedMemberId)?.name}
                            </p>
                        </div>

                        {successMsg ? (
                            <div className="p-10 flex flex-col items-center justify-center animate-fade-in">
                                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-3 text-emerald-600 dark:text-emerald-400">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <p className="text-lg font-bold text-[#333333] dark:text-white">Success!</p>
                                <p className="text-slate-500 text-sm">{successMsg}</p>
                            </div>
                        ) : (
                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest text-center">Enter Amount</label>
                                    <div className="relative max-w-[200px] mx-auto">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-light text-xl">₹</span>
                                        <input
                                            type="number"
                                            value={topUpAmount}
                                            onChange={(e) => setTopUpAmount(e.target.value)}
                                            className="w-full bg-[#F6F6F6] dark:bg-[#0b0c10] border border-[#E0E0E0] dark:border-slate-800 rounded-xl pl-8 pr-4 py-3 text-2xl font-bold text-[#333333] dark:text-white text-center focus:outline-none focus:border-federalblue-500 transition-colors"
                                            placeholder="0"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="flex justify-center gap-2 mt-4">
                                        {[500, 1000, 2000].map(amt => (
                                            <button
                                                key={amt}
                                                onClick={() => setTopUpAmount(amt.toString())}
                                                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                +₹{amt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button onClick={() => { setActiveModal('NONE'); setSelectedMemberId(null); }} className="flex-1 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleExecuteTopUp}
                                        disabled={!topUpAmount || processing}
                                        className="flex-[2] py-3 bg-federalblue-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {processing ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Confirm Top Up'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Manage Access Modal */}
            {activeModal === 'MANAGE' && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-[#15161a] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-[#E0E0E0] dark:border-slate-800 flex flex-col max-h-[80vh]">
                        <div className="px-6 py-5 border-b border-[#E0E0E0] dark:border-slate-800 flex justify-between items-center bg-[#F9F9F9] dark:bg-[#1c1e24]/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-federalblue-50 dark:bg-federalblue-900/10 rounded-lg text-federalblue-900 dark:text-federalblue-400">
                                    <Sliders className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#333333] dark:text-white">Family Access</h3>
                                    {!selectedMemberId && <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Manage Limits</p>}
                                    {selectedMemberId && <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Editing {members.find(m => m.id === selectedMemberId)?.name}</p>}
                                </div>
                            </div>
                            <button onClick={() => { setActiveModal('NONE'); setSelectedMemberId(null); }} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {!selectedMemberId ? (
                                <div className="space-y-2">
                                    {members.map((member) => (
                                        <div
                                            key={member.id}
                                            onClick={() => handleSelectMemberForManage(member.id)}
                                            className="flex items-center justify-between p-4 rounded-xl border border-[#E0E0E0] dark:border-slate-800 hover:border-federalblue-300 dark:hover:border-federalblue-700 cursor-pointer group bg-white dark:bg-[#1c1e24] transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${member.colorClass}`}>
                                                    {member.initials}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-[#333333] dark:text-white">{member.name}</p>
                                                    <p className="text-xs text-slate-500 mt-0.5">
                                                        Limit: ₹{(member.spendLimit || 0).toLocaleString()}/mo
                                                    </p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-federalblue-900 dark:group-hover:text-white transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6 animate-fade-in">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Monthly Spend Limit</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-light text-xl">₹</span>
                                            <input
                                                type="number"
                                                value={tempLimit}
                                                onChange={(e) => setTempLimit(e.target.value)}
                                                className="w-full bg-[#F6F6F6] dark:bg-[#0b0c10] border border-[#E0E0E0] dark:border-slate-800 rounded-xl pl-8 pr-4 py-3 text-xl font-bold text-[#333333] dark:text-white focus:outline-none focus:border-federalblue-500 transition-colors"
                                                placeholder="0"
                                            />
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-2">
                                            Resets automatically on the 1st of every month.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">Feature Access</label>
                                        <div className="space-y-2">
                                            {['View Portfolio', 'View Goals', 'Wallet Access', 'Utility Payments', 'Initiate Transfers'].map((feature) => (
                                                <div
                                                    key={feature}
                                                    onClick={() => toggleFeature(feature)}
                                                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${tempFeatures.includes(feature)
                                                        ? 'bg-federalblue-50 dark:bg-federalblue-900/20 border-federalblue-200 dark:border-federalblue-800'
                                                        : 'bg-white dark:bg-[#0b0c10] border-[#E0E0E0] dark:border-slate-800'
                                                        }`}
                                                >
                                                    <span className={`text-sm font-medium ${tempFeatures.includes(feature) ? 'text-federalblue-900 dark:text-federalblue-400' : 'text-slate-600 dark:text-slate-400'}`}>
                                                        {feature}
                                                    </span>
                                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${tempFeatures.includes(feature)
                                                        ? 'bg-federalblue-900 border-federalblue-900 dark:bg-federalblue-500 dark:border-federalblue-500 text-white'
                                                        : 'border-slate-300 dark:border-slate-600'
                                                        }`}>
                                                        {tempFeatures.includes(feature) && <Check className="w-3 h-3" />}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {selectedMemberId && (
                            <div className="p-6 border-t border-[#E0E0E0] dark:border-slate-800 bg-[#F9F9F9] dark:bg-[#0b0c10] flex gap-3">
                                <button onClick={() => setSelectedMemberId(null)} className="flex-1 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
                                    Back
                                </button>
                                <button
                                    onClick={handleSaveMemberSettings}
                                    disabled={processing}
                                    className="flex-[2] py-3 bg-federalblue-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {processing ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Save Changes'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileSection;