"use client";

import {
  BriefcaseBusiness,
  Camera,
  Code2,
  Megaphone,
  Music2,
  Palette,
  PenLine,
  UserRound,
  Video,
} from "lucide-react";

import type { Profession } from "@/types/persona";

const professions: {
  id: Profession;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    id: "developer",
    label: "Developer",
    description: "I build software and digital products.",
    icon: Code2,
  },
  {
    id: "designer",
    label: "Designer",
    description: "I create visual experiences.",
    icon: Palette,
  },
  {
    id: "creator",
    label: "Content creator",
    description: "I create content and share ideas.",
    icon: Video,
  },
  {
    id: "musician",
    label: "Musician",
    description: "I make music and sounds.",
    icon: Music2,
  },
  {
    id: "writer",
    label: "Writer",
    description: "I write stories, articles and words.",
    icon: PenLine,
  },
  {
    id: "photographer",
    label: "Photographer",
    description: "I capture moments and stories.",
    icon: Camera,
  },
  {
    id: "business",
    label: "Entrepreneur",
    description: "I build businesses and ideas.",
    icon: BriefcaseBusiness,
  },
  {
    id: "comedian",
    label: "Artist",
    description: "I make comedy shows",
    icon: Megaphone,
  },
  {
    id: "just-me",
    label: "Just me",
    description: "I don't want to fit into a category.",
    icon: UserRound,
  },
];

type ProfessionStepProps = {
  value: Profession;
  onChange: (value: Profession) => void;
};

const Profession = ({ value, onChange }: ProfessionStepProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
          Step 02 — Your work
        </p>

        <h1 className="text-3xl leading-tight font-medium tracking-tight md:text-4xl">
          What do you do?
        </h1>

        <p className="text-muted-foreground text-sm leading-relaxed">
          Choose what best describes you. This helps us shape your Persona.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {professions.map((profession) => {
          const Icon = profession.icon;
          const selected = value === profession.id;

          return (
            <button
              key={profession.id}
              type="button"
              onClick={() => onChange(profession.id)}
              aria-pressed={selected}
              className={`group flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                selected
                  ? "border-primary bg-primary/5 ring-primary/20 ring-2"
                  : "border-border hover:border-primary/50 hover:bg-muted/40"
              }`}
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground group-hover:text-foreground"
                }`}
              >
                <Icon size={19} strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold">{profession.label}</p>

                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  {profession.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { Profession };
