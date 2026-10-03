export interface CinematicLookPreset {
  id: string;
  name: string;
  category: 'Cinema' | 'Film Stock' | 'Vintage' | 'Genre' | 'Artistic';
  tagline: string;
  description: string;
  promptSignature: string;
  badge: string;
  iconName?: string;
  settings: {
    colorScienceInput: string;
    colorScienceOutput: string;
    contrast: string;
    blackLevel: string;
    highlightRollOff: string;
    saturation: string;
    shadowTone: string;
    highlightTone: string;
    specularHighlight: string;
    skinTone: string;
    skyTone?: string;
    vegetationTone?: string;
    isolateSubject: boolean;
    halationEnabled: boolean;
    halationIntensity?: 'subtle' | 'medium' | 'strong';
    halationColor?: 'red' | 'amber' | 'orange' | 'red-orange';
    halationSpread?: 'tight' | 'medium' | 'soft';
    filmGrainEnabled: boolean;
    filmFormat?: '8mm' | '16mm' | '35mm' | '65mm';
    grainSize?: 'fine' | 'medium' | 'coarse';
    grainIntensity?: 'subtle' | 'medium' | 'heavy';
    grainCharacter?: 'clean' | 'organic' | 'vintage' | 'rough';
  };
}

export const CINEMATIC_LOOKS_PRESETS: CinematicLookPreset[] = [
  {
    id: 'hollywood-neutral',
    name: 'Hollywood Neutral',
    category: 'Cinema',
    tagline: 'Equilíbrio industrial, pele natural e contraste controlado',
    description: 'Padrão da indústria de cinema com tons de pele realistas, realces contidos, contraste equilibrado e textura cinematográfica refinada.',
    badge: 'Standard Hollywood',
    promptSignature: 'Hollywood studio neutral color science, natural skin tones, controlled highlight roll-off, balanced cinematic contrast, subtle organic film texture',
    settings: {
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
      isolateSubject: false,
      halationEnabled: false,
      filmGrainEnabled: true,
      filmFormat: '35mm',
      grainSize: 'fine',
      grainIntensity: 'subtle',
      grainCharacter: 'clean'
    }
  },
  {
    id: 'kodak-2383',
    name: 'Kodak 2383 Print Inspired',
    category: 'Film Stock',
    tagline: 'O look clássico de película de cinema de estúdio',
    description: 'Emulação do lendário print stock Kodak 2383. Negros densos, realces dourados quentes, saturação de cor controlada e resposta fotoquímica orgânica.',
    badge: 'Lendário 35mm',
    promptSignature: 'Kodak 2383 film print emulation, rich photochemical contrast, warm golden highlights, deep controlled blacks, natural color separation, organic film grain',
    settings: {
      colorScienceInput: 'log',
      colorScienceOutput: 'film-print',
      contrast: 'medium',
      blackLevel: 'deep',
      highlightRollOff: 'creamy',
      saturation: 'restrained',
      shadowTone: 'teal',
      highlightTone: 'golden',
      specularHighlight: 'soft',
      skinTone: 'warm',
      isolateSubject: true,
      halationEnabled: true,
      halationIntensity: 'subtle',
      halationColor: 'amber',
      halationSpread: 'medium',
      filmGrainEnabled: true,
      filmFormat: '35mm',
      grainSize: 'fine',
      grainIntensity: 'medium',
      grainCharacter: 'organic'
    }
  },
  {
    id: '70s-vintage-film',
    name: '70s Nostalgic Film',
    category: 'Vintage',
    tagline: 'Negros levemente lavados, luzes quentes e halation suave',
    description: 'Estética cinematográfica dos anos 70. Sombras elevadas (lifted blacks), realces âmbar, saturação atenuada e halo avermelhado em pontos de luz.',
    badge: 'Vintage Retrô',
    promptSignature: '1970s vintage film print aesthetic, lifted faded blacks, warm amber highlights, muted nostalgic saturation, visible organic grain, subtle red film halation',
    settings: {
      colorScienceInput: 'vintage',
      colorScienceOutput: 'film-print',
      contrast: 'soft',
      blackLevel: 'lifted',
      highlightRollOff: 'soft',
      saturation: 'desaturated',
      shadowTone: 'cool',
      highlightTone: 'amber',
      specularHighlight: 'soft',
      skinTone: 'warm',
      isolateSubject: false,
      halationEnabled: true,
      halationIntensity: 'medium',
      halationColor: 'red-orange',
      halationSpread: 'soft',
      filmGrainEnabled: true,
      filmFormat: '16mm',
      grainSize: 'medium',
      grainIntensity: 'medium',
      grainCharacter: 'vintage'
    }
  },
  {
    id: 'dark-thriller',
    name: 'Dark Thriller Suspense',
    category: 'Genre',
    tagline: 'Negros profundos, sombras frias e paleta dessaturada',
    description: 'Visual tenso e imersivo para suspense e mistério. Tons de sombra verde-azulados, altas luzes contidas e clima opressivo.',
    badge: 'Suspense & Drama',
    promptSignature: 'dark thriller cinematic grading, deep oppressive blacks, cold teal shadows, restrained highlight luminance, desaturated cold color palette',
    settings: {
      colorScienceInput: 'log',
      colorScienceOutput: 'high-contrast',
      contrast: 'high',
      blackLevel: 'deep',
      highlightRollOff: 'hard',
      saturation: 'desaturated',
      shadowTone: 'teal',
      highlightTone: 'neutral',
      specularHighlight: 'controlled',
      skinTone: 'neutral',
      skyTone: 'desaturated',
      isolateSubject: true,
      halationEnabled: false,
      filmGrainEnabled: true,
      filmFormat: '35mm',
      grainSize: 'fine',
      grainIntensity: 'subtle',
      grainCharacter: 'rough'
    }
  },
  {
    id: 'cold-future-scifi',
    name: 'Cold Future Sci-Fi',
    category: 'Genre',
    tagline: 'Ciano e neon frio, pele neutra e microcontraste alto',
    description: 'Ambiente futurista e cyberpunk refinado. Sombras ciano e azuis profundas, separação cromática nítida e realces metálicos.',
    badge: 'Cyberpunk & Sci-Fi',
    promptSignature: 'cold future sci-fi cinematic color science, deep cyan shadows, neutral clean skin tones, high microcontrast, sharp specular highlight roll-off',
    settings: {
      colorScienceInput: 'digital-clean',
      colorScienceOutput: 'hdr-cinematic',
      contrast: 'high',
      blackLevel: 'deep',
      highlightRollOff: 'natural',
      saturation: 'rich',
      shadowTone: 'blue',
      highlightTone: 'neutral',
      specularHighlight: 'intense',
      skinTone: 'neutral',
      skyTone: 'deep-blue',
      isolateSubject: true,
      halationEnabled: true,
      halationIntensity: 'subtle',
      halationColor: 'orange',
      halationSpread: 'tight',
      filmGrainEnabled: false
    }
  },
  {
    id: 'modern-noir',
    name: 'Modern Noir Monochrome',
    category: 'Artistic',
    tagline: 'Chiaroscuro dramático, negros absolutos e separação tonal',
    description: 'Iluminação chiaroscuro de alto impacto. Preto e branco técnico com separação cirúrgica entre zonas de sombra e altas luzes especulares.',
    badge: 'Noir de Alto Contraste',
    promptSignature: 'modern noir chiaroscuro tone mapping, deep absolute blacks, hard dramatic tonal separation, luminous specular highlights, subtle photographic grain',
    settings: {
      colorScienceInput: 'log',
      colorScienceOutput: 'high-contrast',
      contrast: 'extreme',
      blackLevel: 'deep',
      highlightRollOff: 'hard',
      saturation: 'desaturated',
      shadowTone: 'neutral',
      highlightTone: 'neutral',
      specularHighlight: 'intense',
      skinTone: 'neutral',
      isolateSubject: true,
      halationEnabled: false,
      filmGrainEnabled: true,
      filmFormat: '35mm',
      grainSize: 'fine',
      grainIntensity: 'medium',
      grainCharacter: 'clean'
    }
  },
  {
    id: 'golden-hour-indie',
    name: 'Golden Hour Indie Film',
    category: 'Cinema',
    tagline: 'Realces dourados radiantes, sombras azuladas suaves e pele quente',
    description: 'Sensação poética de cinema independente durante o pôr do sol. Realces envolventes em tons de ouro e âmbar com roll-off cremoso.',
    badge: 'Indie & Cinema de Autor',
    promptSignature: 'golden hour cinematic film look, soft warm highlights, creamy highlight roll-off, gentle cool-warm complementary contrast, radiant warm skin tones, fine 35mm grain',
    settings: {
      colorScienceInput: 'filmic',
      colorScienceOutput: 'film-print',
      contrast: 'soft',
      blackLevel: 'natural',
      highlightRollOff: 'creamy',
      saturation: 'rich',
      shadowTone: 'cool',
      highlightTone: 'golden',
      specularHighlight: 'soft',
      skinTone: 'golden',
      skyTone: 'cyan',
      isolateSubject: true,
      halationEnabled: true,
      halationIntensity: 'medium',
      halationColor: 'amber',
      halationSpread: 'soft',
      filmGrainEnabled: true,
      filmFormat: '35mm',
      grainSize: 'fine',
      grainIntensity: 'subtle',
      grainCharacter: 'organic'
    }
  },
  {
    id: 'bleach-bypass-action',
    name: 'Bleach Bypass (Matrix / Fincher)',
    category: 'Genre',
    tagline: 'Prata residual, alto contraste, dessaturação seletiva',
    description: 'Processo químico de retenção de prata. Contraste tonal agressivo, saturação atenuada e texturas marcadas.',
    badge: 'Ação & Fincher Look',
    promptSignature: 'bleach bypass photochemical process, high dynamic contrast, restrained muted saturation, rich metallic textures, sharp shadow definition',
    settings: {
      colorScienceInput: 'log',
      colorScienceOutput: 'high-contrast',
      contrast: 'high',
      blackLevel: 'deep',
      highlightRollOff: 'hard',
      saturation: 'desaturated',
      shadowTone: 'green',
      highlightTone: 'neutral',
      specularHighlight: 'intense',
      skinTone: 'neutral',
      isolateSubject: false,
      halationEnabled: false,
      filmGrainEnabled: true,
      filmFormat: '35mm',
      grainSize: 'medium',
      grainIntensity: 'heavy',
      grainCharacter: 'rough'
    }
  }
];

export const COLOR_SCIENCE_INPUTS = [
  { id: 'digital-clean', label: 'Digital Clean', desc: 'Sensor digital nítido e balanceado sem distorções' },
  { id: 'log', label: 'LOG Gamma (C-Log / S-Log / Arri LogC)', desc: 'Ampla latitude de alcance dinâmico com realces e sombras preservadas' },
  { id: 'filmic', label: 'Filmic Response', desc: 'Curva tonal suave imitando a resposta química de película' },
  { id: 'vintage', label: 'Vintage Stock', desc: 'Estética envelhecida com negros ligeiramente levantados' },
  { id: 'neutral', label: 'Studio Neutral', desc: 'Curva linear científica para máxima fidelidade de cor' }
];

export const COLOR_SCIENCE_OUTPUTS = [
  { id: 'natural', label: 'Natural Look', desc: 'Reprodução fiel e agradável para visual documental e realista' },
  { id: 'rec709', label: 'Rec.709 Standard', desc: 'Padrão universal de exibição para monitores e celulares' },
  { id: 'cinematic', label: 'Cinematic Dynamic', desc: 'Tratamento de alto impacto para cinema contemporâneo' },
  { id: 'film-print', label: 'Film Print (Kodak/Fuji)', desc: 'Visual analógico com densidade química e separação rica' },
  { id: 'hdr-cinematic', label: 'HDR Wide Gamut', desc: 'Gama ultra ampla com realces luminosos e negros profundos' },
  { id: 'high-contrast', label: 'High Contrast Drama', desc: 'Curva de contraste fechada para drama e suspense' }
];

export const CONTRAST_OPTIONS = [
  { id: 'soft', label: 'Soft (Suave)', desc: 'Contraste suave e orgânico com sombras abertas' },
  { id: 'natural', label: 'Natural (Balanceado)', desc: 'Contraste de estúdio realista e equilibrado' },
  { id: 'medium', label: 'Medium Film', desc: 'Contraste cinematográfico padrão' },
  { id: 'high', label: 'High Impact', desc: 'Sombras fortes e realces destacados' },
  { id: 'extreme', label: 'Extreme Dramatic', desc: 'Pretos absolutos e iluminação chiaroscuro' }
];

export const BLACK_LEVEL_OPTIONS = [
  { id: 'deep', label: 'Deep Blacks (Profundo)', desc: 'Pretos fechados e limpos sem ruído' },
  { id: 'natural', label: 'Natural Blacks', desc: 'Pretos realistas preservando texturas sutis' },
  { id: 'lifted', label: 'Lifted Shadows (Levantado)', desc: 'Sombras levemente clareadas com visual vintage' },
  { id: 'faded', label: 'Faded Film (Lavado)', desc: 'Negros leitosos e nostálgicos anos 60/70' }
];

export const HIGHLIGHT_ROLLOFF_OPTIONS = [
  { id: 'creamy', label: 'Creamy Roll-off', desc: 'Transição ultra suave e sedosa nas áreas brilhantes' },
  { id: 'soft', label: 'Soft Natural', desc: 'Degradê suave sem recortes bruscos' },
  { id: 'natural', label: 'Natural Standard', desc: 'Equilíbrio padrão de luzes e realces' },
  { id: 'hard', label: 'Hard Direct', desc: 'Luz direta e especular bem definida' }
];

export const SHADOW_TONE_OPTIONS = [
  { id: 'neutral', label: 'Neutro', color: '#3f3f46' },
  { id: 'cool', label: 'Frio Sutil', color: '#38bdf8' },
  { id: 'blue', label: 'Azul Profundo', color: '#2563eb' },
  { id: 'teal', label: 'Teal Cinematográfico', color: '#0d9488' },
  { id: 'green', label: 'Verde Matrix/Thriller', color: '#16a34a' }
];

export const HIGHLIGHT_TONE_OPTIONS = [
  { id: 'neutral', label: 'Neutro Limpo', color: '#f4f4f5' },
  { id: 'warm', label: 'Quente Suave', color: '#fed7aa' },
  { id: 'golden', label: 'Ouro / Golden Hour', color: '#f59e0b' },
  { id: 'amber', label: 'Âmbar Envolvente', color: '#d97706' }
];

export const SKIN_TONE_OPTIONS = [
  { id: 'natural', label: 'Natural & Fiel', desc: 'Tons de pele autênticos e preservados' },
  { id: 'warm', label: 'Warm Glow', desc: 'Pele aquecida, saudável e cinematográfica' },
  { id: 'golden', label: 'Golden Radiance', desc: 'Brilho dourado iluminado' },
  { id: 'rosy', label: 'Rosy Peach', desc: 'Tons rosados e aveludados' },
  { id: 'neutral', label: 'Studio Neutral', desc: 'Equilíbrio térmico rigoroso' }
];

export const SKY_TONE_OPTIONS = [
  { id: 'none', label: 'Não Alterar Céu', desc: 'Mantém iluminação ambiental' },
  { id: 'cyan', label: 'Ciano Luminoso', desc: 'Céu ciano vibrante de cinema' },
  { id: 'deep-blue', label: 'Azul Cobalto Profundo', desc: 'Céu azul rico e polarizado' },
  { id: 'teal', label: 'Teal Blockbuster', desc: 'Estética moderna de Hollywood' },
  { id: 'desaturated', label: 'Dessaturado / Tempestade', desc: 'Clima denso e nublado' }
];

export const VEGETATION_TONE_OPTIONS = [
  { id: 'none', label: 'Não Alterar Vegetação', desc: 'Mantém folhagens naturais' },
  { id: 'natural-green', label: 'Verde Natural Vivo', desc: 'Folhagens frescas e orgânicas' },
  { id: 'emerald', label: 'Verde Esmeralda Nobre', desc: 'Tons de floresta cinematográfica' },
  { id: 'olive', label: 'Verde Oliva Muted', desc: 'Estética clássica de filme de época' },
  { id: 'dark-green', label: 'Verde Escuro Profundo', desc: 'Densidade de selva ou floresta noturna' }
];

export const FILM_FORMAT_OPTIONS = [
  { id: 'off', label: 'Sem Grão (Digital Puro)' },
  { id: '8mm', label: '8mm Super 8 (Intenso e Retrô)' },
  { id: '16mm', label: '16mm Indie (Textura Marcante)' },
  { id: '35mm', label: '35mm Cinema Standard (Clássico Nobre)' },
  { id: '65mm', label: '65mm / 70mm IMAX (Grão Ultra Fino)' }
];
