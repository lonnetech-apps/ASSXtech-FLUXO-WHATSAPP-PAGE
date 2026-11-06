import React, { useState } from 'react';
import { Gauge, Smartphone, Laptop, Tv, Gamepad2, ArrowRight } from 'lucide-react';
import { FIBER_PLANS } from '../data/plans';
import { FiberPlan } from '../types';

interface SpeedCalculatorProps {
  onSelectPlan: (plan: FiberPlan) => void;
}

export const SpeedCalculator: React.FC<SpeedCalculatorProps> = ({ onSelectPlan }) => {
  const [phones, setPhones] = useState(3);
  const [computers, setComputers] = useState(2);
  const [tvs, setTvs] = useState(2);
  const [isGamer, setIsGamer] = useState(true);

  // Calculate needed bandwidth
  const calculatePlan = (): FiberPlan => {
    let score = (phones * 30) + (computers * 90) + (tvs * 80) + (isGamer ? 250 : 0);
    if (score <= 350) return FIBER_PLANS[0]; // 350 Mega
    if (score <= 550) return FIBER_PLANS[1]; // 500 Mega
    if (score <= 850) return FIBER_PLANS[2]; // 800 Mega
    return FIBER_PLANS[3]; // 1 Giga
  };

  const recommendedPlan = calculatePlan();

  return (
    <section id="calculadora" className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="relative rounded-3xl bg-gradient-to-b from-[#090f1e] to-[#060a14] border border-cyan-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              Simulador Inteligente de Banda
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              Qual a Velocidade Ideal Para Sua Casa?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Ajuste os aparelhos conectados simultaneamente e nosso sistema calcula o plano ideal para zero lentidão.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Sliders Area */}
            <div className="space-y-5 bg-[#0b1222]/80 p-5 rounded-2xl border border-slate-800">
              {/* Phones */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-200 mb-2">
                  <span className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-cyan-400" />
                    Celulares e Tablets
                  </span>
                  <span className="font-mono-numbers text-cyan-400 font-bold">{phones} aparelhos</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={phones}
                  onChange={(e) => setPhones(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Computers */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-200 mb-2">
                  <span className="flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-indigo-400" />
                    Computadores e Notebooks (Home Office)
                  </span>
                  <span className="font-mono-numbers text-indigo-400 font-bold">{computers} aparelhos</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={computers}
                  onChange={(e) => setComputers(Number(e.target.value))}
                  className="w-full accent-indigo-400 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* TVs */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-200 mb-2">
                  <span className="flex items-center gap-2">
                    <Tv className="w-4 h-4 text-purple-400" />
                    Smart TVs (Netflix, YouTube 4K, Max)
                  </span>
                  <span className="font-mono-numbers text-purple-400 font-bold">{tvs} aparelhos</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={tvs}
                  onChange={(e) => setTvs(Number(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Gaming Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                  <Gamepad2 className="w-4 h-4 text-emerald-400" />
                  <span>Alguém joga online ou faz transmissões?</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsGamer(!isGamer)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isGamer ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      isGamer ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Recommendation Result Card */}
            <div className="rounded-2xl p-6 bg-gradient-to-b from-[#0d162a] to-[#091020] border-2 border-cyan-400 shadow-xl shadow-cyan-950/40 text-center flex flex-col justify-between h-full">
              <div>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">
                  Plano Recomendado
                </span>
                <h4 className="text-3xl sm:text-4xl font-black font-display text-white mt-1">
                  {recommendedPlan.speed}
                </h4>
                <div className="text-xl font-bold text-emerald-400 font-mono-numbers mt-1">
                  {recommendedPlan.price}<span className="text-xs text-slate-400 font-normal">/mês</span>
                </div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {recommendedPlan.summary}
                </p>
                <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 text-left">
                  <div className="font-semibold text-cyan-300 mb-1">Por que esse plano?</div>
                  <div>Garante estabilidade para {phones + computers + tvs} aparelhos simultâneos com folga de sinal e baixa latência.</div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => onSelectPlan(recommendedPlan)}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition-transform active:scale-95"
                >
                  <span>Contratar {recommendedPlan.speed} no WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
