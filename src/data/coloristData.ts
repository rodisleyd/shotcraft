/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DrawingTypeOption {
  id: string;
  label: string;
  description: string;
  promptPhrase: string;
  icon: string;
}

export interface PaintingTechniqueOption {
  id: string;
  label: string;
  category: 'Tradicional' | 'Ilustração & Quadrinhos' | 'Digital & Estilizado';
  description: string;
  prompt: string;
  sampleImage?: string;
  suggestedPaper?: string;
}

export interface ColorMoodOption {
  id: string;
  name: string;
  category: string;
  colors: string[];
  description: string;
  prompt: string;
  rule603010: {
    dominant: string;
    secondary: string;
    accent: string;
  };
}

export interface HarmonyOption {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

export interface LightingOption {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

export interface TemperatureOption {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

export interface PaperTextureOption {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

export const DRAWING_TYPES: DrawingTypeOption[] = [
  {
    id: 'nanquim',
    label: 'Nanquim / Tinta Preta Limpa',
    description: 'Line art com contornos pretos firmes e bem definidos.',
    promptPhrase: 'clean black india ink line art and contours',
    icon: '✒️'
  },
  {
    id: 'lapis',
    label: 'Esboço a Lápis / Grafite 2B',
    description: 'Desenho a grafite com hachuras leves e linhas de construção.',
    promptPhrase: 'delicate graphite pencil sketch linework and shading',
    icon: '✏️'
  },
  {
    id: 'rascunho',
    label: 'Rascunho Solto / Loose Sketch',
    description: 'Linhas gestuais, rascunho rápido e orgânico de sketchbook.',
    promptPhrase: 'expressive gestural raw sketchbook pencil lines',
    icon: '📝'
  },
  {
    id: 'digital',
    label: 'Line Art Digital Vetorial',
    description: 'Traço digital perfeito, espessuras uniformes ou estilizadas.',
    promptPhrase: 'clean crisp digital vector line art',
    icon: '💻'
  },
  {
    id: 'manga',
    label: 'Traço de Mangá / Comics',
    description: 'Arte-final dinâmica com variação de espessura (pena G / pincel).',
    promptPhrase: 'dynamic manga and comic book pen inking lines',
    icon: '📖'
  }
];

export const PAINTING_TECHNIQUES: PaintingTechniqueOption[] = [
  {
    id: 'guache',
    label: 'Guache Tradicional',
    category: 'Tradicional',
    description: 'Cores opacas e aveludadas, transições suaves, pinceladas ricas com corpo de tinta fosco.',
    prompt: 'authentic gouache painting technique, rich opaque matte pigments, velvety smooth blending, visible dry-brush bristle textures, subtle tactile paint layering',
    sampleImage: '/images/styles/guache-ilustrado-storybook.png',
    suggestedPaper: 'cold-press'
  },
  {
    id: 'guache-storybook',
    label: 'Guache Ilustrado (Storybook)',
    category: 'Tradicional',
    description: 'Estilo clássico de livros infantis europeus, pinceladas secas artesanais, cores calorosas e encantadoras.',
    prompt: 'whimsical storybook gouache illustration, artisan textured gouache on cold-press art paper, visible dry brush strokes, charming warm-and-cool contrast coloring',
    sampleImage: '/images/styles/guache-ilustrado-storybook.png',
    suggestedPaper: 'cold-press'
  },
  {
    id: 'aquarela',
    label: 'Aquarela Fluida (Wet-on-Wet)',
    category: 'Tradicional',
    description: 'Pigmentos translúcidos diluídos em água, fusão suave de cores e poças orgânicas secando nas bordas.',
    prompt: 'traditional translucent watercolor washes, soft wet-on-wet color blending, delicate pigment pooling along natural edges, fluid water staining on heavy cotton paper',
    sampleImage: '/images/styles/aquarela-aplicada.png',
    suggestedPaper: 'cold-press'
  },
  {
    id: 'oleo',
    label: 'Pintura a Óleo (Impasto Suave)',
    category: 'Tradicional',
    description: 'Volume amanteigado, mesclagem rica de tintas a óleo, textura sutil de tela e profundidade de luz.',
    prompt: 'traditional master oil painting technique, buttery paint blending, rich luminous color glaze depth, subtle impasto relief, soft woven canvas texture',
    sampleImage: '/images/styles/tipo-oleo-arcoiris.png',
    suggestedPaper: 'canvas'
  },
  {
    id: 'acrilica',
    label: 'Acrílica Vibrante',
    category: 'Tradicional',
    description: 'Cores com alto brilho cromático, secagem rápida, camadas sobrepostas limpas e grande intensidade.',
    prompt: 'vibrant acrylic painting technique, crisp layered brushstrokes, high color saturation, smooth satin finish with sharp color separation',
    sampleImage: '/images/styles/vector-art-modern.png',
    suggestedPaper: 'smooth-bristol'
  },
  {
    id: 'lapis-cor',
    label: 'Lápis de Cor Artístico (Prismacolor)',
    category: 'Tradicional',
    description: 'Degradês finos à base de cera, hachuras coloridas sobrepostas com textura do papel aparecendo.',
    prompt: 'professional colored pencil art technique, fine wax-based pencil layering, delicate crosshatched color shading, visible paper tooth texture peeking through rich pigments',
    sampleImage: '/images/styles/ponta-de-feltro.png',
    suggestedPaper: 'cold-press'
  },
  {
    id: 'pastel-oleoso',
    label: 'Pastel Oleoso / Giz Pastel',
    category: 'Tradicional',
    description: 'Textura cremosa e tátil de giz a óleo, esfumados táteis densos, raspagens sutis e relevo físico.',
    prompt: 'expressive oil pastel drawing technique, thick creamy waxy strokes, soft hand-blended smudges, rich tactile impasto, heavy textured paper grain',
    sampleImage: '/images/styles/pastel-oleoso.png',
    suggestedPaper: 'cold-press'
  },
  {
    id: 'pastel-seco',
    label: 'Pastel Seco / Esfumado',
    category: 'Tradicional',
    description: 'Pó aveludado, transições etéreas ultra suaves de luz e sombra, acabamento fosco suave.',
    prompt: 'soft dry pastel art technique, velvety chalky powder texture, ethereal diffused color transitions, delicate fingertip blending on toothy paper',
    suggestedPaper: 'cold-press'
  },
  {
    id: 'david-aja-flat',
    label: 'Flat Colors / Estilo David Aja',
    category: 'Ilustração & Quadrinhos',
    description: 'Cores sólidas em blocos chapados, sem degradês modernos, paleta retrô de serigrafia vintage.',
    prompt: 'David Aja signature comic coloring style, solid flat color blocks, limited retro screenprint palette, clean fills strictly underneath linework, no digital gradients, vintage off-white newsprint aesthetic',
    sampleImage: '/images/styles/david-aja-cores.png',
    suggestedPaper: 'vintage-newsprint'
  },
  {
    id: 'cel-shading',
    label: 'Cel Shading Anime / Animação 2D',
    category: 'Ilustração & Quadrinhos',
    description: 'Sombras duras de 2 tons clássicas de animes, cores puras e luminosas, estilo celulóide.',
    prompt: 'classic anime cel-shading coloring, crisp 2-step hard shadow cutoffs, clean bright solid colors, animation cel transparency aesthetic, razor-sharp shadow edges',
    sampleImage: '/images/styles/2d-estilo-soft.png',
    suggestedPaper: 'smooth-bristol'
  },
  {
    id: 'marcadores',
    label: 'Marcadores Artísticos (Estilo Copic)',
    category: 'Ilustração & Quadrinhos',
    description: 'Pinceladas visíveis de caneta marcador a álcool, sobreposições translúcidas, cores ricas.',
    prompt: 'professional Copic alcohol marker illustration coloring, visible overlapping marker strokes, vibrant translucent ink pooling, smooth marker gradients on heavy sketch paper',
    sampleImage: '/images/styles/ponta-de-feltro.png',
    suggestedPaper: 'smooth-bristol'
  },
  {
    id: 'aguada-nanquim',
    label: 'Aguada de Nanquim / Sumi-e (Monocromático)',
    category: 'Ilustração & Quadrinhos',
    description: 'Tons líquidos de cinza e preto diluído em água, criando volume e luz com estética oriental.',
    prompt: 'traditional diluted india ink wash and sumi-e shading, translucent watery gray tonal washes, fluid liquid depth, strict monochromatic gray and black values on rice paper',
    sampleImage: '/images/styles/aguada-nanquim.png',
    suggestedPaper: 'cold-press'
  },
  {
    id: 'digital-painting-soft',
    label: 'Pintura Digital Soft / Concept Art',
    category: 'Digital & Estilizado',
    description: 'Mesclagem digital refinada, oclusão de ambiente sutil, iluminação cinematográfica e cores ricas.',
    prompt: 'high-end digital concept art coloring, soft ambient occlusion, gentle smooth brush blending, refined dimensional volume, polished subsurface scattering',
    sampleImage: '/images/styles/semi-realista.png',
    suggestedPaper: 'none'
  },
  {
    id: 'screenprint-pop',
    label: 'Serigrafia Pop Art / Risografia',
    category: 'Digital & Estilizado',
    description: 'Impressão serigráfica com pontos sutis de meio-tom (halftone), cores fluorescentes e sobreposição gráfica.',
    prompt: 'risograph and vintage screenprint color separation, subtle halftone dot shading, electric fluorescent spot colors, charming analog ink registration misalignments',
    sampleImage: '/images/styles/arte-final-comics.png',
    suggestedPaper: 'vintage-newsprint'
  }
];

export const COLOR_MOODS: ColorMoodOption[] = [
  {
    id: 'drama-melancolia',
    name: 'Drama & Melancolia',
    category: 'Cinema & Emoção',
    colors: ['#4f5d75', '#a4b0be', '#747d8c', '#2f3542', '#eccc68'],
    description: 'Sentimentos profundos, solidão e reflexão. Azuis frios acinzentados com toque de bege pálido.',
    prompt: 'melancholic and dramatic mood, desaturated cold slate blues, misty pearl grays, somber quiet undertones with subtle pale beige highlight',
    rule603010: { dominant: '#4f5d75', secondary: '#747d8c', accent: '#eccc68' }
  },
  {
    id: 'terror-tensao',
    name: 'Terror & Tensão Psicológica',
    category: 'Terror & Suspense',
    colors: ['#3c4f5e', '#4a5340', '#111213', '#7d1c1c', '#d2d2d2'],
    description: 'Insanidade, claustrofobia e medo. Tons esverdeados de hospital, cinza asfalto e vermelho coagulado.',
    prompt: 'psychological horror and tension atmosphere, sickly muted greenish grays, ominous murky asphalt blacks, unsettling dried blood red accents',
    rule603010: { dominant: '#3c4f5e', secondary: '#4a5340', accent: '#7d1c1c' }
  },
  {
    id: 'coragem-heroismo',
    name: 'Coragem & Heroísmo',
    category: 'Cinema & Ação',
    colors: ['#eb3b5a', '#3867d6', '#f7b731', '#2f3542', '#ffffff'],
    description: 'Atos nobres e impacto épico. Vermelho escarlate heroico, azul marinho profundo e ouro cintilante.',
    prompt: 'heroic epic mood, bold vibrant scarlet red, deep royal navy blue, gleaming golden yellow accents with crisp contrast',
    rule603010: { dominant: '#3867d6', secondary: '#eb3b5a', accent: '#f7b731' }
  },
  {
    id: 'romance-nostalgia',
    name: 'Romance & Nostalgia Retrô',
    category: 'Animação & Romance',
    colors: ['#c88b90', '#e8d8c8', '#e5c158', '#f08080', '#4e3629'],
    description: 'Memória afetiva, carinho e calor. Rosa antigo empoeirado, bege cremoso e ouro de entardecer.',
    prompt: 'nostalgic romantic atmosphere, dusty antique rose, warm creamy beige, golden sunset amber glow with soft tender warmth',
    rule603010: { dominant: '#e8d8c8', secondary: '#c88b90', accent: '#e5c158' }
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk & Alta Tecnologia',
    category: 'Sci-Fi & Futurista',
    colors: ['#ff007f', '#00f5d4', '#7b2cbf', '#0c0c0e', '#ffeaa7'],
    description: 'Distopia urbana, neon noturno. Magenta fluorescente, ciano elétrico e roxo profundo.',
    prompt: 'cyberpunk futuristic color scheme, electric magenta neon, glowing cyan teal highlights, deep midnight purple shadows with wet reflections',
    rule603010: { dominant: '#0c0c0e', secondary: '#7b2cbf', accent: '#00f5d4' }
  },
  {
    id: 'dark-fantasy',
    name: 'Dark Fantasy & Mistério',
    category: 'Fantasia & RPG',
    colors: ['#3f4a3c', '#5c4033', '#1a1a1a', '#b89047', '#8b3a3a'],
    description: 'Magia antiga e castelos medievais. Verde musgo, terra queimada, couro e ouro envelhecido.',
    prompt: 'dark fantasy medieval atmosphere, weathered moss green, earthy umber brown, antique tarnished gold and deep blood burgundy accents',
    rule603010: { dominant: '#3f4a3c', secondary: '#5c4033', accent: '#b89047' }
  },
  {
    id: 'verao-tropical',
    name: 'Verão Tropical & Alegria',
    category: 'Animação & Natureza',
    colors: ['#fed330', '#2bcbba', '#fd9644', '#26de81', '#fc5c65'],
    description: 'Vivacidade, calor e energia. Amarelo sol, azul turquesa, coral quente e verde folhagem.',
    prompt: 'vibrant tropical summer palette, sunburst marigold yellow, brilliant turquoise aqua, energetic coral orange and lush green tones',
    rule603010: { dominant: '#fed330', secondary: '#2bcbba', accent: '#fc5c65' }
  },
  {
    id: 'inverno-congelante',
    name: 'Inverno Ártico & Solidão',
    category: 'Natureza & Atmosfera',
    colors: ['#45aaf2', '#d1d8e0', '#ffffff', '#778ca3', '#2c3e50'],
    description: 'Frio extremo, pureza e calma. Azul gelo, cinza polar, branco neve e cobalto sombrio.',
    prompt: 'glacial arctic winter palette, icy subzero blues, frosty slate gray, pure snowy whites with deep subzero navy shadows',
    rule603010: { dominant: '#d1d8e0', secondary: '#45aaf2', accent: '#ffffff' }
  },
  {
    id: 'outono-acolhedor',
    name: 'Outono Acolhedor (Warm Cozy)',
    category: 'Natureza & Atmosfera',
    colors: ['#b45309', '#d97706', '#78350f', '#fef3c7', '#451a03'],
    description: 'Aconchego, folhas secas e luz suave. Âmbar, siena queimada, terracota e creme suave.',
    prompt: 'cozy autumn forest palette, rich burnt sienna, warm amber gold, toasted pumpkin orange, rustic chestnut brown and warm cream highlights',
    rule603010: { dominant: '#d97706', secondary: '#78350f', accent: '#fef3c7' }
  }
];

export const COLOR_HARMONIES: HarmonyOption[] = [
  {
    id: 'balanced',
    name: 'Harmonia Equilibrada (Natural)',
    description: 'Cores que combinam naturalmente de acordo com o tema.',
    prompt: 'harmonious natural color balance'
  },
  {
    id: 'complementary',
    name: 'Complementar (Alto Impacto)',
    description: 'Cores opostas no círculo cromático que geram forte contraste e vibração.',
    prompt: 'striking complementary color harmony with bold warm-and-cool contrast'
  },
  {
    id: 'analogous',
    name: 'Análoga (Suave & Unificada)',
    description: 'Cores vizinhas que criam uma atmosfera calma e coesa.',
    prompt: 'smooth analogous color harmony, cohesive and unified tonal transitions'
  },
  {
    id: 'triadic',
    name: 'Tríade (Rica & Lúdica)',
    description: 'Três cores equidistantes gerando equilíbrio dinâmico e alegre.',
    prompt: 'rich dynamic triadic color harmony with balanced vibrant distribution'
  },
  {
    id: 'monochromatic',
    name: 'Monocromática (Elegante & Focada)',
    description: 'Variações de brilho e saturação de um único tom principal.',
    prompt: 'refined monochromatic color scheme with rich tonal value hierarchy'
  }
];

export const LIGHTING_OPTIONS: LightingOption[] = [
  {
    id: 'soft-diffuse',
    name: 'Luz Suave & Difusa',
    description: 'Iluminação suave sem sombras duras, ideal para transições delicadas.',
    prompt: 'soft diffused ambient lighting, gentle smooth tonal gradients, subtle ambient shadows'
  },
  {
    id: 'directional-side',
    name: 'Luz Lateral Modeladora',
    description: 'Destaque de volume e relevo através de luz lateral vinda de um ângulo.',
    prompt: 'directional side key lighting, strong three-dimensional volume carving, rich midtone contrast'
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour (Luz Dourada de Pôr do Sol)',
    description: 'Luz rasante e quente com sombras longas e quentes.',
    prompt: 'radiant golden hour sunlight, warm amber light beams, long soft romantic cast shadows'
  },
  {
    id: 'rim-light',
    name: 'Luz de Contorno (Rim Light)',
    description: 'Fio de luz brilhante nas bordas destacando a silhueta da arte.',
    prompt: 'dramatic rim lighting outlining contours, stylized backlight edge glow, strong silhouette separation'
  },
  {
    id: 'chiaroscuro',
    name: 'Chiaroscuro Pintoresco (Claro-Escuro)',
    description: 'Contraste dramático clássico com sombras profundas e luz pontual.',
    prompt: 'classical painterly chiaroscuro lighting, deep mysterious shadow pools, focal point luminous illumination'
  },
  {
    id: 'flat-2d',
    name: 'Luz Chapada / Uniforme (Gráfico 2D)',
    description: 'Sem sombras realistas, priorizando a pureza das tintas e do traço.',
    prompt: 'flat uniform lighting, minimalist clean shadows, pure graphic art aesthetic'
  }
];

export const TEMPERATURE_OPTIONS: TemperatureOption[] = [
  {
    id: 'warm',
    name: 'Quente (Âmbar / Solar)',
    description: 'Tons dourados, alaranjados e aconchegantes.',
    prompt: 'warm color temperature with glowing golden undertones'
  },
  {
    id: 'cool',
    name: 'Fria (Azulada / Crepúsculo)',
    description: 'Tons azulados, cianos e atmosfera de mistério.',
    prompt: 'cool color temperature with soothing blue and teal undertones'
  },
  {
    id: 'neutral',
    name: 'Neutra (Luz do Dia 5500K)',
    description: 'Cores fiéis e balanceadas sem distorção térmica.',
    prompt: 'neutral balanced daylight color temperature, accurate authentic color representation'
  },
  {
    id: 'split-warm-cool',
    name: 'Bipartida (Luz Quente + Sombra Fria)',
    description: 'O clássico contraste cinematográfico de luz solar e sombras azuladas.',
    prompt: 'dynamic split temperature with warm sunny highlights and cool contrasting ambient shadows'
  }
];

export const PAPER_TEXTURES: PaperTextureOption[] = [
  {
    id: 'cold-press',
    name: 'Papel Aquarela Algodão (Cold Press)',
    description: 'Granulação tátil e orgânica de papel de arte de alta gramatura.',
    prompt: 'on heavy-weight cold-press watercolor paper with tactile organic tooth and subtle grain texture'
  },
  {
    id: 'canvas',
    name: 'Tela de Linho Clássica (Canvas)',
    description: 'Textura tramada de tela de pintura a óleo tradicional.',
    prompt: 'on fine artist woven linen canvas with delicate weave texture'
  },
  {
    id: 'vintage-newsprint',
    name: 'Papel de Quadrinhos Vintage / Off-White',
    description: 'Papel levemente amarelado de gibi retrô com textura porosa.',
    prompt: 'on aged off-white pulp comic newsprint paper with subtle vintage paper fibers'
  },
  {
    id: 'kraft',
    name: 'Papel Kraft / Pardo Texturizado',
    description: 'Fundo pardo rústico com fibras aparentes.',
    prompt: 'on textured brown kraft art paper with visible natural speckles and fibrous warmth'
  },
  {
    id: 'smooth-bristol',
    name: 'Papel Bristol Liso (Digital / Manga)',
    description: 'Superfície branca pura e lisa para coloração limpa.',
    prompt: 'on ultra-smooth bright white Bristol illustration board with clean edges'
  },
  {
    id: 'none',
    name: 'Sem Textura (Acabamento Digital Puro)',
    description: 'Foco apenas na pintura sem simulação de suporte físico.',
    prompt: 'pure clean digital rendering without artificial paper texture overlays'
  }
];

export const PLATFORM_GUIDES = [
  {
    name: 'Midjourney',
    badge: 'Image-to-Image / Remix',
    icon: '🎨',
    steps: [
      'Carregue sua line art no chat do Discord ou na Web UI do Midjourney.',
      'Copie o link direto da imagem e use no início do prompt.',
      'Cole o Prompt de Colorista gerado aqui no Shotcraft.',
      'Recomendação: Adicione o parâmetro `--iw 2` ou `--iw 1.8` no final para priorizar a fidelidade do seu traço original.'
    ]
  },
  {
    name: 'Stable Diffusion / Fooocus / Forge',
    badge: 'ControlNet Lineart / Canny',
    icon: '⚡',
    steps: [
      'No painel ControlNet, envie sua imagem de traço e selecione o modelo `control_v11p_sd15_lineart` ou `lineart_realistic`.',
      'No prompt positivo, cole o Prompt de Colorista gerado pelo Shotcraft.',
      'Defina o Control Weight entre `0.8` e `1.0` e o Ending Step em `0.85` para permitir que a pintura preencha com fluidez.',
      'Gere a imagem e veja as cores preenchendo seu traço perfeitamente!'
    ]
  },
  {
    name: 'ChatGPT / DALL-E 3 / Gemini Multimodal',
    badge: 'Prompt com Anexo',
    icon: '🤖',
    steps: [
      'Anexe o arquivo do seu esboço/line art na conversa.',
      'Cole o Prompt de Colorista do Shotcraft logo abaixo do anexo.',
      'A IA reconhecerá o desenho como esqueleto mestre e aplicará exclusivamente a técnica e paleta selecionadas.'
    ]
  }
];

export function buildColoristPrompt(params: {
  drawingType: string;
  techniqueId: string;
  paletteId: string;
  useCustom603010: boolean;
  rule603010: { dominant: string; secondary: string; accent: string };
  colorMoodId: string;
  lightingId: string;
  temperatureId: string;
  paperId: string;
  colorIntensity: 'vibrant' | 'balanced' | 'muted' | 'monochrome';
  customPaletteName?: string;
  customPaletteColors?: string[];
  customNotes?: string;
}): string {
  const drawingTypeObj = DRAWING_TYPES.find(d => d.id === params.drawingType) || DRAWING_TYPES[0];
  const techniqueObj = PAINTING_TECHNIQUES.find(t => t.id === params.techniqueId) || PAINTING_TECHNIQUES[0];
  const moodObj = COLOR_MOODS.find(m => m.id === params.colorMoodId) || COLOR_MOODS[0];
  const lightingObj = LIGHTING_OPTIONS.find(l => l.id === params.lightingId) || LIGHTING_OPTIONS[0];
  const tempObj = TEMPERATURE_OPTIONS.find(t => t.id === params.temperatureId) || TEMPERATURE_OPTIONS[0];
  const paperObj = PAPER_TEXTURES.find(p => p.id === params.paperId) || PAPER_TEXTURES[0];

  const intensityDescriptor = {
    vibrant: 'high color saturation and punchy pigments',
    balanced: 'harmonious natural saturation and realistic pigment intensity',
    muted: 'delicate muted tones, soft desaturated vintage wash',
    monochrome: 'strict monochromatic tonal values, rich grayscale and sepia depth without chromatic hues'
  }[params.colorIntensity];

  let colorDirection = '';
  if (params.colorIntensity === 'monochrome') {
    colorDirection = 'Color Direction: Strict monochromatic scale (deep rich blacks, nuanced gray midtones, crisp clean white highlights).';
  } else if (params.customPaletteName && params.customPaletteColors && params.customPaletteColors.length > 0) {
    const dominant = params.rule603010.dominant || params.customPaletteColors[0];
    const secondary = params.rule603010.secondary || params.customPaletteColors[1] || params.customPaletteColors[0];
    const accent = params.rule603010.accent || params.customPaletteColors[2] || params.customPaletteColors[0];
    colorDirection = `Custom Color Palette: "${params.customPaletteName}" [${params.customPaletteColors.join(', ')}]. Applied strictly using the 60-30-10 color rule: Dominant 60% (${dominant} for background and large masses), Secondary 30% (${secondary} for main forms and clothing), Accent 10% (${accent} for eye-catching focal highlights).`;
  } else if (params.useCustom603010 && params.rule603010.dominant) {
    colorDirection = `Color Palette (60-30-10 Rule): Dominant 60% (${params.rule603010.dominant} on large areas/background), Secondary 30% (${params.rule603010.secondary} on clothing/mid elements), Accent 10% (${params.rule603010.accent} on focal highlights and eye-catching details). Mood: ${moodObj.prompt}.`;
  } else {
    colorDirection = `Color Palette & Psychology: ${moodObj.prompt}. Featuring a cohesive trio with dominant (${moodObj.rule603010.dominant}), secondary (${moodObj.rule603010.secondary}), and vibrant accent (${moodObj.rule603010.accent}).`;
  }

  const notesPart = params.customNotes?.trim() ? ` Additional Colorist Notes: ${params.customNotes.trim()}.` : '';

  return `Edit and colorize the provided image by strictly acting as a master traditional colorist over the original line art.

CORE DIRECTIVE & PRESERVATION:
Strictly preserve, maintain, and respect the exact original ${drawingTypeObj.promptPhrase}, contours, hatching, silhouettes, anatomy, and composition intact. It is strictly forbidden to redraw, erase, hallucinate new objects, or alter the original linework. The original drawing serves as the structural skeleton of the artwork.

PAINTING TECHNIQUE:
Apply a ${techniqueObj.prompt}. Color fills must sit naturally within and beneath the line work with ${intensityDescriptor}.

COLOR SCHEME & PSYCHOLOGY:
${colorDirection}

LIGHTING & ATMOSPHERE:
${lightingObj.prompt}. ${tempObj.prompt}. Rendered ${paperObj.prompt}.${notesPart}

NEGATIVE RESTRICTIONS:
--no photorealism, 3D CGI render, blurry lineart, erased lines, redrawing the sketch, altered anatomy, missing linework, deformed contours, flat plastic gradient, artifacts, watermark`;
}
