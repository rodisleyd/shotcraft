/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TargetPlatform, SelectionState, ShotMode, CharacterLockState } from '../types';
import { 
  SHOT_TYPES, 
  ANGLES, 
  PERSPECTIVES, 
  LENSES, 
  LIGHTING, 
  ENVIRONMENTS, 
  STYLES, 
  PAPERS, 
  LUTS, 
  GRADING_TECHNIQUES, 
  DETAILS, 
  ASPECT_RATIOS 
} from '../data/constants';
import { buildCinematicGradingPrompt } from './cinematicGradingEngine';
import { buildCharacterBlueprintPrompt, getCharacterNegativePrompt } from '../data/characterConsistency';

export interface PlatformConfig {
  id: TargetPlatform;
  name: string;
  shortName: string;
  badge: string;
  description: string;
  tips: string;
  hasSeparateNegative?: boolean;
}

export const TARGET_PLATFORMS: PlatformConfig[] = [
  {
    id: 'generic',
    name: 'Universal (Genérico)',
    shortName: 'Universal',
    badge: 'Multi-IA',
    description: 'Formato clássico do Shotcraft compatível com qualquer gerador de IA',
    tips: 'Sintaxe equilibrada e direta, pronta para ser colada em qualquer plataforma.'
  },
  {
    id: 'nano-banana',
    name: 'Nano Banana',
    shortName: 'Nano Banana',
    badge: 'Google Imagen',
    description: 'Otimizado com linguagem natural hiper-descritiva para Google Imagen 3',
    tips: 'Estruturado em prosa descritiva com forte ancoragem física de iluminação, texturas e composição.'
  },
  {
    id: 'midjourney',
    name: 'Midjourney v6.1',
    shortName: 'Midjourney',
    badge: 'v6.1 Raw',
    description: 'Formatado com parâmetros técnicos (--v 6.1, --style raw, --ar, --stylize, --no)',
    tips: 'Configurado com --v 6.1 e --style raw para evitar alucinações plásticas e garantir fidelidade cinematográfica.'
  },
  {
    id: 'dalle',
    name: 'ChatGPT / DALL-E',
    shortName: 'GPT Imagens',
    badge: 'DALL-E 3',
    description: 'Narrativa descritiva contínua sem comandos técnicos de terminal',
    tips: 'Evita parâmetros como --ar que confundem o ChatGPT; gera uma descrição cinematográfica rica em prosa.'
  },
  {
    id: 'flux',
    name: 'FLUX.1',
    shortName: 'FLUX.1',
    badge: 'BFL',
    description: 'Direção de cena fotográfica limpa, realista e sem clichês de qualidade',
    tips: 'Descrições táteis e orgânicas sem poluição de tags desnecessárias (como masterpiece ou 8k).'
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    shortName: 'SDXL / A1111',
    badge: 'SDXL / Comfy',
    description: 'Tags com ponderação de peso e campo de Prompt Negativo dedicado',
    tips: 'Utiliza sintaxe com pesos (termo:1.2) e disponibiliza um Negative Prompt dedicado para copiar e colar.',
    hasSeparateNegative: true
  },
  {
    id: 'leonardo',
    name: 'Leonardo AI',
    shortName: 'Leonardo AI',
    badge: 'PhotoReal',
    description: 'Calibrado para Leonardo PhotoReal e Diffusion XL com atmosfera cinemática',
    tips: 'Sintaxe para iluminação volumétrica e realismo cênico, com suporte a Negative Prompt dedicado.',
    hasSeparateNegative: true
  },
  {
    id: 'ideogram',
    name: 'Ideogram v2',
    shortName: 'Ideogram',
    badge: 'v2',
    description: 'Composição visual focada em clareza, design e renderização nítida',
    tips: 'Otimizado para clareza de formas, geometria espacial e renderização cinematográfica ou artística.'
  }
];

export interface FormattedPromptOutput {
  prompt: string;
  negativePrompt?: string;
  platform: TargetPlatform;
  tips: string;
  badge: string;
}

export interface PromptBuildParams {
  subject: string;
  selections: SelectionState;
  mode: ShotMode;
  customAspect: string;
  negativePrompt: string;
  characterLock: CharacterLockState;
  platform: TargetPlatform;
}

/**
 * Extrai o ratio limpo (ex: "16:9", "9:16", "1:1", etc.)
 */
function extractCleanAspectRatio(selections: SelectionState, customAspect: string): string {
  if (selections.aspect === 'custom') {
    return customAspect.trim() || '16:9';
  }
  const found = ASPECT_RATIOS.find(o => o.id === selections.aspect);
  if (found && found.prompt) {
    const match = found.prompt.match(/--ar\s+([\d:]+)/);
    if (match) return match[1];
  }
  return selections.aspect || '16:9';
}

/**
 * Constrói o prompt formatado especificamente para a plataforma selecionada
 */
export function buildPlatformPrompt(params: PromptBuildParams): FormattedPromptOutput {
  const { subject, selections, mode, customAspect, negativePrompt, characterLock, platform } = params;
  const config = TARGET_PLATFORMS.find(p => p.id === platform) || TARGET_PLATFORMS[0];

  // 1. Coleta e resolução de cada elemento visual
  const subjectClean = subject.trim();
  const framing = SHOT_TYPES.find(o => o.id === selections.framing)?.prompt || '';
  const angle = ANGLES.find(o => o.id === selections.angle)?.prompt || '';
  const perspective = PERSPECTIVES.find(o => o.id === selections.perspective)?.prompt || '';
  const lens = LENSES.find(o => o.id === selections.lens)?.prompt || '';
  const lighting = LIGHTING.find(o => o.id === selections.lighting)?.prompt || '';
  const env = ENVIRONMENTS.find(o => o.id === selections.environment)?.prompt || '';

  const styles = selections.style
    .map(id => STYLES.find(o => o.id === id)?.prompt)
    .filter(Boolean) as string[];

  const paper = selections.paper ? (PAPERS.find(o => o.id === selections.paper)?.prompt || '') : '';

  let colorText = '';
  if (selections.colorPalette && selections.colorPalette.length > 0) {
    if (
      selections.useColorRule603010 &&
      selections.colorRule603010?.dominant &&
      selections.colorRule603010?.secondary &&
      selections.colorRule603010?.accent
    ) {
      colorText = `60-30-10 color rule hierarchy (Dominant 60%: ${selections.colorRule603010.dominant}, Secondary 30%: ${selections.colorRule603010.secondary}, Accent 10%: ${selections.colorRule603010.accent})`;
    } else {
      colorText = `color palette (${selections.colorPalette.join(', ')})`;
    }
  }

  const lut = selections.lutId ? (LUTS.find(o => o.id === selections.lutId)?.prompt || '') : '';

  // TargetAI mapping para o motor de cinematic grading e blueprint
  const targetAIMap: Record<TargetPlatform, string> = {
    'generic': 'general',
    'nano-banana': 'nano-banana',
    'midjourney': 'midjourney',
    'dalle': 'dalle',
    'flux': 'flux',
    'stable-diffusion': 'general',
    'leonardo': 'general',
    'ideogram': 'general'
  };

  const currentTargetAI = targetAIMap[platform] || 'general';

  let cinematicGradingText = '';
  if (selections.cinematicGrading && selections.cinematicGrading.enabled) {
    cinematicGradingText = buildCinematicGradingPrompt(selections.cinematicGrading, currentTargetAI);
  }

  const gradingTechs = (selections.gradingTechniques || [])
    .map(id => GRADING_TECHNIQUES.find(o => o.id === id)?.prompt)
    .filter(Boolean) as string[];

  let modeClause = '';
  if (mode === 'storyboard') {
    modeClause = 'professional storyboard sketch, black and white pencil lines, compositional notes, rough sketches';
  } else if (mode === 'cinematic') {
    modeClause = 'cinematic color grading, professional cinematography, technical realism';
  } else if (mode === 'illustration') {
    modeClause = 'artistic hand-crafted illustration, distinct aesthetic';
  }

  const details = (selections.detail || [])
    .map(id => DETAILS.find(o => o.id === id)?.prompt)
    .filter(Boolean) as string[];

  const aspectRatio = extractCleanAspectRatio(selections, customAspect);

  // Termos negativos acumulados
  const negativeTerms: string[] = [];
  if (negativePrompt.trim()) negativeTerms.push(negativePrompt.trim());
  if (characterLock.enabled) {
    const characterNeg = getCharacterNegativePrompt(characterLock);
    if (characterNeg) negativeTerms.push(characterNeg);
  }

  // Obter Blueprint do Personagem compatível com a plataforma
  const adjustedCharacterLock: CharacterLockState = {
    ...characterLock,
    targetAI: (currentTargetAI as any)
  };
  const blueprintProtocol = characterLock.enabled
    ? buildCharacterBlueprintPrompt(adjustedCharacterLock)
    : '';

  // -------------------------------------------------------------
  // PLATAFORMA 1: GENÉRICO / UNIVERSAL (Padrão atual do Shotcraft)
  // -------------------------------------------------------------
  if (platform === 'generic') {
    const sceneParts = [
      subjectClean,
      framing,
      angle,
      perspective,
      lens,
      lighting,
      env,
      ...styles,
      paper,
      colorText ? (selections.useColorRule603010 ? `using ${colorText}. The dominant color dominates the environment and mood. The secondary color supports secondary elements and characters. The accent color is strictly reserved for key focal points to guide the viewer's eye. Avoid equal color distribution` : `using color palette reference (${selections.colorPalette.join(', ')})`) : '',
      lut,
      cinematicGradingText,
      ...gradingTechs,
      modeClause,
      ...details,
      selections.aspect === 'custom' ? `--ar ${customAspect}` : (ASPECT_RATIOS.find(o => o.id === selections.aspect)?.prompt || `--ar ${aspectRatio}`)
    ];

    if (negativeTerms.length > 0) {
      sceneParts.push(`--no ${negativeTerms.join(', ')}`);
    }

    const sceneString = sceneParts.filter(Boolean).join(', ');

    if (characterLock.enabled && blueprintProtocol) {
      if (characterLock.targetAI === 'midjourney') {
        return {
          prompt: `${blueprintProtocol}, ${sceneString}`,
          platform,
          tips: config.tips,
          badge: config.badge
        };
      }
      return {
        prompt: `${blueprintProtocol}\n\n[SCENE EXECUTION]:\n${sceneString}`,
        platform,
        tips: config.tips,
        badge: config.badge
      };
    }

    return {
      prompt: sceneString,
      platform,
      tips: config.tips,
      badge: config.badge
    };
  }

  // -------------------------------------------------------------
  // PLATAFORMA 2: NANO BANANA (Google Imagen 3)
  // -------------------------------------------------------------
  if (platform === 'nano-banana') {
    const narrativeBlocks: string[] = [];

    // Linha de abertura cênica
    if (subjectClean) {
      narrativeBlocks.push(`A cinematic, high-fidelity photograph capturing ${subjectClean}.`);
    } else {
      narrativeBlocks.push(`A cinematic, high-fidelity photograph.`);
    }

    // Câmera, Enquadramento e Óptica
    const cameraClauses = [
      framing ? `composed in a ${framing}` : '',
      angle ? `from a ${angle}` : '',
      perspective ? `utilizing ${perspective}` : '',
      lens ? `captured with ${lens}` : ''
    ].filter(Boolean);

    if (cameraClauses.length > 0) {
      narrativeBlocks.push(`Camera & Framing: ${cameraClauses.join(', ')}.`);
    }

    // Ambiente e Iluminação
    const envLighting = [
      env ? `The environment is set in ${env}` : '',
      lighting ? `illuminated with ${lighting}` : ''
    ].filter(Boolean);

    if (envLighting.length > 0) {
      narrativeBlocks.push(`Environment & Light: ${envLighting.join(', ')}.`);
    }

    // Cores e Color Grading
    const colorClauses = [
      colorText ? `Color palette guided by ${colorText}` : '',
      lut ? `cinematic LUT tone: ${lut}` : '',
      cinematicGradingText || ''
    ].filter(Boolean);

    if (colorClauses.length > 0) {
      narrativeBlocks.push(`Palette & Grading: ${colorClauses.join(', ')}.`);
    }

    // Estilos, Textura e Detalhes
    const aestheticClauses = [
      ...styles,
      paper,
      modeClause,
      ...details,
      ...gradingTechs
    ].filter(Boolean);

    if (aestheticClauses.length > 0) {
      narrativeBlocks.push(`Aesthetics & Atmosphere: ${aestheticClauses.join(', ')}.`);
    }

    // Renderização e Proporção
    narrativeBlocks.push(
      `Technical Quality: Masterfully rendered in ${aspectRatio} aspect ratio. Realistic light physics, nuanced shadow roll-off, authentic surface materials, physical depth of field, and high visual dynamic range.`
    );

    let fullPrompt = narrativeBlocks.join(' ');

    if (negativeTerms.length > 0) {
      fullPrompt += `\n\n[Negative Guidance]: Avoid ${negativeTerms.join(', ')}.`;
    }

    if (characterLock.enabled && blueprintProtocol) {
      fullPrompt = `${blueprintProtocol}\n\n[SCENE EXECUTION]:\n${fullPrompt}`;
    }

    return {
      prompt: fullPrompt,
      platform,
      tips: config.tips,
      badge: config.badge
    };
  }

  // -------------------------------------------------------------
  // PLATAFORMA 3: MIDJOURNEY (v6.1 Raw)
  // -------------------------------------------------------------
  if (platform === 'midjourney') {
    const mjParts = [
      subjectClean,
      framing,
      angle,
      perspective,
      lens,
      lighting,
      env,
      ...styles,
      paper,
      colorText ? `color palette (${colorText})` : '',
      lut,
      cinematicGradingText,
      ...gradingTechs,
      modeClause,
      ...details
    ].filter(Boolean);

    let mjScene = mjParts.join(', ');

    // Parâmetros técnicos do Midjourney
    const flags: string[] = [
      `--ar ${aspectRatio}`,
      '--v 6.1',
      '--style raw',
      '--stylize 200'
    ];

    if (characterLock.enabled && characterLock.blueprintUrl?.trim()) {
      const cw = characterLock.fidelity === 'strict' ? 100 : 50;
      flags.push(`--cref ${characterLock.blueprintUrl.trim()} --cw ${cw}`);
    }

    if (negativeTerms.length > 0) {
      flags.push(`--no ${negativeTerms.join(', ')}`);
    }

    let finalMj = `${mjScene} ${flags.join(' ')}`;

    if (characterLock.enabled && blueprintProtocol) {
      finalMj = `${blueprintProtocol}, ${finalMj}`;
    }

    return {
      prompt: finalMj,
      platform,
      tips: config.tips,
      badge: config.badge
    };
  }

  // -------------------------------------------------------------
  // PLATAFORMA 4: CHATGPT / DALL-E 3 (GPT Imagens)
  // -------------------------------------------------------------
  if (platform === 'dalle') {
    const paragraphs: string[] = [];

    // 1. Sujeito e Enquadramento
    let p1 = `A professional, ultra-detailed ${mode === 'illustration' ? 'illustration' : 'cinematic photograph'} depicting ${subjectClean || 'a compelling cinematic subject'}.`;
    if (framing || angle || lens) {
      p1 += ` The scene is captured as a ${framing || 'clear shot'} from a ${angle || 'natural perspective'}, photographed on a ${lens || 'high-end cinematic lens'}.`;
    }
    paragraphs.push(p1);

    // 2. Cenário e Luz
    let p2 = '';
    if (env) p2 += `The background reveals ${env}. `;
    if (lighting) p2 += `The atmosphere is bathed in ${lighting}. `;
    if (colorText) p2 += `The overall color scheme incorporates ${colorText}. `;
    if (cinematicGradingText || lut) p2 += `Color grading evokes ${cinematicGradingText || lut}. `;
    if (p2.trim()) paragraphs.push(p2.trim());

    // 3. Estilo e Textura
    const styleDetailList = [...styles, ...details, ...gradingTechs].filter(Boolean);
    let p3 = `Rendered in a cohesive ${aspectRatio} aspect ratio format.`;
    if (styleDetailList.length > 0) {
      p3 += ` Emphasizing ${styleDetailList.join(', ')}, with authentic textures, natural atmospheric depth, and realistic tactile materials.`;
    }
    paragraphs.push(p3);

    // 4. Negativos em prosa
    if (negativeTerms.length > 0) {
      paragraphs.push(`Compositional restriction: Ensure the image is pristine, avoiding any ${negativeTerms.join(', ')}.`);
    }

    let dallePrompt = paragraphs.join(' ');

    if (characterLock.enabled && blueprintProtocol) {
      dallePrompt = `${blueprintProtocol}\n\n[SCENE INSTRUCTION]:\n${dallePrompt}`;
    }

    return {
      prompt: dallePrompt,
      platform,
      tips: config.tips,
      badge: config.badge
    };
  }

  // -------------------------------------------------------------
  // PLATAFORMA 5: FLUX.1 (Black Forest Labs)
  // -------------------------------------------------------------
  if (platform === 'flux') {
    const fluxParts = [
      subjectClean ? `Cinematic still of ${subjectClean}` : 'Cinematic photograph',
      env ? `in ${env}` : '',
      framing,
      angle,
      perspective,
      lens,
      lighting ? `illuminated by ${lighting}` : '',
      colorText ? `color palette ${colorText}` : '',
      cinematicGradingText || lut,
      ...styles,
      ...details,
      `film still format ${aspectRatio}`,
      'natural film texture, realistic optical depth, authentic surface materials, volumetric lighting interaction'
    ].filter(Boolean);

    let fluxPrompt = fluxParts.join(', ');

    if (characterLock.enabled && blueprintProtocol) {
      fluxPrompt = `${blueprintProtocol}\n\n[SCENE EXECUTION]:\n${fluxPrompt}`;
    }

    return {
      prompt: fluxPrompt,
      negativePrompt: negativeTerms.join(', '),
      platform,
      tips: config.tips,
      badge: config.badge
    };
  }

  // -------------------------------------------------------------
  // PLATAFORMA 6: STABLE DIFFUSION (SDXL / A1111 / ComfyUI)
  // -------------------------------------------------------------
  if (platform === 'stable-diffusion') {
    const sdQuality = ['(masterpiece:1.2)', '(high quality:1.2)', '(photorealistic:1.3)'];
    const sdParts = [
      ...sdQuality,
      subjectClean,
      framing ? `(${framing}:1.1)` : '',
      angle,
      lens ? `(${lens}:1.1)` : '',
      lighting ? `(${lighting}:1.15)` : '',
      env,
      ...styles.map(s => `(${s}:1.1)`),
      colorText ? `(${colorText}:1.1)` : '',
      lut,
      cinematicGradingText,
      ...details,
      `${aspectRatio} aspect ratio, cinematic lighting, ultra detailed 8k, ray tracing reflections`
    ].filter(Boolean);

    const sdNegativeBase = [
      '(worst quality:1.4)',
      '(low quality:1.4)',
      '(deformed, distorted, disfigured:1.3)',
      'bad anatomy',
      'bad hands',
      'missing fingers',
      'extra limbs',
      'poorly drawn face',
      'mutated',
      'blurry',
      'text',
      'watermark',
      'signature',
      'username',
      'out of focus'
    ];

    if (negativeTerms.length > 0) {
      sdNegativeBase.push(...negativeTerms);
    }

    let sdPrompt = sdParts.join(', ');

    if (characterLock.enabled && blueprintProtocol) {
      sdPrompt = `${blueprintProtocol}\n\n[SCENE PROMPT]:\n${sdPrompt}`;
    }

    return {
      prompt: sdPrompt,
      negativePrompt: sdNegativeBase.join(', '),
      platform,
      tips: config.tips,
      badge: config.badge
    };
  }

  // -------------------------------------------------------------
  // PLATAFORMA 7: LEONARDO AI (PhotoReal / Leonardo Diffusion XL)
  // -------------------------------------------------------------
  if (platform === 'leonardo') {
    const leoParts = [
      'Cinematic photograph',
      subjectClean,
      framing,
      angle,
      lens,
      lighting,
      env,
      ...styles,
      colorText ? `color graded in ${colorText}` : '',
      cinematicGradingText || lut,
      ...details,
      '8k resolution, octane render fidelity, volumetric atmosphere, hyperrealistic film still, ray tracing reflections',
      `${aspectRatio} composition`
    ].filter(Boolean);

    const leoNegative = [
      'blurry',
      'low quality',
      'deformed',
      'extra fingers',
      'bad anatomy',
      'mutated',
      'text',
      'watermark',
      'logo',
      'signature',
      ...negativeTerms
    ];

    let leoPrompt = leoParts.join(', ');

    if (characterLock.enabled && blueprintProtocol) {
      leoPrompt = `${blueprintProtocol}\n\n[SCENE EXECUTION]:\n${leoPrompt}`;
    }

    return {
      prompt: leoPrompt,
      negativePrompt: leoNegative.join(', '),
      platform,
      tips: config.tips,
      badge: config.badge
    };
  }

  // -------------------------------------------------------------
  // PLATAFORMA 8: IDEOGRAM v2
  // -------------------------------------------------------------
  if (platform === 'ideogram') {
    const ideoParts = [
      `A striking visual of ${subjectClean || 'a cinematic scene'}`,
      framing,
      angle,
      lens,
      env ? `in ${env}` : '',
      lighting ? `with ${lighting}` : '',
      colorText ? `palette ${colorText}` : '',
      ...styles,
      ...details,
      'clean visual geometry, sharp edges, balanced composition',
      `--ar ${aspectRatio}`
    ].filter(Boolean);

    if (negativeTerms.length > 0) {
      ideoParts.push(`--no ${negativeTerms.join(', ')}`);
    }

    let ideoPrompt = ideoParts.join(', ');

    if (characterLock.enabled && blueprintProtocol) {
      ideoPrompt = `${blueprintProtocol}\n\n${ideoPrompt}`;
    }

    return {
      prompt: ideoPrompt,
      platform,
      tips: config.tips,
      badge: config.badge
    };
  }

  // Fallback
  return {
    prompt: subjectClean,
    platform: 'generic',
    tips: config.tips,
    badge: config.badge
  };
}

