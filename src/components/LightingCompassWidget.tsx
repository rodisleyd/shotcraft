import React from 'react';
import {
  Sun,
  Sparkles,
  Zap,
  Flame,
  Lightbulb,
  Radio,
  Eye,
  Layers,
  Compass,
  Maximize2,
  CheckCircle2
} from 'lucide-react';
import { Theme } from '../types';
import {
  LIGHTING_DIRECTIONS,
  LIGHTING_TYPES,
  LIGHTING_SHADOW_STYLES,
  LightingDirectionOption,
  LightingTypeOption,
  LightingShadowStyleOption
} from '../data/coloristData';

interface LightingCompassWidgetProps {
  theme: Theme;
  themeClasses: any;
  selectedDirectionId: string;
  onSelectDirection: (directionId: string) => void;
  selectedTypeId: string;
  onSelectType: (typeId: string) => void;
  selectedShadowStyle: 'soft' | 'hard' | 'volumetric';
  onSelectShadowStyle: (style: 'soft' | 'hard' | 'volumetric') => void;
}

export function LightingCompassWidget({
  theme,
  themeClasses,
  selectedDirectionId,
  onSelectDirection,
  selectedTypeId,
  onSelectType,
  selectedShadowStyle,
  onSelectShadowStyle
}: LightingCompassWidgetProps) {
  const activeDirection = LIGHTING_DIRECTIONS.find(d => d.id === selectedDirectionId) || LIGHTING_DIRECTIONS[0];
  const activeType = LIGHTING_TYPES.find(t => t.id === selectedTypeId) || LIGHTING_TYPES[0];
  const activeShadow = LIGHTING_SHADOW_STYLES.find(s => s.id === selectedShadowStyle) || LIGHTING_SHADOW_STYLES[0];

  // Matrix grid mapping 3x3
  const matrixLayout: Array<Array<string | 'center'>> = [
    ['top-left', 'top', 'top-right'],
    ['left', 'center', 'right'],
    ['bottom-left', 'bottom', 'bottom-right']
  ];

  // Map direction ID to ray cone styles (position and beam pointing to center)
  const getBeamStyles = (dirId: string) => {
    switch (dirId) {
      case 'top-left':
        return {
          gradient: 'radial-gradient(ellipse at 15% 15%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 240, 180, 0.4) 30%, rgba(255, 255, 255, 0) 70%)',
          shadowStyle: '8px 8px 24px rgba(0, 0, 0, 0.7)'
        };
      case 'top':
        return {
          gradient: 'radial-gradient(ellipse at 50% 15%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 240, 180, 0.4) 30%, rgba(255, 255, 255, 0) 70%)',
          shadowStyle: '0px 10px 24px rgba(0, 0, 0, 0.7)'
        };
      case 'top-right':
        return {
          gradient: 'radial-gradient(ellipse at 85% 15%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 240, 180, 0.4) 30%, rgba(255, 255, 255, 0) 70%)',
          shadowStyle: '-8px 8px 24px rgba(0, 0, 0, 0.7)'
        };
      case 'left':
        return {
          gradient: 'radial-gradient(ellipse at 15% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 240, 180, 0.4) 30%, rgba(255, 255, 255, 0) 70%)',
          shadowStyle: '10px 0px 24px rgba(0, 0, 0, 0.7)'
        };
      case 'right':
        return {
          gradient: 'radial-gradient(ellipse at 85% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 240, 180, 0.4) 30%, rgba(255, 255, 255, 0) 70%)',
          shadowStyle: '-10px 0px 24px rgba(0, 0, 0, 0.7)'
        };
      case 'bottom-left':
        return {
          gradient: 'radial-gradient(ellipse at 15% 85%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 240, 180, 0.4) 30%, rgba(255, 255, 255, 0) 70%)',
          shadowStyle: '8px -8px 24px rgba(0, 0, 0, 0.7)'
        };
      case 'bottom':
        return {
          gradient: 'radial-gradient(ellipse at 50% 85%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 240, 180, 0.4) 30%, rgba(255, 255, 255, 0) 70%)',
          shadowStyle: '0px -10px 24px rgba(0, 0, 0, 0.7)'
        };
      case 'bottom-right':
        return {
          gradient: 'radial-gradient(ellipse at 85% 85%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 240, 180, 0.4) 30%, rgba(255, 255, 255, 0) 70%)',
          shadowStyle: '-8px -8px 24px rgba(0, 0, 0, 0.7)'
        };
      case 'front':
        return {
          gradient: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 240, 180, 0.25) 40%, rgba(255, 255, 255, 0) 80%)',
          shadowStyle: '0px 0px 20px rgba(255, 255, 255, 0.5)'
        };
      case 'backlight':
        return {
          gradient: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 30%, rgba(255, 220, 120, 0.5) 60%, rgba(255, 255, 255, 0) 90%)',
          shadowStyle: '0px 0px 30px rgba(255, 200, 50, 0.6)'
        };
      default:
        return {
          gradient: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
          shadowStyle: 'none'
        };
    }
  };

  const beam = getBeamStyles(selectedDirectionId);

  return (
    <div className="space-y-6">
      
      {/* Grid Principal: Bússola 3x3 Interativa + Seletor de Tipos de Luz */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUNA ESQUERDA: MATRIZ 3x3 INTERATIVA DA DIREÇÃO DA LUZ */}
        <div className={`lg:col-span-5 p-5 rounded-2xl border flex flex-col items-center justify-center relative overflow-hidden ${
          theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-[#1e1c1a] text-white border-zinc-700'
        }`}>
          {/* Luz de Fundo Dinâmica Conforme Posição Selecionada */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-500 opacity-75"
            style={{ background: beam.gradient }}
          />

          <div className="w-full flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <Compass size={15} className="text-amber-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                Bússola de Foco da Luz
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-amber-300 font-bold">
              {activeDirection.shortName}
            </span>
          </div>

          {/* MATRIZ 3x3 ESTILO UI REFERENCE */}
          <div className="relative z-10 w-64 h-64 p-3 rounded-2xl bg-black/70 border border-white/10 shadow-2xl flex flex-col justify-between backdrop-blur-sm">
            {matrixLayout.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-between items-center h-16">
                {row.map((cellId, cIdx) => {
                  if (cellId === 'center') {
                    // Centro: Representação da Cena / Objeto
                    const isFrontalActive = selectedDirectionId === 'front';
                    return (
                      <button
                        key="center"
                        type="button"
                        onClick={() => onSelectDirection('front')}
                        className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center transition-all relative group cursor-pointer ${
                          isFrontalActive
                            ? 'bg-sky-400 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.9)] ring-2 ring-white scale-105'
                            : 'bg-sky-500 hover:bg-sky-400 text-white shadow-lg hover:scale-105'
                        }`}
                        title="Cena / Sujeito no centro (Clique para ativar Luz Frontal Direta)"
                      >
                        <div
                          className="w-5 h-5 rounded-md bg-white/20 border border-white/40 flex items-center justify-center mb-0.5 transition-all"
                          style={{ boxShadow: beam.shadowStyle }}
                        >
                          <Eye size={12} className="text-white drop-shadow" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-tighter leading-none">
                          {isFrontalActive ? 'Frontal' : 'Cena'}
                        </span>
                      </button>
                    );
                  }

                  const dirOption = LIGHTING_DIRECTIONS.find(d => d.id === cellId);
                  const isSelected = selectedDirectionId === cellId;

                  return (
                    <button
                      key={cellId}
                      type="button"
                      onClick={() => onSelectDirection(cellId)}
                      className={`w-14 h-14 rounded-full flex flex-col items-center justify-center transition-all relative group cursor-pointer ${
                        isSelected
                          ? 'bg-white text-zinc-950 ring-4 ring-amber-400 shadow-[0_0_30px_rgba(255,255,255,1)] scale-110'
                          : 'bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-white/20 hover:scale-105'
                      }`}
                      title={`${dirOption?.name}: ${dirOption?.description}`}
                    >
                      {/* Feixe angular simulado se selecionado */}
                      {isSelected && (
                        <div className="absolute -inset-1 rounded-full bg-amber-400/30 animate-ping pointer-events-none" />
                      )}
                      <span className="text-base leading-none mb-0.5">{dirOption?.icon}</span>
                      <span className="text-[8px] font-black uppercase tracking-tighter truncate max-w-[48px] px-1">
                        {dirOption?.shortName.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Botões Rápidos de Modos Especiais (Contraluz & Omni 360°) */}
          <div className="w-full grid grid-cols-2 gap-2 mt-4 relative z-10">
            <button
              type="button"
              onClick={() => onSelectDirection('backlight')}
              className={`p-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                selectedDirectionId === 'backlight'
                  ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.6)] font-black'
                  : 'bg-zinc-900/90 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
              }`}
            >
              <span>🌟</span>
              <span>Contraluz (Traseiro)</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectDirection('omni')}
              className={`p-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                selectedDirectionId === 'omni'
                  ? 'bg-indigo-500 text-white border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.6)] font-black'
                  : 'bg-zinc-900/90 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
              }`}
            >
              <span>🌐</span>
              <span>Luz Omni 360°</span>
            </button>
          </div>

          <p className="text-[11px] text-zinc-400 text-center mt-3 relative z-10 leading-relaxed max-w-xs">
            {activeDirection.description}
          </p>
        </div>

        {/* COLUNA DIREITA: TIPOS DE ILUMINAÇÃO & DUREZA DA SOMBRA */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Seletor de Tipo / Natureza de Luz */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold flex items-center gap-1.5">
                <Lightbulb size={14} className="text-amber-500" />
                Tipo / Fonte de Iluminação ({LIGHTING_TYPES.length} Estilos)
              </label>
              <span className={`text-[10px] font-semibold ${themeClasses.textMuted}`}>
                {activeType.category}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {LIGHTING_TYPES.map((type) => {
                const isSelected = selectedTypeId === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => onSelectType(type.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? themeClasses.optionActive + ' shadow-md'
                        : themeClasses.option + ' hover:border-[#8b5a2b]/40'
                    }`}
                  >
                    <span className="text-xl flex-shrink-0 mt-0.5">{type.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-xs font-bold truncate">{type.name}</span>
                        {isSelected && <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" />}
                      </div>
                      <p className={`text-[11px] ${themeClasses.textMuted} line-clamp-2 leading-tight`}>
                        {type.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dureza e Estilo das Sombras */}
          <div className="space-y-2 pt-2 border-t border-black/10 dark:border-zinc-800">
            <label className="text-xs font-bold flex items-center gap-1.5">
              <Layers size={13} className="text-indigo-400" />
              Estilo e Dureza das Sombras
            </label>

            <div className="grid grid-cols-3 gap-2">
              {LIGHTING_SHADOW_STYLES.map((shadow) => {
                const isSelected = selectedShadowStyle === shadow.id;
                return (
                  <button
                    key={shadow.id}
                    type="button"
                    onClick={() => onSelectShadowStyle(shadow.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? theme === 'dark'
                          ? 'bg-indigo-600 text-white border-indigo-500 font-bold shadow-md'
                          : 'bg-[#8b5a2b] text-white border-[#724820] font-bold shadow-md'
                        : theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                        : 'bg-white border-[#d3cbb3] text-[#433422] hover:bg-zinc-50'
                    }`}
                  >
                    <span className="text-xs block font-bold truncate leading-tight">
                      {shadow.name}
                    </span>
                    <span className={`text-[10px] ${isSelected ? 'text-white/80' : themeClasses.textMuted} block mt-0.5 line-clamp-1`}>
                      {shadow.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resumo Dinâmico do Setup de Luz */}
          <div className={`p-3 rounded-2xl border text-xs flex items-center gap-2.5 ${
            theme === 'dark' ? 'bg-zinc-950/60 border-zinc-800' : 'bg-black/5 border-[#d3cbb3]'
          }`}>
            <Sparkles size={16} className="text-amber-400 flex-shrink-0" />
            <div className="leading-tight">
              <span className="font-bold">Setup Ativo: </span>
              <span className="text-amber-400 font-semibold">{activeType.name}</span>
              <span className={themeClasses.textMuted}> vinda de </span>
              <span className="text-indigo-400 font-semibold">{activeDirection.name}</span>
              <span className={themeClasses.textMuted}> com </span>
              <span className="text-emerald-400 font-semibold">{activeShadow.name}</span>.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
