import React, { useState } from 'react';
import { Smartphone, Laptop, Tv, Video, Zap, ShieldCheck, ArrowDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onScrollToChat: () => void;
  onSelectPlanFromHero?: (planId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToChat }) => {
  const [activeScenario, setActiveScenario] = useState<number>(0);

  const scenarios = [
    {
      id: 'celular',
      title: 'No Celular',
      subtitle: 'Streaming & Redes Ultrarrápidas',
      icon: Smartphone,
      description: 'Vídeos em 4K no TikTok e YouTube sem nenhum segundo de carregamento, downloads de apps pesados em segundos e Wi-Fi sem zonas de sombra em qualquer cômodo.',
      speedTag: '350M - 500M',
      ping: '5ms',
    },
    {
      id: 'computador',
      title: 'No Computador',
      subtitle: 'Home Office & Produtividade',
      icon: Laptop,
      description: 'Envio imediato de arquivos volumosos para a nuvem, sincronização com GitHub, Google Drive e múltiplos monitores operando sem atraso.',
      speedTag: '500M - 800M',
      ping: '3ms',
    },
    {
      id: 'jogando-tv',
      title: 'Jogando na TV',
      subtitle: 'Games 4K com Zero Lag',
      icon: Tv,
      description: 'Console PlayStation 5, Xbox Series e PC Gamer rodando partidas online com ping reduzido, rotas dedicadas e zero perda de pacotes (packet loss).',
      speedTag: '800M - 1 Giga',
      ping: '2ms',
    },
    {
      id: 'video-chamada',
      title: 'Em Vídeo Chamada',
      subtitle: 'Reuniões Cristalinas em Alta Definição',
      icon: Video,
      description: 'Toda a família conectada em chamadas simultâneas de alta fidelidade no Zoom, Google Meet e WhatsApp sem congelamento de áudio ou vídeo granulado.',
      speedTag: '350M - 1 Giga',
      ping: '4ms',
    },
  ];

  return (
    <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-cyber-grid">
      {/* Background ambient futuristic glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        
        {/* 1. LOGO EM UM CÍRCULO ACIMA */}
        <div className="relative group mb-6">
          {/* Futuristic animated rings */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 opacity-75 blur-md group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-b from-cyan-400 via-indigo-600 to-purple-600 shadow-2xl shadow-cyan-500/30">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#070b14] p-1 flex items-center justify-center border-2 border-cyan-400/50">
              <img
                src="/src/assets/images/xpace_fiber_logo_1793928666467.jpg"
                alt="Logo Xpace Fibra Internet"
                className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          {/* Subtle tech badge below circular emblem */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-0.5 rounded-full bg-[#0a101f] border border-cyan-500/40 text-[11px] font-semibold tracking-wider text-cyan-300 shadow-md">
            100% FIBRA ÓPTICA
          </div>
        </div>

        {/* Hero Typography */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tecnologia Ultrarrápida da Próxima Geração</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white text-balance leading-tight">
            A Conexão do Futuro na Sua Casa com{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              Xpace Fibra
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Navegue, trabalhe, jogue em 4K e realize chamadas simultâneas com estabilidade máxima,
            latência ultrabaixa e planos de <strong className="text-white font-semibold">350 Mega a 1 Giga</strong>.
          </p>
        </div>

        {/* 2. FOTO HORIZONTAL EM FORMATO RETANGULAR COM CENÁRIOS EM MOSAICO DESFOCADO */}
        <div id="cenarios" className="w-full max-w-5xl mb-8">
          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#0a0f1d] shadow-2xl shadow-cyan-950/60 group">
            
            {/* Top decorative glass bar */}
            <div className="w-full px-4 py-2.5 bg-[#090d18]/90 border-b border-cyan-900/40 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/80 animate-ping" />
                <span className="font-semibold text-slate-200">Mosaico Dinâmico de Experiência Xpace</span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono-numbers text-cyan-400/80">
                <span>LATÊNCIA: &lt; 2MS</span>
                <span>•</span>
                <span>DOWNLOAD SIMÉTRICO</span>
                <span>•</span>
                <span>WI-FI 6 MESH</span>
              </div>
            </div>

            {/* Main Mosaic Frame */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-slate-950">
              {/* Mosaic Image Asset */}
              <img
                src="/src/assets/images/mosaic_internet_scenarios_1793928667893.jpg"
                alt="Mosaico de cenários de uso da internet fibra: no celular, no computador, jogando na TV e em videoconferência"
                className="w-full h-full object-cover object-center transform scale-[1.01] group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Dynamic Blurred Seams and Gradient Light Dividers */}
              <div className="absolute inset-0 pointer-events-none flex">
                {/* 1st seam blur divider between Cellphone and Computer */}
                <div className="absolute left-[25%] top-0 bottom-0 w-16 -translate-x-1/2 backdrop-blur-[6px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent border-x border-cyan-400/20" />
                
                {/* Center seam blur divider between Computer and TV Gaming */}
                <div className="absolute left-[50%] top-0 bottom-0 w-20 -translate-x-1/2 backdrop-blur-[8px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent border-x border-purple-400/20" />
                
                {/* 3rd seam blur divider between Gaming and Video Call */}
                <div className="absolute left-[75%] top-0 bottom-0 w-16 -translate-x-1/2 backdrop-blur-[6px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent border-x border-cyan-400/20" />
              </div>

              {/* Overlay gradient scrim for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060911]/95 via-transparent to-black/30 pointer-events-none" />

              {/* Bottom scenario labels overlay inside the mosaic */}
              <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {scenarios.map((sc, idx) => {
                  const Icon = sc.icon;
                  const isActive = activeScenario === idx;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => setActiveScenario(idx)}
                      className={`text-left p-2.5 rounded-xl transition-all duration-300 backdrop-blur-md border ${
                        isActive
                          ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/50'
                          : 'bg-black/50 border-white/10 text-slate-300 hover:bg-black/70 hover:border-cyan-500/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                        <span className="text-xs font-bold truncate">{sc.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate hidden sm:block">
                        {sc.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Scenario Detailed Spotlight Bar */}
            <div className="p-4 sm:p-5 bg-[#090e1a] border-t border-cyan-900/30 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-900/40 border border-cyan-500/30 text-cyan-300 shrink-0 mt-0.5">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
                    <span>{scenarios[activeScenario].title}: {scenarios[activeScenario].subtitle}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-cyan-900/50 text-cyan-300 font-mono-numbers">
                      Ping: {scenarios[activeScenario].ping}
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                    {scenarios[activeScenario].description}
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-3">
                <span className="text-xs text-slate-400 hidden lg:inline">Plano sugerido:</span>
                <span className="px-3 py-1 rounded-md bg-indigo-950/70 border border-indigo-500/40 text-indigo-300 text-xs font-bold font-mono-numbers">
                  {scenarios[activeScenario].speedTag}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* 3. BOTÃO VERDE PARA ACESSAR A PARTE DO CHAT ESTILO WHATSAPP */}
        <div className="flex flex-col items-center">
          <button
            onClick={onScrollToChat}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 hover:from-emerald-500 hover:to-green-400 text-white font-bold text-base sm:text-lg shadow-xl shadow-emerald-950/60 border border-emerald-300/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            {/* Pulsing ring aura */}
            <span className="absolute -inset-1 rounded-2xl bg-emerald-500/40 blur-md group-hover:bg-emerald-400/60 transition-colors animate-pulse" />
            
            {/* Official WhatsApp-style phone / speech bubble icon */}
            <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8 2.53 1.09 2.53.73 2.98.69.45-.04 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29" />
              </svg>
            </span>

            <span className="relative">Contratar Planos pelo WhatsApp</span>

            <ArrowDown className="relative w-5 h-5 text-emerald-100 group-hover:translate-y-1 transition-transform" />
          </button>

          <div className="flex items-center gap-6 mt-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Atendimento Imediato & Seguro
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Consulte Viabilidade pelo CEP</span>
            <span>•</span>
            <span className="text-cyan-400 font-medium">Instalação Gratuita</span>
          </div>
        </div>

      </div>
    </section>
  );
};
