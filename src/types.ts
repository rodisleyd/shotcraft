/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";

export type ShotMode = 'storyboard' | 'cinematic' | 'illustration';
export type Theme = 'dark' | 'sepia';

export interface Option {
  id: string;
  label: string;
  prompt: string;
  description?: string;
  category: string;
  subCategory?: string;
  image?: string; // Para preview futuro
}

export interface SelectionState {
  framing: string;
  angle: string;
  perspective: string;
  aspect: string;
  lens: string;
  lighting: string;
  environment: string;
  style: string[];
  detail: string[];
}

export interface UserPreset {
  name: string;
  selections: SelectionState;
  subject: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  prompt: string;
  subject: string;
  negativePrompt?: string;
}

export interface Step {
  title: string;
  icon: ReactNode;
}

export interface ToastType {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
