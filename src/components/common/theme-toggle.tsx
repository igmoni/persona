"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-foreground hover:bg-accent w-full justify-start gap-3 rounded-xl px-3 py-6"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      <span>{isDark ? "Light mode" : "Dark mode"}</span>
    </Button>
  );
}
