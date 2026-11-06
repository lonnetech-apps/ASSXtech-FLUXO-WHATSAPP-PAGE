import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Phone, Video, MoreVertical, CheckCheck, 
  Sparkles, Check, ArrowRight, RotateCcw, Copy, 
  MapPin, Volume2, VolumeX, ShieldCheck, Zap, ExternalLink, Settings2
} from 'lucide-react';
import { FiberPlan, LeadData, ChatMessage } from '../types';
import { FIBER_PLANS } from '../data/plans';
import { soundEffects } from '../utils/audio';
import { logoImg } from '../assets/images';

interface WhatsAppChatProps {
  preselectedPlanId?: string | null;
  onClearPreselectedPlan?: () => void;
}

type Step = 
  | 'welcome'
  | 'ask_name'
  | 'ask_phone'
  | 'ask_cep'
  | 'ask_number'
  | 'choose_plan'
  | 'plan_details'
  | 'completed';

export const WhatsAppChat: React.FC<WhatsAppChatProps> = ({ 
  preselectedPlanId,
  onClearPreselectedPlan 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copied, setCopied] = useState(false);
  
  // Commercial WhatsApp number (editable)
  const [whatsappNumber, setWhatsappNumber] = useState('5511999999999');
  const [showNumberSetting, setShowNumberSetting] = useState(false);

  // Customer collected data
  const [lead, setLead] = useState<LeadData>({
    name: '',
    whatsapp: '',
    cep: '',
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    number: '',
    complement: '',
  });

  const [selectedPlan, setSelectedPlan] = useState<FiberPlan | null>(null);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getTimeString = () => {
    const now = new Date();
    return now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  // Helper to add assistant message with realistic typing delay
  const addAssistantMessage = (
    text: string, 
    type: ChatMessage['type'] = 'text', 
    plan?: FiberPlan, 
    delayMs: number = 800
  ) => {
    setIsTyping(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now() + Math.random()),
            sender: 'assistant',
            text,
            timestamp: getTimeString(),
            type,
            planSelected: plan,
          },
        ]);
        soundEffects.playPop();
        resolve();
      }, delayMs);
    });
  };

  // Initial welcome flow setup
  useEffect(() => {
    const initChat = async () => {
      setMessages([]);
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 600));
      setIsTyping(false);

      setMessages([
        {
          id: 'msg-welcome-1',
          sender: 'assistant',
          text: 'Olá! 👋 Seja muito bem-vindo à Xpace Fibra, seu fornecedor de internet fibra óptica ultrarrápida do futuro! 🚀',
          timestamp: getTimeString(),
          type: 'text',
        },
      ]);
      soundEffects.playPop();

      await addAssistantMessage(
        'Sou o assistente virtual da Xpace Fibra. Estou aqui para consultar a disponibilidade no seu endereço e te ajudar a escolher o plano ideal com instalação 100% gratuita.',
        'text',
        undefined,
        900
      );

      await addAssistantMessage(
        'Para começarmos o seu atendimento rápido, por favor me informe o seu **Nome Completo**:',
        'text',
        undefined,
        700
      );

      setCurrentStep('ask_name');
    };

    initChat();
  }, []);

  // Handle preselection from external plan cards
  useEffect(() => {
    if (preselectedPlanId) {
      const plan = FIBER_PLANS.find(p => p.id === preselectedPlanId);
      if (plan) {
        handlePlanSelection(plan);
        if (onClearPreselectedPlan) onClearPreselectedPlan();
      }
    }
  }, [preselectedPlanId]);

  // Cep auto-lookup
  const fetchAddressByCep = async (cepValue: string) => {
    const cleaned = cepValue.replace(/\D/g, '');
    if (cleaned.length !== 8) return null;

    setIsLoadingCep(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`);
      const data = await res.json();
      setIsLoadingCep(false);
      if (!data.erro) {
        return {
          street: data.logradouro || '',
          neighborhood: data.bairro || '',
          city: data.localidade || '',
          state: data.uf || '',
        };
      }
      return null;
    } catch {
      setIsLoadingCep(false);
      return null;
    }
  };

  const handleSendMessage = async (customText?: string) => {
    const messageToSend = (customText !== undefined ? customText : inputText).trim();
    if (!messageToSend) return;

    soundEffects.playSend();

    // Append user message
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: messageToSend,
      timestamp: getTimeString(),
      type: 'text',
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Flow machine
    if (currentStep === 'ask_name') {
      setLead((prev) => ({ ...prev, name: messageToSend }));
      setCurrentStep('ask_phone');

      await addAssistantMessage(
        `Prazer em falar com você, ${messageToSend}! 😊\n\nAgora, por favor, digite o seu **Telefone / WhatsApp com DDD** para mantermos contato:`,
        'text',
        undefined,
        800
      );
    } else if (currentStep === 'ask_phone') {
      setLead((prev) => ({ ...prev, whatsapp: messageToSend }));
      setCurrentStep('ask_cep');

      await addAssistantMessage(
        `Perfeito! 📍 Agora me informe o seu **CEP** residencial para verificarmos a viabilidade da nossa fibra óptica de alta velocidade no seu bairro:`,
        'text',
        undefined,
        800
      );
    } else if (currentStep === 'ask_cep') {
      const cleaned = messageToSend.replace(/\D/g, '');
      const addr = await fetchAddressByCep(cleaned);

      if (addr && addr.city) {
        setLead((prev) => ({
          ...prev,
          cep: messageToSend,
          street: addr.street,
          neighborhood: addr.neighborhood,
          city: addr.city,
          state: addr.state,
        }));

        await addAssistantMessage(
          `🎉 **Ótima notícia!** A cobertura 100% fibra óptica da Xpace está totalmente ativa na sua região!\n\n📍 **Endereço localizado:**\n${addr.street || 'Rua identificada'}, ${addr.neighborhood} - ${addr.city}/${addr.state} (CEP: ${messageToSend})`,
          'address_confirm',
          undefined,
          1000
        );

        await addAssistantMessage(
          `Para finalizar a localização técnica, qual é o **número da sua residência** e complemento (apto, bloco, casa, se houver)?`,
          'text',
          undefined,
          700
        );
        setCurrentStep('ask_number');
      } else {
        // Fallback if CEP was typed or not found via ViaCEP
        setLead((prev) => ({ ...prev, cep: messageToSend }));
        await addAssistantMessage(
          `CEP ${messageToSend} registrado! A viabilidade na sua zona foi confirmada com sinal de alta potência. ⚡\n\nQual é o seu **endereço completo com número e bairro**?`,
          'text',
          undefined,
          800
        );
        setCurrentStep('ask_number');
      }
    } else if (currentStep === 'ask_number') {
      setLead((prev) => ({
        ...prev,
        number: messageToSend,
        street: prev.street || messageToSend,
      }));

      setCurrentStep('choose_plan');

      await addAssistantMessage(
        `Maravilha, ${lead.name || 'cliente'}! Todos os seus dados de localização foram salvos com sucesso. 🚀\n\nAbaixo estão as opções de **Planos Fibra Óptica** disponíveis para você. Escolha o plano desejado para ver o resumo completo de velocidade e benefícios:`,
        'plan_selection',
        undefined,
        900
      );
    } else if (currentStep === 'choose_plan' || currentStep === 'plan_details') {
      // Check if user typed a plan name
      const lower = messageToSend.toLowerCase();
      let matched: FiberPlan | undefined;
      if (lower.includes('350')) matched = FIBER_PLANS.find(p => p.id === '350mega');
      else if (lower.includes('500')) matched = FIBER_PLANS.find(p => p.id === '500mega');
      else if (lower.includes('800')) matched = FIBER_PLANS.find(p => p.id === '800mega');
      else if (lower.includes('1 giga') || lower.includes('1000') || lower.includes('1giga') || lower.includes('giga')) {
        matched = FIBER_PLANS.find(p => p.id === '1giga');
      }

      if (matched) {
        handlePlanSelection(matched);
      } else {
        await addAssistantMessage(
          'Por favor, clique em um dos planos abaixo ou digite: 350 Mega, 500 Mega, 800 Mega ou 1 Giga.',
          'plan_selection',
          undefined,
          600
        );
      }
    }
  };

  const handlePlanSelection = async (plan: FiberPlan) => {
    setSelectedPlan(plan);
    setLead(prev => ({ ...prev, planId: plan.id }));

    // User message
    setMessages(prev => [
      ...prev,
      {
        id: String(Date.now()),
        sender: 'user',
        text: `Gostaria de conhecer mais sobre o plano de ${plan.speed}!`,
        timestamp: getTimeString(),
        type: 'text',
      },
    ]);

    setCurrentStep('plan_details');

    await addAssistantMessage(
      `Excelente escolha! Aqui está o resumo completo do plano **${plan.name}** (${plan.price}/mês):`,
      'plan_details',
      plan,
      800
    );
  };

  const handleConfirmPlan = async () => {
    if (!selectedPlan) return;

    soundEffects.playSend();
    setMessages(prev => [
      ...prev,
      {
        id: String(Date.now()),
        sender: 'user',
        text: `Quero contratar o plano ${selectedPlan.speed}! Como finalizo?`,
        timestamp: getTimeString(),
        type: 'text',
      },
    ]);

    setCurrentStep('completed');

    await addAssistantMessage(
      `Parabéns, ${lead.name || 'Cliente'}! 🎉 Sua pré-inscrição para o plano **${selectedPlan.name}** está pronta!\n\nAgora você só precisa clicar no botão abaixo para conversar diretamente com o nosso especialista no WhatsApp real e agendar sua instalação gratuita:`,
      'final_summary',
      selectedPlan,
      900
    );
  };

  // Generate WhatsApp Message URL
  const generateWhatsAppUrl = () => {
    const text = `*Olá, vim pelo site da Xpace Fibra e quero contratar um plano!* 🚀

📋 *DADOS DA SOLICITAÇÃO:*
• *Nome:* ${lead.name || 'Não informado'}
• *WhatsApp:* ${lead.whatsapp || 'Não informado'}
• *Endereço:* ${lead.street ? `${lead.street}, Nº ${lead.number || 'S/N'}` : lead.number || 'A confirmar'}
• *Bairro:* ${lead.neighborhood || 'A confirmar'}
• *Cidade/UF:* ${lead.city ? `${lead.city}/${lead.state}` : 'A confirmar'}
• *CEP:* ${lead.cep || 'Não informado'}

⚡ *PLANO SELECIONADO:*
• *Plano:* ${selectedPlan?.name || '500 Mega'}
• *Velocidade:* ${selectedPlan?.speed || '500 Mega'}
• *Valor:* ${selectedPlan?.price || 'R$ 109,90'}/mês
• *Instalação:* Gratuita (Taxa Zero)
• *Equipamento:* ${selectedPlan?.specs.wifiType || 'Wi-Fi 6 Incluso'}

Gostaria de verificar as datas disponíveis para a instalação gratuita!`;

    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  const copyOrderText = () => {
    const text = `*Solicitação Xpace Fibra*\nCliente: ${lead.name}\nWhatsApp: ${lead.whatsapp}\nCEP: ${lead.cep}\nEndereço: ${lead.street}, ${lead.number} - ${lead.neighborhood}, ${lead.city}/${lead.state}\nPlano: ${selectedPlan?.name} (${selectedPlan?.price}/mês)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const restartChat = () => {
    setMessages([]);
    setCurrentStep('welcome');
    setSelectedPlan(null);
    setLead({
      name: '',
      whatsapp: '',
      cep: '',
      street: '',
      neighborhood: '',
      city: '',
      state: '',
      number: '',
    });
    // Trigger welcome
    setTimeout(() => {
      setMessages([
        {
          id: 'msg-welcome-restart',
          sender: 'assistant',
          text: 'Atendimento reiniciado! Olá! 👋 Sou o assistente da Xpace Fibra. Para começar, qual é o seu **Nome Completo**?',
          timestamp: getTimeString(),
          type: 'text',
        },
      ]);
      setCurrentStep('ask_name');
    }, 400);
  };

  return (
    <section id="chat-whatsapp" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Atendimento Inteligente Estilo WhatsApp
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
          Contrate Seu Plano em Poucos Passos
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl mx-auto">
          Consulte viabilidade, compare velocidades de 350 Mega a 1 Giga e seja transferido para o WhatsApp real pronto para instalar.
        </p>
      </div>

      {/* WHATSAPP DARK THEME CONTAINER (Matching user screenshot image_754193e1.png) */}
      <div className="relative rounded-2xl overflow-hidden border border-emerald-900/40 bg-[#0b141a] shadow-2xl shadow-emerald-950/40 flex flex-col h-[750px] max-h-[85vh]">
        
        {/* WhatsApp Top Header Bar */}
        <div className="bg-[#1f2c34] px-4 py-3 border-b border-[#2a3942] flex items-center justify-between text-white select-none z-10 shrink-0">
          <div className="flex items-center gap-3">
            {/* Avatar with circular fiber logo */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-900 border border-emerald-500/40 shrink-0">
              <img
                src={logoImg}
                alt="Xpace Fibra Assistente"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#1f2c34]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm sm:text-base tracking-tight leading-none text-slate-100">
                  Xpace Fibra Atendimento
                </h3>
                <span className="px-1.5 py-0.2 rounded bg-emerald-900/60 text-emerald-300 text-[10px] font-mono-numbers">
                  OFICIAL
                </span>
              </div>
              <p className="text-xs text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                online agora
              </p>
            </div>
          </div>

          {/* Action icons mimicking real WhatsApp */}
          <div className="flex items-center gap-2 sm:gap-3 text-slate-300">
            <button
              onClick={() => {
                soundEffects.enabled = !soundEffects.enabled;
                setSoundEnabled(soundEffects.enabled);
              }}
              title={soundEnabled ? 'Silenciar sons' : 'Ativar sons'}
              className="p-2 hover:bg-[#2a3942] rounded-full transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            <button
              onClick={() => setShowNumberSetting(!showNumberSetting)}
              title="Configurar número comercial do WhatsApp"
              className="p-2 hover:bg-[#2a3942] rounded-full transition-colors text-slate-300"
            >
              <Settings2 className="w-4 h-4" />
            </button>

            <button
              onClick={restartChat}
              title="Reiniciar Atendimento"
              className="p-2 hover:bg-[#2a3942] rounded-full transition-colors text-slate-300"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="hidden sm:flex items-center gap-2 border-l border-[#2a3942] pl-2">
              <span className="p-2 text-slate-400 opacity-60 cursor-not-allowed">
                <Video className="w-4 h-4" />
              </span>
              <span className="p-2 text-slate-400 opacity-60 cursor-not-allowed">
                <Phone className="w-4 h-4" />
              </span>
              <span className="p-2 text-slate-400 opacity-60 cursor-not-allowed">
                <MoreVertical className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Commercial WhatsApp Number Configuration Drawer */}
        {showNumberSetting && (
          <div className="bg-[#111b21] border-b border-[#2a3942] p-3 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2 z-20">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">Número do WhatsApp Comercial:</span>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="Ex: 5511999999999"
                className="bg-[#202c33] text-white px-2 py-1 rounded border border-[#2a3942] text-xs font-mono-numbers focus:outline-none focus:border-emerald-500 w-36"
              />
              <span className="text-[11px] text-slate-400">(com código do país 55 e DDD)</span>
            </div>
            <button
              onClick={() => setShowNumberSetting(false)}
              className="text-xs px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium"
            >
              Salvar
            </button>
          </div>
        )}

        {/* Chat History Pane with WhatsApp dark wallpaper pattern */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-whatsapp-dark space-y-4">
          
          {/* WhatsApp Date Header Pill */}
          <div className="flex justify-center my-2">
            <div className="px-3 py-1 rounded-lg bg-[#182229] border border-[#222e35] text-[11px] text-slate-400 shadow-sm font-medium">
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
          </div>

          {/* Encryption security notice like WhatsApp */}
          <div className="flex justify-center">
            <div className="max-w-md px-3 py-1.5 rounded-lg bg-[#182229]/80 border border-[#222e35]/60 text-[10.5px] text-yellow-300/80 text-center leading-relaxed">
              🔒 As mensagens são protegidas com criptografia de ponta a ponta. Atendimento direto da central Xpace Fibra.
            </div>
          </div>

          {/* Render Messages */}
          {messages.map((msg) => {
            const isMe = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} transition-opacity duration-300`}
              >
                <div
                  className={`relative max-w-[88%] sm:max-w-[75%] rounded-2xl p-3.5 shadow-md text-sm leading-relaxed ${
                    isMe
                      ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-xs'
                      : 'bg-[#202c33] text-[#d1d7db] rounded-tl-xs border border-[#2a3942]/40'
                  }`}
                >
                  {/* Text content with markdown formatting */}
                  <div className="whitespace-pre-wrap">
                    {msg.text.split('\n').map((line, i) => {
                      // Highlight bold markers **text**
                      const parts = line.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p key={i} className={i > 0 ? 'mt-1.5' : ''}>
                          {parts.map((part, pIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return (
                                <strong key={pIdx} className="font-semibold text-white">
                                  {part.slice(2, -2)}
                                </strong>
                              );
                            }
                            return part;
                          })}
                        </p>
                      );
                    })}
                  </div>

                  {/* 1. Interactive Plan Selection Cards Inside Bubble */}
                  {msg.type === 'plan_selection' && (
                    <div className="mt-4 space-y-2 pt-2 border-t border-[#2a3942]">
                      <p className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-2">
                        Selecione o plano desejado:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {FIBER_PLANS.map((plan) => (
                          <button
                            key={plan.id}
                            onClick={() => handlePlanSelection(plan)}
                            className="text-left p-3 rounded-xl bg-[#111b21] hover:bg-[#182229] border border-[#2a3942] hover:border-emerald-500/60 transition-all group flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">
                                {plan.speed}
                              </span>
                              {plan.badge && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 font-semibold">
                                  {plan.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-mono-numbers text-emerald-400 font-semibold mt-1">
                              {plan.price}<span className="text-[10px] text-slate-400 font-normal">/mês</span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                              {plan.idealFor}
                            </div>
                            <div className="mt-2 text-[11px] text-cyan-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              <span>Ver benefícios</span>
                              <ArrowRight className="w-3 h-3" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2. Interactive Detailed Plan Summary & Benefits Inside Bubble */}
                  {msg.type === 'plan_details' && msg.planSelected && (
                    <div className="mt-4 pt-3 border-t border-[#2a3942] space-y-3">
                      {/* Price header */}
                      <div className="p-3 rounded-xl bg-[#111b21] border border-cyan-500/30 flex items-center justify-between">
                        <div>
                          <div className="text-xs text-slate-400">Plano Selecionado</div>
                          <div className="text-base font-extrabold text-white">
                            {msg.planSelected.name}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-emerald-400 font-mono-numbers">
                            {msg.planSelected.price}
                          </div>
                          <div className="text-[10px] text-slate-400">mensal s/ pegadinhas</div>
                        </div>
                      </div>

                      {/* O QUE VOCÊ PODE FAZER COM ESSA VELOCIDADE */}
                      <div className="p-3 rounded-xl bg-[#182229]/90 border border-[#2a3942]">
                        <h5 className="text-xs font-bold text-cyan-300 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                          <Zap className="w-3.5 h-3.5 text-cyan-400" />
                          O que você pode fazer com {msg.planSelected.speed}:
                        </h5>
                        <ul className="space-y-1.5 text-xs text-slate-200">
                          {msg.planSelected.whatYouCanDo.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-cyan-400 text-xs mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* BENEFÍCIOS INCLUSOS */}
                      <div className="p-3 rounded-xl bg-[#182229]/90 border border-emerald-900/40">
                        <h5 className="text-xs font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          Benefícios Xpace Inclusos:
                        </h5>
                        <ul className="space-y-1.5 text-xs text-slate-200">
                          {msg.planSelected.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technical Specs Strip */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-lg bg-[#111b21] text-slate-300 font-mono-numbers">
                        <div>
                          <span className="text-slate-500">Download: </span>
                          <span className="text-white font-semibold">{msg.planSelected.specs.download}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Upload: </span>
                          <span className="text-white font-semibold">{msg.planSelected.specs.upload}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Latência: </span>
                          <span className="text-emerald-400 font-semibold">{msg.planSelected.specs.latency}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Wi-Fi: </span>
                          <span className="text-cyan-300 font-semibold">{msg.planSelected.specs.wifiType}</span>
                        </div>
                      </div>

                      {/* Action buttons inside bubble */}
                      <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                        <button
                          onClick={handleConfirmPlan}
                          className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-950/60 transition-transform active:scale-95"
                        >
                          <Check className="w-4 h-4" />
                          <span>Confirmar este Plano</span>
                        </button>

                        <button
                          onClick={() => {
                            addAssistantMessage(
                              'Qual outro plano você gostaria de comparar?',
                              'plan_selection',
                              undefined,
                              400
                            );
                          }}
                          className="w-full sm:w-auto py-2.5 px-3 rounded-xl bg-[#111b21] hover:bg-[#182229] border border-[#2a3942] text-slate-300 hover:text-white text-xs font-medium"
                        >
                          Comparar Outro
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 3. Final Summary & WhatsApp Official Redirect Button */}
                  {msg.type === 'final_summary' && msg.planSelected && (
                    <div className="mt-4 pt-3 border-t border-[#2a3942] space-y-3">
                      
                      {/* Ticket Summary Card */}
                      <div className="p-3.5 rounded-xl bg-[#111b21] border border-emerald-500/40 text-xs space-y-2">
                        <div className="flex items-center justify-between border-b border-[#2a3942] pb-2">
                          <span className="font-bold text-emerald-400">RESUMO DA SOLICITAÇÃO</span>
                          <span className="font-mono-numbers text-[10px] text-slate-400">
                            PEDIDO #{Math.floor(100000 + Math.random() * 900000)}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                          <div>
                            <span className="text-slate-500">Titular: </span>
                            <span className="text-white font-medium">{lead.name || 'Cliente'}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">WhatsApp: </span>
                            <span className="text-white font-medium">{lead.whatsapp || 'Informado'}</span>
                          </div>
                          <div className="sm:col-span-2">
                            <span className="text-slate-500">Endereço: </span>
                            <span className="text-white font-medium">
                              {lead.street ? `${lead.street}, Nº ${lead.number}` : lead.number} - CEP: {lead.cep}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500">Plano Escolhido: </span>
                            <span className="text-cyan-300 font-bold">{msg.planSelected.speed}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Mensalidade: </span>
                            <span className="text-emerald-400 font-bold">{msg.planSelected.price}/mês</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Taxa de Instalação: </span>
                            <span className="text-emerald-400 font-bold">GRÁTIS (R$ 0,00)</span>
                          </div>
                        </div>
                      </div>

                      {/* BIG OFFICIAL REAL WHATSAPP BUTTON */}
                      <div className="pt-2">
                        <a
                          href={generateWhatsAppUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 hover:from-emerald-500 hover:to-green-400 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/60 transform hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
                        >
                          {/* WhatsApp vector icon */}
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8 2.53 1.09 2.53.73 2.98.69.45-.04 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29" />
                          </svg>
                          <span>ABRIR NO WHATSAPP REAL DO ASSISTENTE</span>
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>

                        <div className="flex items-center justify-between gap-3 mt-2 text-[11px] text-slate-400">
                          <button
                            onClick={copyOrderText}
                            className="flex items-center gap-1 hover:text-white transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{copied ? 'Copiado!' : 'Copiar dados do pedido'}</span>
                          </button>
                          <span>Transmissão Direta</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Timestamp & Double Blue Checks */}
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400 select-none">
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 rounded-2xl rounded-tl-xs bg-[#202c33] border border-[#2a3942]/40 text-slate-400 w-24">
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips Bar based on current state */}
        <div className="px-3 py-2 bg-[#111b21] border-t border-[#2a3942] flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <span className="text-[11px] text-slate-500 whitespace-nowrap">Respostas rápidas:</span>
          {currentStep === 'ask_name' && (
            <>
              <button
                onClick={() => handleSendMessage('Carlos Eduardo Silva')}
                className="px-2.5 py-1 rounded-full bg-[#202c33] hover:bg-[#2a3942] text-slate-300 border border-[#2a3942] whitespace-nowrap"
              >
                Carlos Eduardo Silva
              </button>
              <button
                onClick={() => handleSendMessage('Mariana Santos')}
                className="px-2.5 py-1 rounded-full bg-[#202c33] hover:bg-[#2a3942] text-slate-300 border border-[#2a3942] whitespace-nowrap"
              >
                Mariana Santos
              </button>
            </>
          )}

          {currentStep === 'ask_phone' && (
            <>
              <button
                onClick={() => handleSendMessage('(11) 98765-4321')}
                className="px-2.5 py-1 rounded-full bg-[#202c33] hover:bg-[#2a3942] text-slate-300 border border-[#2a3942] whitespace-nowrap"
              >
                (11) 98765-4321
              </button>
            </>
          )}

          {currentStep === 'ask_cep' && (
            <>
              <button
                onClick={() => handleSendMessage('01310-100')}
                className="px-2.5 py-1 rounded-full bg-[#202c33] hover:bg-[#2a3942] text-slate-300 border border-[#2a3942] whitespace-nowrap flex items-center gap-1"
              >
                <MapPin className="w-3 h-3 text-cyan-400" />
                Exemplo CEP: 01310-100 (Av. Paulista)
              </button>
            </>
          )}

          {currentStep === 'ask_number' && (
            <>
              <button
                onClick={() => handleSendMessage('Número 125, Bloco B, Apto 42')}
                className="px-2.5 py-1 rounded-full bg-[#202c33] hover:bg-[#2a3942] text-slate-300 border border-[#2a3942] whitespace-nowrap"
              >
                Nº 125, Bloco B, Apto 42
              </button>
              <button
                onClick={() => handleSendMessage('Casa 450')}
                className="px-2.5 py-1 rounded-full bg-[#202c33] hover:bg-[#2a3942] text-slate-300 border border-[#2a3942] whitespace-nowrap"
              >
                Casa 450
              </button>
            </>
          )}

          {(currentStep === 'choose_plan' || currentStep === 'plan_details' || currentStep === 'completed') && (
            <>
              {FIBER_PLANS.map(p => (
                <button
                  key={p.id}
                  onClick={() => handlePlanSelection(p)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedPlan?.id === p.id
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-[#202c33] hover:bg-[#2a3942] text-slate-300 border border-[#2a3942]'
                  }`}
                >
                  {p.speed}
                </button>
              ))}
            </>
          )}
        </div>

        {/* WhatsApp Bottom Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="bg-[#202c33] px-3 sm:px-4 py-2.5 border-t border-[#2a3942] flex items-center gap-2 sm:gap-3 shrink-0"
        >
          {/* Emoji icon */}
          <button
            type="button"
            className="text-slate-400 hover:text-slate-200 transition-colors p-1"
          >
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                currentStep === 'ask_name'
                  ? 'Digite seu nome completo...'
                  : currentStep === 'ask_phone'
                  ? 'Digite seu WhatsApp com DDD...'
                  : currentStep === 'ask_cep'
                  ? 'Digite seu CEP (ex: 01310-100)...'
                  : currentStep === 'ask_number'
                  ? 'Digite o número da sua residência...'
                  : 'Digite sua mensagem ou escolha um plano...'
              }
              className="w-full bg-[#2a3942] text-white placeholder-slate-400 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all border border-transparent focus:border-emerald-500"
            />
            {isLoadingCep && (
              <span className="absolute right-3 top-2.5 text-xs text-cyan-400 animate-pulse">
                Buscando CEP...
              </span>
            )}
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() && !isTyping}
            className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white flex items-center justify-center transition-transform active:scale-90 shrink-0 shadow-md shadow-emerald-950/60"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>

      </div>
    </section>
  );
};
