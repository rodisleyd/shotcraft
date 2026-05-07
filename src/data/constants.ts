/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Option } from "../types";

export const SHOT_TYPES: Option[] = [
  { id: 'ecu', label: 'Plano Detalhe (Extreme Close-up)', prompt: 'extreme close-up shot, macro detail', category: 'framing' },
  { id: 'close-up', label: 'Close-up', prompt: 'close-up shot', category: 'framing' },
  { id: 'mcu', label: 'Medium Close-up', prompt: 'medium close-up, chest-up shot', category: 'framing' },
  { id: 'medium', label: 'Plano Médio (Medium shot)', prompt: 'medium shot, waist-up', category: 'framing' },
  { id: 'cowboy', label: 'Plano Americano (Cowboy Shot)', prompt: 'cowboy shot, mid-thigh up shot', category: 'framing' },
  { id: 'full', label: 'Plano Inteiro (Full Shot)', prompt: 'full body shot, character head to toe', category: 'framing' },
  { id: 'long', label: 'Plano Aberto (Long Shot)', prompt: 'long shot, character in wide environment', category: 'framing' },
  { id: 'wide', label: 'Wide Shot', prompt: 'wide angle shot, environmental focus', category: 'framing' },
  { id: 'ews', label: 'Extreme Wide Shot', prompt: 'extreme wide shot, massive landscape focus, tiny character', category: 'framing' },
  { id: 'ots', label: 'Sobre o Ombro (OTS)', prompt: 'over-the-shoulder shot', category: 'framing' },
  { id: 'two-shot', label: 'Two Shot', prompt: 'two-shot, two characters in frame', category: 'framing' },
  { id: 'group', label: 'Group Shot', prompt: 'group shot, multiple characters', category: 'framing' },
  { id: 'pov', label: 'POV', prompt: 'first-person point of view, POV shot', category: 'framing' },
  { id: 'insert', label: 'Insert Shot', prompt: 'insert shot, close-up on object', category: 'framing' },
  { id: 'cutaway', label: 'Cutaway', prompt: 'cutaway shot, showing secondary action', category: 'framing' },
];

export const ANGLES: Option[] = [
  { id: 'eye-level', label: 'Nível do Olhar', prompt: 'eye-level angle', category: 'angle' },
  { id: 'low', label: 'Ângulo Baixo (Plongée)', prompt: 'low angle, looking up', category: 'angle' },
  { id: 'high', label: 'Ângulo Alto (Contra-Plongée)', prompt: 'high angle, looking down', category: 'angle' },
  { id: 'top', label: 'Top Shot', prompt: 'top-down vertical shot', category: 'angle' },
  { id: 'birds-eye', label: 'Vista de Pássaro', prompt: 'bird\'s eye view shot', category: 'angle' },
  { id: 'overhead', label: 'Overhead', prompt: 'overhead shot', category: 'angle' },
  { id: 'worms-eye', label: 'Vista de Verme', prompt: 'worm\'s eye view, looking straight up', category: 'angle' },
  { id: 'dutch', label: 'Ângulo Holandês', prompt: 'dutch angle, tilted frame', category: 'angle' },
  { id: 'shoulder-level', label: 'Nível do Ombro', prompt: 'shoulder level camera angle', category: 'angle' },
  { id: 'hip-level', label: 'Nível do Quadril', prompt: 'hip level camera angle', category: 'angle' },
];

export const PERSPECTIVES: Option[] = [
  { id: 'normal', label: 'Perspectiva Normal', prompt: 'normal perspective, realistic depth', category: 'perspective' },
  { id: 'foreshortening', label: 'Distorcida (Foreshortening)', prompt: 'extreme foreshortening perspective, distorted depth', category: 'perspective' },
  { id: 'isometric', label: 'Isométrica', prompt: 'isometric perspective, 2.5D view, no vanishing point', category: 'perspective' },
  { id: 'dynamic', label: 'Dinâmica', prompt: 'dynamic perspective, vanishing point focus, cinematic depth', category: 'perspective' },
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
  { id: '24mm', label: '24mm (Grande Angular)', prompt: 'shot on 24mm wide-angle lens', category: 'lens' },
  { id: '35mm', label: '35mm (Padrão)', prompt: 'shot on 35mm lens', category: 'lens' },
  { id: '50mm', label: '50mm (Natural)', prompt: 'shot on 50mm prime lens', category: 'lens' },
  { id: '85mm', label: '85mm (Retrato)', prompt: 'shot on 85mm portrait lens', category: 'lens' },
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
  { id: 'pincel', label: 'Pincel', prompt: 'painterly style, visible brushstrokes, artistic textured paint application', category: 'style', subCategory: '3. Tinta e Line Art' },
  { id: 'line-art', label: 'Line art', prompt: 'clean minimalist line art drawing', category: 'style', subCategory: '3. Tinta e Line Art' },

  // 4. Técnicas de Sombreamento (HQ)
  { id: 'hachura', label: 'Hachura', prompt: 'hatching technique, parallel lines for shading', category: 'style', subCategory: '4. Técnicas de Sombreamento (HQ)' },
  { id: 'hachura-cruzada', label: 'Hachura cruzada', prompt: 'cross-hatching technique, intersecting lines for depth', category: 'style', subCategory: '4. Técnicas de Sombreamento (HQ)' },
  { id: 'pontilhismo', label: 'Pontilhismo', prompt: 'pointillism technique, dots create form and color', category: 'style', subCategory: '4. Técnicas de Sombreamento (HQ)' },
  { id: 'halftone', label: 'Halftone', prompt: 'halftone dot pattern, vintage comic print style', category: 'style', subCategory: '4. Técnicas de Sombreamento (HQ)' },
  { id: 'screentone', label: 'Screentone', prompt: 'manga screentone style, dot and line patterns', category: 'style', subCategory: '4. Técnicas de Sombreamento (HQ)' },

  // 5. Estilo Artístico
  { id: 'cartoon', label: 'Cartoon', prompt: 'classic cartoon character style, exaggerated features', category: 'style', subCategory: '5. Estilo Artístico' },
  { id: 'anime', label: 'Anime', prompt: 'modern anime style, vibrant colors, clean linework', category: 'style', subCategory: '5. Estilo Artístico' },
  { id: 'manga', label: 'Mangá', prompt: 'classic manga style, detailed line art, expressive eyes, volume-driven shading', category: 'style', subCategory: '5. Estilo Artístico' },
  { id: 'realista', label: 'Realista', prompt: 'highly realistic illustration, accurate proportions', category: 'style', subCategory: '5. Estilo Artístico' },
  { id: 'minimalista', label: 'Minimalista', prompt: 'minimalist art style, simple shapes and palettes', category: 'style', subCategory: '5. Estilo Artístico' },
  { id: 'ukiyo-e', label: 'Ukiyo-e', prompt: 'japanese woodblock print style, ukiyo-e aesthetics', category: 'style', subCategory: '5. Estilo Artístico' },
  { id: 'sumie', label: 'Sumi-e', prompt: 'traditional japanese sumi-e wash painting, brush strokes', category: 'style', subCategory: '5. Estilo Artístico' },

  // 6. Digital
  { id: 'digital-painting', label: 'Pintura digital', prompt: 'professional digital painting, soft blending', category: 'style', subCategory: '6. Digital' },
  { id: 'cel-shading', label: 'Cel shading', prompt: 'cel-shaded animation style, flat colors with hard shadows', category: 'style', subCategory: '6. Digital' },
  { id: 'matte-painting', label: 'Pintura matte', prompt: 'epic matte painting, cinematic backdrop style', category: 'style', subCategory: '6. Digital' },
  { id: 'concept-art', label: 'Concept art', prompt: 'production concept art, loose but professional polish', category: 'style', subCategory: '6. Digital' },

  // 7. Produção / Processo
  { id: 'pencil', label: 'Esboço a lápis', prompt: `semi-realistic cartoon style, expressive character design, pencil sketch illustration, loose graphite lines, hand drawn sketchbook style, visible construction lines, soft graphite texture, light cross-hatching shading, detailed linework, whimsical concept art, children's book illustration style, monochrome pencil drawing, natural proportions, realistic details, rough artistic sketch on white paper`, category: 'style', subCategory: '7. Produção / Processo' },
  { id: 'storyboard', label: 'Storyboard', prompt: 'professional storyboard sketch, sequential art style', category: 'style', subCategory: '7. Produção / Processo' },

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
];

export const DETAILS: Option[] = [
  { id: 'rough', label: 'Rough (Bruto)', prompt: 'rough unpolished look', category: 'detail' },
  { id: 'detailed', label: 'Altamente Detalhado', prompt: 'highly detailed, intricate textures', category: 'detail' },
  { id: 'anatomy', label: 'Anatomia Perfeita', prompt: 'perfect anatomy, clear fingers, anatomically correct hands, well-defined limbs', category: 'detail' },
  { id: 'minimalist', label: 'Minimalista', prompt: 'minimalist composition, clean simple details', category: 'detail' },
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
      style: { '5. Estilo Artístico': 'realista', '8. Cor e Finalização': 'alto-contraste' }, 
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
      style: { '1. Pintura Tradicional': 'oleo' }, 
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
      style: { '8. Cor e Finalização': 'pb', '5. Estilo Artístico': 'realista' }, 
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
      style: { '5. Estilo Artístico': 'realista' }, 
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
