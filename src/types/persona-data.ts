export type PersonaPreviewData = {
  username: string;
  fullName: string;
  profession: string;
  bio: string;
  avatarUrl?: string;

  theme: string;

  socials: {
    platform: string;
    url: string;
  }[];

  blocks: {
    id: string;
    type: string;
    title?: string;
    description?: string;
    url?: string;
  }[];
};
