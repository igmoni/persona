export type Profession =
  | "developer"
  | "designer"
  | "creator"
  | "musician"
  | "writer"
  | "business"
  | "photographer"
  | "just-me"
  | "comedian";

export type PersonaTheme =
  | "charcoal"
  | "midnight"
  | "ocean"
  | "sunset"
  | "forest"
  | "minimal"
  | "linen"
  | "ink"
  | "matcha"
  | "tangerine"
  | "terminal"
  | "blueprint"
  | "peach"
  | "newsprint"
  | "aurora";

export type SocialPlatform =
  | "instagram"
  | "x"
  | "tiktok"
  | "youtube"
  | "github"
  | "linkedin"
  | "medium"
  | "pinterest"
  | "dribbble"
  | "behance"
  | "spotify"
  | "email"
  | "website";

export type PersonaSocial = {
  id?: string;
  platform: SocialPlatform;
  url: string;
};

export type PersonaBlock = {
  id: string;
  type: string;
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
};

export type PersonaPreviewData = {
  username: string;
  fullName: string;
  profession: Profession;
  bio: string;
  avatarUrl?: string | null;
  theme: PersonaTheme;
  socials: PersonaSocial[];
  blocks: PersonaBlock[];
};
