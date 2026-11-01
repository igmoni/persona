"use client";

import { ArrowRight, Sparkles, WandSparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

type ChoiceDialogProps = {
  open: boolean;
  onBuildMyself: () => void;
  onGetHelp: () => void;
};

const ChoiceDialog = ({
  open,
  onBuildMyself,
  onGetHelp,
}: ChoiceDialogProps) => {
  if (!open) return null;

  return (
    <div
      className="bg-background/70 fixed inset-0 z-50 flex items-center justify-center p-5 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          // Intentionally keep the choice explicit.
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="build-choice-title"
        className="bg-card w-full max-w-[460px] rounded-2xl border p-6 shadow-2xl sm:p-8"
      >
        <div className="bg-primary/10 text-primary mb-5 flex size-11 items-center justify-center rounded-xl">
          <Sparkles size={21} />
        </div>

        <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
          Your Persona, your way
        </p>

        <h2
          id="build-choice-title"
          className="mt-2 text-2xl font-semibold tracking-tight"
        >
          How would you like to get started?
        </h2>

        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Build your page from the dashboard, or let us walk you through setting
          up your profile.
        </p>

        <div className="mt-7 space-y-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBuildMyself}
            className="h-auto w-full justify-between rounded-xl px-4 py-4"
          >
            <span className="flex items-center gap-3 text-left">
              <WandSparkles size={19} />
              <span>
                <span className="block text-sm font-semibold">
                  I&apos;ll build it myself
                </span>
                <span className="text-muted-foreground mt-1 block text-xs font-normal">
                  Take me straight to the dashboard.
                </span>
              </span>
            </span>
            <ArrowRight size={17} />
          </Button>

          <Button
            type="button"
            onClick={onGetHelp}
            className="h-auto w-full justify-between rounded-xl px-4 py-4"
          >
            <span className="flex items-center gap-3 text-left">
              <Sparkles size={19} />
              <span>
                <span className="block text-sm font-semibold">
                  Help me build it
                </span>
                <span className="text-primary-foreground/75 mt-1 block text-xs font-normal">
                  Guide me through a few quick steps.
                </span>
              </span>
            </span>
            <ArrowRight size={17} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ChoiceDialog };
