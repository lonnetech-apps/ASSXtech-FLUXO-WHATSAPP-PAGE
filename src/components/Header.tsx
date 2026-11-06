import React from 'react';
import { MessageSquareText } from 'lucide-react';

interface HeaderProps {
  onOpenChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenChat }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#060911]/85 border-b border-cyan-900/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-18">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-3 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 font-display group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-shadow">
            <div className="w-full h-full rounded-full bg-[#080d1a] flex items-center justify-center">
              <span className="text-cyan-400 font-extrabold text-sm tracking-tighter">XF</span>
            </div>
          </div>
          <span className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-200 to-purple-400">
            XPACE<span className="text-white font-normal ml-1.5 text-base">FIBRA</span>
          </span>
        </a>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#cenarios" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Cenários de Uso
          </a>
          <a href="#planos" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Planos & Benefícios
          </a>
          <a href="#calculadora" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Simulador de Banda
          </a>
          <a href="#cobertura" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Cobertura & Fibra
          </a>
        </nav>

        {/* Zone 3: 1 Primary CTA Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenChat}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-lg shadow-emerald-950/40 border border-emerald-400/30 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            <MessageSquareText className="w-4 h-4 text-emerald-100" />
            <span>Contratar no WhatsApp</span>
          </button>
        </div>
      </div>
    </header>
  );
};
