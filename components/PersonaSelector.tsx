import React, { useState } from 'react';
import { Sparkles, ChevronRight, Briefcase, GraduationCap, Shield, Heart, Sun, Moon } from 'lucide-react';
import { PersonaProfile } from '../data/personas';

interface PersonaSelectorProps {
  personas: PersonaProfile[];
  onSelect: (persona: PersonaProfile) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const personaIcons: Record<string, any> = {
  advait: Briefcase,
  rajesh: Briefcase,
  ishan: GraduationCap,
  kapoor: Shield,
  anjali: Heart,
};

const personaGradients: Record<string, string> = {
  advait: 'from-[#004d9c] to-[#002d5e]',
  rajesh: 'from-[#004d9c] to-[#001d3d]',
  ishan: 'from-[#7c3aed] to-[#3b0764]',
  kapoor: 'from-[#065f46] to-[#022c22]',
  anjali: 'from-[#be185d] to-[#500724]',
};

const personaBgAccents: Record<string, string> = {
  advait: 'bg-blue-500/10',
  rajesh: 'bg-blue-500/10',
  ishan: 'bg-violet-500/10',
  kapoor: 'bg-emerald-500/10',
  anjali: 'bg-pink-500/10',
};

const PersonaSelector: React.FC<PersonaSelectorProps> = ({ personas, onSelect, isDarkMode, toggleTheme }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-[#333333] dark:text-white flex flex-col transition-colors duration-300">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-federalblue-900 dark:hover:text-white transition-colors shadow-sm border border-slate-200 dark:border-zinc-700"
        >
          {isDarkMode ? <Sun className="w-5 h-5" strokeWidth={1.5} /> : <Moon className="w-5 h-5" strokeWidth={1.5} />}
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-12 max-w-md mx-auto w-full">
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#f37021] to-[#FFD740] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3 text-[#333333] dark:text-white">
            Oracle
          </h1>
          <p className="text-sm text-slate-400 dark:text-zinc-500 font-medium tracking-wide">
            by Federal Bank
          </p>
          <p className="text-slate-500 dark:text-zinc-400 text-sm mt-4 max-w-xs mx-auto leading-relaxed">
            Choose your profile to unlock a personalized banking experience powered by AI.
          </p>
        </div>

        <div className="space-y-4">
          {personas.map((persona) => {
            const IconComponent = personaIcons[persona.id] || Briefcase;
            const gradient = personaGradients[persona.id] || 'from-slate-700 to-slate-900';
            const isHovered = hoveredId === persona.id;

            return (
              <button
                key={persona.id}
                onClick={() => onSelect(persona)}
                onMouseEnter={() => setHoveredId(persona.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`w-full text-left rounded-[1.75rem] p-5 transition-all duration-500 border active:scale-[0.98] relative overflow-hidden group ${
                  isHovered
                    ? 'bg-slate-50 dark:bg-zinc-900/80 border-slate-200 dark:border-zinc-700'
                    : 'bg-white dark:bg-zinc-900/40 border-slate-200 dark:border-zinc-800/50'
                } shadow-sm dark:shadow-none`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="relative z-10 flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-lg`}>
                    <span className="text-xl font-bold text-white">{persona.avatar}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-base font-bold text-[#333333] dark:text-white tracking-tight">{persona.name}</h3>
                      <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">{persona.age}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 mb-1">{persona.role}</p>
                    <p className="text-[11px] text-slate-400 dark:text-zinc-600 leading-snug truncate">{persona.description}</p>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isHovered ? 'bg-slate-200/60 dark:bg-white/10 translate-x-0' : 'bg-transparent -translate-x-1'
                  }`}>
                    <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
                      isHovered ? 'text-[#333333] dark:text-white' : 'text-slate-300 dark:text-zinc-700'
                    }`} />
                  </div>
                </div>

                <div className="relative z-10 flex flex-wrap gap-2 mt-3 ml-[4.5rem] pr-2">
                  {persona.features.map((feature, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-zinc-500 border border-slate-200 dark:border-zinc-800/50 whitespace-nowrap"
                    >
                      {feature.title.split(' ').slice(0, 2).join(' ')}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-center text-[10px] text-slate-400 dark:text-zinc-700 mt-8 tracking-wide">
          ORACLE INTELLIGENCE ADAPTS TO YOUR LIFE STAGE
        </p>
      </div>
    </div>
  );
};

export default PersonaSelector;
