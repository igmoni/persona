
"use client";

import { Check } from "lucide-react";

const Progress = ({ currentStep }: { currentStep: number }) => {
  const totalSteps = 5;

  return (
    <div className="flex items-center justify-end">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const completed = step < currentStep;
        const active = step === currentStep;

        return (
          <div key={step} className="flex items-center">
            <div
              className={`flex size-8 items-center justify-center rounded-full border text-xs font-medium transition-all duration-300 ${
                completed
                  ? "border-primary bg-primary text-primary-foreground"
                  : active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground"
              }`}
            >
              {completed ? <Check size={14} /> : step}
            </div>

            {step !== totalSteps && (
              <div
                className={`h-px w-8 transition-colors duration-300 ${
                  completed ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export { Progress };
