"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronDown, Send } from "lucide-react";
import { motion } from "motion/react";

import { sidebarLinks } from "@/config/sidebar";
import { jetbrainsMono } from "@/lib/font";

import { Logo } from "../common/Logo";
import { ThemeToggle } from "../common/theme-toggle";
import { UserAvatar } from "../common/user-avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type SidebarProps = {
  profile: {
    name: string;
    email: string;
    avatar: string | null;
  };
};

const Sidebar = ({ profile }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="border-border bg-background text-foreground fixed left-0 flex h-screen w-3xs flex-col justify-between border-r p-5">
      {/* Top section */}
      <div>
        <Logo />

        {/* Profile switcher */}
        <div className="border-border bg-card hover:bg-accent mt-5 flex cursor-pointer items-center justify-between rounded-xl border p-1 px-3 transition-colors">
          <div className="flex items-center gap-2">
            <span className="bg-muted-foreground size-2 rounded-full" />

            <div>
              <p className="font-medium">{profile.name}</p>

              <p
                className={`${jetbrainsMono.className} text-muted-foreground -mt-1 text-sm`}
              >
                @igmoni
              </p>
            </div>
          </div>

          <ChevronDown className="text-muted-foreground size-4" />
        </div>

        <Separator className="bg-border my-3" />

        {/* Navigation */}
        <div className="flex flex-col gap-1">
          {sidebarLinks.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                href={item.href}
                key={item.href}
                className="hover:text-foreground relative flex items-center gap-3 rounded-xl p-2 py-3 pl-3 transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="bg-accent ring-border absolute inset-0 rounded-xl ring-1"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}

                <div className="relative z-10 flex items-center gap-2">
                  <span
                    className={`transition-colors duration-200 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <p
                    className={`text-sm ${
                      isActive
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Theme toggle */}
        <div className="mt-2">
          <ThemeToggle />
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col">
        {/* Publish card */}
        <div className="border-border bg-card flex w-full flex-col gap-2.5 rounded-2xl border p-4">
          <div className="bg-muted flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5">
            <span className="bg-muted-foreground size-2 rounded-full" />
            <span className="text-muted-foreground text-xs font-medium">
              Draft
            </span>
          </div>

          <p className="text-muted-foreground text-sm">
            Only you can see this page.
          </p>

          <Button className="flex w-full gap-2 rounded-full py-5 text-sm">
            <Send className="size-4" />
            Publish from $49/yr
          </Button>
        </div>

        {/* User profile */}
        <div className="mt-5 flex min-w-0 items-center gap-2">
          <UserAvatar name={profile.name} avatar={profile.avatar} />

          <p className="text-muted-foreground truncate text-sm">
            {profile.email}
          </p>
        </div>
      </div>
    </aside>
  );
};

export { Sidebar };
