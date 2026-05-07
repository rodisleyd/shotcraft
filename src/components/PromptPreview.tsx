/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Copy, Check, Sparkles, Save, X } from 'lucide-react';
import { UserPreset } from '../types';

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
  themeClasses
}: PromptPreviewProps) {
  return (
    <div className={`border rounded-3xl p-8 sticky top-24 transition-colors ${themeClasses.card} shadow-xl`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className={themeClasses.accentText} />
          <h2 className="text-xl font-bold">Prompt Final</h2>
        </div>
        <div className="flex items-center gap-2">
           <button 
              onClick={() => setIsSaving(true)}
              className={`p-2 rounded-lg border transition-all ${themeClasses.card} ${themeClasses.textMuted}`}
              title="Salvar Preset"
           >
              <Save size={18} />
           </button>
        </div>
      </div>

      <div className={`p-6 rounded-2xl border mb-6 relative group min-h-[120px] transition-all ${themeClasses.bg}`}>
        <p className="text-sm leading-relaxed font-medium break-words italic opacity-90">
          {finalPrompt}
        </p>
        <button 
          onClick={copyToClipboard}
          className="absolute bottom-4 right-4 p-2 bg-indigo-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-105 active:scale-95"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>

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

      <button 
        onClick={copyToClipboard}
        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg active:scale-[0.98] ${themeClasses.accent} text-white`}
      >
        {copied ? <Check size={20} /> : <Copy size={20} />}
        {copied ? 'Prompt Copiado!' : 'Copiar Prompt'}
      </button>
      
      <p className={`text-center text-[10px] mt-4 uppercase tracking-widest font-bold opacity-40 ${themeClasses.textMuted}`}>
        O prompt está pronto para ser colado no seu gerador de imagens
      </p>
    </div>
  );
}
