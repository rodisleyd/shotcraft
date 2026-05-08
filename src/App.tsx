/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { 
  Camera, 
  Lightbulb, 
  Monitor, 
  MapPin, 
  Palette, 
  Zap, 
  Film, 
  Layout, 
  Sparkles,
  RefreshCcw,
  Image as ImageIcon,
  Upload,
  Loader2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Types
import { ShotMode, Theme, SelectionState, UserPreset, HistoryItem, ToastType, Step } from './types';

// Constants
import { 
  SHOT_TYPES, ANGLES, PERSPECTIVES, ASPECT_RATIOS, 
  LENSES, LIGHTING, ENVIRONMENTS, STYLES, DETAILS, 
  PRESETS, AUTO_COMBINATIONS 
} from './data/constants';

// Components
import { Header } from './components/Header';
import { Stepper } from './components/Stepper';
import { StepContent } from './components/StepContent';
import { PromptPreview } from './components/PromptPreview';
import { UserPresets } from './components/UserPresets';
import { NegativePrompt } from './components/NegativePrompt';
import { History } from './components/History';
import { Toast } from './components/Toast';

// AI Optimization Service
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function optimizeSubject(subject: string) {
  if (!subject.trim()) return subject;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash",
      contents: `Transforme este assunto de imagem em algo mais rico, cinematográfico e detalhado (em poucas palavras): "${subject}". Retorne apenas a versão melhorada.`,
    });
    return response.text || subject;
  } catch (error) {
    console.error('Erro ao otimizar:', error);
    throw error;
  }
}

export default function App() {
  // --- States ---
  const [subject, setSubject] = useState<string>('A mysterious detective standing in the rain');
  const [negativePrompt, setNegativePrompt] = useState<string>('');
  const [mode, setMode] = useState<ShotMode>('cinematic');
  const [theme, setTheme] = useState<Theme>('dark');
  const [selections, setSelections] = useState<SelectionState>({
    framing: '',
    angle: '',
    perspective: '',
    aspect: '',
    lens: '',
    lighting: '',
    environment: '',
    style: [],
    detail: []
  });
  const [customAspect, setCustomAspect] = useState('2:1');
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [userPresets, setUserPresets] = useState<UserPreset[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [newPresetName, setNewPresetName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [toasts, setToasts] = useState<ToastType[]>([]);

  // --- Persistence ---
  useEffect(() => {
    const savedPresets = localStorage.getItem('shotcraft_user_presets');
    if (savedPresets) try { setUserPresets(JSON.parse(savedPresets)); } catch (e) {}
    
    const savedHistory = localStorage.getItem('shotcraft_history');
    if (savedHistory) try { setHistory(JSON.parse(savedHistory)); } catch (e) {}
  }, []);

  useEffect(() => {
    localStorage.setItem('shotcraft_user_presets', JSON.stringify(userPresets));
  }, [userPresets]);

  useEffect(() => {
    localStorage.setItem('shotcraft_history', JSON.stringify(history));
  }, [history]);

  // --- Helpers ---
  const addToast = (message: string, type: ToastType['type'] = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const steps: Step[] = [
    { title: 'Sujeito', icon: <Sparkles size={20} /> },
    { title: 'Formato', icon: <Layout size={20} /> },
    { title: 'Enquadramento', icon: <Layout size={20} /> },
    { title: 'Ângulo', icon: <RefreshCcw size={20} /> },
    { title: 'Perspectiva', icon: <Monitor size={20} /> },
    { title: 'Lente', icon: <Camera size={20} /> },
    { title: 'Luz', icon: <Lightbulb size={20} /> },
    { title: 'Cenário', icon: <MapPin size={20} /> },
    { title: 'Estilo', icon: <Palette size={20} /> },
    { title: 'Detalhe', icon: <Zap size={20} /> },
  ];

  const getCurrentOptions = (step: number) => {
    switch (step) {
      case 1: return ASPECT_RATIOS;
      case 2: return SHOT_TYPES;
      case 3: return ANGLES;
      case 4: return PERSPECTIVES;
      case 5: return LENSES;
      case 6: return LIGHTING;
      case 7: return ENVIRONMENTS;
      case 8: return STYLES;
      case 9: return DETAILS;
      default: return [];
    }
  };

  const handleSelect = (category: string, id: string) => {
    setSelections(prev => {
      const key = category as keyof SelectionState;
      let nextSelections = { ...prev };

      if (category === 'style' || category === 'detail') {
        const current = prev[key] as string[];
        if (current.includes(id)) {
          (nextSelections[key] as string[]) = current.filter(item => item !== id);
        } else {
          (nextSelections[key] as string[]) = [...current, id];
        }
      } else {
        if (prev[key] === id) {
          (nextSelections[key] as string) = '';
        } else {
          (nextSelections[key] as string) = id;
        }
      }

      // Auto-combinations
      if (AUTO_COMBINATIONS[id]) {
        const combo = AUTO_COMBINATIONS[id];
        Object.entries(combo).forEach(([cat, val]) => {
          if (cat === 'style' || cat === 'detail') {
            const styleIds = cat === 'style' ? Object.values(val as Record<string, string>) : [val as string];
            (nextSelections[cat as keyof SelectionState] as string[]) = Array.from(new Set([...(nextSelections[cat as keyof SelectionState] as string[]), ...styleIds]));
          } else {
            (nextSelections[cat as keyof SelectionState] as string) = val as string;
          }
        });
      }
      
      return nextSelections;
    });
  };

  const handleOptimizeSubject = async () => {
    if (!subject.trim()) return;
    setIsOptimizing(true);
    try {
      const optimized = await optimizeSubject(subject);
      setSubject(optimized);
      addToast('Sujeito otimizado com sucesso!', 'success');
    } catch (error) {
      addToast('Erro ao otimizar com IA.', 'error');
    } finally {
      setIsOptimizing(false);
    }
  };

  const fileToGenerativePart = async (file: File) => {
    return new Promise<{ inlineData: { data: string, mimeType: string } }>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(',')[1];
        resolve({
          inlineData: {
            data: base64data,
            mimeType: file.type
          }
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAnalyzeReference = async (file: File) => {
    setIsAnalyzing(true);
    addToast('Mestre IA analisando sua referência...', 'info');
    
    try {
      const imagePart = await fileToGenerativePart(file);
      
      const allOptionsPrompt = `
        Aja como um especialista em direção cinematográfica e ShotCraft. 
        Analise esta imagem e identifique quais destas opções técnicas melhor a descrevem.
        Retorne APENAS um objeto JSON válido com as chaves: subject (breve descrição do que está na foto), 
        framing, angle, perspective, aspect, lens, lighting, environment, style (array de IDs), detail (array de IDs).
        
        Opções disponíveis (use APENAS estes IDs):
        - Enquadramento (framing): ${SHOT_TYPES.map(o => o.id).join(', ')}
        - Ângulo (angle): ${ANGLES.map(o => o.id).join(', ')}
        - Perspectiva (perspective): ${PERSPECTIVES.map(o => o.id).join(', ')}
        - Formato (aspect): ${ASPECT_RATIOS.map(o => o.id).join(', ')}
        - Lente (lens): ${LENSES.map(o => o.id).join(', ')}
        - Luz (lighting): ${LIGHTING.map(o => o.id).join(', ')}
        - Cenário (environment): ${ENVIRONMENTS.map(o => o.id).join(', ')}
        - Estilo (style): ${STYLES.map(o => o.id).join(', ')}
        - Detalhes (detail): ${DETAILS.map(o => o.id).join(', ')}
      `;

      const result = await ai.models.generateContent({
        model: "gemini-3.1-flash",
        contents: [
          {
            role: "user",
            parts: [
              { text: allOptionsPrompt },
              imagePart
            ]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json"
        }
      });

      const analysis = JSON.parse(result.text);
      
      if (analysis.subject) setSubject(analysis.subject);
      
      setSelections({
        framing: analysis.framing || '',
        angle: analysis.angle || '',
        perspective: analysis.perspective || '',
        aspect: analysis.aspect || '',
        lens: analysis.lens || '',
        lighting: analysis.lighting || '',
        environment: analysis.environment || '',
        style: analysis.style || [],
        detail: analysis.detail || []
      });

      addToast('Mestre IA concluiu a análise!', 'success');
      setActiveStep(1); // Mover para o próximo passo para ver os resultados
    } catch (error) {
      console.error('Erro na análise:', error);
      addToast('Erro ao analisar imagem.', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSavePreset = () => {
    if (!newPresetName.trim()) return;
    const newPreset: UserPreset = {
      name: newPresetName.trim(),
      selections: { ...selections },
      subject: subject
    };
    setUserPresets(prev => [...prev, newPreset]);
    setNewPresetName('');
    setIsSaving(false);
    addToast('Preset salvo com sucesso!', 'success');
  };

  const handleReset = () => {
    setSubject('A mysterious detective standing in the rain');
    setNegativePrompt('');
    setSelections({
      framing: '',
      angle: '',
      perspective: '',
      aspect: '',
      lens: '',
      lighting: '',
      environment: '',
      style: [],
      detail: []
    });
    setActiveStep(0);
    addToast('Todas as configurações foram resetadas.', 'info');
  };

  const addToHistory = (prompt: string) => {
    const item: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      prompt,
      subject,
      negativePrompt
    };
    setHistory(prev => [item, ...prev].slice(0, 20));
  };

  const finalPrompt = useMemo(() => {
    const parts = [];
    if (subject) parts.push(subject);

    const framing = SHOT_TYPES.find(o => o.id === selections.framing)?.prompt;
    if (framing) parts.push(framing);

    const angle = ANGLES.find(o => o.id === selections.angle)?.prompt;
    if (angle) parts.push(angle);

    const perspective = PERSPECTIVES.find(o => o.id === selections.perspective)?.prompt;
    if (perspective) parts.push(perspective);

    const lens = LENSES.find(o => o.id === selections.lens)?.prompt;
    if (lens) parts.push(lens);

    const lighting = LIGHTING.find(o => o.id === selections.lighting)?.prompt;
    if (lighting) parts.push(lighting);

    const env = ENVIRONMENTS.find(o => o.id === selections.environment)?.prompt;
    if (env) parts.push(env);

    selections.style.forEach(id => {
      const prompt = STYLES.find(o => o.id === id)?.prompt;
      if (prompt) parts.push(prompt);
    });
    
    if (mode === 'storyboard') parts.push("professional storyboard sketch, black and white pencil lines, compositional notes, rough sketches");
    else if (mode === 'cinematic') parts.push("cinematic color grading, professional cinematography, technical realism");
    else if (mode === 'illustration') parts.push("artistic hand-crafted illustration, distinct aesthetic");

    selections.detail.forEach(id => {
      const prompt = DETAILS.find(o => o.id === id)?.prompt;
      if (prompt) parts.push(prompt);
    });

    if (selections.aspect === 'custom') {
      parts.push(`--ar ${customAspect}`);
    } else {
      const aspect = ASPECT_RATIOS.find(o => o.id === selections.aspect)?.prompt;
      if (aspect) parts.push(aspect);
    }

    if (negativePrompt) {
      parts.push(`--no ${negativePrompt}`);
    }

    return parts.filter(Boolean).join(', ');
  }, [subject, selections, mode, customAspect, negativePrompt]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(finalPrompt);
    setCopied(true);
    addToHistory(finalPrompt);
    addToast('Prompt copiado e salvo no histórico!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  // --- Theme classes ---
  const themeClasses = {
    bg: theme === 'dark' ? 'bg-zinc-950' : 'bg-[#f4efe1]',
    header: theme === 'dark' ? 'bg-zinc-900/50 border-zinc-800' : 'bg-[#ebe3cf]/80 border-[#d3cbb3]',
    text: theme === 'dark' ? 'text-zinc-100' : 'text-[#433422]',
    textMuted: theme === 'dark' ? 'text-zinc-400' : 'text-[#8b7e6a]',
    card: theme === 'dark' ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white/60 border-[#d3cbb3]',
    input: theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-white/80 border-[#d3cbb3] text-[#433422]',
    accent: theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-[#8b5a2b] hover:bg-[#704823]',
    accentText: theme === 'dark' ? 'text-indigo-400' : 'text-[#8b5a2b]',
    stepActive: theme === 'dark' ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' : 'bg-[#8b5a2b]/10 border-[#8b5a2b] text-[#8b5a2b]',
    option: theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-zinc-400' : 'bg-white border-[#d3cbb3] text-[#8b7e6a]',
    optionActive: theme === 'dark' ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-[#8b5a2b] border-[#704823] text-white',
    sidebar: theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-[#ebe3cf] border-[#d3cbb3]',
    footer: theme === 'dark' ? 'border-zinc-900 text-zinc-600' : 'border-[#d3cbb3] text-[#8b7e6a]',
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-indigo-500/30 ${themeClasses.bg} ${themeClasses.text}`}>
      <Toast toasts={toasts} removeToast={removeToast} />
      
      <Header 
        mode={mode} setMode={setMode} 
        theme={theme} setTheme={setTheme} 
        copyToClipboard={copyToClipboard} copied={copied}
        handleReset={handleReset}
        themeClasses={themeClasses}
      />

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: UI Controls */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Stepper steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} themeClasses={themeClasses} />
          
          <StepContent 
            activeStep={activeStep} steps={steps}
            subject={subject} setSubject={setSubject}
            isOptimizing={isOptimizing} handleOptimizeSubject={handleOptimizeSubject}
            isAnalyzing={isAnalyzing} handleAnalyzeReference={handleAnalyzeReference}
            setActiveStep={setActiveStep} getCurrentOptions={getCurrentOptions}
            handleSelect={handleSelect} selections={selections}
            customAspect={customAspect} setCustomAspect={setCustomAspect}
            theme={theme} themeClasses={themeClasses}
          />

          <NegativePrompt 
            negativePrompt={negativePrompt} setNegativePrompt={setNegativePrompt} 
            themeClasses={themeClasses} 
          />
        </div>

        {/* Right Column: Preview & Storage */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <PromptPreview 
            finalPrompt={finalPrompt} copyToClipboard={copyToClipboard} copied={copied}
            isSaving={isSaving} setIsSaving={setIsSaving}
            newPresetName={newPresetName} setNewPresetName={setNewPresetName}
            handleSavePreset={handleSavePreset} themeClasses={themeClasses}
          />

          <UserPresets 
            userPresets={userPresets} loadUserPreset={(p) => {
              setSelections(p.selections);
              setSubject(p.subject);
              addToast('Preset carregado!', 'info');
            }} 
            deleteUserPreset={(idx) => {
              setUserPresets(prev => prev.filter((_, i) => i !== idx));
              addToast('Preset removido.', 'info');
            }} 
            themeClasses={themeClasses} 
          />

          <History 
            history={history} 
            loadFromHistory={(item) => {
              setSubject(item.subject);
              if (item.negativePrompt) setNegativePrompt(item.negativePrompt);
              addToast('Prompt recuperado do histórico!', 'info');
            }}
            removeFromHistory={(id) => setHistory(prev => prev.filter(h => h.id !== id))}
            clearHistory={() => {
              setHistory([]);
              addToast('Histórico limpo.');
            }}
            themeClasses={themeClasses}
          />
        </div>
      </main>

      <footer className={`max-w-7xl mx-auto px-4 py-8 border-t transition-colors text-center text-xs font-medium uppercase tracking-[0.2em] ${themeClasses.footer}`}>
        ShotCraft &copy; 2026 &mdash; Sistema Profissional de Direção Cinematográfica
      </footer>
    </div>
  );
}
