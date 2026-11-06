import React from 'react';
import { Check, Zap, Wifi, Shield, ArrowRight, Star } from 'lucide-react';
import { FIBER_PLANS } from '../data/plans';
import { FiberPlan } from '../types';

interface PlansGridProps {
  onSelectPlan: (plan: FiberPlan) => void;
}

export const PlansGrid: React.FC<PlansGridProps> = ({ onSelectPlan }) => {
  return (
    <section id="planos" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          Planos Residenciais & Comerciais
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
          Escolha a Velocidade Ideal para Seu Estilo de Vida
        </h2>
        <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
          Todos os planos incluem 100% fibra óptica dedicada até seu roteador, Wi-Fi incluso, taxa de instalação gratuita e atendimento humanizado.
        </p>
      </div>

      {/* Grid of the 4 Plans: 350M, 500M, 800M, 1 Giga */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {FIBER_PLANS.map((plan) => {
          const isPopular = plan.popular;
          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl flex flex-col justify-between p-6 transition-all duration-300 border ${
                isPopular
                  ? 'bg-gradient-to-b from-[#0b172a] to-[#070e1c] border-cyan-400 shadow-xl shadow-cyan-950/50 ring-1 ring-cyan-400/50 -translate-y-1'
                  : 'bg-[#090e1a] border-slate-800/80 hover:border-cyan-500/40 hover:-translate-y-0.5'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-[11px] font-bold tracking-wide shadow-md flex items-center gap-1">
                  {isPopular && <Star className="w-3 h-3 fill-current" />}
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="border-b border-slate-800 pb-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                    {plan.name}
                  </span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
                      {plan.speed}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-slate-400">
                    {plan.idealFor}
                  </div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono-numbers">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-400">/mês</span>
                  </div>
                </div>

                {/* Resumo do que se pode fazer com essa velocidade */}
                <div className="py-4 border-b border-slate-800/80">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                    O que você pode fazer:
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {plan.whatYouCanDo.slice(0, 4).map((activity, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefícios em cada velocidade */}
                <div className="py-4">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    Benefícios Inclusos:
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {plan.benefits.slice(0, 4).map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-800/60 mt-4">
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    isPopular
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/60'
                      : 'bg-[#141d2f] hover:bg-emerald-600 text-slate-200 hover:text-white border border-slate-700/60 hover:border-emerald-500'
                  }`}
                >
                  <span>Contratar {plan.speed}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="mt-12 rounded-2xl p-6 bg-[#090d18] border border-cyan-900/30 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Instalação Expressa Gratuita</h4>
            <p className="text-xs text-slate-400 mt-0.5">Técnicos certificados com agendamento flexível.</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
            <Wifi className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Wi-Fi de Alta Densidade</h4>
            <p className="text-xs text-slate-400 mt-0.5">Equipamentos modernos com tecnologia Wi-Fi 6.</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Suporte Técnico Humanizado</h4>
            <p className="text-xs text-slate-400 mt-0.5">Canal direto via WhatsApp e telefone 24h por dia.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
