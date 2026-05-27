/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Key, ArrowRight, ArrowLeft, Chrome, Sparkles } from 'lucide-react';
import { Theme } from '../types';
import { dataService } from '../services/dataService';

interface AuthPageProps {
  onBack: () => void;
  onSuccess: (email: string) => void;
  theme: Theme;
  themeClasses: any;
  addToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export function AuthPage({ onBack, onSuccess, theme, themeClasses, addToast }: AuthPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !email.includes('@')) {
      addToast('Por favor, insira um e-mail válido.', 'error');
      return;
    }

    if (isRegister) {
      // Registra no banco de dados simulado
      const user = dataService.register(email.trim());
      addToast(`Conta criada com sucesso! 30 créditos adicionados.`, 'success');
      onSuccess(user.email);
    } else {
      // Login simulado
      const user = dataService.login(email.trim());
      if (user) {
        addToast(`Bem-vindo de volta!`, 'success');
        onSuccess(user.email);
      } else {
        // Se não existir, registra automaticamente para simplificar a demo de teste de usuário
        const newUser = dataService.register(email.trim());
        addToast(`Conta não encontrada. Criamos uma conta grátis com 30 créditos para você!`, 'success');
        onSuccess(newUser.email);
      }
    }
  };

  const handleGoogleLogin = () => {
    const mockGoogleEmail = isRegister ? "user.tester@gmail.com" : "designer.creative@gmail.com";
    const user = dataService.register(mockGoogleEmail);
    addToast('Login simulado via conta Google concluído!', 'success');
    onSuccess(user.email);
  };

  return (
    <div className={`min-h-screen grid grid-cols-1 lg:grid-cols-2 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-[#f4efe1] text-[#433422]'
    }`}>
      {/* Lado Esquerdo: Formulário */}
      <div className="flex flex-col justify-between p-8 sm:p-12 md:p-20 relative">
        <button 
          onClick={onBack}
          className={`self-start flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-8 transition-colors ${
            theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-[#8b7e6a] hover:text-[#433422]'
          }`}
        >
          <ArrowLeft size={14} /> Voltar à página inicial
        </button>

        <div className="max-w-md w-full mx-auto my-auto space-y-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-2">
              {isRegister ? 'Crie sua conta' : 'Acesse o Simulador'}
            </h2>
            <p className={`text-xs ${themeClasses.textMuted}`}>
              {isRegister 
                ? 'Comece agora seu trial gratuito de 7 dias com 30 créditos.' 
                : 'Insira suas credenciais para gerenciar seus prompts.'}
            </p>
          </div>

          {/* Login Social Simulado */}
          <button 
            type="button"
            onClick={handleGoogleLogin}
            className={`w-full py-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-3 transition-all ${
              theme === 'dark' 
                ? 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 text-zinc-100' 
                : 'border-[#d3cbb3] bg-white/40 hover:bg-white/85 text-[#433422]'
            }`}
          >
            <Chrome size={16} className="text-indigo-400" />
            {isRegister ? 'Cadastrar com o Google' : 'Entrar com o Google'}
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-black/5 dark:bg-white/5" />
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">ou use e-mail</span>
            <div className="flex-1 h-px bg-black/5 dark:bg-white/5" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase tracking-wider opacity-60">Endereço de E-mail</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-400">
                  <Mail size={16} />
                </span>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu-email@exemplo.com"
                  className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border outline-none text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all ${themeClasses.input}`}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase tracking-wider opacity-60">Senha</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-400">
                  <Key size={16} />
                </span>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                  className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border outline-none text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all ${themeClasses.input}`}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-bold">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="rounded border-zinc-700 bg-zinc-900" />
                <label htmlFor="remember" className="opacity-60 cursor-pointer">Lembrar-me</label>
              </div>
              <button type="button" className="text-indigo-400 hover:underline">Esqueceu a senha?</button>
            </div>

            <button 
              type="submit"
              className={`w-full py-4 text-xs font-black uppercase tracking-wider text-white rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${themeClasses.accent}`}
            >
              {isRegister ? 'Criar Conta Gratuita' : 'Entrar na Plataforma'} <ArrowRight size={14} />
            </button>
          </form>

          <p className="text-center text-xs opacity-60">
            {isRegister ? 'Já possui conta? ' : 'Não possui conta? '}
            <button 
              type="button" 
              onClick={() => setIsRegister(!isRegister)}
              className="text-indigo-400 font-bold hover:underline"
            >
              {isRegister ? 'Fazer login' : 'Cadastre-se grátis'}
            </button>
          </p>

          <div className="mt-8 p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl text-[10px] leading-relaxed text-indigo-400">
            💡 **Dica de demonstração**: Use o e-mail `admin@shotcraft.com` (qualquer senha) para acessar diretamente o Dashboard do Administrador.
          </div>
        </div>

        <div className="text-[10px] opacity-40 text-center mt-8">
          ShotCraft &copy; 2026. Segurança e simplicidade garantidas.
        </div>
      </div>

      {/* Lado Direito: Ilustrativo / Branding */}
      <div className="hidden lg:flex flex-col justify-between p-20 relative overflow-hidden border-l border-white/5">
        {/* Imagem de Fundo Cinematográfica */}
        <img 
          src="/images/auth-backdrop.png" 
          alt="Auth Backdrop" 
          className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none" 
        />
        {/* Overlay Escuro com Gradiente para legibilidade e contraste das letras brancas */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-zinc-950/30 z-0 pointer-events-none" />
        
        <div className="relative z-10 flex items-center">
          <img 
            src="/logotipo negativo.png" 
            alt="ShotCraft Logo" 
            className="h-10 w-auto object-contain opacity-90"
          />
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <blockquote className="text-3xl font-light italic leading-tight text-zinc-100">
            "A ShotCraft transformou totalmente o meu fluxo de trabalho no Midjourney e Nano Banana. O simulador de lentes e paletas economiza horas de teste."
          </blockquote>
          <div>
            <div className="font-bold text-white text-sm">Felipe Kenji</div>
            <div className="text-xs text-zinc-400">Concept Artist & Diretor de Arte</div>
          </div>
        </div>

        <div className="relative z-10 flex gap-12 text-[10px] font-bold text-zinc-500">
          <div>
            <div className="text-white text-lg font-black">+50.000</div>
            <div>Prompts Gerados</div>
          </div>
          <div>
            <div className="text-white text-lg font-black">99.8%</div>
            <div>Precisão Artística</div>
          </div>
          <div>
            <div className="text-white text-lg font-black">4.9/5</div>
            <div>Avaliação dos Diretores</div>
          </div>
        </div>
      </div>
    </div>
  );
}
