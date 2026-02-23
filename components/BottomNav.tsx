/**
 * THE MAGICAL ORB NAVIGATION (Dark Mode Optimized)
 * 
 * DESIGN PHILOSOPHY: The interface must breathe, especially in the shadows. 
 * Contrast isn't just about color; it's about the interplay of light and dark.
 */

import React from 'react';
import { Home, PieChart, Sparkles, BarChart3, Target } from 'lucide-react';

interface BottomNavProps {
  activePage: 'DASHBOARD' | 'PORTFOLIO' | 'ORACLE' | 'ORACLE_HUB' | 'EXPENDITURE' | 'PROFILE' | 'GOALS' | 'ONBOARDING' | 'INVESTMENTS';
  onNavigate: (page: 'DASHBOARD' | 'PORTFOLIO' | 'ORACLE' | 'ORACLE_HUB' | 'EXPENDITURE' | 'GOALS' | 'INVESTMENTS') => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavigate }) => {
  const getIconColor = (page: string) => {
    return activePage === page
      ? 'text-federalblue-900 dark:text-white'
      : 'text-zinc-400 hover:text-federalblue-900 dark:hover:text-zinc-200';
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-sm:w-[calc(100%-32px)] max-w-sm glass-card rounded-[2.5rem] py-4 px-8 flex justify-between items-center z-50 transition-all font-sans shadow-apple-lg border-t-white/90 dark:border-t-white/10">
      <div
        onClick={() => onNavigate('DASHBOARD')}
        className={`flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-90 ${getIconColor('DASHBOARD')}`}
      >
        <Home className="w-5 h-5" strokeWidth={activePage === 'DASHBOARD' ? 2.5 : 1.5} />
        <span className="text-[9px] font-bold tracking-widest uppercase">Home</span>
      </div>

      <div
        onClick={() => onNavigate('INVESTMENTS')}
        className={`flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-90 ${getIconColor(activePage === 'PORTFOLIO' ? 'PORTFOLIO' : 'INVESTMENTS')}`}
      >
        <PieChart className="w-5 h-5" strokeWidth={activePage === 'INVESTMENTS' || activePage === 'PORTFOLIO' ? 2.5 : 1.5} />
        <span className="text-[9px] font-bold tracking-widest uppercase">Wealth</span>
      </div>

      {/* --- THE MAGICAL ORB (Oracle Trigger) --- */}
      <div
        onClick={() => onNavigate('ORACLE_HUB')}
        className="relative -mt-12 group cursor-pointer"
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-700 active:scale-95 border border-white/30 ${activePage === 'ORACLE' || activePage === 'ORACLE_HUB'
          ? 'bg-gradient-to-tr from-[#f37021] via-[#ff9933] to-yellow-400 scale-110 shadow-oracle ring-4 ring-white/20'
          : 'bg-gradient-to-tr from-[#f37021] to-[#f37021]/80 hover:scale-110 shadow-oracle rotate-12'
          }`}>
          <Sparkles className={`w-7 h-7 text-white drop-shadow-lg ${activePage === 'ORACLE' || activePage === 'ORACLE_HUB' ? 'animate-pulse' : ''}`} strokeWidth={2.5} />

          {/* Internal Specular Pulse */}
          <div className="absolute inset-2 rounded-full border-t border-white/40 blur-[1px]"></div>

          {/* Atmospheric Glow */}
          <div className="absolute -inset-4 bg-federalgold-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
        </div>
      </div>

      <div
        onClick={() => onNavigate('EXPENDITURE')}
        className={`flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-90 ${getIconColor('EXPENDITURE')}`}
      >
        <BarChart3 className="w-5 h-5" strokeWidth={activePage === 'EXPENDITURE' ? 2.5 : 1.5} />
        <span className="text-[9px] font-bold tracking-widest uppercase">Flow</span>
      </div>

      <div
        onClick={() => onNavigate('GOALS')}
        className={`flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-90 ${getIconColor('GOALS')}`}
      >
        <Target className="w-5 h-5" strokeWidth={activePage === 'GOALS' ? 2.5 : 1.5} />
        <span className="text-[9px] font-bold tracking-widest uppercase">Goals</span>
      </div>
    </div>
  );
};

export default BottomNav;