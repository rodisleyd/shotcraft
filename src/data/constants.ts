/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Option, ColorPaletteOption, VisualTag } from "../types";

export const SHOT_TYPES: Option[] = [
  // 1. Enquadramentos Básicos
  { id: 'ecu', label: 'Plano Detalhe (Extreme Close-up)', prompt: 'extreme close-up shot, macro detail', category: 'framing', subCategory: '1. Enquadramentos Básicos' },
  { id: 'close-up', label: 'Close-up', prompt: 'close-up shot', category: 'framing', subCategory: '1. Enquadramentos Básicos' },
  { id: 'mcu', label: 'Medium Close-up', prompt: 'medium close-up, chest-up shot', category: 'framing', subCategory: '1. Enquadramentos Básicos' },
  { id: 'medium', label: 'Plano Médio (Medium shot)', prompt: 'medium shot, waist-up', category: 'framing', subCategory: '1. Enquadramentos Básicos' },
  { id: 'cowboy', label: 'Plano Americano (Cowboy Shot)', prompt: 'cowboy shot, mid-thigh up shot', category: 'framing', subCategory: '1. Enquadramentos Básicos' },
  { id: 'full', label: 'Plano Inteiro (Full Shot)', prompt: 'full body shot, character head to toe', category: 'framing', subCategory: '1. Enquadramentos Básicos' },
  { id: 'long', label: 'Plano Aberto (Long Shot)', prompt: 'long shot, character in wide environment', category: 'framing', subCategory: '1. Enquadramentos Básicos' },
  { id: 'wide', label: 'Wide Shot', prompt: 'wide angle shot, environmental focus', category: 'framing', subCategory: '1. Enquadramentos Básicos' },
  { id: 'ews', label: 'Extreme Wide Shot', prompt: 'extreme wide shot, massive landscape focus, tiny character', category: 'framing', subCategory: '1. Enquadramentos Básicos' },
  { id: 'ots', label: 'Sobre o Ombro (OTS)', prompt: 'over-the-shoulder shot', category: 'framing', subCategory: '1. Enquadramentos Básicos' },
  { id: 'two-shot', label: 'Two Shot', prompt: 'two-shot, two characters in frame', category: 'framing', subCategory: '1. Enquadramentos Básicos' },
  { id: 'group', label: 'Group Shot', prompt: 'group shot, multiple characters', category: 'framing', subCategory: '1. Enquadramentos Básicos' },
  { id: 'pov', label: 'POV', prompt: 'first-person point of view, POV shot', category: 'framing', subCategory: '1. Enquadramentos Básicos' },
  { id: 'insert', label: 'Insert Shot', prompt: 'insert shot, close-up on object', category: 'framing', subCategory: '1. Enquadramentos Básicos' },
  { id: 'cutaway', label: 'Cutaway', prompt: 'cutaway shot, showing secondary action', category: 'framing', subCategory: '1. Enquadramentos Básicos' },

  // 2. Enquadramentos Cinematográficos
  { id: 'establishing-shot', label: 'Establishing Shot (Plano de Estabelecimento)', prompt: 'establishing shot, cinematic establishing view', category: 'framing', subCategory: '2. Enquadramentos Cinematográficos' },
  { id: 'master-shot', label: 'Master Shot (Plano Mestre)', prompt: 'master shot, full scene composition', category: 'framing', subCategory: '2. Enquadramentos Cinematográficos' },
  { id: 'dutch-angle-framing', label: 'Dutch Angle (Ângulo Inclinado)', prompt: 'dutch angle, tilted camera, canted shot', category: 'framing', subCategory: '2. Enquadramentos Cinematográficos' },
  { id: 'center-framed', label: 'Center Framed Shot (Centralizado)', prompt: 'center framed composition, symmetrical framing', category: 'framing', subCategory: '2. Enquadramentos Cinematográficos' },
  { id: 'frame-within-frame', label: 'Frame Within Frame (Moldura Interna)', prompt: 'frame within frame composition, shoot through framing', category: 'framing', subCategory: '2. Enquadramentos Cinematográficos' },

  // 3. Enquadramentos de Ação (Anime/Mangá)
  { id: 'hero-shot', label: 'Hero Shot (Enquadramento Heroico)', prompt: 'hero shot, dramatic hero framing', category: 'framing', subCategory: '3. Enquadramentos de Ação (Anime/Mangá)' },
  { id: 'transformation-shot', label: 'Transformation Shot (Transformação)', prompt: 'transformation sequence framing, energy power up shot', category: 'framing', subCategory: '3. Enquadramentos de Ação (Anime/Mangá)' },
  { id: 'dynamic-action', label: 'Dynamic Action Shot (Ação Dinâmica)', prompt: 'dynamic action framing, intense perspective shot', category: 'framing', subCategory: '3. Enquadramentos de Ação (Anime/Mangá)' },
  { id: 'speed-perspective', label: 'Speed Perspective (Perspectiva de Velocidade)', prompt: 'exaggerated speed perspective shot, shonen manga action lines', category: 'framing', subCategory: '3. Enquadramentos de Ação (Anime/Mangá)' },

  // 4. Enquadramentos Dramáticos
  { id: 'profile-shot', label: 'Profile Shot (Perfil de Lado)', prompt: 'side profile shot, profile view', category: 'framing', subCategory: '4. Enquadramentos Dramáticos' },
  { id: 'rear-shot', label: 'Rear Shot (Visto de Costas)', prompt: 'rear view shot, back facing character', category: 'framing', subCategory: '4. Enquadramentos Dramáticos' },
  { id: 'silhouette-shot', label: 'Silhouette Shot (Silhueta)', prompt: 'silhouette shot, backlit silhouette', category: 'framing', subCategory: '4. Enquadramentos Dramáticos' },
  { id: 'negative-space', label: 'Negative Space (Espaço Negativo)', prompt: 'negative space composition, tiny character in large frame', category: 'framing', subCategory: '4. Enquadramentos Dramáticos' },

  // 5. Enquadramentos Técnicos
  { id: 'macro-shot', label: 'Macro Shot (Detalhe Macro)', prompt: 'macro shot, ultra close detail, extreme macro', category: 'framing', subCategory: '5. Enquadramentos Técnicos' },
  { id: 'reflection-shot', label: 'Reflection Shot (Através de Reflexo)', prompt: 'reflection shot, mirror reflection composition', category: 'framing', subCategory: '5. Enquadramentos Técnicos' },
  { id: 'surveillance-shot', label: 'Surveillance Shot (Câmera de Segurança)', prompt: 'surveillance camera view, CCTV framing', category: 'framing', subCategory: '5. Enquadramentos Técnicos' },
  { id: 'handheld-shot', label: 'Handheld Shot (Câmera na Mão)', prompt: 'handheld camera shot, shaky footage aesthetic', category: 'framing', subCategory: '5. Enquadramentos Técnicos' },
  { id: 'found-footage', label: 'Found Footage (Câmera Amadora)', prompt: 'found footage shot, home video style, REC interface elements', category: 'framing', subCategory: '5. Enquadramentos Técnicos' },

  // 6. Composições para HQ e Ilustração
  { id: 'splash-panel', label: 'Splash Panel (Página Inteira)', prompt: 'splash page composition, splash panel layout, dramatic comic page', category: 'framing', subCategory: '6. Composições para HQ e Ilustração' },
  { id: 'vertical-cinematic', label: 'Vertical Cinematic (Formato Mobile)', prompt: 'vertical cinematic composition, webtoon style framing', category: 'framing', subCategory: '6. Composições para HQ e Ilustração' },
  { id: 'diagonal-composition', label: 'Diagonal Composition (Composição Diagonal)', prompt: 'diagonal composition lines, dynamic tilted layout', category: 'framing', subCategory: '6. Composições para HQ e Ilustração' },
  { id: 'layered-depth', label: 'Layered Depth (Profundidade em Camadas)', prompt: 'layered depth composition, strong foreground and background elements, Ghibli style layout', category: 'framing', subCategory: '6. Composições para HQ e Ilustração' },
];

export const ANGLES: Option[] = [
  // 1. Ângulos Básicos
  { id: 'eye-level', label: 'Nível do Olhar', prompt: 'eye-level angle', category: 'angle', subCategory: '1. Ângulos Básicos' },
  { id: 'low', label: 'Ângulo Baixo (Plongée)', prompt: 'low angle, looking up', category: 'angle', subCategory: '1. Ângulos Básicos' },
  { id: 'high', label: 'Ângulo Alto (Contra-Plongée)', prompt: 'high angle, looking down', category: 'angle', subCategory: '1. Ângulos Básicos' },
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
  { id: 'soft', label: 'Luz Suave', prompt: 'soft diffused lighting', category: 'lighting' },
  { id: 'hard', label: 'Luz Dura', prompt: 'hard directional lighting, high contrast', category: 'lighting' },
  { id: 'rim', label: 'Luz de Contorno', prompt: 'rim lighting, backlight silhouette', category: 'lighting' },
  { id: 'backlight', label: 'Contraluz', prompt: 'strong backlight', category: 'lighting' },
  { id: 'low-key', label: 'Low Key', prompt: 'low-key lighting, moody shadows', category: 'lighting' },
  { id: 'high-key', label: 'High Key', prompt: 'high-key lighting, bright and airy', category: 'lighting' },
];

export const ENVIRONMENTS: Option[] = [
  { id: 'urban', label: 'Urbano', prompt: 'urban city environment', category: 'environment' },
  { id: 'futuristic', label: 'Futurista', prompt: 'futuristic sci-fi setting', category: 'environment' },
  { id: 'medieval', label: 'Medieval', prompt: 'medieval historical setting', category: 'environment' },
  { id: 'interior', label: 'Interior', prompt: 'indoor interior setting', category: 'environment' },
  { id: 'exterior', label: 'Exterior', prompt: 'outdoor exterior setting', category: 'environment' },
  { id: 'rain', label: 'Chuva', prompt: 'heavy rain atmosphere', category: 'environment' },
  { id: 'fog', label: 'Neblina', prompt: 'mysterious foggy atmosphere', category: 'environment' },
  { id: 'sunset', label: 'Pôr do Sol', prompt: 'golden hour sunset lighting', category: 'environment' },
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

  // 3. Tinta e Line Art
  { id: 'nanquim', label: 'Nanquim', prompt: 'ink wash illustration, deep black india ink', category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'bico-de-pena', label: 'Bico de pena', prompt: 'fine pen and ink drawing, delicate linework', category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'caneta-esferografica', label: 'Caneta esferográfica', prompt: `highly detailed realistic ballpoint pen drawing using blue Bic pen style. Intricate fine lines, dense cross-hatching and stippling for shading, typical ballpoint pen pressure variations. Masterful pen work with organic flowing lines, realistic facial features and curly hair texture, drawn on white paper, classic blue ballpoint ink, hand-drawn aesthetic, extremely detailed, museum quality pen illustration --stylize 750`, category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'pincel', label: 'Pincel', prompt: 'painterly style, visible brushstrokes, artistic textured paint application', category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'sketch-pincel-nanquim', label: 'Sketch em pincel e nanquim', prompt: `expressive ink sketch, dynamic brush pen lines, loose gestural drawing, black ink illustration, confident strokes, comic book inking style, rough hatching, minimalist shading, hand drawn sketchbook aesthetic, elegant line economy, editorial illustration style`, category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'croqui', label: 'Croqui', prompt: `A raw artist's sketchbook page, expressive gestural ink-and-pencil sketch. High-contrast black ink cross-hatching, heavy dense shadow patches, and minimalist, rough scratching lines with varying weight. Features abstract, floating ink marks in the white space. Monochromatic.`, category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'line-art', label: 'Line art', prompt: 'clean minimalist line art drawing', category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'arte-final-comics', label: 'Arte final comics', prompt: 'professional inked line art, traditional india ink finish, bold contour lines, expressive line weight variation, detailed crosshatching, feathering technique, dramatic spotting blacks, clean black and white contrast, hand-inked illustration, technical pen and brush rendering, intricate ink details, dynamic shadow rendering, comic-style inking, polished ink finish', category: 'style', subCategory: '3. Tinta e Line Art' },

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

  // 7. Produção / Processo
  { id: 'pencil', label: 'Esboço a lápis', prompt: `expressive character design, pencil sketch illustration, loose graphite lines, hand drawn sketchbook style, visible construction lines, soft graphite texture, light cross-hatching shading, detailed linework, whimsical concept art, children's book illustration style, monochrome pencil drawing, natural proportions, realistic details, rough artistic sketch on white paper, artistic hand-crafted illustration, distinct aesthetic`, category: 'style', subCategory: '7. Produção / Processo' },
  { id: 'rascunho-caotico', label: 'Rascunho Caótico', prompt: `chaotic ultra loose light pencil rascunho, super soft faint pencil with very light pressure, wildly gestural and explosive lines, insanely messy frantic light strokes, tons of visible aggressive but delicate construction lines, raw sketchbook destruction, soft erratic line weight, wild light scribbles and crosshatching, extremely focused on single character only, character reference study, no comic panels, no layout, no extra borders, no text, pure character sketch, high contrast between faint lines and white paper, completely unfinished raw rascunho energy, sketchy madness --stylize 800 --chaos 15 --v 6`, category: 'style', subCategory: '7. Produção / Processo' },
  { id: 'storyboard', label: 'Storyboard', prompt: 'professional storyboard sketch, sequential art style', category: 'style', subCategory: '7. Produção / Processo' },
  { id: 'cartoon-expressions', label: 'Expressões faciais cartoon', prompt: 'cartoon character expression sheet, multiple facial expressions, animation model sheet, head rotation studies, expressive emotions, classic hand-drawn animation character design, caricature expressions, clean sketch layout', category: 'style', subCategory: '7. Produção / Processo' },
  { id: 'cartoon-acting', label: 'Cartoon character acting', prompt: 'cartoon character acting sheet, multiple dynamic poses, high angle, low angle, front, back, profile, expressive body language, exaggerated cartoon acting, hand drawn animation style', category: 'style', subCategory: '7. Produção / Processo' },

  // 8. Cor e Finalização
  { id: 'pb', label: 'Preto e Branco', prompt: 'high contrast black and white graphic style', category: 'style', subCategory: '8. Cor e Finalização' },
  { id: 'tons-cinza', label: 'Tons de cinza', prompt: 'grayscale monochromatic style, varying shades of gray', category: 'style', subCategory: '8. Cor e Finalização' },
  { id: 'alto-contraste', label: 'Alto contraste', prompt: 'high contrast extreme lighting, deep blacks and bright whites', category: 'style', subCategory: '8. Cor e Finalização' },

  // 9. Fotografia Cinematográfica
  { id: 'anamorfico', label: 'Anamórfico', prompt: 'cinematic anamorphic shot, horizontal lens flares, oval bokeh', category: 'style', subCategory: '9. Fotografia Cinematográfica' },
  { id: 'deep-focus', label: 'Deep Focus', prompt: 'deep focus cinematography, everything from foreground to background in sharp focus', category: 'style', subCategory: '9. Fotografia Cinematográfica' },
  { id: 'tilt-shift', label: 'Tilt-Shift', prompt: 'tilt-shift photography, miniature effect, selective blur', category: 'style', subCategory: '9. Fotografia Cinematográfica' },
  { id: 'bleach-bypass', label: 'Bleach Bypass', prompt: 'bleach bypass film process, high contrast, desaturated colors, grainy', category: 'style', subCategory: '9. Fotografia Cinematográfica' },
  { id: 'technicolor', label: 'Technicolor', prompt: 'vibrant technicolor film style, saturated 3-strip color process', category: 'style', subCategory: '9. Fotografia Cinematográfica' },
  { id: 'day-for-night', label: 'Day for Night', prompt: 'day for night cinematography, simulated nighttime, blue tint, high contrast', category: 'style', subCategory: '9. Fotografia Cinematográfica' },
  
  // 10. Técnicas de Gravura
  { id: 'xilogravura', label: 'Xilogravura', prompt: `The artwork should resemble traditional woodcut and linocut printmaking, with highly detailed engraved lines, swirling bark textures, dramatic black shadows, and white etched highlights. The composition should feel like an ancient folklore illustration, handcrafted and organic, with dense hatching and expressive carving marks., artistic hand-crafted illustration, distinct aesthetic`, category: 'style', subCategory: '10. Técnicas de Gravura' },
  
  // 11. Estilos de Traço
  { id: 'caricatura-nanquim', label: 'Caricatura em Nanquim', prompt: `transform the uploaded portrait into a retro caricature editorial cartoon, with exaggerated head shapes, simplified facial structure, asymmetrical design, elongated neck and nose shapes, loose hand-inked linework, playful anatomical distortion, expressive caricature drawing, modern mid-century cartoon aesthetics, rough but confident pen strokes, graphic silhouette-based character design, preserve the exact pose and composition from the original photo, black ink only, white background, single illustration only`, category: 'style', subCategory: '11. Estilos de Traço' },
  { id: 'cartoon-linha-grossa', label: 'Cartoon de Linha Grossa', prompt: `drawn in a minimalist cartoon style with bold black linework on a white background. The illustration should feature exaggerated facial expressions and unique shapes, resembling stylized caricatures. The style is graphic, bold, and expressive, focusing on contrast and simplicity, conveying diverse personalities and emotions.`, category: 'style', subCategory: '11. Estilos de Traço' },
  { id: 'linhas-angulares-fortes', label: 'Linhas Angulares Fortes', prompt: `bold black and white graphic line art, extremely thick and confident ink outlines with strong varying line weight, high contrast, clean vector style, minimal shading only with solid black areas and light stippling, exaggerated stylized proportions, angular geometric shapes combined with organic flow, sharp silhouettes, powerful graphic quality, edgy cartoon illustration, strong personality in every line, reminiscent of alternative comic book art and 2000s character design sheets, no soft shading, no gradients, flat black and white --stylize 180 --v 6 --style raw`, category: 'style', subCategory: '11. Estilos de Traço' },
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

  // 2. Nível de Detalhe
  { id: 'rough', label: 'Rough (Bruto)', prompt: 'rough unpolished look', category: 'detail', subCategory: '2. Nível de Detalhe' },
  { id: 'detailed', label: 'Altamente Detalhado', prompt: 'highly detailed, intricate textures', category: 'detail', subCategory: '2. Nível de Detalhe' },
  { id: 'anatomy', label: 'Anatomia Perfeita', prompt: 'perfect anatomy, clear fingers, anatomically correct hands, well-defined limbs', category: 'detail', subCategory: '2. Nível de Detalhe' },
  { id: 'minimalist', label: 'Minimalista', prompt: 'minimalist composition, clean simple details', category: 'detail', subCategory: '2. Nível de Detalhe' },
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
      style: ['pb', 'realista'], 
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
      '8. Cor e Finalização': 'pb'
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
    'style': { '3. Tinta e Line Art': 'nanquim', '8. Cor e Finalização': 'pb' },
    'lighting': 'high-contrast',
    'detail': 'clean-lines'
  },
  'carvao': {
    'style': { '2. Desenho Tradicional': 'carvao', '8. Cor e Finalização': 'pb' },
    'lighting': 'dramatic'
  },
  'pb': {
    'lighting': 'dramatic',
    'style': { '8. Cor e Finalização': 'pb' }
  },
  'cyberpunk': {
    'lighting': 'neon',
    'style': { '6. Digital': 'digital-painting' },
    'environment': 'urban'
  },
  'noir': {
    'style': { '8. Cor e Finalização': 'pb', '4. Técnicas de Sombreamento (HQ)': 'hachura' },
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
  }
];

