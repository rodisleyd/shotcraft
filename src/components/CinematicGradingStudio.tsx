import React, { useState, useEffect } from 'react';
import { 
  Clapperboard, Sparkles, SlidersHorizontal, SunMedium, Film, Flame, Save, 
  RotateCcw, Check, CheckCheck, Trash2, Copy, Eye, Wand2, ArrowRight, Layers,
  ChevronRight, Shield, Zap, Palette, Info, HelpCircle
} from 'lucide-react';
import { CinematicGradingState, SavedLook, SelectionState } from '../types';
import { 
  CINEMATIC_LOOKS_PRESETS, 
  COLOR_SCIENCE_INPUTS, 
  COLOR_SCIENCE_OUTPUTS, 
  CONTRAST_OPTIONS, 
  BLACK_LEVEL_OPTIONS, 
  HIGHLIGHT_ROLLOFF_OPTIONS, 
  SHADOW_TONE_OPTIONS, 
  HIGHLIGHT_TONE_OPTIONS, 
  SKIN_TONE_OPTIONS, 
  SKY_TONE_OPTIONS, 
  VEGETATION_TONE_OPTIONS, 
  FILM_FORMAT_OPTIONS,
  CinematicLookPreset
} from '../data/cinematicGradingData';
import { buildCinematicGradingPrompt } from '../services/cinematicGradingEngine';

interface CinematicGradingStudioProps {
  selections: SelectionState;
  setSelections: React.Dispatch<React.SetStateAction<SelectionState>>;
  theme: 'dark' | 'sepia';
  themeClasses: any;
  addToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

const DEFAULT_GRADING_STATE: CinematicGradingState = {
  enabled: true,
  activeLookId: 'hollywood-neutral',
  isCustomized: false,
  targetAI: 'general',
  colorScienceInput: 'digital-clean',
  colorScienceOutput: 'cinematic',
  contrast: 'natural',
  blackLevel: 'natural',
  highlightRollOff: 'soft',
  saturation: 'natural',
  shadowTone: 'neutral',
  highlightTone: 'neutral',
  specularHighlight: 'controlled',
  skinTone: 'natural',
  skyTone: 'none',
  vegetationTone: 'none',
  isolateSubject: false,
  halationEnabled: false,
  halationIntensity: 'subtle',
  halationColor: 'red-orange',
  halationSpread: 'soft',
  filmGrainEnabled: true,
  filmFormat: '35mm',
  grainSize: 'fine',
  grainIntensity: 'subtle',
  grainCharacter: 'clean'
};

export function CinematicGradingStudio({
  selections,
  setSelections,
  theme,
  themeClasses,
  addToast
}: CinematicGradingStudioProps) {
  const [subTab, setSubTab] = useState<'looks' | 'sculpting' | 'selective' | 'film' | 'builder'>('looks');
  const [customLookName, setCustomLookName] = useState('');
  const [savedLooks, setSavedLooks] = useState<SavedLook[]>([]);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Carregar looks salvos do LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('shotcraft_saved_looks');
      if (stored) {
        setSavedLooks(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const currentGrading: CinematicGradingState = selections.cinematicGrading || DEFAULT_GRADING_STATE;

  const updateGrading = (updates: Partial<CinematicGradingState>) => {
    setSelections((prev) => {
      const current = prev.cinematicGrading || DEFAULT_GRADING_STATE;
      const nextGrading: CinematicGradingState = {
        ...current,
        ...updates,
        enabled: true,
        // Se estiver alterando propriedades manuais e não definindo um activeLookId explícito, marca como customizado
        isCustomized: updates.activeLookId !== undefined ? false : true,
        activeLookId: updates.activeLookId !== undefined ? updates.activeLookId : undefined
      };
      return {
        ...prev,
        cinematicGrading: nextGrading
      };
    });
  };

  const handleApplyPreset = (preset: CinematicLookPreset) => {
    updateGrading({
      activeLookId: preset.id,
      isCustomized: false,
      colorScienceInput: preset.settings.colorScienceInput,
      colorScienceOutput: preset.settings.colorScienceOutput,
      contrast: preset.settings.contrast,
      blackLevel: preset.settings.blackLevel,
      highlightRollOff: preset.settings.highlightRollOff,
      saturation: preset.settings.saturation,
      shadowTone: preset.settings.shadowTone,
      highlightTone: preset.settings.highlightTone,
      specularHighlight: preset.settings.specularHighlight,
      skinTone: preset.settings.skinTone,
      skyTone: preset.settings.skyTone || 'none',
      vegetationTone: preset.settings.vegetationTone || 'none',
      isolateSubject: preset.settings.isolateSubject,
      halationEnabled: preset.settings.halationEnabled,
      halationIntensity: preset.settings.halationIntensity || 'subtle',
      halationColor: preset.settings.halationColor || 'red-orange',
      halationSpread: preset.settings.halationSpread || 'soft',
      filmGrainEnabled: preset.settings.filmGrainEnabled,
      filmFormat: preset.settings.filmFormat || '35mm',
      grainSize: preset.settings.grainSize || 'fine',
      grainIntensity: preset.settings.grainIntensity || 'subtle',
      grainCharacter: preset.settings.grainCharacter || 'clean'
    });
    addToast(`Look "${preset.name}" aplicado com sucesso!`, 'success');
  };

  const handleSaveCustomLook = () => {
    const trimmed = customLookName.trim();
    if (!trimmed) {
      addToast('Digite um nome para o seu Look.', 'error');
      return;
    }

    const newLook: SavedLook = {
      id: 'look-' + Date.now(),
      name: trimmed,
      description: 'Look customizado salvo no ShotCraft',
      settings: { ...currentGrading },
      createdAt: Date.now()
    };

    const updated = [newLook, ...savedLooks];
    setSavedLooks(updated);
    try {
      localStorage.setItem('shotcraft_saved_looks', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setCustomLookName('');
    addToast(`Look "${trimmed}" salvo com sucesso!`, 'success');
  };

  const handleDeleteSavedLook = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedLooks.filter(l => l.id !== id);
    setSavedLooks(updated);
    try {
      localStorage.setItem('shotcraft_saved_looks', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    addToast('Look removido.', 'info');
  };

  const handleApplySavedLook = (look: SavedLook) => {
    updateGrading({
      ...look.settings,
      activeLookId: look.id,
      isCustomized: false
    });
    addToast(`Look salvo "${look.name}" aplicado!`, 'success');
  };

  const handleResetGrading = () => {
    setSelections(prev => ({
      ...prev,
      cinematicGrading: { ...DEFAULT_GRADING_STATE, enabled: false, activeLookId: undefined }
    }));
    addToast('Grading cinematográfico desativado.', 'info');
  };

  const generatedPrompt = buildCinematicGradingPrompt(
    currentGrading.enabled ? currentGrading : undefined,
    currentGrading.targetAI || 'general'
  );

  const handleCopyPrompt = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedPrompt(true);
    addToast('Prompt de Color Grading copiado!', 'success');
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner de Direção Visual & Color Grading */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/15 via-[#8b5a2b]/10 to-transparent border border-[#8b5a2b]/30 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#8b5a2b] text-white shadow-sm">
                <Clapperboard size={18} />
              </span>
              <h3 className="text-base font-black tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                Motor de Direção Visual & Color Grading
                {currentGrading.enabled ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    Grading Ativo
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-zinc-500/20 text-zinc-500 border border-zinc-500/30">
                    Desativado
                  </span>
                )}
              </h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Traduza a ciência de cor de Hollywood (CST, curvas HDR, separação cromática, halation e grão analógico) diretamente em instruções de prompt de alta fidelidade.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {currentGrading.enabled && (
              <button
                type="button"
                onClick={handleResetGrading}
                className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-rose-500/10 hover:text-rose-500 transition-all font-bold text-xs flex items-center gap-1.5"
              >
                <RotateCcw size={13} />
                Desativar Grading
              </button>
            )}
            <button
              type="button"
              onClick={() => updateGrading({ enabled: true })}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm ${
                currentGrading.enabled
                  ? 'bg-[#8b5a2b] text-white hover:bg-[#724a23]'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <Zap size={14} />
              {currentGrading.enabled ? 'Configurado' : 'Ativar Grading'}
            </button>
          </div>
        </div>

        {/* Sub-Navegação dos 5 Módulos */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 mt-5 p-1.5 bg-black/10 dark:bg-black/30 backdrop-blur-md rounded-2xl border border-white/5">
          <button
            type="button"
            onClick={() => setSubTab('looks')}
            className={`py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
              subTab === 'looks'
                ? themeClasses.optionActive + ' shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Sparkles size={14} />
            <span>1. Looks (Cinema)</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('sculpting')}
            className={`py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
              subTab === 'sculpting'
                ? themeClasses.optionActive + ' shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <SunMedium size={14} />
            <span>2. Light Sculpting</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('selective')}
            className={`py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
              subTab === 'selective'
                ? themeClasses.optionActive + ' shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Layers size={14} />
            <span>3. Seletivo</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('film')}
            className={`py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
              subTab === 'film'
                ? themeClasses.optionActive + ' shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Film size={14} />
            <span>4. Película & Grão</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('builder')}
            className={`py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
              subTab === 'builder'
                ? themeClasses.optionActive + ' shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Flame size={14} />
            <span>5. Look Builder</span>
          </button>
        </div>
      </div>

      {/* MÓDULO 1: LOOKS DE CINEMA (NÍVEL 1) */}
      {subTab === 'looks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-black text-sm uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500" />
                Looks Completos de Cinema (Presets Hollywood)
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Selecione uma fórmula visual completa com balanço harmônico entre curvas de contraste, separação de cor e textura analógica.
              </p>
            </div>
            {currentGrading.activeLookId && (
              <span className="text-xs font-bold text-[#8b5a2b] dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Preset ativo
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1.5 custom-scrollbar">
            {CINEMATIC_LOOKS_PRESETS.map((preset) => {
              const isSelected = currentGrading.activeLookId === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className={`p-4.5 rounded-3xl border text-left cursor-pointer transition-all flex flex-col justify-between gap-3 group relative overflow-hidden ${
                    isSelected
                      ? themeClasses.optionActive + ' ring-4 ring-[#8b5a2b]/20 shadow-lg'
                      : themeClasses.option + ' hover:border-[#8b5a2b]/50 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <div className="space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                          {preset.badge}
                        </span>
                        <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                          {preset.name}
                        </h4>
                      </div>
                      <div className={`p-1.5 rounded-full border transition-all shrink-0 ${
                        isSelected
                          ? 'bg-[#8b5a2b] text-white border-transparent'
                          : 'text-transparent border-zinc-400 dark:border-zinc-700 group-hover:border-[#8b5a2b]'
                      }`}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 leading-snug">
                      {preset.tagline}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {preset.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-2">
                    <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 truncate block">
                      <strong className="text-[8px] font-sans font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mr-1">Prompt:</strong>
                      {preset.promptSignature}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Looks Salvos pelo Usuário */}
          {savedLooks.length > 0 && (
            <div className="pt-4 border-t border-black/10 dark:border-white/10 space-y-3">
              <h5 className="text-xs font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <Save size={14} className="text-[#8b5a2b]" />
                Meus Looks Salvos ({savedLooks.length})
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {savedLooks.map((look) => {
                  const isSelected = currentGrading.activeLookId === look.id;
                  return (
                    <div
                      key={look.id}
                      onClick={() => handleApplySavedLook(look)}
                      className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between gap-2 ${
                        isSelected
                          ? themeClasses.optionActive + ' ring-2 ring-[#8b5a2b]'
                          : themeClasses.option + ' hover:border-[#8b5a2b]/40'
                      }`}
                    >
                      <div className="truncate">
                        <h6 className="font-bold text-xs truncate">{look.name}</h6>
                        <span className="text-[10px] opacity-60">Custom Look</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => handleDeleteSavedLook(look.id, e)}
                          className="p-1 rounded-lg hover:bg-rose-500/20 text-zinc-400 hover:text-rose-500 transition-colors"
                          title="Excluir Look"
                        >
                          <Trash2 size={13} />
                        </button>
                        <div className={`p-1 rounded-full border ${
                          isSelected ? 'bg-[#8b5a2b] text-white border-transparent' : 'border-zinc-500 text-transparent'
                        }`}>
                          <Check size={10} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MÓDULO 2: LIGHT SCULPTING & TONAL RANGE (NÍVEL 2) */}
      {subTab === 'sculpting' && (
        <div className="space-y-6">
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <SunMedium size={16} className="text-amber-500" />
              Light Sculpting & Color Science (Zonas Tonais HDR)
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Ajuste científico das curvas de entrada/saída (CST) e esculpimento de luz em cada zona tonal (Pretos, Sombras, Altas Luzes e Roll-off).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Color Science CST */}
            <div className={`p-4 rounded-3xl border ${themeClasses.card} space-y-4`}>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#8b5a2b] dark:text-amber-400 block">
                1. Color Science (CST Input & Output)
              </span>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                  Perfil de Entrada (Camera / Sensor Input):
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {COLOR_SCIENCE_INPUTS.map(inp => (
                    <button
                      key={inp.id}
                      type="button"
                      onClick={() => updateGrading({ colorScienceInput: inp.id })}
                      className={`px-3 py-2 rounded-xl text-left text-xs transition-all border ${
                        currentGrading.colorScienceInput === inp.id
                          ? themeClasses.optionActive + ' font-bold ring-2 ring-[#8b5a2b]/30'
                          : themeClasses.option + ' hover:border-[#8b5a2b]/30'
                      }`}
                    >
                      <div className="font-bold">{inp.label}</div>
                      <div className="text-[10px] opacity-60">{inp.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                  Perfil de Saída (Look de Exibição / Output Look):
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {COLOR_SCIENCE_OUTPUTS.map(out => (
                    <button
                      key={out.id}
                      type="button"
                      onClick={() => updateGrading({ colorScienceOutput: out.id })}
                      className={`px-3 py-2 rounded-xl text-left text-xs transition-all border ${
                        currentGrading.colorScienceOutput === out.id
                          ? themeClasses.optionActive + ' font-bold ring-2 ring-[#8b5a2b]/30'
                          : themeClasses.option + ' hover:border-[#8b5a2b]/30'
                      }`}
                    >
                      <div className="font-bold">{out.label}</div>
                      <div className="text-[10px] opacity-60">{out.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tonal Range Sculpting */}
            <div className={`p-4 rounded-3xl border ${themeClasses.card} space-y-4`}>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#8b5a2b] dark:text-amber-400 block">
                2. Esculpimento de Contraste & Realces
              </span>

              {/* Contraste Geral */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                  Curva de Contraste:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {CONTRAST_OPTIONS.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => updateGrading({ contrast: c.id })}
                      className={`p-2 rounded-xl text-center text-xs transition-all border ${
                        currentGrading.contrast === c.id
                          ? themeClasses.optionActive + ' font-bold ring-2 ring-[#8b5a2b]/30'
                          : themeClasses.option
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nível de Pretos (Blacks) */}
              <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                  Nível de Pretos (Black Level / Sombras):
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {BLACK_LEVEL_OPTIONS.map(b => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => updateGrading({ blackLevel: b.id })}
                      className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                        currentGrading.blackLevel === b.id
                          ? themeClasses.optionActive + ' font-bold ring-2 ring-[#8b5a2b]/30'
                          : themeClasses.option
                      }`}
                    >
                      <div className="font-bold">{b.label}</div>
                      <div className="text-[10px] opacity-60">{b.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Highlight Roll-Off */}
              <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                  Highlight Roll-off (Transição de Altas Luzes):
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {HIGHLIGHT_ROLLOFF_OPTIONS.map(h => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => updateGrading({ highlightRollOff: h.id })}
                      className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                        currentGrading.highlightRollOff === h.id
                          ? themeClasses.optionActive + ' font-bold ring-2 ring-[#8b5a2b]/30'
                          : themeClasses.option
                      }`}
                    >
                      <div className="font-bold">{h.label}</div>
                      <div className="text-[10px] opacity-60">{h.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Separação Tonal: Sombras vs Realces */}
              <div className="space-y-3 pt-2 border-t border-black/5 dark:border-white/5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                  Tonalidade de Sombras (Shadow Tint):
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {SHADOW_TONE_OPTIONS.map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => updateGrading({ shadowTone: s.id })}
                      className={`p-2 rounded-xl text-center text-xs transition-all border flex flex-col items-center gap-1.5 ${
                        currentGrading.shadowTone === s.id
                          ? themeClasses.optionActive + ' font-bold ring-2 ring-[#8b5a2b]/30'
                          : themeClasses.option
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: s.color }} />
                      <span className="text-[10px]">{s.label}</span>
                    </button>
                  ))}
                </div>

                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block pt-1">
                  Tonalidade de Realces (Highlight Tint):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {HIGHLIGHT_TONE_OPTIONS.map(h => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => updateGrading({ highlightTone: h.id })}
                      className={`p-2 rounded-xl text-center text-xs transition-all border flex flex-col items-center gap-1.5 ${
                        currentGrading.highlightTone === h.id
                          ? themeClasses.optionActive + ' font-bold ring-2 ring-[#8b5a2b]/30'
                          : themeClasses.option
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: h.color }} />
                      <span className="text-[10px]">{h.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MÓDULO 3: SELECTIVE GRADING (QUALIFIERS & MASKING) */}
      {subTab === 'selective' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <div>
              <h4 className="font-black text-sm uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Layers size={16} className="text-amber-500" />
                Grading Seletivo & Qualifiers (Isolamento de Elementos)
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                Isole tons de pele, céu e vegetação sem alterar o equilíbrio global da cena.
              </p>
            </div>

            <button
              type="button"
              onClick={() => updateGrading({ isolateSubject: !currentGrading.isolateSubject })}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 border shadow-sm ${
                currentGrading.isolateSubject
                  ? 'bg-[#8b5a2b] text-white border-transparent'
                  : 'bg-white/60 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <Check size={14} className={currentGrading.isolateSubject ? 'opacity-100' : 'opacity-0'} />
              <span>🎯 Isolar Sujeito do Fundo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tom de Pele */}
            <div className={`p-4 rounded-3xl border ${themeClasses.card} space-y-3`}>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <h5 className="font-bold text-xs uppercase tracking-wider">Tom de Pele (Skin Tones)</h5>
              </div>
              <div className="space-y-1.5">
                {SKIN_TONE_OPTIONS.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => updateGrading({ skinTone: s.id })}
                    className={`w-full p-2.5 rounded-xl text-left text-xs transition-all border ${
                      currentGrading.skinTone === s.id
                        ? themeClasses.optionActive + ' font-bold ring-2 ring-[#8b5a2b]/30'
                        : themeClasses.option
                    }`}
                  >
                    <div className="font-bold">{s.label}</div>
                    <div className="text-[10px] opacity-60">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tom de Céu */}
            <div className={`p-4 rounded-3xl border ${themeClasses.card} space-y-3`}>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-sky-400" />
                <h5 className="font-bold text-xs uppercase tracking-wider">Céu & Atmosfera (Sky Tone)</h5>
              </div>
              <div className="space-y-1.5">
                {SKY_TONE_OPTIONS.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => updateGrading({ skyTone: s.id })}
                    className={`w-full p-2.5 rounded-xl text-left text-xs transition-all border ${
                      currentGrading.skyTone === s.id
                        ? themeClasses.optionActive + ' font-bold ring-2 ring-[#8b5a2b]/30'
                        : themeClasses.option
                    }`}
                  >
                    <div className="font-bold">{s.label}</div>
                    <div className="text-[10px] opacity-60">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tom de Vegetação */}
            <div className={`p-4 rounded-3xl border ${themeClasses.card} space-y-3`}>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <h5 className="font-bold text-xs uppercase tracking-wider">Vegetação & Folhagens</h5>
              </div>
              <div className="space-y-1.5">
                {VEGETATION_TONE_OPTIONS.map(v => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => updateGrading({ vegetationTone: v.id })}
                    className={`w-full p-2.5 rounded-xl text-left text-xs transition-all border ${
                      currentGrading.vegetationTone === v.id
                        ? themeClasses.optionActive + ' font-bold ring-2 ring-[#8b5a2b]/30'
                        : themeClasses.option
                    }`}
                  >
                    <div className="font-bold">{v.label}</div>
                    <div className="text-[10px] opacity-60">{v.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MÓDULO 4: PELÍCULA & GRÃO CINEMATOGRÁFICO (NÍVEL 3) */}
      {subTab === 'film' && (
        <div className="space-y-6">
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Film size={16} className="text-amber-500" />
              Emulação de Película, Halation & Grão Fotoquímico
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Simule a física da película de cinema clássico (35mm, 16mm, Super 8) e o halo avermelhado ótico em pontos de alta iluminação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Film Halation */}
            <div className={`p-5 rounded-3xl border ${themeClasses.card} space-y-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                  <h5 className="font-bold text-sm">Film Halation (Brilho Óptico)</h5>
                </div>
                <button
                  type="button"
                  onClick={() => updateGrading({ halationEnabled: !currentGrading.halationEnabled })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    currentGrading.halationEnabled
                      ? 'bg-rose-500 text-white border-transparent'
                      : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700'
                  }`}
                >
                  {currentGrading.halationEnabled ? 'Ativado' : 'Desativado'}
                </button>
              </div>

              {currentGrading.halationEnabled && (
                <div className="space-y-3 pt-2 animate-in fade-in">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                      Intensidade do Halation:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['subtle', 'medium', 'strong'] as const).map(intensity => (
                        <button
                          key={intensity}
                          type="button"
                          onClick={() => updateGrading({ halationIntensity: intensity })}
                          className={`p-2 rounded-xl text-center text-xs transition-all border ${
                            currentGrading.halationIntensity === intensity
                              ? themeClasses.optionActive + ' font-bold'
                              : themeClasses.option
                          }`}
                        >
                          {intensity === 'subtle' ? 'Sutil' : intensity === 'medium' ? 'Médio' : 'Forte'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                      Cor do Halo:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'red', label: 'Vermelho Puro' },
                        { id: 'red-orange', label: 'Laranja-Vermelho' },
                        { id: 'amber', label: 'Âmbar Quente' }
                      ].map(c => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => updateGrading({ halationColor: c.id as any })}
                          className={`p-2 rounded-xl text-center text-xs transition-all border ${
                            currentGrading.halationColor === c.id
                              ? themeClasses.optionActive + ' font-bold'
                              : themeClasses.option
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                      Espalhamento Óptico (Spread):
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['tight', 'medium', 'soft'] as const).map(spread => (
                        <button
                          key={spread}
                          type="button"
                          onClick={() => updateGrading({ halationSpread: spread })}
                          className={`p-2 rounded-xl text-center text-xs transition-all border ${
                            currentGrading.halationSpread === spread
                              ? themeClasses.optionActive + ' font-bold'
                              : themeClasses.option
                          }`}
                        >
                          {spread === 'tight' ? 'Concentrado' : spread === 'medium' ? 'Médio' : 'Suave / Difuso'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Film Grain */}
            <div className={`p-5 rounded-3xl border ${themeClasses.card} space-y-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Film size={16} className="text-amber-500" />
                  <h5 className="font-bold text-sm">Granulação de Película (Film Grain)</h5>
                </div>
                <button
                  type="button"
                  onClick={() => updateGrading({ filmGrainEnabled: !currentGrading.filmGrainEnabled })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    currentGrading.filmGrainEnabled
                      ? 'bg-amber-600 text-white border-transparent'
                      : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700'
                  }`}
                >
                  {currentGrading.filmGrainEnabled ? 'Ativado' : 'Desativado'}
                </button>
              </div>

              {currentGrading.filmGrainEnabled && (
                <div className="space-y-3 pt-2 animate-in fade-in">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                      Formato de Película (Gauge):
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {FILM_FORMAT_OPTIONS.map(f => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => updateGrading({ filmFormat: f.id as any })}
                          className={`p-2 rounded-xl text-left text-xs transition-all border ${
                            currentGrading.filmFormat === f.id
                              ? themeClasses.optionActive + ' font-bold'
                              : themeClasses.option
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                      Tamanho & Caráter do Grão:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'clean', label: 'Limpo / Fino' },
                        { id: 'organic', label: 'Orgânico 35mm' },
                        { id: 'vintage', label: 'Vintage 16mm' }
                      ].map(ch => (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => updateGrading({ grainCharacter: ch.id as any })}
                          className={`p-2 rounded-xl text-center text-xs transition-all border ${
                            currentGrading.grainCharacter === ch.id
                              ? themeClasses.optionActive + ' font-bold'
                              : themeClasses.option
                          }`}
                        >
                          {ch.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MÓDULO 5: LOOK BUILDER & UNIVERSAL LOOK ENGINE */}
      {subTab === 'builder' && (
        <div className="space-y-6">
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Flame size={16} className="text-amber-500" />
              Look Builder Studio & Universal Engine
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Personalize, salve seus próprios Power Grades e adapte automaticamente o Look para o gerador de IA desejado.
            </p>
          </div>

          {/* Universal Look Engine Target AI */}
          <div className={`p-4 rounded-3xl border ${themeClasses.card} space-y-3`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Wand2 size={14} className="text-amber-500" />
                Universal Look Engine (Otimização Específica por IA):
              </span>
              <span className="text-[10px] text-zinc-500">Adapta termos para cada modelo</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'general', label: 'Universal (Padrão)' },
                { id: 'midjourney', label: 'Midjourney v6' },
                { id: 'flux', label: 'Flux.1' },
                { id: 'nano-banana', label: 'Nano Banana / Imagen' },
                { id: 'dalle', label: 'DALL-E 3' }
              ].map(ai => (
                <button
                  key={ai.id}
                  type="button"
                  onClick={() => updateGrading({ targetAI: ai.id })}
                  className={`p-2 rounded-xl text-center text-xs font-bold transition-all border ${
                    (currentGrading.targetAI || 'general') === ai.id
                      ? themeClasses.optionActive + ' ring-2 ring-[#8b5a2b]/30'
                      : themeClasses.option
                  }`}
                >
                  {ai.label}
                </button>
              ))}
            </div>
          </div>

          {/* Salvar Novo Look */}
          <div className={`p-4 rounded-3xl border ${themeClasses.card} flex flex-col sm:flex-row items-center gap-3`}>
            <div className="flex-1 w-full">
              <input
                type="text"
                value={customLookName}
                onChange={(e) => setCustomLookName(e.target.value)}
                placeholder="Nome do seu Look (Ex: ShotCraft — Cinematic Warm 35)"
                className={`w-full px-4 py-2.5 rounded-xl border outline-none text-xs font-medium ${themeClasses.input}`}
              />
            </div>
            <button
              type="button"
              onClick={handleSaveCustomLook}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#8b5a2b] hover:bg-[#724a23] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Save size={14} />
              Salvar Look na Biblioteca
            </button>
          </div>
        </div>
      )}

      {/* LIVE PROMPT INSPECTOR BAR */}
      <div className={`p-4 rounded-3xl border ${themeClasses.card} space-y-2 relative overflow-hidden bg-black/5 dark:bg-black/40`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <Eye size={12} className="text-amber-500" />
            Tradução em Tempo Real para o Prompt:
          </span>
          <button
            type="button"
            onClick={handleCopyPrompt}
            disabled={!generatedPrompt}
            className="px-2.5 py-1 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-[11px] font-bold flex items-center gap-1 transition-all disabled:opacity-40"
          >
            {copiedPrompt ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
            {copiedPrompt ? 'Copiado' : 'Copiar Trecho'}
          </button>
        </div>

        <div className="p-3 rounded-2xl bg-black/10 dark:bg-black/60 border border-black/5 dark:border-white/5">
          <p className="font-mono text-xs text-amber-600 dark:text-amber-300 leading-relaxed break-words">
            {generatedPrompt || (
              <span className="text-zinc-400 italic">Nenhum parâmetro de Color Grading selecionado no momento.</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
