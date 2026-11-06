import React from 'react';
import { ShieldCheck, PhoneCall, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#04070d] border-t border-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Col 1: Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-display font-extrabold text-base tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>XPACE FIBRA</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            Provedor de internet 100% fibra óptica dedicada. Conectividade ultrarrápida, equipamentos Wi-Fi 6 e estabilidade máxima residencial e empresarial.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Autorizada Anatel • Redes Homologadas</span>
          </div>
        </div>

        {/* Col 2: Planos */}
        <div>
          <h4 className="font-semibold text-white uppercase tracking-wider text-xs mb-3">
            Planos Disponíveis
          </h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#planos" className="hover:text-cyan-400 transition-colors">Plano 350 Mega Start</a></li>
            <li><a href="#planos" className="hover:text-cyan-400 transition-colors">Plano 500 Mega Ultra</a></li>
            <li><a href="#planos" className="hover:text-cyan-400 transition-colors">Plano 800 Mega Gamer Pro</a></li>
            <li><a href="#planos" className="hover:text-cyan-400 transition-colors">Plano 1 Giga Max Extreme</a></li>
          </ul>
        </div>

        {/* Col 3: Links */}
        <div>
          <h4 className="font-semibold text-white uppercase tracking-wider text-xs mb-3">
            Navegação Rápida
          </h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#cenarios" className="hover:text-cyan-400 transition-colors">Cenários de Uso & Mosaico</a></li>
            <li><a href="#chat-whatsapp" className="hover:text-cyan-400 transition-colors">Atendimento WhatsApp</a></li>
            <li><a href="#calculadora" className="hover:text-cyan-400 transition-colors">Simulador de Velocidade</a></li>
            <li><a href="#cobertura" className="hover:text-cyan-400 transition-colors">Consulta de Viabilidade</a></li>
          </ul>
        </div>

        {/* Col 4: Central de Atendimento */}
        <div>
          <h4 className="font-semibold text-white uppercase tracking-wider text-xs mb-3">
            Central de Atendimento
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              <span>SAC: 0800 720 9000 (24 horas)</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>contato@xpacefibra.com.br</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>Atendimento em toda a região metropolitana</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>
          © {new Date().getFullYear()} Xpace Fibra Telecomunicações Ltda. CNPJ 00.000.000/0001-00. Todos os direitos reservados.
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-400 transition-colors">Termos de Adesão</a>
          <span>·</span>
          <a href="#" className="hover:text-slate-400 transition-colors">Política de Privacidade</a>
          <span>·</span>
          <a href="#" className="hover:text-slate-400 transition-colors">Contrato de Prestação SCM</a>
        </div>
      </div>
    </footer>
  );
};
