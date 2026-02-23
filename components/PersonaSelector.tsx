import React, { useState } from 'react';
import { Sparkles, ChevronRight, Briefcase, GraduationCap, Shield, Heart } from 'lucide-react';
import { PersonaProfile } from '../data/personas';

interface PersonaSelectorProps {
  personas: PersonaProfile[];
  onSelect: (persona: PersonaProfile) => void;
}

const personaIcons: Record<string, any> = {
  rajesh: Briefcase,
  ishan: GraduationCap,
  kapoor: Shield,
  anjali: Heart,
};

const personaGradients: Record<string, string> = {
  rajesh: 'from-[#004d9c] to-[#001d3d]',
  ishan: 'from-[#7c3aed] to-[#3b0764]',
  kapoor: 'from-[#065f46] to-[#022c22]',
  anjali: 'from-[#be185d] to-[#500724]',
};

const personaBgAccents: Record<string, string> = {
  rajesh: 'bg-blue-500/10',
  ishan: 'bg-violet-500/10',
  kapoor: 'bg-emerald-500/10',
  anjali: 'bg-pink-500/10',
};

const PersonaSelector: React.FC<PersonaSelectorProps> = ({ personas, onSelect }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-12 max-w-md mx-auto w-full">
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#f37021] to-[#FFD740] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Oracle
          </h1>
          <p className="text-sm text-zinc-500 font-medium tracking-wide">
            by Federal Bank
          </p>
          <p className="text-zinc-400 text-sm mt-4 max-w-xs mx-auto leading-relaxed">
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
                className={`w-full text-left rounded-[1.75rem] p-5 transition-all duration-500 border border-zinc-800/50 hover:border-zinc-700 active:scale-[0.98] relative overflow-hidden group ${
                  isHovered ? 'bg-zinc-900/80' : 'bg-zinc-900/40'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="relative z-10 flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-lg`}>
                    <span className="text-xl font-bold text-white">{persona.avatar}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-base font-bold text-white tracking-tight">{persona.name}</h3>
                      <span className="text-[10px] text-zinc-500 font-medium">{persona.age}</span>
                    </div>
                    <p className="text-xs font-semibold text-zinc-400 mb-1">{persona.role}</p>
                    <p className="text-[11px] text-zinc-600 leading-snug truncate">{persona.description}</p>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isHovered ? 'bg-white/10 translate-x-0' : 'bg-transparent -translate-x-1'
                  }`}>
                    <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
                      isHovered ? 'text-white' : 'text-zinc-700'
                    }`} />
                  </div>
                </div>

                <div className="relative z-10 flex gap-2 mt-3 ml-[4.5rem]">
                  {persona.features.map((feature, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-zinc-500 border border-zinc-800/50"
                    >
                      {feature.title.split(' ').slice(0, 2).join(' ')}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-center text-[10px] text-zinc-700 mt-8 tracking-wide">
          ORACLE INTELLIGENCE ADAPTS TO YOUR LIFE STAGE
        </p>
      </div>
    </div>
  );
};

export default PersonaSelector;
