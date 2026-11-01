"use client";

import { useState } from "react";

import { PersonaPagePreview } from "@/components/preview/page-preview";
import { themes } from "@/components/preview/themes/registry";
import type { PersonaPreviewData } from "@/types/persona";

const initialData: PersonaPreviewData = {
  username: "mohanii",
  fullName: "Mohan S.P",
  profession: "developer",
  bio: "A little bit of everything I make and share.",
  avatarUrl: null,
  theme: "linen",
  socials: [
    {
      platform: "instagram",
      url: "https://instagram.com",
    },
    {
      platform: "x",
      url: "https://x.com",
    },
    {
      platform: "spotify",
      url: "https://spotify.com",
    },
  ],
  blocks: [
    {
      id: "1",
      type: "link",
      title: "Something I'm making",
      description:
        "A project, a habit, a place. Whatever you want people to see first.",
      url: "https://example.com",
    },
    {
      id: "2",
      type: "link",
      title: "My website",
      url: "https://example.com",
    },
  ],
};

export default function PreviewTest() {
  const [data, setData] = useState(initialData);

  return (
    <div className="grid min-h-screen gap-10 p-8 md:grid-cols-2">
      <div className="space-y-4">
        <input
          className="w-full rounded-lg border p-3"
          value={data.fullName}
          onChange={(e) => setData({ ...data, fullName: e.target.value })}
          placeholder="Full name"
        />

        <select
          className="w-full rounded-lg border p-3"
          value={data.theme}
          onChange={(e) =>
            setData({
              ...data,
              theme: e.target.value as PersonaPreviewData["theme"],
            })
          }
        >
          {Object.entries(themes).map(([key, theme]) => (
            <option key={key} value={key}>
              {theme.name}
            </option>
          ))}
        </select>
      </div>

      <PersonaPagePreview data={data} />
    </div>
  );
}
