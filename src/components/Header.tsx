import { Film, Lightbulb, Zap, Check, Copy, Monitor, Layout, Sparkles, RotateCcw, BookOpen, Sliders } from 'lucide-react';
import { ShotMode, Theme } from '../types';

interface HeaderProps {
  mode: ShotMode;
  setMode: (mode: ShotMode) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  copyToClipboard: () => void;
  handleReset: () => void;
  copied: boolean;
  themeClasses: any;
  currentTab: 'builder' | 'library';
  setCurrentTab: (tab: 'builder' | 'library') => void;
}

export function Header({ 
  mode, 
  setMode, 
  theme, 
  setTheme, 
  copyToClipboard, 
  handleReset,
  copied, 
  themeClasses,
  currentTab,
  setCurrentTab
}: HeaderProps) {
  return (
    <header className={`border-b backdrop-blur-xl sticky top-0 z-50 transition-colors duration-500 ${themeClasses.header}`}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <img 
              src={theme === 'dark' ? '/logotipo negativo.png' : '/logotipo.png'} 
              alt="ShotCraft Logo" 
              className="h-12 w-auto object-contain cursor-pointer"
              onClick={() => setCurrentTab('builder')}
            />
          </div>

          <nav className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-2xl border border-black/5 dark:border-white/5">
            <button
              onClick={() => setCurrentTab('builder')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                currentTab === 'builder'
                  ? theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-[#8b5a2b] text-white'
                  : theme === 'dark'
                  ? 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                  : 'text-[#8b7e6a] hover:text-[#433422] hover:bg-black/5'
              }`}
            >
              <Sliders size={13} />
              Simulador
            </button>
            <button
              onClick={() => setCurrentTab('library')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                currentTab === 'library'
                  ? theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-[#8b5a2b] text-white'
                  : theme === 'dark'
                  ? 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                  : 'text-[#8b7e6a] hover:text-[#433422] hover:bg-black/5'
              }`}
            >
              <BookOpen size={13} />
              Biblioteca
            </button>
          </nav>
        </div>

        <div className="hidden md:flex bg-black/10 p-1 rounded-full border border-black/5">
          {(['storyboard', 'cinematic', 'illustration'] as ShotMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                mode === m 
                  ? theme === 'dark' ? 'bg-zinc-100 text-zinc-900' : 'bg-[#8b5a2b] text-white' 
                  : theme === 'dark'
                  ? 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                  : 'text-[#8b7e6a] hover:text-[#433422] hover:bg-black/5'
              }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
           <button 
              onClick={handleReset}
              className={`p-2 rounded-lg border transition-all hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 ${themeClasses.card} ${themeClasses.textMuted}`}
              title="Resetar Tudo"
           >
              <RotateCcw size={20} />
           </button>
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
