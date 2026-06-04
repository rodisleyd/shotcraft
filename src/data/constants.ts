/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Option, ColorPaletteOption, VisualTag, GalleryItem } from "../types";

export const SHOT_TYPES: Option[] = [
  // 1. Enquadramentos Básicos
  { id: 'ecu', label: 'Plano Detalhe (Extreme Close-up)', prompt: 'extreme close-up shot, macro detail', category: 'framing', subCategory: '1. Enquadramentos Básicos', image: '/images/enquadramentos/plano-detalhe.png' },
  { id: 'close-up', label: 'Close-up', prompt: 'close-up shot', category: 'framing', subCategory: '1. Enquadramentos Básicos', image: '/images/enquadramentos/close-up.png' },
  { id: 'mcu', label: 'Medium Close-up', prompt: 'medium close-up, chest-up shot', category: 'framing', subCategory: '1. Enquadramentos Básicos', image: '/images/enquadramentos/medio-close-up.png' },
  { id: 'medium', label: 'Plano Médio (Medium shot)', prompt: 'medium shot, waist-up', category: 'framing', subCategory: '1. Enquadramentos Básicos', image: '/images/enquadramentos/plano-medio.png' },
  { id: 'cowboy', label: 'Plano Americano (Cowboy Shot)', prompt: 'cowboy shot, mid-thigh up shot', category: 'framing', subCategory: '1. Enquadramentos Básicos', image: '/images/enquadramentos/plano-americano.png' },
  { id: 'full', label: 'Plano Inteiro (Full Shot)', prompt: 'full body shot, character head to toe', category: 'framing', subCategory: '1. Enquadramentos Básicos', image: '/images/enquadramentos/plano-inteiro.png' },
  { id: 'long', label: 'Plano Aberto (Long Shot)', prompt: 'long shot, character in wide environment', category: 'framing', subCategory: '1. Enquadramentos Básicos', image: '/images/enquadramentos/plano-aberto.png' },
  { id: 'wide', label: 'Wide Shot', prompt: 'wide angle shot, environmental focus', category: 'framing', subCategory: '1. Enquadramentos Básicos', image: '/images/enquadramentos/wide-shot.png' },
  { id: 'ews', label: 'Extreme Wide Shot', prompt: 'extreme wide shot, massive landscape focus, tiny character', category: 'framing', subCategory: '1. Enquadramentos Básicos', image: '/images/enquadramentos/extreme-wide-shot.png' },
  { id: 'ots', label: 'Sobre o Ombro (OTS)', prompt: 'over-the-shoulder shot', category: 'framing', subCategory: '1. Enquadramentos Básicos', image: '/images/enquadramentos/sobre-o-ombro.png' },
  { id: 'two-shot', label: 'Two Shot', prompt: 'two-shot, two characters in frame', category: 'framing', subCategory: '1. Enquadramentos Básicos', image: '/images/enquadramentos/two-shot.png' },
  { id: 'group', label: 'Group Shot', prompt: 'group shot, multiple characters', category: 'framing', subCategory: '1. Enquadramentos Básicos', image: '/images/enquadramentos/group-shot.png' },
  { id: 'pov', label: 'POV', prompt: 'first-person point of view, POV shot', category: 'framing', subCategory: '1. Enquadramentos Básicos', image: '/images/enquadramentos/pov.png' },
  { id: 'insert', label: 'Insert Shot', prompt: 'insert shot, close-up on object', category: 'framing', subCategory: '1. Enquadramentos Básicos', image: '/images/enquadramentos/insert-shot.png' },
  { id: 'cutaway', label: 'Cutaway', prompt: 'cutaway shot, showing secondary action', category: 'framing', subCategory: '1. Enquadramentos Básicos', image: '/images/enquadramentos/cutaway.png' },

  // 2. Enquadramentos Cinematográficos
  { id: 'establishing-shot', label: 'Establishing Shot (Plano de Estabelecimento)', prompt: 'establishing shot, cinematic establishing view', category: 'framing', subCategory: '2. Enquadramentos Cinematográficos', image: '/images/enquadramentos/establishing-shot.png' },
  { id: 'master-shot', label: 'Master Shot (Plano Mestre)', prompt: 'master shot, full scene composition', category: 'framing', subCategory: '2. Enquadramentos Cinematográficos', image: '/images/enquadramentos/master-shot.png' },
  { id: 'dutch-angle-framing', label: 'Dutch Angle (Ângulo Inclinado)', prompt: 'dutch angle, tilted camera, canted shot', category: 'framing', subCategory: '2. Enquadramentos Cinematográficos', image: '/images/enquadramentos/dutch-angle-framing.png' },
  { id: 'center-framed', label: 'Center Framed Shot (Centralizado)', prompt: 'center framed composition, symmetrical framing', category: 'framing', subCategory: '2. Enquadramentos Cinematográficos', image: '/images/enquadramentos/center-framed.png' },
  { id: 'frame-within-frame', label: 'Frame Within Frame (Moldura Interna)', prompt: 'frame within frame composition, shoot through framing', category: 'framing', subCategory: '2. Enquadramentos Cinematográficos', image: '/images/enquadramentos/frame-within-frame.png' },

  // 3. Enquadramentos de Ação (Anime/Mangá)
  { id: 'hero-shot', label: 'Hero Shot (Enquadramento Heroico)', prompt: 'hero shot, dramatic hero framing', category: 'framing', subCategory: '3. Enquadramentos de Ação (Anime/Mangá)', image: '/images/enquadramentos/pose-heroi.png' },
  { id: 'transformation-shot', label: 'Transformation Shot (Transformação)', prompt: 'transformation sequence framing, energy power up shot', category: 'framing', subCategory: '3. Enquadramentos de Ação (Anime/Mangá)', image: '/images/enquadramentos/manga-transformacao.png' },
  { id: 'dynamic-action', label: 'Dynamic Action Shot (Ação Dinâmica)', prompt: 'dynamic action framing, intense perspective shot', category: 'framing', subCategory: '3. Enquadramentos de Ação (Anime/Mangá)', image: '/images/enquadramentos/manga-acao-dinamica.png' },
  { id: 'speed-perspective', label: 'Speed Perspective (Perspectiva de Velocidade)', prompt: 'exaggerated speed perspective shot, shonen manga action lines', category: 'framing', subCategory: '3. Enquadramentos de Ação (Anime/Mangá)', image: '/images/enquadramentos/manga-velocidade.png' },

  // 4. Enquadramentos Dramáticos
  { id: 'profile-shot', label: 'Profile Shot (Perfil de Lado)', prompt: 'side profile shot, profile view', category: 'framing', subCategory: '4. Enquadramentos Dramáticos', image: '/images/enquadramentos/perfil-de-lado.png' },
  { id: 'rear-shot', label: 'Rear Shot (Visto de Costas)', prompt: 'rear view shot, back facing character', category: 'framing', subCategory: '4. Enquadramentos Dramáticos', image: '/images/enquadramentos/visto-de-costas.png' },
  { id: 'silhouette-shot', label: 'Silhouette Shot (Silhueta)', prompt: 'silhouette shot, backlit silhouette', category: 'framing', subCategory: '4. Enquadramentos Dramáticos', image: '/images/enquadramentos/silhueta.png' },
  { id: 'negative-space', label: 'Negative Space (Espaço Negativo)', prompt: 'negative space composition, tiny character in large frame', category: 'framing', subCategory: '4. Enquadramentos Dramáticos', image: '/images/enquadramentos/espaco-negativo.png' },

  // 5. Enquadramentos Técnicos
  { id: 'macro-shot', label: 'Macro Shot (Detalhe Macro)', prompt: 'macro shot, ultra close detail, extreme macro', category: 'framing', subCategory: '5. Enquadramentos Técnicos', image: '/images/enquadramentos/detalhe-macro.png' },
  { id: 'reflection-shot', label: 'Reflection Shot (Através de Reflexo)', prompt: 'reflection shot, mirror reflection composition', category: 'framing', subCategory: '5. Enquadramentos Técnicos', image: '/images/enquadramentos/atraves-de-reflexo.png' },
  { id: 'surveillance-shot', label: 'Surveillance Shot (Câmera de Segurança)', prompt: 'surveillance camera view, CCTV framing', category: 'framing', subCategory: '5. Enquadramentos Técnicos', image: '/images/enquadramentos/camera-de-seguranca.png' },
  { id: 'handheld-shot', label: 'Handheld Shot (Câmera na Mão)', prompt: 'handheld camera shot, shaky footage aesthetic', category: 'framing', subCategory: '5. Enquadramentos Técnicos', image: '/images/enquadramentos/camera-na-mao.png' },
  { id: 'found-footage', label: 'Found Footage (Câmera Amadora)', prompt: 'found footage shot, home video style, REC interface elements', category: 'framing', subCategory: '5. Enquadramentos Técnicos', image: '/images/enquadramentos/camera-amadora.png' },

  // 6. Composições para HQ e Ilustração
  { id: 'splash-panel', label: 'Splash Panel (Página Inteira)', prompt: 'splash page composition, splash panel layout, dramatic comic page', category: 'framing', subCategory: '6. Composições para HQ e Ilustração', image: '/images/enquadramentos/pagina-inteira.png' },
  { id: 'vertical-cinematic', label: 'Vertical Cinematic (Formato Mobile)', prompt: 'vertical cinematic composition, webtoon style framing', category: 'framing', subCategory: '6. Composições para HQ e Ilustração', image: '/images/enquadramentos/formato-mobile.png' },
  { id: 'diagonal-composition', label: 'Diagonal Composition (Composição Diagonal)', prompt: 'diagonal composition lines, dynamic tilted layout', category: 'framing', subCategory: '6. Composições para HQ e Ilustração', image: '/images/enquadramentos/composicao-diagonal.png' },
  { id: 'layered-depth', label: 'Layered Depth (Profundidade em Camadas)', prompt: 'layered depth composition, strong foreground and background elements, Ghibli style layout', category: 'framing', subCategory: '6. Composições para HQ e Ilustração', image: '/images/enquadramentos/profundidade-em-camadas.png' },
];

export const ANGLES: Option[] = [
  // 1. Ângulos Básicos
  { id: 'eye-level', label: 'Nível do Olhar', prompt: 'eye-level angle', category: 'angle', subCategory: '1. Ângulos Básicos' },
  { id: 'low', label: 'Ângulo Baixo (Contra-Plongée)', prompt: 'extreme low-angle shot, dynamic Dutch angle, dramatic worm\'s-eye view, intense visual foreshortening, action-oriented perspective looking up, radiating motion lines, wide-angle cinematic framing', category: 'angle', subCategory: '1. Ângulos Básicos' },
  { id: 'high', label: 'Ângulo Alto (Plongée)', prompt: 'high angle, looking down', category: 'angle', subCategory: '1. Ângulos Básicos' },
  { id: 'shoulder-level', label: 'Nível do Ombro', prompt: 'shoulder level camera angle', category: 'angle', subCategory: '1. Ângulos Básicos' },
  { id: 'hip-level', label: 'Nível do Quadril', prompt: 'hip level camera angle', category: 'angle', subCategory: '1. Ângulos Básicos' },

  // 2. Ângulos Verticais
  { id: 'top', label: 'Top Shot', prompt: 'top-down vertical shot', category: 'angle', subCategory: '2. Ângulos Verticais' },
  { id: 'overhead', label: 'Overhead', prompt: 'overhead shot', category: 'angle', subCategory: '2. Ângulos Verticais' },
  { id: 'birds-eye', label: 'Vista de Pássaro (90 Graus)', prompt: "bird's eye view shot", category: 'angle', subCategory: '2. Ângulos Verticais' },
  { id: 'worms-eye', label: 'Vista de Verme (90 Graus de Baixo)', prompt: "worm's eye view, looking straight up", category: 'angle', subCategory: '2. Ângulos Verticais' },

  // 3. Ângulos Dramáticos
  { id: 'dutch', label: 'Ângulo Holandês (Dutch Angle)', prompt: 'dutch angle, tilted frame', category: 'angle', subCategory: '3. Ângulos Dramáticos' },
  { id: 'dynamic-tilt', label: 'Dynamic Tilt (Inclinação Dinâmica)', prompt: 'dynamic tilt angle, extremely canted framing, dramatic skewed camera', category: 'angle', subCategory: '3. Ângulos Dramáticos' },
  { id: 'extreme-low', label: 'Extreme Low Angle (Câmera no Chão)', prompt: 'extreme low angle shot, ground level camera angle', category: 'angle', subCategory: '3. Ângulos Dramáticos' },
  { id: 'extreme-high', label: 'Extreme High Angle (Câmera Muito Alta)', prompt: 'extreme high angle view, looking straight down from high altitude', category: 'angle', subCategory: '3. Ângulos Dramáticos' },

  // 4. Ângulos de Personagem
  { id: 'front-view', label: 'Front View (Visão Frontal)', prompt: 'front view portrait, straight-on camera angle', category: 'angle', subCategory: '4. Ângulos de Personagem' },
  { id: 'side-view', label: 'Side View (Visão de Lado / Perfil)', prompt: 'side view profile, full side portrait', category: 'angle', subCategory: '4. Ângulos de Personagem' },
  { id: 'back-view', label: 'Back View (Visão Traseira / Costas)', prompt: 'back view profile, character facing away', category: 'angle', subCategory: '4. Ângulos de Personagem' },
  { id: 'three-quarter', label: 'Three-Quarter View (Três Quartos)', prompt: 'three-quarter camera view, 3/4 view angle', category: 'angle', subCategory: '4. Ângulos de Personagem' },
  { id: 'turnaround', label: 'Turnaround (Vários Ângulos)', prompt: 'Generate a full professional turnaround sheet for the provided subject/reference. Show all necessary orthographic angles and consistent views including front, side, back, 3/4 and top views when needed. Preserve exact visual consistency between every angle including shape, proportions, colors, textures, materials and details. Arrange like an animation/game industry model sheet. Neutral lighting, clean background, ultra detailed, highly organized layout, no perspective distortion, no redesign, no inconsistencies.', category: 'angle', subCategory: '4. Ângulos de Personagem' },

  // 5. Ângulos Cinematográficos
  { id: 'through-object', label: 'Through Object (Através de Objeto)', prompt: 'shooting through object camera angle, frame within a frame shot, foreground occlusion', category: 'angle', subCategory: '5. Ângulos Cinematográficos' },
  { id: 'hidden-camera', label: 'Hidden Camera (Câmera Escondida)', prompt: 'hidden camera angle, spy camera look, voyeuristic framing', category: 'angle', subCategory: '5. Ângulos Cinematográficos' },
  { id: 'security-camera', label: 'Security Camera (Câmera de Segurança)', prompt: 'security camera angle view, high angle CCTV feed visual style', category: 'angle', subCategory: '5. Ângulos Cinematográficos' },
  { id: 'reflection-angle', label: 'Reflection Angle (Através de Reflexo)', prompt: 'reflection angle shot, mirror or water surface reflection composition', category: 'angle', subCategory: '5. Ângulos Cinematográficos' },
  { id: 'pov-angle', label: 'POV (Ponto de Vista do Personagem)', prompt: 'POV shot, first person camera perspective', category: 'angle', subCategory: '5. Ângulos Cinematográficos' },
  { id: 'ots-low', label: 'OTS Low (Sobre o Ombro Baixo)', prompt: 'over-the-shoulder low angle shot, looking up from behind shoulder', category: 'angle', subCategory: '5. Ângulos Cinematográficos' },
  { id: 'ots-high', label: 'OTS High (Sobre o Ombro Alto)', prompt: 'over-the-shoulder high angle shot, looking down from behind shoulder', category: 'angle', subCategory: '5. Ângulos Cinematográficos' },

  // 6. Ângulos de Ação (Anime/Mangá)
  { id: 'chase-camera', label: 'Chase Camera (Câmera de Perseguição)', prompt: 'chase camera angle, trailing tracking shot', category: 'angle', subCategory: '6. Ângulos de Ação (Anime/Mangá)' },
  { id: 'hero-perspective', label: 'Hero Perspective (Perspectiva Heroica)', prompt: 'heroic camera perspective, wide angle low hero positioning', category: 'angle', subCategory: '6. Ângulos de Ação (Anime/Mangá)' },
  { id: 'speed-perspective-angle', label: 'Speed Perspective (Perspectiva de Velocidade)', prompt: 'exaggerated speed perspective camera angle, high speed motion lines', category: 'angle', subCategory: '6. Ângulos de Ação (Anime/Mangá)' },
  { id: 'overhead-diagonal', label: 'Overhead Diagonal (Diagonal de Cima)', prompt: 'overhead diagonal angle, tilted bird\'s eye camera view', category: 'angle', subCategory: '6. Ângulos de Ação (Anime/Mangá)' },
  { id: 'rotational-angle', label: 'Rotational Angle (Ângulo Rotacional)', prompt: 'rotational camera angle, spinning camera perspective', category: 'angle', subCategory: '6. Ângulos de Ação (Anime/Mangá)' },
  { id: 'impact-frame-angle', label: 'Impact Frame (Frame de Impacto)', prompt: 'action impact frame camera angle, dynamic shockwave framing', category: 'angle', subCategory: '6. Ângulos de Ação (Anime/Mangá)' },
];

export const PERSPECTIVES: Option[] = [
  // 1. Perspectivas Clássicas
  { id: 'normal', label: 'Perspectiva Normal', prompt: 'normal perspective, realistic depth', category: 'perspective', subCategory: '1. Perspectivas Clássicas' },
  { id: 'one-point', label: '1 Ponto de Fuga (One-Point)', prompt: 'one point perspective, single vanishing point', category: 'perspective', subCategory: '1. Perspectivas Clássicas' },
  { id: 'two-point', label: '2 Pontos de Fuga (Two-Point)', prompt: 'two point perspective', category: 'perspective', subCategory: '1. Perspectivas Clássicas' },
  { id: 'three-point', label: '3 Pontos de Fuga (Three-Point)', prompt: 'three point perspective', category: 'perspective', subCategory: '1. Perspectivas Clássicas' },

  // 2. Perspectivas Estilizadas
  { id: 'fisheye', label: 'Olho de Peixe (Fisheye)', prompt: 'fisheye lens perspective, ultra wide distortion', category: 'perspective', subCategory: '2. Perspectivas Estilizadas' },
  { id: 'curvilinear', label: 'Curvilinear', prompt: 'curvilinear perspective', category: 'perspective', subCategory: '2. Perspectivas Estilizadas' },
  { id: 'exaggerated', label: 'Exagerada (Exaggerated)', prompt: 'exaggerated perspective, dynamic anime distortion', category: 'perspective', subCategory: '2. Perspectivas Estilizadas' },
  { id: 'foreshortening', label: 'Distorcida (Foreshortening)', prompt: 'extreme foreshortening perspective, distorted depth', category: 'perspective', subCategory: '2. Perspectivas Estilizadas' },

  // 3. Perspectivas Cinematográficas
  { id: 'deep-focus', label: 'Foco Profundo (Deep Focus)', prompt: 'deep focus perspective, everything in sharp focus', category: 'perspective', subCategory: '3. Perspectivas Cinematográficas' },
  { id: 'shallow-depth', label: 'Profundidade Raseira (Shallow Depth)', prompt: 'shallow depth of field, cinematic depth', category: 'perspective', subCategory: '3. Perspectivas Cinematográficas' },
  { id: 'cinematic', label: 'Lente Cinematográfica (Cinematic)', prompt: 'cinematic perspective, anamorphic depth', category: 'perspective', subCategory: '3. Perspectivas Cinematográficas' },
  { id: 'compression', label: 'Compressão de Teleobjetiva', prompt: 'compression perspective, compressed background, telephoto look', category: 'perspective', subCategory: '3. Perspectivas Cinematográficas' },

  // 4. Perspectivas Artísticas
  { id: 'atmospheric', label: 'Atmosférica (Atmosférica)', prompt: 'atmospheric perspective, depth by fog and haze', category: 'perspective', subCategory: '4. Perspectivas Artísticas' },
  { id: 'layered', label: 'Camadas Planas (Layered)', prompt: 'layered perspective, distinct foreground midground and background, Ghibli layout style', category: 'perspective', subCategory: '4. Perspectivas Artísticas' },
  { id: 'forced', label: 'Perspectiva Forçada (Forced)', prompt: 'forced perspective, illusion of scale', category: 'perspective', subCategory: '4. Perspectivas Artísticas' },
  { id: 'epic-scale', label: 'Escala Épica (Epic Scale)', prompt: 'epic scale perspective, tiny character in massive environment', category: 'perspective', subCategory: '4. Perspectivas Artísticas' },

  // 5. Perspectivas Técnicas
  { id: 'orthographic', label: 'Ortográfica (Orthographic)', prompt: 'orthographic view, no perspective distortion', category: 'perspective', subCategory: '5. Perspectivas Técnicas' },
  { id: 'isometric', label: 'Isométrica', prompt: 'isometric perspective, 2.5D view, no vanishing point', category: 'perspective', subCategory: '5. Perspectivas Técnicas' },
  { id: 'four-point', label: '4 Pontos de Fuga (Four-Point)', prompt: 'four point perspective, curvilinear perspective', category: 'perspective', subCategory: '5. Perspectivas Técnicas' },
  { id: 'five-point', label: '5 Pontos de Fuga (Five-Point)', prompt: 'five point perspective, spherical perspective', category: 'perspective', subCategory: '5. Perspectivas Técnicas' },
  { id: 'spherical', label: 'Perspectiva Esférica', prompt: 'spherical perspective, fisheye curved lines', category: 'perspective', subCategory: '5. Perspectivas Técnicas' },
];

export const ASPECT_RATIOS: Option[] = [
  { id: '16:9', label: 'TV / Monitor (16:9)', prompt: '--ar 16:9', category: 'aspect' },
  { id: '9:16', label: 'Smartphone (9:16)', prompt: '--ar 9:16', category: 'aspect' },
  { id: '4:3', label: 'Tablet / Foto (4:3)', prompt: '--ar 4:3', category: 'aspect' },
  { id: '1:1', label: 'Quadrado (1:1)', prompt: '--ar 1:1', category: 'aspect' },
  { id: '21:9', label: 'Ultrawide (21:9)', prompt: '--ar 21:9', category: 'aspect' },
  { id: '2:3', label: 'Painel HQ Vert. (2:3)', prompt: '--ar 2:3', category: 'aspect' },
  { id: '3:2', label: 'Painel HQ Horiz. (3:2)', prompt: '--ar 3:2', category: 'aspect' },
  { id: 'circle', label: 'Círculo / Vignette', prompt: 'circular framing, vignette composition', category: 'aspect' },
  { id: 'custom', label: 'Customizado', prompt: '', category: 'aspect' },
];

export const LENSES: Option[] = [
  // 1. Lentes Naturais
  { id: '24mm', label: '24mm (Wide Natural)', prompt: 'shot on 24mm wide-angle lens', category: 'lens', subCategory: '1. Lentes Naturais' },
  { id: '35mm', label: '35mm (Cinema Moderno)', prompt: 'shot on 35mm lens, natural field of view', category: 'lens', subCategory: '1. Lentes Naturais' },
  { id: '50mm', label: '50mm (Perspectiva Humana)', prompt: 'shot on 50mm lens, standard human perspective', category: 'lens', subCategory: '1. Lentes Naturais' },
  { id: '85mm', label: '85mm (Retrato Cinematográfico)', prompt: 'shot on 85mm lens, cinematic portrait compression, blurred background', category: 'lens', subCategory: '1. Lentes Naturais' },

  // 2. Lentes Cinematográficas
  { id: 'anamorphic', label: 'Lente Anamórfica', prompt: 'shot on anamorphic lens, oval bokeh, horizontal blue lens flare, cinematic aspect', category: 'lens', subCategory: '2. Lentes Cinematográficas' },
  { id: 'imax', label: 'Lente IMAX', prompt: 'shot on IMAX lens, gigantic scale, high-fidelity details, massive field of view', category: 'lens', subCategory: '2. Lentes Cinematográficas' },
  { id: 'spherical-lens', label: 'Lente Esférica (Cinema Clássico)', prompt: 'shot on spherical cinema lens, classic movie rendering', category: 'lens', subCategory: '2. Lentes Cinematográficas' },
  { id: 'cooke-lens', label: 'Lente Cooke (Cooke Look)', prompt: 'shot on Cooke speed panchro lens, warm organic look, gentle contrast, golden tones', category: 'lens', subCategory: '2. Lentes Cinematográficas' },
  { id: 'zeiss-lens', label: 'Lente Zeiss (Nítida)', prompt: 'shot on Zeiss cinema lens, ultra-sharp details, high contrast, clean modern look', category: 'lens', subCategory: '2. Lentes Cinematográficas' },

  // 3. Lentes Dramáticas
  { id: 'ultra-wide', label: 'Ultra Grande Angular (14mm-20mm)', prompt: 'shot on 14mm ultra-wide lens, dynamic distortion, deep field view', category: 'lens', subCategory: '3. Lentes Dramáticas' },
  { id: 'fisheye-lens', label: 'Olho de Peixe (Fisheye)', prompt: 'shot on fisheye lens, ultra-wide 180-degree spherical distortion, curved lines', category: 'lens', subCategory: '3. Lentes Dramáticas' },
  { id: 'telephoto', label: 'Teleobjetiva (135mm-300mm)', prompt: 'shot on 200mm telephoto lens, strong background compression, flattened depth', category: 'lens', subCategory: '3. Lentes Dramáticas' },
  { id: 'super-telephoto', label: 'Super Teleobjetiva (300mm+)', prompt: 'shot on 400mm super telephoto lens, wildlife and surveillance zoom', category: 'lens', subCategory: '3. Lentes Dramáticas' },

  // 4. Lentes Artísticas
  { id: 'vintage-lens', label: 'Lente Vintage', prompt: 'shot on vintage lens, chromatic aberration, organic flare, soft focus edges', category: 'lens', subCategory: '4. Lentes Artísticas' },
  { id: 'tilt-shift-lens', label: 'Lente Tilt-Shift (Miniatura)', prompt: 'shot on tilt-shift lens, miniature effect, selective blur tilt-shift', category: 'lens', subCategory: '4. Lentes Artísticas' },
  { id: 'dream-lens', label: 'Lente Dream (Glow & Halation)', prompt: 'shot on dream lens, soft halation diffuse glow, romantic dreamlike aesthetic', category: 'lens', subCategory: '4. Lentes Artísticas' },

  // 5. Lentes Técnicas
  { id: 'macro-lens', label: 'Lente Macro', prompt: 'shot on macro lens, extreme close-up detail, tiny subject magnification', category: 'lens', subCategory: '5. Lentes Técnicas' },
  { id: 'cctv-lens', label: 'Lente CCTV (Segurança)', prompt: 'shot on security CCTV lens, low-fidelity surveillance video style', category: 'lens', subCategory: '5. Lentes Técnicas' },
  { id: 'smartphone-lens', label: 'Lente de Smartphone', prompt: 'shot on mobile smartphone camera lens, modern social media visual style', category: 'lens', subCategory: '5. Lentes Técnicas' },
  { id: 'vr-360', label: 'Lente VR / 360 Graus', prompt: 'shot on 360-degree VR camera lens, equirectangular panoramas, immersive sphere', category: 'lens', subCategory: '5. Lentes Técnicas' },
  { id: 'documentary-lens', label: 'Lente Documental', prompt: 'shot on documentary lens, raw and realistic aesthetic, handheld news style', category: 'lens', subCategory: '5. Lentes Técnicas' },
];

export const LIGHTING: Option[] = [
  // 1. Iluminação Básica
  { id: 'soft', label: 'Luz Suave (Soft)', prompt: 'soft diffused lighting', category: 'lighting', subCategory: '1. Iluminação Básica' },
  { id: 'hard', label: 'Luz Dura (Hard)', prompt: 'hard directional lighting, high contrast', category: 'lighting', subCategory: '1. Iluminação Básica' },
  { id: 'ambient', label: 'Luz Ambiente (Ambient)', prompt: 'ambient lighting, flat even fill light', category: 'lighting', subCategory: '1. Iluminação Básica' },
  { id: 'side', label: 'Luz Lateral (Side)', prompt: 'side lighting, strong key light from side, high texture detail', category: 'lighting', subCategory: '1. Iluminação Básica' },

  // 2. Iluminação Dramática
  { id: 'low-key', label: 'Low Key (Sombrio)', prompt: 'low-key lighting, moody deep shadows, high contrast drama', category: 'lighting', subCategory: '2. Iluminação Dramática' },
  { id: 'split-light', label: 'Split Lighting (Bipartida)', prompt: 'split lighting portrait, half face lit, high drama shadow split', category: 'lighting', subCategory: '2. Iluminação Dramática' },
  { id: 'noir-lighting', label: 'Noir Lighting (Claro-Escuro)', prompt: 'film noir lighting style, extreme chiaroscuro, venetian blind shadows', category: 'lighting', subCategory: '2. Iluminação Dramática' },
  { id: 'underlighting', label: 'Underlighting (Luz de Baixo)', prompt: 'underlighting, dramatic uplight, horror light direction, looking up from bottom', category: 'lighting', subCategory: '2. Iluminação Dramática' },

  // 3. Iluminação Cinematográfica
  { id: 'rim', label: 'Luz de Contorno (Rim Light)', prompt: 'rim lighting, strong edge light, backlight silhouette outline', category: 'lighting', subCategory: '3. Iluminação Cinematográfica' },
  { id: 'volumetric', label: 'Luz Volumétrica', prompt: 'volumetric lighting, visible light shafts, haze beams', category: 'lighting', subCategory: '3. Iluminação Cinematográfica' },
  { id: 'motivated', label: 'Luz Motivada (Motivated)', prompt: 'motivated lighting, realistic source lighting, natural looking cinematography', category: 'lighting', subCategory: '3. Iluminação Cinematográfica' },
  { id: 'practical', label: 'Luz Prática (Practical)', prompt: 'practical lighting, visible in-scene light sources, glowing candlelight or screens', category: 'lighting', subCategory: '3. Iluminação Cinematográfica' },
  { id: 'rembrandt', label: 'Luz Rembrandt', prompt: 'Rembrandt lighting style, signature light triangle on cheek, painterly portrait look', category: 'lighting', subCategory: '3. Iluminação Cinematográfica' },
  { id: 'butterfly', label: 'Luz Butterfly (Borboleta)', prompt: 'butterfly lighting portrait, overhead glamour key light, fashion look', category: 'lighting', subCategory: '3. Iluminação Cinematográfica' },
  { id: 'loop', label: 'Luz Loop', prompt: 'loop lighting portrait, subtle nose shadow, classic studio lighting', category: 'lighting', subCategory: '3. Iluminação Cinematográfica' },
  { id: 'top-lighting', label: 'Luz Superior (Top Light)', prompt: 'top lighting, dramatic overhead keylight, interrogative atmosphere', category: 'lighting', subCategory: '3. Iluminação Cinematográfica' },
  { id: 'god-rays', label: 'Raios Divinos (God Rays)', prompt: 'cinematic god rays, crepuscular sun beams, volumetric light haze', category: 'lighting', subCategory: '3. Iluminação Cinematográfica' },

  // 4. Iluminação Natural
  { id: 'golden-hour', label: 'Golden Hour (Pôr do Sol)', prompt: 'golden hour sunset lighting, warm orange glow, long soft shadows', category: 'lighting', subCategory: '4. Iluminação Natural' },
  { id: 'blue-hour', label: 'Blue Hour (Crepúsculo)', prompt: 'blue hour lighting, cool atmospheric twilight, soft ambient dusk', category: 'lighting', subCategory: '4. Iluminação Natural' },
  { id: 'moonlight', label: 'Moonlight (Luar)', prompt: 'moonlight lighting, cool blue night illumination, soft lunar glow', category: 'lighting', subCategory: '4. Iluminação Natural' },
  { id: 'overcast', label: 'Nublado (Overcast)', prompt: 'overcast sky lighting, flat diffused daylight, desaturated soft shadows', category: 'lighting', subCategory: '4. Iluminação Natural' },
  { id: 'candlelight', label: 'Luz de Velas (Candlelight)', prompt: 'warm candlelight, flickering flame lighting, historical drama ambience', category: 'lighting', subCategory: '4. Iluminação Natural' },

  // 5. Iluminação Estilizada
  { id: 'cyberpunk-lighting', label: 'Cyberpunk Lighting', prompt: 'cyberpunk style lighting, neon color contrast, wet surface reflections', category: 'lighting', subCategory: '5. Iluminação Estilizada' },
  { id: 'neon', label: 'Luz Neon (Neon)', prompt: 'neon glow, colorful neon tube illumination, synthwave ambience', category: 'lighting', subCategory: '5. Iluminação Estilizada' },
  { id: 'colored-light', label: 'Luz Colorida (Colored)', prompt: 'colored lighting, stylized dual-tone gel lighting, red and blue split', category: 'lighting', subCategory: '5. Iluminação Estilizada' },
  { id: 'stage-lighting', label: 'Luz de Palco (Stage)', prompt: 'stage spotlighting, dramatic theatrical stage beams, performance look', category: 'lighting', subCategory: '5. Iluminação Estilizada' },
  { id: 'horror-lighting', label: 'Luz de Terror (Horror)', prompt: 'horror cinema lighting, dynamic high contrast shadows, eerie green and purple tones', category: 'lighting', subCategory: '5. Iluminação Estilizada' },
  { id: 'studio', label: 'Luz de Estúdio (Studio)', prompt: 'controlled professional studio lighting, three-point setup, clean portrait fill', category: 'lighting', subCategory: '5. Iluminação Estilizada' },
];

export const ENVIRONMENTS: Option[] = [
  // 1. Cenários Naturais
  { id: 'fantasy-forest', label: 'Floresta de Fantasia', prompt: 'fantasy forest, mystical trees, glowing flora', category: 'environment', subCategory: '1. Cenários Naturais' },
  { id: 'dense-forest', label: 'Floresta Densa', prompt: 'dense forest, canopy shadows, wilderness foliage', category: 'environment', subCategory: '1. Cenários Naturais' },
  { id: 'mystical-forest', label: 'Floresta Mística', prompt: 'mystical forest, ethereal haze, ancient roots', category: 'environment', subCategory: '1. Cenários Naturais' },
  { id: 'desert', label: 'Deserto (Dunas)', prompt: 'vast desert landscape, sand dunes, wind patterns', category: 'environment', subCategory: '1. Cenários Naturais' },
  { id: 'arid-wasteland', label: 'Terra Árida / Devastada', prompt: 'arid wasteland, cracked soil, dry climate', category: 'environment', subCategory: '1. Cenários Naturais' },
  { id: 'mountain-range', label: 'Cordilheira de Montanhas', prompt: 'massive mountain range, rocky peaks', category: 'environment', subCategory: '1. Cenários Naturais' },
  { id: 'snowy-mountains', label: 'Montanhas Nevadas', prompt: 'snowy mountains, ice peaks, winter altitude', category: 'environment', subCategory: '1. Cenários Naturais' },
  { id: 'tropical-beach', label: 'Praia Tropical', prompt: 'tropical beach, palm trees, clear water', category: 'environment', subCategory: '1. Cenários Naturais' },
  { id: 'cinematic-coast', label: 'Costa Cinematográfica', prompt: 'cinematic coastal cliffs, waves crashing, dramatic shore', category: 'environment', subCategory: '1. Cenários Naturais' },
  { id: 'open-sea', label: 'Mar Aberto', prompt: 'open sea horizon, endless ocean blue', category: 'environment', subCategory: '1. Cenários Naturais' },
  { id: 'stormy-ocean', label: 'Oceano Tempestuoso', prompt: 'stormy ocean waves, dark clouds, violent sea', category: 'environment', subCategory: '1. Cenários Naturais' },
  { id: 'jungle', label: 'Selva Tropical', prompt: 'dense jungle environment, wild tropical vines', category: 'environment', subCategory: '1. Cenários Naturais' },
  { id: 'frozen-landscape', label: 'Paisagem Congelada', prompt: 'frozen landscape, deep snow environment, subzero tundra', category: 'environment', subCategory: '1. Cenários Naturais' },
  { id: 'volcanic-terrain', label: 'Terreno Vulcânico', prompt: 'volcanic terrain, cooling lava flows, sulfur gas smoke', category: 'environment', subCategory: '1. Cenários Naturais' },

  // 2. Cenários Urbanos
  { id: 'modern-city', label: 'Cidade Moderna (Downtown)', prompt: 'modern city downtown, high-rise office buildings, glass skyscrapers', category: 'environment', subCategory: '2. Cenários Urbanos' },
  { id: 'cyberpunk-city', label: 'Cidade Cyberpunk', prompt: 'neon cyberpunk city, cyber-aesthetic towers, flying vehicles', category: 'environment', subCategory: '2. Cenários Urbanos' },
  { id: 'cyberpunk-streets', label: 'Ruas Cyberpunk', prompt: 'cyberpunk streets, glowing holographic signs, dark wet pavements', category: 'environment', subCategory: '2. Cenários Urbanos' },
  { id: 'rainy-neon-alley', label: 'Beco Neon Chuvoso', prompt: 'rainy neon alleyway, colorful reflections on puddles, urban noir', category: 'environment', subCategory: '2. Cenários Urbanos' },
  { id: 'ruined-city', label: 'Cidade em Ruínas', prompt: 'ruined city, post-apocalyptic urban decay, overgrown concrete', category: 'environment', subCategory: '2. Cenários Urbanos' },
  { id: 'abandoned-world', label: 'Mundo Abandonado (Pós-Apoc.)', prompt: 'post-apocalyptic abandoned world, remnants of civilization', category: 'environment', subCategory: '2. Cenários Urbanos' },
  { id: 'favela', label: 'Favela / Urbano Denso', prompt: 'dense vertical favela architecture, layered brick houses, complex urban cluster', category: 'environment', subCategory: '2. Cenários Urbanos' },
  { id: 'industrial-complex', label: 'Complexo Industrial', prompt: 'industrial complex, smoke factories, piping structures', category: 'environment', subCategory: '2. Cenários Urbanos' },
  { id: 'suburban-neighborhood', label: 'Bairro Suburbano', prompt: 'suburban neighborhood street, neat houses and lawns', category: 'environment', subCategory: '2. Cenários Urbanos' },

  // 3. Fantasia / RPG
  { id: 'fantasy-kingdom', label: 'Reino Fantástico', prompt: 'glorious fantasy kingdom, grand spires, epic fantasy landscape', category: 'environment', subCategory: '3. Fantasia / RPG' },
  { id: 'medieval-castle', label: 'Castelo Medieval', prompt: 'medieval castle stone structure, majestic towers', category: 'environment', subCategory: '3. Fantasia / RPG' },
  { id: 'gothic-castle', label: 'Castelo Gótico', prompt: 'dark gothic castle, sharp silhouettes, ominous moonlit gargoyles', category: 'environment', subCategory: '3. Fantasia / RPG' },
  { id: 'medieval-village', label: 'Vila Medieval', prompt: 'medieval village tavern and dirt streets, timber-framed houses', category: 'environment', subCategory: '3. Fantasia / RPG' },
  { id: 'dungeon', label: 'Dungeon (Masmorra)', prompt: 'dark dungeon corridor, stone brick walls, iron torches, damp cell block', category: 'environment', subCategory: '3. Fantasia / RPG' },
  { id: 'ancient-temple', label: 'Templo Antigo', prompt: 'ancient ruined temple, mossy pillars, lost ruins', category: 'environment', subCategory: '3. Fantasia / RPG' },
  { id: 'enchanted-forest', label: 'Floresta Encantada', prompt: 'enchanted forest, magical glowing mushrooms, floating wisps', category: 'environment', subCategory: '3. Fantasia / RPG' },

  // 4. Sci-Fi / Futurista
  { id: 'spaceship-interior', label: 'Interior de Nave Espacial', prompt: 'spaceship interior corridor, white plastic panels, sci-fi computer interfaces', category: 'environment', subCategory: '4. Sci-Fi / Futurista' },
  { id: 'sci-fi-station', label: 'Estação Espacial', prompt: 'futuristic space station hub, viewport window showing outer space stars', category: 'environment', subCategory: '4. Sci-Fi / Futurista' },
  { id: 'alien-world', label: 'Planeta Alienígena', prompt: 'alien planet surface, strange ringed skies, bioluminescent organisms', category: 'environment', subCategory: '4. Sci-Fi / Futurista' },
  { id: 'futuristic-lab', label: 'Laboratório Futurista', prompt: 'futuristic scientific lab, cybernetic pods, holographic research holograms', category: 'environment', subCategory: '4. Sci-Fi / Futurista' },
  { id: 'mega-city', label: 'Megacidade Futurista', prompt: 'futuristic mega city, towering solar-punk buildings, high-tech infrastructure', category: 'environment', subCategory: '4. Sci-Fi / Futurista' },

  // 5. Terror / Suspense
  { id: 'haunted-mansion', label: 'Mansão Assombrada', prompt: 'creepy haunted mansion, dusty portraits, cobwebs, gothic architecture', category: 'environment', subCategory: '5. Terror / Suspense' },
  { id: 'abandoned-hospital', label: 'Hospital Abandonado', prompt: 'derelict abandoned hospital corridor, flickering fluorescent lights, rust', category: 'environment', subCategory: '5. Terror / Suspense' },
  { id: 'dark-forest', label: 'Floresta Sombria', prompt: 'spooky dark forest at night, twisted dead trees, thick fog', category: 'environment', subCategory: '5. Terror / Suspense' },
  { id: 'dark-alley', label: 'Beco Escuro', prompt: 'dark shady alleyway, dim street lamp, garbage cans, suspenseful vibe', category: 'environment', subCategory: '5. Terror / Suspense' },
  { id: 'ghost-town', label: 'Cidade Fantasma', prompt: 'abandoned dusty ghost town, old western storefronts, tumbleweeds', category: 'environment', subCategory: '5. Terror / Suspense' },

  // 6. Cenários Históricos
  { id: 'ancient-egypt', label: 'Egito Antigo', prompt: 'ancient Egypt landscape, grand pyramids, sand dust, sphinx', category: 'environment', subCategory: '6. Cenários Históricos' },
  { id: 'ancient-roma', label: 'Roma Antiga', prompt: 'ancient Rome forum, colosseum facade, marble columns, roman flags', category: 'environment', subCategory: '6. Cenários Históricos' },
  { id: 'feudal-japan', label: 'Japão Feudal', prompt: 'feudal Japan village, traditional pagoda, cherry blossom trees, samurai aesthetic', category: 'environment', subCategory: '6. Cenários Históricos' },
  { id: 'wild-western', label: 'Velho Oeste (Western)', prompt: 'old wild west town saloon, dusty main street, wooden boardwalks', category: 'environment', subCategory: '6. Cenários Históricos' },
  { id: 'victorian-era', label: 'Era Vitoriana', prompt: 'Victorian era London street, gas lamps, cobblestones, brick townhouses, steam fog', category: 'environment', subCategory: '6. Cenários Históricos' },

  // 7. Interiores Especializados
  { id: 'office', label: 'Escritório', prompt: 'modern office interior, corporate cubicles, desks, fluorescent office lighting', category: 'environment', subCategory: '7. Interiores Especializados' },
  { id: 'classroom', label: 'Sala de Aula', prompt: 'school classroom, blackboard, students desks, educational posters', category: 'environment', subCategory: '7. Interiores Especializados' },
  { id: 'library', label: 'Biblioteca', prompt: 'grand old library interior, high wooden bookshelves packed with books, study tables', category: 'environment', subCategory: '7. Interiores Especializados' },
  { id: 'cafe', label: 'Café', prompt: 'cozy coffee shop interior, warm wooden tables, barista counter, espresso machine', category: 'environment', subCategory: '7. Interiores Especializados' },
  { id: 'bar', label: 'Bar / Pub', prompt: 'dimly lit bar pub interior, bar counter, neon beer signs, bottles behind bar', category: 'environment', subCategory: '7. Interiores Especializados' },
  { id: 'restaurant', label: 'Restaurante', prompt: 'fine dining restaurant interior, set tables, ambient dining lighting', category: 'environment', subCategory: '7. Interiores Especializados' },
  { id: 'bedroom', label: 'Quarto', prompt: 'cozy bedroom interior, unmade bed, warm bedroom lamp, window view', category: 'environment', subCategory: '7. Interiores Especializados' },
  { id: 'church', label: 'Igreja', prompt: 'solemn church interior, stained glass windows, wooden pews, stone arches', category: 'environment', subCategory: '7. Interiores Especializados' },
  { id: 'market', label: 'Mercado', prompt: 'bustling indoor market, food stalls, hanging signs, crowded alleys', category: 'environment', subCategory: '7. Interiores Especializados' },

  // 8. Clima & Atmosfera
  { id: 'storm', label: 'Tempestade', prompt: 'raging storm atmosphere, heavy wind, dark ominous clouds', category: 'environment', subCategory: '8. Clima & Atmosfera' },
  { id: 'blizzard', label: 'Nevasca', prompt: 'heavy winter blizzard, howling wind, low visibility snowstorm', category: 'environment', subCategory: '8. Clima & Atmosfera' },
  { id: 'heavy-rain', label: 'Chuva Forte', prompt: 'pouring heavy rain atmosphere, water droplets in air, sheet rain', category: 'environment', subCategory: '8. Clima & Atmosfera' },
  { id: 'night-time', label: 'Noite', prompt: 'pitch black night setting, stars, cinematic night atmosphere', category: 'environment', subCategory: '8. Clima & Atmosfera' },
  { id: 'midnight', label: 'Madrugada', prompt: 'silent midnight ambiance, faint distant lights, mist', category: 'environment', subCategory: '8. Clima & Atmosfera' },
  { id: 'dawn', label: 'Amanhecer', prompt: 'golden dawn twilight atmosphere, rising sun rays, early morning haze', category: 'environment', subCategory: '8. Clima & Atmosfera' },
  { id: 'eclipse', label: 'Eclipse Solar', prompt: 'dramatic solar eclipse sky, corona ring light, eerie midday twilight', category: 'environment', subCategory: '8. Clima & Atmosfera' },
  { id: 'red-sky', label: 'Céu Vermelho', prompt: 'apocalyptic blood red sky atmosphere, dramatic clouds', category: 'environment', subCategory: '8. Clima & Atmosfera' },
  { id: 'thunderstorm', label: 'Tempestade Elétrica', prompt: 'heavy thunderstorm, forks of lightning illuminating sky, electric charge', category: 'environment', subCategory: '8. Clima & Atmosfera' },
  { id: 'starry-sky', label: 'Céu Estrelado', prompt: 'clear night starry sky, milky way galaxy visible, deep space cosmos', category: 'environment', subCategory: '8. Clima & Atmosfera' },

  // 9. Atmosfera Emocional
  { id: 'melancholic', label: 'Melancólico', prompt: 'melancholic mood, cold color grading, somber quiet vibe', category: 'environment', subCategory: '9. Atmosfera Emocional' },
  { id: 'gloomy', label: 'Sombrio', prompt: 'gloomy atmosphere, heavy shadows, low contrast dark mood', category: 'environment', subCategory: '9. Atmosfera Emocional' },
  { id: 'cozy', label: 'Acolhedor (Cozy)', prompt: 'cozy warm mood, soft golden lighting, inviting homey vibe', category: 'environment', subCategory: '9. Atmosfera Emocional' },
  { id: 'epic', label: 'Épico', prompt: 'epic heroic mood, grand cinematic scale, dramatic high contrast', category: 'environment', subCategory: '9. Atmosfera Emocional' },
  { id: 'mysterious', label: 'Misterioso', prompt: 'mysterious atmosphere, enigmatic shadows, fog rays', category: 'environment', subCategory: '9. Atmosfera Emocional' },
  { id: 'chaotic', label: 'Caótico', prompt: 'chaotic mood, dust explosions, debris flying, dynamic action tension', category: 'environment', subCategory: '9. Atmosfera Emocional' },
  { id: 'lonely', label: 'Solitário', prompt: 'lonely atmosphere, vast empty spaces, single focal point, isolation', category: 'environment', subCategory: '9. Atmosfera Emocional' },
  { id: 'dreamy', label: 'Sonhador (Dreamy)', prompt: 'dreamy pastel atmosphere, soft focus glow, romantic fantasy vibe', category: 'environment', subCategory: '9. Atmosfera Emocional' },

  // 10. Estilos de Cenário
  { id: 'ghibli-env', label: 'Estilo Ghibli', prompt: 'Ghibli style painted background environment, hand-drawn anime aesthetic, lush green grass, blue watercolor sky', category: 'environment', subCategory: '10. Estilos de Cenário' },
  { id: 'noir-env', label: 'Estilo Film Noir', prompt: 'film noir style high contrast black and white scene, vintage detective film look', category: 'environment', subCategory: '10. Estilos de Cenário' },
  { id: 'blade-runner', label: 'Blade Runner Style', prompt: 'Blade Runner style cyberpunk backdrop, industrial futuristic aesthetic, neon haze, heavy rain', category: 'environment', subCategory: '10. Estilos de Cenário' },
  { id: 'dark-fantasy-env', label: 'Dark Fantasy', prompt: 'dark fantasy world environment, gothic ominous skies, ancient ruined towers', category: 'environment', subCategory: '10. Estilos de Cenário' },
  { id: 'solarpunk', label: 'Solarpunk', prompt: 'solarpunk city environment, green architecture integration, solar panels, clean ecological future', category: 'environment', subCategory: '10. Estilos de Cenário' },
  { id: 'steampunk', label: 'Steampunk', prompt: 'steampunk town environment, brass pipes, steam vents, gears, Victorian sci-fi machinery', category: 'environment', subCategory: '10. Estilos de Cenário' },
  { id: 'vaporwave', label: 'Vaporwave', prompt: 'vaporwave grid wireframe environment, pink sunset, neon grid landscape, low poly 3D assets', category: 'environment', subCategory: '10. Estilos de Cenário' },
  { id: 'synthwave', label: 'Synthwave', prompt: 'synthwave grid highway landscape, outrun retro sun, neon purple and orange wires', category: 'environment', subCategory: '10. Estilos de Cenário' },
];

export const STYLES: Option[] = [
  // 1. Pintura Tradicional
  { id: 'aquarela', label: 'Aquarela', prompt: 'watercolor painting style, bleeding pigments, paper texture', category: 'style', subCategory: '1. Pintura Tradicional' },
  { id: 'guache', label: 'Guache', prompt: 'gouache painting, opaque pigments, textured strokes', category: 'style', subCategory: '1. Pintura Tradicional' },
  { id: 'oleo', label: 'Óleo sobre tela', prompt: 'traditional oil painting on canvas, heavy impasto, rich textures', category: 'style', subCategory: '1. Pintura Tradicional' },
  { id: 'acrilica', label: 'Acrílica', prompt: 'acrylic painting style, vibrant colors, plastic texture', category: 'style', subCategory: '1. Pintura Tradicional' },
  { id: 'tempera', label: 'Têmpera', prompt: 'egg tempera painting style, traditional medieval technique', category: 'style', subCategory: '1. Pintura Tradicional' },
  { id: 'pastel-seco', label: 'Pastel seco', prompt: 'soft dry pastel drawing, dusty texture, blended colors', category: 'style', subCategory: '1. Pintura Tradicional' },

  // 2. Desenho Tradicional
  { id: 'grafite', label: 'Grafite', prompt: 'detailed graphite pencil drawing, realistic shading', category: 'style', subCategory: '2. Desenho Tradicional' },
  { id: 'carvao', label: 'Carvão', prompt: 'charcoal drawing, smudged textures, deep blacks, rough paper', category: 'style', subCategory: '2. Desenho Tradicional' },
  { id: 'lapis-cor', label: 'Lápis de cor', prompt: 'colored pencil drawing, layered wax texture, fine details', category: 'style', subCategory: '2. Desenho Tradicional' },
  { id: 'giz-cera', label: 'Giz de cera', prompt: 'wax crayon drawing, heavy texture, vibrant waxy colors', category: 'style', subCategory: '2. Desenho Tradicional' },
  { id: 'crayon', label: 'Crayon', prompt: 'conté crayon drawing, grainy texture, artistic sketching style', category: 'style', subCategory: '2. Desenho Tradicional' },
  { id: 'pastel-oleoso', label: 'Pastel Oleoso', prompt: 'depicted in an expressive, rich textured oil pastel drawing. Thick, waxy, and creamy pastel crayon strokes are highly visible, with heavy layering creating a tactile impasto effect on the surface. The tooth and grain of heavy-weight textured paper subtly peek through the vibrant, hand-blended pigments. Sgraffito details scratching through layers to reveal underlying colors, softly smudged edges, and tiny physical waxy crumbs built up along the stroke borders. Rich, saturated color palette with organic transitions, under soft light that accentuates the physical relief of the wax on grainy paper.', category: 'style', subCategory: '2. Desenho Tradicional', image: '/images/styles/pastel-oleoso.png' },
  { id: 'ponta-de-feltro', label: 'Ponta de Feltro', prompt: 'drawn entirely in felt-tip pen and vibrant artistic marker technique. Bold, clean, and expressive black ink outlines. Colorful filling showing authentic marker textures, visible overlapping strokes, detailed cross-hatching shading, and subtle ink pooling where the pen rested. Illustrated on heavy-weight, highly textured sketch paper with visible paper grain. Professional sketchbook art style, vivid and saturated colors, featuring realistic subtle ink bleed along the outlines. No digital gradients, pure authentic analog look.', category: 'style', subCategory: '2. Desenho Tradicional', image: '/images/styles/ponta-de-feltro.png' },

  // 3. Tinta e Line Art
  { id: 'nanquim', label: 'Nanquim', prompt: 'ink wash illustration, deep black india ink', category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'bico-de-pena', label: 'Bico de pena', prompt: 'fine pen and ink drawing, delicate linework', category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'caneta-esferografica', label: 'Caneta esferográfica', prompt: `highly detailed realistic ballpoint pen drawing using blue Bic pen style. Intricate fine lines, dense cross-hatching and stippling for shading, typical ballpoint pen pressure variations. Masterful pen work with organic flowing lines, realistic facial features and curly hair texture, drawn on white paper, classic blue ballpoint ink, hand-drawn aesthetic, extremely detailed, museum quality pen illustration --stylize 750`, category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'pincel', label: 'Pincel', prompt: 'painterly style, visible brushstrokes, artistic textured paint application', category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'sketch-pincel-nanquim', label: 'Sketch em pincel e nanquim', prompt: `expressive ink sketch, dynamic brush pen lines, loose gestural drawing, black ink illustration, confident strokes, comic book inking style, rough hatching, minimalist shading, hand drawn sketchbook aesthetic, elegant line economy, editorial illustration style`, category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'croqui', label: 'Croqui', prompt: `A raw artist's sketchbook page, expressive gestural ink-and-pencil sketch. High-contrast black ink cross-hatching, heavy dense shadow patches, and minimalist, rough scratching lines with varying weight. Features abstract, floating ink marks in the white space. Monochromatic.`, category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'line-art', label: 'Line art', prompt: 'clean minimalist line art drawing', category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'arte-final-comics', label: 'Arte final comics', prompt: 'professional inked line art, traditional india ink finish, bold contour lines, expressive line weight variation, detailed crosshatching, feathering technique, dramatic spotting blacks, clean black and white contrast, hand-inked illustration, technical pen and brush rendering, intricate ink details, dynamic shadow rendering, comic-style inking, polished ink finish', category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'raymond', label: 'Raymond', prompt: 'highly detailed black and white ink illustration in the authentic style of 1930s–1940s American newspaper adventure comics, inspired by the elegant illustrative approach of classic adventure strip masters, ultra refined brush linework, realistic anatomy, cinematic composition, sophisticated chiaroscuro, confident tapered ink strokes, expressive faces, realistic folds and fabric rendering, smooth feathered shadows, dynamic spotting blacks, subtle crosshatching, vintage pulp magazine aesthetic, noir atmosphere, dramatic perspective, clean white paper background, classic detective/adventure illustration, ink wash accents, graceful compositions, editorial illustration quality, hand-drawn traditional comic strip craftsmanship, realistic proportions, high contrast black ink, organic imperfections from traditional brushwork, golden age newspaper strip aesthetics, ultra detailed pen and brush rendering', category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'pen-brush-1', label: 'Pen brush 1', prompt: 'Expressive black sumi ink brush pen strokes on textured white paper, ultra realistic Pentel Pocket Brush simulation, pressure-sensitive flexible brush tip, elegant thick-to-thin transitions, organic calligraphic movement, natural hand acceleration, razor sharp tapered endings, subtle ink feathering, slight dry brush texture, spontaneous gestural imperfections, authentic analog ink behavior, Japanese shodo aesthetics, macro photography realism, minimalist composition', category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'pen-brush-2', label: 'Pen brush 2', prompt: 'Expressive noir brush inking, Alex Raymond inspired ink brush strokes, dramatic thick-to-thin brush dynamics, authentic comic brush rendering, organic ink tapering, dry brush imperfections, handcrafted black ink linework, vintage comic strip brush aesthetics', category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'tio-greg', label: 'Tio Greg', prompt: 'High-contrast black and white ink illustration in the dark, gritty comic book art style of Greg Capullo. Dynamic and aggressive ink line art, heavy cross-hatching and fine-line hatching for intricate shading. Massive blocky solid blacks (spot blacks) contrasting against a pure white background. Gritty textures, chaotic ink splatters, jagged and expressive contours. 90s visceral graphic novel aesthetic, no smooth gray gradients or washes, all depth achieved purely through complex ink work.', category: 'style', subCategory: '3. Tinta e Line Art', image: '/images/styles/tio-greg.png' },
  { id: 'arte-final-pincel-nanquim', label: 'Arte final pincel nanquim', prompt: 'Traditional ink illustration, mimicking the ink wash or sumi-e technique. Apply fluid, expressive brushstrokes with variations in thickness. Convert the image to a strictly monochromatic palette. Use a high-contrast scheme with deep black for shadows and outlines, simulating India ink on textured white paper. Maintain exactly the same main subject, characters, composition, and format as the original image provided. Only the style of the image should be changed. Do not add new objects, scenery, or people that do not exist in the original photo. The final image should not contain photorealistic aspects; it should look purely like a hand-drawn sketch with brush and ink.', category: 'style', subCategory: '3. Tinta e Line Art', image: '/images/styles/Arte-final-pincel-nanquim.png' },

  // 4. Técnicas de Sombreamento (HQ)
  { id: 'hachura', label: 'Hachura', prompt: 'hatching technique, parallel lines for shading', category: 'style', subCategory: '4. Técnicas de Sombreamento (HQ)' },
  { id: 'hachura-cruzada', label: 'Hachura cruzada', prompt: 'cross-hatching technique, intersecting lines for depth', category: 'style', subCategory: '4. Técnicas de Sombreamento (HQ)' },
  { id: 'pontilhismo', label: 'Pontilhismo', prompt: 'pointillism technique, dots create form and color', category: 'style', subCategory: '4. Técnicas de Sombreamento (HQ)' },
  { id: 'halftone', label: 'Halftone', prompt: 'halftone dot pattern, vintage comic print style', category: 'style', subCategory: '4. Técnicas de Sombreamento (HQ)' },
  { id: 'screentone', label: 'Screentone', prompt: 'manga screentone style, dot and line patterns', category: 'style', subCategory: '4. Técnicas de Sombreamento (HQ)' },
  { id: 'ben-day-dots', label: 'Ben-Day dots', prompt: 'Authentic vintage comic book printing aesthetic, Ben-Day dot shading, CMYK halftone texture, retro newsprint paper, imperfect offset registration, subtle cyan magenta yellow misalignment, bold black contour inks, aged paper grain, low fidelity comic printing, 1980s comic colorization, pulp comic texture, classic American comic book look', category: 'style', subCategory: '4. Técnicas de Sombreamento (HQ)' },

  // 5. Estilo Artístico
  { id: 'cartoon', label: 'Cartoon', prompt: 'classic cartoon character style, exaggerated features', category: 'style', subCategory: '5. Estilo Artístico' },
  { id: 'comic-fun', label: 'Comic fun', prompt: 'high appeal cartoon character design, expressive caricature deformation, animation industry style model sheet, stylized facial anatomy, simplified geometric forms, classic animated film aesthetics, emotionally expressive character acting, strong silhouette language, playful proportions, exaggerated expressions, hand-crafted animation design sensibility, believable caricature, appealing asymmetry, visual rhythm in shapes, clean stylized construction', category: 'style', subCategory: '5. Estilo Artístico' },
  { id: 'anime', label: 'Anime', prompt: 'modern anime style, vibrant colors, clean linework', category: 'style', subCategory: '5. Estilo Artístico' },
  { id: 'manga', label: 'Mangá', prompt: 'classic manga style, detailed line art, expressive eyes, volume-driven shading', category: 'style', subCategory: '5. Estilo Artístico' },
  { id: 'realista', label: 'Realista', prompt: 'highly realistic illustration, accurate proportions', category: 'style', subCategory: '5. Estilo Artístico' },
  { id: 'minimalista', label: 'Minimalista', prompt: 'minimalist art style, simple shapes and palettes', category: 'style', subCategory: '5. Estilo Artístico' },
  { id: 'ukiyo-e', label: 'Ukiyo-e', prompt: 'japanese woodblock print style, ukiyo-e aesthetics', category: 'style', subCategory: '5. Estilo Artístico' },
  { id: 'sumie', label: 'Sumi-e', prompt: 'traditional japanese sumi-e wash painting, brush strokes', category: 'style', subCategory: '5. Estilo Artístico' },

  // 6. Digital
  { id: 'digital-painting', label: 'Pintura digital', prompt: 'professional digital painting, soft blending', category: 'style', subCategory: '6. Digital' },
  { id: 'flat-color', label: 'Flat Color', prompt: 'flat color illustration, bold clean shapes, minimal cel shading, vector-style artwork, elegant color blocking, simplified geometry, crisp contours, highly readable composition, limited cinematic palette, graphic design aesthetic, modern editorial illustration, polished professional artwork, smooth edges, premium stylized illustration', category: 'style', subCategory: '6. Digital' },
  { id: 'cel-shading', label: 'Cel shading', prompt: 'cel-shaded animation style, flat colors with hard shadows', category: 'style', subCategory: '6. Digital' },
  { id: 'matte-painting', label: 'Pintura matte', prompt: 'epic matte painting, cinematic backdrop style', category: 'style', subCategory: '6. Digital' },
  { id: 'concept-art', label: 'Concept art', prompt: 'production concept art, loose but professional polish', category: 'style', subCategory: '6. Digital' },
  { id: 'cute-stylized-3d', label: '3D Estilizado Fofo', prompt: 'cute stylized 3D character design, soft cozy aesthetic, whimsical proportions, rounded shapes, oversized expressive eyes, fluffy textured hair, soft fabric textures, subtle fuzzy surface detail, cinematic soft lighting, pastel muted colors, charming animated movie style, pixar-inspired stylization, handcrafted feel, highly appealing character design, smooth rendering, adorable expression, clean minimal background, stylized realism, cozy atmosphere', category: 'style', subCategory: '6. Digital' },
  { id: 'pixel-art', label: 'Pixel art', prompt: 'Transform the image into detailed pixel art, authentic retro videogame aesthetic, visible square pixels, limited color palette, crisp pixel edges, handcrafted sprite style, 16-bit era visual, retro arcade graphics, clean dithering, low-resolution appearance, pixel-perfect shading, nostalgic game art style, sharp blocky forms, classic SNES and Sega Genesis inspired artwork, highly detailed pixel composition', category: 'style', subCategory: '6. Digital', image: '/images/styles/Pixel-art.png' },
  { id: '8-bit-pixel-art', label: '8-bit pixel art', prompt: '8-bit pixel art style, ultra limited color palette, chunky square pixels, NES era videogame graphics, simple shading, retro arcade aesthetic, classic old-school game look', category: 'style', subCategory: '6. Digital', image: '/images/styles/8-bits.png' },
  { id: 'semi-realista', label: 'Semi-realista', prompt: 'semi-realistic digital painting, stylized realism, realistic anatomy with artistic simplification, cinematic lighting, painterly textures, modern concept art aesthetic', category: 'style', subCategory: '6. Digital', image: '/images/styles/semi-realista.png' },
  { id: 'low-poly-3d', label: 'Low Poly 3D', prompt: 'low poly 3D art style, simplified geometric shapes, stylized polygonal rendering, clean minimal shading, modern indie game aesthetic', category: 'style', subCategory: '6. Digital', image: '/images/styles/low-poly.png' },
  { id: 'vector-art-modern', label: 'Vector Art Modern', prompt: 'Modern geometric vector illustration style. The technique features clean curved lines, vibrant solid color blocks with smooth gradients inside each geometric shape. The background consists of abstract vertical stripes in contrasting colors. Clean, flat, contemporary digital art inspired by pop cubism and high-saturation minimalist graphic design.', category: 'style', subCategory: '6. Digital', image: '/images/styles/vector-art-modern.png' },

  // 7. Produção / Processo
  { id: 'pencil', label: 'Esboço a lápis', prompt: `pencil sketch illustration, loose graphite lines, hand drawn sketchbook style, visible construction lines, soft graphite texture, light cross-hatching shading, detailed linework, whimsical concept art, children's book illustration style, monochrome pencil drawing, natural proportions, realistic details, rough artistic sketch on white paper, artistic hand-crafted illustration, distinct aesthetic`, category: 'style', subCategory: '7. Produção / Processo' },
  { id: 'rascunho-caotico', label: 'Rascunho Caótico', prompt: `chaotic ultra loose light pencil rascunho, super soft faint pencil with very light pressure, wildly gestural and explosive lines, insanely messy frantic light strokes, tons of visible aggressive but delicate construction lines, raw sketchbook destruction, soft erratic line weight, wild light scribbles and crosshatching, extremely focused on single character only, character reference study, no comic panels, no layout, no extra borders, no text, pure character sketch, high contrast between faint lines and white paper, completely unfinished raw rascunho energy, sketchy madness --stylize 800 --chaos 15 --v 6`, category: 'style', subCategory: '7. Produção / Processo' },
  { id: 'lapis-rascunho-preliminar', label: 'Lápis rascunho preliminar', prompt: `transform the image into an expressive gestural pencil sketch with ultra-minimal loose linework, nervous continuous lines, broken contours, elegant anatomical simplification, abstract observational drawing style, rapid hand-drawn strokes, raw artistic imperfections, spontaneous sketch energy, sparse details, asymmetrical line balance, thin graphite pencil lines on white paper, unfinished forms, overlapping construction lines, modern editorial illustration aesthetic, fashion sketch influence, emotional line rhythm, minimalist composition, subtle distortions, organic hand movement, delicate scribble anatomy, preserve the original pose and composition while converting into ultra loose expressive gestural pencil sketch line art, no rendering, no shading, authentic sketchbook feeling --no clean lines, polished illustration, realistic rendering, cel shading, comic book inking, thick outlines, vector art, smooth anatomy, detailed rendering, crosshatching, digital painting, anime style, 3d render, perfect proportions, glossy finish, airbrush, photorealism, painterly textures, heavy blacks, excessive detail, finished artwork, refined contours, clean silhouettes --stylize 50 --chaos 20`, category: 'style', subCategory: '7. Produção / Processo' },
  { id: 'storyboard', label: 'Storyboard', prompt: 'professional storyboard sketch, sequential art style', category: 'style', subCategory: '7. Produção / Processo' },
  { id: 'cartoon-expressions', label: 'Expressões faciais cartoon', prompt: 'cartoon character expression sheet, multiple facial expressions, animation model sheet, head rotation studies, expressive emotions, classic hand-drawn animation character design, caricature expressions, clean sketch layout', category: 'style', subCategory: '7. Produção / Processo' },
  { id: 'cartoon-acting', label: 'Cartoon character acting', prompt: 'cartoon character acting sheet, multiple dynamic poses, high angle, low angle, front, back, profile, expressive body language, exaggerated cartoon acting, hand drawn animation style', category: 'style', subCategory: '7. Produção / Processo' },

  // 8. Cor e Finalização
  { id: 'tons-cinza', label: 'Tons de cinza', prompt: 'grayscale monochromatic style, varying shades of gray', category: 'style', subCategory: '8. Cor e Finalização' },
  { id: 'alto-contraste', label: 'Alto contraste', prompt: 'high contrast extreme lighting, deep blacks and bright whites', category: 'style', subCategory: '8. Cor e Finalização' },
  { id: 'noir-pb-master', label: 'Noir Preto & Branco (Master)', prompt: 'extreme noir black and white illustration, pure black shadows, heavy black spotting, dramatic chiaroscuro lighting, bold silhouette rendering, graphic ink composition, strong negative space, hard rim lighting, minimal grayscale, white highlights only, sin city aesthetic, frank miller inspired noir, woodcut texture, dry brush ink feeling, high contrast cinematic composition, posterized shadows, ultra graphic novel style, artistic hand-crafted illustration, distinct aesthetic, rough unpolished look, --no color', category: 'style', subCategory: '8. Cor e Finalização' },
  { id: 'noir-pb-extremo', label: 'Noir P&B Extremo / Agressivo', prompt: 'pure black and white only, no gray tones, extreme shadow masses, aggressive chiaroscuro, high contrast noir ink, solid black shapes, cutout shadow aesthetic, threshold black and white effect, artistic hand-crafted illustration, distinct aesthetic, rough unpolished look, --no color', category: 'style', subCategory: '8. Cor e Finalização' },
  { id: 'mazzuchelli', label: 'Mazzuchelli', prompt: 'extreme high contrast pure black and white, forms created exclusively by large solid black masses and bold white negative space, no outlines, no contour lines, no linework, massive block shapes, heavy flat black areas with white carving the details, powerful graphic silhouette style, modern heavy linocut woodblock print, almost no fine details, brutalist graphic approach, sharp edges only from mass contrast, pure black and white only, no midtones, no hatching, no crosshatching --stylize 50-100 --style raw --v 6', category: 'style', subCategory: '8. Cor e Finalização' },
  { id: 'chromakey-verde', label: 'Chromakey verde', prompt: 'isolated on pure chroma key green background, solid bright green backdrop, clean studio green screen, perfectly uniform background color, no gradients, no shadows on background, no objects behind subject, subject centered, professional chroma key setup, easy background removal, ultra clean edges, studio lighting', category: 'style', subCategory: '8. Cor e Finalização', image: '/images/styles/cromakey-verde.png' },
  { id: 'chromakey-azul', label: 'Chromakey azul', prompt: 'isolated on pure chroma key blue background, solid vivid blue backdrop, professional blue screen studio setup, perfectly flat color background, no texture, no shadows, easy masking and background removal, clean silhouette separation', category: 'style', subCategory: '8. Cor e Finalização', image: '/images/styles/cromakey-azul.png' },
  { id: 'fundo-preto-absoluto', label: 'Fundo preto absoluto', prompt: 'isolated on pure black background, absolute black backdrop, studio isolation, no visible environment, cinematic black void, clean separation, high contrast subject lighting', category: 'style', subCategory: '8. Cor e Finalização', image: '/images/styles/fundo-preto-absoluto.png' },
  { id: 'margem-seguranca', label: 'Margem de Segurança', prompt: 'Create a solid white border of medium thickness. The main subject should occupy the central region of the frame in a balanced way, ensuring that there is a noticeable and spacious "breathing room" (negative space) between the drawing and the image boundaries on all four sides.', category: 'style', subCategory: '8. Cor e Finalização', image: '/images/styles/margem-seguranca.png' },
  { id: 'margem-seguranca-grande', label: 'Margem de Segurança Grande', prompt: 'Create a massive, very thick white border. The main subject should be significantly reduced and isolated in the center of the frame. At least half of the total image area should consist strictly of this vast negative white space that surrounds and crushes the central scene, simulating a tiny photograph printed in the center of a giant canvas.', category: 'style', subCategory: '8. Cor e Finalização', image: '/images/styles/margem-seguranca-grande.png' },

  // 9. Fotografia Cinematográfica
  { id: 'anamorfico', label: 'Anamórfico', prompt: 'cinematic anamorphic shot, horizontal lens flares, oval bokeh', category: 'style', subCategory: '9. Fotografia Cinematográfica' },
  { id: 'deep-focus', label: 'Deep Focus', prompt: 'deep focus cinematography, everything from foreground to background in sharp focus', category: 'style', subCategory: '9. Fotografia Cinematográfica' },
  { id: 'tilt-shift', label: 'Tilt-Shift', prompt: 'tilt-shift photography, miniature effect, selective blur', category: 'style', subCategory: '9. Fotografia Cinematográfica' },
  { id: 'bleach-bypass', label: 'Bleach Bypass', prompt: 'bleach bypass film process, high contrast, desaturated colors, grainy', category: 'style', subCategory: '9. Fotografia Cinematográfica' },
  { id: 'technicolor', label: 'Technicolor', prompt: 'vibrant technicolor film style, saturated 3-strip color process', category: 'style', subCategory: '9. Fotografia Cinematográfica' },
  { id: 'day-for-night', label: 'Day for Night', prompt: 'day for night cinematography, simulated nighttime, blue tint, high contrast', category: 'style', subCategory: '9. Fotografia Cinematográfica' },
  { id: 'scanlines', label: 'Scanlines', prompt: 'authentic horizontal scanlines texture overlay applied directly to the entire image, fullscreen scanline effect, subtle phosphor glow, RGB subpixel separation, analog screen texture, soft bloom, slight chromatic aberration, dark scan gaps, electronic signal texture, realistic pixel diffusion, low contrast glow, detailed raster lines, cinematic retro screen effect, organic analog screen imperfections, close-up screen capture --no physical TV frame bezel casing border television background furniture', category: 'style', subCategory: '9. Fotografia Cinematográfica', image: '/images/styles/scanlines.png' },
  
  // 10. Técnicas de Gravura
  { id: 'xilogravura', label: 'Xilogravura', prompt: `The artwork should resemble traditional woodcut and linocut printmaking, with highly detailed engraved lines, swirling bark textures, dramatic black shadows, and white etched highlights. The composition should feel like an ancient folklore illustration, handcrafted and organic, with dense hatching and expressive carving marks., artistic hand-crafted illustration, distinct aesthetic`, category: 'style', subCategory: '10. Técnicas de Gravura' },
  
  // 11. Estilos de Traço
  { id: 'caricatura-nanquim', label: 'Caricatura em Nanquim', prompt: `transform the uploaded portrait into a retro caricature editorial cartoon, with exaggerated head shapes, simplified facial structure, asymmetrical design, elongated neck and nose shapes, loose hand-inked linework, playful anatomical distortion, expressive caricature drawing, modern mid-century cartoon aesthetics, rough but confident pen strokes, graphic silhouette-based character design, preserve the exact pose and composition from the original photo, black ink only, white background, single illustration only`, category: 'style', subCategory: '11. Estilos de Traço' },
  { id: 'cartoon-linha-grossa', label: 'Cartoon de Linha Grossa', prompt: `drawn in a minimalist cartoon style with bold black linework on a white background. The illustration should feature exaggerated facial expressions and unique shapes, resembling stylized caricatures. The style is graphic, bold, and expressive, focusing on contrast and simplicity, conveying diverse personalities and emotions.`, category: 'style', subCategory: '11. Estilos de Traço' },
  { id: 'linhas-angulares-fortes', label: 'Linhas Angulares Fortes', prompt: `bold black and white graphic line art, extremely thick and confident ink outlines with strong varying line weight, high contrast, clean vector style, minimal shading only with solid black areas and light stippling, exaggerated stylized proportions, angular geometric shapes combined with organic flow, sharp silhouettes, powerful graphic quality, edgy cartoon illustration, strong personality in every line, reminiscent of alternative comic book art and 2000s character design sheets, no soft shading, no gradients, flat black and white --stylize 180 --v 6 --style raw`, category: 'style', subCategory: '11. Estilos de Traço' },
  { id: 'cartoon-minimalista', label: 'Cartoon minimalista', prompt: 'minimalist cartoon style, bold black line art, simple geometric shapes, clean vector illustration, thick outlines, high contrast, simplified features, modern graphic design style, flat 2D, no shading, no grayscale, white background, stroke-based illustration, abstract cartoon --ar 1:1 --style raw', category: 'style', subCategory: '11. Estilos de Traço' },
  { id: 'cartoon-traco-variado', label: 'Cartoon traço variado', prompt: 'loose cartoon style, expressive cartoon style, varying line weights, hand-drawn quality, organic and dynamic strokes, bold outlines with thickness variation, sketchy elements, loose linework, imperfect hand-drawn aesthetic, mixed line styles, artistic gesture drawing, energetic marks, black ink on white, high contrast, simplified shapes with character, playful illustration --ar 1:1 --style raw', category: 'style', subCategory: '11. Estilos de Traço' },
  { id: 'timm-90', label: 'Timm 90', prompt: 'Clean and smooth black line art illustration, 1990s animated series style inspired by Bruce Timm. Fluid, continuous curvilinear strokes, avoiding sharp corners or harsh angles. Minimalist design with bold, pure black ink lines on a solid white background. No pencil sketches, no construction lines, no rough drafts or graphite marks. Only elegant contours, simplified iconic shapes, high-contrast black and white.', category: 'style', subCategory: '11. Estilos de Traço', image: '/images/styles/timm-90.png' },

  // 12. Colagem e Técnicas Mistas
  { id: 'colagem', label: 'Colagem', prompt: 'Masterpiece mixed media collage portrait exactly matching the artistic style of the reference, face meticulously assembled from torn paper fragments, vintage newspaper text, fabric swatches, blue denim pieces, floral illustrations, old maps and layered ephemera, real pressed flowers blooming from the composition, visible rough paper edges, overlapping layers, texture and physical depth, decoupage and collage technique, delicate yet bold composition, sophisticated color harmony, artistic paper texture, high detail --stylize 650 --v 6 --q 2', category: 'style', subCategory: '12. Colagem e Técnicas Mistas' },
  { id: 'arte-poligonal', label: 'Arte Poligonal / Facetada', prompt: 'Vibrant geometric fragmentation portrait, polygonal facet art, sharp triangular planes, stained glass effect, highly saturated colors, bold contrasting palette, modern digital cubism, intricate geometric mosaic on face and clothing, crystalline facets, dramatic lighting, masterpiece --stylize 600 --v 6', category: 'style', subCategory: '12. Colagem e Técnicas Mistas' },
  { id: 'vitral', label: 'Vitral', prompt: 'Stained glass portrait, bold black lead lines separating vibrant color blocks, modern digital vitrail style, stylized female face, flowing colorful hair, flat color fields with high saturation, artistic abstraction, strong outlines, contemporary stained glass art, masterpiece, vibrant palette --stylize 650 --v 6', category: 'style', subCategory: '12. Colagem e Técnicas Mistas' },

  // 13. Efeitos de Elementos e Materiais
  { id: 'congelando', label: 'Congelando', prompt: 'Ultra realistic smooth translucent ice sculpture made of premium clear frozen crystal glass, very soft and elegant rounded contours, minimal surface imperfections, beautiful light refraction with gentle caustics, smooth glossy surface with subtle melting details, soft thickness and depth, almost no cracks, delicate air bubbles, soft diffused studio lighting, pure white seamless background, centered elegant composition, photorealistic smooth ice texture, masterpiece, 8k --stylize 120 --v 6 --style raw', category: 'style', subCategory: '13. Efeitos de Elementos e Materiais' },
  { id: 'pegando-fogo', label: 'Pegando Fogo', prompt: 'Photorealistic fiery made of burning flames, intense realistic fire texture, vibrant orange and yellow flames with dynamic movement, glowing incandescent core, flying sparks and embers, turbulent flame details, volumetric god rays of fire, dramatic black background, high contrast, cinematic lighting, majestic fire typography, ultra detailed flames, masterpiece, 8k --stylize 220 --v 6 --style raw', category: 'style', subCategory: '13. Efeitos de Elementos e Materiais' },
  { id: 'pelo-universal', label: 'Pelo universal', prompt: 'fully covered in realistic fur, dense soft fibers, detailed hair strands, natural fur flow following the surface shape, volumetric fluffy texture, ultra detailed grooming, subtle color variation, soft ambient lighting, cinematic shadows, tactile texture, hyper realistic material rendering, high depth, macro fur detail, photorealistic, studio quality', category: 'style', subCategory: '13. Efeitos de Elementos e Materiais' },
  { id: 'tipografia-pelo', label: 'Tipografia em pelo', prompt: '3D typography letters fully covered in dense realistic fur, soft fluffy fibers, detailed hair strands, natural fur direction following the letter shapes, volumetric texture, subtle color variation, tactile surface, cinematic lighting, hyper realistic fur rendering, macro detail, soft shadows, studio photography, ultra detailed', category: 'style', subCategory: '13. Efeitos de Elementos e Materiais' },
  { id: 'massinha-modelar', label: 'Massinha de modelar', prompt: 'made of colorful soft plasticine clay, charming handcrafted look, smooth rounded shapes, visible handmade imperfections, stop motion style, cute expressive forms, soft cinematic lighting, cozy atmosphere, detailed clay texture', category: 'style', subCategory: '13. Efeitos de Elementos e Materiais' },
  { id: 'tipografia-massinha', label: 'Tipografia em massinha', prompt: '3D typography letters made of colorful soft plasticine clay, charming handcrafted look, smooth rounded shapes, visible handmade imperfections, stop motion style, cute expressive forms, soft cinematic lighting, cozy atmosphere, detailed clay texture', category: 'style', subCategory: '13. Efeitos de Elementos e Materiais' },
  { id: 'ima', label: 'Imã', prompt: 'preserving the exact recognizable silhouette, anatomy, structure and proportions, complete material transformation, no original surface visible, seamless construction, highly detailed texture repetition, tactile realism, cinematic lighting, ultra detailed, visually coherent design', category: 'style', subCategory: '13. Efeitos de Elementos e Materiais' },
  { id: 'ferrugem', label: 'Ferrugem', prompt: 'constructed from heavily rusted iron and oxidized steel, deeply corroded metallic surfaces, layered rust buildup, weathered industrial decay, realistic erosion patterns, rough oxidized texture, dark aged metal mixed with orange corrosion stains, cinematic shadows, dramatic atmospheric lighting, tactile realism, ultra detailed photorealistic rendering', category: 'style', subCategory: '13. Efeitos de Elementos e Materiais' },
  { id: 'ferrugem-extremo', label: 'Ferrugem extremo', prompt: 'entirely made of ancient rusted iron, severe oxidation and corrosion consuming the entire structure, cracked metal plates, peeling rust layers, decayed industrial texture, abandoned post-apocalyptic aesthetic, gritty weathered surfaces, realistic rust particles, dark cinematic atmosphere, ultra detailed tactile metal rendering', category: 'style', subCategory: '13. Efeitos de Elementos e Materiais' },
  { id: 'cromado', label: 'Cromado', prompt: 'entirely formed from polished mirrored chrome, ultra reflective metallic surfaces shaping the complete structure, liquid-like mirror reflections, smooth high-gloss metal finish, flawless chrome material, preserving the recognizable silhouette and proportions, reflective environment mapping, cinematic studio lighting, sharp specular highlights, futuristic industrial aesthetic, tactile metallic realism, ultra detailed photorealistic rendering', category: 'style', subCategory: '13. Efeitos de Elementos e Materiais' },
  { id: 'lego', label: 'LEGO', prompt: 'Transform the image into a realistic LEGO-style scene, entirely constructed from authentic LEGO bricks and pieces, visible studs on every block, plastic toy material, modular brick construction, realistic interlocking pieces, LEGO minifigure aesthetic, detailed brick-built textures, vibrant toy colors, cinematic lighting, realistic plastic reflections, handcrafted LEGO assembly look, highly detailed toy photography style, seamless brick integration, professional stop-motion movie aesthetic', category: 'style', subCategory: '13. Efeitos de Elementos e Materiais', image: '/images/styles/lego.png' },
  { id: 'clay-render', label: 'Clay Render', prompt: 'clay style 3D render, handcrafted clay appearance, soft matte textures, stop motion aesthetic, tactile sculpted look', category: 'style', subCategory: '13. Efeitos de Elementos e Materiais', image: '/images/styles/clay-render.png' },
  { id: 'steampunk', label: 'Steampunk', prompt: 'A highly detailed steampunk-style representation entirely reimagined with a retrofuturistic Victorian industrial aesthetic, adorned with intricate polished bronze gear systems, gleaming copper piping, exposed metal rivets, and varnished mahogany wood panels. Mechanical clockwork elements and vacuum tubes glowing with a warm amber light are seamlessly integrated into the design. Subtle vapor and industrial mist gently escape from the mechanical joints. Dramatic chiaroscuro lighting, with rays of light cutting through the atmosphere and revealing dust particles in the air. Color palette dominated by shades of bronze, aged gold, dark brown leather, and graphite gray, contrasting with the amber glow of the interior lights. Captured on a 35mm lens with an f/1.8 aperture, creating a shallow depth of field that highlights the ultra-detailed tactile textures of the metallic surfaces and polished metal. Cinematic atmosphere.', category: 'style', subCategory: '13. Efeitos de Elementos e Materiais', image: '/images/styles/steampunk.png' },
  { id: 'ponto-e-cruz', label: 'Ponto e Cruz', prompt: 'photorealistic image strictly using the cross-stitch embroidery technique. This is a handcrafted textile art in hyper-realistic cross-stitch. The image must be constructed on a thick checkered cotton fabric (such as Aida cloth). The entire composition must be made of small, thick individual stitches in an exact "X" shape, using vibrant cotton floss threads. Photograph with a macro lens, focusing sharply on the center of the composition. Apply directional studio lighting to highlight the shadows cast by each "X" of the thread on the porosity and small holes of the base fabric, giving it physical three-dimensional depth. Do not use ink textures, continuous lines, digital flat surfaces, or organic photorealism (such as real skin and hair). Absolutely 100% of the visualized image must be composed of the pattern of cross-stitch blocks ("X") piercing the weave of the fabric.', category: 'style', subCategory: '13. Efeitos de Elementos e Materiais', image: '/images/styles/ponto-e-cruz.png' },
  { id: 'fibra-de-la', label: 'Fibra de Lã', prompt: 'Tactile 3D high-relief fiber art, crewel embroidery and yarn painting technique. Thick, textured woolen threads and continuous directional stitching define shapes and volumes through vibrant color blocking. Dense, handcrafted punch needle textile texture, with heavily textured interlocking yarn strands in a highly detailed pattern.', category: 'style', subCategory: '13. Efeitos de Elementos e Materiais', image: '/images/styles/fibra-de-la.png' },

  // 14. Origami e Papercraft
  { id: 'origami', label: 'Origami', prompt: 'Transform the image into realistic origami paper art, entirely folded from paper, visible paper creases and fold lines, geometric folded structure, handcrafted origami aesthetic, layered paper folds, realistic paper texture, delicate shadows between folds, precise angular construction, japanese origami style, paper sculpture appearance, clean folded edges, minimalistic handmade design, elegant papercraft composition, highly detailed folded paper realism, paper fibers visible, realistic fold tension, layered paper thickness, subtle paper imperfections', category: 'style', subCategory: '14. Origami e Papercraft' },
  { id: 'origami-ultra-realista', label: 'Origami Ultra Realista', prompt: 'ultra realistic origami sculpture, intricate folded paper geometry, visible paper fibers, complex fold patterns, handcrafted japanese paper art, studio lighting, macro papercraft photography, paper fibers visible, realistic fold tension, layered paper thickness, subtle paper imperfections', category: 'style', subCategory: '14. Origami e Papercraft' },
  { id: 'origami-minimalista', label: 'Origami Minimalista', prompt: 'minimalist origami style, simple folded paper shapes, clean geometric folds, elegant japanese paper craft aesthetic, soft lighting, modern minimal design, paper fibers visible, realistic fold tension, layered paper thickness, subtle paper imperfections', category: 'style', subCategory: '14. Origami e Papercraft' },
  { id: 'origami-colorido', label: 'Origami Colorido', prompt: 'vibrant colorful origami artwork, folded colored paper, layered papercraft textures, playful japanese origami composition, detailed folds and creases, paper fibers visible, realistic fold tension, layered paper thickness, subtle paper imperfections', category: 'style', subCategory: '14. Origami e Papercraft' },
  { id: 'origami-branco-elegante', label: 'Origami Branco Elegante', prompt: 'white paper origami sculpture, monochromatic folded paper art, elegant geometric folds, luxury papercraft aesthetic, soft studio shadows, paper fibers visible, realistic fold tension, layered paper thickness, subtle paper imperfections', category: 'style', subCategory: '14. Origami e Papercraft' },
  { id: 'origami-low-poly', label: 'Origami Low Poly', prompt: 'origami low poly fusion style, polygonal folded paper construction, sharp geometric edges, stylized paper sculpture aesthetic, paper fibers visible, realistic fold tension, layered paper thickness, subtle paper imperfections', category: 'style', subCategory: '14. Origami e Papercraft' },
  { id: 'craft-art-japan', label: 'Craft Art Japan', prompt: 'style of textured papercraft sculpture with sharp geometric creases and origami-inspired folds, matte cardstock paper texture showing fine grain, soft studio lighting with delicate 3D shadows, shallow depth of field, minimalist clean background.', category: 'style', subCategory: '14. Origami e Papercraft', image: '/images/styles/craft-art-japan.png' },
];

export const DETAILS: Option[] = [
  // 1. Efeitos Ópticos
  { id: 'shallow-dof', label: 'Desfoque de Fundo (Shallow DoF)', prompt: 'shallow depth of field, blurred background, beautiful cinematic bokeh', category: 'detail', subCategory: '1. Efeitos Ópticos' },
  { id: 'deep-dof', label: 'Foco Profundo (Deep DoF)', prompt: 'deep depth of field, sharp focus foreground to background', category: 'detail', subCategory: '1. Efeitos Ópticos' },
  { id: 'anamorphic-flare', label: 'Anamorphic Lens Flare (Azul)', prompt: 'horizontal blue lens flares, anamorphic light streak', category: 'detail', subCategory: '1. Efeitos Ópticos' },
  { id: 'cinematic-flare', label: 'Cinematic Lens Flare (Natural)', prompt: 'cinematic light leaks, natural sun flare, organic lens flare', category: 'detail', subCategory: '1. Efeitos Ópticos' },
  { id: 'circular-bokeh', label: 'Bokeh Circular (Padrão)', prompt: 'circular bokeh lights, round out-of-focus highlights', category: 'detail', subCategory: '1. Efeitos Ópticos' },
  { id: 'oval-bokeh', label: 'Bokeh Oval (Anamórfico)', prompt: 'oval anamorphic bokeh, elliptical bokeh shapes', category: 'detail', subCategory: '1. Efeitos Ópticos' },
  { id: 'chromatic-aberration', label: 'Aberração Cromática', prompt: 'subtle chromatic aberration, red-cyan color fringing, lo-fi lens effect', category: 'detail', subCategory: '1. Efeitos Ópticos' },
  { id: 'soft-focus', label: 'Foco Suave (Soft Focus)', prompt: 'soft focus effect, dreamy hazy glow, diffused skin tones', category: 'detail', subCategory: '1. Efeitos Ópticos' },
  { id: 'bloom', label: 'Bloom Effect (Brilho Intenso)', prompt: 'blooming highlights, glowing light sources, ethereal glow', category: 'detail', subCategory: '1. Efeitos Ópticos' },
  { id: 'halation', label: 'Halation (Analógico)', prompt: 'film halation, red glow around high-contrast edges, cinematic analog look', category: 'detail', subCategory: '1. Efeitos Ópticos' },
  { id: 'motion-blur', label: 'Motion Blur (Movimento)', prompt: 'motion blur, dynamic action streaking, shutter speed blur', category: 'detail', subCategory: '1. Efeitos Ópticos' },
  { id: 'glow-effect', label: 'Brilho Suave (Glow)', prompt: 'dreamy soft glow, glowing halation, luminous overlay', category: 'detail', subCategory: '1. Efeitos Ópticos' },
  { id: 'light-leak', label: 'Vazamento de Luz (Light Leak)', prompt: 'analogue light leak, vintage film burn, warm color leak', category: 'detail', subCategory: '1. Efeitos Ópticos' },
  { id: 'caustics', label: 'Cáusticas (Caustics)', prompt: 'underwater light caustics, water surface reflections, light refraction', category: 'detail', subCategory: '1. Efeitos Ópticos' },
  { id: 'dust-rays', label: 'Poeira na Luz (Dust Rays)', prompt: 'volumetric dust particles in light shafts, floating dust in sun rays', category: 'detail', subCategory: '1. Efeitos Ópticos' },

  // 2. Nível de Detalhe
  { id: 'rough', label: 'Rough (Bruto)', prompt: 'rough unpolished look', category: 'detail', subCategory: '2. Nível de Detalhe' },
  { id: 'detailed', label: 'Altamente Detalhado', prompt: 'highly detailed, intricate textures', category: 'detail', subCategory: '2. Nível de Detalhe' },
  { id: 'anatomy', label: 'Anatomia Perfeita', prompt: 'perfect anatomy, clear fingers, anatomically correct hands, well-defined limbs', category: 'detail', subCategory: '2. Nível de Detalhe' },
  { id: 'minimalist', label: 'Minimalista', prompt: 'minimalist composition, clean simple details', category: 'detail', subCategory: '2. Nível de Detalhe' },

  // 3. Densidade do Ambiente
  { id: 'lived-in', label: 'Ambiente Habitado (Lived-in)', prompt: 'lived-in cluttered environment, realistic details of occupancy, personal items scattered', category: 'detail', subCategory: '3. Densidade do Ambiente' },
  { id: 'cluttered', label: 'Ambiente Acumulado (Cluttered)', prompt: 'cluttered environment, packed with objects, dense composition, visual noise', category: 'detail', subCategory: '3. Densidade do Ambiente' },
  { id: 'minimalist-env', label: 'Densidade Mínima (Minimalist)', prompt: 'minimalist layout, clean empty space, negative space focus', category: 'detail', subCategory: '3. Densidade do Ambiente' },
  { id: 'ultra-detailed', label: 'Detalhamento Máximo', prompt: 'ultra detailed, intricate background elements, microscopic textures', category: 'detail', subCategory: '3. Densidade do Ambiente' },
];

export const PRESETS = [
  { 
    name: 'Cena de Terror', 
    selections: { 
      framing: 'ots', 
      angle: 'low', 
      perspective: 'dynamic',
      aspect: '2:3',
      lens: '24mm', 
      lighting: 'low-key', 
      environment: 'fog', 
      style: ['realista', 'alto-contraste'], 
      detail: 'detailed' 
    } 
  },
  { 
    name: 'Cena Romântica', 
    selections: { 
      framing: 'close-up', 
      angle: 'eye-level', 
      perspective: 'normal',
      aspect: '16:9',
      lens: '85mm', 
      lighting: 'soft', 
      environment: 'sunset', 
      style: ['oleo'], 
      detail: 'detailed' 
    } 
  },
  { 
    name: 'Cena Noir', 
    selections: { 
      framing: 'medium', 
      angle: 'dutch', 
      perspective: 'dynamic',
      aspect: '2:3',
      lens: '35mm', 
      lighting: 'hard', 
      environment: 'urban', 
      style: ['tons-cinza', 'realista'], 
      detail: 'detailed' 
    } 
  },
  { 
    name: 'Cena Épica', 
    selections: { 
      framing: 'wide', 
      angle: 'low', 
      perspective: 'foreshortening',
      aspect: '21:9',
      lens: '24mm', 
      lighting: 'rim', 
      environment: 'medieval', 
      style: ['realista'], 
      detail: 'detailed' 
    } 
  },
];

export const AUTO_COMBINATIONS: Record<string, Partial<Record<string, any>>> = {
  'anime': {
    'style': { '5. Estilo Artístico': 'anime', '6. Digital': 'cel-shading' },
    'lens': '35mm',
    'lighting': 'vibrant'
  },
  'manga': {
    'style': { 
      '5. Estilo Artístico': 'manga',
      '4. Técnicas de Sombreamento (HQ)': 'screentone',
      '8. Cor e Finalização': 'tons-cinza'
    },
    'lens': '35mm',
    'lighting': 'high-contrast'
  },
  'realista': {
    'style': { '5. Estilo Artístico': 'realista' },
    'lighting': 'soft',
    'lens': '50mm',
    'detail': 'hyper-realistic'
  },
  'cartoon': {
    'style': { '5. Estilo Artístico': 'cartoon' },
    'lighting': 'vibrant',
    'perspective': 'dynamic'
  },
  'comic-fun': {
    'style': { '5. Estilo Artístico': 'comic-fun' },
    'lighting': 'high-key',
    'perspective': 'dynamic'
  },
  'cartoon-expressions': {
    'style': { '7. Produção / Processo': 'cartoon-expressions' },
    'lighting': 'high-key',
    'perspective': 'normal'
  },
  'cartoon-acting': {
    'style': { '7. Produção / Processo': 'cartoon-acting' },
    'lighting': 'high-key',
    'perspective': 'dynamic',
    'framing': 'full'
  },
  'ukiyo-e': {
    'style': { '5. Estilo Artístico': 'ukiyo-e' },
    'lighting': 'flat',
    'environment': 'nature'
  },
  'aquarela': {
    'style': { '1. Pintura Tradicional': 'aquarela' },
    'lighting': 'soft',
    'environment': 'nature'
  },
  'oleo': {
    'style': { '1. Pintura Tradicional': 'oleo' },
    'lighting': 'dramatic',
    'detail': 'textured'
  },
  'grafite': {
    'style': { '2. Desenho Tradicional': 'grafite', '8. Cor e Finalização': 'tons-cinza' },
    'lighting': 'soft',
    'detail': 'detailed'
  },
  'nanquim': {
    'style': { '3. Tinta e Line Art': 'nanquim', '8. Cor e Finalização': 'tons-cinza' },
    'lighting': 'high-contrast',
    'detail': 'clean-lines'
  },
  'carvao': {
    'style': { '2. Desenho Tradicional': 'carvao', '8. Cor e Finalização': 'tons-cinza' },
    'lighting': 'dramatic'
  },
  'tons-cinza': {
    'lighting': 'dramatic',
    'style': { '8. Cor e Finalização': 'tons-cinza' }
  },
  'cyberpunk': {
    'lighting': 'neon',
    'style': { '6. Digital': 'digital-painting' },
    'environment': 'urban'
  },
  'noir': {
    'style': { '8. Cor e Finalização': 'tons-cinza', '4. Técnicas de Sombreamento (HQ)': 'hachura' },
    'lighting': 'dramatic',
    'environment': 'urban'
  },
  'anamorfico': {
    'style': { '9. Fotografia Cinematográfica': 'anamorfico' },
    'aspect': '21:9',
    'lens': '35mm'
  },
  'tilt-shift': {
    'style': { '9. Fotografia Cinematográfica': 'tilt-shift' },
    'framing': 'wide'
  },
  'technicolor': {
    'style': { '9. Fotografia Cinematográfica': 'technicolor' },
    'lighting': 'high-key'
  }
};

export const COLOR_PALETTES: ColorPaletteOption[] = [
  {
    id: 'terror-psicologico',
    name: 'Terror Psicológico',
    colors: ['#4a5340', '#3c4f5e', '#2b2d2f', '#7d1c1c', '#111213'],
    description: 'Insanidade, desconforto, paranoia e claustrofobia. Tons de verde doente, azul dessaturado, cinza úmido e vermelho escuro.'
  },
  {
    id: 'slasher',
    name: 'Slasher (Terror Sangrento)',
    colors: ['#08090a', '#9e0a0a', '#111e38', '#eef1f6', '#3a3f47'],
    description: 'Violência, perseguição e medo imediato. Preto profundo, vermelho sangue, azul noturno e branco frio.'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    colors: ['#ff007f', '#00f5d4', '#7b2cbf', '#007aff', '#0c0c0e'],
    description: 'Tecnologia, decadência urbana e futurismo. Tons de magenta neon, ciano, roxo elétrico e preto molhado.'
  },
  {
    id: 'space-opera',
    name: 'Space Opera (Ficção Científica)',
    colors: ['#0f172a', '#d4af37', '#f8fafc', '#020617', '#4c1d95'],
    description: 'Grandiosidade, aventura e exploração espacial. Azul profundo, dourado, branco estelar e roxo nebulosa.'
  },
  {
    id: 'dark-fantasy',
    name: 'Dark Fantasy (Fantasia Sombria)',
    colors: ['#3f4a3c', '#5c4033', '#1a1a1a', '#b89047', '#8b3a3a'],
    description: 'Magia proibida e decadência medieval. Verde musgo, marrom antigo, preto carvão e ouro envelhecido.'
  },
  {
    id: 'high-fantasy',
    name: 'High Fantasy (Fantasia Clássica)',
    colors: ['#4169e1', '#ffffff', '#ffd700', '#228b22', '#87ceeb'],
    description: 'Heroísmo, esperança e magia clássica. Azul royal, branco luminoso, dourado e verde natureza.'
  },
  {
    id: 'neo-noir',
    name: 'Neo-Noir',
    colors: ['#0f0f10', '#1a365d', '#2d124d', '#ff003c', '#d53f8c'],
    description: 'Mistério, corrupção e solidão urbana. Preto, azul petróleo, roxo escuro e neon vermelho.'
  },
  {
    id: 'noir-classico',
    name: 'Noir Clássico',
    colors: ['#000000', '#ffffff', '#8e8e93', '#3a3a3c', '#1c1c1e'],
    description: 'Investigação, fatalismo e tensão clássica. Escala pura de preto, cinza fumaça, cinza escuro e branco.'
  },
  {
    id: 'romance-nostalgico',
    name: 'Romance Nostálgico',
    colors: ['#c88b90', '#e8d8c8', '#e5c158', '#f08080', '#4e3629'],
    description: 'Carinho, memória e calor emocional. Rosa antigo, bege, dourado suave e laranja sunset.'
  },
  {
    id: 'militar-tatico',
    name: 'Militar Tático',
    colors: ['#556b2f', '#708090', '#1a1a1a', '#ff4500', '#d2b48c'],
    description: 'Combate, estratégia, camuflagem e tensão. Verde oliva, cinza metálico, preto e laranja explosão.'
  },
  {
    id: 'cartoon-moderno',
    name: 'Cartoon Moderno',
    colors: ['#ff3b30', '#34c759', '#007aff', '#ffcc00', '#af52de'],
    description: 'Diversão, energia e dinamismo. Cores primárias altamente vibrantes com contraste forte.'
  },
  {
    id: 'drama-melancolia',
    name: 'Drama & Melancolia',
    colors: ['#4f5d75', '#a4b0be', '#747d8c', '#2f3542', '#eccc68'],
    description: 'Sentimentos profundos, solidão e reflexão. Tons azuis frios desbotados, cinza pérola e bege pálido.'
  },
  {
    id: 'medo-tensao',
    name: 'Medo & Tensão',
    colors: ['#57606f', '#2f3542', '#1e272e', '#485460', '#d2d2d2'],
    description: 'Clima de suspense e apreensão. Amarelos esverdeados doentes, verde pântano e preto asfalto.'
  },
  {
    id: 'aventura-exploracao',
    name: 'Aventura & Exploração',
    colors: ['#20bf6b', '#0984e3', '#fa8231', '#f7b731', '#ffffff'],
    description: 'Jornadas épicas e otimismo. Verde floresta brilhante, azul oceano, laranja ensolarado e ocre areia.'
  },
  {
    id: 'coragem-heroismo',
    name: 'Coragem & Heroísmo',
    colors: ['#eb3b5a', '#f7b731', '#3867d6', '#ffffff', '#a55eea'],
    description: 'Atos valentes e de grande impacto. Vermelho escarlate heroico, ouro cintilante e azul marinho profundo.'
  },
  {
    id: 'verao-tropical',
    name: 'Verão Tropical',
    colors: ['#fed330', '#2bcbba', '#fd9644', '#26de81', '#fc5c65'],
    description: 'Calor, festividade e vivacidade. Amarelo sol, azul turquesa, coral quente e verde limão.'
  },
  {
    id: 'inverno-congelante',
    name: 'Inverno Congelante',
    colors: ['#45aaf2', '#a55eea', '#ffffff', '#d1d8e0', '#778ca3'],
    description: 'Friagem, solidão e paz. Azul gelo profundo, ciano claro, branco neve e cinza ártico.'
  },
  {
    id: 'primavera-florada',
    name: 'Primavera Florada',
    colors: ['#fd79a8', '#55efc4', '#a29bfe', '#ffeaa7', '#fab1a0'],
    description: 'Renascimento, leveza e romance. Rosa flor de cerejeira, verde broto, lavanda e pêssego.'
  },
  {
    id: 'psicodelico-synth',
    name: 'Psicodélico Synth',
    colors: ['#6c5ce7', '#00cec9', '#e84393', '#fdcb6e', '#ffeaa7'],
    description: 'Viagem alucinógena, sonhos e psicodelia. Roxo ultravioleta, verde ácido, rosa neon e amarelo elétrico.'
  },
  {
    id: 'neon-decay',
    name: 'Neon Decay (Profissional)',
    colors: ['#00f5d4', '#7b2cbf', '#ff007f', '#240046', '#adff2f'],
    description: 'Futurismo decadente e tóxico. Ciano esverdeado neon, magenta queimado, roxo tóxico e verde ácido.'
  },
  {
    id: 'sacred-dawn',
    name: 'Sacred Dawn (Profissional)',
    colors: ['#ffe5ec', '#ffb3c6', '#ff85a1', '#f72585', '#7209b7'],
    description: 'Alvorecer sagrado, místico e espiritual. Dourado celestial, rosa amanhecer, azul etéreo e violeta.'
  },
  {
    id: 'toxic-hospital',
    name: 'Toxic Hospital (Profissional)',
    colors: ['#a8dadc', '#457b9d', '#1d3557', '#e63946', '#f1faee'],
    description: 'Atmosfera hospitalar doente e fria. Verde hospitalar asséptico, azul cirúrgico e vermelho sangue coagulado.'
  },
  {
    id: 'crimson-hunt',
    name: 'Crimson Hunt (Profissional)',
    colors: ['#641e16', '#a93226', '#1a5276', '#f4f6f7', '#17202a'],
    description: 'Caçada implacável e vampirismo. Vermelhos intensos, tons de pele pálida e pretos profundos.'
  },
  {
    id: 'industrial-rain',
    name: 'Industrial Rain (Profissional)',
    colors: ['#4b5563', '#b45309', '#1e3a8a', '#eab308', '#111827'],
    description: 'Metal pesado, poeira e chuva ácida. Cinzas de concreto, marrom ferrugem, azul tempestade e amarelo alerta.'
  },
  {
    id: 'rusted-empire',
    name: 'Rusted Empire (Profissional)',
    colors: ['#854d0e', '#b45309', '#14532d', '#991b1b', '#fef08a'],
    description: 'Impérios antigos esquecidos. Dourado envelhecido, marrom ferrugem, cobre esverdeado e vermelho imperial gasto.'
  }
];

export const VISUAL_TAGS: VisualTag[] = [
  {
    id: 'epico',
    label: 'Épico',
    icon: '⚡',
    description: 'Ângulo baixo e iluminação de contorno para impacto dramático.',
    selections: {
      framing: 'hero-shot',
      angle: 'low',
      lighting: 'rim',
      perspective: 'dynamic'
    }
  },
  {
    id: 'intimo',
    label: 'Íntimo',
    icon: '❤️',
    description: 'Close-up suave com lente de retrato para focar na emoção.',
    selections: {
      framing: 'close-up',
      angle: 'eye-level',
      lighting: 'soft',
      lens: '85mm'
    }
  },
  {
    id: 'dramatico',
    label: 'Dramático',
    icon: '🎭',
    description: 'Silhueta e iluminação de alto contraste para máxima tensão.',
    selections: {
      framing: 'silhouette-shot',
      angle: 'high',
      lighting: 'low-key'
    }
  },
  {
    id: 'claustrofobico',
    label: 'Claustrofóbico',
    icon: '🕸️',
    description: 'Plano super detalhe, ângulo holandês e iluminação sombria.',
    selections: {
      framing: 'ecu',
      angle: 'dutch',
      lighting: 'low-key',
      lens: '24mm'
    }
  },
  {
    id: 'heroico',
    label: 'Heroico',
    icon: '🛡️',
    description: 'Enquadramento heroico clássico com ângulo baixo.',
    selections: {
      framing: 'hero-shot',
      angle: 'low',
      perspective: 'foreshortening',
      lighting: 'rim'
    }
  },
  {
    id: 'cinematico',
    label: 'Cinematográfico',
    icon: '🎬',
    description: 'Estabelecimento amplo com proporção ultrawide e contraluz.',
    selections: {
      framing: 'establishing-shot',
      lens: '35mm',
      aspect: '21:9',
      lighting: 'backlight'
    }
  },
  {
    id: 'anime',
    label: 'Anime/Mangá',
    icon: '🌸',
    description: 'Perspectiva exagerada e ação com traço marcante.',
    selections: {
      framing: 'speed-perspective',
      lens: '35mm'
    }
  },
  {
    id: 'noir',
    label: 'Noir',
    icon: '🕶️',
    description: 'Preto e branco, sombras marcantes e silhueta dramática.',
    selections: {
      framing: 'silhouette-shot',
      lighting: 'hard',
      environment: 'urban'
    }
  },
  {
    id: 'turnaround-tag',
    label: 'Turnaround 3D/2D',
    icon: '🔄',
    description: 'Configura o app para criar uma folha de modelo de personagem em múltiplos ângulos.',
    selections: {
      angle: 'turnaround',
      perspective: 'orthographic',
      lighting: 'studio',
      framing: 'full'
    }
  },
  {
    id: 'expressions-tag',
    label: 'Folha de Expressões',
    icon: '😊',
    description: 'Configura o app para criar uma folha de rostos com múltiplos sentimentos e expressões.',
    selections: {
      angle: 'front-view',
      framing: 'close-up',
      lighting: 'studio',
      style: ['cartoon-expressions']
    }
  },
  {
    id: 'poses-tag',
    label: 'Folha de Poses',
    icon: '🤸',
    description: 'Configura o app para criar uma folha com múltiplas poses de ação e gestos do personagem.',
    selections: {
      angle: 'eye-level',
      framing: 'full',
      lighting: 'studio',
      style: ['cartoon-acting']
    }
  }
];

export const LUTS: Option[] = [
  // --- DaVinci Resolve & Cinema Film Looks ---
  { 
    id: 'lut-kodak-2383', 
    label: 'Kodak 2383 Print Film', 
    prompt: 'color graded with Kodak 2383 print film LUT look, cinematic contrast and rich color tones', 
    description: 'O LUT de impressão cinematográfica mais famoso do DaVinci Resolve. Contraste rico e tons quentes.',
    category: 'lut', 
    subCategory: 'DaVinci Resolve / Cinema Looks' 
  },
  { 
    id: 'lut-kodak-2393', 
    label: 'Kodak 2393 Print Film', 
    prompt: 'color graded with Kodak 2393 film stock LUT, deep shadows contrast, classic theater rendering', 
    description: 'Contraste denso nas sombras, pretos profundos e projeção teatral clássica.',
    category: 'lut', 
    subCategory: 'DaVinci Resolve / Cinema Looks' 
  },
  { 
    id: 'lut-kodak-5218', 
    label: 'Kodak 5218 Negative', 
    prompt: 'color graded with Kodak 5218 negative film LUT look, natural organic skin tones, smooth latitude', 
    description: 'Película negativa clássica que oferece tons de pele naturais e transições suaves.',
    category: 'lut', 
    subCategory: 'DaVinci Resolve / Cinema Looks' 
  },
  { 
    id: 'lut-fuji-3510', 
    label: 'Fujifilm 3510 Print', 
    prompt: 'color graded with Fujifilm 3510 print film look LUT, cool green shadows, clean soft highlights', 
    description: 'Visual clássico da Fuji com sombras verdes frias e realces limpos e suaves.',
    category: 'lut', 
    subCategory: 'DaVinci Resolve / Cinema Looks' 
  },
  { 
    id: 'lut-fuji-3513', 
    label: 'Fujifilm 3513 Print', 
    prompt: 'color graded with Fujifilm 3513 film stock LUT, rich contrast, classic cinematic analog color profile', 
    description: 'Cores analógicas ricas com contraste moderno e separação de cores definida.',
    category: 'lut', 
    subCategory: 'DaVinci Resolve / Cinema Looks' 
  },
  { 
    id: 'lut-fuji-f125', 
    label: 'Fujifilm F125 Filmstock', 
    prompt: 'color graded with Fujifilm F125 film stock LUT look, standard vibrant cinematic rendering', 
    description: 'Visual clássico de película de cinema da Fuji, com forte presença cromática.',
    category: 'lut', 
    subCategory: 'DaVinci Resolve / Cinema Looks' 
  },
  { 
    id: 'lut-filmstock-50', 
    label: 'Filmstock 50', 
    prompt: 'color graded with Filmstock 50 LUT look, high contrast, desaturated cold colors, dramatic cinematography', 
    description: 'Visual dramático de alto contraste e cores frias levemente desbotadas.',
    category: 'lut', 
    subCategory: 'DaVinci Resolve / Cinema Looks' 
  },

  // --- Perfis de Câmera / Conversões LOG (CST) ---
  { 
    id: 'lut-arri-logc', 
    label: 'ARRI LogC to Rec.709', 
    prompt: 'shot on ARRI LogC, color converted to Rec.709, cinematic color science, natural organic look', 
    description: 'Conversão técnica padrão da câmera ARRI Alexa. Cores orgânicas e tom de pele perfeito.',
    category: 'lut', 
    subCategory: 'Perfis de Câmera (LOG)' 
  },
  { 
    id: 'lut-sony-slog3', 
    label: 'Sony S-Log3 to Rec.709', 
    prompt: 'shot on Sony S-Log3, color corrected to Rec.709, high dynamic range cinema look, crisp highlights', 
    description: 'Perfil profissional das câmeras Sony Venice/FX. Nitidez moderna e grande alcance dinâmico.',
    category: 'lut', 
    subCategory: 'Perfis de Câmera (LOG)' 
  },
  { 
    id: 'lut-canon-clog', 
    label: 'Canon C-Log to Rec.709', 
    prompt: 'shot on Canon C-Log, color graded to Rec.709, organic warm skin tones, clean shadows', 
    description: 'Conversão clássica da Canon, famosa por seus vermelhos ricos e tons de pele quentes.',
    category: 'lut', 
    subCategory: 'Perfis de Câmera (LOG)' 
  },
  { 
    id: 'lut-redlogfilm', 
    label: 'REDLogFilm to Rec.709', 
    prompt: 'shot on REDLogFilm, color graded to Rec.709, sharp rich cinematic colors, high contrast dynamic look', 
    description: 'Estética clássica das câmeras RED Digital Cinema. Imagens nítidas e cores impactantes.',
    category: 'lut', 
    subCategory: 'Perfis de Câmera (LOG)' 
  },
  { 
    id: 'lut-blackmagic-gen5', 
    label: 'Blackmagic Gen 5 Film to Rec.709', 
    prompt: 'shot on Blackmagic Design Gen 5 Film, color graded to Rec.709, wide dynamic range, rich grading base', 
    description: 'Perfil de cores de 5ª geração da Blackmagic Design, com ótimo alcance dinâmico.',
    category: 'lut', 
    subCategory: 'Perfis de Câmera (LOG)' 
  },
  { 
    id: 'lut-panasonic-vlog', 
    label: 'Panasonic V-Log to V709', 
    prompt: 'shot on Panasonic V-Log, color graded to V709, realistic documentary aesthetic, clean natural tones', 
    description: 'Visual realista e limpo das câmeras Lumix/Varicam, ideal para documentários.',
    category: 'lut', 
    subCategory: 'Perfis de Câmera (LOG)' 
  },
  { 
    id: 'lut-dji-dlog', 
    label: 'DJI D-Log to Rec.709', 
    prompt: 'shot on DJI D-Log, color corrected to Rec.709, clean aerial landscape look, natural saturation', 
    description: 'Conversão otimizada para capturas aéreas e drones, com saturação limpa da DJI.',
    category: 'lut', 
    subCategory: 'Perfis de Câmera (LOG)' 
  },

  // --- Photoshop (Adobe Standard) ---
  { 
    id: 'lut-ps-crisp-warm', 
    label: 'Crisp Warm (Photoshop)', 
    prompt: 'color graded with Photoshop Crisp Warm LUT style, golden tones, warm clear contrast', 
    description: 'LUT clássico do Photoshop. Realça as altas luzes com um tom dourado aconchegante.',
    category: 'lut', 
    subCategory: 'Photoshop Lookups' 
  },
  { 
    id: 'lut-ps-crisp-winter', 
    label: 'Crisp Winter (Photoshop)', 
    prompt: 'color graded with Photoshop Crisp Winter LUT style, icy cool tones, clean cold contrast', 
    description: 'Esfria a imagem dando tons invernais, com realces azuis frios e limpos.',
    category: 'lut', 
    subCategory: 'Photoshop Lookups' 
  },
  { 
    id: 'lut-ps-futuristic-bleak', 
    label: 'Futuristic Bleak (Photoshop)', 
    prompt: 'color graded with Photoshop Futuristic Bleak LUT look, desaturated post-apocalyptic colors, cold gray cast', 
    description: 'Visual desbotado, cinzento e pós-apocalíptico ideal para ficção científica dramática.',
    category: 'lut', 
    subCategory: 'Photoshop Lookups' 
  },
  { 
    id: 'lut-ps-horror-blue', 
    label: 'Horror Blue (Photoshop)', 
    prompt: 'color graded with Photoshop Horror Blue LUT look, eerie green-blue color cast, suspenseful dark shadows', 
    description: 'Estética fria com tons azul-esverdeados nas sombras, clássico de filmes de terror.',
    category: 'lut', 
    subCategory: 'Photoshop Lookups' 
  },
  { 
    id: 'lut-ps-moonlight', 
    label: 'Moonlight (Photoshop)', 
    prompt: 'color graded with Photoshop Moonlight LUT, blue night color grade, simulated lunar illumination', 
    description: 'Simula iluminação noturna fria sob a luz da lua, com forte azulamento.',
    category: 'lut', 
    subCategory: 'Photoshop Lookups' 
  },
  { 
    id: 'lut-ps-night-from-day', 
    label: 'Night From Day (Photoshop)', 
    prompt: 'color graded with Photoshop Night From Day LUT, day-for-night filter, deep blue underexposed look', 
    description: 'Efeito "Day-for-Night". Subexpõe a imagem sob uma tonalidade azul profunda.',
    category: 'lut', 
    subCategory: 'Photoshop Lookups' 
  },
  { 
    id: 'lut-ps-fall-colors', 
    label: 'Fall Colors (Photoshop)', 
    prompt: 'color graded with Photoshop Fall Colors LUT style, rich autumn foliage tones, warm red and yellow saturation', 
    description: 'Acentua cores outonais, transformando verdes em tons quentes avermelhados e laranjas.',
    category: 'lut', 
    subCategory: 'Photoshop Lookups' 
  },
  { 
    id: 'lut-ps-foggy-night', 
    label: 'Foggy Night (Photoshop)', 
    prompt: 'color graded with Photoshop Foggy Night LUT look, low contrast desaturated nighttime mist tones', 
    description: 'Tons noturnos difusos, baixo contraste e atmosfera de neblina urbana.',
    category: 'lut', 
    subCategory: 'Photoshop Lookups' 
  },
  { 
    id: 'lut-ps-late-sunset', 
    label: 'Late Sunset (Photoshop)', 
    prompt: 'color graded with Photoshop Late Sunset LUT look, warm orange and violet horizon color gradient', 
    description: 'Gradiente de entardecer tardio com laranjas profundos e tons violeta nas sombras.',
    category: 'lut', 
    subCategory: 'Photoshop Lookups' 
  },
  { 
    id: 'lut-ps-teal-orange', 
    label: 'Teal Orange Contrast (Photoshop)', 
    prompt: 'color graded with Photoshop Teal Orange Plus Contrast LUT style, heavy cyan shadows and warm skin tone highlights', 
    description: 'Divisão de tons em ciano e laranja com contraste forte e estilizado nas bordas.',
    category: 'lut', 
    subCategory: 'Photoshop Lookups' 
  },

  // --- Premiere (Lumetri Standard) ---
  { 
    id: 'lut-pr-blue-ice', 
    label: 'SL Blue Ice (Premiere)', 
    prompt: 'color graded with Premiere Lumetri Blue Ice LUT style, icy silver highlights, cold blue color grading', 
    description: 'Visual gélido e prateado do Premiere Pro. Dá um aspecto limpo e de ficção científica fria.',
    category: 'lut', 
    subCategory: 'Premiere Lumetri Looks' 
  },
  { 
    id: 'lut-pr-gold-heat', 
    label: 'SL Gold Heat (Premiere)', 
    prompt: 'color graded with Premiere Lumetri Gold Heat LUT style, burning amber tones, intense hot contrast', 
    description: 'Visual quente e escaldante. Tons âmbar profundos e contraste de deserto quente.',
    category: 'lut', 
    subCategory: 'Premiere Lumetri Looks' 
  }
];

export const GRADING_TECHNIQUES: Option[] = [
  {
    id: 'cst-transform',
    label: 'Color Space Transform (CST)',
    prompt: 'processed with DaVinci Resolve Color Space Transform (CST), accurate gamut mapping and input display color space conversion',
    description: 'Conversão técnica e científica de espaços de cor (ex: LOG para Rec.709) sem perdas de tons.',
    category: 'grading_technique'
  },
  {
    id: 'hdr-wheels',
    label: 'HDR Color Wheels',
    prompt: 'finely graded with DaVinci Resolve HDR color wheels, precise luminance zoning control over shadows, highlights, and midtones',
    description: 'Ajuste cirúrgico de brilho e matiz usando as novas rodas HDR (Black, Dark, Shadow, Light, Highlight, Specular).',
    category: 'grading_technique'
  },
  {
    id: 'qualifiers-masking',
    label: 'Qualifiers & Masking (Grading Seletivo)',
    prompt: 'color qualified and tracked mask isolation, selective color grading, professional target skin tones tracking',
    description: 'Mascaramento e isolamento de cores específicas (ex: manter apenas os tons de pele quentes e dessaturar o fundo).',
    category: 'grading_technique'
  },
  {
    id: 'film-emulation',
    label: 'Film Halation Emulation',
    prompt: 'emulated film halation look, glowing red edges around bright light zones, retro chemical film simulation',
    description: 'Simulação química analógica que cria um brilho avermelhado suave nas bordas de alta exposição de luz.',
    category: 'grading_technique'
  },
  {
    id: 'film-grain-resolve',
    label: 'Film Grain Emulation',
    prompt: 'authentic film grain texture integration, natural organic film noise, physical 35mm film stock simulation',
    description: 'Adiciona granulação orgânica de película física de cinema 35mm para quebrar a textura digital limpa.',
    category: 'grading_technique'
  },
  {
    id: 'power-grade',
    label: 'Power Grades (Resolve)',
    prompt: 'applied professional Hollywood industry-standard Power Grade node tree, complex multi-node color pipeline grading',
    description: 'Estrutura profissional de nós interligados do Resolve para criar uma atmosfera de cinema de alto nível.',
    category: 'grading_technique'
  },
  {
    id: 'dctl-shifters',
    label: 'DCTL Color Shifters',
    prompt: 'mathematical DCTL color space transformations, high-fidelity custom color shifting, professional grade precision',
    description: 'Transformadores matemáticos via código para realizar ajustes e distorções cromáticas perfeitas.',
    category: 'grading_technique'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'art-origami-monk',
    url: '/images/styles/origami-low-poly.png',
    title: 'Monge Guerreiro em Dobradura',
    prompt: 'origami low poly fusion style, polygonal folded paper construction, sharp geometric edges, stylized paper sculpture aesthetic, paper fibers visible, realistic fold tension, layered paper thickness, subtle paper imperfections, extreme wide shot, golden hour sunset lighting, fantasy forest environment',
    author: 'admin@shotcraft.com',
    generatorIA: 'Midjourney v6',
    postProcessing: 'Photoshop (Correção de cores e iluminação)',
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000
  },
  {
    id: 'art-plasticine-clay',
    url: '/images/styles/massinha-modelar.png',
    title: 'Mundo de Massinha',
    prompt: 'made of colorful soft plasticine clay, charming handcrafted look, smooth rounded shapes, visible handmade imperfections, stop motion style, cute expressive forms, soft cinematic lighting, cozy atmosphere, detailed clay texture, full body shot, whimsical fantasy kingdom environment',
    author: 'admin@shotcraft.com',
    generatorIA: 'DALL-E 3',
    postProcessing: 'Lightroom (Ajuste de contraste e nitidez)',
    createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000
  },
  {
    id: 'art-lego-castle',
    url: '/images/styles/lego.png',
    title: 'Reino de Blocos',
    prompt: 'Transform the image into a realistic LEGO-style scene, entirely constructed from authentic LEGO bricks and pieces, visible studs on every block, plastic toy material, modular brick construction, realistic interlocking pieces, LEGO minifigure aesthetic, detailed brick-built textures, vibrant toy colors, cinematic lighting, realistic plastic reflections, handcrafted LEGO assembly look',
    author: 'admin@shotcraft.com',
    generatorIA: 'Midjourney v6',
    postProcessing: 'Photoshop (Composição de fumaça e brilhos adicionais)',
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000
  },
  {
    id: 'art-noir-detective',
    url: '/images/styles/noir-pb-master.png',
    title: 'O Último Detetive',
    prompt: 'extreme noir black and white illustration, pure black shadows, heavy black spotting, dramatic chiaroscuro lighting, bold silhouette rendering, graphic ink composition, strong negative space, hard rim lighting, minimal grayscale, white highlights only, sin city aesthetic, frank miller inspired noir, close-up shot, rainy neon alley environment',
    author: 'admin@shotcraft.com',
    generatorIA: 'Flux.1 Pro',
    postProcessing: 'Photoshop (Remoção de ruído digital)',
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000
  },
  {
    id: 'art-pixel-retro',
    url: '/images/styles/Pixel-art.png',
    title: 'Arcade Nostalgia',
    prompt: 'Transform the image into detailed pixel art, authentic retro videogame aesthetic, visible square pixels, limited color palette, crisp pixel edges, handcrafted sprite style, 16-bit era visual, retro arcade graphics, clean dithering, low-resolution appearance, pixel-perfect shading, nostalgic game art style, wide shot, modern city environment',
    author: 'admin@shotcraft.com',
    generatorIA: 'Stable Diffusion XL',
    postProcessing: 'Nenhum (Saída direta da IA)',
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000
  },
  {
    id: 'art-ice-sculpture',
    url: '/images/styles/congelando.png',
    title: 'Alma de Gelo',
    prompt: 'Ultra realistic smooth translucent ice sculpture made of premium clear frozen crystal glass, very soft and elegant rounded contours, minimal surface imperfections, beautiful light refraction with gentle caustics, smooth glossy surface with subtle melting details, soft thickness and depth, almost no cracks, delicate air bubbles, soft diffused studio lighting, standard lens, standard perspective',
    author: 'admin@shotcraft.com',
    generatorIA: 'Midjourney v6',
    postProcessing: 'Lightroom (Gradação de azul e cian)',
    createdAt: Date.now()
  }
];



