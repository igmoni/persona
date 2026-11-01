"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { PanelLeft, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { sidebarLinks } from "@/config/sidebar";
import { workspaces } from "@/lib/common";

import { FlipButton } from "../common/flip-button";
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

const SIDEBAR_WIDTH = {
  expanded: 280,
  collapsed: 76,
};

const transition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

const Sidebar = ({ profile }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(true);

  const [activeWorkspaceId, setActiveWorkspaceId] = useState(
    workspaces[0]?.id ?? ""
  );

  const isCollapsed = !isOpen;

  const handleWorkspaceChange = (id: string) => {
    setActiveWorkspaceId(id);
  };

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isOpen ? SIDEBAR_WIDTH.expanded : SIDEBAR_WIDTH.collapsed,
      }}
      transition={transition}
      className="bg-background border-border sticky top-0 flex h-dvh shrink-0 flex-col justify-between overflow-hidden border-r p-3 sm:p-4"
    >
      {/* Top section */}
      <div className="min-w-0">
        <div className="flex h-10 items-center justify-between">
          <AnimatePresence mode="wait" initial={false}>
            {isOpen && (
              <motion.div
                key="logo"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="min-w-0"
              >
                <Logo />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            aria-expanded={isOpen}
            className="text-muted-foreground hover:bg-accent hover:text-foreground flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors"
          >
            {isOpen ? (
              <motion.div
                animate={{ rotate: isOpen ? 0 : 180 }}
                transition={transition}
              >
                <PanelLeft className="size-5" />
              </motion.div>
            ) : (
              <div className="ml-1">P</div>
            )}
          </button>
        </div>

        {/* Workspace switcher */}
        <WorkspaceSwitcher
          workspaces={workspaces}
          activeWorkspaceId={activeWorkspaceId}
          onWorkspaceChange={handleWorkspaceChange}
          onCreateWorkspace={() => router.push("/onboarding")}
          isCollapsed={isCollapsed}
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
                title={isCollapsed ? item.title : undefined}
                className={`relative flex h-11 items-center rounded-xl transition-colors ${
                  isCollapsed ? "justify-center" : "gap-3 px-3"
                } hover:text-foreground`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="bg-accent ring-border absolute inset-0 rounded-xl ring-1"
                    transition={transition}
                  />
                )}

                <span
                  className={`relative z-10 shrink-0 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.icon}
                </span>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0, x: -5 }}
                      animate={{ opacity: 1, width: "auto", x: 0 }}
                      exit={{ opacity: 0, width: 0, x: -5 }}
                      transition={{ duration: 0.18 }}
                      className={`relative z-10 overflow-hidden text-sm whitespace-nowrap ${
                        isActive
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Theme toggle */}
        <div className="mt-2">
          <ThemeToggle isCollapsed={isCollapsed} />
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex min-w-0 flex-col">
        {/* Publish card */}
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="publish-card"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className="bg-card border-border flex w-full flex-col gap-3 rounded-2xl border p-4"
            >
              <div className="bg-muted flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1">
                <span className="bg-muted-foreground size-2 rounded-full" />
                <span className="text-muted-foreground text-xs font-medium">
                  Draft
                </span>
              </div>

              <p className="text-muted-foreground text-sm">
                Only you can see this page.
              </p>

              <FlipButton>
                <Send className="size-4" />
                Publish from $49/yr
              </FlipButton>
            </motion.div>
          ) : (
            <motion.div
              key="publish-icon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              className="flex justify-center"
            >
              <button
                type="button"
                title="Publish your profile"
                onClick={() => setIsOpen(true)}
                className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-xl transition-opacity hover:opacity-80"
              >
                <Send className="size-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User profile */}
        <div
          className={`mt-5 flex min-w-0 items-center ${
            isCollapsed ? "justify-center" : "gap-2 pl-1"
          }`}
        >
          <UserAvatar
            name={profile.name}
            email={profile.email}
            avatar={profile.avatar}
          />

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.p
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.18 }}
                className="text-muted-foreground min-w-0 flex-1 truncate text-sm"
              >
                {profile.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
};

export { Sidebar };
