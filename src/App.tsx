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
  Loader2,
  Languages,
  CheckCircle2,
  Trash2,
  Droplet
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Types
import { ShotMode, Theme, SelectionState, UserPreset, HistoryItem, ToastType, Step, ColorPaletteOption, UserAccount, GalleryItem } from './types';

// Constants
import {
  SHOT_TYPES, ANGLES, PERSPECTIVES, ASPECT_RATIOS,
  LENSES, LIGHTING, ENVIRONMENTS, STYLES, DETAILS,
  PRESETS, AUTO_COMBINATIONS, LUTS, GRADING_TECHNIQUES,
  INITIAL_GALLERY
} from './data/constants';

// Services
import { dataService } from './services/dataService';

// Components
import { Header } from './components/Header';
import { Stepper } from './components/Stepper';
import { StepContent } from './components/StepContent';
import { PromptPreview } from './components/PromptPreview';
import { UserPresets } from './components/UserPresets';
import { NegativePrompt } from './components/NegativePrompt';
import { History } from './components/History';
import { Toast } from './components/Toast';
import { Library } from './components/Library';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { AdminDashboard } from './components/AdminDashboard';
import { Gallery } from './components/Gallery';

// AI Optimization Service
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function optimizeSubject(subject: string) {
  if (!subject.trim()) return subject;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Transforme este assunto de imagem em algo mais rico, cinematográfico e detalhado (em poucas palavras): "${subject}". Retorne apenas a versão melhorada.`,
    });
    return response.text || subject;
  } catch (error) {
    console.error('Erro ao otimizar:', error);
    throw error;
  }
}

async function translateSubject(subject: string) {
  if (!subject.trim()) return subject;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Traduza o seguinte texto para o inglês, mantendo o estilo descritivo para um prompt de geração de imagem: "${subject}". Retorne APENAS a tradução em inglês.`,
    });
    return response.text || subject;
  } catch (error) {
    console.error('Erro ao traduzir:', error);
    throw error;
  }
}

export default function App() {
  // --- States ---
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'app' | 'admin'>('landing');
  const [user, setUser] = useState<UserAccount | null>(null);
  
  // Pix modal states
  const [showPixModal, setShowPixModal] = useState(false);
  const [selectedPixPlan, setSelectedPixPlan] = useState<{ credits: number; price: string } | null>(null);
  const [isSimulatingPixPayment, setIsSimulatingPixPayment] = useState(false);

  const [currentTab, setCurrentTab] = useState<'builder' | 'library' | 'gallery'>('builder');
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
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
    detail: [],
    colorPalette: [],
    colorPaletteId: '',
    lutId: '',
    gradingTechniques: [],
    useColorRule603010: false,
    colorRule603010: {
      dominant: '',
      secondary: '',
      accent: ''
    }
  });
  const [customAspect, setCustomAspect] = useState('2:1');
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [userPresets, setUserPresets] = useState<UserPreset[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [newPresetName, setNewPresetName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [customPalettes, setCustomPalettes] = useState<ColorPaletteOption[]>([]);
  const [masterExplanation, setMasterExplanation] = useState<any | null>(null);
  const [isAnalyzingMaster, setIsAnalyzingMaster] = useState(false);
  const [showPremiumUpgradeModal, setShowPremiumUpgradeModal] = useState(false);
  const [isPayingPremium, setIsPayingPremium] = useState(false);

  // --- Persistence & DB Init ---
  useEffect(() => {
    // Inicializa o banco de dados simulado
    dataService.init();

    // Carrega a sessão de login atual
    const activeUser = dataService.getCurrentUser();
    if (activeUser) {
      setUser(activeUser);
      setCurrentPage('app');
    }

    const savedPresets = localStorage.getItem('shotcraft_user_presets');
    if (savedPresets) try { setUserPresets(JSON.parse(savedPresets)); } catch (e) { }

    const savedHistory = localStorage.getItem('shotcraft_history');
    if (savedHistory) try { setHistory(JSON.parse(savedHistory)); } catch (e) { }

    const savedCustomPalettes = localStorage.getItem('shotcraft_custom_palettes');
    if (savedCustomPalettes) try { setCustomPalettes(JSON.parse(savedCustomPalettes)); } catch (e) { }

    const savedGallery = localStorage.getItem('shotcraft_gallery_items');
    if (savedGallery) {
      try { setGalleryItems(JSON.parse(savedGallery)); } catch (e) { setGalleryItems(INITIAL_GALLERY); }
    } else {
      setGalleryItems(INITIAL_GALLERY);
      localStorage.setItem('shotcraft_gallery_items', JSON.stringify(INITIAL_GALLERY));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shotcraft_user_presets', JSON.stringify(userPresets));
  }, [userPresets]);

  useEffect(() => {
    localStorage.setItem('shotcraft_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('shotcraft_custom_palettes', JSON.stringify(customPalettes));
  }, [customPalettes]);

  useEffect(() => {
    if (galleryItems.length > 0) {
      localStorage.setItem('shotcraft_gallery_items', JSON.stringify(galleryItems));
    }
  }, [galleryItems]);

  // --- Helpers ---
  const addToast = (message: string, type: ToastType['type'] = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const sanitizeSelections = (sel: any): SelectionState => {
    return {
      ...sel,
      style: Array.isArray(sel.style) 
        ? sel.style 
        : (typeof sel.style === 'object' && sel.style !== null ? Object.values(sel.style) : []),
      detail: Array.isArray(sel.detail) 
        ? sel.detail 
        : (typeof sel.detail === 'object' && sel.detail !== null ? Object.values(sel.detail) : [sel.detail].filter(Boolean)),
      colorPalette: Array.isArray(sel?.colorPalette) ? sel.colorPalette : [],
      colorPaletteId: typeof sel?.colorPaletteId === 'string' ? sel.colorPaletteId : '',
      lutId: typeof sel?.lutId === 'string' ? sel.lutId : '',
      gradingTechniques: Array.isArray(sel?.gradingTechniques) ? sel.gradingTechniques : [],
      useColorRule603010: typeof sel?.useColorRule603010 === 'boolean' ? sel.useColorRule603010 : false,
      colorRule603010: sel?.colorRule603010 ? {
        dominant: typeof sel.colorRule603010.dominant === 'string' ? sel.colorRule603010.dominant : '',
        secondary: typeof sel.colorRule603010.secondary === 'string' ? sel.colorRule603010.secondary : '',
        accent: typeof sel.colorRule603010.accent === 'string' ? sel.colorRule603010.accent : '',
      } : { dominant: '', secondary: '', accent: '' }
    };
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
    { title: 'Colorização', icon: <Droplet size={20} /> },
    { title: 'Estilo', icon: <Palette size={20} /> },
    { title: 'Detalhe', icon: <Zap size={20} /> },
    { title: 'Revisão', icon: <CheckCircle2 size={20} /> },
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
      case 8: return [];
      case 9: return STYLES;
      case 10: return DETAILS;
      default: return [];
    }
  };

  const handleSelect = (category: string, id: string) => {
    setSelections(prev => {
      const key = category as keyof SelectionState;
      let nextSelections = { ...prev };
      let isAdding = false;

      if (category === 'style' || category === 'detail') {
        const current = prev[key] as string[];
        if (current.includes(id)) {
          (nextSelections[key] as string[]) = current.filter(item => item !== id);
          isAdding = false;
        } else {
          (nextSelections[key] as string[]) = [...current, id];
          isAdding = true;
        }
      } else {
        if (prev[key] === id) {
          (nextSelections[key] as string) = '';
          isAdding = false;
        } else {
          (nextSelections[key] as string) = id;
          isAdding = true;
        }
      }

      // Auto-combinations (Apenas ao selecionar)
      if (isAdding && AUTO_COMBINATIONS[id]) {
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

  const handleTranslateSubject = async () => {
    if (!subject.trim()) return;
    setIsTranslating(true);
    try {
      const translated = await translateSubject(subject);
      setSubject(translated);
      addToast('Traduzido para o inglês!', 'success');
    } catch (error) {
      addToast('Erro ao traduzir para o inglês.', 'error');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSaveCustomPalette = (name: string, colors: string[]) => {
    const id = `custom-${Date.now()}`;
    const newPalette: ColorPaletteOption = {
      id,
      name,
      colors,
      description: 'Paleta personalizada extraída.'
    };
    setCustomPalettes(prev => [newPalette, ...prev]);
    setSelections(prev => ({ ...prev, colorPalette: colors, colorPaletteId: id }));
    addToast(`Paleta "${name}" salva com sucesso!`, 'success');
  };

  const handleDeleteCustomPalette = (id: string) => {
    setCustomPalettes(prev => prev.filter(p => p.id !== id));
    setSelections(prev => prev.colorPaletteId === id ? { ...prev, colorPalette: [], colorPaletteId: '' } : prev);
    addToast('Paleta personalizada excluída.', 'info');
  };

  const handleAddGalleryItem = (item: Omit<GalleryItem, 'id' | 'createdAt'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gallery-${Date.now()}`,
      createdAt: Date.now()
    };
    setGalleryItems(prev => [newItem, ...prev]);
    addToast(`Arte "${item.title}" postada com sucesso!`, 'success');
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGalleryItems(prev => prev.filter(item => item.id !== id));
    addToast('Arte removida da galeria.', 'info');
  };

  const handleUpdateGalleryItem = (updatedItem: GalleryItem) => {
    setGalleryItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    addToast(`Arte "${updatedItem.title}" atualizada com sucesso!`, 'success');
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

  const handleAnalyzeReference = async (fileOrUrl: File | string) => {
    setIsAnalyzing(true);
    addToast('Mestre IA analisando sua referência...', 'info');

    try {
      let imagePart;
      if (typeof fileOrUrl === 'string') {
        let response;
        try {
          response = await fetch(fileOrUrl);
        } catch (e) {
          console.log('Erro de CORS/rede direto. Tentando com proxy de imagem...');
        }

        if (!response || !response.ok) {
          try {
            response = await fetch(`https://images.weserv.nl/?url=${encodeURIComponent(fileOrUrl)}`);
            if (!response.ok) throw new Error('Falha no download via proxy');
          } catch (proxyErr) {
            console.error('Erro de fetch/CORS mesmo com proxy:', proxyErr);
            throw new Error('CORS_OR_NETWORK_ERROR');
          }
        }

        const blob = await response.blob();
        imagePart = await new Promise<{ inlineData: { data: string, mimeType: string } }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = (reader.result as string).split(',')[1];
            resolve({
              inlineData: {
                data: base64data,
                mimeType: blob.type
              }
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } else {
        imagePart = await fileToGenerativePart(fileOrUrl);
      }

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
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [
              { text: allOptionsPrompt },
              imagePart
            ]
          }
        ]
      });

      const responseText = result.text || "";
      // Limpa possíveis blocos de código markdown se o modelo ignorar o responseMimeType
      const cleanJson = responseText.replace(/```json|```/g, '').trim();
      const analysis = JSON.parse(cleanJson);
      
      if (analysis.subject) setSubject(analysis.subject);

      const sanitized = sanitizeSelections({
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

      setSelections(sanitized);

      addToast('Mestre IA concluiu a análise!', 'success');
      setIsAnalyzing(false);
      setActiveStep(1); // Mover para o próximo passo para ver os resultados
    } catch (error: any) {
      console.error('Erro na análise:', error);
      setIsAnalyzing(false);
      if (error.message === 'CORS_OR_NETWORK_ERROR') {
        addToast('Erro de CORS ou rede: A URL da imagem bloqueou o acesso. Baixe a imagem e faça o upload local.', 'error');
      } else {
        addToast('Erro ao analisar imagem.', 'error');
      }
    }
  };

  const handleAskMasterDirector = async (userInput: string) => {
    if (!userInput.trim()) return;
    if (!user) {
      addToast('Faça login para utilizar o Especialista.', 'error');
      return;
    }
    if (!user.isPremium) {
      setShowPremiumUpgradeModal(true);
      return;
    }

    setIsAnalyzingMaster(true);
    addToast('Invocando o Diretor Master do ShotCraft... 🎬', 'info');

    try {
      const promptText = `
        Você é o SHOTCRAFT MASTER CINEMATIC DIRECTOR. Sua missão é atuar como Diretor de Fotografia e Diretor de Arte de nível cinematográfico de elite mundial.
        
        Você receberá a ideia simples do usuário: "${userInput}".
        Deverá traduzi-la, expandi-la e detalhá-la de forma espetacular.
        
        Decida todas as opções técnicas e estéticas adequadas escolhendo APENAS os IDs válidos listados abaixo de cada categoria:
        
        Opções disponíveis e seus IDs válidos:
        1. Enquadramento (framing): ${SHOT_TYPES.map(o => `${o.id} (${o.label})`).join(', ')}
        2. Ângulo (angle): ${ANGLES.map(o => `${o.id} (${o.label})`).join(', ')}
        3. Perspectiva (perspective): ${PERSPECTIVES.map(o => `${o.id} (${o.label})`).join(', ')}
        4. Formato (aspect): ${ASPECT_RATIOS.map(o => `${o.id} (${o.label})`).join(', ')}
        5. Lente (lens): ${LENSES.map(o => `${o.id} (${o.label})`).join(', ')}
        6. Iluminação (lighting): ${LIGHTING.map(o => `${o.id} (${o.label})`).join(', ')}
        7. Cenário (environment): ${ENVIRONMENTS.map(o => `${o.id} (${o.label})`).join(', ')}
        8. Estilos (style): ${STYLES.map(o => `${o.id} (${o.label})`).join(', ')}
        9. Detalhes (detail): ${DETAILS.map(o => `${o.id} (${o.label})`).join(', ')}
        
        Regras de Escolha:
        - Escolha EXATAMENTE 1 ID para cada uma das categorias: framing, angle, perspective, aspect, lens, lighting, environment.
        - Escolha de 1 a 3 IDs para style.
        - Escolha de 1 a 3 IDs para detail.
        - Crie uma paleta de cores harmoniosa baseada em teoria das cores (monocromática, complementar, triádica, análoga ou tetrádica) de acordo com a psicologia cromática da cena (por exemplo, vermelho para poder ou perigo, azul para solidão, verde para natureza ou toxicidade, etc.). Defina a paleta usando a regra 60-30-10 (Dominante 60%, Secundária 30%, Destaque/Acento 10%) especificando cores em formato HEX.
        
        Sua resposta deve ser estritamente no formato JSON válido.
        O JSON deve possuir exatamente estas chaves:
        {
          "concept": "Uma descrição conceitual curta e poética do clima, emoção e subtexto visual da cena.",
          "subject": "A descrição rica, cinematográfica e detalhada do assunto em inglês (sem comandos imperativos, apenas descrevendo a cena fisicamente, ex: 'A rugged 40-year-old warrior in battle-worn steel armor, standing under a heavy rain in the middle of a muddy battlefield, tired but determined expression...')",
          "framing": "ID escolhido",
          "angle": "ID escolhido",
          "perspective": "ID escolhido",
          "aspect": "ID escolhido",
          "lens": "ID escolhido",
          "lighting": "ID chosen",
          "environment": "ID escolhido",
          "style": ["ID1", "ID2"],
          "detail": ["ID1", "ID2"],
          "colorPalette": ["#hex1", "#hex2", "#hex3", ...],
          "colorRule603010": {
            "dominant": "#hexDominante",
            "secondary": "#hexSecundario",
            "accent": "#hexDestaque"
          },
          "explanation": "Uma explicação didática super detalhada e explicativa em português (do Brasil) sobre POR QUE cada escolha técnica (enquadramento, ângulo, lente, iluminação, cores) foi feita para contar esta história específica e como cada elemento contribui para a narrativa."
        }
        
        Retorne APENAS o JSON limpo, sem markdown, sem trecho extra de texto.
      `;

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: promptText
      });

      const responseText = result.text || "";
      const cleanJson = responseText.replace(/```json|```/g, '').trim();
      const analysis = JSON.parse(cleanJson);
      
      if (analysis.subject) setSubject(analysis.subject);

      const sanitized = sanitizeSelections({
        framing: analysis.framing || '',
        angle: analysis.angle || '',
        perspective: analysis.perspective || '',
        aspect: analysis.aspect || '',
        lens: analysis.lens || '',
        lighting: analysis.lighting || '',
        environment: analysis.environment || '',
        style: analysis.style || [],
        detail: analysis.detail || [],
        colorPalette: analysis.colorPalette || [],
        colorPaletteId: 'custom',
        useColorRule603010: true,
        colorRule603010: analysis.colorRule603010
      });

      setSelections(sanitized);
      setMasterExplanation(analysis);

      addToast('O Diretor Master organizou sua cena com perfeição! 🎬', 'success');
      setIsAnalyzingMaster(false);
      setActiveStep(11); // Pular diretamente para a revisão
    } catch (error) {
      console.error('Erro ao invocar o Diretor Master:', error);
      setIsAnalyzingMaster(false);
      addToast('Erro ao processar instrução com o Diretor Master.', 'error');
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
      detail: [],
      colorPalette: [],
      colorPaletteId: '',
      lutId: '',
      gradingTechniques: [],
      useColorRule603010: false,
      colorRule603010: {
        dominant: '',
        secondary: '',
        accent: ''
      }
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

    if (selections.colorPalette && selections.colorPalette.length > 0) {
      if (selections.useColorRule603010 && selections.colorRule603010?.dominant && selections.colorRule603010?.secondary && selections.colorRule603010?.accent) {
        parts.push(`using 60-30-10 color rule hierarchy (Dominant Color 60%: ${selections.colorRule603010.dominant}, Secondary Color 30%: ${selections.colorRule603010.secondary}, Accent Color 10%: ${selections.colorRule603010.accent}). The dominant color dominates the environment and mood. The secondary color supports secondary elements and characters. The accent color is strictly reserved for key focal points to guide the viewer's eye. Avoid equal color distribution`);
      } else {
        parts.push(`using color palette reference (${selections.colorPalette.join(', ')})`);
      }
    }

    if (selections.lutId) {
      const lutPrompt = LUTS.find(o => o.id === selections.lutId)?.prompt;
      if (lutPrompt) parts.push(lutPrompt);
    }

    if (selections.gradingTechniques && selections.gradingTechniques.length > 0) {
      selections.gradingTechniques.forEach(id => {
        const techPrompt = GRADING_TECHNIQUES.find(o => o.id === id)?.prompt;
        if (techPrompt) parts.push(techPrompt);
      });
    }

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

  const fallbackCopyTextToClipboard = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    } catch (err) {
      console.error('Fallback copy error:', err);
    }
  };

  const copyToClipboard = () => {
    const success = dataService.consumeCredit();
    if (!success) {
      addToast('Créditos zerados ou período de teste (7 dias) expirado! Compre mais créditos via Pix.', 'error');
      setSelectedPixPlan({ credits: 300, price: 'R$ 19,90' });
      setShowPixModal(true);
      return;
    }

    setUser(dataService.getCurrentUser());

    const doCopy = async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(finalPrompt);
        } else {
          fallbackCopyTextToClipboard(finalPrompt);
        }
      } catch (err) {
        fallbackCopyTextToClipboard(finalPrompt);
      }
    };

    doCopy();
    setCopied(true);
    addToHistory(finalPrompt);
    addToast('Prompt copiado e salvo no histórico! 🪙 1 crédito consumido.', 'success');
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

  // Simulador de Pagamento Pix
  const handleSimulatePixPayment = () => {
    if (!user || !selectedPixPlan) return;
    setIsSimulatingPixPayment(true);
    
    setTimeout(() => {
      dataService.addCredits(user.email, selectedPixPlan.credits);
      setUser(dataService.getCurrentUser());
      setIsSimulatingPixPayment(false);
      setShowPixModal(false);
      addToast(`Pagamento de ${selectedPixPlan.price} confirmado! 🪙 ${selectedPixPlan.credits} créditos adicionados à sua conta.`, 'success');
    }, 1500);
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText("00020101021226870014br.gov.bcb.pix2565shotcraftpixpayloadficticio");
    addToast('Chave Pix copiada para a área de transferência!', 'success');
  };

  // Renderização condicional por página
  if (currentPage === 'landing') {
    return (
      <LandingPage 
        onStart={() => setCurrentPage(user ? 'app' : 'login')} 
        onLoginClick={() => setCurrentPage('login')} 
        theme={theme} 
        themeClasses={themeClasses} 
      />
    );
  }

  if (currentPage === 'login') {
    return (
      <AuthPage 
        onBack={() => setCurrentPage('landing')} 
        onSuccess={(email) => {
          setUser(dataService.getCurrentUser());
          setCurrentPage('app');
        }} 
        theme={theme} 
        themeClasses={themeClasses} 
        addToast={addToast} 
      />
    );
  }

  if (currentPage === 'admin') {
    return (
      <AdminDashboard 
        onBack={() => setCurrentPage('app')} 
        theme={theme} 
        themeClasses={themeClasses} 
        addToast={addToast} 
      />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-indigo-500/30 ${themeClasses.bg} ${themeClasses.text}`}>
      <Toast toasts={toasts} removeToast={removeToast} />

      <Header
        mode={mode} setMode={setMode}
        theme={theme} setTheme={setTheme}
        copyToClipboard={copyToClipboard} copied={copied}
        handleReset={handleReset}
        themeClasses={themeClasses}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        user={user}
        onLogout={() => {
          dataService.setCurrentUser(null);
          setUser(null);
          setCurrentPage('landing');
          addToast('Sessão encerrada.', 'info');
        }}
        onAdminClick={() => setCurrentPage('admin')}
        onBuyCreditsClick={() => {
          setSelectedPixPlan({ credits: 300, price: 'R$ 19,90' });
          setShowPixModal(true);
        }}
        currentPage={currentPage}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentTab === 'builder' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-300">
            {/* Left Column: UI Controls */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <Stepper steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} themeClasses={themeClasses} />

               <StepContent
                activeStep={activeStep} steps={steps}
                subject={subject} setSubject={setSubject}
                isOptimizing={isOptimizing} handleOptimizeSubject={handleOptimizeSubject}
                isTranslating={isTranslating} handleTranslateSubject={handleTranslateSubject}
                isAnalyzing={isAnalyzing} handleAnalyzeReference={handleAnalyzeReference}
                setActiveStep={setActiveStep} getCurrentOptions={getCurrentOptions}
                handleSelect={handleSelect} selections={selections}
                setSelections={setSelections}
                customAspect={customAspect} setCustomAspect={setCustomAspect}
                theme={theme} themeClasses={themeClasses}
                addToast={addToast}
                customPalettes={customPalettes}
                onSaveCustomPalette={handleSaveCustomPalette}
                onDeleteCustomPalette={handleDeleteCustomPalette}
                isPremium={!!user?.isPremium}
                isAnalyzingMaster={isAnalyzingMaster}
                masterExplanation={masterExplanation}
                handleAskMasterDirector={handleAskMasterDirector}
                setShowPremiumUpgradeModal={setShowPremiumUpgradeModal}
                setMasterExplanation={setMasterExplanation}
              />

              <NegativePrompt
                negativePrompt={negativePrompt} setNegativePrompt={setNegativePrompt}
                themeClasses={themeClasses}
              />
            </div>

            {/* Right Column: Preview & Storage */}
            <div className="lg:col-span-4 flex flex-col gap-6 sticky top-8 h-fit">
              <PromptPreview
                finalPrompt={finalPrompt} copyToClipboard={copyToClipboard} copied={copied}
                isSaving={isSaving} setIsSaving={setIsSaving}
                newPresetName={newPresetName} setNewPresetName={setNewPresetName}
                handleSavePreset={handleSavePreset} themeClasses={themeClasses}
              />

              <UserPresets
                userPresets={userPresets} loadUserPreset={(p) => {
                  setSelections(sanitizeSelections(p.selections));
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
          </div>
        ) : currentTab === 'gallery' ? (
          <Gallery
            items={galleryItems}
            user={user}
            theme={theme}
            themeClasses={themeClasses}
            onAddItem={handleAddGalleryItem}
            onDeleteItem={handleDeleteGalleryItem}
            onUpdateItem={handleUpdateGalleryItem}
            addToast={addToast}
          />
        ) : (
          <Library
            theme={theme}
            themeClasses={themeClasses}
            selections={selections}
            handleSelect={handleSelect}
            setCurrentTab={setCurrentTab}
            addToast={addToast}
          />
        )}
      </main>

      {/* Modal Adquirir Créditos via Pix */}
      {showPixModal && selectedPixPlan && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowPixModal(false)} />
          
          <div className={`relative z-10 max-w-md w-full rounded-3xl p-8 border shadow-2xl ${
            theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-[#d3cbb3] text-[#433422]'
          }`}>
            <h3 className="text-xl font-black mb-2 flex items-center gap-2">
              🪙 Comprar Créditos via Pix
            </h3>
            <p className={`text-xs mb-6 ${themeClasses.textMuted}`}>Adicione créditos na sua conta instantaneamente e continue usando o simulador.</p>

            {/* Plan Selector em Modal */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { credits: 100, price: 'R$ 9,90' },
                { credits: 300, price: 'R$ 19,90' },
                { credits: 500, price: 'R$ 29,90' }
              ].map((plan) => (
                <button
                  key={plan.credits}
                  type="button"
                  onClick={() => setSelectedPixPlan(plan)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedPixPlan.credits === plan.credits
                      ? themeClasses.optionActive
                      : themeClasses.option + ' hover:border-[#8b5a2b]/30'
                  }`}
                >
                  <div className="text-xs font-bold">{plan.credits}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">{plan.price}</div>
                </button>
              ))}
            </div>

            {/* Simulação Pix QR Code */}
            <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 flex flex-col items-center gap-4 text-center">
              {/* QR Code Concept */}
              <div className="w-40 h-40 bg-white p-3 rounded-2xl flex items-center justify-center shadow-md relative overflow-hidden">
                {/* SVG do Pix centralizado */}
                <div className="absolute inset-0 m-auto w-10 h-10 bg-white border-4 border-indigo-600 rounded-full flex items-center justify-center font-bold text-indigo-600 text-xs shadow">
                  PIX
                </div>
                {/* Linhas simulando QR Code */}
                <div className="w-full h-full border-4 border-dashed border-zinc-300 rounded-xl" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-zinc-500 block mb-1">Pix Copia e Cola</span>
                <button 
                  onClick={copyPixKey}
                  type="button"
                  className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-black text-indigo-400 rounded-lg hover:bg-zinc-800 transition-colors uppercase tracking-wider"
                >
                  Copiar Código Pix
                </button>
              </div>
            </div>

            {/* Ações */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowPixModal(false)}
                className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all ${
                  theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-[#d3cbb3] hover:bg-black/5'
                }`}
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={handleSimulatePixPayment}
                disabled={isSimulatingPixPayment}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-wider text-white rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${themeClasses.accent}`}
              >
                {isSimulatingPixPayment ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Verificando...
                  </>
                ) : (
                  'Confirmar Pix'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Upgrade Premium via Pix */}
      {showPremiumUpgradeModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowPremiumUpgradeModal(false)} />
          
          <div className={`relative z-10 max-w-md w-full rounded-3xl p-8 border shadow-2xl ${
            theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-[#d3cbb3] text-[#433422]'
          }`}>
            <h3 className="text-xl font-black mb-2 flex items-center gap-2">
              💎 Ativar ShotCraft Premium
            </h3>
            <p className={`text-xs mb-6 ${themeClasses.textMuted}`}>Adquira acesso vitalício ao Especialista Master (System Prompt) para criar direções de fotografia e arte automatizadas por apenas R$ 29,90.</p>

            {/* Simulação Pix QR Code */}
            <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 flex flex-col items-center gap-4 text-center">
              <div className="w-40 h-40 bg-white p-3 rounded-2xl flex items-center justify-center shadow-md relative overflow-hidden">
                <div className="absolute inset-0 m-auto w-10 h-10 bg-white border-4 border-amber-500 rounded-full flex items-center justify-center font-bold text-amber-500 text-xs shadow animate-pulse">
                  PIX
                </div>
                <div className="w-full h-full border-4 border-dashed border-zinc-300 rounded-xl" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-zinc-500 block mb-1">Pix Copia e Cola</span>
                <button 
                  onClick={copyPixKey}
                  type="button"
                  className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-black text-amber-500 rounded-lg hover:bg-zinc-800 transition-colors uppercase tracking-wider"
                >
                  Copiar Código Pix
                </button>
              </div>
            </div>

            {/* Ações */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowPremiumUpgradeModal(false)}
                className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all ${
                  theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-[#d3cbb3] hover:bg-black/5'
                }`}
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!user) return;
                  setIsPayingPremium(true);
                  setTimeout(() => {
                    dataService.setPremiumStatus(user.email, true);
                    setUser(dataService.getCurrentUser());
                    setIsPayingPremium(false);
                    setShowPremiumUpgradeModal(false);
                    addToast(`Sua conta agora é PREMIUM! Especialista Master ativado. 💎🎬`, 'success');
                  }, 1500);
                }}
                disabled={isPayingPremium}
                className="flex-1 py-3 text-xs font-black uppercase tracking-wider text-white rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500"
              >
                {isPayingPremium ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Verificando...
                  </>
                ) : (
                  'Confirmar Pix'
                )}
              </button>
            </div>
          </div>
        </div>
      )}


      <footer className={`max-w-7xl mx-auto px-4 py-8 border-t transition-colors text-center text-xs font-medium uppercase tracking-[0.2em] ${themeClasses.footer}`}>
        ShotCraft &copy; 2026 &mdash; Sistema profissional de prompts de direção de arte
      </footer>
    </div>
  );
}
