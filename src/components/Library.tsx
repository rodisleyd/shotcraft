import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Copy, Check, Sparkles, X, ZoomIn, BookOpen, Layers } from "lucide-react";
import { 
  SHOT_TYPES, ANGLES, PERSPECTIVES, LENSES, 
  LIGHTING, ENVIRONMENTS, STYLES, DETAILS 
} from "../data/constants";
import { Option, Theme } from "../types";

interface LibraryProps {
  theme: Theme;
  themeClasses: any;
  selections: any;
  handleSelect: (category: string, id: string) => void;
  setCurrentTab: (tab: 'builder' | 'library') => void;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

type CategoryKey = 'style' | 'framing' | 'angle' | 'perspective' | 'lens' | 'lighting' | 'environment' | 'detail';

export function Library({
  theme,
  themeClasses,
  selections,
  handleSelect,
  setCurrentTab,
  addToast
}: LibraryProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('style');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");
  const [selectedZoomImage, setSelectedZoomImage] = useState<{ src: string; label: string; prompt: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => [
    { key: 'style' as CategoryKey, label: 'Estilos', data: STYLES },
    { key: 'framing' as CategoryKey, label: 'Enquadramentos', data: SHOT_TYPES },
    { key: 'angle' as CategoryKey, label: 'Ângulos', data: ANGLES },
    { key: 'perspective' as CategoryKey, label: 'Perspectivas', data: PERSPECTIVES },
    { key: 'lens' as CategoryKey, label: 'Lentes', data: LENSES },
    { key: 'lighting' as CategoryKey, label: 'Iluminação', data: LIGHTING },
    { key: 'environment' as CategoryKey, label: 'Cenários', data: ENVIRONMENTS },
    { key: 'detail' as CategoryKey, label: 'Detalhes', data: DETAILS },
  ], []);

  const currentCategoryData = useMemo(() => {
    const cat = categories.find(c => c.key === activeCategory);
    return cat ? cat.data : [];
  }, [activeCategory, categories]);

  // Extract unique subcategories for the active category
  const subCategories = useMemo(() => {
    const subs = Array.from(new Set(currentCategoryData.map(item => item.subCategory))).filter(Boolean) as string[];
    return ['all', ...subs];
  }, [currentCategoryData]);

  // Filter items based on search and subcategory
  const filteredItems = useMemo(() => {
    return currentCategoryData.filter(item => {
      const matchesSearch = 
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.prompt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSub = selectedSubCategory === 'all' || item.subCategory === selectedSubCategory;
      
      return matchesSearch && matchesSub;
    });
  }, [currentCategoryData, searchQuery, selectedSubCategory]);

  const handleCopyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    addToast('Prompt de estilo copiado!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApplyAndGo = (category: string, id: string) => {
    handleSelect(category, id);
    addToast('Filtro aplicado no gerador!', 'success');
    setCurrentTab('builder');
  };

  const getImagePath = (item: Option) => {
    if (item.image) return item.image;
    // For styles, we generated apple images named as <id>.png
    if (item.category === 'style') {
      return `/images/styles/${item.id}.png`;
    }
    // Fallback default
    return `/images/styles/default.png`;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Page Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
            <BookOpen className="text-indigo-500" size={24} />
            Biblioteca de Parâmetros
          </h2>
          <p className={`${themeClasses.textMuted} text-xs mt-1`}>
            Explore de forma visual e rápida todas as opções técnicas e estéticas do simulador.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome ou prompt..."
            className={`w-full pl-11 pr-4 py-3 rounded-2xl border outline-none text-sm transition-all focus:ring-2 focus:ring-indigo-500/20 ${themeClasses.input}`}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar border-b border-black/10 dark:border-white/10">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setSelectedSubCategory('all');
              }}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                isActive
                  ? themeClasses.optionActive + ' shadow-sm'
                  : themeClasses.option + ' hover:border-indigo-500/30'
              }`}
            >
              {isActive && <Sparkles size={12} className="animate-pulse" />}
              {cat.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1 ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : theme === 'dark' ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'
              }`}>
                {cat.data.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Subcategory Pills */}
      {subCategories.length > 2 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {subCategories.map((sub) => {
            const isSelected = selectedSubCategory === sub;
            return (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-3 py-1.5 text-[10px] font-bold tracking-tight rounded-full border transition-all ${
                  isSelected
                    ? theme === 'dark'
                      ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-400 font-extrabold'
                      : 'bg-[#8b5a2b]/10 border-[#8b5a2b]/50 text-[#8b5a2b] font-extrabold'
                    : themeClasses.option + ' hover:opacity-100 opacity-70'
                }`}
              >
                {sub === 'all' ? 'Ver Todos' : sub}
              </button>
            );
          })}
        </div>
      )}

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => {
            // Check if activeCategory is a list category
            const isSelected = (item.category === 'style' || item.category === 'detail')
              ? selections[item.category]?.includes(item.id)
              : selections[item.category] === item.id;

            return (
              <div 
                key={item.id}
                className={`group border rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                  isSelected 
                    ? theme === 'dark' ? 'border-indigo-500/50 bg-indigo-950/10 shadow-lg' : 'border-[#8b5a2b]/50 bg-[#8b5a2b]/5 shadow-lg'
                    : themeClasses.card + ' hover:scale-[1.02] hover:shadow-md'
                }`}
              >
                {/* Visual Preview */}
                <div className="aspect-square relative w-full overflow-hidden bg-zinc-950/5 flex items-center justify-center border-b border-black/5 dark:border-white/5">
                  <img 
                    src={getImagePath(item)} 
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/styles/default.png';
                    }}
                  />
                  {/* Hover overlay with magnifying glass */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedZoomImage({
                        src: getImagePath(item),
                        label: item.label,
                        prompt: item.prompt
                      })}
                      className="p-3 bg-white hover:bg-zinc-100 text-zinc-950 rounded-full transition-all scale-75 group-hover:scale-100 shadow-lg"
                      title="Visualizar ampliado"
                    >
                      <ZoomIn size={18} />
                    </button>
                  </div>

                  {/* Badges */}
                  {isSelected && (
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md ${
                      theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-[#8b5a2b] text-white'
                    }`}>
                      <Check size={10} /> Ativo
                    </div>
                  )}
                  
                  {item.subCategory && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold rounded-full">
                      {item.subCategory}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-sm tracking-tight">{item.label}</h3>
                    <p className={`text-[10px] font-mono opacity-70 mt-2 line-clamp-3 leading-relaxed ${themeClasses.textMuted}`} title={item.prompt}>
                      {item.prompt}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                    <button
                      onClick={() => handleCopyPrompt(item.prompt, item.id)}
                      className={`p-2 rounded-xl border flex-1 text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${
                        themeClasses.option + ' hover:border-indigo-500/20'
                      }`}
                    >
                      {copiedId === item.id ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      {copiedId === item.id ? 'Copiado' : 'Copiar'}
                    </button>
                    <button
                      onClick={() => handleApplyAndGo(item.category, item.id)}
                      className={`p-2 rounded-xl text-[10px] font-bold flex-1 flex items-center justify-center gap-1 transition-all text-white ${
                        themeClasses.accent
                      }`}
                    >
                      <Sparkles size={12} />
                      {isSelected ? 'Remover' : 'Aplicar'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700 min-h-[300px]">
          <Search size={48} className="opacity-30 mb-3" />
          <h3 className="font-bold text-lg">Nenhum resultado encontrado</h3>
          <p className="text-sm text-zinc-400 mt-1 max-w-sm">
            Tente buscar com outros termos ou selecione outra categoria.
          </p>
        </div>
      )}

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
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
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
                  <p className="text-[10px] text-zinc-400 mt-0.5">Visualização de Parâmetro</p>
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
                <div className="text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1.5">Prompt:</div>
                <p className="text-xs font-mono opacity-85 leading-relaxed break-words max-h-24 overflow-y-auto pr-1">
                  {selectedZoomImage.prompt}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
