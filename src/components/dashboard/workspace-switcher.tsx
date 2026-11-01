"use client";

import { Check, ChevronDown, Layers, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { jetbrainsMono } from "@/lib/font";

export type Workspace = {
  id: string;
  username: string;
  fullName: string | null;
};

type WorkspaceSwitcherProps = {
  workspaces: Workspace[];
  activeWorkspaceId: string;
  onWorkspaceChange: (id: string) => void;
  onCreateWorkspace: () => void;
  isCollapsed: boolean;
};

const WorkspaceSwitcher = ({
  workspaces,
  activeWorkspaceId,
  onWorkspaceChange,
  onCreateWorkspace,
  isCollapsed,
}: WorkspaceSwitcherProps) => {
  const activeWorkspace = workspaces.find(
    (workspace) => workspace.id === activeWorkspaceId
  );

  const getWorkspaceName = (workspace: Workspace) =>
    workspace.fullName?.trim() || workspace.username;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            title={
              isCollapsed
                ? activeWorkspace
                  ? getWorkspaceName(activeWorkspace)
                  : "Create workspace"
                : undefined
            }
            className={`border-border bg-card hover:bg-accent mt-5 flex w-full items-center rounded-xl border p-3 transition-colors ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
          />
        }
      >
        {isCollapsed ? (
          <Layers className="text-muted-foreground size-5" />
        ) : activeWorkspace ? (
          <>
            <div className="flex min-w-0 items-center gap-2">
              <span className="bg-primary size-2 shrink-0 rounded-full" />

              <div className="min-w-0 text-left">
                <p className="text-foreground truncate text-sm font-medium">
                  {getWorkspaceName(activeWorkspace)}
                </p>

                <p
                  className={`${jetbrainsMono.className} text-muted-foreground -mt-0.5 truncate text-xs`}
                >
                  @{activeWorkspace.username}
                </p>
              </div>
            </div>

            <ChevronDown className="text-muted-foreground size-4 shrink-0" />
          </>
        ) : (
          <>
            <div className="flex min-w-0 items-center gap-2">
              <Layers className="text-muted-foreground size-5" />
              <span className="text-sm font-medium">Create workspace</span>
            </div>

            <ChevronDown className="text-muted-foreground size-4 shrink-0" />
          </>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        side={isCollapsed ? "right" : "bottom"}
        sideOffset={8}
        className="w-64"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Your workspaces</DropdownMenuLabel>

          {workspaces.length > 0 ? (
            workspaces.map((workspace) => {
              const isActive = workspace.id === activeWorkspaceId;

              return (
                <DropdownMenuItem
                  key={workspace.id}
                  onClick={() => onWorkspaceChange(workspace.id)}
                  className="flex cursor-pointer items-center justify-between gap-3 py-2.5"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <Layers className="text-muted-foreground size-4 shrink-0" />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {getWorkspaceName(workspace)}
                      </p>

                      <p className="text-muted-foreground truncate text-xs">
                        @{workspace.username}
                      </p>
                    </div>
                  </div>

                  {isActive && (
                    <Check className="text-primary size-4 shrink-0" />
                  )}
                </DropdownMenuItem>
              );
            })
          ) : (
            <p className="text-muted-foreground px-2 py-3 text-xs">
              You haven&apos;t created a workspace yet.
            </p>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onCreateWorkspace}
          className="cursor-pointer gap-2 py-2.5"
        >
          <Plus className="size-4" />
          New workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { WorkspaceSwitcher };
