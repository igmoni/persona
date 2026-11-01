"use client";

import {
  BehanceIcon,
  DribbbleIcon,
  InstagramIcon,
  Mail01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail } from "lucide-react";

import { Input } from "@/components/ui/input";
import type { PersonaSocial, SocialPlatform } from "@/types/persona";

type SocialsStepProps = {
  socials: PersonaSocial[];
  onChange: (socials: PersonaSocial[]) => void;
  onSkip?: () => void;
};

const socialFields = [
  {
    platform: "dribbble",
    placeholder: "username",
    icon: "dribbble",
  },
  {
    platform: "behance",
    placeholder: "username",
    icon: "behance",
  },
  {
    platform: "instagram",
    placeholder: "@yourname",
    icon: "instagram",
  },
  {
    platform: "x",
    placeholder: "@yourname",
    icon: "x",
  },
  {
    platform: "email",
    placeholder: "you@example.com",
    icon: "email",
  },
] as const satisfies {
  platform: SocialPlatform;
  placeholder: string;
  icon: string;
}[];

export function Socials({ socials, onChange, onSkip }: SocialsStepProps) {
  const updateSocial = (platform: SocialPlatform, url: string) => {
    const existing = socials.find((item) => item.platform === platform);

    if (existing) {
      onChange(
        url.trim()
          ? socials.map((item) =>
              item.platform === platform ? { ...item, url } : item
            )
          : socials.filter((item) => item.platform !== platform)
      );
      return;
    }

    if (url.trim()) {
      onChange([
        ...socials,
        {
          id: crypto.randomUUID(),
          platform,
          url,
        },
      ]);
    }
  };

  const getValue = (platform: SocialPlatform) =>
    socials.find((item) => item.platform === platform)?.url ?? "";

  return (
    <div className="space-y-9">
      <h2 className="text-3xl font-medium tracking-tight">Your socials</h2>

      <div className="space-y-3">
        {socialFields.map((field) => (
          <div key={field.platform} className="flex items-center gap-5">
            <div className="flex size-9 shrink-0 items-center justify-center">
              <div className="flex size-9 shrink-0 items-center justify-center">
                {field.icon === "dribbble" && (
                  <HugeiconsIcon icon={DribbbleIcon} size={28} />
                )}

                {field.icon === "behance" && (
                  <HugeiconsIcon icon={BehanceIcon} size={28} />
                )}

                {field.icon === "instagram" && (
                  <HugeiconsIcon icon={InstagramIcon} size={28} />
                )}

                {field.icon === "x" && (
                  <HugeiconsIcon icon={NewTwitterIcon} size={28} />
                )}

                {field.icon === "email" && (
                  <HugeiconsIcon icon={Mail01Icon} size={28} />
                )}
              </div>
            </div>

            <Input
              value={getValue(field.platform)}
              onChange={(event) =>
                updateSocial(field.platform, event.target.value)
              }
              placeholder={field.placeholder}
              className="h-12 rounded-xl px-4"
            />
          </div>
        ))}
      </div>

      {onSkip && (
        <button
          type="button"
          onClick={onSkip}
          className="text-muted-foreground hover:text-foreground w-full text-center text-sm"
        >
          Skip for now
        </button>
      )}
    </div>
  );
}
