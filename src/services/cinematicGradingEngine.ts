import { CinematicGradingState } from '../types';
import { CINEMATIC_LOOKS_PRESETS } from '../data/cinematicGradingData';

export function buildCinematicGradingPrompt(
  grading: Partial<CinematicGradingState> | undefined,
  targetAI: string = 'general'
): string {
  if (!grading || !grading.enabled) return '';

  // Se um look predefinido estiver ativo e o usuário não customizou tudo
  if (grading.activeLookId) {
    const preset = CINEMATIC_LOOKS_PRESETS.find(p => p.id === grading.activeLookId);
    if (preset && !grading.isCustomized) {
      return formatForTargetAI(preset.promptSignature, targetAI, grading);
    }
  }

  const descriptors: string[] = [];

  // 1. Color Science & Base Aesthetic
  if (grading.colorScienceOutput === 'film-print') {
    if (grading.colorScienceInput === 'vintage') {
      descriptors.push('vintage film stock color science with rich photochemical emulation');
    } else {
      descriptors.push('photochemical film print color science');
    }
  } else if (grading.colorScienceOutput === 'cinematic') {
    descriptors.push('cinematic color science with controlled color gamut mapping');
  } else if (grading.colorScienceOutput === 'hdr-cinematic') {
    descriptors.push('high dynamic range wide gamut cinematic grade');
  } else if (grading.colorScienceOutput === 'high-contrast') {
    descriptors.push('high contrast dramatic color grading');
  } else if (grading.colorScienceOutput === 'rec709') {
    descriptors.push('accurate Rec.709 display color balance');
  }

  // 2. Contrast & Black Levels
  if (grading.contrast === 'soft') {
    descriptors.push('soft organic contrast');
  } else if (grading.contrast === 'high') {
    descriptors.push('high dynamic tonal contrast');
  } else if (grading.contrast === 'extreme') {
    descriptors.push('dramatic chiaroscuro tonal separation');
  } else if (grading.contrast === 'natural') {
    descriptors.push('balanced cinematic contrast');
  }

  if (grading.blackLevel === 'deep') {
    descriptors.push('deep controlled shadow blacks');
  } else if (grading.blackLevel === 'lifted') {
    descriptors.push('gently lifted shadow detail');
  } else if (grading.blackLevel === 'faded') {
    descriptors.push('faded nostalgic matte blacks');
  }

  // 3. Highlight Roll-off & Specular
  if (grading.highlightRollOff === 'creamy') {
    descriptors.push('smooth creamy highlight roll-off');
  } else if (grading.highlightRollOff === 'soft') {
    descriptors.push('soft highlight roll-off');
  } else if (grading.highlightRollOff === 'hard') {
    descriptors.push('crisp specular highlight definition');
  }

  // 4. Tonal Color Separation (Shadows vs Highlights)
  const shadowMap: Record<string, string> = {
    cool: 'cool blue shadow separation',
    blue: 'deep cobalt blue shadows',
    teal: 'cinematic teal shadow tones',
    green: 'subtle moody green shadows'
  };

  const highlightMap: Record<string, string> = {
    warm: 'warm luminous highlights',
    golden: 'radiant golden highlights',
    amber: 'deep amber highlights'
  };

  const shadowDesc = grading.shadowTone ? shadowMap[grading.shadowTone] : undefined;
  const highlightDesc = grading.highlightTone ? highlightMap[grading.highlightTone] : undefined;

  if (shadowDesc && highlightDesc) {
    descriptors.push(`${shadowDesc} balanced with ${highlightDesc}`);
  } else {
    if (shadowDesc) descriptors.push(shadowDesc);
    if (highlightDesc) descriptors.push(highlightDesc);
  }

  // 5. Selective Grading (Pele, Céu, Vegetação, Isolate Subject)
  if (grading.skinTone && grading.skinTone !== 'neutral') {
    const skinMap: Record<string, string> = {
      warm: 'natural warm skin tones',
      golden: 'golden radiant skin tones',
      rosy: 'soft rosy skin tones'
    };
    const skinText = skinMap[grading.skinTone] || 'natural skin tones';
    if (grading.isolateSubject) {
      descriptors.push(`${skinText} cleanly isolated from the environment`);
    } else {
      descriptors.push(skinText);
    }
  } else if (grading.isolateSubject) {
    descriptors.push('subject cleanly isolated from background with subtle chromatic separation');
  }

  if (grading.skyTone && grading.skyTone !== 'none') {
    const skyMap: Record<string, string> = {
      cyan: 'vibrant cinematic cyan sky',
      'deep-blue': 'deep polarized blue sky',
      teal: 'stylized teal sky atmosphere',
      desaturated: 'moody overcast desaturated sky'
    };
    if (skyMap[grading.skyTone]) descriptors.push(skyMap[grading.skyTone]);
  }

  if (grading.vegetationTone && grading.vegetationTone !== 'none') {
    const vegMap: Record<string, string> = {
      'natural-green': 'lush natural green foliage',
      emerald: 'rich emerald green vegetation',
      olive: 'vintage olive green foliage',
      'dark-green': 'dense dark green foliage'
    };
    if (vegMap[grading.vegetationTone]) descriptors.push(vegMap[grading.vegetationTone]);
  }

  // 6. Saturation
  if (grading.saturation === 'restrained') {
    descriptors.push('restrained refined saturation');
  } else if (grading.saturation === 'desaturated') {
    descriptors.push('desaturated muted color palette');
  } else if (grading.saturation === 'rich') {
    descriptors.push('rich vivid color density');
  }

  // 7. Film Halation
  if (grading.halationEnabled) {
    const intensity = grading.halationIntensity || 'subtle';
    const color = grading.halationColor || 'red-orange';
    const spread = grading.halationSpread || 'soft';
    descriptors.push(`${intensity} ${color} optical film halation with ${spread} glow around bright highlights`);
  }

  // 8. Film Grain & Format
  if (grading.filmGrainEnabled && grading.filmFormat && grading.filmFormat !== 'off') {
    const format = grading.filmFormat;
    const size = grading.grainSize || 'fine';
    const char = grading.grainCharacter || 'organic';
    descriptors.push(`${size} ${char} ${format} film grain texture`);
  }

  if (descriptors.length === 0) return '';

  const coherentClause = descriptors.join(', ');
  return formatForTargetAI(coherentClause, targetAI, grading);
}

function formatForTargetAI(
  basePrompt: string,
  targetAI: string,
  grading: Partial<CinematicGradingState>
): string {
  const cleanTarget = targetAI.toLowerCase();

  if (cleanTarget.includes('midjourney')) {
    // Para Midjourney: descrições densas com separação e estilo
    return `${basePrompt}, cinematic post-production direction, 35mm film aesthetic`;
  }

  if (cleanTarget.includes('flux')) {
    // Para Flux: descrição fotográfica limpa e precisa
    return `photographic color grading with ${basePrompt}`;
  }

  if (cleanTarget.includes('nano') || cleanTarget.includes('imagen') || cleanTarget.includes('gemini')) {
    // Para Nano Banana / Google Imagen: instruções de iluminação e renderização visual
    return `shot with cinematic lighting and ${basePrompt}, colorist supervised grade`;
  }

  if (cleanTarget.includes('dall-e') || cleanTarget.includes('dalle')) {
    // Para DALL-E: contexto cênico e paleta
    return `cinematic scene with ${basePrompt}`;
  }

  return basePrompt;
}
