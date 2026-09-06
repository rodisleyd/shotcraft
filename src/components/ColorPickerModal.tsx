/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Pipette, RotateCcw, Trash2, Plus, Sparkles, ZoomIn } from 'lucide-react';

interface ColorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  currentPalette: string[];
  maxColors?: number;
  onApplyPalette: (colors: string[]) => void;
  theme?: string;
  themeClasses?: any;
  addToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  currentPalette,
  maxColors = 16,
  onApplyPalette,
  addToast
}) => {
  const [colors, setColors] = useState<string[]>([]);
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const loupeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Inicializa paleta ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      setColors(currentPalette && currentPalette.length > 0 ? [...currentPalette] : []);
      setHoverColor(null);
      setCursorPos(null);
    }
  }, [isOpen, currentPalette]);

  // Prepara o canvas em memória quando a imagem carrega
  const handleImageLoad = () => {
    const img = imageRef.current;
    if (!img) return;

    try {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        offscreenCanvasRef.current = canvas;
        setIsImageLoaded(true);
      }
    } catch (e) {
      console.error('Erro ao inicializar canvas do conta-gotas:', e);
    }
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (n: number) => {
      const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  // Atualiza a lupa e a cor sob o cursor
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    const img = imageRef.current;
    const canvas = offscreenCanvasRef.current;
    if (!img || !canvas) return;

    const rect = img.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    const relX = clientX - rect.left;
    const relY = clientY - rect.top;

    if (relX < 0 || relX > rect.width || relY < 0 || relY > rect.height) {
      setHoverColor(null);
      setCursorPos(null);
      return;
    }

    const naturalX = Math.floor((relX / rect.width) * canvas.width);
    const naturalY = Math.floor((relY / rect.height) * canvas.height);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const pixel = ctx.getImageData(
        Math.max(0, Math.min(canvas.width - 1, naturalX)),
        Math.max(0, Math.min(canvas.height - 1, naturalY)),
        1,
        1
      ).data;

      const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
      setHoverColor(hex);
      setCursorPos({ x: clientX, y: clientY });

      // Desenhar visualização ampliada na lupa (zoom de 9x9 pixels ampliado para 84x84)
      const loupeCanvas = loupeCanvasRef.current;
      if (loupeCanvas) {
        const lCtx = loupeCanvas.getContext('2d');
        if (lCtx) {
          lCtx.imageSmoothingEnabled = false;
          lCtx.clearRect(0, 0, loupeCanvas.width, loupeCanvas.height);

          const sampleRadius = 5; // 11x11 pixels em torno do ponto
          const sx = Math.max(0, naturalX - sampleRadius);
          const sy = Math.max(0, naturalY - sampleRadius);
          const sSize = sampleRadius * 2 + 1;

          lCtx.drawImage(
            canvas,
            sx,
            sy,
            sSize,
            sSize,
            0,
            0,
            loupeCanvas.width,
            loupeCanvas.height
          );

          // Desenhar mira central
          const centerX = loupeCanvas.width / 2;
          const centerY = loupeCanvas.height / 2;
          const pixelSize = loupeCanvas.width / sSize;

          lCtx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
          lCtx.lineWidth = 1.5;
          lCtx.strokeRect(
            centerX - pixelSize / 2,
            centerY - pixelSize / 2,
            pixelSize,
            pixelSize
          );

          lCtx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
          lCtx.lineWidth = 1;
          lCtx.strokeRect(
            centerX - pixelSize / 2 - 1,
            centerY - pixelSize / 2 - 1,
            pixelSize + 2,
            pixelSize + 2
          );
        }
      }
    } catch (err) {
      // Ignorar erros ocasionais de limites
    }
  }, []);

  const handleMouseLeave = () => {
    setHoverColor(null);
    setCursorPos(null);
  };

  // Clique na imagem para capturar a cor
  const handleImageClick = () => {
    if (!hoverColor) return;

    if (colors.length >= maxColors) {
      addToast(`Limite máximo de ${maxColors} cores atingido nesta paleta.`, 'info');
      return;
    }

    setColors(prev => [...prev, hoverColor]);
    addToast(`Cor ${hoverColor} adicionada!`, 'success');
  };

  const handleRemoveColor = (index: number) => {
    setColors(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setColors([]);
    addToast('Paleta limpa.', 'info');
  };

  const handleReset = () => {
    setColors(currentPalette && currentPalette.length > 0 ? [...currentPalette] : []);
    addToast('Paleta restaurada para a original.', 'info');
  };

  const handleApply = () => {
    if (colors.length === 0) {
      addToast('Selecione pelo menos uma cor antes de aplicar.', 'error');
      return;
    }
    onApplyPalette(colors);
    addToast(`Paleta com ${colors.length} cores aplicada com sucesso!`, 'success');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          ref={containerRef}
          className="relative flex flex-col w-full max-w-5xl max-h-[94vh] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-zinc-100"
        >
          {/* Cabeçalho */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Pipette size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Conta-gotas de Cores
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Interativo
                  </span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Mova o cursor para inspecionar com a lupa e clique na imagem para capturar cores exatas.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Fechar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Área Central: Imagem Interativa com Canvas */}
          <div className="relative flex-1 min-h-[320px] max-h-[58vh] bg-zinc-950/80 overflow-hidden flex items-center justify-center p-4 select-none">
            <div className="relative inline-block max-w-full max-h-full rounded-xl overflow-hidden shadow-2xl border border-zinc-800/80">
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Referência para extração de cores"
                onLoad={handleImageLoad}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleImageClick}
                className="max-h-[52vh] max-w-full object-contain cursor-crosshair block"
              />

              {/* Lupa Flutuante (Loupe) */}
              {hoverColor && cursorPos && (
                <div
                  className="pointer-events-none fixed z-50 flex flex-col items-center transform -translate-x-1/2 -translate-y-[120px]"
                  style={{
                    left: cursorPos.x,
                    top: cursorPos.y
                  }}
                >
                  <div className="relative w-20 h-20 rounded-full border-2 border-white shadow-2xl overflow-hidden bg-black ring-4 ring-black/40">
                    <canvas
                      ref={loupeCanvasRef}
                      width={80}
                      height={80}
                      className="w-full h-full"
                    />
                  </div>
                  {/* Badge da cor abaixo da lupa */}
                  <div className="mt-1.5 px-2.5 py-1 rounded-full bg-zinc-900/95 border border-zinc-700 shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                    <span
                      className="w-3 h-3 rounded-full border border-white/40 shadow-inner"
                      style={{ backgroundColor: hoverColor }}
                    />
                    <span className="text-[11px] font-mono font-bold text-white tracking-wider">
                      {hoverColor}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Painel Inferior: Paleta Construída e Controles */}
          <div className="p-4 sm:p-5 border-t border-zinc-800 bg-zinc-900/80 space-y-4">
            {/* Visualização Contínua da Paleta */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Sua Paleta Personalizada
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {colors.length} / {maxColors} cores
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-[11px] font-semibold text-zinc-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-zinc-800 transition-colors flex items-center gap-1"
                    title="Restaurar paleta original"
                  >
                    <RotateCcw size={12} />
                    Restaurar
                  </button>
                  <button
                    type="button"
                    onClick={handleClearAll}
                    disabled={colors.length === 0}
                    className="text-[11px] font-semibold text-rose-400 hover:text-rose-300 px-2.5 py-1 rounded-lg hover:bg-rose-500/10 transition-colors flex items-center gap-1 disabled:opacity-40"
                  >
                    <Trash2 size={12} />
                    Limpar
                  </button>
                </div>
              </div>

              {/* Barra Contínua de Cores */}
              {colors.length > 0 ? (
                <div className="h-9 w-full rounded-xl overflow-hidden flex shadow-inner border border-zinc-700/80">
                  {colors.map((hex, i) => (
                    <div
                      key={`bar-${hex}-${i}`}
                      className="flex-1 h-full transition-all relative group cursor-pointer"
                      style={{ backgroundColor: hex }}
                      title={`Cor #${i + 1}: ${hex}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="h-9 w-full rounded-xl border border-dashed border-zinc-700 flex items-center justify-center text-xs text-zinc-500 font-medium">
                  Clique na imagem para começar a coletar cores
                </div>
              )}
            </div>

            {/* Lista de Swatches Selecionados */}
            {colors.length > 0 && (
              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-1">
                {colors.map((hex, index) => (
                  <div
                    key={`chip-${hex}-${index}`}
                    className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700 text-xs font-mono text-zinc-200 group hover:border-zinc-500 transition-colors"
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm shrink-0"
                      style={{ backgroundColor: hex }}
                    />
                    <span className="font-bold">{hex}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(index)}
                      className="p-1 rounded-md text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Remover esta cor"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Ações Finais */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleApply}
                disabled={colors.length === 0}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2"
              >
                <Check size={16} />
                <span>Aplicar Paleta no Projeto</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
