import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Palette,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  HelpCircle,
  Eye,
  Trash2,
  Brush,
  Layers,
  Sun,
  Flame,
  FileText,
  Maximize2,
  Info,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Plus,
  Edit2,
  Bookmark,
  FolderHeart,
  X,
  Save,
  Wand2,
  Pipette,
  Target,
  Shirt,
  User,
  Trees,
  PlusCircle
} from 'lucide-react';
import { Theme, UserAccount, ColorPaletteOption } from '../types';
import {
  DRAWING_TYPES,
  PAINTING_TECHNIQUES,
  COLOR_MOODS,
  LIGHTING_OPTIONS,
  LIGHTING_DIRECTIONS,
  LIGHTING_TYPES,
  LIGHTING_SHADOW_STYLES,
  TEMPERATURE_OPTIONS,
  PAPER_TEXTURES,
  PLATFORM_GUIDES,
  PRESET_ELEMENTS,
  buildColoristPrompt,
  PaintingTechniqueOption,
  ColorMoodOption,
  ElementColorAssignment,
  PresetElementOption,
  LightingDirectionOption,
  LightingTypeOption,
  LightingShadowStyleOption
} from '../data/coloristData';
import { PhotoshopColorPickerModal } from './PhotoshopColorPickerModal';
import { LightingCompassWidget } from './LightingCompassWidget';

interface ColoristStudioProps {
  theme: Theme;
  themeClasses: any;
  user: UserAccount | null;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  onConsumeCredit?: () => boolean;
  customPalettes: ColorPaletteOption[];
  onSaveCustomPalette: (name: string, colors: string[], category?: string, id?: string) => void;
  onDeleteCustomPalette: (id: string) => void;
}

export function ColoristStudio({
  theme,
  themeClasses,
  user,
  addToast,
  onConsumeCredit,
  customPalettes,
  onSaveCustomPalette,
  onDeleteCustomPalette
}: ColoristStudioProps) {
  // --- States ---
  const [drawingType, setDrawingType] = useState<string>('nanquim');
  const [selectedTechniqueId, setSelectedTechniqueId] = useState<string>('guache');
  const [techniqueCategory, setTechniqueCategory] = useState<string>('Todos');
  const [colorIntensity, setColorIntensity] = useState<'vibrant' | 'balanced' | 'muted' | 'monochrome'>('balanced');
  
  // Palette View Mode: 'moods' | 'custom' | 'creator'
  const [paletteTab, setPaletteTab] = useState<'moods' | 'custom' | 'creator'>('moods');
  const [paletteType, setPaletteType] = useState<'mood' | 'custom'>('mood');
  const [selectedMoodId, setSelectedMoodId] = useState<string>('drama-melancolia');
  const [selectedCustomPaletteId, setSelectedCustomPaletteId] = useState<string | null>(null);

  // Custom 60-30-10 rule states
  const [useCustom603010, setUseCustom603010] = useState<boolean>(false);
  const [customDominant, setCustomDominant] = useState<string>('#4F5D75');
  const [customSecondary, setCustomSecondary] = useState<string>('#747D8C');
  const [customAccent, setCustomAccent] = useState<string>('#ECCC68');

  // Palette Creator / Editor State
  const [editingPaletteId, setEditingPaletteId] = useState<string | null>(null);
  const [creatorName, setCreatorName] = useState<string>('');
  const [creatorCategory, setCreatorCategory] = useState<string>('Minhas Paletas');
  const [creatorColors, setCreatorColors] = useState<string[]>(['#2B5876', '#4E4376', '#F39C12', '#E74C3C', '#ECF0F1']);

  // Photoshop Color Picker Modal State
  const [psPickerOpen, setPsPickerOpen] = useState<boolean>(false);
  const [psPickerInitialColor, setPsPickerInitialColor] = useState<string>('#EFA549');
  const [psPickerTitle, setPsPickerTitle] = useState<string>('Seletor de Cores (Photoshop)');
  const [psPickerCallback, setPsPickerCallback] = useState<((hex: string) => void) | null>(null);

  // Lighting & Paper
  const [selectedLightingId, setSelectedLightingId] = useState<string>('soft-diffuse');
  const [lightingDirectionId, setLightingDirectionId] = useState<string>('top-left');
  const [lightingTypeId, setLightingTypeId] = useState<string>('directional-spot');
  const [lightingShadowStyle, setLightingShadowStyle] = useState<'soft' | 'hard' | 'volumetric'>('soft');
  const [selectedTemperatureId, setSelectedTemperatureId] = useState<string>('warm');
  const [selectedPaperId, setSelectedPaperId] = useState<string>('cold-press');
  const [customNotes, setCustomNotes] = useState<string>('');

  // Targeted Element Color Mapping State
  const [elementColors, setElementColors] = useState<ElementColorAssignment[]>([]);
  const [elementCategory, setElementCategory] = useState<'all' | 'character' | 'clothing' | 'environment' | 'custom'>('all');
  const [customElementName, setCustomElementName] = useState<string>('');
  const [customElementEnglish, setCustomElementEnglish] = useState<string>('');
  const [customElementColor, setCustomElementColor] = useState<string>('#3498DB');

  // Image Upload state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>('Midjourney');
  const [zoomModalImage, setZoomModalImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active items helpers
  const activeMood = useMemo(() => {
    return COLOR_MOODS.find(m => m.id === selectedMoodId) || COLOR_MOODS[0];
  }, [selectedMoodId]);

  const activeCustomPalette = useMemo(() => {
    if (!selectedCustomPaletteId) return null;
    return customPalettes.find(p => p.id === selectedCustomPaletteId) || null;
  }, [selectedCustomPaletteId, customPalettes]);

  const activeTechnique = useMemo(() => {
    return PAINTING_TECHNIQUES.find(t => t.id === selectedTechniqueId) || PAINTING_TECHNIQUES[0];
  }, [selectedTechniqueId]);

  // Open Photoshop Color Picker
  const openPhotoshopPicker = (initialColor: string, title: string, onSelect: (hex: string) => void) => {
    setPsPickerInitialColor(initialColor || '#EFA549');
    setPsPickerTitle(title);
    setPsPickerCallback(() => onSelect);
    setPsPickerOpen(true);
  };

  // Sync colors when selecting mood
  const handleMoodSelect = (mood: ColorMoodOption) => {
    setPaletteType('mood');
    setSelectedMoodId(mood.id);
    setSelectedCustomPaletteId(null);
    if (!useCustom603010) {
      setCustomDominant(mood.rule603010.dominant.toUpperCase());
      setCustomSecondary(mood.rule603010.secondary.toUpperCase());
      setCustomAccent(mood.rule603010.accent.toUpperCase());
    }
  };

  // Sync colors when selecting custom palette
  const handleCustomPaletteSelect = (palette: ColorPaletteOption) => {
    setPaletteType('custom');
    setSelectedCustomPaletteId(palette.id);
    if (!useCustom603010 && palette.colors.length >= 3) {
      setCustomDominant(palette.colors[0].toUpperCase());
      setCustomSecondary((palette.colors[1] || palette.colors[0]).toUpperCase());
      setCustomAccent((palette.colors[2] || palette.colors[0]).toUpperCase());
    }
  };

  // Open Creator for a new palette
  const handleStartCreatePalette = () => {
    setEditingPaletteId(null);
    setCreatorName('');
    setCreatorCategory('Minhas Paletas');
    setCreatorColors(['#3A6073', '#3A7BD5', '#FFD200', '#F12711', '#F5AF19']);
    setPaletteTab('creator');
  };

  // Open Creator for editing an existing palette
  const handleStartEditPalette = (palette: ColorPaletteOption) => {
    setEditingPaletteId(palette.id);
    setCreatorName(palette.name);
    setCreatorCategory(palette.category || 'Minhas Paletas');
    setCreatorColors(palette.colors.length > 0 ? palette.colors.map(c => c.toUpperCase()) : ['#3A6073', '#3A7BD5', '#FFD200']);
    setPaletteTab('creator');
  };

  // Save palette from creator
  const handleSaveCreatorPalette = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creatorName.trim()) {
      addToast('Por favor dê um nome para sua paleta de cores.', 'error');
      return;
    }
    if (creatorColors.length < 3) {
      addToast('A paleta deve conter pelo menos 3 cores.', 'error');
      return;
    }

    onSaveCustomPalette(creatorName.trim(), creatorColors, creatorCategory.trim(), editingPaletteId || undefined);
    
    setPaletteType('custom');
    setPaletteTab('custom');
    setEditingPaletteId(null);

    // Apply to 60-30-10 if not customized
    if (!useCustom603010) {
      setCustomDominant(creatorColors[0]);
      setCustomSecondary(creatorColors[1] || creatorColors[0]);
      setCustomAccent(creatorColors[2] || creatorColors[0]);
    }
  };

  // Add / remove color in creator
  const handleAddCreatorColor = () => {
    if (creatorColors.length >= 8) {
      addToast('Máximo de 8 cores por paleta atingido.', 'info');
      return;
    }
    const defaultColors = ['#E67E22', '#1ABC9C', '#9B59B6', '#34495E', '#E74C3C', '#2ECC71', '#F39C12'];
    const nextColor = defaultColors[creatorColors.length % defaultColors.length];
    setCreatorColors([...creatorColors, nextColor]);
  };

  const handleUpdateCreatorColor = (index: number, newHex: string) => {
    const updated = [...creatorColors];
    updated[index] = newHex.toUpperCase();
    setCreatorColors(updated);
  };

  const handleRemoveCreatorColor = (index: number) => {
    if (creatorColors.length <= 3) {
      addToast('Uma paleta precisa ter no mínimo 3 cores para a regra 60-30-10.', 'info');
      return;
    }
    setCreatorColors(creatorColors.filter((_, i) => i !== index));
  };

  // Sync paper suggestion when technique changes
  const handleTechniqueSelect = (tech: PaintingTechniqueOption) => {
    setSelectedTechniqueId(tech.id);
    if (tech.suggestedPaper) {
      setSelectedPaperId(tech.suggestedPaper);
    }
    if (tech.id === 'aguada-nanquim') {
      setColorIntensity('monochrome');
    } else if (colorIntensity === 'monochrome' && tech.id !== 'aguada-nanquim') {
      setColorIntensity('balanced');
    }
  };

  // --- Element Color Handlers ---
  const handleAssignElementColor = (
    elementId: string,
    name: string,
    englishLabel: string,
    colorHex: string,
    category: 'character' | 'clothing' | 'environment' | 'custom'
  ) => {
    const cleanHex = colorHex.toUpperCase();
    setElementColors(prev => {
      const existsIndex = prev.findIndex(item => item.id === elementId);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = {
          ...updated[existsIndex],
          name,
          englishLabel,
          colorHex: cleanHex,
          category
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: elementId,
          name,
          englishLabel,
          colorHex: cleanHex,
          category
        }
      ];
    });
  };

  const handleRemoveElementColor = (elementId: string) => {
    setElementColors(prev => prev.filter(item => item.id !== elementId));
  };

  const handleClearAllElementColors = () => {
    setElementColors([]);
    addToast('Todos os mapeamentos de cores pontuais foram removidos.', 'info');
  };

  const handleAddCustomElement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customElementName.trim()) {
      addToast('Digite o nome do elemento (Ex: Espada Mágica, Mochila de Couro...).', 'error');
      return;
    }
    const customId = `custom-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const label = customElementName.trim();
    const english = customElementEnglish.trim() || label;
    handleAssignElementColor(customId, label, english, customElementColor, 'custom');
    addToast(`Elemento "${label}" adicionado ao mapeamento com a cor ${customElementColor.toUpperCase()}!`, 'success');
    setCustomElementName('');
    setCustomElementEnglish('');
  };

  // Build Final Prompt in Real-Time
  const generatedPrompt = useMemo(() => {
    const isCustom = paletteType === 'custom' && activeCustomPalette;
    return buildColoristPrompt({
      drawingType,
      techniqueId: selectedTechniqueId,
      paletteId: isCustom ? activeCustomPalette.id : selectedMoodId,
      useCustom603010,
      rule603010: {
        dominant: customDominant,
        secondary: customSecondary,
        accent: customAccent
      },
      colorMoodId: selectedMoodId,
      lightingId: selectedLightingId,
      lightingDirectionId,
      lightingTypeId,
      lightingShadowStyle,
      temperatureId: selectedTemperatureId,
      paperId: selectedPaperId,
      colorIntensity,
      customPaletteName: isCustom ? activeCustomPalette.name : undefined,
      customPaletteColors: isCustom ? activeCustomPalette.colors : undefined,
      elementColors,
      customNotes
    });
  }, [
    drawingType,
    selectedTechniqueId,
    paletteType,
    activeCustomPalette,
    selectedMoodId,
    useCustom603010,
    customDominant,
    customSecondary,
    customAccent,
    selectedLightingId,
    lightingDirectionId,
    lightingTypeId,
    lightingShadowStyle,
    selectedTemperatureId,
    selectedPaperId,
    colorIntensity,
    elementColors,
    customNotes
  ]);

  // Handle Image Upload
  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      addToast('Por favor envie um arquivo de imagem válido (PNG, JPG, WebP).', 'error');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      addToast('A imagem deve ter no máximo 15MB.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      addToast('Line art carregada com sucesso!', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleCopyPrompt = () => {
    if (onConsumeCredit) {
      const allowed = onConsumeCredit();
      if (!allowed) return;
    }
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    addToast('Prompt de Colorista copiado para a área de transferência!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setDrawingType('nanquim');
    setSelectedTechniqueId('guache');
    setPaletteType('mood');
    setSelectedMoodId('drama-melancolia');
    setSelectedCustomPaletteId(null);
    setColorIntensity('balanced');
    setUseCustom603010(false);
    setSelectedLightingId('soft-diffuse');
    setLightingDirectionId('top-left');
    setLightingTypeId('directional-spot');
    setLightingShadowStyle('soft');
    setSelectedTemperatureId('warm');
    setSelectedPaperId('cold-press');
    setElementColors([]);
    setElementCategory('all');
    setCustomElementName('');
    setCustomElementEnglish('');
    setCustomNotes('');
    setPaletteTab('moods');
    addToast('Configurações de colorização resetadas.', 'info');
  };

  // Filter techniques
  const filteredTechniques = useMemo(() => {
    if (techniqueCategory === 'Todos') return PAINTING_TECHNIQUES;
    return PAINTING_TECHNIQUES.filter(t => t.category === techniqueCategory);
  }, [techniqueCategory]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner de Apresentação */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden shadow-xl ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-indigo-950/40 via-zinc-900 to-zinc-950 border-indigo-500/20' 
          : 'bg-gradient-to-br from-[#f5ede3] via-[#ece2d0] to-[#dfd3be] border-[#d3cbb3]'
      }`}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Palette size={14} className="animate-pulse" />
              Estúdio do Colorista & Técnicas de Pintura
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Colorize seus Esboços & Line Arts com IA
            </h1>
            <p className={`text-sm ${themeClasses.textMuted} leading-relaxed`}>
              Gere prompts especializados para pintar e dar volume ao seu traço original em nanquim, grafite ou vetor, preservando 100% da anatomia e composição do seu desenho.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 ${
                theme === 'dark' 
                  ? 'bg-zinc-800/80 border-zinc-700 hover:bg-zinc-700 text-zinc-300' 
                  : 'bg-white border-[#d3cbb3] hover:bg-zinc-50 text-[#8b5a2b]'
              }`}
              title="Restaurar padrões"
            >
              <RotateCcw size={14} />
              Resetar
            </button>
            <button
              onClick={handleCopyPrompt}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 ${
                theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20' : 'bg-[#8b5a2b] hover:bg-[#724820] shadow-[#8b5a2b]/20'
              }`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copiado!' : 'Copiar Prompt'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid Principal: 2 Colunas (8 cols Controles + 4 cols Preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ================= COLUNA DA ESQUERDA: CONTROLES ================= */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* 1. SEÇÃO: TIPO DE TRAÇO & UPLOAD DA LINE ART */}
          <section className={`p-6 rounded-3xl border ${themeClasses.card}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                  theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-[#8b5a2b] text-white'
                }`}>1</span>
                <div>
                  <h2 className="text-base font-bold">Diagnóstico do Traço & Upload da Arte</h2>
                  <p className={`text-xs ${themeClasses.textMuted}`}>Indique o estilo do seu desenho original para máxima fidelidade no preenchimento.</p>
                </div>
              </div>
            </div>

            {/* Grid de Tipos de Traço */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
              {DRAWING_TYPES.map((dt) => {
                const isSelected = drawingType === dt.id;
                return (
                  <button
                    key={dt.id}
                    type="button"
                    onClick={() => setDrawingType(dt.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? themeClasses.optionActive
                        : themeClasses.option + ' hover:border-[#8b5a2b]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{dt.icon}</span>
                      <span className="text-xs font-bold leading-tight line-clamp-1">{dt.label}</span>
                    </div>
                    <p className={`text-[11px] ${themeClasses.textMuted} line-clamp-2 leading-tight`}>
                      {dt.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Área de Drag & Drop de Imagem */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-5 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-3 ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : uploadedImage
                  ? 'border-emerald-500/50 bg-emerald-500/5'
                  : theme === 'dark'
                  ? 'border-zinc-700 hover:border-zinc-500 bg-zinc-950/40'
                  : 'border-[#d3cbb3] hover:border-[#8b5a2b] bg-white/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/jpg"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleImageFile(e.target.files[0]);
                  }
                }}
              />

              {uploadedImage ? (
                <div className="flex items-center gap-4 w-full justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={uploadedImage}
                      alt="Line Art Preview"
                      className="w-14 h-14 rounded-xl object-contain border bg-black/20 p-1"
                    />
                    <div className="text-left">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                        <CheckCircle2 size={14} />
                        Line art carregada no estúdio
                      </div>
                      <p className={`text-[11px] ${themeClasses.textMuted}`}>
                        Clique para substituir ou solte uma nova imagem
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedImage(null);
                      addToast('Imagem removida do visualizador.', 'info');
                    }}
                    className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all"
                    title="Remover imagem"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-black/5'}`}>
                    <Upload size={20} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">
                      Arraste e solte o seu desenho aqui ou clique para selecionar
                    </p>
                    <p className={`text-[11px] mt-0.5 ${themeClasses.textMuted}`}>
                      PNG, JPG ou WebP (Recomendado: traço em preto e fundo branco/transparente)
                    </p>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* 2. SEÇÃO: TÉCNICA DE PINTURA */}
          <section className={`p-6 rounded-3xl border ${themeClasses.card}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                  theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-[#8b5a2b] text-white'
                }`}>2</span>
                <div>
                  <h2 className="text-base font-bold">Técnica & Meio de Pintura</h2>
                  <p className={`text-xs ${themeClasses.textMuted}`}>Escolha o estilo de pigmento e aplicação para dar vida ao desenho.</p>
                </div>
              </div>

              {/* Filtros de Categoria */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                {['Todos', 'Tradicional', 'Ilustração & Quadrinhos', 'Digital & Estilizado'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setTechniqueCategory(cat)}
                    className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap ${
                      techniqueCategory === cat
                        ? theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-[#8b5a2b] text-white'
                        : theme === 'dark' ? 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-700' : 'bg-black/5 text-[#8b7e6a] hover:bg-black/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grade de Técnicas de Pintura */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredTechniques.map((tech) => {
                const isSelected = selectedTechniqueId === tech.id;
                return (
                  <div
                    key={tech.id}
                    onClick={() => handleTechniqueSelect(tech)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative flex gap-3 ${
                      isSelected
                        ? themeClasses.optionActive
                        : themeClasses.option + ' hover:border-[#8b5a2b]/40'
                    }`}
                  >
                    {/* Imagem de Amostra se houver */}
                    {tech.sampleImage ? (
                      <div className="relative group flex-shrink-0">
                        <img
                          src={tech.sampleImage}
                          alt={tech.label}
                          className="w-14 h-14 rounded-xl object-cover border bg-black/10"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setZoomModalImage(tech.sampleImage || null);
                          }}
                          className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                          title="Ampliar amostra"
                        >
                          <Maximize2 size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                        theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-black/5 border-black/10'
                      }`}>
                        <Brush size={20} className="opacity-40" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold truncate">{tech.label}</span>
                        <span className="text-[9px] px-2 py-0.5 rounded-md font-semibold bg-black/10 dark:bg-white/10 opacity-75">
                          {tech.category}
                        </span>
                      </div>
                      <p className={`text-[11px] ${themeClasses.textMuted} line-clamp-2 leading-relaxed`}>
                        {tech.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 3. SEÇÃO: PSICOLOGIA DAS CORES, SELETOR PHOTOSHOP & PALETAS PERSONALIZADAS */}
          <section className={`p-6 rounded-3xl border ${themeClasses.card}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                  theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-[#8b5a2b] text-white'
                }`}>3</span>
                <div>
                  <h2 className="text-base font-bold">Psicologia das Cores & Seletor de Cores</h2>
                  <p className={`text-xs ${themeClasses.textMuted}`}>Use o Seletor de Cores com Conta-Gotas ou escolha climas e paletas salvas.</p>
                </div>
              </div>

              {/* Seletor de Intensidade */}
              <div className="flex items-center gap-1 bg-black/10 dark:bg-white/5 p-1 rounded-2xl border border-black/5 dark:border-white/5">
                {[
                  { id: 'vibrant', label: 'Vibrante' },
                  { id: 'balanced', label: 'Equilibrada' },
                  { id: 'muted', label: 'Suave / Muted' },
                  { id: 'monochrome', label: 'Monocromático' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setColorIntensity(item.id as any)}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                      colorIntensity === item.id
                        ? theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-[#8b5a2b] text-white'
                        : theme === 'dark' ? 'text-zinc-400 hover:text-zinc-200' : 'text-[#8b7e6a] hover:text-[#433422]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-Abas: Climas Narrativos vs. Minhas Paletas vs. Criar Paleta */}
            <div className="flex items-center gap-2 mb-5 p-1 rounded-2xl border bg-black/5 dark:bg-zinc-950/60 border-black/5 dark:border-zinc-800/80">
              <button
                type="button"
                onClick={() => setPaletteTab('moods')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  paletteTab === 'moods'
                    ? theme === 'dark' ? 'bg-indigo-600 text-white shadow-md' : 'bg-[#8b5a2b] text-white shadow-md'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <span>🎨</span>
                <span>Climas & Psicologia ({COLOR_MOODS.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setPaletteTab('custom')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  paletteTab === 'custom'
                    ? theme === 'dark' ? 'bg-indigo-600 text-white shadow-md' : 'bg-[#8b5a2b] text-white shadow-md'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Bookmark size={13} />
                <span>Minhas Paletas ({customPalettes.length})</span>
              </button>

              <button
                type="button"
                onClick={handleStartCreatePalette}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  paletteTab === 'creator'
                    ? theme === 'dark' ? 'bg-emerald-600 text-white shadow-md' : 'bg-emerald-700 text-white shadow-md'
                    : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                }`}
              >
                <Plus size={14} />
                <span>Nova Paleta</span>
              </button>
            </div>

            {/* CONTEÚDO DA SUB-ABA 1: CLIMAS NARRATIVOS */}
            {paletteTab === 'moods' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 animate-in fade-in duration-200">
                {COLOR_MOODS.map((mood) => {
                  const isSelected = paletteType === 'mood' && selectedMoodId === mood.id;
                  return (
                    <div
                      key={mood.id}
                      onClick={() => handleMoodSelect(mood)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? themeClasses.optionActive
                          : themeClasses.option + ' hover:border-[#8b5a2b]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold">{mood.name}</span>
                        <span className="text-[9px] px-2 py-0.5 rounded-md font-semibold bg-black/10 dark:bg-white/10 opacity-75">
                          {mood.category}
                        </span>
                      </div>

                      {/* Faixa de Cores HEX */}
                      <div className="flex h-3.5 rounded-lg overflow-hidden gap-1 mb-2">
                        {mood.colors.map((color, i) => (
                          <div
                            key={i}
                            className="flex-1 transition-transform hover:scale-110"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>

                      <p className={`text-[11px] ${themeClasses.textMuted} line-clamp-2 leading-tight`}>
                        {mood.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* CONTEÚDO DA SUB-ABA 2: MINHAS PALETAS PERSONALIZADAS */}
            {paletteTab === 'custom' && (
              <div className="mb-6 animate-in fade-in duration-200">
                {customPalettes.length === 0 ? (
                  <div className="p-8 rounded-2xl border border-dashed text-center flex flex-col items-center justify-center gap-3 bg-black/5 dark:bg-zinc-950/40">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
                      <FolderHeart size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">Nenhuma Paleta Personalizada Criada</h4>
                      <p className={`text-xs ${themeClasses.textMuted} mt-1 max-w-md`}>
                        Você pode criar paletas com suas cores exclusivas, salvá-las com o nome que preferir e aplicá-las em qualquer colorização!
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleStartCreatePalette}
                      className={`mt-2 px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 text-white shadow-lg ${
                        theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-[#8b5a2b] hover:bg-[#724820]'
                      }`}
                    >
                      <Plus size={15} />
                      Criar Minha Primeira Paleta
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {customPalettes.map((palette) => {
                      const isSelected = paletteType === 'custom' && selectedCustomPaletteId === palette.id;
                      return (
                        <div
                          key={palette.id}
                          className={`p-3.5 rounded-2xl border text-left transition-all relative group ${
                            isSelected
                              ? themeClasses.optionActive
                              : themeClasses.option + ' hover:border-[#8b5a2b]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 truncate">
                              <Bookmark size={13} className={isSelected ? 'text-amber-400' : 'opacity-40'} />
                              <span className="text-xs font-bold truncate">{palette.name}</span>
                            </div>
                            <div className="flex items-center gap-1 opacity-90">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartEditPalette(palette);
                                }}
                                className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-indigo-400 transition-all"
                                title="Editar Paleta"
                              >
                                <Edit2 size={13} />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteCustomPalette(palette.id);
                                  if (selectedCustomPaletteId === palette.id) {
                                    setSelectedCustomPaletteId(null);
                                    setPaletteType('mood');
                                  }
                                }}
                                className="p-1 rounded-lg hover:bg-rose-500/10 text-rose-400 transition-all"
                                title="Excluir Paleta"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>

                          {/* Faixa de Cores HEX */}
                          <div className="flex h-4 rounded-lg overflow-hidden gap-1 mb-2.5">
                            {palette.colors.map((color, i) => (
                              <div
                                key={i}
                                className="flex-1 transition-transform hover:scale-110"
                                style={{ backgroundColor: color }}
                                title={`${color} (Clique para copiar)`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigator.clipboard.writeText(color);
                                  addToast(`Cor ${color} copiada!`, 'info');
                                }}
                              />
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-[11px]">
                            <span className={`${themeClasses.textMuted} truncate`}>
                              {palette.colors.length} cores • {palette.category || 'Minhas Paletas'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCustomPaletteSelect(palette)}
                              className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                                isSelected
                                  ? 'bg-emerald-500 text-white font-black'
                                  : 'bg-black/10 dark:bg-white/10 hover:bg-black/20'
                              }`}
                            >
                              {isSelected ? 'Ativa no Prompt' : 'Usar Paleta'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* CONTEÚDO DA SUB-ABA 3: CRIADOR / EDITOR DE PALETAS (COM SELETOR PHOTOSHOP) */}
            {paletteTab === 'creator' && (
              <form onSubmit={handleSaveCreatorPalette} className="p-5 rounded-2xl border bg-black/5 dark:bg-zinc-950/60 border-black/10 dark:border-zinc-800 space-y-5 mb-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                      <Wand2 size={16} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider">
                        {editingPaletteId ? 'Editar Paleta de Cores' : 'Criar Nova Paleta Personalizada'}
                      </h3>
                      <p className={`text-[11px] ${themeClasses.textMuted}`}>
                        Monte sua harmonia exclusiva usando o Seletor de Cores do Photoshop ou Conta-Gotas.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPaletteTab('custom')}
                    className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10"
                    title="Fechar Criador"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Nome e Categoria da Paleta */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold">Nome da Paleta *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Fantasia Élfica, Neon Vintage, Pôr do Sol Quente..."
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border text-xs ${
                        theme === 'dark' 
                          ? 'bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-500' 
                          : 'bg-white border-[#d3cbb3] text-[#433422] placeholder-[#8b7e6a]/60'
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold">Categoria</label>
                    <input
                      type="text"
                      placeholder="Ex: Fantasia, Retrô, Paisagem, Minhas Paletas..."
                      value={creatorCategory}
                      onChange={(e) => setCreatorCategory(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border text-xs ${
                        theme === 'dark' 
                          ? 'bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-500' 
                          : 'bg-white border-[#d3cbb3] text-[#433422] placeholder-[#8b7e6a]/60'
                      }`}
                    />
                  </div>
                </div>

                {/* Visualizador da Faixa de Cores em Tempo Real */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold">Pré-visualização da Paleta:</span>
                    <span className={`text-[10px] ${themeClasses.textMuted}`}>{creatorColors.length} cores configuradas</span>
                  </div>
                  <div className="flex h-8 rounded-xl overflow-hidden shadow-inner border border-black/10 dark:border-white/10">
                    {creatorColors.map((color, i) => (
                      <div
                        key={i}
                        className="flex-1 flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          openPhotoshopPicker(color, `Editar Amostra ${i + 1}`, (newHex) => {
                            handleUpdateCreatorColor(i, newHex);
                          });
                        }}
                        title={`Clique para abrir no Seletor Photoshop: ${color}`}
                      >
                        <span className="text-[9px] font-mono font-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-white">
                          {color}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grade de Slots de Cores com Botão Seletor Photoshop & Conta-Gotas */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold">Amostras de Cores (Clique para abrir o Seletor do Photoshop):</label>
                    {creatorColors.length < 8 && (
                      <button
                        type="button"
                        onClick={handleAddCreatorColor}
                        className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <Plus size={13} />
                        Adicionar Cor
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {creatorColors.map((color, index) => (
                      <div
                        key={index}
                        className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all hover:border-indigo-500/50 ${
                          theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-[#d3cbb3]'
                        }`}
                      >
                        {/* Botão de Amostra Clicável que Abre o Seletor Photoshop */}
                        <div
                          className="flex items-center gap-2 min-w-0 cursor-pointer flex-1"
                          onClick={() => {
                            openPhotoshopPicker(color, `Seletor de Cor (Amostra ${index + 1})`, (newHex) => {
                              handleUpdateCreatorColor(index, newHex);
                            });
                          }}
                          title="Clique para abrir no Seletor do Photoshop"
                        >
                          <div
                            className="w-7 h-7 rounded-lg border border-black/20 shadow-sm flex-shrink-0 flex items-center justify-center text-white transition-transform hover:scale-110"
                            style={{ backgroundColor: color }}
                          >
                            <Pipette size={11} className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                          </div>
                          <span className="text-xs font-mono font-bold uppercase truncate">
                            {color}
                          </span>
                        </div>

                        {creatorColors.length > 3 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveCreatorColor(index);
                            }}
                            className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-all flex-shrink-0"
                            title="Remover cor"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botões de Ação do Formulário */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/10 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => {
                      setPaletteTab('custom');
                      setEditingPaletteId(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-white border-[#d3cbb3] text-[#8b7e6a]'
                    }`}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    <Save size={14} />
                    <span>{editingPaletteId ? 'Atualizar Paleta' : 'Salvar Paleta'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Bloco Interativo: Regra 60-30-10 com Seletor do Photoshop */}
            <div className={`p-4 rounded-2xl border ${
              theme === 'dark' ? 'bg-zinc-950/60 border-zinc-800' : 'bg-black/5 border-[#d3cbb3]'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sliders size={14} className="text-amber-500" />
                  <span className="text-xs font-bold">Hierarquia de Distribuição (Regra 60-30-10)</span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <span className={`text-[11px] font-semibold ${themeClasses.textMuted}`}>Personalizar Cores:</span>
                  <input
                    type="checkbox"
                    checked={useCustom603010}
                    onChange={(e) => setUseCustom603010(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                </label>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* 60% Dominante */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold">60% Dominante</span>
                    <span className="text-[10px] opacity-75">Fundos/Grandes Áreas</span>
                  </div>
                  <div 
                    onClick={() => {
                      if (!useCustom603010) return;
                      openPhotoshopPicker(customDominant, 'Cor Dominante (60%)', (hex) => {
                        setCustomDominant(hex);
                      });
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                      useCustom603010 ? 'cursor-pointer hover:border-indigo-500' : 'opacity-85'
                    } ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-[#d3cbb3]'}`}
                  >
                    <div
                      className="w-6 h-6 rounded-lg border border-black/20 shadow-sm flex-shrink-0 flex items-center justify-center text-white"
                      style={{ backgroundColor: useCustom603010 ? customDominant : (paletteType === 'custom' && activeCustomPalette ? activeCustomPalette.colors[0] : activeMood.rule603010.dominant) }}
                    >
                      {useCustom603010 && <Pipette size={10} className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />}
                    </div>
                    <span className="text-xs font-mono font-bold">
                      {useCustom603010 ? customDominant : (paletteType === 'custom' && activeCustomPalette ? activeCustomPalette.colors[0] : activeMood.rule603010.dominant)}
                    </span>
                  </div>
                </div>

                {/* 30% Secundária */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold">30% Secundária</span>
                    <span className="text-[10px] opacity-75">Vestimentas/Objetos</span>
                  </div>
                  <div 
                    onClick={() => {
                      if (!useCustom603010) return;
                      openPhotoshopPicker(customSecondary, 'Cor Secundária (30%)', (hex) => {
                        setCustomSecondary(hex);
                      });
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                      useCustom603010 ? 'cursor-pointer hover:border-indigo-500' : 'opacity-85'
                    } ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-[#d3cbb3]'}`}
                  >
                    <div
                      className="w-6 h-6 rounded-lg border border-black/20 shadow-sm flex-shrink-0 flex items-center justify-center text-white"
                      style={{ backgroundColor: useCustom603010 ? customSecondary : (paletteType === 'custom' && activeCustomPalette ? activeCustomPalette.colors[1] || activeCustomPalette.colors[0] : activeMood.rule603010.secondary) }}
                    >
                      {useCustom603010 && <Pipette size={10} className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />}
                    </div>
                    <span className="text-xs font-mono font-bold">
                      {useCustom603010 ? customSecondary : (paletteType === 'custom' && activeCustomPalette ? activeCustomPalette.colors[1] || activeCustomPalette.colors[0] : activeMood.rule603010.secondary)}
                    </span>
                  </div>
                </div>

                {/* 10% Acento */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold">10% Destaque / Acento</span>
                    <span className="text-[10px] opacity-75">Olhos/Luz Focal</span>
                  </div>
                  <div 
                    onClick={() => {
                      if (!useCustom603010) return;
                      openPhotoshopPicker(customAccent, 'Cor de Destaque / Acento (10%)', (hex) => {
                        setCustomAccent(hex);
                      });
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                      useCustom603010 ? 'cursor-pointer hover:border-indigo-500' : 'opacity-85'
                    } ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-[#d3cbb3]'}`}
                  >
                    <div
                      className="w-6 h-6 rounded-lg border border-black/20 shadow-sm flex-shrink-0 flex items-center justify-center text-white"
                      style={{ backgroundColor: useCustom603010 ? customAccent : (paletteType === 'custom' && activeCustomPalette ? activeCustomPalette.colors[2] || activeCustomPalette.colors[0] : activeMood.rule603010.accent) }}
                    >
                      {useCustom603010 && <Pipette size={10} className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />}
                    </div>
                    <span className="text-xs font-mono font-bold">
                      {useCustom603010 ? customAccent : (paletteType === 'custom' && activeCustomPalette ? activeCustomPalette.colors[2] || activeCustomPalette.colors[0] : activeMood.rule603010.accent)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. SEÇÃO: MAPEAMENTO DE CORES PONTUAIS POR ELEMENTO */}
          <section className={`p-6 rounded-3xl border ${themeClasses.card}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                  theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-[#8b5a2b] text-white'
                }`}>4</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold">Mapeamento de Cores Pontuais por Elemento</h2>
                    {elementColors.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {elementColors.length} {elementColors.length === 1 ? 'definido' : 'definidos'}
                      </span>
                    )}
                  </div>
                  <p className={`text-xs ${themeClasses.textMuted}`}>
                    Especifique a cor exata para cada parte do desenho (cabelo, pele, olhos, roupas, cenário ou crie elementos livres).
                  </p>
                </div>
              </div>

              {elementColors.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllElementColors}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all flex items-center gap-1.5 self-start sm:self-auto"
                  title="Limpar todos os elementos configurados"
                >
                  <Trash2 size={13} />
                  <span>Limpar Mapeamentos ({elementColors.length})</span>
                </button>
              )}
            </div>

            {/* Categorias de Filtro de Elementos */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-5">
              {[
                { id: 'all', label: 'Todos', icon: '🌟' },
                { id: 'character', label: 'Personagem & Anatomia', icon: '👤' },
                { id: 'clothing', label: 'Vestuário & Roupas', icon: '👗' },
                { id: 'environment', label: 'Cenário & Objetos', icon: '🏞️' },
                { id: 'custom', label: 'Elemento Livre (+)', icon: '✨' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setElementCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    elementCategory === cat.id
                      ? theme === 'dark' ? 'bg-indigo-600 text-white shadow-md' : 'bg-[#8b5a2b] text-white shadow-md'
                      : theme === 'dark' ? 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-700' : 'bg-black/5 text-[#8b7e6a] hover:bg-black/10'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* BARRA DE ELEMENTOS ATIVOS CONFIGURADOS */}
            {elementColors.length > 0 && (
              <div className="p-4 rounded-2xl border bg-emerald-500/5 border-emerald-500/20 mb-6 space-y-2.5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    Elementos com Cores Fixadas no Prompt:
                  </span>
                  <span className={`text-[11px] ${themeClasses.textMuted}`}>
                    Clique na cor para editar no Photoshop
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {elementColors.map((el) => (
                    <div
                      key={el.id}
                      className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all shadow-sm ${
                        theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-[#d3cbb3]'
                      }`}
                    >
                      {/* Cor Clicável para abrir Seletor */}
                      <button
                        type="button"
                        onClick={() => {
                          openPhotoshopPicker(el.colorHex, `Editar Cor: ${el.name}`, (newHex) => {
                            handleAssignElementColor(el.id, el.name, el.englishLabel, newHex, el.category);
                          });
                        }}
                        className="w-5 h-5 rounded-md border border-black/20 shadow-sm flex-shrink-0 transition-transform hover:scale-110 flex items-center justify-center text-white"
                        style={{ backgroundColor: el.colorHex }}
                        title={`Cor: ${el.colorHex} (Clique para alterar)`}
                      >
                        <Pipette size={9} className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                      </button>

                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold leading-tight">{el.name}</span>
                        <span className="text-[10px] font-mono opacity-60 leading-tight">{el.colorHex}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveElementColor(el.id)}
                        className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-all ml-1"
                        title={`Remover mapeamento de ${el.name}`}
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GRADE DE ELEMENTOS PRÉ-DEFINIDOS (Presets) */}
            {elementCategory !== 'custom' && (
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {PRESET_ELEMENTS
                    .filter(p => elementCategory === 'all' || p.category === elementCategory)
                    .map((preset) => {
                      const activeAssignment = elementColors.find(item => item.id === preset.id);
                      const isAssigned = !!activeAssignment;

                      return (
                        <div
                          key={preset.id}
                          className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                            isAssigned
                              ? theme === 'dark' 
                                ? 'bg-indigo-950/20 border-indigo-500/40 ring-1 ring-indigo-500/30' 
                                : 'bg-[#f4ebe1] border-[#8b5a2b]/40 ring-1 ring-[#8b5a2b]/30'
                              : theme === 'dark'
                              ? 'bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700'
                              : 'bg-white/60 border-[#d3cbb3]/70 hover:border-[#8b5a2b]/30'
                          }`}
                        >
                          {/* Cabeçalho do Elemento */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{preset.icon}</span>
                              <div>
                                <h4 className="text-xs font-bold leading-tight">{preset.name}</h4>
                                <span className={`text-[10px] ${themeClasses.textMuted} font-mono`}>
                                  {preset.englishLabel}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {/* Botão Seletor Photoshop */}
                              <button
                                type="button"
                                onClick={() => {
                                  openPhotoshopPicker(
                                    activeAssignment?.colorHex || preset.suggestedColors[0]?.hex || '#EFA549',
                                    `Seletor de Cor: ${preset.name}`,
                                    (newHex) => {
                                      handleAssignElementColor(preset.id, preset.name, preset.englishLabel, newHex, preset.category);
                                    }
                                  );
                                }}
                                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 ${
                                  isAssigned
                                    ? 'bg-indigo-600 text-white border-indigo-500'
                                    : theme === 'dark'
                                    ? 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700'
                                    : 'bg-white border-[#d3cbb3] text-[#433422] hover:bg-zinc-50'
                                }`}
                                title="Abrir Seletor do Photoshop com Conta-Gotas"
                              >
                                {isAssigned ? (
                                  <>
                                    <div
                                      className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm"
                                      style={{ backgroundColor: activeAssignment.colorHex }}
                                    />
                                    <span className="font-mono">{activeAssignment.colorHex}</span>
                                  </>
                                ) : (
                                  <>
                                    <Pipette size={12} className="text-amber-400" />
                                    <span>Seletor Photoshop</span>
                                  </>
                                )}
                              </button>

                              {isAssigned && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveElementColor(preset.id)}
                                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-all"
                                  title={`Remover cor de ${preset.name}`}
                                >
                                  <X size={13} />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Amostras Rápidas Sugeridas */}
                          <div className="space-y-1">
                            <span className={`text-[10px] font-semibold ${themeClasses.textMuted} block`}>
                              Sugestões Rápidas de Tons:
                            </span>
                            <div className="flex flex-wrap gap-1.5 items-center">
                              {preset.suggestedColors.map((sug, i) => {
                                const isColorSelected = activeAssignment?.colorHex.toUpperCase() === sug.hex.toUpperCase();
                                return (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => handleAssignElementColor(preset.id, preset.name, preset.englishLabel, sug.hex, preset.category)}
                                    className={`group relative flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[10px] transition-all hover:scale-105 active:scale-95 ${
                                      isColorSelected
                                        ? 'border-indigo-500 bg-indigo-500/10 font-bold ring-1 ring-indigo-500'
                                        : theme === 'dark' 
                                        ? 'border-zinc-800 bg-zinc-900/80 hover:border-zinc-600' 
                                        : 'border-[#d3cbb3]/70 bg-white/80 hover:border-[#8b5a2b]/40'
                                    }`}
                                    title={`${sug.name} (${sug.hex})`}
                                  >
                                    <div
                                      className="w-3 h-3 rounded-full border border-black/20 shadow-sm flex-shrink-0"
                                      style={{ backgroundColor: sug.hex }}
                                    />
                                    <span className="truncate max-w-[100px]">{sug.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* SEÇÃO DE ELEMENTO LIVRE PERSONALIZADO */}
            <form onSubmit={handleAddCustomElement} className={`p-4 sm:p-5 rounded-2xl border ${
              theme === 'dark' ? 'bg-zinc-950/60 border-zinc-800' : 'bg-black/5 border-[#d3cbb3]'
            } space-y-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <PlusCircle size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider">
                      Adicionar Elemento Livre / Customizado
                    </h3>
                    <p className={`text-[11px] ${themeClasses.textMuted}`}>
                      Não encontrou nas opções acima? Digite qualquer elemento do seu desenho (Ex: Espada Mágica, Moto, Mochila, Óculos...)
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                {/* Nome do Elemento (PT-BR) */}
                <div className="sm:col-span-5 space-y-1">
                  <label className="text-xs font-bold">Nome do Elemento (em Português) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Espada mágica, Mochila de couro, Carro..."
                    value={customElementName}
                    onChange={(e) => setCustomElementName(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs ${
                      theme === 'dark' 
                        ? 'bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-500' 
                        : 'bg-white border-[#d3cbb3] text-[#433422] placeholder-[#8b7e6a]/60'
                    }`}
                  />
                </div>

                {/* Termo em Inglês para Prompt */}
                <div className="sm:col-span-4 space-y-1">
                  <label className="text-xs font-bold">Termo em Inglês (Opcional)</label>
                  <input
                    type="text"
                    placeholder="Ex: Magic glowing sword, leather backpack..."
                    value={customElementEnglish}
                    onChange={(e) => setCustomElementEnglish(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs ${
                      theme === 'dark' 
                        ? 'bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-500' 
                        : 'bg-white border-[#d3cbb3] text-[#433422] placeholder-[#8b7e6a]/60'
                    }`}
                  />
                </div>

                {/* Cor com Seletor Photoshop */}
                <div className="sm:col-span-3 space-y-1">
                  <label className="text-xs font-bold">Cor do Elemento</label>
                  <div
                    onClick={() => {
                      openPhotoshopPicker(customElementColor, 'Cor do Elemento Livre', (newHex) => {
                        setCustomElementColor(newHex);
                      });
                    }}
                    className={`p-2 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-all hover:border-indigo-500 ${
                      theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-[#d3cbb3]'
                    }`}
                    title="Clique para escolher no Seletor do Photoshop"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-md border border-black/20 shadow-sm flex items-center justify-center text-white"
                        style={{ backgroundColor: customElementColor }}
                      >
                        <Pipette size={9} />
                      </div>
                      <span className="text-xs font-mono font-bold">{customElementColor}</span>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-400">Alterar</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 ${
                    theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20' : 'bg-[#8b5a2b] hover:bg-[#724820] shadow-[#8b5a2b]/20'
                  }`}
                >
                  <Plus size={15} />
                  <span>Adicionar Elemento ao Prompt</span>
                </button>
              </div>
            </form>
          </section>

          {/* 5. SEÇÃO: ILUMINAÇÃO, TEMPERATURA & SUPORTE */}
          <section className={`p-6 rounded-3xl border ${themeClasses.card} space-y-6`}>
            <div className="flex items-center gap-2.5">
              <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-[#8b5a2b] text-white'
              }`}>5</span>
              <div>
                <h2 className="text-base font-bold">Iluminação, Direção da Luz & Textura de Suporte</h2>
                <p className={`text-xs ${themeClasses.textMuted}`}>
                  Defina de onde a luz incide na cena usando a bússola interativa, o tipo de emissão e a superfície física.
                </p>
              </div>
            </div>

            {/* WIDGET INTERATIVO: BÚSSOLA 3X3 & TIPOS DE LUZ */}
            <LightingCompassWidget
              theme={theme}
              themeClasses={themeClasses}
              selectedDirectionId={lightingDirectionId}
              onSelectDirection={setLightingDirectionId}
              selectedTypeId={lightingTypeId}
              onSelectType={setLightingTypeId}
              selectedShadowStyle={lightingShadowStyle}
              onSelectShadowStyle={setLightingShadowStyle}
            />

            {/* Configurações Complementares: Temperatura e Papel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/10 dark:border-zinc-800">
              {/* Temperatura de Cor */}
              <div className="space-y-2">
                <label className="text-xs font-bold flex items-center gap-1.5">
                  <Flame size={13} className="text-rose-500" />
                  Temperatura Térmica da Cena
                </label>
                <select
                  value={selectedTemperatureId}
                  onChange={(e) => setSelectedTemperatureId(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-medium ${
                    theme === 'dark' 
                      ? 'bg-zinc-900 border-zinc-700 text-zinc-100' 
                      : 'bg-white border-[#d3cbb3] text-[#433422]'
                  }`}
                >
                  {TEMPERATURE_OPTIONS.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
                <p className={`text-[10px] ${themeClasses.textMuted}`}>
                  {TEMPERATURE_OPTIONS.find(t => t.id === selectedTemperatureId)?.description}
                </p>
              </div>

              {/* Textura do Papel / Suporte */}
              <div className="space-y-2">
                <label className="text-xs font-bold flex items-center gap-1.5">
                  <FileText size={13} className="text-indigo-400" />
                  Textura do Papel / Suporte de Arte
                </label>
                <select
                  value={selectedPaperId}
                  onChange={(e) => setSelectedPaperId(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-medium ${
                    theme === 'dark' 
                      ? 'bg-zinc-900 border-zinc-700 text-zinc-100' 
                      : 'bg-white border-[#d3cbb3] text-[#433422]'
                  }`}
                >
                  {PAPER_TEXTURES.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <p className={`text-[10px] ${themeClasses.textMuted}`}>
                  {PAPER_TEXTURES.find(p => p.id === selectedPaperId)?.description}
                </p>
              </div>
            </div>

            {/* Campo de Notas Livres do Colorista */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold flex items-center gap-1.5">
                <Info size={13} className="text-indigo-400" />
                Notas Adicionais do Colorista (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ex: olhos verdes esmeralda, capa vermelha desgastada, brilho dourado na espada..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className={`w-full p-3 rounded-2xl border text-xs ${
                  theme === 'dark' 
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-100 placeholder-zinc-500' 
                    : 'bg-white border-[#d3cbb3] text-[#433422] placeholder-[#8b7e6a]/60'
                }`}
              />
            </div>
          </section>

        </div>

        {/* ================= COLUNA DA DIREITA: PREVIEW & ASSISTENTE ================= */}
        <div className="lg:col-span-4 flex flex-col gap-6 sticky top-20 h-fit">
          
          {/* Card de Visualização da Line Art Carregada */}
          {uploadedImage && (
            <div className={`p-4 rounded-3xl border overflow-hidden ${themeClasses.card}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Eye size={14} className="text-indigo-400" />
                  <span className="text-xs font-bold">Line Art de Referência</span>
                </div>
                <button
                  type="button"
                  onClick={() => setZoomModalImage(uploadedImage)}
                  className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all text-xs flex items-center gap-1"
                  title="Ampliar em tela cheia"
                >
                  <Maximize2 size={12} />
                  <span>Zoom</span>
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-black/40 border border-black/10 flex items-center justify-center max-h-56 p-2">
                <img
                  src={uploadedImage}
                  alt="Line Art Preview"
                  className="max-h-52 w-auto object-contain rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Card do Prompt Colorista Final */}
          <div className={`p-6 rounded-3xl border shadow-xl ${themeClasses.card} relative flex flex-col gap-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
                <h3 className="text-sm font-black uppercase tracking-wider">Prompt de Colorização</h3>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                theme === 'dark' ? 'bg-zinc-800 text-zinc-400' : 'bg-black/5 text-[#8b7e6a]'
              }`}>
                {generatedPrompt.split(' ').length} palavras
              </span>
            </div>

            {/* Visualização de Resumo da Técnica Ativa */}
            <div className={`p-3 rounded-2xl border text-xs flex items-center justify-between ${
              theme === 'dark' ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white/60 border-[#d3cbb3]'
            }`}>
              <div className="flex items-center gap-2 truncate">
                <span className="text-base">🎨</span>
                <div className="truncate">
                  <div className="font-bold truncate">{activeTechnique.label}</div>
                  <div className={`text-[10px] truncate ${themeClasses.textMuted}`}>
                    {paletteType === 'custom' && activeCustomPalette 
                      ? `Paleta: ${activeCustomPalette.name}` 
                      : `Clima: ${activeMood.name}`}
                  </div>
                </div>
              </div>
              <div className="flex h-4 w-12 rounded overflow-hidden flex-shrink-0">
                <div className="flex-1" style={{ backgroundColor: useCustom603010 ? customDominant : (paletteType === 'custom' && activeCustomPalette ? activeCustomPalette.colors[0] : activeMood.rule603010.dominant) }} />
                <div className="flex-1" style={{ backgroundColor: useCustom603010 ? customSecondary : (paletteType === 'custom' && activeCustomPalette ? activeCustomPalette.colors[1] || activeCustomPalette.colors[0] : activeMood.rule603010.secondary) }} />
                <div className="flex-1" style={{ backgroundColor: useCustom603010 ? customAccent : (paletteType === 'custom' && activeCustomPalette ? activeCustomPalette.colors[2] || activeCustomPalette.colors[0] : activeMood.rule603010.accent) }} />
              </div>
            </div>

            {/* Prompt Text Box */}
            <div className={`p-4 rounded-2xl border font-mono text-[11px] leading-relaxed select-all max-h-72 overflow-y-auto ${
              theme === 'dark' 
                ? 'bg-zinc-950 border-zinc-800 text-zinc-200' 
                : 'bg-white border-[#d3cbb3] text-[#433422]'
            }`}>
              {generatedPrompt}
            </div>

            {/* Botão de Cópia Principal */}
            <button
              onClick={handleCopyPrompt}
              translate="no"
              className={`w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider text-white flex items-center justify-center gap-2 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${
                theme === 'dark' 
                  ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30' 
                  : 'bg-[#8b5a2b] hover:bg-[#724820] shadow-[#8b5a2b]/30'
              }`}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span>{copied ? 'Prompt Copiado com Sucesso!' : 'Copiar Prompt do Colorista'}</span>
            </button>
          </div>

          {/* Guia Rápido por Plataforma (Accordion) */}
          <div className={`p-5 rounded-3xl border ${themeClasses.card} space-y-3`}>
            <div className="flex items-center gap-2 text-xs font-bold">
              <HelpCircle size={14} className="text-indigo-400" />
              <span>Como Usar nas Plataformas de IA</span>
            </div>

            <div className="space-y-2">
              {PLATFORM_GUIDES.map((platform) => {
                const isExpanded = expandedPlatform === platform.name;
                return (
                  <div
                    key={platform.name}
                    className={`rounded-2xl border overflow-hidden transition-all ${
                      theme === 'dark' ? 'border-zinc-800 bg-zinc-950/40' : 'border-[#d3cbb3] bg-white/40'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedPlatform(isExpanded ? null : platform.name)}
                      className="w-full p-3 flex items-center justify-between text-left text-xs font-bold"
                    >
                      <div className="flex items-center gap-2">
                        <span>{platform.icon}</span>
                        <span>{platform.name}</span>
                        <span className="text-[9px] px-2 py-0.5 rounded-md font-semibold bg-indigo-500/10 text-indigo-400">
                          {platform.badge}
                        </span>
                      </div>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {isExpanded && (
                      <div className={`p-3 pt-0 text-[11px] space-y-1.5 border-t ${
                        theme === 'dark' ? 'border-zinc-800/60' : 'border-black/5'
                      }`}>
                        <ol className="list-decimal list-inside space-y-1 mt-2">
                          {platform.steps.map((step, idx) => (
                            <li key={idx} className={`${themeClasses.textMuted} leading-tight`}>
                              <span className="text-zinc-300 dark:text-zinc-200 font-medium">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Modal de Zoom de Imagem */}
      {zoomModalImage && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/85 backdrop-blur-md" 
            onClick={() => setZoomModalImage(null)} 
          />
          <div className="relative z-10 max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <img
              src={zoomModalImage}
              alt="Zoom Preview"
              className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            <button
              type="button"
              onClick={() => setZoomModalImage(null)}
              className="mt-4 px-6 py-2 rounded-xl text-xs font-bold bg-white text-zinc-900 shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Fechar Visualização
            </button>
          </div>
        </div>
      )}

      {/* Modal Seletor de Cores do Photoshop com Conta-Gotas */}
      <PhotoshopColorPickerModal
        isOpen={psPickerOpen}
        initialColor={psPickerInitialColor}
        title={psPickerTitle}
        onClose={() => setPsPickerOpen(false)}
        onApplyColor={(selectedHex) => {
          if (psPickerCallback) {
            psPickerCallback(selectedHex);
          }
          addToast(`Cor ${selectedHex} aplicada!`, 'success');
        }}
      />
    </div>
  );
}
