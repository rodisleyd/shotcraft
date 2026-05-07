/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { XCircle } from 'lucide-react';

interface NegativePromptProps {
  negativePrompt: string;
  setNegativePrompt: (value: string) => void;
  themeClasses: any;
}

export function NegativePrompt({ negativePrompt, setNegativePrompt, themeClasses }: NegativePromptProps) {
  return (
    <div className={`p-6 rounded-2xl border transition-all ${themeClasses.card}`}>
      <div className="flex items-center gap-2 mb-4">
        <XCircle size={18} className="text-rose-500" />
        <h3 className="font-bold text-sm">Prompt Negativo (O que evitar)</h3>
      </div>
      <textarea
        value={negativePrompt}
        onChange={(e) => setNegativePrompt(e.target.value)}
        placeholder="Ex: low quality, blurry, distorted, text, watermark..."
        className={`w-full h-24 rounded-xl p-4 transition-all text-sm resize-none border outline-none focus:ring-2 focus:ring-rose-500/20 ${themeClasses.input}`}
      />
      <p className={`text-[10px] mt-2 ${themeClasses.textMuted}`}>
        Estes termos serão adicionados ao final do prompt (ex: --no low quality).
      </p>
    </div>
  );
}
