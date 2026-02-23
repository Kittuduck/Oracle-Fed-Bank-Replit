import React, { useState } from 'react';
import {
    ArrowLeft,
    ChevronRight,
    CreditCard,
    Lock,
    Unlock,
    Globe,
    Zap,
    Wifi,
    ShieldCheck,
    Settings,
    Eye,
    ArrowUpRight
} from 'lucide-react';

interface Card {
    id: string;
    type: 'DEBIT' | 'CREDIT';
    name: 'PLATINUM DEBIT' | 'INFINITE CREDIT';
    number: string;
    expiry: string;
    color: string;
    isBlocked: boolean;
    intlEnabled: boolean;
}

interface CardManagementProps {
    onBack: () => void;
}

const CardManagement: React.FC<CardManagementProps> = ({ onBack }) => {
    const [cards, setCards] = useState<Card[]>([
        {
            id: 'c1',
            type: 'CREDIT',
            name: 'INFINITE CREDIT',
            number: '•••• •••• •••• 1290',
            expiry: '09/28',
            color: 'bg-gradient-to-br from-slate-900 via-slate-800 to-federalblue-950',
            isBlocked: false,
            intlEnabled: true
        },
        {
            id: 'c2',
            type: 'DEBIT',
            name: 'PLATINUM DEBIT',
            number: '•••• •••• •••• 8842',
            expiry: '12/27',
            color: 'bg-gradient-to-br from-federalblue-800 to-federalblue-600',
            isBlocked: false,
            intlEnabled: false
        }
    ]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [showCVC, setShowCVC] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);
    const activeCard = cards[activeIndex];

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleToggleBlock = (id: string) => {
        setCards(prev => prev.map(c => c.id === id ? { ...c, isBlocked: !c.isBlocked } : c));
    };

    const handleToggleIntl = (id: string) => {
        setCards(prev => prev.map(c => c.id === id ? { ...c, intlEnabled: !c.intlEnabled } : c));
    };

    return (
        <div className="min-h-screen bg-slate-50 text-[#333333] font-sans flex flex-col pb-safe">
            <div className="px-6 py-4 flex items-center justify-between border-b border-white bg-white/50 backdrop-blur-md sticky top-0 z-20">
                <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-federalblue-900 transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-sm font-bold text-federalblue-900 uppercase tracking-widest">Card Management</h2>
                <div className="p-2">
                    <Settings className="w-5 h-5 text-slate-400" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="px-6 py-8 space-y-6">
                    <div className="relative h-56 w-full">
                        {cards.map((card, idx) => (
                            <div
                                key={card.id}
                                onClick={() => setActiveIndex(idx)}
                                className={`absolute inset-0 rounded-2xl p-6 text-white shadow-2xl transition-all duration-500 cursor-pointer ${card.color} ${idx === activeIndex
                                    ? 'translate-y-0 scale-100 opacity-100 z-10'
                                    : idx < activeIndex ? '-translate-x-full opacity-0' : 'translate-y-4 scale-95 opacity-40 z-0'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-12">
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">{card.type}</p>
                                        <h3 className="text-lg font-bold tracking-tight">{card.name}</h3>
                                    </div>
                                    <Wifi className="w-6 h-6 rotate-90 opacity-40" />
                                </div>

                                <div className="space-y-4" onClick={(e) => { e.stopPropagation(); handleCopy(card.number.replace(/\s/g, ''), 'Card Number'); }}>
                                    <div className="flex justify-between items-center group/num">
                                        <p className="text-xl font-mono tracking-[0.2em]">{card.number}</p>
                                        {copied === 'Card Number' && activeIndex === idx && <span className="text-[10px] text-emerald-400 font-bold">Copied!</span>}
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-0.5">
                                            <p className="text-[8px] font-bold opacity-60 uppercase">Expiry Date</p>
                                            <p className="text-sm font-bold">{card.expiry}</p>
                                        </div>
                                        <div className="w-12 h-8 bg-white/20 rounded backdrop-blur-sm border border-white/10 flex items-center justify-center italic font-bold text-xs">
                                            VISA
                                        </div>
                                    </div>
                                </div>

                                {card.isBlocked && (
                                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] rounded-2xl flex items-center justify-center">
                                        <div className="bg-white text-slate-900 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                                            <Lock className="w-4 h-4 text-red-500" />
                                            <span className="text-xs font-bold uppercase tracking-widest">Card Blocked</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-2">
                        {cards.map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all ${i === activeIndex ? 'w-6 bg-federalblue-900' : 'w-1.5 bg-slate-300'}`} />
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-t-3xl border-t border-slate-100 shadow-federal-reverse p-6 space-y-8 flex-1">
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Card Security</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${activeCard.isBlocked ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'} transition-colors`}>
                                        {activeCard.isBlocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-federalblue-900">Temporary Block</p>
                                        <p className="text-[10px] text-slate-500">Instantly freeze card activity</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleToggleBlock(activeCard.id)}
                                    className={`w-12 h-6 rounded-full relative transition-all ${activeCard.isBlocked ? 'bg-federalblue-900' : 'bg-slate-300'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${activeCard.isBlocked ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-federalblue-50 text-federalblue-900 rounded-lg">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-federalblue-900">International Usage</p>
                                        <p className="text-[10px] text-slate-500">Enable payments outside India</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleToggleIntl(activeCard.id)}
                                    className={`w-12 h-6 rounded-full relative transition-all ${activeCard.intlEnabled ? 'bg-federalblue-900' : 'bg-slate-300'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${activeCard.intlEnabled ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleCopy('452', 'CVC')}
                                className="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col items-start gap-3 hover:bg-federalblue-50 transition-all shadow-sm group"
                            >
                                <div className="p-2 bg-slate-50 group-hover:bg-white text-slate-500 group-hover:text-federalblue-900 rounded-lg transition-colors">
                                    <Eye className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-xs font-bold text-federalblue-900">
                                        {copied === 'CVC' ? '452 (Copied)' : 'View CVV'}
                                    </span>
                                </div>
                            </button>
                            <button className="p-4 bg-federalgold-50 border border-federalgold-100 rounded-2xl flex flex-col items-start gap-3 hover:bg-federalgold-100 transition-all shadow-sm group">
                                <div className="p-2 bg-white text-federalgold-600 rounded-lg shadow-sm">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold text-federalblue-900">Upgrade Card</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-4 bg-federalblue-900 rounded-2xl text-white relative overflow-hidden group">
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold">Priority Pass Membership</h4>
                                <p className="text-[10px] opacity-70">Free lounge access across 1200+ airports.</p>
                            </div>
                            <button className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-all">
                                <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-8 -mt-8 rounded-full blur-2xl pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardManagement;
