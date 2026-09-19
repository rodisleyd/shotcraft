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

export interface LightingDirectionOption {
  id: string;
  name: string;
  shortName: string;
  description: string;
  prompt: string;
  shadowAngleDeg: number;
  icon: string;
  matrixPos: { row: number; col: number };
}

export interface LightingTypeOption {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  prompt: string;
}

export interface LightingShadowStyleOption {
  id: 'soft' | 'hard' | 'volumetric';
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

export interface ElementColorAssignment {
  id: string;
  name: string;
  englishLabel: string;
  colorHex: string;
  category: 'character' | 'clothing' | 'environment' | 'custom';
}

export interface PresetElementOption {
  id: string;
  name: string;
  englishLabel: string;
  category: 'character' | 'clothing' | 'environment';
  icon: string;
  suggestedColors: Array<{ name: string; hex: string }>;
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
    label: 'Nanquim / Tinta Preta',
    description: 'Line art com contornos pretos firmes e bem definidos.',
    promptPhrase: 'black india ink line art and contours',
    icon: '✒️'
  },
  {
    id: 'marcador-organico',
    label: 'Caneta / Marcador Manual',
    description: 'Linhas orgânicas à mão livre, marcador ou feltro com traços naturais.',
    promptPhrase: 'raw freehand pen and marker linework with natural organic strokes and hand-drawn quirks',
    icon: '🖍️'
  },
  {
    id: 'lapis',
    label: 'Esboço a Lápis / Grafite',
    description: 'Desenho a grafite com hachuras leves e linhas de construção.',
    promptPhrase: 'delicate graphite pencil sketch linework and construction lines',
    icon: '✏️'
  },
  {
    id: 'rascunho',
    label: 'Rascunho Solto / Wonky Sketch',
    description: 'Linhas gestuais, imperfeições manuais e rascunho expressivo de sketchbook.',
    promptPhrase: 'expressive gestural sketchbook sketch with natural hand-drawn wobbles and raw organic imperfections',
    icon: '📝'
  },
  {
    id: 'digital',
    label: 'Line Art Digital',
    description: 'Traço digital estilizado, mantendo contornos desenhados pelo autor.',
    promptPhrase: 'digital line art contours and drawn strokes',
    icon: '💻'
  },
  {
    id: 'manga',
    label: 'Traço de Mangá / Comics',
    description: 'Arte-final dinâmica com variação de espessura (pena G / pincel).',
    promptPhrase: 'dynamic comic and manga inking line art',
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

export const LIGHTING_DIRECTIONS: LightingDirectionOption[] = [
  {
    id: 'top-left',
    name: 'Superior Esquerdo (45°)',
    shortName: 'Sup. Esquerdo',
    description: 'Luz clássica vinda do canto superior esquerdo, criando relevo natural e sombras para a direita inferior.',
    prompt: 'key light source striking from top-left at a 45-degree angle, casting realistic diagonal drop shadows down-right',
    shadowAngleDeg: 135,
    icon: '↖️',
    matrixPos: { row: 0, col: 0 }
  },
  {
    id: 'top',
    name: 'Zenital / Superior (90° Top-Down)',
    shortName: 'Zenital (Top)',
    description: 'Luz vinda diretamente de cima como o sol do meio-dia ou lustre de teto, sombras sob o queixo e quepe.',
    prompt: 'overhead zenithal top-down key light falling directly from above, casting short vertical downward shadows',
    shadowAngleDeg: 90,
    icon: '⬆️',
    matrixPos: { row: 0, col: 1 }
  },
  {
    id: 'top-right',
    name: 'Superior Direito (45°)',
    shortName: 'Sup. Direito',
    description: 'Luz vinda do canto superior direito, projetando sombras para a esquerda inferior.',
    prompt: 'key light source striking from top-right at a 45-degree angle, casting realistic diagonal drop shadows down-left',
    shadowAngleDeg: 225,
    icon: '↗️',
    matrixPos: { row: 0, col: 2 }
  },
  {
    id: 'left',
    name: 'Lateral Esquerda (90° Split)',
    shortName: 'Lateral Esq.',
    description: 'Luz vinda da extrema esquerda, recortando metade do assunto e criando forte dramaticidade lateral.',
    prompt: 'strong direct side lighting from the left at a 90-degree angle, split lighting effect with heavy dimensional relief',
    shadowAngleDeg: 180,
    icon: '⬅️',
    matrixPos: { row: 1, col: 0 }
  },
  {
    id: 'right',
    name: 'Lateral Direita (90° Split)',
    shortName: 'Lateral Dir.',
    description: 'Luz vinda da extrema direita, gerando volume acentuado na lateral oposta.',
    prompt: 'strong direct side lighting from the right at a 90-degree angle, split lighting effect with dramatic contour carving',
    shadowAngleDeg: 0,
    icon: '➡️',
    matrixPos: { row: 1, col: 2 }
  },
  {
    id: 'bottom-left',
    name: 'Inferior Esquerdo (Contra-Plongée)',
    shortName: 'Inf. Esquerdo',
    description: 'Luz ascendente de baixo para cima pela esquerda, clima teatral, misterioso ou sobrenatural.',
    prompt: 'low-angle upward key light from the bottom-left, theatrical mysterious upward shadows',
    shadowAngleDeg: 315,
    icon: '↙️',
    matrixPos: { row: 2, col: 0 }
  },
  {
    id: 'bottom',
    name: 'Inferior / De Baixo (Underlight)',
    shortName: 'De Baixo (Monster)',
    description: 'Luz assustadora ou dramática vinda diretamente do chão (fogueira, chão iluminado ou efeito terror).',
    prompt: 'dramatic underlighting rising straight from below, expressive upward shadow projections and menacing theatrical mood',
    shadowAngleDeg: 270,
    icon: '⬇️',
    matrixPos: { row: 2, col: 1 }
  },
  {
    id: 'bottom-right',
    name: 'Inferior Direito (Contra-Plongée)',
    shortName: 'Inf. Direito',
    description: 'Luz ascendente vinda do canto inferior direito com sombras invertidas para cima.',
    prompt: 'low-angle upward key light from the bottom-right, dynamic atmospheric upward shadow casting',
    shadowAngleDeg: 45,
    icon: '↘️',
    matrixPos: { row: 2, col: 2 }
  },
  {
    id: 'front',
    name: 'Frontal Direta (Ring Light / Flat)',
    shortName: 'Frontal',
    description: 'Luz vinda diretamente da frente, eliminando a maioria das sombras laterais para visual nítido.',
    prompt: 'direct frontal key light illuminating the subject directly from the camera perspective, minimal cast shadows',
    shadowAngleDeg: 0,
    icon: '⏺️',
    matrixPos: { row: 1, col: 1 }
  },
  {
    id: 'backlight',
    name: 'Contraluz Traseiro (Rim Light / Silhueta)',
    shortName: 'Contraluz Traseiro',
    description: 'Fonte de luz posicionada atrás do sujeito, criando aura de luz nas bordas e silhueta imersiva.',
    prompt: 'pure backlight illumination positioned behind the subject, brilliant luminous halo edge rim contours with silhouette separation',
    shadowAngleDeg: 0,
    icon: '🌟',
    matrixPos: { row: -1, col: -1 }
  },
  {
    id: 'omni',
    name: 'Luz Ambiente 360° (Omnidirecional)',
    shortName: 'Omni 360°',
    description: 'Iluminação difusa envolvendo toda a cena uniformemente, sem uma única direção predominante.',
    prompt: '360-degree omnidirectional soft ambient illumination, smooth wraparound environmental lighting without harsh directional bias',
    shadowAngleDeg: 0,
    icon: '🌐',
    matrixPos: { row: -1, col: -1 }
  }
];

export const LIGHTING_TYPES: LightingTypeOption[] = [
  {
    id: 'directional-spot',
    name: 'Foco Direcional / Spot (Key Light)',
    category: 'Foco & Volume',
    description: 'Feixe de luz focado e direto que esculpe o volume tridimensional com sombras nítidas.',
    icon: '💡',
    prompt: 'intense directional spotlight key illumination with defined dimensional contrast and structured shadows'
  },
  {
    id: 'omni-diffuse',
    name: 'Omni / Difusa Ambiente (Softbox)',
    category: 'Suave & Envolvente',
    description: 'Luz suave e difusa de estúdio que preenche todo o ambiente sem criar sombras duras.',
    icon: '🌐',
    prompt: 'soft diffused ambient omnidirectional illumination, gentle smooth gradations and seamless fill'
  },
  {
    id: 'sunlight-rays',
    name: 'Luz Solar Natural & Raios (God Rays)',
    category: 'Natural & Atmosférico',
    description: 'Luz natural do sol com feixes volumétricos visíveis (crepuscular rays) e calor solar.',
    icon: '☀️',
    prompt: 'radiant natural direct sunlight with atmospheric volumetric god rays, sunbeam shafts and sun-dappled highlights'
  },
  {
    id: 'rim-backlight',
    name: 'Contraluz / Rim Light de Borda',
    category: 'Cinemático & Silhueta',
    description: 'Fio de luz intenso nas arestas que destaca o personagem ou objeto do plano de fundo.',
    icon: '✨',
    prompt: 'dramatic edge rim lighting outlining the subject contours, brilliant silhouette halo separation and kicker glow'
  },
  {
    id: 'candle-flame',
    name: 'Chama / Vela / Lampião / Fogueira',
    category: 'Orgânico & Aconchegante',
    description: 'Luz quente trêmula emitida por fogo orgânico, tocha ou vela, com reflexos avermelhados/dourados.',
    icon: '🕯️',
    prompt: 'organic warm flickering flame and candlelight illumination, intimate campfire ember glow and deep warm ambiance'
  },
  {
    id: 'neon-glow',
    name: 'Neon / Cyberpunk & Luzes Coloridas',
    category: 'Estilizado & Sci-Fi',
    description: 'Emissões vibrantes de tubos de neon elétricos com reflexos especulares e brilho cromático.',
    icon: '⚡',
    prompt: 'vibrant electric neon glow lighting, colorful specular highlights, cyberpunk illumination and reflective edge sheen'
  },
  {
    id: 'window-gobo',
    name: 'Luz de Janela / Fresta (Efeito Gobo)',
    category: 'Narrativo & Interior',
    description: 'Luz natural recortada por persianas ou janelas, projetando padrões geométricos de sombra.',
    icon: '🪟',
    prompt: 'cinematic window light spill with cast architectural gobo shadow patterns and atmospheric dust motes'
  },
  {
    id: 'chiaroscuro',
    name: 'Chiaroscuro Dramático (Hard Light)',
    category: 'Dramático & Pintoresco',
    description: 'Contraste extremo barroco entre luz focal brilhante e sombras pretas impenetráveis.',
    icon: '🎭',
    prompt: 'dramatic chiaroscuro hard light illumination, deep black shadow pools contrasting with sharp crisp highlights'
  },
  {
    id: 'studio-rembrandt',
    name: 'Estúdio Rembrandt (3 Pontos Fotográficos)',
    category: 'Fotográfico & Clássico',
    description: 'Iluminação clássica com triângulo luminoso na bochecha sombreada e recorte profissional.',
    icon: '📸',
    prompt: 'professional 3-point studio lighting setup with iconic soft Rembrandt triangle highlight on the cheek and gentle fill'
  }
];

export const LIGHTING_SHADOW_STYLES: LightingShadowStyleOption[] = [
  {
    id: 'soft',
    name: 'Sombras Suaves & Graduais',
    description: 'Transições aveludadas entre luz e sombra sem bordas cortantes.',
    prompt: 'gentle diffuse penumbra shadows and smooth tonal rolloff'
  },
  {
    id: 'hard',
    name: 'Sombras Duras & Recortadas',
    description: 'Bordas nítidas de sombra com alto contraste gráfico.',
    prompt: 'sharp crisp cast shadows with high local contrast and well-defined shadow edges'
  },
  {
    id: 'volumetric',
    name: 'Raios Volumétricos & Névoa',
    description: 'Feixes de luz visíveis atravessando a poeira e atmosfera da cena.',
    prompt: 'atmospheric volumetric haze, visible crepuscular light shafts cutting through the scene'
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

export const PRESET_ELEMENTS: PresetElementOption[] = [
  // --- Personagem & Anatomia ---
  {
    id: 'hair',
    name: 'Cabelo',
    englishLabel: 'Hair',
    category: 'character',
    icon: '💇',
    suggestedColors: [
      { name: 'Preto Profundo', hex: '#111213' },
      { name: 'Castanho Escuro', hex: '#3E2723' },
      { name: 'Castanho Claro', hex: '#6D4C41' },
      { name: 'Loiro Dourado', hex: '#F1C40F' },
      { name: 'Loiro Platinado', hex: '#F5EEF8' },
      { name: 'Ruivo Acobreado', hex: '#C0392B' },
      { name: 'Prateado / Grisalho', hex: '#BDC3C7' },
      { name: 'Rosa Pastel', hex: '#FADBD8' },
      { name: 'Azul Meia-Noite', hex: '#1B263B' },
      { name: 'Verde Esmeralda', hex: '#1E8449' }
    ]
  },
  {
    id: 'skin',
    name: 'Tom de Pele',
    englishLabel: 'Skin tone',
    category: 'character',
    icon: '👤',
    suggestedColors: [
      { name: 'Pele Clara Porcelana', hex: '#FDEDEC' },
      { name: 'Pele Clara Quente', hex: '#F5D0A9' },
      { name: 'Pele Bege / Natural', hex: '#ECC59A' },
      { name: 'Pele Morena Clara', hex: '#D2A06E' },
      { name: 'Pele Morena Dourada', hex: '#B87E4F' },
      { name: 'Pele Negra Acobreada', hex: '#875133' },
      { name: 'Pele Negra Profunda', hex: '#4A2E1B' },
      { name: 'Pele Élfica / Pálida', hex: '#EAECEE' },
      { name: 'Pele Fantasia Azulada', hex: '#A9CCE3' },
      { name: 'Pele Fantasia Esmeralda', hex: '#A3E4D7' }
    ]
  },
  {
    id: 'eyes',
    name: 'Olhos / Íris',
    englishLabel: 'Eyes',
    category: 'character',
    icon: '👁️',
    suggestedColors: [
      { name: 'Castanho Escuro', hex: '#3E2723' },
      { name: 'Mel / Âmbar', hex: '#D4AC0D' },
      { name: 'Azul Safira', hex: '#2980B9' },
      { name: 'Azul Celeste Claro', hex: '#5DADE2' },
      { name: 'Verde Esmeralda', hex: '#27AE60' },
      { name: 'Verde Oliva', hex: '#52796F' },
      { name: 'Cinza Gélido', hex: '#A6ACAF' },
      { name: 'Violeta / Roxo', hex: '#8E44AD' },
      { name: 'Vermelho Carmim', hex: '#C0392B' },
      { name: 'Dourado Brilhante', hex: '#F39C12' }
    ]
  },
  {
    id: 'lips',
    name: 'Lábios / Boca',
    englishLabel: 'Lips',
    category: 'character',
    icon: '👄',
    suggestedColors: [
      { name: 'Rosado Natural', hex: '#E8A7A1' },
      { name: 'Nude Pêssego', hex: '#D98880' },
      { name: 'Vermelho Clássico', hex: '#C0392B' },
      { name: 'Vermelho Vinho', hex: '#78281F' },
      { name: 'Coral Quente', hex: '#E59866' },
      { name: 'Bordô Escuro', hex: '#5B2C6F' },
      { name: 'Preto Gótico', hex: '#1C2833' }
    ]
  },
  {
    id: 'beard',
    name: 'Barba / Pelos Faciais',
    englishLabel: 'Beard and facial hair',
    category: 'character',
    icon: '🧔',
    suggestedColors: [
      { name: 'Preto', hex: '#17202A' },
      { name: 'Castanho Escuro', hex: '#4A235A' },
      { name: 'Castanho Médio', hex: '#5D4037' },
      { name: 'Ruivo', hex: '#A04000' },
      { name: 'Grisalho / Prata', hex: '#BDC3C7' },
      { name: 'Branco Puro', hex: '#FDFEFE' }
    ]
  },
  {
    id: 'wings-horns',
    name: 'Asas / Chifres / Adereços',
    englishLabel: 'Wings, horns, and appendages',
    category: 'character',
    icon: '🪽',
    suggestedColors: [
      { name: 'Preto Obsidiana', hex: '#111213' },
      { name: 'Branco Celestial', hex: '#F8F9F9' },
      { name: 'Vermelho Demoníaco', hex: '#922B21' },
      { name: 'Dourado Radiante', hex: '#F1C40F' },
      { name: 'Osso Envelhecido', hex: '#F5EEF8' },
      { name: 'Azul Etéreo', hex: '#5499C7' }
    ]
  },

  // --- Vestuário & Roupas ---
  {
    id: 'shirt',
    name: 'Camisa / Camiseta / Top',
    englishLabel: 'Shirt and upper garment',
    category: 'clothing',
    icon: '👕',
    suggestedColors: [
      { name: 'Branco Puro', hex: '#FFFFFF' },
      { name: 'Preto Carvão', hex: '#1B2631' },
      { name: 'Azul Marinho', hex: '#1A5276' },
      { name: 'Vermelho Carmim', hex: '#B03A2E' },
      { name: 'Verde Floresta', hex: '#196F3D' },
      { name: 'Amarelo Mostarda', hex: '#D4AC0D' },
      { name: 'Cinza Chumbo', hex: '#5D6D7E' },
      { name: 'Rosa Pastel', hex: '#F5B7B1' },
      { name: 'Bege Creme', hex: '#F9E79F' },
      { name: 'Roxo Imperial', hex: '#6C3483' }
    ]
  },
  {
    id: 'jacket',
    name: 'Jaqueta / Casaco / Armadura',
    englishLabel: 'Jacket, coat, or armor',
    category: 'clothing',
    icon: '🧥',
    suggestedColors: [
      { name: 'Couro Preto', hex: '#17202A' },
      { name: 'Couro Marrom Envelhecido', hex: '#6E2C00' },
      { name: 'Azul Denim / Jeans', hex: '#2471A3' },
      { name: 'Verde Militar', hex: '#4D5656' },
      { name: 'Metal Prata Aço', hex: '#A6ACAF' },
      { name: 'Dourado / Bronze', hex: '#B7950B' },
      { name: 'Vermelho Carmim', hex: '#78281F' },
      { name: 'Cinza Asfalto', hex: '#34495E' }
    ]
  },
  {
    id: 'pants',
    name: 'Calça / Jeans / Calças Compridas',
    englishLabel: 'Pants and trousers',
    category: 'clothing',
    icon: '👖',
    suggestedColors: [
      { name: 'Jeans Azul Escuro', hex: '#1B4F72' },
      { name: 'Jeans Azul Claro', hex: '#5DADE2' },
      { name: 'Preto Puro', hex: '#111213' },
      { name: 'Caqui / Bege', hex: '#D5D8DC' },
      { name: 'Cinza Chumbo', hex: '#2C3E50' },
      { name: 'Verde Oliva', hex: '#273746' },
      { name: 'Marrom Terra', hex: '#4A235A' }
    ]
  },
  {
    id: 'shorts-skirt',
    name: 'Bermuda / Shorts / Saia',
    englishLabel: 'Shorts or skirt',
    category: 'clothing',
    icon: '🩳',
    suggestedColors: [
      { name: 'Jeans Desbotado', hex: '#85929E' },
      { name: 'Preto Clássico', hex: '#1C2833' },
      { name: 'Xadrez Vermelho / Tartan', hex: '#922B21' },
      { name: 'Branco Verão', hex: '#FBFCFC' },
      { name: 'Amarelo Solar', hex: '#F4D03F' },
      { name: 'Rosa Chiclete', hex: '#F1948A' },
      { name: 'Verde Menta', hex: '#73C6B6' }
    ]
  },
  {
    id: 'dress',
    name: 'Vestido / Túnica / Traje Inteiro',
    englishLabel: 'Dress, gown, or full-body robe',
    category: 'clothing',
    icon: '👗',
    suggestedColors: [
      { name: 'Vermelho Escarlate', hex: '#C0392B' },
      { name: 'Azul Royal', hex: '#2980B9' },
      { name: 'Branco Noiva / Seda', hex: '#FDFEFE' },
      { name: 'Preto Elegante', hex: '#111213' },
      { name: 'Verde Esmeralda', hex: '#1E8449' },
      { name: 'Dourado Champanhe', hex: '#FAD7A0' },
      { name: 'Rosa Antigo', hex: '#D98880' },
      { name: 'Roxo Noturno', hex: '#4A235A' }
    ]
  },
  {
    id: 'shoes',
    name: 'Sapatos / Tênis / Botas',
    englishLabel: 'Shoes, sneakers, or boots',
    category: 'clothing',
    icon: '👞',
    suggestedColors: [
      { name: 'Preto Couro', hex: '#111213' },
      { name: 'Branco Tênis', hex: '#FFFFFF' },
      { name: 'Marrom Caramelo', hex: '#784212' },
      { name: 'Vermelho Tênis', hex: '#C0392B' },
      { name: 'Cinza Metalizado', hex: '#7F8C8D' },
      { name: 'Amarelo Trigo / Botas', hex: '#D4AC0D' }
    ]
  },
  {
    id: 'socks-gloves',
    name: 'Meias / Luvas / Meia-Calça',
    englishLabel: 'Socks, stockings, or gloves',
    category: 'clothing',
    icon: '🧦',
    suggestedColors: [
      { name: 'Branco Puro', hex: '#FFFFFF' },
      { name: 'Preto Opaco', hex: '#17202A' },
      { name: 'Cinza Mescla', hex: '#BDC3C7' },
      { name: 'Vermelho / Listrado', hex: '#E74C3C' },
      { name: 'Azul Marinho', hex: '#1F618D' }
    ]
  },
  {
    id: 'hat-cape',
    name: 'Chapéu / Capa / Manto / Cachecol',
    englishLabel: 'Hat, cape, cloak, or scarf',
    category: 'clothing',
    icon: '🧣',
    suggestedColors: [
      { name: 'Vermelho Carmim', hex: '#922B21' },
      { name: 'Preto Sombrio', hex: '#0B0C10' },
      { name: 'Verde Floresta', hex: '#145A32' },
      { name: 'Dourado Ocre', hex: '#B7950B' },
      { name: 'Azul Meia-Noite', hex: '#1B263B' },
      { name: 'Bege Lã', hex: '#F5EEF8' }
    ]
  },

  // --- Cenário, Ambiente & Fundo ---
  {
    id: 'sky',
    name: 'Céu / Nuvens / Atmosfera',
    englishLabel: 'Sky, clouds, and atmosphere',
    category: 'environment',
    icon: '☁️',
    suggestedColors: [
      { name: 'Azul Céu Diurno', hex: '#5DADE2' },
      { name: 'Pôr do Sol Dourado / Âmbar', hex: '#F39C12' },
      { name: 'Pôr do Sol Magenta / Violeta', hex: '#8E44AD' },
      { name: 'Crepúsculo Blue Hour', hex: '#21618C' },
      { name: 'Noite Estrelada Profunda', hex: '#0B132B' },
      { name: 'Céu Tempestuoso / Cinza', hex: '#566573' },
      { name: 'Céu Vermelho Apocalíptico', hex: '#641E16' }
    ]
  },
  {
    id: 'wall',
    name: 'Paredes / Construções / Fachada',
    englishLabel: 'Walls, buildings, and architecture',
    category: 'environment',
    icon: '🧱',
    suggestedColors: [
      { name: 'Tijolo Vermelho Envelhecido', hex: '#78281F' },
      { name: 'Concreto Urbano Cinza', hex: '#7F8C8D' },
      { name: 'Madeira Rústica / Tabuas', hex: '#5D4037' },
      { name: 'Parede Branca / Gesso', hex: '#EAEDED' },
      { name: 'Pedra Medieval Musgosa', hex: '#4D5656' },
      { name: 'Paredes Neon Futuristas', hex: '#17202A' }
    ]
  },
  {
    id: 'ground',
    name: 'Piso / Chão / Asfalto / Estrada',
    englishLabel: 'Ground, floor, street, and terrain',
    category: 'environment',
    icon: '🛣️',
    suggestedColors: [
      { name: 'Asfalto Molhado', hex: '#1C2833' },
      { name: 'Terra Batida / Argila', hex: '#6E2C00' },
      { name: 'Areia Dourada do Deserto', hex: '#EDBB99' },
      { name: 'Paralelepípedo Cinza', hex: '#566573' },
      { name: 'Piso de Madeira / Parquet', hex: '#873600' },
      { name: 'Gelo / Neve Congelada', hex: '#EBF5FB' }
    ]
  },
  {
    id: 'foliage',
    name: 'Vegetação / Grama / Folhagem',
    englishLabel: 'Foliage, grass, trees, and flora',
    category: 'environment',
    icon: '🌿',
    suggestedColors: [
      { name: 'Verde Gramado Fresco', hex: '#27AE60' },
      { name: 'Verde Floresta Profundo', hex: '#145A32' },
      { name: 'Folhas de Outono Douradas', hex: '#D35400' },
      { name: 'Flores de Cerejeira / Rosa', hex: '#FADBD8' },
      { name: 'Musgo Úmido Envelhecido', hex: '#3F4A3C' },
      { name: 'Vegetação Alienígena Violeta', hex: '#6C3483' }
    ]
  },
  {
    id: 'water',
    name: 'Água / Mar / Rio / Lago',
    englishLabel: 'Water, ocean, sea, and river',
    category: 'environment',
    icon: '🌊',
    suggestedColors: [
      { name: 'Azul Turquesa Tropical', hex: '#1ABC9C' },
      { name: 'Azul Oceano Profundo', hex: '#1B4F72' },
      { name: 'Água Cristalina de Rio', hex: '#A9CCE3' },
      { name: 'Mar Noturno Espelhado', hex: '#0E1A24' },
      { name: 'Água Pútrida / Pântano', hex: '#3E4F42' }
    ]
  },
  {
    id: 'glow-effects',
    name: 'Luzes / Efeitos de Brilho / Neon / Fogo',
    englishLabel: 'Glow, energy, fire, and neon lights',
    category: 'environment',
    icon: '✨',
    suggestedColors: [
      { name: 'Fogo Quente / Laranja Solar', hex: '#E67E22' },
      { name: 'Chama Azul Mágica', hex: '#3498DB' },
      { name: 'Neon Ciano Elétrico', hex: '#00F5D4' },
      { name: 'Neon Magenta Tóxico', hex: '#FF007F' },
      { name: 'Luz Dourada Sagrada', hex: '#F1C40F' },
      { name: 'Energia Verde Venenosa', hex: '#2ECC71' }
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
  lightingId?: string;
  lightingDirectionId?: string;
  lightingTypeId?: string;
  lightingShadowStyle?: 'soft' | 'hard' | 'volumetric';
  temperatureId: string;
  paperId: string;
  colorIntensity: 'vibrant' | 'balanced' | 'muted' | 'monochrome';
  customPaletteName?: string;
  customPaletteColors?: string[];
  activeMoodColors?: string[];
  elementColors?: ElementColorAssignment[];
  customNotes?: string;
}): string {
  const drawingTypeObj = DRAWING_TYPES.find(d => d.id === params.drawingType) || DRAWING_TYPES[0];
  const techniqueObj = PAINTING_TECHNIQUES.find(t => t.id === params.techniqueId) || PAINTING_TECHNIQUES[0];
  const moodObj = COLOR_MOODS.find(m => m.id === params.colorMoodId) || COLOR_MOODS[0];
  const tempObj = TEMPERATURE_OPTIONS.find(t => t.id === params.temperatureId) || TEMPERATURE_OPTIONS[0];
  const paperObj = PAPER_TEXTURES.find(p => p.id === params.paperId) || PAPER_TEXTURES[0];

  // Dynamic Lighting Construction
  let lightingStatement = '';
  if (params.lightingDirectionId && params.lightingTypeId) {
    const dirObj = LIGHTING_DIRECTIONS.find(d => d.id === params.lightingDirectionId) || LIGHTING_DIRECTIONS[0];
    const typeObj = LIGHTING_TYPES.find(t => t.id === params.lightingTypeId) || LIGHTING_TYPES[0];
    const shadowObj = LIGHTING_SHADOW_STYLES.find(s => s.id === (params.lightingShadowStyle || 'soft')) || LIGHTING_SHADOW_STYLES[0];
    lightingStatement = `Illuminated by ${typeObj.prompt}, ${dirObj.prompt}, styled with ${shadowObj.prompt}`;
  } else {
    const lightingObj = LIGHTING_OPTIONS.find(l => l.id === (params.lightingId || 'soft-diffuse')) || LIGHTING_OPTIONS[0];
    lightingStatement = lightingObj.prompt;
  }

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
    const paletteColorsStr = params.activeMoodColors && params.activeMoodColors.length > 0 ? ` [${params.activeMoodColors.join(', ')}]` : '';
    colorDirection = `Color Palette (60-30-10 Rule): Dominant 60% (${params.rule603010.dominant} on large areas/background), Secondary 30% (${params.rule603010.secondary} on clothing/mid elements), Accent 10% (${params.rule603010.accent} on focal highlights and eye-catching details). Mood: ${moodObj.name}${paletteColorsStr} - ${moodObj.prompt}.`;
  } else {
    const activeColors = params.activeMoodColors && params.activeMoodColors.length > 0 ? params.activeMoodColors : moodObj.colors;
    const dominant = params.rule603010.dominant || activeColors[0] || moodObj.rule603010.dominant;
    const secondary = params.rule603010.secondary || activeColors[1] || moodObj.rule603010.secondary;
    const accent = params.rule603010.accent || activeColors[2] || moodObj.rule603010.accent;
    colorDirection = `Color Palette & Psychology: ${moodObj.name} [${activeColors.join(', ')}]. ${moodObj.prompt}. Featuring a cohesive trio with dominant (${dominant}), secondary (${secondary}), and vibrant accent (${accent}).`;
  }

  // Bloco de Mapeamento Pontual de Elementos
  let elementMappingSection = '';
  if (params.elementColors && params.elementColors.length > 0) {
    const elementLines = params.elementColors.map(el => `  • ${el.englishLabel || el.name}: strictly colored in ${el.colorHex}`);
    elementMappingSection = `\n\nTARGETED ELEMENT COLOR MAPPING (STRICT SPECIFICATIONS):\nStrictly apply the designated specific colors to their corresponding visual elements in the drawing:\n${elementLines.join('\n')}`;
  }

  const notesPart = params.customNotes?.trim() ? ` Additional Colorist Notes: ${params.customNotes.trim()}.` : '';

  return `Edit and colorize the provided image by strictly acting as a traditional colorist over the original drawing.

CORE DIRECTIVE & STRICT LINE ART FIDELITY (ZERO GEOMETRIC CORRECTION):
1. ZERO LINE MODIFICATION: Strictly preserve, protect, and maintain the exact original ${drawingTypeObj.promptPhrase}, stroke trajectories, line thickness, contours, hatching, and silhouettes intact pixel-for-pixel.
2. ZERO GEOMETRIC CORRECTION: Do NOT straighten wavy or curved lines. Do NOT geometrically correct imperfect circles, tilted boxes, or hand-drawn wobbles into perfect geometric 3D shapes. Do NOT auto-align or rectify hand-drawn strokes. All manual quirks, organic imperfections, and hand-drawn irregularities MUST remain 100% untouched exactly as originally drawn.
3. SUB-LAYER COLOR APPLICATION: All paints, highlights, and shadow fills must sit naturally inside and underneath the existing line work. The original linework serves as the immutable structural skeleton. Do not redraw, overwrite, erase, or replace any line art.

PAINTING TECHNIQUE:
Apply a ${techniqueObj.prompt}. Color fills must sit naturally within and beneath the line work with ${intensityDescriptor}.

COLOR SCHEME & PSYCHOLOGY:
${colorDirection}${elementMappingSection}

LIGHTING & ATMOSPHERE:
${lightingStatement}. ${tempObj.prompt}. Rendered ${paperObj.prompt}.${notesPart}

NEGATIVE RESTRICTIONS:
--no straightening hand-drawn lines, geometric correction, vectorizing rough lines, reshaping wobbly lines into perfect geometry, auto-aligning perspective, modifying original stroke trajectory, redrawing linework, 3D CGI recalculation, photorealism, blurry lineart, erased lines, altered anatomy, missing linework, deformed contours, flat plastic gradient, artifacts, watermark`;
}
