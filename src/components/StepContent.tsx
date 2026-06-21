/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronRight, ChevronLeft, Wand2, ChevronDown, Upload, Image as ImageIcon, Loader2, Languages, Trash2, X, Copy, ZoomIn } from "lucide-react";
import { Option, Step, SelectionState, ColorPaletteOption } from "../types";
import { STYLES, COLOR_PALETTES, VISUAL_TAGS, LUTS, GRADING_TECHNIQUES } from "../data/constants";
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
  handleAnalyzeReference: (fileOrUrl: File | string) => void;
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
  customPalettes: ColorPaletteOption[];
  onSaveCustomPalette: (name: string, colors: string[]) => void;
  onDeleteCustomPalette: (id: string) => void;
  isPremium?: boolean;
  isAnalyzingMaster?: boolean;
  masterExplanation?: any;
  handleAskMasterDirector?: (val: string) => void;
  setShowPremiumUpgradeModal?: (val: boolean) => void;
  setMasterExplanation?: (val: any) => void;
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
  addToast,
  customPalettes,
  onSaveCustomPalette,
  onDeleteCustomPalette,
  isPremium = false,
  isAnalyzingMaster = false,
  masterExplanation = null,
  handleAskMasterDirector = () => {},
  setShowPremiumUpgradeModal = () => {},
  setMasterExplanation = () => {}
}: StepContentProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('1. Pintura Tradicional');
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [customPaletteName, setCustomPaletteName] = useState('');
  const [selectedZoomImage, setSelectedZoomImage] = useState<{ src: string; label: string; prompt: string } | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [masterInputText, setMasterInputText] = useState('');
  const [masterMode, setMasterMode] = useState<'text' | 'image'>('text');
  const [imageUrlInput, setImageUrlInput] = useState('');


  // --- 60-30-10 Color Rule Helpers & Effects ---
  const handleToggleColorRule = () => {
    const isActivating = !selections.useColorRule603010;
    setSelections((prev: any) => ({
      ...prev,
      useColorRule603010: isActivating,
      colorRule603010: isActivating ? {
        dominant: prev.colorPalette[0] || '',
        secondary: prev.colorPalette[1] || prev.colorPalette[0] || '',
        accent: prev.colorPalette[2] || prev.colorPalette[1] || prev.colorPalette[0] || ''
      } : prev.colorRule603010
    }));
  };

  const handleSetRuleColor = (role: 'dominant' | 'secondary' | 'accent', color: string) => {
    setSelections((prev: any) => ({
      ...prev,
      colorRule603010: {
        ...prev.colorRule603010,
        [role]: color
      }
    }));
  };

  const getContrastColor = (hexColor: string) => {
    if (!hexColor || !hexColor.startsWith('#')) return '#ffffff';
    try {
      const rgb = hexToRgb(hexColor);
      const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
      return brightness > 128 ? '#1c1917' : '#ffffff';
    } catch (e) {
      return '#ffffff';
    }
  };

  useEffect(() => {
    if (selections.colorPalette && selections.colorPalette.length > 0) {
      const currentPalette = selections.colorPalette;
      const rule = selections.colorRule603010 || { dominant: '', secondary: '', accent: '' };
      
      const isDomValid = currentPalette.includes(rule.dominant);
      const isSecValid = currentPalette.includes(rule.secondary);
      const isAccValid = currentPalette.includes(rule.accent);
      
      if (!isDomValid || !isSecValid || !isAccValid || !rule.dominant || !rule.secondary || !rule.accent) {
        setSelections((prev: any) => ({
          ...prev,
          colorRule603010: {
            dominant: currentPalette[0] || '',
            secondary: currentPalette[1] || currentPalette[0] || '',
            accent: currentPalette[2] || currentPalette[1] || currentPalette[0] || ''
          }
        }));
      }
    }
  }, [selections.colorPalette]);

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
    } else if (activeStep === 7) {
      setExpandedCategory('1. Cenários Naturais');
    } else if (activeStep === 10) {
      setExpandedCategory('1. Efeitos Ópticos');
    } else {
      setExpandedCategory(null);
    }
  }, [activeStep]);

  const [colorMode, setColorMode] = useState<'extract' | 'presets' | 'luts' | 'techniques'>('extract');
  const [isExtractingColors, setIsExtractingColors] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
  const [colorCount, setColorCount] = useState<number>(5);

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
    addToast(
      tag.id === 'turnaround-tag'
        ? `Configuração de Turnaround aplicada! Pronto para criar a folha de modelo.`
        : tag.id === 'expressions-tag'
        ? `Configuração de Folha de Expressões aplicada! Pronto para gerar os rostos.`
        : tag.id === 'poses-tag'
        ? `Configuração de Folha de Poses aplicada! Pronto para as poses.`
        : `Clima "${tag.label}" aplicado! Enquadramento e luz configurados.`,
      'success'
    );
  };

  const extractColorsFromImage = (src: string, count: number, showToast = false) => {
    setIsExtractingColors(true);
    const img = new Image();
    if (src.startsWith('http') || src.startsWith('//')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsExtractingColors(false);
        return;
      }

      canvas.width = 50;
      canvas.height = 50;

      try {
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

        const extractedHexColors = colors.slice(0, count).map(c => rgbToHexStr(c.r, c.g, c.b));

        setSelections((prev: any) => ({
          ...prev,
          colorPalette: extractedHexColors,
          colorPaletteId: 'custom'
        }));
        
        setIsExtractingColors(false);
        if (showToast) {
          addToast('Paleta extraída com sucesso da imagem!', 'success');
        }
      } catch (err) {
        console.error('Erro de CORS:', err);
        setIsExtractingColors(false);
        addToast('Erro de segurança (CORS): A imagem externa impede a leitura direta de pixels. Baixe a imagem e faça o upload local.', 'error');
        setTempImageSrc(null);
      }
    };
    img.onerror = () => {
      setIsExtractingColors(false);
      addToast('Erro ao carregar imagem para extração de cores. Verifique a URL ou o arquivo.', 'error');
      setTempImageSrc(null);
    };
    img.src = src;
  };

  const handleColorImageUpload = (file: File) => {
    setIsExtractingColors(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setTempImageSrc(src);
      extractColorsFromImage(src, colorCount, true);
    };
    reader.onerror = () => {
      setIsExtractingColors(false);
      addToast('Erro ao ler o arquivo de imagem.', 'error');
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (tempImageSrc) {
      extractColorsFromImage(tempImageSrc, colorCount, false);
    }
  }, [colorCount, tempImageSrc]);

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
              <div className="space-y-4">
                <textarea 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: A young detective sitting alone in a crowded bar..."
                  className={`w-full h-48 rounded-2xl p-6 transition-all text-lg resize-none border outline-none focus:ring-2 focus:ring-[#8b5a2b]/20 ${themeClasses.input}`}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>

              {/* Diretor Master Premium */}
              <div className={`p-6 rounded-3xl border relative overflow-hidden ${
                theme === 'dark' 
                  ? 'bg-zinc-900/60 border-amber-500/30' 
                  : 'bg-white/70 border-amber-500/40 shadow-md'
              }`}>
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎬</span>
                    <div>
                      <h3 className="font-bold text-base flex items-center gap-1.5">
                        Master Cinematic Director 
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-zinc-950 font-black tracking-wider uppercase">
                          Premium
                        </span>
                      </h3>
                      <p className={`${themeClasses.textMuted} text-xs`}>
                        O Diretor de Fotografia e Arte automatiza todo o setup do app baseado na sua ideia ou imagem de referência.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Seleção de Modo do Diretor Master */}
                <div className="flex gap-2 border-b border-zinc-200/40 dark:border-zinc-800/40 pb-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setMasterMode('text')}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                      masterMode === 'text'
                        ? 'bg-amber-500 text-zinc-950 shadow-sm'
                        : `${themeClasses.textMuted} hover:text-zinc-200`
                    }`}
                  >
                    💡 Descrever Ideia (Texto)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMasterMode('image')}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                      masterMode === 'image'
                        ? 'bg-amber-500 text-zinc-950 shadow-sm'
                        : `${themeClasses.textMuted} hover:text-zinc-200`
                    }`}
                  >
                    📸 Imagem de Referência (Modo Mestre)
                  </button>
                </div>

                {masterMode === 'text' ? (
                  // Aba Texto (Premium)
                  !isPremium ? (
                    <div className="relative p-6 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/30 flex flex-col items-center gap-4 text-center">
                      <p className={`text-xs max-w-md ${themeClasses.textMuted}`}>
                        Escreva um conceito simples (como "guerreiro medieval na neve") e o Especialista Master configurará todo o aplicativo (câmera, lente, iluminação, paleta 60-30-10, estilos e texturas) de forma otimizada para você, além de explicar detalhadamente cada decisão.
                      </p>
                      <button
                        onClick={() => setShowPremiumUpgradeModal(true)}
                        className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all transform active:scale-95 flex items-center gap-2"
                      >
                        <span>💎</span> Ativar Acesso Premium (R$ 29,90)
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input 
                          type="text"
                          value={masterInputText}
                          onChange={(e) => setMasterInputText(e.target.value)}
                          placeholder="Ex: Um astronauta caminhando em uma floresta rosa alienígena ao pôr do sol..."
                          className={`flex-1 px-4 py-3 rounded-xl border outline-none text-sm ${themeClasses.input}`}
                          disabled={isAnalyzingMaster}
                        />
                        <button
                          onClick={() => handleAskMasterDirector(masterInputText)}
                          disabled={isAnalyzingMaster || !masterInputText.trim()}
                          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isAnalyzingMaster ? (
                            <>
                              <Loader2 size={14} className="animate-spin text-zinc-950" /> Invocando...
                            </>
                          ) : (
                            <>
                              Invocar Diretor 🎬
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )
                ) : (
                  // Aba Imagem (Modo Mestre) - Liberada para todos
                  <div className="space-y-4">
                    <div className="relative group min-h-[140px]">
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
                      <div className={`p-6 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3 text-center ${
                        isAnalyzing 
                          ? 'border-indigo-500 bg-indigo-500/5' 
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-indigo-400 hover:bg-zinc-900/10'
                      }`}>
                        {isAnalyzing ? (
                          <>
                            <div className="relative">
                              <Loader2 size={32} className="text-indigo-500 animate-spin" />
                              <ImageIcon size={16} className="absolute inset-0 m-auto text-indigo-300" />
                            </div>
                            <div>
                              <div className="font-bold text-indigo-500 text-sm">Mestre IA Analisando...</div>
                              <p className="text-[10px] text-zinc-400 mt-0.5">Identificando estilos, luz e composição da imagem</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-105 transition-all shadow-inner">
                              <Upload size={18} className="text-zinc-400 group-hover:text-indigo-500 transition-colors" />
                            </div>
                            <div>
                              <div className="font-bold text-zinc-300 text-xs">Arraste ou clique para upload</div>
                              <p className="text-[9px] text-zinc-500 mt-0.5">Formatos suportados: PNG, JPG, WEBP</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="h-[1px] bg-zinc-200 dark:bg-zinc-800/60 flex-1" />
                      <span className="text-[10px] uppercase font-bold text-zinc-500">ou insira a URL da imagem</span>
                      <div className="h-[1px] bg-zinc-200 dark:bg-zinc-800/60 flex-1" />
                    </div>

                    <div className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="Insira o link da imagem (ex: https://site.com/imagem.jpg)"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        className={`flex-1 px-4 py-2.5 rounded-xl border outline-none text-xs ${themeClasses.input}`}
                        disabled={isAnalyzing}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (imageUrlInput.trim()) {
                            handleAnalyzeReference(imageUrlInput.trim());
                          }
                        }}
                        disabled={isAnalyzing || !imageUrlInput.trim()}
                        className="px-5 py-2.5 bg-zinc-800 dark:bg-zinc-700 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-1.5"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 size={12} className="animate-spin" /> Analisando
                          </>
                        ) : (
                          <>
                            Analisar
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
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
              
              {activeStep === 9 || activeStep === 2 || activeStep === 3 || activeStep === 4 || activeStep === 5 || activeStep === 6 || activeStep === 7 || activeStep === 10 ? (
                <div className="space-y-3">
                  {Array.from(new Set(getCurrentOptions(activeStep).map(s => s.subCategory))).filter(Boolean).map(subCat => (
                    <div key={subCat} className={`border rounded-2xl transition-colors ${themeClasses.card} ${
                      expandedCategory === subCat ? 'overflow-visible' : 'overflow-hidden'
                    }`}>
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
                                  <div
                                    key={option.id}
                                    role="button"
                                    tabIndex={0}
                                    onMouseEnter={() => setHoveredOption(option.id)}
                                    onMouseLeave={() => setHoveredOption(null)}
                                    onClick={() => handleSelect(option.category, option.id)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter' || e.key === ' ') {
                                        handleSelect(option.category, option.id);
                                      }
                                    }}
                                    className={`cursor-pointer group relative p-4 rounded-xl border text-left transition-all ${
                                      (option.category === 'style' || option.image) ? '' : 'overflow-hidden'
                                    } ${
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
                                    {/* Zoom Icon Button for Styles/Images */}
                                    {(option.image || option.category === 'style') && (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedZoomImage({
                                            src: option.image || `/images/styles/${option.id}.png`,
                                            label: option.label,
                                            prompt: option.prompt
                                          });
                                        }}
                                        className={`absolute bottom-2 right-2 p-1 rounded-lg border transition-all z-20 ${
                                          isSelected
                                            ? 'bg-white/20 border-white/20 text-white hover:bg-white/30'
                                            : theme === 'dark'
                                            ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white'
                                            : 'bg-white border-zinc-200 hover:bg-zinc-100 text-zinc-600 hover:text-black'
                                        } opacity-0 group-hover:opacity-100 shadow-sm`}
                                        title="Visualizar demonstração ampliada"
                                      >
                                        <ZoomIn size={12} />
                                      </button>
                                    )}
                                    {/* Preview Image on Hover */}
                                    <AnimatePresence>
                                      {hoveredOption === option.id && (option.image || option.category === 'style') && (
                                        <motion.div 
                                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                          animate={{ opacity: 1, scale: 1, y: 0 }}
                                          exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                          transition={{ duration: 0.15 }}
                                          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-48 h-48 rounded-2xl border-4 ${
                                            theme === 'dark' ? 'border-indigo-500' : 'border-[#8b5a2b]'
                                          } shadow-2xl pointer-events-none overflow-hidden bg-zinc-950`}
                                        >
                                          <img 
                                            src={option.image || `/images/styles/${option.id}.png`} 
                                            alt={option.label} 
                                            className="w-full h-full object-cover" 
                                            onError={(e) => {
                                              (e.target as HTMLImageElement).src = '/images/styles/default.png';
                                            }}
                                          />
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
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
                          <div
                            key={option.id}
                            role="button"
                            tabIndex={0}
                            onMouseEnter={() => setHoveredOption(option.id)}
                            onMouseLeave={() => setHoveredOption(null)}
                            onClick={() => handleSelect(option.category, option.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                handleSelect(option.category, option.id);
                              }
                            }}
                            className={`cursor-pointer group relative p-4 rounded-2xl border text-left transition-all ${
                              (option.category === 'style' || option.image) ? '' : 'overflow-hidden'
                            } ${
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
                            {/* Zoom Icon Button for Styles/Images */}
                            {(option.image || option.category === 'style') && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedZoomImage({
                                    src: option.image || `/images/styles/${option.id}.png`,
                                    label: option.label,
                                    prompt: option.prompt
                                  });
                                }}
                                className={`absolute bottom-2 right-2 p-1 rounded-lg border transition-all z-20 ${
                                  isSelected
                                    ? 'bg-white/20 border-white/20 text-white hover:bg-white/30'
                                    : theme === 'dark'
                                    ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white'
                                    : 'bg-white border-zinc-200 hover:bg-zinc-100 text-zinc-600 hover:text-black'
                                } opacity-0 group-hover:opacity-100 shadow-sm`}
                                title="Visualizar demonstração ampliada"
                              >
                                <ZoomIn size={12} />
                              </button>
                            )}
                            {/* Preview Image on Hover */}
                            <AnimatePresence>
                              {hoveredOption === option.id && (option.image || option.category === 'style') && (
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                  transition={{ duration: 0.15 }}
                                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-48 h-48 rounded-2xl border-4 ${
                                    theme === 'dark' ? 'border-indigo-500' : 'border-[#8b5a2b]'
                                  } shadow-2xl pointer-events-none overflow-hidden bg-zinc-950`}
                                >
                                  <img 
                                    src={option.image || `/images/styles/${option.id}.png`} 
                                    alt={option.label} 
                                    className="w-full h-full object-cover" 
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = '/images/styles/default.png';
                                    }}
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
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
                <div className="flex flex-wrap gap-2 p-1.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl max-w-2xl">
                  <button
                    type="button"
                    onClick={() => setColorMode('extract')}
                    className={`flex-1 py-2 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                      colorMode === 'extract'
                        ? themeClasses.optionActive + ' shadow-md'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    Extrair
                  </button>
                  <button
                    type="button"
                    onClick={() => setColorMode('presets')}
                    className={`flex-1 py-2 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                      colorMode === 'presets'
                        ? themeClasses.optionActive + ' shadow-md'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    Paletas
                  </button>
                  <button
                    type="button"
                    onClick={() => setColorMode('luts')}
                    className={`flex-1 py-2 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                      colorMode === 'luts'
                        ? themeClasses.optionActive + ' shadow-md'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    LUTs de Cor
                  </button>
                  <button
                    type="button"
                    onClick={() => setColorMode('techniques')}
                    className={`flex-1 py-2 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                      colorMode === 'techniques'
                        ? themeClasses.optionActive + ' shadow-md'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    Técnicas de Grading
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
                          <>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleColorImageUpload(file);
                              }}
                            />
                            <div className="flex flex-col items-center gap-3 w-full h-full py-6 pointer-events-none">
                              <div className="p-4 bg-[#8b5a2b]/10 text-[#8b5a2b] rounded-2xl">
                                {isExtractingColors ? <Loader2 className="animate-spin" size={24} /> : <Upload size={24} />}
                              </div>
                              <div>
                                <span className="font-bold text-sm block">Clique para fazer upload</span>
                                <span className="text-xs text-zinc-400">Arraste e solte uma imagem aqui</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* URL de imagem alternativa */}
                      {!tempImageSrc && (
                        <div className="space-y-2">
                          <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-500">
                            Ou use a URL de uma imagem
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              value={imageUrl}
                              onChange={(e) => setImageUrl(e.target.value)}
                              placeholder="Cole o link da imagem (ex: https://site.com/foto.jpg)"
                              className={`flex-1 px-4 py-3 text-xs rounded-xl border outline-none focus:ring-2 focus:ring-[#8b5a2b]/20 ${themeClasses.input}`}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (!imageUrl.trim()) {
                                  addToast('Por favor, insira uma URL válida.', 'error');
                                  return;
                                }
                                setIsExtractingColors(true);
                                setTempImageSrc(imageUrl.trim());
                                extractColorsFromImage(imageUrl.trim(), colorCount, true);
                                setImageUrl(''); // Limpa o campo
                              }}
                              disabled={isExtractingColors || !imageUrl.trim()}
                              className={`px-4 py-3 rounded-xl text-xs font-bold text-white transition-all ${themeClasses.accent} disabled:opacity-50`}
                            >
                              Carregar
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Selector for the number of colors */}
                      <div className={`p-4 rounded-2xl border ${themeClasses.card} space-y-3`}>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                            Quantidade de Cores a Extrair
                          </span>
                          <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 font-mono">
                            {colorCount} {colorCount === 1 ? 'cor' : 'cores'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => setColorCount(prev => Math.max(1, prev - 1))}
                            disabled={colorCount <= 1}
                            className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold text-sm transition-all hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 disabled:opacity-40 disabled:pointer-events-none ${themeClasses.option}`}
                          >
                            -
                          </button>
                          <input
                            type="range"
                            min="1"
                            max="16"
                            value={colorCount}
                            onChange={(e) => setColorCount(parseInt(e.target.value))}
                            className="flex-1 accent-indigo-500 cursor-pointer h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none"
                          />
                          <button
                            type="button"
                            onClick={() => setColorCount(prev => Math.min(16, prev + 1))}
                            disabled={colorCount >= 16}
                            className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold text-sm transition-all hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 disabled:opacity-40 disabled:pointer-events-none ${themeClasses.option}`}
                          >
                            +
                          </button>
                        </div>
                        <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
                          <span>1 cor</span>
                          <span>5</span>
                          <span>10</span>
                          <span>16 cores max</span>
                        </div>
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
                        <div className="mt-4 p-4 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl bg-black/5 dark:bg-white/5 space-y-3">
                          <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-500">
                            Salvar Paleta Personalizada
                          </label>
                          <div className="flex gap-2">
                            <input 
                              type="text"
                              value={customPaletteName}
                              onChange={(e) => setCustomPaletteName(e.target.value)}
                              placeholder="Dê um nome para a paleta..."
                              className={`flex-1 px-3 py-2 text-xs rounded-xl border outline-none focus:ring-1 focus:ring-[#8b5a2b]/20 ${themeClasses.input}`}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (!customPaletteName.trim()) {
                                  addToast('Por favor, digite um nome para a paleta.', 'error');
                                  return;
                                }
                                onSaveCustomPalette(customPaletteName.trim(), selections.colorPalette);
                                setCustomPaletteName('');
                              }}
                              className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-all ${themeClasses.accent}`}
                            >
                              Salvar
                            </button>
                          </div>
                        </div>
                      )}

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
                      {[...customPalettes, ...COLOR_PALETTES].map((preset) => {
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
                                <h3 className="font-bold text-sm flex items-center gap-2">
                                  {preset.name}
                                  {preset.id.startsWith('custom-') && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#8b5a2b]/10 text-[#8b5a2b] dark:bg-indigo-500/10 dark:text-indigo-400 font-bold border border-[#8b5a2b]/20 dark:border-indigo-500/20">
                                      Custom
                                    </span>
                                  )}
                                </h3>
                                <p className="text-[10px] leading-tight opacity-60 mt-1">{preset.description}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {preset.id.startsWith('custom-') && onDeleteCustomPalette && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onDeleteCustomPalette(preset.id);
                                    }}
                                    className="p-1 hover:bg-rose-500/10 hover:text-rose-500 text-zinc-400 rounded transition-colors animate-in fade-in"
                                    title="Excluir paleta"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                                {isSelected && (
                                  <div className="p-1 bg-[#8b5a2b] text-white rounded-full">
                                    <Check size={12} />
                                  </div>
                                )}
                              </div>
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

                {colorMode === 'luts' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-1">
                      {LUTS.map((lut) => {
                        const isSelected = selections.lutId === lut.id;
                        return (
                          <div 
                            key={lut.id}
                            onClick={() => {
                              setSelections((prev: any) => ({
                                ...prev,
                                lutId: isSelected ? '' : lut.id
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
                                <h3 className="font-bold text-sm flex items-center gap-2">
                                  {lut.label}
                                </h3>
                                <p className="text-[10px] leading-tight opacity-60 mt-1">{lut.description || lut.prompt}</p>
                              </div>
                              {isSelected && (
                                <div className="p-1 bg-[#8b5a2b] text-white rounded-full">
                                  <Check size={12} />
                                </div>
                              )}
                            </div>
                            
                            {/* Representação visual colorida do LUT */}
                            <div className={`h-6 rounded-lg overflow-hidden flex shadow-inner border border-black/5 ${
                              lut.id.includes('kodak') ? 'bg-gradient-to-r from-amber-700 via-orange-600 to-amber-200' :
                              lut.id.includes('fuji') ? 'bg-gradient-to-r from-emerald-800 via-green-600 to-amber-300' :
                              lut.id === 'lut-polaroid' ? 'bg-gradient-to-r from-zinc-600 via-zinc-400 to-amber-100' :
                              lut.id.includes('teal-orange') || lut.id.includes('teal-orange-contrast') || lut.id === 'lut-ps-teal-orange' ? 'bg-gradient-to-r from-cyan-900 via-cyan-600 to-orange-500' :
                              lut.id === 'lut-cyberpunk' ? 'bg-gradient-to-r from-purple-800 via-fuchsia-600 to-cyan-400' :
                              lut.id === 'lut-blade-runner' ? 'bg-gradient-to-r from-indigo-950 via-zinc-800 to-yellow-600' :
                              lut.id === 'lut-a24' ? 'bg-gradient-to-r from-stone-800 via-stone-500 to-amber-200' :
                              lut.id === 'lut-noir' ? 'bg-gradient-to-r from-black via-zinc-500 to-white' :
                              lut.id === 'lut-vhs' ? 'bg-gradient-to-r from-rose-700 via-violet-600 to-teal-400' :
                              lut.id === 'lut-anime-90s' ? 'bg-gradient-to-r from-pink-400 via-blue-300 to-yellow-200' :
                              lut.id.includes('rec709') || lut.id.includes('v709') ? 'bg-gradient-to-r from-blue-700 via-indigo-500 to-red-400' :
                              lut.id === 'lut-bleach-bypass' ? 'bg-gradient-to-r from-zinc-850 via-stone-600 to-zinc-300' :
                              lut.id === 'lut-ps-crisp-warm' ? 'bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-300' :
                              lut.id === 'lut-ps-crisp-winter' ? 'bg-gradient-to-r from-blue-900 via-cyan-700 to-sky-200' :
                              lut.id === 'lut-ps-futuristic-bleak' ? 'bg-gradient-to-r from-zinc-800 via-slate-700 to-zinc-500' :
                              lut.id === 'lut-ps-horror-blue' ? 'bg-gradient-to-r from-slate-950 via-teal-900 to-blue-700' :
                              lut.id === 'lut-ps-moonlight' ? 'bg-gradient-to-r from-indigo-950 via-indigo-800 to-blue-300' :
                              lut.id === 'lut-ps-night-from-day' ? 'bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-800' :
                              lut.id === 'lut-ps-fall-colors' ? 'bg-gradient-to-r from-red-700 via-orange-600 to-yellow-500' :
                              lut.id === 'lut-ps-foggy-night' ? 'bg-gradient-to-r from-slate-900 via-zinc-700 to-slate-500' :
                              lut.id === 'lut-ps-late-sunset' ? 'bg-gradient-to-r from-purple-800 via-orange-600 to-amber-400' :
                              lut.id === 'lut-pr-blue-ice' ? 'bg-gradient-to-r from-cyan-800 via-blue-500 to-sky-200' :
                              lut.id === 'lut-pr-gold-heat' ? 'bg-gradient-to-r from-red-800 via-amber-600 to-yellow-500' :
                              lut.id === 'lut-filmstock-50' ? 'bg-gradient-to-r from-slate-800 via-slate-600 to-zinc-400' :
                              'bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-400'
                            }`} />
                          </div>
                        );
                      })}
                    </div>

                    {selections.lutId && (
                      <div className="flex">
                        <button 
                          type="button"
                          onClick={() => {
                            setSelections((prev: any) => ({ ...prev, lutId: '' }));
                          }}
                          className="px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-rose-500/10 hover:text-rose-500 transition-colors font-bold text-xs"
                        >
                          Limpar LUT Selecionado
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {colorMode === 'techniques' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-1">
                      {GRADING_TECHNIQUES.map((tech) => {
                        const isSelected = selections.gradingTechniques?.includes(tech.id);
                        return (
                          <div 
                            key={tech.id}
                            onClick={() => {
                              setSelections((prev: any) => {
                                const current = prev.gradingTechniques || [];
                                const nextTech = current.includes(tech.id)
                                  ? current.filter((id: string) => id !== tech.id)
                                  : [...current, tech.id];
                                return { ...prev, gradingTechniques: nextTech };
                              });
                            }}
                            className={`p-4 rounded-3xl border text-left cursor-pointer transition-all flex flex-col gap-2 group relative overflow-hidden ${
                              isSelected
                                ? themeClasses.optionActive + ' ring-4 ring-[#8b5a2b]/10'
                                : themeClasses.option + ' hover:border-[#8b5a2b]/40'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-sm flex items-center gap-2">
                                  {tech.label}
                                </h3>
                                <p className="text-[10px] leading-tight opacity-60 mt-1">{tech.description}</p>
                              </div>
                              <div className={`p-1 rounded-full border transition-all ${
                                isSelected 
                                  ? 'bg-[#8b5a2b] text-white border-transparent' 
                                  : 'text-transparent border-zinc-400 dark:border-zinc-700'
                              }`}>
                                <Check size={12} />
                              </div>
                            </div>
                            <span className="text-[9px] font-mono opacity-50 truncate max-w-xs block pt-1 border-t border-black/5 dark:border-white/5">{tech.prompt}</span>
                          </div>
                        );
                      })}
                    </div>

                    {selections.gradingTechniques?.length > 0 && (
                      <div className="flex">
                        <button 
                          type="button"
                          onClick={() => {
                            setSelections((prev: any) => ({ ...prev, gradingTechniques: [] }));
                          }}
                          className="px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-rose-500/10 hover:text-rose-500 transition-colors font-bold text-xs"
                        >
                          Limpar Técnicas Selecionadas
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Painel da Regra de Cores 60-30-10 */}
                {selections.colorPalette && selections.colorPalette.length > 0 && (
                  <div className={`mt-6 p-6 rounded-3xl border ${themeClasses.card} space-y-6 animate-in fade-in duration-300`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-black text-sm uppercase tracking-wider flex items-center gap-2">
                          <span>🎨</span> Regra de Cores 60-30-10 (Equilíbrio Visual)
                        </h3>
                        <p className={`${themeClasses.textMuted} text-xs mt-1`}>
                          Distribua as cores da sua paleta em proporções estratégicas para guiar o olhar do observador.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={!!selections.useColorRule603010} 
                          onChange={handleToggleColorRule}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        <span className="ml-3 text-xs font-bold uppercase tracking-wider select-none">
                          {selections.useColorRule603010 ? 'Ativo' : 'Inativo'}
                        </span>
                      </label>
                    </div>

                    {selections.useColorRule603010 && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                        
                        {/* Barra de Proporção Visual */}
                        <div className="space-y-2">
                          <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-500">
                            Visualização da Proporção na Cena (Mockup)
                          </label>
                          <div className="flex h-16 w-full rounded-2xl overflow-hidden shadow-lg border border-black/10 transition-all duration-500">
                            {/* Dominante 60% */}
                            <div 
                              className="h-full flex flex-col justify-center px-4 transition-all duration-500 relative group"
                              style={{ 
                                width: '60%', 
                                backgroundColor: selections.colorRule603010?.dominant || '#000',
                                color: getContrastColor(selections.colorRule603010?.dominant || '#000') 
                              }}
                            >
                              <span className="text-[10px] font-black tracking-widest uppercase opacity-75">Principal</span>
                              <span className="text-lg font-black font-mono">60%</span>
                              <span className="absolute bottom-1 right-2 text-[8px] font-mono opacity-50">
                                {selections.colorRule603010?.dominant}
                              </span>
                            </div>

                            {/* Secundária 30% */}
                            <div 
                              className="h-full flex flex-col justify-center px-4 transition-all duration-500 relative group border-l border-black/10"
                              style={{ 
                                width: '30%', 
                                backgroundColor: selections.colorRule603010?.secondary || '#555',
                                color: getContrastColor(selections.colorRule603010?.secondary || '#555') 
                              }}
                            >
                              <span className="text-[10px] font-black tracking-widest uppercase opacity-75">Apoio</span>
                              <span className="text-base font-black font-mono">30%</span>
                              <span className="absolute bottom-1 right-2 text-[8px] font-mono opacity-50">
                                {selections.colorRule603010?.secondary}
                              </span>
                            </div>

                            {/* Destaque 10% */}
                            <div 
                              className="h-full flex flex-col justify-center px-2 transition-all duration-500 relative group border-l border-black/10"
                              style={{ 
                                width: '10%', 
                                backgroundColor: selections.colorRule603010?.accent || '#aaa',
                                color: getContrastColor(selections.colorRule603010?.accent || '#aaa') 
                              }}
                            >
                              <span className="text-[8px] font-black tracking-wider uppercase opacity-75 truncate">Foco</span>
                              <span className="text-xs font-black font-mono">10%</span>
                              <span className="absolute bottom-1 right-1 text-[7px] font-mono opacity-50 truncate">
                                {selections.colorRule603010?.accent}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Seletores de Função de Cor */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          
                          {/* Card Dominante */}
                          <div className={`p-4 rounded-2xl border ${themeClasses.card} flex flex-col justify-between gap-4 transition-all`}>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-black uppercase tracking-wider text-indigo-500 dark:text-indigo-400">Dominante (60%)</span>
                                <div 
                                  className="w-5 h-5 rounded-md border border-black/15 shadow-sm"
                                  style={{ backgroundColor: selections.colorRule603010?.dominant }}
                                />
                              </div>
                              <p className="text-[10px] leading-tight text-zinc-400">
                                Ocupa o ambiente geral, fundo e a atmosfera principal da imagem.
                              </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-1.5">
                              {selections.colorPalette.map((color: string) => {
                                const isActive = selections.colorRule603010?.dominant === color;
                                return (
                                  <button
                                    key={color}
                                    type="button"
                                    onClick={() => handleSetRuleColor('dominant', color)}
                                    className={`w-7 h-7 rounded-full border transition-all ${
                                      isActive 
                                        ? 'ring-2 ring-indigo-500 scale-110 shadow-md border-white' 
                                        : 'border-black/15 hover:scale-105'
                                    }`}
                                    style={{ backgroundColor: color }}
                                    title={color}
                                  />
                                );
                              })}
                            </div>
                          </div>

                          {/* Card Secundária */}
                          <div className={`p-4 rounded-2xl border ${themeClasses.card} flex flex-col justify-between gap-4 transition-all`}>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-black uppercase tracking-wider text-emerald-500 dark:text-emerald-400">Secundária (30%)</span>
                                <div 
                                  className="w-5 h-5 rounded-md border border-black/15 shadow-sm"
                                  style={{ backgroundColor: selections.colorRule603010?.secondary }}
                                />
                              </div>
                              <p className="text-[10px] leading-tight text-zinc-400">
                                Ocupa elementos de apoio, roupas, objetos secundários e profundidade.
                              </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-1.5">
                              {selections.colorPalette.map((color: string) => {
                                const isActive = selections.colorRule603010?.secondary === color;
                                return (
                                  <button
                                    key={color}
                                    type="button"
                                    onClick={() => handleSetRuleColor('secondary', color)}
                                    className={`w-7 h-7 rounded-full border transition-all ${
                                      isActive 
                                        ? 'ring-2 ring-indigo-500 scale-110 shadow-md border-white' 
                                        : 'border-black/15 hover:scale-105'
                                    }`}
                                    style={{ backgroundColor: color }}
                                    title={color}
                                  />
                                );
                              })}
                            </div>
                          </div>

                          {/* Card Destaque */}
                          <div className={`p-4 rounded-2xl border ${themeClasses.card} flex flex-col justify-between gap-4 transition-all`}>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-black uppercase tracking-wider text-amber-500 dark:text-amber-400">Destaque (10%)</span>
                                <div 
                                  className="w-5 h-5 rounded-md border border-black/15 shadow-sm"
                                  style={{ backgroundColor: selections.colorRule603010?.accent }}
                                />
                              </div>
                              <p className="text-[10px] leading-tight text-zinc-400">
                                Reservada estritamente para o ponto focal ou ação principal para atrair o olhar.
                              </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-1.5">
                              {selections.colorPalette.map((color: string) => {
                                const isActive = selections.colorRule603010?.accent === color;
                                return (
                                  <button
                                    key={color}
                                    type="button"
                                    onClick={() => handleSetRuleColor('accent', color)}
                                    className={`w-7 h-7 rounded-full border transition-all ${
                                      isActive 
                                        ? 'ring-2 ring-indigo-500 scale-110 shadow-md border-white' 
                                        : 'border-black/15 hover:scale-105'
                                    }`}
                                    style={{ backgroundColor: color }}
                                    title={color}
                                  />
                                );
                              })}
                            </div>
                          </div>

                        </div>

                        {/* Bloco de Ajuda / Dica */}
                        <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-xs leading-relaxed space-y-2">
                          <div className="font-bold text-indigo-400 flex items-center gap-1.5">
                            <span>💡</span> Por que usar a Regra 60-30-10?
                          </div>
                          <p>
                            Esta regra ajuda o gerador de imagem da IA a entender a <strong>hierarquia de importância</strong> das cores. 
                            Em vez de misturar as cores igualmente (o que gera competição visual), a IA usará a cor de <strong>60% para o clima geral</strong>, 
                            a de <strong>30% para equilibrar</strong> e a de <strong>10% estritamente para o ponto focal</strong> (como o casaco do protagonista ou luzes mágicas).
                          </p>
                        </div>

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

              {/* Card Didático do Diretor Master */}
              {masterExplanation && (
                <div className={`p-6 rounded-3xl border relative overflow-hidden animate-in fade-in slide-in-from-top-4 ${
                  theme === 'dark' 
                    ? 'bg-zinc-900/60 border-amber-500/40 text-zinc-100' 
                    : 'bg-white/80 border-amber-500/50 text-[#433422] shadow-lg'
                }`}>
                  {/* Selo Dourado Flutuante */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-zinc-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    <span>🎬</span> Master Config
                  </div>

                  <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                    <span>✨</span> Direção e Concept Art
                  </h3>

                  <div className="space-y-4">
                    {/* Conceito de Direção */}
                    <div className="p-4 rounded-2xl bg-zinc-950/20 dark:bg-black/20 border border-black/5 dark:border-white/5">
                      <h4 className="text-xs font-black uppercase tracking-wider text-amber-500 mb-1.5">Conceito Visual e Narrativo</h4>
                      <p className="text-sm italic leading-relaxed">"{masterExplanation.concept}"</p>
                    </div>

                    {/* Decisões Didáticas */}
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-amber-500 mb-2">Análise Técnica e Didática</h4>
                      <p className="text-xs leading-relaxed whitespace-pre-wrap opacity-90">{masterExplanation.explanation}</p>
                    </div>

                    {/* Excluir Configurações do Diretor Master para voltar ao modo manual */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => {
                          setMasterExplanation(null);
                          addToast('Configurações do Especialista removidas. Você agora está no modo manual!', 'info');
                        }}
                        className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg border transition-all ${
                          theme === 'dark' 
                            ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white' 
                            : 'border-zinc-200 text-[#8b7e6a] hover:bg-black/5 hover:text-black'
                        }`}
                      >
                        Limpar Decisões do Diretor e Ajustar Manualmente
                      </button>
                    </div>
                  </div>
                </div>
              )}

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
                  { key: 'lutId', label: 'LUT de Cor', options: LUTS },
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
                          : [...customPalettes, ...COLOR_PALETTES].find(p => p.id === selections.colorPaletteId)?.name || 'Paleta de Cores'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Técnicas de Colorização (Múltiplas) */}
                {selections.gradingTechniques && selections.gradingTechniques.length > 0 && (
                  <div className={`col-span-full p-4 rounded-2xl border ${themeClasses.card}`}>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-3 block">Técnicas de Colorização Selecionadas</span>
                    <div className="flex flex-wrap gap-2">
                      {selections.gradingTechniques.map((id: string) => {
                        const option = GRADING_TECHNIQUES.find(o => o.id === id);
                        return (
                          <div key={id} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${themeClasses.optionActive}`}>
                            {option?.label || id}
                            <button 
                              onClick={() => setSelections((prev: any) => ({
                                ...prev,
                                gradingTechniques: (prev.gradingTechniques || []).filter((techId: string) => techId !== id)
                              }))} 
                              className="hover:text-rose-200 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        );
                      })}
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

      {/* Zoom Image Modal */}
      <AnimatePresence>
        {selectedZoomImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            {/* Backdrop with dark blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedZoomImage(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className={`relative z-10 max-w-xl w-full rounded-3xl overflow-hidden shadow-2xl border ${
                theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
              }`}
            >
              {/* Header */}
              <div className="p-5 border-b border-black/10 dark:border-white/10 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-base">{selectedZoomImage.label}</h3>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Demonstração de Estilo Ampliada</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedZoomImage(null)}
                  className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Image */}
              <div className="aspect-square w-full relative bg-zinc-950 flex items-center justify-center">
                <img
                  src={selectedZoomImage.src}
                  alt={selectedZoomImage.label}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/styles/default.png';
                  }}
                />
              </div>

              {/* Footer */}
              <div className="p-5 bg-black/5 dark:bg-white/5 border-t border-black/10 dark:border-white/10">
                <div className="text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1.5">Prompt de Estilo:</div>
                <p className="text-xs font-mono opacity-85 leading-relaxed break-words max-h-24 overflow-y-auto pr-1">{selectedZoomImage.prompt}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
