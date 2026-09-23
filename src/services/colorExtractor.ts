/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { fetchImageAsDataUrl } from './imageService';

interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Converte RGB para HEX (#RRGGBB).
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Converte HEX para RGB.
 */
export function hexToRgb(hex: string): RGB | null {
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  }
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

/**
 * Calcula a distância euclidiana ponderada entre duas cores RGB (perceptual).
 */
function colorDistance(c1: RGB, c2: RGB): number {
  const rMean = (c1.r + c2.r) / 2;
  const dr = c1.r - c2.r;
  const dg = c1.g - c2.g;
  const db = c1.b - c2.b;
  // Redmean color distance formula
  return Math.sqrt(
    (2 + rMean / 256) * dr * dr +
    4 * dg * dg +
    (2 + (255 - rMean) / 256) * db * db
  );
}

/**
 * Extrai até N cores dominantes e vibrantes de uma imagem (Canvas / Data URL / File / URL).
 * Limite máximo seguro: 16 cores.
 */
export async function extractPaletteFromImage(
  imageSource: string | File | Blob,
  maxColors: number = 16
): Promise<string[]> {
  const targetColorCount = Math.min(Math.max(3, maxColors), 16);

  // 1. Obter Data URL da imagem
  let dataUrl: string;
  if (typeof imageSource === 'string') {
    if (imageSource.startsWith('data:') || imageSource.startsWith('blob:')) {
      dataUrl = imageSource;
    } else {
      dataUrl = await fetchImageAsDataUrl(imageSource);
    }
  } else {
    dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Erro ao ler arquivo de imagem.'));
      reader.readAsDataURL(imageSource);
    });
  }

  // 2. Carregar imagem em elemento HTMLImageElement
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Erro ao decodificar a imagem no navegador.'));
    image.src = dataUrl;
  });

  // 3. Renderizar em Canvas reduzido para amostragem rápida
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Não foi possível inicializar o contexto 2D do Canvas.');

  const sampleSize = 120; // 120x120 pixels = 14.400 amostras (extremamente rápido e preciso)
  const scale = Math.min(sampleSize / img.naturalWidth, sampleSize / img.naturalHeight, 1);
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // 4. Quantização e agregação de cores
  const rawClusters: { rgb: RGB; count: number }[] = [];
  const distanceThreshold = 35; // Distância mínima para considerar uma cor diferente

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 128) continue; // Ignora transparência

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const pixelRgb: RGB = { r, g, b };

    let matched = false;
    for (const cluster of rawClusters) {
      if (colorDistance(cluster.rgb, pixelRgb) < distanceThreshold) {
        // Média ponderada
        const total = cluster.count + 1;
        cluster.rgb.r = Math.round((cluster.rgb.r * cluster.count + r) / total);
        cluster.rgb.g = Math.round((cluster.rgb.g * cluster.count + g) / total);
        cluster.rgb.b = Math.round((cluster.rgb.b * cluster.count + b) / total);
        cluster.count = total;
        matched = true;
        break;
      }
    }

    if (!matched) {
      rawClusters.push({ rgb: pixelRgb, count: 1 });
    }
  }

  // 5. Ordenar por dominância (frequência)
  rawClusters.sort((a, b) => b.count - a.count);

  // 6. Refinar seleção garantindo diversidade cromática
  const finalColors: string[] = [];
  const finalRgbs: RGB[] = [];

  for (const cluster of rawClusters) {
    if (finalColors.length >= targetColorCount) break;

    // Garante que não haja cores excessivamente próximas na lista final
    const isTooClose = finalRgbs.some(existing => colorDistance(existing, cluster.rgb) < 28);
    if (!isTooClose || finalColors.length < Math.min(3, targetColorCount)) {
      finalRgbs.push(cluster.rgb);
      finalColors.push(rgbToHex(cluster.rgb.r, cluster.rgb.g, cluster.rgb.b));
    }
  }

  // Se por acaso a imagem tiver pouquíssimas cores sólidas, preenche até o mínimo necessário
  if (finalColors.length < 3 && rawClusters.length > 0) {
    for (const cluster of rawClusters) {
      const hex = rgbToHex(cluster.rgb.r, cluster.rgb.g, cluster.rgb.b);
      if (!finalColors.includes(hex)) {
        finalColors.push(hex);
      }
      if (finalColors.length >= targetColorCount) break;
    }
  }

  return finalColors;
}
