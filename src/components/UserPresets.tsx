/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bookmark, Trash2, ChevronRight } from 'lucide-react';
import { UserPreset } from '../types';

interface UserPresetsProps {
  userPresets: UserPreset[];
  loadUserPreset: (preset: UserPreset) => void;
  deleteUserPreset: (index: number) => void;
  themeClasses: any;
}

export function UserPresets({ userPresets, loadUserPreset, deleteUserPreset, themeClasses }: UserPresetsProps) {
  if (userPresets.length === 0) return null;

  return (
    <div className={`border rounded-3xl p-6 transition-all ${themeClasses.card}`}>
      <div className="flex items-center gap-2 mb-6">
        <Bookmark size={20} className={themeClasses.accentText} />
        <h2 className="text-lg font-bold">Meus Presets</h2>
      </div>

      <div className="space-y-3">
        {userPresets.map((preset, idx) => (
          <div 
            key={idx}
            className={`group flex items-center justify-between p-4 rounded-2xl border transition-all hover:border-zinc-400 cursor-pointer ${themeClasses.bg}`}
            onClick={() => loadUserPreset(preset)}
          >
            <div className="flex flex-col">
              <span className="text-sm font-bold">{preset.name}</span>
              <span className={`text-[10px] opacity-60 ${themeClasses.textMuted}`}>{preset.subject.slice(0, 30)}...</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteUserPreset(idx);
                }}
                className="opacity-0 group-hover:opacity-100 p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
              >
                <Trash2 size={16} />
              </button>
              <ChevronRight size={16} className="opacity-40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
