/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CharacterLockState } from '../types';

export const DEFAULT_CHARACTER_LOCK_STATE: CharacterLockState = {
  enabled: false,
  characterName: '',
  fidelity: 'strict',
  distinctiveFeatures: ''
};

/**
 * Gera o protocolo mestre de consistência baseado na prancha de construção.
 * Esta instrução em inglês técnico rigoroso força geradores (Midjourney, Flux, Stable Diffusion, DALL-E)
 * a utilizarem a imagem anexa como autoridade estrutural/blueprint prioritária.
 */
export function buildCharacterBlueprintPrompt(config: CharacterLockState): string {
  if (!config.enabled) return '';

  const namePart = config.characterName.trim()
    ? `designated as "${config.characterName.trim()}"`
    : 'shown in the reference sheet';

  const featuresPart = config.distinctiveFeatures?.trim()
    ? `\n- MANDATORY DISTINCTIVE TRAITS TO PRESERVE: ${config.distinctiveFeatures.trim()}`
    : '';

  if (config.fidelity === 'strict') {
    return `[CHARACTER CONSTRUCTION CONSISTENCY PROTOCOL: STRICT BLUEPRINT MODE]
Use the supplied character construction sheet as the PRIMARY AND AUTHORITATIVE STRUCTURAL REFERENCE for the character ${namePart}.
Before generating the requested image, carefully analyze and internally reconstruct the character from all geometric construction stages, head-to-body ratios, and anatomy lines shown in the reference sheet. Treat the sheet as a single unified visual model sheet, not as separate drawings.
STRICT STRUCTURAL PRESERVATION:
- Directly reproduce the geometric wireframe skull and facial structure, eye shape and spacing, nose/mouth placement, and silhouette.
- Maintain the exact head-to-body proportion ratio and anatomical mass.${featuresPart}
- Do not redesign, normalize, beautify, idealize, age, or substitute the character with generic AI default faces or body archetypes.
- When adapting to new poses, camera angles, or perspectives, strictly recalculate the volume according to the construction blueprint without distortion.
- If scene lighting, environment, or artistic style instructions conflict with character anatomy, PRIORITIZE CHARACTER CONSTRUCTION.
The final character must remain unmistakably the EXACT SAME INDIVIDUAL established in the blueprint.`;
  }

  // Modo Balanced
  return `[CHARACTER CONSTRUCTION CONSISTENCY PROTOCOL: BALANCED BLUEPRINT MODE]
Use the supplied character construction sheet as the foundational structural blueprint for the character ${namePart}.
Synthesize the construction stages, facial structure, eye shape, and body proportions into a unified, consistent character model.${featuresPart}
- Preserve key identifying anatomical traits, head-to-body ratios, and distinctive silhouette.
- Allow natural dynamic integration with the requested scene, dramatic lighting, and expressive camera angles while keeping the character identity 100% recognizable.
- Do not replace the character's facial and structural identity with generic archetypes.`;
}

export const CHARACTER_LOCK_GUIDE = {
  title: 'Como usar a Prancha de Construção no seu Gerador',
  steps: [
    {
      platform: 'Midjourney v6 / Niji 6',
      instruction: 'Faça upload da imagem da prancha no Discord/Web, copie o link e use como referência de personagem com `--cref <URL>` ou anexe a imagem no prompt antes do texto com peso alto (`--cw 100`).'
    },
    {
      platform: 'FLUX.1 / Stable Diffusion (WebUI / ComfyUI / Fooocus)',
      instruction: 'Coloque a imagem da prancha no campo Image Prompt / IP-Adapter / ControlNet Reference, e cole o prompt gerado pelo ShotCraft no campo de prompt positivo.'
    },
    {
      platform: 'ChatGPT / DALL-E 3',
      instruction: 'Anexe a imagem da prancha de construção no chat e cole o prompt completo do ShotCraft na mensagem.'
    }
  ]
};
