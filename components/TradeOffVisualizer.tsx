import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { TradeOffAnalysis } from '../types';
import { AlertTriangle, ArrowRight, ShieldAlert, TrendingDown } from 'lucide-react';

interface TradeOffVisualizerProps {
  liquidCash: number;
  immediateNeed: number;
  longTermGoal?: number;
  analysis?: TradeOffAnalysis;
  isDarkMode?: boolean;
}

const TradeOffVisualizer: React.FC<TradeOffVisualizerProps> = ({ liquidCash, immediateNeed, longTermGoal = 0, analysis, isDarkMode = true }) => {
  const data = [
    {
      name: 'Liquidity',
      amount: liquidCash,
      fill: isDarkMode ? '#475569' : '#cbd5e1', // Slate 600 : Slate 300
    },
    {
      name: 'Required',
      amount: immediateNeed,
      fill: '#8b5cf6', // Violet 500
    },
  ];

  const shortfall = immediateNeed - liquidCash;
  const isShortfall = shortfall > 0;
  const coveragePercent = Math.min((liquidCash / immediateNeed) * 100, 100);

  return (
    <div className="w-full bg-white dark:bg-[#15161a] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none transition-colors">
      <div className="flex justify-between items-start mb-4 gap-4">
        <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1 truncate">Trade-off Analysis</h4>
            <div className="text-lg font-bold text-slate-900 dark:text-white leading-tight break-words">
                {analysis?.scenario || 'Liquidity Check'}
            </div>
        </div>
        <div className="text-right shrink-0">
             <span className="block text-xs text-slate-500 mb-1">Impact</span>
             <span className={`text-xs font-bold px-2 py-1 rounded-md border inline-block whitespace-nowrap ${isShortfall ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-100 dark:border-red-500/20' : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20'}`}>
                {isShortfall ? `Shortfall ₹${(shortfall / 1000).toFixed(0)}k` : 'Affordable'}
            </span>
        </div>
      </div>
      
      {/* Mini Chart */}
      <div className="h-24 w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
            barSize={16}
          >
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="name" 
              tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 10, fontWeight: 500 }} 
              width={60}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ 
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', 
                  border: isDarkMode ? 'none' : '1px solid #e2e8f0', 
                  borderRadius: '8px',
                  color: isDarkMode ? '#f1f5f9' : '#0f172a',
                  fontSize: '12px',
                  padding: '4px 8px'
              }}
              formatter={(value: number) => [`₹${(value / 100000).toFixed(2)}L`, '']}
            />
            <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
            <ReferenceLine x={liquidCash} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.6} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Analysis Details */}
      {analysis && (
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex gap-3 items-start">
                  <div className="mt-0.5 p-1 bg-amber-50 dark:bg-amber-500/10 rounded text-amber-600 dark:text-amber-500">
                      <TrendingDown className="w-3.5 h-3.5" />
                  </div>
                  <div>
                      <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Goal Impact</p>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-snug">
                          {analysis.longTermConsequence}
                      </p>
                  </div>
              </div>

              <div className="flex gap-3 items-start">
                  <div className="mt-0.5 p-1 bg-violet-50 dark:bg-violet-500/10 rounded text-violet-600 dark:text-violet-500">
                      <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                  <div>
                      <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Recommendation</p>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-snug">
                          {analysis.recommendation}
                      </p>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default TradeOffVisualizer;