/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronRight, ChevronLeft, Wand2, ChevronDown, Upload, Image as ImageIcon, Loader2, Languages, Trash2, X, Copy } from "lucide-react";
import { Option, Step, SelectionState } from "../types";
import { STYLES, COLOR_PALETTES, VISUAL_TAGS } from "../data/constants";
import React, { useState, useEffect } from "react";

interface StepContentProps {
  activeStep: number;
  steps: Step[];
  subject: string;
  setSubject: (val: string) => void;
  isOptimizing: boolean;
  handleOptimizeSubject: () => void;
  isTranslating: boolean;
  handleTranslateSubject: () => void;
  isAnalyzing: boolean;
  handleAnalyzeReference: (file: File) => void;
  setActiveStep: (step: number) => void;
  getCurrentOptions: (step: number) => Option[];
  handleSelect: (category: string, id: string) => void;
  selections: any;
  setSelections: React.Dispatch<React.SetStateAction<SelectionState>>;
  customAspect: string;
  setCustomAspect: (val: string) => void;
  theme: string;
  themeClasses: any;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export function StepContent({
  activeStep,
  steps,
  subject,
  setSubject,
  isOptimizing,
  handleOptimizeSubject,
  isTranslating,
  handleTranslateSubject,
  isAnalyzing,
  handleAnalyzeReference,
  setActiveStep,
  getCurrentOptions,
  handleSelect,
  selections,
  setSelections,
  customAspect,
  setCustomAspect,
  theme,
  themeClasses,
  addToast
}: StepContentProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('1. Pintura Tradicional');
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  useEffect(() => {
    if (activeStep === 9) {
      setExpandedCategory('1. Pintura Tradicional');
    } else if (activeStep === 2) {
      setExpandedCategory('1. Enquadramentos Básicos');
    } else if (activeStep === 3) {
      setExpandedCategory('1. Ângulos Básicos');
    } else if (activeStep === 4) {
      setExpandedCategory('1. Perspectivas Clássicas');
    } else if (activeStep === 5) {
      setExpandedCategory('1. Lentes Naturais');
    } else if (activeStep === 6) {
      setExpandedCategory('1. Iluminação Básica');
    } else if (activeStep === 10) {
      setExpandedCategory('1. Efeitos Ópticos');
    } else {
      setExpandedCategory(null);
    }
  }, [activeStep]);

  const [colorMode, setColorMode] = useState<'extract' | 'presets'>('extract');
  const [isExtractingColors, setIsExtractingColors] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);
    return { r, g, b };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, Math.min(m, y));

    if (k === 1) {
      c = 0;
      m = 0;
      y = 0;
    } else {
      c = (c - k) / (1 - k);
      m = (m - k) / (1 - k);
      y = (y - k) / (1 - k);
    }

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  const handleApplyVisualTag = (tag: any) => {
    setSelections((prev: any) => {
      const next = { ...prev };
      Object.entries(tag.selections).forEach(([key, val]) => {
        if (key === 'style' || key === 'detail') {
          const current = (prev[key as keyof SelectionState] as string[]) || [];
          const toAdd = Array.isArray(val) ? val : [val as string];
          (next[key as keyof SelectionState] as string[]) = Array.from(new Set([...current, ...toAdd]));
        } else {
          (next[key as keyof SelectionState] as any) = val;
        }
      });
      return next;
    });
    addToast(`Clima "${tag.label}" aplicado! Enquadramento e luz configurados.`, 'success');
  };

  const handleColorImageUpload = (file: File) => {
    setIsExtractingColors(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setTempImageSrc(src);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setIsExtractingColors(false);
          return;
        }

        canvas.width = 50;
        canvas.height = 50;
        ctx.drawImage(img, 0, 0, 50, 50);
        const imgData = ctx.getImageData(0, 0, 50, 50).data;

        const colors: { r: number, g: number, b: number, count: number }[] = [];
        const threshold = 40;

        for (let i = 0; i < imgData.length; i += 4) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];
          if (a < 128) continue;

          let found = false;
          for (const c of colors) {
            const dist = Math.sqrt(
              Math.pow(c.r - r, 2) +
              Math.pow(c.g - g, 2) +
              Math.pow(c.b - b, 2)
            );
            if (dist < threshold) {
              c.r = (c.r * c.count + r) / (c.count + 1);
              c.g = (c.g * c.count + g) / (c.count + 1);
              c.b = (c.b * c.count + b) / (c.count + 1);
              c.count++;
              found = true;
              break;
            }
          }
          if (!found) {
            colors.push({ r, g, b, count: 1 });
          }
        }

        colors.sort((a, b) => b.count - a.count);

        const rgbToHexStr = (r: number, g: number, b: number) => {
          const toHex = (n: number) => {
            const hex = Math.round(n).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
          };
          return '#' + toHex(r) + toHex(g) + toHex(b);
        };

        const extractedHexColors = colors.slice(0, 5).map(c => rgbToHexStr(c.r, c.g, c.b));

        setSelections(prev => ({
          ...prev,
          colorPalette: extractedHexColors,
          colorPaletteId: 'custom'
        }));
        
        setIsExtractingColors(false);
        addToast('Paleta extraída com sucesso da imagem!', 'success');
      };
      img.onerror = () => {
        setIsExtractingColors(false);
        addToast('Erro ao carregar imagem para extração de cores.', 'error');
      };
      img.src = src;
    };
    reader.onerror = () => {
      setIsExtractingColors(false);
      addToast('Erro ao ler o arquivo de imagem.', 'error');
    };
    reader.readAsDataURL(file);
  };

  const copyPaletteAsImage = async (colors: string[]) => {
    if (colors.length === 0) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const blockWidth = 120;
    const height = 150;
    canvas.width = colors.length * blockWidth;
    canvas.height = height;

    colors.forEach((color, index) => {
      ctx.fillStyle = color;
      ctx.fillRect(index * blockWidth, 0, blockWidth, height);
    });

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          addToast('Imagem da paleta copiada para a área de transferência!', 'success');
        } catch (err) {
          console.error(err);
          addToast('Erro ao copiar imagem. Certifique-se de dar permissões de área de transferência.', 'error');
        }
      }, 'image/png');
    } catch (e) {
      console.error(e);
      addToast('Não foi possível gerar a imagem da paleta neste navegador.', 'error');
    }
  };

  return (
    <div className={`border rounded-3xl p-8 min-h-[400px] flex flex-col transition-colors ${themeClasses.card}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="flex-1"
        >
          {activeStep === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">O que vamos filmar?</h2>
                <p className={`${themeClasses.textMuted} text-sm`}>Descreva o sujeito e a ação principal da cena.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <textarea 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Ex: A young detective sitting alone in a crowded bar..."
                    className={`w-full h-48 rounded-2xl p-6 transition-all text-lg resize-none border outline-none focus:ring-2 focus:ring-[#8b5a2b]/20 ${themeClasses.input}`}
                  />
                  <button 
                    onClick={handleOptimizeSubject}
                    disabled={isOptimizing || !subject.trim()}
                    className={`w-full px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all border shadow-sm ${
                      theme === 'dark' 
                        ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-100 bg-zinc-900/50' 
                        : 'border-[#8b5a2b]/20 hover:bg-[#8b5a2b]/5 text-[#8b5a2b] bg-white'
                    } disabled:opacity-50 group`}
                  >
                    <Wand2 size={18} className={`${isOptimizing ? 'animate-spin' : 'group-hover:scale-110 transition-transform'} text-amber-500`} />
                    {isOptimizing ? 'Otimizando com IA...' : 'Refinar Assunto com IA'}
                  </button>
                  <button 
                    onClick={handleTranslateSubject}
                    disabled={isTranslating || !subject.trim()}
                    className={`w-full px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all border shadow-sm ${
                      theme === 'dark' 
                        ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-100 bg-zinc-900/50' 
                        : 'border-[#8b5a2b]/20 hover:bg-[#8b5a2b]/5 text-[#8b5a2b] bg-white'
                    } disabled:opacity-50 group`}
                  >
                    <Languages size={18} className={`${isTranslating ? 'animate-spin' : 'group-hover:scale-110 transition-transform'} text-indigo-500`} />
                    {isTranslating ? 'Traduzindo...' : 'Traduzir para Inglês'}
                  </button>
                </div>

                <div className="relative group h-full min-h-[200px]">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleAnalyzeReference(file);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={isAnalyzing}
                  />
                  <div className={`h-full p-8 rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 text-center ${
                    isAnalyzing 
                      ? 'border-indigo-500 bg-indigo-500/5' 
                      : 'border-zinc-200 hover:border-indigo-400 hover:bg-zinc-50/50'
                  }`}>
                    {isAnalyzing ? (
                      <>
                        <div className="relative">
                          <Loader2 size={48} className="text-indigo-500 animate-spin" />
                          <ImageIcon size={24} className="absolute inset-0 m-auto text-indigo-300" />
                        </div>
                        <div>
                          <div className="font-bold text-indigo-500 text-lg">Mestre IA Analisando...</div>
                          <p className="text-xs text-zinc-400 mt-1">Identificando estilos, luz e composição</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-20 h-20 rounded-3xl bg-zinc-100 flex items-center justify-center group-hover:scale-110 transition-all shadow-inner">
                          <Upload size={32} className="text-zinc-400 group-hover:text-indigo-500 transition-colors" />
                        </div>
                        <div>
                          <div className="font-bold text-zinc-600 text-lg">Modo Mestre</div>
                          <p className="text-xs text-zinc-400 mt-1">Suba uma imagem para que o IA <br/> marque as opções automaticamente</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Clima & Sensações Rápidas (Tags Visuais) */}
              <div className="border-t border-zinc-200/50 dark:border-zinc-800/50 pt-6 space-y-4">
                <div>
                  <h3 className="font-bold text-base flex items-center gap-2">
                    <span>✨</span> Clima & Sensações Rápidas
                  </h3>
                  <p className={`${themeClasses.textMuted} text-xs`}>
                    Selecione um tom emocional para pré-configurar enquadramentos, luzes e ângulos de forma automatizada.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {VISUAL_TAGS.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => handleApplyVisualTag(tag)}
                      className={`group p-3 rounded-xl border text-left transition-all ${
                        themeClasses.option + ' hover:border-[#8b5a2b]/60 hover:bg-[#8b5a2b]/5 active:scale-[0.98]'
                      }`}
                      title={tag.description}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{tag.icon}</span>
                        <span className="font-bold text-xs">{tag.label}</span>
                      </div>
                      <div className={`text-[10px] leading-tight opacity-65 group-hover:opacity-100 ${themeClasses.textMuted}`}>
                        {tag.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => setActiveStep(1)}
                  className={`w-full sm:w-auto text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${themeClasses.accent}`}
                >
                  Próximo Passo <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {activeStep > 0 && activeStep < 11 && activeStep !== 8 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{steps[activeStep].title}</h2>
                <p className={`${themeClasses.textMuted} text-sm`}>Escolha uma opção técnica para refinar a composição.</p>
              </div>
              
              {activeStep === 9 || activeStep === 2 || activeStep === 3 || activeStep === 4 || activeStep === 5 || activeStep === 6 || activeStep === 10 ? (
                <div className="space-y-3">
                  {Array.from(new Set(getCurrentOptions(activeStep).map(s => s.subCategory))).filter(Boolean).map(subCat => (
                    <div key={subCat} className={`border rounded-2xl overflow-hidden transition-colors ${themeClasses.card}`}>
                      <button
                        onClick={() => setExpandedCategory(expandedCategory === subCat ? null : subCat)}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-black/5 transition-colors"
                      >
                        <span className="font-bold text-sm tracking-tight">{subCat}</span>
                        <ChevronDown 
                          size={18} 
                          className={`transition-transform duration-300 ${expandedCategory === subCat ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      <AnimatePresence>
                        {expandedCategory === subCat && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-6 pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {getCurrentOptions(activeStep).filter(s => s.subCategory === subCat).map((option) => {
                                const isSelected = (option.category === 'style' || option.category === 'detail')
                                  ? (selections[option.category as keyof SelectionState] as string[]).includes(option.id)
                                  : selections[option.category as keyof SelectionState] === option.id;
                                
                                return (
                                  <button
                                    key={option.id}
                                    onMouseEnter={() => setHoveredOption(option.id)}
                                    onMouseLeave={() => setHoveredOption(null)}
                                    onClick={() => handleSelect(option.category, option.id)}
                                    className={`group relative p-4 rounded-xl border text-left transition-all overflow-hidden ${
                                      isSelected
                                        ? themeClasses.optionActive + ' ring-4 ring-[#8b5a2b]/10'
                                        : themeClasses.option + ' hover:border-[#8b5a2b]/40'
                                    }`}
                                  >
                                    <div className="font-bold text-xs mb-1">{option.label}</div>
                                    <div className={`text-[10px] leading-tight opacity-75 ${isSelected ? 'text-white/80' : themeClasses.textMuted}`}>
                                      {option.prompt}
                                    </div>
                                    {isSelected && (
                                      <div className="absolute top-2 right-2">
                                        <Check size={12} className="text-white" />
                                      </div>
                                    )}
                                    {/* Preview Image on Hover */}
                                    {hoveredOption === option.id && option.image && (
                                      <motion.div 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute inset-0 z-10 pointer-events-none"
                                      >
                                        <img src={option.image} alt={option.label} className="w-full h-full object-cover brightness-50" />
                                      </motion.div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {getCurrentOptions(activeStep).map((option) => {
                        const isSelected = (option.category === 'style' || option.category === 'detail')
                          ? (selections[option.category as keyof SelectionState] as string[]).includes(option.id)
                          : selections[option.category as keyof SelectionState] === option.id;

                        return (
                          <button
                            key={option.id}
                            onMouseEnter={() => setHoveredOption(option.id)}
                            onMouseLeave={() => setHoveredOption(null)}
                            onClick={() => handleSelect(option.category, option.id)}
                            className={`group relative p-4 rounded-2xl border text-left transition-all overflow-hidden ${
                              isSelected
                                ? themeClasses.optionActive + ' ring-4 ring-[#8b5a2b]/10'
                                : themeClasses.option + ' hover:border-[#8b5a2b]/40'
                            }`}
                          >
                            <div className="font-bold text-sm mb-1">{option.label}</div>
                            <div className={`text-[10px] leading-tight opacity-60 ${isSelected ? 'text-white/80' : themeClasses.textMuted}`}>
                              {option.prompt}
                            </div>
                            {isSelected && (
                              <div className="absolute top-2 right-2">
                                <Check size={14} className="text-white" />
                              </div>
                            )}
                            {/* Preview Image on Hover */}
                            {hoveredOption === option.id && option.image && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 z-10 pointer-events-none"
                              >
                                <img src={option.image} alt={option.label} className="w-full h-full object-cover brightness-50" />
                              </motion.div>
                            )}
                          </button>
                        );
                      })}
                  </div>

                  {/* Custom Aspect Ratio Input */}
                  {activeStep === 1 && selections.aspect === 'custom' && (
                    <div className="p-6 bg-black/5 rounded-2xl border border-black/10 animate-in fade-in slide-in-from-top-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">
                        Proporção Customizada (W:H)
                      </label>
                      <div className="flex items-center gap-4">
                        <input 
                          type="text"
                          value={customAspect}
                          onChange={(e) => setCustomAspect(e.target.value)}
                          placeholder="ex: 1:5"
                          className={`flex-1 px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[#8b5a2b]/20 text-lg font-mono ${themeClasses.input}`}
                        />
                        <div className="text-xs text-zinc-500 max-w-[150px] italic">
                          Ideal para quadros verticais ou horizontais extremos em quadrinhos.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between pt-8 mt-auto">
                <button 
                  onClick={() => setActiveStep(activeStep - 1)}
                  className={`${themeClasses.textMuted} hover:text-black/80 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all`}
                >
                  <ChevronLeft size={18} /> Voltar
                </button>
                <button 
                  onClick={() => setActiveStep(activeStep + 1)}
                  className={`text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${themeClasses.accent}`}
                >
                  Próximo Passo <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
          
          {activeStep === 8 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Colorização e Paletas</h2>
                  <p className={`${themeClasses.textMuted} text-sm`}>
                    Defina referências de cores para seu prompt ou copie imagens de paletas prontas para seu software de desenho.
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 p-1.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl max-w-sm">
                  <button
                    type="button"
                    onClick={() => setColorMode('extract')}
                    className={`flex-1 py-2 px-4 rounded-xl font-bold text-sm transition-all ${
                      colorMode === 'extract'
                        ? themeClasses.optionActive + ' shadow-md'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    Extrair de Imagem
                  </button>
                  <button
                    type="button"
                    onClick={() => setColorMode('presets')}
                    className={`flex-1 py-2 px-4 rounded-xl font-bold text-sm transition-all ${
                      colorMode === 'presets'
                        ? themeClasses.optionActive + ' shadow-md'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    Paletas Prontas
                  </button>
                </div>

                {/* Extract Tab Content */}
                {colorMode === 'extract' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left side: Upload area */}
                    <div className="space-y-4">
                      <label className="block text-xs font-bold uppercase tracking-widest opacity-60">
                        Upload de Imagem Referência
                      </label>
                      <div 
                        className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all relative overflow-hidden flex flex-col items-center justify-center min-h-[220px] ${
                          tempImageSrc ? 'border-[#8b5a2b]/40' : 'border-zinc-300 dark:border-zinc-700 hover:border-[#8b5a2b]/30'
                        }`}
                      >
                        {tempImageSrc ? (
                          <>
                            <img src={tempImageSrc} alt="Preview" className="absolute inset-0 w-full h-full object-cover brightness-50" />
                            <div className="relative z-10 flex flex-col items-center gap-3">
                              <button 
                                type="button"
                                onClick={() => {
                                  setTempImageSrc(null);
                                  setSelections((prev: any) => ({ ...prev, colorPalette: [], colorPaletteId: '' }));
                                }}
                                className="p-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full transition-colors shadow-lg"
                                title="Remover imagem"
                              >
                                <Trash2 size={18} />
                              </button>
                              <span className="text-white text-xs font-bold bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                                Imagem Carregada
                              </span>
                            </div>
                          </>
                        ) : (
                          <label className="cursor-pointer flex flex-col items-center gap-3 w-full h-full py-6">
                            <div className="p-4 bg-[#8b5a2b]/10 text-[#8b5a2b] rounded-2xl">
                              {isExtractingColors ? <Loader2 className="animate-spin" size={24} /> : <Upload size={24} />}
                            </div>
                            <div>
                              <span className="font-bold text-sm block">Clique para fazer upload</span>
                              <span className="text-xs text-zinc-400">Arraste e solte uma imagem aqui</span>
                            </div>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleColorImageUpload(file);
                              }}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Right side: Extracted colors */}
                    <div className="space-y-4 flex flex-col justify-between">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-3">
                          Paleta de Cores Extraída
                        </label>

                        {selections.colorPalette && selections.colorPalette.length > 0 ? (
                          <div className="space-y-4">
                            {/* Color bar preview */}
                            <div className="flex h-14 w-full rounded-2xl overflow-hidden shadow-inner border border-black/10">
                              {selections.colorPalette.map((color: string, index: number) => (
                                <div 
                                  key={index} 
                                  className="flex-1 transition-all hover:flex-[1.3] relative group"
                                  style={{ backgroundColor: color }}
                                >
                                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono bg-black/85 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {color}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {/* Color specs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
                              {selections.colorPalette.map((color: string, index: number) => {
                                const rgb = hexToRgb(color);
                                const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
                                return (
                                  <div key={index} className={`p-3 rounded-2xl border ${themeClasses.card} flex items-center gap-3`}>
                                    <div className="w-10 h-10 rounded-xl shadow-sm border border-black/10" style={{ backgroundColor: color }} />
                                    <div className="flex-1 min-w-0">
                                      <div className="font-mono text-[10px] font-black uppercase text-[#8b5a2b]">HEX: {color}</div>
                                      <div className="text-[9px] font-mono opacity-60">RGB: {rgb.r}, {rgb.g}, {rgb.b}</div>
                                      <div className="text-[9px] font-mono opacity-60">CMYK: {cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%</div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-8 bg-black/5 dark:bg-white/5 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 min-h-[140px] text-center text-zinc-400 text-xs">
                            <ImageIcon size={32} className="mb-2 opacity-40 animate-pulse" />
                            <span>Envie uma imagem para gerar automaticamente sua paleta de cores.</span>
                          </div>
                        )}
                      </div>

                      {selections.colorPalette && selections.colorPalette.length > 0 && (
                        <div className="flex flex-wrap gap-3 pt-4">
                          <button 
                            type="button"
                            onClick={() => copyPaletteAsImage(selections.colorPalette)}
                            className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${themeClasses.optionActive}`}
                          >
                            <Copy size={16} /> Copiar Imagem da Paleta
                          </button>
                          <button 
                            type="button"
                            onClick={() => {
                              setTempImageSrc(null);
                              setSelections((prev: any) => ({ ...prev, colorPalette: [], colorPaletteId: '' }));
                            }}
                            className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-rose-500/10 hover:text-rose-500 transition-colors font-bold text-xs"
                          >
                            Limpar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {colorMode === 'presets' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-1">
                      {COLOR_PALETTES.map((preset) => {
                        const isSelected = selections.colorPaletteId === preset.id;
                        return (
                          <div 
                            key={preset.id}
                            onClick={() => {
                              setSelections((prev: any) => ({
                                ...prev,
                                colorPalette: preset.colors,
                                colorPaletteId: preset.id
                              }));
                            }}
                            className={`p-4 rounded-3xl border text-left cursor-pointer transition-all flex flex-col gap-3 group relative overflow-hidden ${
                              isSelected
                                ? themeClasses.optionActive + ' ring-4 ring-[#8b5a2b]/10'
                                : themeClasses.option + ' hover:border-[#8b5a2b]/40'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-sm">{preset.name}</h3>
                                <p className="text-[10px] leading-tight opacity-60 mt-1">{preset.description}</p>
                              </div>
                              {isSelected && (
                                <div className="p-1 bg-[#8b5a2b] text-white rounded-full">
                                  <Check size={12} />
                                </div>
                              )}
                            </div>

                            <div className="flex h-8 rounded-xl overflow-hidden shadow-inner border border-black/10">
                              {preset.colors.map((color, idx) => (
                                <div key={idx} className="flex-1" style={{ backgroundColor: color }} />
                              ))}
                            </div>

                            <div className="flex gap-2 items-center flex-wrap pt-1">
                              {preset.colors.map((color, idx) => (
                                <span key={idx} className="text-[8px] font-mono opacity-50 select-all">{color}</span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {selections.colorPaletteId && selections.colorPaletteId !== 'custom' && (
                      <div className="flex gap-3">
                        <button 
                          type="button"
                          onClick={() => copyPaletteAsImage(selections.colorPalette)}
                          className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${themeClasses.optionActive}`}
                        >
                          <Copy size={16} /> Copiar Imagem da Paleta
                        </button>
                        <button 
                          type="button"
                          onClick={() => {
                            setSelections((prev: any) => ({ ...prev, colorPalette: [], colorPaletteId: '' }));
                          }}
                          className="px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-rose-500/10 hover:text-rose-500 transition-colors font-bold text-xs"
                        >
                          Limpar Paleta Selecionada
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between pt-8 border-t border-zinc-100 dark:border-zinc-800/60 mt-auto">
                <button 
                  type="button"
                  onClick={() => setActiveStep(7)}
                  className={`${themeClasses.textMuted} hover:text-black/80 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all`}
                >
                  <ChevronLeft size={18} /> Voltar
                </button>
                <button 
                  type="button"
                  onClick={() => setActiveStep(9)}
                  className={`text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${themeClasses.accent}`}
                >
                  Próximo Passo <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
          
          {activeStep === 11 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Revisão Final</h2>
                <p className={`${themeClasses.textMuted} text-sm`}>Confira todas as suas escolhas técnicas. Remova o que não deseja clicando no ícone.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sujeito */}
                <div className={`p-4 rounded-2xl border ${themeClasses.card} flex flex-col gap-2`}>
                   <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Sujeito</span>
                     <button onClick={() => setSubject('')} className="p-1 hover:text-rose-500 transition-colors">
                       <Trash2 size={14} />
                     </button>
                   </div>
                   <p className="text-sm font-medium line-clamp-3 italic">"{subject}"</p>
                </div>

                {/* Outras categorias simples */}
                {[
                  { key: 'aspect', label: 'Formato', options: getCurrentOptions(1) },
                  { key: 'framing', label: 'Enquadramento', options: getCurrentOptions(2) },
                  { key: 'angle', label: 'Ângulo', options: getCurrentOptions(3) },
                  { key: 'perspective', label: 'Perspectiva', options: getCurrentOptions(4) },
                  { key: 'lens', label: 'Lente', options: getCurrentOptions(5) },
                  { key: 'lighting', label: 'Luz', options: getCurrentOptions(6) },
                  { key: 'environment', label: 'Cenário', options: getCurrentOptions(7) },
                ].map((cat) => {
                  const selectionId = selections[cat.key];
                  if (!selectionId) return null;
                  const option = cat.options.find(o => o.id === selectionId);
                  if (!option) return null;

                  return (
                    <div key={cat.key} className={`p-4 rounded-2xl border ${themeClasses.card} flex items-center justify-between group`}>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-50">{cat.label}</span>
                        <span className="text-sm font-bold">{option.label}</span>
                      </div>
                      <button 
                        onClick={() => handleSelect(cat.key, selectionId)}
                        className="p-2 rounded-lg hover:bg-rose-500/10 text-zinc-400 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  );
                })}

                {/* Paleta de Cores de Referência */}
                {selections.colorPalette && selections.colorPalette.length > 0 && (
                  <div className={`col-span-full p-4 rounded-2xl border ${themeClasses.card} flex flex-col gap-2`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Paleta de Referência de Cores</span>
                      <button 
                        onClick={() => setSelections(prev => ({ ...prev, colorPalette: [], colorPaletteId: '' }))} 
                        className="p-1 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5 p-1 bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10">
                        {selections.colorPalette.map((color: string, idx: number) => (
                          <div 
                            key={idx} 
                            className="w-8 h-8 rounded-lg shadow-sm border border-black/10 dark:border-white/10" 
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold opacity-60">
                        {selections.colorPaletteId === 'custom' 
                          ? 'Extraída de Imagem' 
                          : COLOR_PALETTES.find(p => p.id === selections.colorPaletteId)?.name || 'Paleta de Cores'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Estilos (Múltiplos) */}
                {selections.style.length > 0 && (
                  <div className={`col-span-full p-4 rounded-2xl border ${themeClasses.card}`}>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-3 block">Estilos Selecionados</span>
                    <div className="flex flex-wrap gap-2">
                      {selections.style.map((id: string) => {
                        const option = STYLES.find(o => o.id === id);
                        return (
                          <div key={id} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${themeClasses.optionActive}`}>
                            {option?.label || id}
                            <button onClick={() => handleSelect('style', id)} className="hover:text-rose-200 transition-colors">
                              <X size={14} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Detalhes (Múltiplos) */}
                {selections.detail.length > 0 && (
                  <div className={`col-span-full p-4 rounded-2xl border ${themeClasses.card}`}>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-3 block">Detalhes Adicionais</span>
                    <div className="flex flex-wrap gap-2">
                      {selections.detail.map((id: string) => {
                        const option = getCurrentOptions(10).find(o => o.id === id);
                        return (
                          <div key={id} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${themeClasses.optionActive}`}>
                            {option?.label || id}
                            <button onClick={() => handleSelect('detail', id)} className="hover:text-rose-200 transition-colors">
                              <X size={14} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-8 mt-auto">
                <button 
                  onClick={() => setActiveStep(activeStep - 1)}
                  className={`${themeClasses.textMuted} hover:text-black/80 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all`}
                >
                  <ChevronLeft size={18} /> Voltar
                </button>
                <div className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20`}>
                  <Check size={18} /> Tudo Pronto!
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
