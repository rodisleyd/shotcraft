/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Copy, 
  Check, 
  Sparkles, 
  Save, 
  X, 
  Lock, 
  Globe, 
  Compass, 
  Bot, 
  Zap, 
  Cpu, 
  Palette, 
  Type,
  Info,
  SlidersHorizontal
} from 'lucide-react';
import { CharacterLockState, TargetPlatform } from '../types';
import { TARGET_PLATFORMS, FormattedPromptOutput } from '../services/platformPromptService';

interface PromptPreviewProps {
  finalPrompt: string;
  copyToClipboard: () => void;
  copied: boolean;
  isSaving: boolean;
  setIsSaving: (val: boolean) => void;
  newPresetName: string;
  setNewPresetName: (val: string) => void;
  handleSavePreset: () => void;
  themeClasses: any;
  characterLock?: CharacterLockState;
  selectedPlatform: TargetPlatform;
  setSelectedPlatform: (platform: TargetPlatform) => void;
  platformOutput: FormattedPromptOutput;
  copyNegativeToClipboard?: () => void;
  copiedNegative?: boolean;
}

export function PromptPreview({
  finalPrompt,
  copyToClipboard,
  copied,
  isSaving,
  setIsSaving,
  newPresetName,
  setNewPresetName,
  handleSavePreset,
  themeClasses,
  characterLock,
  selectedPlatform,
  setSelectedPlatform,
  platformOutput,
  copyNegativeToClipboard,
  copiedNegative = false
}: PromptPreviewProps) {
  const currentConfig = TARGET_PLATFORMS.find(p => p.id === selectedPlatform) || TARGET_PLATFORMS[0];

  const renderPlatformIcon = (id: TargetPlatform, active: boolean) => {
    const size = 13;
    switch (id) {
      case 'generic':
        return <Globe size={size} className={active ? 'text-white' : 'text-sky-400'} />;
      case 'nano-banana':
        return <span className="text-xs leading-none select-none">🍌</span>;
      case 'midjourney':
        return <Compass size={size} className={active ? 'text-white' : 'text-indigo-400'} />;
      case 'dalle':
        return <Bot size={size} className={active ? 'text-white' : 'text-emerald-400'} />;
      case 'flux':
        return <Zap size={size} className={active ? 'text-white' : 'text-amber-400'} />;
      case 'stable-diffusion':
        return <Cpu size={size} className={active ? 'text-white' : 'text-purple-400'} />;
      case 'leonardo':
        return <Palette size={size} className={active ? 'text-white' : 'text-pink-400'} />;
      case 'ideogram':
        return <Type size={size} className={active ? 'text-white' : 'text-teal-400'} />;
      default:
        return <Sparkles size={size} />;
    }
  };

  return (
    <div className={`border rounded-3xl p-5 sm:p-6 transition-colors ${themeClasses.card} shadow-xl`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className={themeClasses.accentText} />
          <h2 className="text-xl font-bold">Prompt Final</h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSaving(true)}
            className={`p-2 rounded-lg border transition-all ${themeClasses.card} ${themeClasses.textMuted} hover:scale-105 active:scale-95`}
            title="Salvar Preset"
          >
            <Save size={18} />
          </button>
        </div>
      </div>

      {/* Character Lock Banner (se ativo) */}
      {characterLock?.enabled && (
        <div className="mb-4 flex items-center justify-between px-3.5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <Lock size={13} className="text-cyan-400 shrink-0" />
            <span className="truncate">Blueprint: <strong className="text-cyan-300">{characterLock.characterName || 'Ativo'}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-200 font-mono uppercase tracking-wider font-bold">
              {characterLock.targetAI === 'nano-banana' ? 'Nano Banana' : (characterLock.targetAI || 'Universal')}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/30 text-cyan-100 font-mono uppercase tracking-wider font-bold">
              {characterLock.fidelity}
            </span>
          </div>
        </div>
      )}

      {/* Seletor de Plataforma de IA */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 opacity-80 ${themeClasses.textMuted}`}>
            <SlidersHorizontal size={13} className={themeClasses.accentText} />
            Gerador de Destino:
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-zinc-500/10 text-zinc-400 border border-zinc-700/30">
            {currentConfig.badge}
          </span>
        </div>

        {/* Botões das plataformas estilo Chips / Tags fluidas */}
        <div className="flex flex-wrap gap-1.5">
          {TARGET_PLATFORMS.map((platform) => {
            const isActive = selectedPlatform === platform.id;
            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                type="button"
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all duration-150 whitespace-nowrap select-none active:scale-95 ${
                  isActive
                    ? `${themeClasses.accent} text-white shadow-sm font-bold border-transparent ring-1 ring-white/20 scale-[1.02]`
                    : `border-zinc-800/80 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-800/60 ${themeClasses.textMuted} hover:text-zinc-100`
                }`}
                title={platform.description}
              >
                <span className="shrink-0 flex items-center justify-center">
                  {renderPlatformIcon(platform.id, isActive)}
                </span>
                <span>{platform.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Banner com Dica/Otimização da plataforma ativa */}
        <div className="mt-2.5 px-3 py-2 rounded-xl bg-zinc-500/10 border border-zinc-700/30 flex items-start gap-2 text-[11px] leading-relaxed opacity-90">
          <Info size={14} className="mt-0.5 shrink-0 text-amber-400/90" />
          <p className={themeClasses.textMuted}>
            <strong className="text-zinc-200">{currentConfig.name}:</strong> {platformOutput.tips}
          </p>
        </div>
      </div>

      {/* Caixa do Prompt Principal */}
      <div className={`p-5 rounded-2xl border mb-4 relative group min-h-[130px] max-h-[300px] overflow-y-auto transition-all ${themeClasses.bg} scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-transparent`}>
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-zinc-700/20">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
            Prompt Formatado ({currentConfig.shortName})
          </span>
          <button 
            onClick={copyToClipboard}
            className="p-1 px-2 text-[11px] rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 flex items-center gap-1 transition-all"
            title="Copiar prompt"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            <span>{copied ? 'Copiado!' : 'Copiar'}</span>
          </button>
        </div>
        <p className="text-sm leading-relaxed font-medium break-words italic opacity-95 select-all">
          {finalPrompt}
        </p>
      </div>

      {/* Caixa de Prompt Negativo Dedicado (se a plataforma suportar campo separado) */}
      {currentConfig.hasSeparateNegative && platformOutput.negativePrompt && copyNegativeToClipboard && (
        <div className="mb-5 p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1">
              <span>🚫</span> Negative Prompt Dedicado ({currentConfig.shortName})
            </span>
            <button
              onClick={copyNegativeToClipboard}
              className="p-1 px-2.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1 transition-all shadow-sm active:scale-95"
            >
              {copiedNegative ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedNegative ? 'Copiado!' : 'Copiar Negativo'}</span>
            </button>
          </div>
          <p className="text-xs leading-relaxed text-rose-200/90 font-mono break-words italic select-all">
            {platformOutput.negativePrompt}
          </p>
        </div>
      )}

      {/* Modal de Salvar Preset */}
      {isSaving && (
        <div className="animate-in fade-in slide-in-from-bottom-2 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <input 
              type="text"
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
              placeholder="Nome do Preset..."
              className={`flex-1 px-4 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-[#8b5a2b]/20 text-sm ${themeClasses.input}`}
            />
            <button 
              onClick={handleSavePreset}
              className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-all ${themeClasses.accent}`}
            >
              Salvar
            </button>
            <button 
              onClick={() => setIsSaving(false)}
              className="p-2 text-zinc-500 hover:text-rose-500"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Botão Principal de Copiar */}
      <button 
        onClick={copyToClipboard}
        translate="no"
        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg active:scale-[0.98] ${themeClasses.accent} text-white notranslate`}
      >
        {copied ? <Check size={20} /> : <Copy size={20} />}
        <span>{copied ? 'Prompt Copiado!' : `Copiar Prompt (${currentConfig.shortName})`}</span>
      </button>
      
      <p className={`text-center text-[10px] mt-4 uppercase tracking-widest font-bold opacity-50 ${themeClasses.textMuted}`}>
        O prompt está pronto e otimizado para o {currentConfig.name}
      </p>
    </div>
  );
}
