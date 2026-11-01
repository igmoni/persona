"use client";

import { useState } from "react";

import { Navbar } from "@/components/dashboard/navbar";
import { Sidebar } from "@/components/dashboard/side-bar";
import type { Workspace } from "@/components/dashboard/workspace-switcher";

type DashboardShellProps = {
  children: React.ReactNode;
  profile: {
    name: string;
    email: string;
    avatar: string | null;
  };
  workspaces: Workspace[];
};

export function Shell({ children, profile, workspaces }: DashboardShellProps) {
  const [activeWorkspaceId, setActiveWorkspaceId] = useState(
    workspaces[0]?.id ?? ""
  );

  const activeWorkspace = workspaces.find(
    (workspace) => workspace.id === activeWorkspaceId
  );

  return (
    <div className="bg-background text-foreground flex min-h-screen">
      <Sidebar
        profile={profile}
        workspaces={workspaces}
        activeWorkspaceId={activeWorkspaceId}
        onWorkspaceChange={setActiveWorkspaceId}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar username={activeWorkspace?.username ?? ""} />

        <main className="min-w-0 flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
