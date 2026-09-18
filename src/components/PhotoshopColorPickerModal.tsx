/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Pipette, X, Check, Sparkles, HelpCircle } from 'lucide-react';

interface PhotoshopColorPickerModalProps {
  isOpen: boolean;
  initialColor: string; // HEX ex: '#EFA549'
  onClose: () => void;
  onApplyColor: (colorHex: string) => void;
  title?: string;
}

// Utilitários de conversão de cores
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num) || clean.length !== 6) {
    return { r: 239, g: 165, b: 73 };
  }
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  const toHex = (n: number) => clamp(n).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rgbToHsb(r: number, g: number, b: number): { h: number; s: number; b: number } {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rNorm) {
      h = ((gNorm - bNorm) / delta) % 6;
    } else if (max === gNorm) {
      h = (bNorm - rNorm) / delta + 2;
    } else {
      h = (rNorm - gNorm) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : Math.round((delta / max) * 100);
  const brightness = Math.round(max * 100);

  return { h, s, b: brightness };
}

function hsbToRgb(h: number, s: number, b: number): { r: number; g: number; b: number } {
  const sNorm = Math.max(0, Math.min(100, s)) / 100;
  const bNorm = Math.max(0, Math.min(100, b)) / 100;
  const hNorm = ((h % 360) + 360) % 360;

  const c = bNorm * sNorm;
  const x = c * (1 - Math.abs(((hNorm / 60) % 2) - 1));
  const m = bNorm - c;

  let rPrime = 0;
  let gPrime = 0;
  let bPrime = 0;

  if (hNorm >= 0 && hNorm < 60) {
    rPrime = c; gPrime = x; bPrime = 0;
  } else if (hNorm >= 60 && hNorm < 120) {
    rPrime = x; gPrime = c; bPrime = 0;
  } else if (hNorm >= 120 && hNorm < 180) {
    rPrime = 0; gPrime = c; bPrime = x;
  } else if (hNorm >= 180 && hNorm < 240) {
    rPrime = 0; gPrime = x; bPrime = c;
  } else if (hNorm >= 240 && hNorm < 300) {
    rPrime = x; gPrime = 0; bPrime = c;
  } else {
    rPrime = c; gPrime = 0; bPrime = x;
  }

  return {
    r: Math.round((rPrime + m) * 255),
    g: Math.round((gPrime + m) * 255),
    b: Math.round((bPrime + m) * 255)
  };
}

export const PhotoshopColorPickerModal: React.FC<PhotoshopColorPickerModalProps> = ({
  isOpen,
  initialColor,
  onClose,
  onApplyColor,
  title = 'Seletor de Cores'
}) => {
  // Cores HSB, RGB e HEX ativas
  const [hue, setHue] = useState<number>(33);
  const [sat, setSat] = useState<number>(69);
  const [bri, setBri] = useState<number>(94);

  const [rgb, setRgb] = useState<{ r: number; g: number; b: number }>({ r: 239, g: 165, b: 73 });
  const [hexInput, setHexInput] = useState<string>('EFA549');
  const [originalHex, setOriginalHex] = useState<string>('#EFA549');

  const satBriBoxRef = useRef<HTMLDivElement | null>(null);
  const hueSliderRef = useRef<HTMLDivElement | null>(null);
  const isDraggingSatBri = useRef(false);
  const isDraggingHue = useRef(false);

  // Inicializa a cor ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      const cleanHex = initialColor?.startsWith('#') ? initialColor : `#${initialColor || 'EFA549'}`;
      setOriginalHex(cleanHex.toUpperCase());
      const initialRgb = hexToRgb(cleanHex);
      const initialHsb = rgbToHsb(initialRgb.r, initialRgb.g, initialRgb.b);

      setHue(initialHsb.h);
      setSat(initialHsb.s);
      setBri(initialHsb.b);
      setRgb(initialRgb);
      setHexInput(cleanHex.replace('#', '').toUpperCase());
    }
  }, [isOpen, initialColor]);

  // Atualiza RGB e HEX quando HSB muda
  const updateFromHsb = useCallback((h: number, s: number, b: number) => {
    const newRgb = hsbToRgb(h, s, b);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHue(h);
    setSat(s);
    setBri(b);
    setRgb(newRgb);
    setHexInput(newHex.replace('#', ''));
  }, []);

  // Atualiza HSB e HEX quando RGB muda
  const updateFromRgb = (r: number, g: number, b: number) => {
    const newHsb = rgbToHsb(r, g, b);
    const newHex = rgbToHex(r, g, b);
    setHue(newHsb.h);
    setSat(newHsb.s);
    setBri(newHsb.b);
    setRgb({ r, g, b });
    setHexInput(newHex.replace('#', ''));
  };

  // Atualiza quando HEX digitado muda
  const handleHexInputChange = (val: string) => {
    const clean = val.replace('#', '').toUpperCase().slice(0, 6);
    setHexInput(clean);
    if (clean.length === 3 || clean.length === 6) {
      const newRgb = hexToRgb(clean);
      const newHsb = rgbToHsb(newRgb.r, newRgb.g, newRgb.b);
      setHue(newHsb.h);
      setSat(newHsb.s);
      setBri(newHsb.b);
      setRgb(newRgb);
    }
  };

  // Movimento no Box 2D Saturation / Brightness
  const handleSatBriMove = useCallback((clientX: number, clientY: number) => {
    if (!satBriBoxRef.current) return;
    const rect = satBriBoxRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

    const newSat = Math.round((x / rect.width) * 100);
    const newBri = Math.round((1 - y / rect.height) * 100);

    updateFromHsb(hue, newSat, newBri);
  }, [hue, updateFromHsb]);

  // Movimento no Slider Vertical de Matiz (HUE)
  const handleHueMove = useCallback((clientY: number) => {
    if (!hueSliderRef.current) return;
    const rect = hueSliderRef.current.getBoundingClientRect();
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
    const newHue = Math.round((y / rect.height) * 360);
    const clampedHue = Math.max(0, Math.min(360, newHue === 360 ? 0 : newHue));

    updateFromHsb(clampedHue, sat, bri);
  }, [sat, bri, updateFromHsb]);

  // Event Listeners globais de Mouse Drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSatBri.current) {
        handleSatBriMove(e.clientX, e.clientY);
      } else if (isDraggingHue.current) {
        handleHueMove(e.clientY);
      }
    };

    const handleMouseUp = () => {
      isDraggingSatBri.current = false;
      isDraggingHue.current = false;
    };

    if (isOpen) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isOpen, handleSatBriMove, handleHueMove]);

  // EyeDropper API do Navegador (Conta-Gotas Universal)
  const handleEyeDropper = async () => {
    if ('EyeDropper' in window) {
      try {
        const eyeDropper = new (window as any).EyeDropper();
        const result = await eyeDropper.open();
        if (result && result.sRGBHex) {
          const pickedHex = result.sRGBHex.toUpperCase();
          const pickedRgb = hexToRgb(pickedHex);
          const pickedHsb = rgbToHsb(pickedRgb.r, pickedRgb.g, pickedRgb.b);
          setHue(pickedHsb.h);
          setSat(pickedHsb.s);
          setBri(pickedHsb.b);
          setRgb(pickedRgb);
          setHexInput(pickedHex.replace('#', ''));
        }
      } catch (e) {
        // Usuário cancelou ou pressionou ESC
      }
    } else {
      alert('A API de Conta-Gotas nativa não é suportada neste navegador. Utilize o gradiente visual para selecionar a cor.');
    }
  };

  if (!isOpen) return null;

  const currentHex = `#${hexInput}`;
  const pureHueColor = `hsl(${hue}, 100%, 50%)`;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* Caixa do Seletor Estilo Photoshop */}
      <div className="relative z-10 bg-[#2d2d2d] text-[#e0e0e0] border border-[#3e3e3e] rounded-xl shadow-2xl p-5 w-full max-w-[560px] font-sans select-none animate-in fade-in zoom-in-95 duration-200">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-3 border-b border-[#3c3c3c] mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ef6c00] inline-block shadow-sm" />
            <h3 className="text-sm font-bold text-zinc-100 tracking-wide">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Corpo Principal do Seletor */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
          
          {/* Coluna Esquerda: Box 2D Sat/Bri + Slider Vertical Hue */}
          <div className="sm:col-span-7 flex gap-3.5 items-center justify-center">
            
            {/* Box 2D: Saturation (Eixo X) / Brightness (Eixo Y) */}
            <div
              ref={satBriBoxRef}
              onMouseDown={(e) => {
                isDraggingSatBri.current = true;
                handleSatBriMove(e.clientX, e.clientY);
              }}
              style={{ backgroundColor: pureHueColor }}
              className="relative w-[230px] h-[230px] rounded-sm border border-[#1e1e1e] cursor-crosshair overflow-hidden shadow-inner flex-shrink-0"
            >
              {/* Gradiente Branco Horizontal (Saturação) */}
              <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent pointer-events-none" />
              {/* Gradiente Preto Vertical (Brilho) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />

              {/* Mira / Círculo de Seleção */}
              <div
                style={{
                  left: `${sat}%`,
                  top: `${100 - bri}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className="absolute w-4 h-4 rounded-full border-2 border-white shadow-[0_0_2px_1px_rgba(0,0,0,0.8)] pointer-events-none"
              />
            </div>

            {/* Slider Vertical de Hue (Matiz) */}
            <div
              ref={hueSliderRef}
              onMouseDown={(e) => {
                isDraggingHue.current = true;
                handleHueMove(e.clientY);
              }}
              className="relative w-[28px] h-[230px] rounded-sm border border-[#1e1e1e] cursor-pointer shadow-inner"
              style={{
                background: 'linear-gradient(to bottom, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
              }}
            >
              {/* Setas do Ponteiro do Hue */}
              <div
                style={{
                  top: `${(hue / 360) * 100}%`,
                  transform: 'translateY(-50%)'
                }}
                className="absolute -left-[5px] -right-[5px] pointer-events-none flex justify-between items-center"
              >
                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
              </div>
            </div>

          </div>

          {/* Coluna Direita: Preview Novo/Atual, Botões, HSB, RGB, HEX, Conta-Gotas */}
          <div className="sm:col-span-5 flex flex-col justify-between space-y-3">
            
            {/* Topo: Comparador Novo vs Atual & Botão Conta-Gotas */}
            <div className="flex gap-3 items-start justify-between">
              
              {/* Retângulo Duplo: Novo (cima) / Atual (baixo) */}
              <div className="flex flex-col items-center">
                <div className="text-[10px] text-zinc-400 font-semibold mb-0.5">novo</div>
                <div className="w-16 h-14 rounded border border-[#1e1e1e] overflow-hidden flex flex-col shadow-md">
                  {/* Nova Cor */}
                  <div 
                    className="flex-1 transition-colors"
                    style={{ backgroundColor: currentHex }}
                    title={`Nova Cor: ${currentHex}`}
                  />
                  {/* Cor Atual Original */}
                  <div 
                    className="flex-1 cursor-pointer transition-colors"
                    style={{ backgroundColor: originalHex }}
                    onClick={() => {
                      const origRgb = hexToRgb(originalHex);
                      const origHsb = rgbToHsb(origRgb.r, origRgb.g, origRgb.b);
                      setHue(origHsb.h);
                      setSat(origHsb.s);
                      setBri(origHsb.b);
                      setRgb(origRgb);
                      setHexInput(originalHex.replace('#', ''));
                    }}
                    title={`Restaurar Cor Atual: ${originalHex}`}
                  />
                </div>
                <div className="text-[10px] text-zinc-400 font-semibold mt-0.5">atual</div>
              </div>

              {/* Botões OK e Cancelar */}
              <div className="flex flex-col gap-1.5 flex-1 pl-2">
                <button
                  type="button"
                  onClick={() => {
                    onApplyColor(currentHex);
                    onClose();
                  }}
                  className="w-full py-1.5 px-3 bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white text-xs font-bold rounded border border-[#555] shadow-sm transition-all flex items-center justify-center gap-1 active:scale-95"
                >
                  <Check size={13} className="text-emerald-400" />
                  OK
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-1.5 px-3 bg-[#383838] hover:bg-[#444] text-zinc-300 text-xs font-semibold rounded border border-[#484848] transition-all active:scale-95"
                >
                  Cancelar
                </button>

                {/* Botão de Conta-Gotas Universal */}
                {'EyeDropper' in window && (
                  <button
                    type="button"
                    onClick={handleEyeDropper}
                    className="w-full mt-1 py-1.5 px-2.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-[11px] font-bold rounded transition-all flex items-center justify-center gap-1.5 active:scale-95"
                    title="Conta-gotas: clique em qualquer lugar da tela para capturar a cor"
                  >
                    <Pipette size={13} />
                    Conta-Gotas
                  </button>
                )}
              </div>

            </div>

            {/* Entradas Numéricas HSB & RGB (Estilo Photoshop) */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#242424] p-3 rounded-lg border border-[#383838]">
              
              {/* Bloco HSB */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-400">H:</span>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min={0}
                      max={360}
                      value={hue}
                      onChange={(e) => updateFromHsb(Number(e.target.value) || 0, sat, bri)}
                      className="w-12 bg-[#1c1c1c] border border-[#3e3e3e] text-right px-1 py-0.5 rounded text-xs text-white focus:border-indigo-500 focus:outline-none"
                    />
                    <span className="text-zinc-500 ml-1 text-[10px]">°</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-400">S:</span>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={sat}
                      onChange={(e) => updateFromHsb(hue, Number(e.target.value) || 0, bri)}
                      className="w-12 bg-[#1c1c1c] border border-[#3e3e3e] text-right px-1 py-0.5 rounded text-xs text-white focus:border-indigo-500 focus:outline-none"
                    />
                    <span className="text-zinc-500 ml-1 text-[10px]">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-400">B:</span>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={bri}
                      onChange={(e) => updateFromHsb(hue, sat, Number(e.target.value) || 0)}
                      className="w-12 bg-[#1c1c1c] border border-[#3e3e3e] text-right px-1 py-0.5 rounded text-xs text-white focus:border-indigo-500 focus:outline-none"
                    />
                    <span className="text-zinc-500 ml-1 text-[10px]">%</span>
                  </div>
                </div>
              </div>

              {/* Bloco RGB */}
              <div className="space-y-1.5 border-l border-[#383838] pl-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-400">R:</span>
                  <input
                    type="number"
                    min={0}
                    max={255}
                    value={rgb.r}
                    onChange={(e) => updateFromRgb(Math.min(255, Number(e.target.value) || 0), rgb.g, rgb.b)}
                    className="w-12 bg-[#1c1c1c] border border-[#3e3e3e] text-right px-1 py-0.5 rounded text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-400">G:</span>
                  <input
                    type="number"
                    min={0}
                    max={255}
                    value={rgb.g}
                    onChange={(e) => updateFromRgb(rgb.r, Math.min(255, Number(e.target.value) || 0), rgb.b)}
                    className="w-12 bg-[#1c1c1c] border border-[#3e3e3e] text-right px-1 py-0.5 rounded text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-400">B:</span>
                  <input
                    type="number"
                    min={0}
                    max={255}
                    value={rgb.b}
                    onChange={(e) => updateFromRgb(rgb.r, rgb.g, Math.min(255, Number(e.target.value) || 0))}
                    className="w-12 bg-[#1c1c1c] border border-[#3e3e3e] text-right px-1 py-0.5 rounded text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

            </div>

            {/* Campo de Código HEX */}
            <div className="flex items-center justify-between bg-[#242424] px-3 py-2 rounded-lg border border-[#383838]">
              <span className="text-xs font-bold text-zinc-300 flex items-center gap-1">
                <span>#</span>
                <span>HEX:</span>
              </span>
              <input
                type="text"
                maxLength={6}
                value={hexInput}
                onChange={(e) => handleHexInputChange(e.target.value)}
                className="w-24 bg-[#1c1c1c] border border-[#3e3e3e] text-center font-mono font-bold tracking-widest px-2 py-1 rounded text-xs text-amber-400 focus:border-amber-500 focus:outline-none uppercase"
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
