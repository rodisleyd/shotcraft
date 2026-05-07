/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Film, Lightbulb, Zap, Check, Copy, Monitor, Layout, Sparkles } from 'lucide-react';
import { ShotMode, Theme } from '../types';

interface HeaderProps {
  mode: ShotMode;
  setMode: (mode: ShotMode) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  copyToClipboard: () => void;
  copied: boolean;
  themeClasses: any;
}

export function Header({ 
  mode, 
  setMode, 
  theme, 
  setTheme, 
  copyToClipboard, 
  copied, 
  themeClasses 
}: HeaderProps) {
  return (
    <header className={`border-b backdrop-blur-xl sticky top-0 z-50 transition-colors duration-500 ${themeClasses.header}`}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={theme === 'dark' ? '/logotipo negativo.png' : '/logotipo.png'} 
            alt="ShotCraft Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>

        <div className="hidden md:flex bg-black/10 p-1 rounded-full border border-black/5">
          {(['storyboard', 'cinematic', 'illustration'] as ShotMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                mode === m 
                  ? theme === 'dark' ? 'bg-zinc-100 text-zinc-900' : 'bg-[#8b5a2b] text-white' 
                  : themeClasses.textMuted + ' hover:text-black/80'
              }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
           <button 
              onClick={() => setTheme(theme === 'dark' ? 'sepia' : 'dark')}
              className={`p-2 rounded-lg border transition-all ${themeClasses.card} ${themeClasses.textMuted}`}
              title="Alternar Tema"
           >
              {theme === 'dark' ? <Lightbulb size={20} /> : <Zap size={20} />}
           </button>
           <button 
              onClick={copyToClipboard}
              className={`flex items-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg active:scale-95 ${themeClasses.accent}`}
           >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span className="hidden sm:inline">{copied ? 'Copiado' : 'Copiar Prompt'}</span>
           </button>
        </div>
      </div>
    </header>
  );
}
