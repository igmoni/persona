"use client";

import { useState } from "react";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { LogOut, Moon, Settings, Sun, UserRound } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";

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
  email?: string;
  avatar: string | null;
}

export function UserAvatar({ name, email, avatar }: UserAvatarProps) {
  const [color] = useState(
    () => colors[Math.floor(Math.random() * colors.length)]
  );

  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const supabase = createClient();

  const initial = name.trim().charAt(0).toUpperCase() || "U";
  const isDark = theme === "dark";

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out failed:", error.message);
      return;
    }

    router.replace("/login");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Open account menu"
            className="focus-visible:ring-ring shrink-0 rounded-full transition-opacity outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2"
          />
        }
      >
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
          />
        ) : (
          <div
            className={`flex size-10 items-center justify-center rounded-full font-semibold text-white ${color}`}
          >
            {initial}
          </div>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="top"
        sideOffset={10}
        className="w-64"
      >
        {/* Account details */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-3">
            <div className="flex items-center gap-3">
              {avatar ? (
                <Image
                  src={avatar}
                  alt={name}
                  width={36}
                  height={36}
                  className="size-9 rounded-full object-cover"
                />
              ) : (
                <div
                  className={`flex size-9 items-center justify-center rounded-full font-semibold text-white ${color}`}
                >
                  {initial}
                </div>
              )}

              <div className="min-w-0">
                <p className="text-foreground truncate text-sm font-medium">
                  {name}
                </p>
                <p className="text-muted-foreground truncate text-xs font-normal">
                  {email}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Account actions */}
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push("/dashboard/settings")}
            className="cursor-pointer gap-2 py-2.5"
          >
            <Settings className="text-muted-foreground size-4" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="cursor-pointer gap-2 py-2.5"
          >
            {isDark ? (
              <Sun className="text-muted-foreground size-4" />
            ) : (
              <Moon className="text-muted-foreground size-4" />
            )}

            {isDark ? "Light mode" : "Dark mode"}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Sign out */}
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-destructive focus:text-destructive cursor-pointer gap-2 py-2.5"
        >
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
