/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Step } from '../types';

interface StepperProps {
  steps: Step[];
  activeStep: number;
  setActiveStep: (step: number) => void;
  themeClasses: any;
}

export function Stepper({ steps, activeStep, setActiveStep, themeClasses }: StepperProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
      {steps.map((step, idx) => (
        <button
          key={idx}
          onClick={() => setActiveStep(idx)}
          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
            activeStep === idx 
              ? themeClasses.stepActive + ' shadow-sm' 
              : themeClasses.card + ' ' + themeClasses.textMuted + ' hover:border-zinc-400'
          }`}
        >
          {step.icon}
          <span className="text-sm font-medium">{step.title}</span>
        </button>
      ))}
    </div>
  );
}
