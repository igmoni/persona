import Image from "next/image";

import { InstagramIcon, YoutubeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight, Globe, Mail, Music2 } from "lucide-react";

import type { PersonaPreviewData, SocialPlatform } from "@/types/persona";
import { Profession } from "@/types/persona";

import { PersonaPhoneFrame } from "./phone-frame";
import { themes } from "./themes/registry";

type PersonaPagePreviewProps = {
  data: PersonaPreviewData;
};

const professionLabels: Record<Profession, string> = {
  developer: "Developer",
  designer: "Designer",
  creator: "Content Creator",
  musician: "Musician",
  writer: "Writer",
  photographer: "Photographer",
  business: "Entrepreneur",
  comedian: "Artist",
  "just-me": "Independent",
};

const renderSocialIcon = (platform: SocialPlatform) => {
  switch (platform) {
    case "instagram":
      return <HugeiconsIcon icon={InstagramIcon} size={20} />;

    case "youtube":
      return <HugeiconsIcon icon={YoutubeIcon} size={20} />;

    case "spotify":
      return <Music2 size={20} strokeWidth={1.8} />;

    case "email":
      return <Mail size={20} strokeWidth={1.8} />;

    case "website":
      return <Globe size={20} strokeWidth={1.8} />;

    default:
      return null;
  }
};

const getInitials = (name: string) => {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "P"
  );
};

export const PersonaPagePreview = ({ data }: PersonaPagePreviewProps) => {
  const theme = themes[data.theme];

  return (
    <PersonaPhoneFrame>
      <div
        className="min-h-[720px] px-5 pt-14 pb-8"
        style={{
          backgroundColor: theme.background,
          color: theme.foreground,
        }}
      >
        {/* Profile */}
        <section className="flex flex-col items-center text-center">
          {data.avatarUrl ? (
            <Image
              src={data.avatarUrl}
              alt={data.fullName || "Profile"}
              width={92}
              height={92}
              className="size-[92px] rounded-full border-[3px] object-cover"
              style={{ borderColor: theme.border }}
            />
          ) : (
            <div
              className="flex size-[92px] items-center justify-center rounded-full border-[3px] text-3xl font-semibold"
              style={{
                backgroundColor: theme.avatarBackground,
                color: theme.avatarForeground,
                borderColor: theme.surface,
              }}
            >
              {getInitials(data.fullName)}
            </div>
          )}

          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            {data.fullName || "Your name"}
          </h2>

          <p
            className="mt-1 max-w-[280px] text-sm leading-relaxed"
            style={{ color: theme.muted }}
          >
            {data.bio || "A little bit about yourself."}
          </p>
          <p
            className="mt-1 text-xs font-medium"
            style={{ color: theme.accent }}
          >
            {professionLabels[data.profession]}
          </p>
        </section>

        {/* Socials */}
        <section className="mt-6 flex min-h-8 items-center justify-center gap-5">
          {data.socials.map((social) => {
            return (
              <a
                key={social.id ?? social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.platform}
                style={{ color: theme.foreground }}
              >
                {renderSocialIcon(social.platform) ?? (
                  <span className="text-xs font-semibold uppercase">
                    {social.platform.slice(0, 2)}
                  </span>
                )}
              </a>
            );
          })}
        </section>

        {/* Blocks */}
        <section className="mt-8 space-y-4">
          <div className="flex items-center gap-3">
            <div
              className="h-px flex-1"
              style={{ backgroundColor: theme.border }}
            />
            <span
              className="text-[10px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: theme.muted }}
            >
              Right now
            </span>
            <div
              className="h-px flex-1"
              style={{ backgroundColor: theme.border }}
            />
          </div>

          {data.blocks.length > 0 ? (
            data.blocks.map((block) => (
              <a
                key={block.id}
                href={block.url || "#"}
                target={block.url ? "_blank" : undefined}
                rel={block.url ? "noreferrer" : undefined}
                className="block rounded-2xl border p-4 shadow-sm transition-transform hover:-translate-y-0.5"
                style={{
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold">
                    {block.title || "Untitled block"}
                  </h3>
                  <ArrowUpRight size={16} style={{ color: theme.muted }} />
                </div>

                {block.description && (
                  <p
                    className="mt-1 text-xs leading-relaxed"
                    style={{ color: theme.muted }}
                  >
                    {block.description}
                  </p>
                )}
              </a>
            ))
          ) : (
            <div
              className="rounded-2xl border p-4"
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.border,
              }}
            >
              <p className="text-sm font-semibold">Something I&apos;m making</p>
              <p
                className="mt-1 text-xs leading-relaxed"
                style={{ color: theme.muted }}
              >
                A project, a habit, a place. Whatever you want people to see
                first.
              </p>
            </div>
          )}
        </section>

        {/* Public URL */}
        <footer className="mt-8 text-center">
          <span
            className="inline-block rounded-full border px-4 py-2 text-xs"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
              color: theme.muted,
            }}
          >
            persona.com/{data.username || "yourusername"}
          </span>
        </footer>
      </div>
    </PersonaPhoneFrame>
  );
};
