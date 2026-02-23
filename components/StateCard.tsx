import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StateCardProps {
  category: string;
  icon: LucideIcon;
  colorClass: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const StateCard: React.FC<StateCardProps> = ({ category, icon: Icon, colorClass, children, isActive }) => {
  // Extract the text color part (e.g., 'text-emerald-400') from the prop or map it
  // Assuming colorClass passed is like 'bg-emerald-500' or similar, we want the text equivalent for the icon
  const accentColor = colorClass.replace('bg-', 'text-').replace('500', '400');
  const lightAccentColor = colorClass.replace('bg-', 'text-').replace('500', '600');

  return (
    <div className={`
      flex flex-col h-full
      rounded-2xl p-6 transition-all duration-300
      ${isActive 
        ? 'bg-white dark:bg-[#1c1e24] shadow-lg dark:shadow-xl border border-slate-200 dark:border-slate-700/50' 
        : 'bg-white dark:bg-[#15161a] border border-slate-200 dark:border-transparent hover:border-slate-300 dark:hover:border-slate-800 shadow-sm dark:shadow-none'
      }
    `}>
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">{category}</span>
        <div className={`p-2 rounded-full ${colorClass} bg-opacity-10 dark:bg-opacity-10`}>
             <Icon className={`w-4 h-4 text-slate-700 dark:${accentColor} ${lightAccentColor} dark:text-${accentColor.split('-')[1]}-400`} />
        </div>
      </div>
      <div className="flex-grow space-y-4">
        {children}
      </div>
    </div>
  );
};

export default StateCard;