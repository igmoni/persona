"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

type ThemeToggleProps = {
  isCollapsed: boolean;
};

export function ThemeToggle({ isCollapsed }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isCollapsed ? (isDark ? "Light mode" : "Dark mode") : undefined}
      className={`text-foreground hover:bg-accent w-full rounded-xl py-6 ${
        isCollapsed ? "justify-center px-0" : "justify-start gap-3 px-3"
      }`}
    >
      {isDark ? (
        <Sun className="size-4 shrink-0" />
      ) : (
        <Moon className="size-4 shrink-0" />
      )}

      {!isCollapsed && <span>{isDark ? "Light mode" : "Dark mode"}</span>}
    </Button>
  );
}
