import { Film, Lightbulb, Zap, Check, Copy, Monitor, Layout, Sparkles, RotateCcw, BookOpen, Sliders, LogOut, ShieldAlert, Coins, Image as ImageIcon } from 'lucide-react';
import { ShotMode, Theme, UserAccount } from '../types';

interface HeaderProps {
  mode: ShotMode;
  setMode: (mode: ShotMode) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  copyToClipboard: () => void;
  handleReset: () => void;
  copied: boolean;
  themeClasses: any;
  currentTab: 'builder' | 'library' | 'gallery';
  setCurrentTab: (tab: 'builder' | 'library' | 'gallery') => void;
  user: UserAccount | null;
  onLogout: () => void;
  onAdminClick: () => void;
  onBuyCreditsClick: () => void;
  currentPage: string;
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
  setCurrentTab,
  user,
  onLogout,
  onAdminClick,
  onBuyCreditsClick,
  currentPage
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

          {currentPage === 'app' && (
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
                onClick={() => setCurrentTab('gallery')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  currentTab === 'gallery'
                    ? theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-[#8b5a2b] text-white'
                    : theme === 'dark'
                    ? 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                    : 'text-[#8b7e6a] hover:text-[#433422] hover:bg-black/5'
                }`}
              >
                <ImageIcon size={13} />
                Galeria
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
          )}
        </div>

        {currentPage === 'app' && (
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
        )}

        <div className="flex items-center gap-2">
          {/* Sessão do Usuário (Créditos, Compra Pix, Painel Admin, Logout) */}
          {user && (
            <div className="flex items-center gap-2 mr-2">
              {/* Créditos */}
              <div 
                onClick={onBuyCreditsClick}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-all ${
                  theme === 'dark' 
                    ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-indigo-400' 
                    : 'bg-white border-[#d3cbb3] hover:bg-zinc-50 text-[#8b5a2b]'
                }`}
                title="Comprar mais créditos via Pix"
              >
                <Coins size={14} className="text-amber-500" />
                <span>{user.isAdmin ? 'Créditos: ∞' : `Créditos: ${user.credits}`}</span>
              </div>

              {/* Botão de Admin */}
              {user.isAdmin && (
                <button
                  onClick={onAdminClick}
                  className={`p-2 rounded-lg border flex items-center justify-center gap-1.5 text-xs font-bold transition-all ${
                    currentPage === 'admin'
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : theme === 'dark'
                      ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-indigo-400'
                      : 'bg-white border-[#d3cbb3] hover:bg-zinc-50 text-[#8b5a2b]'
                  }`}
                  title="Acessar painel de administração"
                >
                  <ShieldAlert size={16} className="text-indigo-400" />
                  <span className="hidden sm:inline">Admin</span>
                </button>
              )}

              {/* Logout */}
              <button
                onClick={onLogout}
                className={`p-2 rounded-lg border transition-all hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-500 ${
                  theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-white border-[#d3cbb3] text-[#8b7e6a]'
                }`}
                title="Fazer Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}

          {currentPage === 'app' && (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
}
