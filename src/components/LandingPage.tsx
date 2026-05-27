/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sparkles, Sliders, ShieldCheck, Zap, Library, CheckCircle2, ChevronRight, HelpCircle, Coins } from 'lucide-react';
import { Theme } from '../types';

interface LandingPageProps {
  onStart: () => void;
  onLoginClick: () => void;
  theme: Theme;
  themeClasses: any;
}

export function LandingPage({ onStart, onLoginClick, theme, themeClasses }: LandingPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Como funciona o sistema de créditos?",
      a: "No cadastro, você recebe 30 créditos grátis e 7 dias de trial. Cada prompt gerado e copiado ou salvo consome 1 crédito. Quando acabarem, você pode comprar novos pacotes avulsos via Pix na hora."
    },
    {
      q: "Preciso cadastrar cartão de crédito para testar?",
      a: "Não! O teste é 100% gratuito e não exige nenhuma informação de pagamento. Você só paga se optar por comprar mais créditos depois."
    },
    {
      q: "Os prompts gerados são meus?",
      a: "Sim, os prompts gerados são inteiramente seus e você pode usá-los em qualquer gerador de imagens por IA, como Midjourney, Stable Diffusion ou DALL-E."
    },
    {
      q: "O que acontece se meu trial de 7 dias expirar?",
      a: "Você não perderá seus presets ou histórico, mas para continuar gerando novos prompts técnicos precisará adquirir qualquer pacote de créditos via Pix."
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100' 
        : 'bg-gradient-to-b from-[#f8f5eb] via-[#f4efe1] to-[#f8f5eb] text-[#433422]'
    }`}>
      {/* Navbar Minimalista */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-black/5 dark:border-white/5">
        <div className="flex items-center">
          <img 
            src={theme === 'dark' ? '/logotipo negativo.png' : '/logotipo.png'} 
            alt="ShotCraft Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onLoginClick}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
              theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-[#8b7e6a] hover:text-[#433422]'
            }`}
          >
            Entrar
          </button>
          <button 
            onClick={onStart}
            className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white rounded-xl shadow-lg transition-all active:scale-95 ${themeClasses.accent}`}
          >
            Começar Grátis
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 text-center relative">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-bold mb-8 animate-pulse">
          <Sparkles size={14} /> O Simulador Definitivo de Direção de Arte
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6">
          Crie Prompts de Imagem <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-500 bg-clip-text text-transparent">
            Cinematográficos e Profissionais
          </span>
        </h1>
        
        <p className={`text-base sm:text-lg max-w-2xl mx-auto mb-10 ${theme === 'dark' ? 'text-zinc-400' : 'text-[#8b7e6a]'}`}>
          Chega de adivinhar parâmetros. Configure enquadramentos, ângulos de câmera, lentes, iluminações e paletas de cores usando um simulador interativo de alto padrão.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button 
            onClick={onStart}
            className={`w-full sm:w-auto px-8 py-4 text-sm font-black uppercase tracking-wider text-white rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${themeClasses.accent}`}
          >
            Acessar o Simulador <ChevronRight size={18} />
          </button>
          <button 
            onClick={onLoginClick}
            className={`w-full sm:w-auto px-8 py-4 text-sm font-black uppercase tracking-wider rounded-2xl border transition-all ${
              theme === 'dark' 
                ? 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 text-zinc-100' 
                : 'border-[#d3cbb3] bg-white/40 hover:bg-white/80 text-[#433422]'
            }`}
          >
            Fazer Login
          </button>
        </div>

        {/* Mockup da Interface */}
        <div className={`relative max-w-5xl mx-auto rounded-3xl overflow-hidden border shadow-2xl p-2 ${
          theme === 'dark' ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white/80 border-[#d3cbb3]'
        }`}>
          <div className="flex items-center gap-1.5 px-4 py-2 border-b border-black/5 dark:border-white/5 text-zinc-500">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-[10px] ml-4 font-mono">shotcraft.app/simulator</span>
          </div>
          <video 
            src="/videos/preview.mp4" 
            poster="/images/enquadramentos/establishing-shot.png"
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-auto rounded-2xl object-cover aspect-[21/9] brightness-90 group-hover:brightness-100 transition-all"
          />
        </div>
      </section>

      {/* Seção de Recursos (Grid) */}
      <section className={`py-20 border-y ${theme === 'dark' ? 'border-zinc-900 bg-zinc-950/40' : 'border-[#d3cbb3] bg-white/30'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center mb-12">Como a ShotCraft ajuda você:</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 ${themeClasses.card}`}>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 border border-indigo-500/20">
                <Sliders size={22} />
              </div>
              <h3 className="text-lg font-bold mb-3">Direção Técnica Simplificada</h3>
              <p className={`text-sm leading-relaxed ${themeClasses.textMuted}`}>
                Selecione as opções de câmera e enquadramento visualizando exemplos reais no simulador em tempo real.
              </p>
            </div>

            <div className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 ${themeClasses.card}`}>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 border border-amber-500/20">
                <Sparkles size={22} />
              </div>
              <h3 className="text-lg font-bold mb-3">IA Analisadora</h3>
              <p className={`text-sm leading-relaxed ${themeClasses.textMuted}`}>
                Envie uma imagem de referência e nossa inteligência artificial decifra e configura todos os parâmetros técnicos correspondentes instantaneamente.
              </p>
            </div>

            <div className={`p-8 rounded-3xl border transition-all hover:-translate-y-1 ${themeClasses.card}`}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/20">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-lg font-bold mb-3">Presets & Histórico</h3>
              <p className={`text-sm leading-relaxed ${themeClasses.textMuted}`}>
                Salve suas combinações favoritas em um clique para usá-las novamente e acompanhe seu histórico completo de prompts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Preços (Pacotes de Créditos via Pix) */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-black text-center mb-2">Compre apenas o que precisar</h2>
        <p className={`text-center text-sm max-w-lg mx-auto mb-16 ${themeClasses.textMuted}`}>
          Sem assinaturas mensais. Pague de forma fácil via Pix e use quando quiser.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Card Trial */}
          <div className={`p-8 rounded-3xl border flex flex-col justify-between relative ${themeClasses.card}`}>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block mb-2">Período de Testes</span>
              <h3 className="text-xl font-bold mb-4">Trial Gratuito</h3>
              <div className="text-3xl font-black mb-6">Grátis</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-xs">
                  <CheckCircle2 size={14} className="text-emerald-500" /> 30 Créditos Iniciais
                </li>
                <li className="flex items-center gap-2 text-xs">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Acesso total ao simulador
                </li>
                <li className="flex items-center gap-2 text-xs">
                  <CheckCircle2 size={14} className="text-emerald-500" /> 7 dias de validade
                </li>
              </ul>
            </div>
            <button 
              onClick={onStart}
              className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-[#d3cbb3] hover:bg-black/5'
              }`}
            >
              Criar Conta Grátis
            </button>
          </div>

          {/* Card Popular (Créditos Intermediário) */}
          <div className={`p-8 rounded-3xl border flex flex-col justify-between relative ${
            theme === 'dark' 
              ? 'bg-zinc-900/90 border-indigo-500/50 shadow-indigo-500/5 shadow-2xl' 
              : 'bg-white border-[#8b5a2b] shadow-2xl'
          }`}>
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[9px] font-black uppercase tracking-widest shadow-md">
              Mais Vendido
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block mb-2">Pacote Intermediário</span>
              <h3 className="text-xl font-bold mb-4">300 Créditos</h3>
              <div className="text-3xl font-black mb-1">R$ 19,90</div>
              <span className="text-[10px] opacity-60 block mb-6">Apenas R$ 0,06 por geração</span>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-xs">
                  <CheckCircle2 size={14} className="text-indigo-400" /> 300 gerações de prompts
                </li>
                <li className="flex items-center gap-2 text-xs">
                  <CheckCircle2 size={14} className="text-indigo-400" /> Liberação via Pix na hora
                </li>
                <li className="flex items-center gap-2 text-xs">
                  <CheckCircle2 size={14} className="text-indigo-400" /> Sem data de expiração
                </li>
              </ul>
            </div>
            <button 
              onClick={onStart}
              className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 ${themeClasses.accent}`}
            >
              <Coins size={14} /> Comprar no App
            </button>
          </div>

          {/* Card Iniciante */}
          <div className={`p-8 rounded-3xl border flex flex-col justify-between relative ${themeClasses.card}`}>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Pacote Básico</span>
              <h3 className="text-xl font-bold mb-4">100 Créditos</h3>
              <div className="text-3xl font-black mb-1">R$ 9,90</div>
              <span className="text-[10px] opacity-60 block mb-6">Apenas R$ 0,09 por geração</span>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-xs">
                  <CheckCircle2 size={14} className="text-zinc-400" /> 100 gerações de prompts
                </li>
                <li className="flex items-center gap-2 text-xs">
                  <CheckCircle2 size={14} className="text-zinc-400" /> Liberação via Pix na hora
                </li>
                <li className="flex items-center gap-2 text-xs">
                  <CheckCircle2 size={14} className="text-zinc-400" /> Sem data de expiração
                </li>
              </ul>
            </div>
            <button 
              onClick={onStart}
              className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-[#d3cbb3] hover:bg-black/5'
              }`}
            >
              Comprar no App
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-20 border-t ${theme === 'dark' ? 'border-zinc-900 bg-zinc-950/20' : 'border-[#d3cbb3] bg-white/20'}`}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center mb-12">Perguntas Frequentes</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border rounded-2xl overflow-hidden transition-all ${
                  theme === 'dark' ? 'border-zinc-800 bg-zinc-900/20' : 'border-[#d3cbb3] bg-white/50'
                }`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle size={16} className="text-indigo-400" />
                    {faq.q}
                  </span>
                  <span className="text-zinc-400">{activeFaq === index ? '−' : '+'}</span>
                </button>
                {activeFaq === index && (
                  <div className={`px-6 pb-6 pt-1 text-xs leading-relaxed ${themeClasses.textMuted}`}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-black/5 dark:border-white/5 text-center text-xs opacity-60">
        ShotCraft &copy; 2026 &bull; O simulador definitivo para Prompt Engineers.
      </footer>
    </div>
  );
}
