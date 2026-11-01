"use client";

import { useRef, useState } from "react";

import { Camera, UserRound, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type IntroductionStepProps = {
  fullName: string;
  bio: string;
  avatarUrl: string | null;
  onFullNameChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onAvatarChange: (value: string | null) => void;
};

const Introduction = ({
  fullName,
  bio,
  avatarUrl,
  onFullNameChange,
  onBioChange,
  onAvatarChange,
}: IntroductionStepProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState("");

  const handleImageChange = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image must be smaller than 5 MB.");
      return;
    }

    setImageError("");

    const reader = new FileReader();

    reader.onload = () => {
      onAvatarChange(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
          Step 03 — About you
        </p>

        <h1 className="text-3xl leading-tight font-medium tracking-tight md:text-4xl">
          Introduce yourself.
        </h1>

        <p className="text-muted-foreground text-sm leading-relaxed">
          Let people know who&apos;s behind the page.
        </p>
      </div>

      {/* Profile photo */}
      <div className="space-y-3">
        <label className="mb-2 text-sm font-semibold">Profile photo</label>

        <div className="flex items-center gap-4">
          <div className="bg-muted relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt="Profile preview"
                className="size-full object-cover"
              />
            ) : (
              <UserRound className="text-muted-foreground size-8" />
            )}
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="border-input hover:bg-accent flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition-colors"
            >
              <Camera size={15} />
              Upload photo
            </button>

            <p className="text-muted-foreground text-xs">
              JPG, PNG or WebP. Max 5 MB.
            </p>

            {avatarUrl && (
              <button
                type="button"
                onClick={() => onAvatarChange(null)}
                className="text-destructive flex items-center gap-1 text-xs"
              >
                <X size={13} />
                Remove photo
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(event) => handleImageChange(event.target.files?.[0])}
          />
        </div>

        {imageError && <p className="text-destructive text-xs">{imageError}</p>}
      </div>

      {/* Full name */}
      <div className="space-y-2">
        <label htmlFor="fullName" className="text-sm font-semibold">
          Full name <span className="text-destructive">*</span>
        </label>

        <Input
          id="fullName"
          value={fullName}
          onChange={(event) => onFullNameChange(event.target.value)}
          placeholder="e.g. Mohan Xyz"
          maxLength={60}
          autoComplete="name"
          className="rounded-lg"
          required
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="bio" className="text-sm font-semibold">
            A little about yourself
          </label>

          <span className="text-muted-foreground text-xs">
            {bio.length}/160
          </span>
        </div>

        <Textarea
          id="bio"
          value={bio}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            onBioChange(event.target.value)
          }
          placeholder="I'm a developer who loves building things..."
          maxLength={160}
          rows={4}
          className="resize-none"
        />

        <p className="text-muted-foreground text-xs">
          Keep it short. You can always edit it later.
        </p>
      </div>
    </div>
  );
};

export { Introduction };
