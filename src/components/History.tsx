/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { History as HistoryIcon, Trash2, Clock, ArrowUpRight } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryProps {
  history: HistoryItem[];
  loadFromHistory: (item: HistoryItem) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
  themeClasses: any;
}

export function History({ history, loadFromHistory, removeFromHistory, clearHistory, themeClasses }: HistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className={`border rounded-3xl p-6 transition-all ${themeClasses.card}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <HistoryIcon size={20} className={themeClasses.accentText} />
          <h2 className="text-lg font-bold">Histórico Recente</h2>
        </div>
        <button 
          onClick={clearHistory}
          className="text-xs font-medium text-rose-500 hover:underline"
        >
          Limpar Tudo
        </button>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
        {history.map((item) => (
          <div 
            key={item.id}
            className={`group p-4 rounded-2xl border transition-all hover:border-zinc-400 cursor-pointer relative ${themeClasses.bg}`}
            onClick={() => loadFromHistory(item)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2 text-[10px] opacity-60">
                <Clock size={12} />
                {new Date(item.timestamp).toLocaleString()}
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromHistory(item.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 text-rose-500 hover:bg-rose-500/10 rounded-md transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <p className="text-sm font-bold line-clamp-1 mb-1">{item.subject}</p>
            <p className={`text-[10px] line-clamp-2 italic opacity-60 ${themeClasses.textMuted}`}>
              {item.prompt}
            </p>
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={16} className={themeClasses.accentText} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
