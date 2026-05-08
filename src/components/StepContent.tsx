/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronRight, ChevronLeft, Wand2, ChevronDown, Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { Option, Step, SelectionState } from "../types";
import { STYLES } from "../data/constants";
import { useState } from "react";

interface StepContentProps {
  activeStep: number;
  steps: Step[];
  subject: string;
  setSubject: (val: string) => void;
  isOptimizing: boolean;
  handleOptimizeSubject: () => void;
  isAnalyzing: boolean;
  handleAnalyzeReference: (file: File) => void;
  setActiveStep: (step: number) => void;
  getCurrentOptions: (step: number) => Option[];
  handleSelect: (category: string, id: string) => void;
  selections: any;
  customAspect: string;
  setCustomAspect: (val: string) => void;
  theme: string;
  themeClasses: any;
}

export function StepContent({
  activeStep,
  steps,
  subject,
  setSubject,
  isOptimizing,
  handleOptimizeSubject,
  isAnalyzing,
  handleAnalyzeReference,
  setActiveStep,
  getCurrentOptions,
  handleSelect,
  selections,
  customAspect,
  setCustomAspect,
  theme,
  themeClasses
}: StepContentProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('1. Pintura Tradicional');
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

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
                <button 
                  onClick={() => setActiveStep(1)}
                  className={`w-full sm:w-auto text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${themeClasses.accent}`}
                >
                  Próximo Passo <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {activeStep > 0 && activeStep < 10 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{steps[activeStep].title}</h2>
                <p className={`${themeClasses.textMuted} text-sm`}>Escolha uma opção técnica para refinar a composição.</p>
              </div>
              
              {activeStep === 8 ? (
                <div className="space-y-3">
                  {Array.from(new Set(STYLES.map(s => s.subCategory))).map(subCat => (
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
                              {STYLES.filter(s => s.subCategory === subCat).map((option) => {
                                const isSelected = selections.style.includes(option.id);
                                
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
                  onClick={() => setActiveStep(activeStep === 9 ? activeStep : activeStep + 1)}
                  className={`text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${themeClasses.accent}`}
                >
                  {activeStep === 9 ? 'Finalizar' : 'Próximo Passo'} <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
