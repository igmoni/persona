"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Send } from "lucide-react";
import { motion } from "motion/react";

import { sidebarLinks } from "@/config/sidebar";
import { workspaces } from "@/lib/common";

import { CustomButton } from "../common/custom-button";
import { Logo } from "../common/Logo";
import { ThemeToggle } from "../common/theme-toggle";
import { UserAvatar } from "../common/user-avatar";
import { Separator } from "../ui/separator";
import { WorkspaceSwitcher } from "./workspace-switcher";

type SidebarProps = {
  profile: {
    name: string;
    email: string;
    avatar: string | null;
  };
};

const Sidebar = ({ profile }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [activeWorkspaceId, setActiveWorkspaceId] = useState(
    workspaces[0]?.id ?? ""
  );

  const handleWorkspaceChange = (id: string) => {
    setActiveWorkspaceId(id);
  };

  return (
    <aside className="border-border bg-background sticky top-0 flex h-dvh w-full flex-col justify-between overflow-y-auto border-r p-5">
      {/* Top section */}
      <div>
        <Logo />

        {/* Workspace switcher */}
        <WorkspaceSwitcher
          workspaces={workspaces}
          activeWorkspaceId={activeWorkspaceId}
          onWorkspaceChange={handleWorkspaceChange}
          onCreateWorkspace={() => router.push("/onboarding")}
        />

        <Separator className="my-3" />

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {sidebarLinks.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                href={item.href}
                key={item.href}
                className="hover:text-foreground relative flex items-center gap-3 rounded-xl px-3 py-3 transition-colors"
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
                    className={
                      isActive ? "text-primary" : "text-muted-foreground"
                    }
                  >
                    {item.icon}
                  </span>

                  <span
                    className={`text-sm ${
                      isActive
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Theme toggle */}
        <div className="mt-2">
          <ThemeToggle />
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col">
        {/* Publish card */}
        <div className="border-border bg-card flex w-full flex-col gap-3 rounded-2xl border p-4">
          <div className="bg-muted flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1">
            <span className="bg-muted-foreground size-2 rounded-full" />
            <span className="text-muted-foreground text-xs font-medium">
              Draft
            </span>
          </div>

          <p className="text-muted-foreground text-sm">
            Only you can see this page.
          </p>

          <CustomButton className="flex w-full gap-2 rounded-full py-5 text-sm">
            <Send className="size-4" />
            Publish from $49/yr
          </CustomButton>
        </div>
       
        {/* User profile */}
        <div className="mt-5 flex min-w-0 items-center gap-2 pl-2">
          <UserAvatar name={profile.name} avatar={profile.avatar} />

          <p className="text-muted-foreground truncate text-base">
            {profile.email}
          </p>
        </div>
      </div>
    </aside>
  );
};

export { Sidebar };
