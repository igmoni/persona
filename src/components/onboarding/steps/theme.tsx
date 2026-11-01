"use client";

import type { PersonaTheme } from "@/types/persona";
import { themes } from "@/components/preview/themes/registry";

type ThemeStepProps = {
  value: PersonaTheme;
  onChange: (theme: PersonaTheme) => void;
};

export function Theme({ value, onChange }: ThemeStepProps) {
  return (
    <div className="space-y-7">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Make it yours.
        </h2>

        <p className="text-sm text-muted-foreground">
          Pick a look that feels like you. You can change it anytime.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {Object.entries(themes).map(([key, theme]) => {
          const selected = value === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key as PersonaTheme)}
              className={`overflow-hidden rounded-xl border-2 text-left transition-all ${
                selected
                  ? "border-primary ring-2 ring-primary/15"
                  : "border-transparent hover:border-muted-foreground/40"
              }`}
            >
              {/* Theme preview */}
              <div
                className="relative flex h-28 flex-col justify-between p-3"
                style={{ background: theme.background }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="size-7 rounded-full"
                    style={{ background: theme.accent }}
                  />

                  <div className="space-y-1">
                    <div
                      className="h-1.5 w-14 rounded-full"
                      style={{ background: theme.foreground }}
                    />
                    <div
                      className="h-1 w-10 rounded-full"
                      style={{ background: theme.muted }}
                    />
                  </div>
                </div>

                <div
                  className="flex h-8 items-center rounded-md px-2"
                  style={{
                    background: theme.surface,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <div
                    className="h-1.5 w-16 rounded-full"
                    style={{ background: theme.foreground }}
                  />
                </div>

                <div className="absolute bottom-3 right-3 flex gap-1">
                  {[theme.accent, theme.muted, theme.foreground].map(
                    (color, index) => (
                      <div
                        key={index}
                        className="size-3 rounded-full"
                        style={{ background: color }}
                      />
                    ),
                  )}
                </div>
              </div>

              {/* Theme name */}
              <div className="flex items-center justify-between bg-background px-3 py-2.5">
                <span className="text-sm font-medium">{theme.name}</span>

                <div
                  className={`size-4 rounded-full border flex items-center justify-center ${
                    selected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/40"
                  }`}
                >
                  {selected && (
                    <div className="size-1.5 rounded-full bg-primary-foreground" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
