import React from 'react';
import {
    Tag,
    ArrowRight,
    Gift,
    ShoppingBag,
    Plane,
    Utensils,
    ChevronRight,
    Star,
    Sparkles,
    Building2,
    Briefcase,
    ArrowLeft,
    CheckCircle2,
    ShieldCheck
} from 'lucide-react';

interface GrowthEngineProps {
    onOpenCardApply: () => void;
    onOpenLoans: () => void;
    onOpenOnboarding: () => void;
}

const GrowthEngine: React.FC<GrowthEngineProps> = ({ onOpenCardApply, onOpenLoans, onOpenOnboarding }) => {
    const [selectedOffer, setSelectedOffer] = React.useState<any>(null);

    const offers = [
        {
            id: 1,
            merchant: 'Tata CLiQ',
            title: '15% Off sitewide',
            code: 'FEDCLIQ15',
            category: 'SHOPPING',
            icon: ShoppingBag,
            color: 'bg-pink-50 text-pink-500',
            borderColor: 'border-pink-100'
        },
        {
            id: 2,
            merchant: 'Indigo Airlines',
            title: 'Flat ₹500 Cashback',
            code: 'FEDFLY',
            category: 'TRAVEL',
            icon: Plane,
            color: 'bg-blue-50 text-blue-500',
            borderColor: 'border-blue-100'
        },
        {
            id: 3,
            merchant: 'Zomato',
            title: 'BOGO on Federal Cards',
            code: 'FEDBOGO',
            category: 'DINING',
            icon: Utensils,
            color: 'bg-red-50 text-red-500',
            borderColor: 'border-red-100',
            description: 'Buy One Get One Free on all premium dine-in partners when you pay with Federal Bank Credit or Debit cards.'
        }
    ];

    if (selectedOffer) {
        return (
            <div className="p-6 space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-4">
                    <button onClick={() => setSelectedOffer(null)} className="p-2 -ml-2 text-slate-400 dark:text-zinc-500">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h3 className="text-sm font-bold text-federalblue-900 dark:text-zinc-100 uppercase tracking-widest">{selectedOffer.category} Offer</h3>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl ${selectedOffer.color}`}>
                            <selectedOffer.icon className="w-8 h-8" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-federalblue-900 dark:text-white">{selectedOffer.merchant}</h4>
                            <p className="text-sm text-slate-500 dark:text-zinc-400">{selectedOffer.title}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                            {selectedOffer.description || "Enjoy exclusive benefits with your Federal Bank account. Valid on all domestic transactions."}
                        </p>
                    </div>

                    <div className="bg-federalblue-50 dark:bg-federalblue-900/20 p-4 rounded-2xl flex justify-between items-center border border-federalblue-100 dark:border-federalblue-800/30">
                        <div>
                            <p className="text-[10px] font-bold text-federalblue-700 dark:text-federalblue-400 uppercase tracking-widest mb-1">Use Code</p>
                            <p className="text-lg font-mono font-bold text-federalblue-900 dark:text-white uppercase">{selectedOffer.code}</p>
                        </div>
                        <button className="px-6 py-2 bg-federalblue-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-xs font-bold shadow-lg">Copy</button>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">Offer verified for Federal Imperial Account Holders.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Horizontal Offers Tray */}
            <div className="space-y-4">
                <div className="flex justify-between items-end px-1">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold text-federalgold-600 dark:text-federalgold-400 uppercase tracking-widest flex items-center gap-1">
                            <Tag className="w-3 h-3" /> Growth Engine
                        </span>
                        <h3 className="text-sm font-bold text-federalblue-900 dark:text-federalblue-400 uppercase tracking-tight">Exclusive Offers For You</h3>
                    </div>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-6 -mx-1 px-1 sleek-scroll no-scrollbar pb-8">
                    {offers.map(offer => (
                        <div
                            key={offer.id}
                            onClick={() => setSelectedOffer(offer)}
                            className={`shrink-0 w-64 glass-card p-5 rounded-3xl border-t-white/90 dark:border-t-white/10 spatial-hover space-y-4 cursor-pointer`}
                        >
                            <div className="flex justify-between items-start">
                                <div className={`p-2 rounded-lg ${offer.color}`}>
                                    <offer.icon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black bg-slate-50 text-slate-400 px-1.5 py-0.5 rounded tracking-tighter uppercase">Verified</span>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-federalblue-900 dark:text-zinc-100 leading-tight">{offer.title}</h4>
                                <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium uppercase tracking-widest">{offer.merchant}</p>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-white/5">
                                <span className="text-[10px] font-mono font-bold text-federalblue-700 dark:text-federalblue-400 bg-federalblue-50/50 dark:bg-federalblue-900/40 px-2 py-1 rounded">
                                    {offer.code}
                                </span>
                                <ArrowRight className="w-4 h-4 text-slate-300 dark:text-zinc-600" />
                            </div>
                        </div>
                    ))}
                    <div className="shrink-0 w-48 bg-gradient-to-br from-[#004d9c] to-[#011a41] rounded-[2.5rem] p-6 shadow-hero flex flex-col justify-center items-center text-center space-y-4 cursor-pointer relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Gift className="w-10 h-10 text-federalgold-400 drop-shadow-lg" />
                        <span className="text-xs font-bold text-white tracking-widest uppercase">View All 42+ Offers</span>
                        <ChevronRight className="w-6 h-6 text-white/50 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>

            {/* Apply Online (Cross-Sell Hub) */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest px-1">Apply Online</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div
                        onClick={onOpenCardApply}
                        className="glass-card p-5 rounded-3xl spatial-hover flex flex-col gap-4 cursor-pointer border-t-white/90 dark:border-t-white/10"
                    >
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-[13px] font-bold text-federalblue-900 dark:text-zinc-100">Credit Cards</h4>
                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mt-1">AI Curated</p>
                        </div>
                    </div>

                    <div
                        onClick={onOpenLoans}
                        className="glass-card p-5 rounded-3xl spatial-hover flex flex-col gap-4 cursor-pointer border-t-white/90 dark:border-t-white/10"
                    >
                        <div className="w-10 h-10 rounded-xl bg-federalblue-50 dark:bg-white/5 text-federalblue-600 dark:text-federalblue-400 flex items-center justify-center">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-[13px] font-bold text-federalblue-900 dark:text-zinc-100">Business Loans</h4>
                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mt-1">Fast Sanction</p>
                        </div>
                    </div>

                    <div
                        onClick={onOpenOnboarding}
                        className="glass-card p-5 rounded-3xl spatial-hover flex flex-col gap-4 cursor-pointer border-t-white/90 dark:border-t-white/10"
                    >
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-[13px] font-bold text-federalblue-900 dark:text-zinc-100">Digital Account</h4>
                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mt-1">Instant Opening</p>
                        </div>
                    </div>

                    <div className="glass-card p-5 rounded-3xl flex flex-col gap-4 border-t-white/90 dark:border-t-white/10 opacity-60">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 flex items-center justify-center">
                            <Gift className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-[13px] font-bold text-slate-600 dark:text-zinc-500">Gift Cards</h4>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Coming Soon</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GrowthEngine;
