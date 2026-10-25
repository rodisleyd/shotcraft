/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CharacterLockState, CharacterTargetAI } from '../types';

export const DEFAULT_CHARACTER_LOCK_STATE: CharacterLockState = {
  enabled: false,
  characterName: '',
  fidelity: 'strict',
  distinctiveFeatures: '',
  targetAI: 'general',
  blueprintUrl: '',
  baseOutfit: '',
  physicalTraits: '',
  protectAnatomyNegative: true
};

export const CHARACTER_TARGET_AIS: { id: CharacterTargetAI; label: string; badge: string; desc: string }[] = [
  { id: 'general', label: 'Universal', badge: 'Multi-IA', desc: 'Protocolo de fidelidade estrutural compatível com qualquer gerador' },
  { id: 'nano-banana', label: 'Nano Banana / Imagen', badge: 'Google Imagen', desc: 'Sintaxe semântica de tokens com ancoragem anatômica visual e de iluminação' },
  { id: 'midjourney', label: 'Midjourney v6', badge: '--cref / --cw', desc: 'Parâmetros precisos de Character Reference e peso de fidelidade anatômica' },
  { id: 'flux', label: 'FLUX.1 / SD', badge: 'IP-Adapter', desc: 'Foco em identificador estrutural limpo para ControlNet e IP-Adapter' },
  { id: 'dalle', label: 'ChatGPT / DALL-E 3', badge: 'Context Sheet', desc: 'Diretiva em parágrafo natural para autoridade da imagem anexa na conversa' }
];

/**
 * Retorna os termos de prompt negativo para proteger a identidade do personagem.
 */
export function getCharacterNegativePrompt(config: CharacterLockState): string {
  if (!config.enabled || !config.protectAnatomyNegative) return '';

  const terms = [
    'different face',
    'altered facial features',
    'distorted facial proportions',
    'changing bone structure',
    'unrelated character archetype',
    'generic face',
    'inconsistent age',
    'morphed face',
    'asymmetrical facial reconstruction'
  ];

  return terms.join(', ');
}

/**
 * Gera o protocolo mestre de consistência customizado para a IA selecionada (incluindo Nano Banana).
 */
export function buildCharacterBlueprintPrompt(config: CharacterLockState): string {
  if (!config.enabled) return '';

  const targetAI = config.targetAI || 'general';
  const name = config.characterName.trim() || 'the subject character';
  const fidelity = config.fidelity || 'strict';
  const blueprintUrl = config.blueprintUrl?.trim();
  
  const physicalTraits = config.physicalTraits?.trim() 
    ? `Anatomical baseline: ${config.physicalTraits.trim()}.` 
    : '';
  
  const distinctiveFeatures = config.distinctiveFeatures?.trim()
    ? `Mandatory distinctive features: ${config.distinctiveFeatures.trim()}.`
    : '';

  const baseOutfit = config.baseOutfit?.trim()
    ? `Signature costume/wardrobe: ${config.baseOutfit.trim()}.`
    : '';

  const traitsCombined = [physicalTraits, distinctiveFeatures, baseOutfit].filter(Boolean).join(' ');

  // 1. NANO BANANA / GOOGLE IMAGEN
  if (targetAI === 'nano-banana') {
    if (fidelity === 'strict') {
      return `[NANO BANANA CHARACTER PERSISTENCE PROTOCOL: HARD BLUEPRINT LOCK]
Subject identity locked to the accompanying character construction sheet for "${name}".
Maintain 100% facial geometry identity, cranial bone structure, eye shape and spacing, nose-to-jaw proportions, and exact body silhouette derived from the visual model sheet.
${traitsCombined ? `${traitsCombined}\n` : ''}Do not alter facial features, facial contours, or render a generic substitute. Render the exact same individual with seamless scene lighting integration and photorealistic anatomical stability.`;
    } else {
      return `[NANO BANANA CHARACTER PERSISTENCE PROTOCOL: BALANCED BLUEPRINT]
Subject identity anchored to the accompanying construction sheet for "${name}".
Preserve recognizable facial structure, proportions, and iconic silhouette.
${traitsCombined ? `${traitsCombined}\n` : ''}Harmonize the character naturally into the scene with dynamic lighting while maintaining consistent face identity across shots.`;
    }
  }

  // 2. MIDJOURNEY v6 / NIJI
  if (targetAI === 'midjourney') {
    const urlRef = blueprintUrl ? `${blueprintUrl} ` : '';
    const crefFlag = blueprintUrl ? ` --cref ${blueprintUrl} --cw 100` : '';

    if (fidelity === 'strict') {
      return `${urlRef}character sheet reference lock for ${name}, exact facial structure replication, strict bone structure and silhouette fidelity${traitsCombined ? `, ${traitsCombined}` : ''}, no facial deviation${crefFlag}`;
    } else {
      return `${urlRef}character reference for ${name}, recognizable facial identity, anatomically coherent with reference sheet${traitsCombined ? `, ${traitsCombined}` : ''}${crefFlag}`;
    }
  }

  // 3. FLUX.1 / STABLE DIFFUSION
  if (targetAI === 'flux') {
    if (fidelity === 'strict') {
      return `[FLUX IP-ADAPTER IDENTITY LOCK: STRICT REFERENCE]
Consistent character token for ${name}, perfectly matching the supplied multi-angle blueprint model sheet.
Rigid facial landmark alignment, exact cranial proportions, fixed jawline and eye spacing.
${traitsCombined ? `${traitsCombined}\n` : ''}Zero morphological drift. The character in this scene must be the exact same human subject shown in the reference blueprint.`;
    } else {
      return `[FLUX IDENTITY PRESERVATION: BALANCED REFERENCE]
Consistent character identity for ${name}, adhering to the provided reference sheet.
Maintain facial identity, proportions, and distinct facial landmarks while adapting expressively to the camera perspective.
${traitsCombined ? `${traitsCombined}` : ''}`;
    }
  }

  // 4. CHATGPT / DALL-E 3
  if (targetAI === 'dalle') {
    if (fidelity === 'strict') {
      return `[DALL-E IDENTITY CONTINUITY DIRECTIVE: STRICT LOCK]
Before generating this image, inspect the uploaded character construction sheet for "${name}".
You MUST treat this sheet as the immutable anatomical blueprint:
1. Reconstruct the character's exact facial structure, bone proportions, eye placement, and silhouette.
2. ${traitsCombined || 'Preserve all identifying facial hallmarks from the sheet.'}
3. Do NOT invent a different face, do not beautify or substitute with generic stock aesthetics. The generated character must be undeniably the same individual.`;
    } else {
      return `[DALL-E IDENTITY CONTINUITY DIRECTIVE: BALANCED]
Base the character "${name}" directly on the uploaded construction sheet.
Maintain the character's recognizable facial features and proportions consistently throughout the scene.
${traitsCombined ? `Key attributes: ${traitsCombined}` : ''}`;
    }
  }

  // 5. UNIVERSAL / GENERAL
  if (fidelity === 'strict') {
    return `[CHARACTER CONSTRUCTION CONSISTENCY PROTOCOL: STRICT BLUEPRINT MODE]
Use the supplied character construction sheet as the PRIMARY AND AUTHORITATIVE STRUCTURAL REFERENCE for the character designated as "${name}".
Before generating the requested image, carefully analyze and internally reconstruct the character from all geometric construction stages, head-to-body ratios, and anatomy lines shown in the reference sheet.
STRICT STRUCTURAL PRESERVATION:
- Directly reproduce the geometric wireframe skull and facial structure, eye shape and spacing, nose/mouth placement, and silhouette.
- Maintain the exact head-to-body proportion ratio and anatomical mass.
${traitsCombined ? `- ${traitsCombined}\n` : ''}- Do not redesign, normalize, beautify, idealize, age, or substitute the character with generic AI default faces or body archetypes.
- When adapting to new poses, camera angles, or perspectives, strictly recalculate the volume according to the construction blueprint without distortion.
- If scene lighting, environment, or artistic style instructions conflict with character anatomy, PRIORITIZE CHARACTER CONSTRUCTION.
The final character must remain unmistakably the EXACT SAME INDIVIDUAL established in the blueprint.`;
  }

  // Modo Balanced Universal
  return `[CHARACTER CONSTRUCTION CONSISTENCY PROTOCOL: BALANCED BLUEPRINT MODE]
Use the supplied character construction sheet as the foundational structural blueprint for the character designated as "${name}".
Synthesize the construction stages, facial structure, eye shape, and body proportions into a unified, consistent character model.
${traitsCombined ? `${traitsCombined}\n` : ''}- Preserve key identifying anatomical traits, head-to-body ratios, and distinctive silhouette.
- Allow natural dynamic integration with the requested scene, dramatic lighting, and expressive camera angles while keeping the character identity 100% recognizable.
- Do not replace the character's facial and structural identity with generic archetypes.`;
}

export const CHARACTER_LOCK_GUIDE = {
  title: 'Como usar a Prancha de Construção no seu Gerador',
  steps: [
    {
      platform: 'Nano Banana / Google Imagen',
      instruction: 'Faça o upload da imagem da prancha de construção no campo de imagem de referência ou chat e cole o prompt completo gerado pelo ShotCraft.'
    },
    {
      platform: 'Midjourney v6 / Niji 6',
      instruction: 'Faça upload da imagem da prancha no Discord/Web, copie a URL direta e cole no campo "URL da Prancha" do ShotCraft (ele adicionará `--cref <URL> --cw 100` automaticamente).'
    },
    {
      platform: 'FLUX.1 / Stable Diffusion (WebUI / ComfyUI / Fooocus)',
      instruction: 'Coloque a imagem da prancha no nó/campo de Image Prompt / IP-Adapter / ControlNet Reference, e utilize o prompt do ShotCraft como prompt positivo.'
    },
    {
      platform: 'ChatGPT / DALL-E 3',
      instruction: 'Anexe a imagem da prancha de construção na mensagem e envie junto com o prompt do ShotCraft.'
    }
  ]
};
