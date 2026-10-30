"use client";

import { useState } from "react";

import Image from "next/image";

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-indigo-500",
];

interface UserAvatarProps {
  name: string;
  avatar: string | null;
}

export function UserAvatar({ name, avatar }: UserAvatarProps) {
  const [color] = useState(
    () => colors[Math.floor(Math.random() * colors.length)]
  );

  const initial = name.trim().charAt(0).toUpperCase() || "U";

  if (avatar) {
    return (
      <Image
        src={avatar}
        alt={name}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover"
      />
    );
  }

  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold text-white ${color}`}
    >
      {initial}
    </div>
  );
}
