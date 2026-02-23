import React, { useState } from 'react';
import { CreditCard, ArrowUpRight, ArrowDownLeft, FileText, Smartphone, MoreHorizontal, Send, RefreshCw, Wallet, Building2, Zap, Wifi, Shield, Plus, Calendar, Check } from 'lucide-react';

interface Transaction {
  id: string;
  merchant: string;
  date: string;
  amount: number;
  type: 'DEBIT' | 'CREDIT';
  category: string;
}

interface Bill {
  id: string;
  biller: string;
  icon: React.ElementType;
  amount: number;
  date: string;
  status: 'DUE' | 'SCHEDULED' | 'PAID';
  autoPay: boolean;
}

const BankingHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ACTIVITY' | 'TRANSFER' | 'BILLS'>('ACTIVITY');
  const [transferAmount, setTransferAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Bill Pay State
  const [bills, setBills] = useState<Bill[]>([
    { id: 'b1', biller: 'Adani Electricity', icon: Zap, amount: 4250, date: 'Due in 2 days', status: 'DUE', autoPay: false },
    { id: 'b2', biller: 'JioFiber Giga', icon: Wifi, amount: 999, date: 'Due in 5 days', status: 'DUE', autoPay: false },
    { id: 'b3', biller: 'Max Life Insurance', icon: Shield, amount: 25000, date: '15 Nov', status: 'SCHEDULED', autoPay: true },
  ]);
  const [payingId, setPayingId] = useState<string | null>(null);
  const [isScheduling, setIsScheduling] = useState(false);
  const [newBiller, setNewBiller] = useState('');
  const [newBillAmount, setNewBillAmount] = useState('');

  const transactions: Transaction[] = [
    { id: 't1', merchant: 'Starbucks Reserve', date: 'Today, 10:42 AM', amount: 850, type: 'DEBIT', category: 'Lifestyle' },
    { id: 't2', merchant: 'Tech Mahindra Ltd', date: 'Yesterday', amount: 350000, type: 'CREDIT', category: 'Salary' },
    { id: 't3', merchant: 'Apple India', date: 'Yesterday', amount: 12400, type: 'DEBIT', category: 'Electronics' },
    { id: 't4', merchant: 'SIP Auto-Debit', date: '24 Oct', amount: 50000, type: 'DEBIT', category: 'Investment' },
  ];

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setTransferAmount('');
        setRecipient('');
        setActiveTab('ACTIVITY');
      }, 2000);
    }, 1500);
  };

  const handlePayBill = (id: string) => {
    setPayingId(id);
    setTimeout(() => {
      setBills(prev => prev.map(b => b.id === id ? { ...b, status: 'PAID' } : b));
      setPayingId(null);
    }, 1500);
  };

  const handleScheduleBill = () => {
    if (!newBiller || !newBillAmount) return;
    const newBill: Bill = {
      id: `b-${Date.now()}`,
      biller: newBiller,
      icon: FileText,
      amount: parseFloat(newBillAmount),
      date: 'Monthly Cycle',
      status: 'SCHEDULED',
      autoPay: true
    };
    setBills([...bills, newBill]);
    setIsScheduling(false);
    setNewBiller('');
    setNewBillAmount('');
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column: Accounts & Cards */}
      <div className="space-y-6">
         {/* Savings Account Card */}
        <div className="bg-white dark:bg-gradient-to-br dark:from-[#1c1e24] dark:to-[#15161a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 relative overflow-hidden group shadow-lg dark:shadow-none transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Building2 className="w-24 h-24 text-slate-900 dark:text-white" />
            </div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-slate-500 dark:text-slate-400 text-xs font-semibold tracking-widest uppercase mb-1">Privilege Savings</h3>
                        <p className="text-slate-500 text-xs font-mono">**** 8842</p>
                    </div>
                    <div className="bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-1 rounded border border-emerald-500/20">
                        ACTIVE
                    </div>
                </div>
                <div>
                    <span className="text-3xl font-light text-slate-900 dark:text-white tracking-tight">₹12,40,500</span>
                    <p className="text-slate-500 text-xs mt-2 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                        Available Balance
                    </p>
                </div>
            </div>
        </div>

        {/* Credit Card - Always dark for premium feel */}
        <div className="bg-[#0f1014] border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
            {/* Abstract Card Decoration */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
                 <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-1">Infinite Metal</h3>
                        <p className="text-slate-500 text-xs font-mono">**** 4001</p>
                    </div>
                    <CreditCard className="w-5 h-5 text-violet-400" />
                </div>
                
                <div className="flex justify-between items-end">
                    <div>
                        <span className="text-xl font-light text-slate-200">₹1,20,000</span>
                        <p className="text-slate-500 text-xs mt-1">Current Due</p>
                    </div>
                    <div className="text-right">
                        <span className="text-sm font-medium text-slate-400">₹15.0L</span>
                        <p className="text-slate-600 text-[10px] mt-1">Total Limit</p>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/50 flex gap-3">
                    <button className="flex-1 bg-[#1c1e24] hover:bg-[#252730] text-slate-300 text-xs font-medium py-2 rounded-lg transition-colors border border-slate-800">
                        Pay Bill
                    </button>
                    <button className="flex-1 bg-[#1c1e24] hover:bg-[#252730] text-slate-300 text-xs font-medium py-2 rounded-lg transition-colors border border-slate-800">
                        Statements
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Right Column: Operations Center */}
      <div className="bg-white dark:bg-[#15161a] border border-slate-200 dark:border-slate-800/50 rounded-2xl overflow-hidden flex flex-col shadow-sm dark:shadow-none transition-colors">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800/50">
            <button 
                onClick={() => setActiveTab('ACTIVITY')}
                className={`flex-1 py-4 text-xs font-medium tracking-wide transition-colors ${activeTab === 'ACTIVITY' ? 'text-slate-900 bg-slate-50 dark:text-white dark:bg-[#1c1e24]' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
                ACTIVITY
            </button>
            <button 
                onClick={() => setActiveTab('TRANSFER')}
                className={`flex-1 py-4 text-xs font-medium tracking-wide transition-colors ${activeTab === 'TRANSFER' ? 'text-slate-900 bg-slate-50 dark:text-white dark:bg-[#1c1e24]' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
                TRANSFER
            </button>
            <button 
                onClick={() => setActiveTab('BILLS')}
                className={`flex-1 py-4 text-xs font-medium tracking-wide transition-colors ${activeTab === 'BILLS' ? 'text-slate-900 bg-slate-50 dark:text-white dark:bg-[#1c1e24]' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
                BILL PAY
            </button>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-grow">
            {activeTab === 'ACTIVITY' && (
                <div className="space-y-4">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === 'CREDIT' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                                    {tx.type === 'CREDIT' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                                </div>
                                <div>
                                    <h4 className="text-sm text-slate-900 dark:text-slate-200 font-medium">{tx.merchant}</h4>
                                    <p className="text-xs text-slate-500">{tx.date} • {tx.category}</p>
                                </div>
                            </div>
                            <span className={`text-sm font-medium ${tx.type === 'CREDIT' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                                {tx.type === 'CREDIT' ? '+' : '-'}{formatCurrency(tx.amount)}
                            </span>
                        </div>
                    ))}
                    <button className="w-full mt-4 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 py-2 border border-dashed border-slate-300 dark:border-slate-800 rounded-lg transition-colors">
                        View All Transactions
                    </button>
                </div>
            )}
            
            {activeTab === 'TRANSFER' && (
                <div className="h-full flex flex-col">
                    {!showSuccess ? (
                        <form onSubmit={handleTransfer} className="space-y-5 h-full flex flex-col">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1.5 ml-1">Recipient</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={recipient}
                                        onChange={(e) => setRecipient(e.target.value)}
                                        placeholder="Name, UPI ID, or Account"
                                        className="w-full bg-slate-50 dark:bg-[#0b0c10] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                    />
                                    <Smartphone className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 dark:text-slate-600" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-slate-400 mb-1.5 ml-1">Amount</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-slate-400 text-lg font-light">₹</span>
                                    <input 
                                        type="number" 
                                        value={transferAmount}
                                        onChange={(e) => setTransferAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full bg-slate-50 dark:bg-[#0b0c10] border border-slate-200 dark:border-slate-800 rounded-xl pl-8 pr-4 py-3 text-lg font-light text-slate-900 dark:text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-700"
                                    />
                                </div>
                                <div className="flex gap-2 mt-2">
                                    {[1000, 5000, 10000].map(amt => (
                                        <button 
                                            key={amt}
                                            type="button"
                                            onClick={() => setTransferAmount(amt.toString())}
                                            className="text-[10px] bg-slate-100 dark:bg-[#1c1e24] text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                                        >
                                            +₹{amt/1000}k
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto">
                                <button 
                                    type="submit" 
                                    disabled={!recipient || !transferAmount || isProcessing}
                                    className={`w-full py-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                                        !recipient || !transferAmount 
                                        ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
                                        : 'bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200'
                                    }`}
                                >
                                    {isProcessing ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Send Securely
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400">
                                <CheckCircleIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-slate-900 dark:text-white font-medium text-lg">Transfer Successful</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">₹{Number(transferAmount).toLocaleString()} sent to {recipient}</p>
                            <p className="text-slate-400 dark:text-slate-600 text-xs mt-6">Transaction ID: TXN-{Math.floor(Math.random() * 1000000)}</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'BILLS' && (
                <div className="h-full flex flex-col">
                    {!isScheduling ? (
                        <>
                            <div className="flex-grow space-y-3 overflow-y-auto pr-1">
                                {bills.map((bill) => (
                                    <div key={bill.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-[#0b0c10] border border-slate-200 dark:border-slate-800 rounded-xl group hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#1c1e24] flex items-center justify-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                                                <bill.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm text-slate-900 dark:text-slate-200 font-medium">{bill.biller}</h4>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                                                        bill.status === 'DUE' ? 'text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-500/10' : 
                                                        bill.status === 'PAID' ? 'text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/10' :
                                                        'text-blue-600 dark:text-blue-400 border-blue-500/20 bg-blue-500/10'
                                                    }`}>
                                                        {bill.status === 'DUE' ? bill.date : bill.status}
                                                    </span>
                                                    {bill.autoPay && (
                                                        <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
                                                            <RefreshCw className="w-3 h-3" /> Auto
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {bill.status === 'DUE' ? (
                                            <button 
                                                onClick={() => handlePayBill(bill.id)}
                                                disabled={payingId === bill.id}
                                                className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-black text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                                            >
                                                {payingId === bill.id ? (
                                                    <RefreshCw className="w-3 h-3 animate-spin" />
                                                ) : (
                                                    <span>Pay {formatCurrency(bill.amount)}</span>
                                                )}
                                            </button>
                                        ) : bill.status === 'PAID' ? (
                                             <div className="text-emerald-600 dark:text-emerald-500 flex items-center gap-1">
                                                 <Check className="w-4 h-4" />
                                                 <span className="text-xs font-medium">Paid</span>
                                             </div>
                                        ) : (
                                            <span className="text-slate-400 text-sm font-medium">{formatCurrency(bill.amount)}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button 
                                onClick={() => setIsScheduling(true)}
                                className="w-full mt-4 py-3 border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors text-xs font-medium uppercase tracking-wide"
                            >
                                <Plus className="w-4 h-4" />
                                Schedule New Payment
                            </button>
                        </>
                    ) : (
                        <div className="h-full flex flex-col animate-fade-in">
                            <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">New Recurring Payment</h3>
                            <div className="space-y-4 flex-grow">
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1.5 ml-1">Biller Name</label>
                                    <input 
                                        type="text" 
                                        value={newBiller}
                                        onChange={(e) => setNewBiller(e.target.value)}
                                        placeholder="e.g. Netflix, Rent"
                                        className="w-full bg-slate-50 dark:bg-[#0b0c10] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1.5 ml-1">Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3 text-slate-400 text-lg font-light">₹</span>
                                        <input 
                                            type="number" 
                                            value={newBillAmount}
                                            onChange={(e) => setNewBillAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full bg-slate-50 dark:bg-[#0b0c10] border border-slate-200 dark:border-slate-800 rounded-xl pl-8 pr-4 py-3 text-lg font-light text-slate-900 dark:text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-700"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 dark:bg-[#0b0c10] p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                                    <Calendar className="w-4 h-4" />
                                    <span>Recurring Monthly Cycle</span>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-4">
                                <button 
                                    onClick={() => setIsScheduling(false)}
                                    className="flex-1 py-3 rounded-xl font-medium text-sm text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleScheduleBill}
                                    disabled={!newBiller || !newBillAmount}
                                    className={`flex-[2] py-3 rounded-xl font-medium text-sm text-black transition-colors ${!newBiller || !newBillAmount ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500' : 'bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200'}`}
                                >
                                    Confirm Schedule
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

// Internal icon component to avoid huge import list update if CheckCircle2 isn't available
const CheckCircleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export default BankingHub;