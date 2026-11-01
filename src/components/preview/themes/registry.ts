import type { PersonaTheme } from "@/types/persona";

export type ThemeConfig = {
  name: string;
  description: string;
  background: string;
  surface: string;
  foreground: string;
  muted: string;
  accent: string;
  border: string;
  avatarBackground: string;
  avatarForeground: string;
};

export const themes: Record<PersonaTheme, ThemeConfig> = {
  charcoal: {
    name: "Charcoal",
    description: "Dark, minimal, understated",
    background: "#242424",
    surface: "#303030",
    foreground: "#f5f5f5",
    muted: "#a3a3a3",
    accent: "#ffffff",
    border: "#414141",
    avatarBackground: "#ffffff",
    avatarForeground: "#242424",
  },

  midnight: {
    name: "Midnight",
    description: "Deep black, sleek and refined",
    background: "#090b16",
    surface: "#14182a",
    foreground: "#eef0ff",
    muted: "#9299b8",
    accent: "#8b91ff",
    border: "#292e48",
    avatarBackground: "#8b91ff",
    avatarForeground: "#090b16",
  },

  ocean: {
    name: "Ocean",
    description: "Cool blues, calm and focused",
    background: "#dcebf5",
    surface: "#f0f7fc",
    foreground: "#17354c",
    muted: "#66859c",
    accent: "#2476ae",
    border: "#c4dce9",
    avatarBackground: "#2476ae",
    avatarForeground: "#ffffff",
  },

  sunset: {
    name: "Sunset",
    description: "Warm gradients, bold energy",
    background: "#f8d5c4",
    surface: "#fff0e5",
    foreground: "#542b25",
    muted: "#a16b5d",
    accent: "#ef6847",
    border: "#edc1ad",
    avatarBackground: "#ef6847",
    avatarForeground: "#ffffff",
  },

  forest: {
    name: "Forest",
    description: "Earthy greens, natural and grounded",
    background: "#d9e4d7",
    surface: "#edf3e9",
    foreground: "#203b2b",
    muted: "#718b75",
    accent: "#34734b",
    border: "#c2d3c1",
    avatarBackground: "#34734b",
    avatarForeground: "#ffffff",
  },

  minimal: {
    name: "Minimal",
    description: "Clean whites, timeless simplicity",
    background: "#f5f5f2",
    surface: "#ffffff",
    foreground: "#202020",
    muted: "#858585",
    accent: "#171717",
    border: "#e5e5e2",
    avatarBackground: "#171717",
    avatarForeground: "#ffffff",
  },
  linen: {
    name: "Linen",
    description: "Warm paper, soft cards",
    background: "#eee8dc",
    surface: "#fffaf2",
    foreground: "#29221d",
    muted: "#81766d",
    accent: "#e9502b",
    border: "#e2d5c3",
    avatarBackground: "#e9502b",
    avatarForeground: "#1b1714",
  },

  ink: {
    name: "Ink",
    description: "Moody, quiet, elegant",
    background: "#171513",
    surface: "#24211e",
    foreground: "#f4eee5",
    muted: "#a69c91",
    accent: "#f4bd42",
    border: "#39332d",
    avatarBackground: "#f4bd42",
    avatarForeground: "#171513",
  },

  matcha: {
    name: "Matcha",
    description: "Calm greens, round edges",
    background: "#dce5ce",
    surface: "#e9efdf",
    foreground: "#284536",
    muted: "#71816f",
    accent: "#315f4b",
    border: "#c8d5bb",
    avatarBackground: "#315f4b",
    avatarForeground: "#ffffff",
  },

  tangerine: {
    name: "Tangerine",
    description: "Loud, chunky, fun",
    background: "#ff7944",
    surface: "#ff895a",
    foreground: "#21150f",
    muted: "#633c2c",
    accent: "#17120f",
    border: "#ee6b39",
    avatarBackground: "#17120f",
    avatarForeground: "#ffffff",
  },

  terminal: {
    name: "Terminal",
    description: "Green on black, for builders",
    background: "#080e0a",
    surface: "#111b14",
    foreground: "#a2ffb5",
    muted: "#72a77e",
    accent: "#8affaa",
    border: "#253b2b",
    avatarBackground: "#8affaa",
    avatarForeground: "#08100b",
  },

  blueprint: {
    name: "Blueprint",
    description: "Grid paper, drafting blue",
    background: "#204e9a",
    surface: "#285ba8",
    foreground: "#f3f6ff",
    muted: "#b5c9ed",
    accent: "#ffc94a",
    border: "#3d6bb0",
    avatarBackground: "#ffc94a",
    avatarForeground: "#172b4b",
  },

  peach: {
    name: "Peach",
    description: "Dreamy gradient, pillowy",
    background: "#f5d8d2",
    surface: "#fff0ed",
    foreground: "#462a36",
    muted: "#96717e",
    accent: "#bd557e",
    border: "#ebc4c7",
    avatarBackground: "#462a36",
    avatarForeground: "#ffffff",
  },

  newsprint: {
    name: "Newsprint",
    description: "Editorial, black and white",
    background: "#eeece5",
    surface: "#f8f7f1",
    foreground: "#171717",
    muted: "#77746e",
    accent: "#171717",
    border: "#d9d6cd",
    avatarBackground: "#171717",
    avatarForeground: "#ffffff",
  },

  aurora: {
    name: "Aurora",
    description: "Vivid bloom, dreamy",
    background: "#f2d8f6",
    surface: "#fff0f8",
    foreground: "#38233e",
    muted: "#92718f",
    accent: "#9855ee",
    border: "#e6c5ed",
    avatarBackground: "#9855ee",
    avatarForeground: "#ffffff",
  },
};

export const defaultTheme: PersonaTheme = "linen";
