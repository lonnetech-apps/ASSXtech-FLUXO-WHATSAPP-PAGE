import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhatsAppChatModal } from './components/WhatsAppChatModal';
import { PlansGrid } from './components/PlansGrid';
import { SpeedCalculator } from './components/SpeedCalculator';
import { Footer } from './components/Footer';
import { FiberPlan } from './types';
import { MessageSquareText, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

export default function App() {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedPlanIdForChat, setSelectedPlanIdForChat] = useState<string | null>(null);

  const handleOpenChat = () => {
    setIsChatModalOpen(true);
  };

  const handleSelectPlan = (plan: FiberPlan) => {
    setSelectedPlanIdForChat(plan.id);
    setIsChatModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Top Header */}
      <Header onOpenChat={handleOpenChat} />

      {/* Main Content */}
      <main>
        {/* Hero with circular logo, horizontal rectangular mosaic, and green WhatsApp button that opens the popup */}
        <Hero 
          onScrollToChat={handleOpenChat}
          onSelectPlanFromHero={(planId) => {
            setSelectedPlanIdForChat(planId);
            setIsChatModalOpen(true);
          }}
        />

        {/* Interactive Chat Launcher Banner Section */}
        <section id="chat-whatsapp" className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#0b141a] via-[#111b21] to-[#0b141a] border-2 border-emerald-500/50 p-6 sm:p-8 shadow-2xl shadow-emerald-950/60 overflow-hidden group">
            {/* Ambient emerald & cyan glow */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-900 border-2 border-emerald-400 shrink-0 shadow-lg shadow-emerald-500/20">
                  <img
                    src="/src/assets/images/xpace_fiber_logo_1793928666467.jpg"
                    alt="Xpace Fibra Assistente"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#111b21]" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Janela de Atendimento Interativo</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                    Assistente Oficial Xpace Fibra
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                    Abra a janela popup em destaque para consultar viabilidade pelo seu CEP, simular planos e ser encaminhado diretamente ao WhatsApp real da nossa central.
                  </p>
                </div>
              </div>

              {/* Action Button to Open Popup */}
              <div className="shrink-0 w-full md:w-auto">
                <button
                  onClick={handleOpenChat}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 hover:from-emerald-500 hover:to-green-400 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-950/70 border border-emerald-300/40 transform hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <MessageSquareText className="w-5 h-5 text-emerald-100" />
                  <span>ABRIR JANELA DO CHAT (POPUP)</span>
                  <ExternalLink className="w-4 h-4 text-emerald-100" />
                </button>
              </div>

            </div>

            {/* Quick preview message bubble snippet */}
            <div className="mt-5 pt-4 border-t border-[#2a3942]/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#202c33] text-slate-300 font-mono-numbers">
                  Status: Online 24h
                </span>
                <span>•</span>
                <span>Consulta de CEP Instantânea</span>
                <span>•</span>
                <span className="text-emerald-400">Instalação Grátis</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Atendimento humanizado e seguro</span>
              </div>
            </div>

          </div>
        </section>

        {/* Full Plans Comparison Grid (350 Mega, 500 Mega, 800 Mega, 1 Giga) */}
        <PlansGrid onSelectPlan={handleSelectPlan} />

        {/* Interactive Bandwidth & Speed Calculator */}
        <SpeedCalculator onSelectPlan={handleSelectPlan} />

        {/* Cobertura & Fiber Network Info Section */}
        <section id="cobertura" className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <div className="p-8 rounded-2xl bg-[#090e1b] border border-cyan-500/20 shadow-xl">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
              Infraestrutura de Ponta
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
              Rede 100% Fibra Óptica Até Dentro da Sua Casa (FTTH)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 max-w-2xl mx-auto leading-relaxed">
              Diferente de conexões antigas com cabos coaxiais ou metálicos, a Xpace Fibra utiliza fios de vidro ultratransparentes que transmitem dados na velocidade da luz com imunidade total a interferências eletromagnéticas e chuvas.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleOpenChat}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/60 transition-transform active:scale-95 flex items-center gap-2"
              >
                <MessageSquareText className="w-4 h-4" />
                <span>Consultar Disponibilidade no Meu CEP (Popup)</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* DEDICATED POPUP MODAL (Evidente o tempo todo até a finalização no WhatsApp real) */}
      <WhatsAppChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        preselectedPlanId={selectedPlanIdForChat}
        onClearPreselectedPlan={() => setSelectedPlanIdForChat(null)}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <button
        onClick={handleOpenChat}
        title="Abrir Atendimento WhatsApp em Janela Popup"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold shadow-2xl shadow-emerald-950/80 border border-emerald-300/40 transition-all hover:scale-105 active:scale-95 group"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
        </span>
        <MessageSquareText className="w-5 h-5 text-white" />
        <span className="text-xs sm:text-sm">Atendimento WhatsApp</span>
      </button>
    </div>
  );
}
