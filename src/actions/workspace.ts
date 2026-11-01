"use server";

import { headers } from "next/headers";

import { z } from "zod";

import { auth } from "@/lib/auth";
import { RESERVED_USERNAMES } from "@/lib/constants/reserved";
import { prisma } from "@/lib/prisma";

const usernameSchema = z
  .string()
  .min(3)
  .max(20)
  .regex(/^[a-zA-Z0-9_]+$/);

export async function createWorkspace(username: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { success: false as const, error: "Unauthorized" };
  }

  const parsed = usernameSchema.safeParse(username.trim());

  if (!parsed.success) {
    return { success: false as const, error: "Invalid username" };
  }

  const normalizedUsername = parsed.data.toLowerCase();

  if (RESERVED_USERNAMES.includes(normalizedUsername)) {
    return { success: false as const, error: "This username is reserved." };
  }

  try {
    // Make retries idempotent for this user and username.
    const existing = await prisma.workspace.findFirst({
      where: {
        userId: session.user.id,
        username: normalizedUsername,
      },
      select: { id: true, username: true },
    });

    if (existing) {
      return { success: true as const, workspace: existing };
    }

    const workspace = await prisma.workspace.create({
      data: {
        username: normalizedUsername,
        userId: session.user.id,
      },
      select: {
        id: true,
        username: true,
      },
    });

    return { success: true as const, workspace };
  } catch (error) {
    // Handle a concurrent request claiming the same unique username.
    const existing = await prisma.workspace.findUnique({
      where: { username: normalizedUsername },
      select: { id: true, username: true, userId: true },
    });

    if (existing?.userId === session.user.id) {
      return {
        success: true as const,
        workspace: {
          id: existing.id,
          username: existing.username,
        },
      };
    }

    if (existing) {
      return { success: false as const, error: "Username is already taken" };
    }

    console.error("createWorkspace error:", error);
    return { success: false as const, error: "Something went wrong" };
  }
}

const themeMap = {
  charcoal: "CHARCOAL",
  midnight: "MIDNIGHT",
  ocean: "OCEAN",
  sunset: "SUNSET",
  forest: "FOREST",
  minimal: "MINIMAL",
  linen: "LINEN",
  ink: "INK",
  matcha: "MATCHA",
  tangerine: "TANGERINE",
  terminal: "TERMINAL",
  blueprint: "BLUEPRINT",
  peach: "PEACH",
  newsprint: "NEWSPRINT",
  aurora: "AURORA",
} as const;

const updateWorkspaceSchema = z.object({
  workspaceId: z.string().min(1),
  fullName: z.string().trim().min(2).max(60),
  bio: z.string().max(160),
  profession: z.string().min(1),
  theme: z.enum([
    "charcoal",
    "midnight",
    "ocean",
    "sunset",
    "forest",
    "minimal",
    "linen",
    "ink",
    "matcha",
    "tangerine",
    "terminal",
    "blueprint",
    "peach",
    "newsprint",
    "aurora",
  ]),
});

export async function updateWorkspace(input: {
  workspaceId: string;
  fullName: string;
  bio: string;
  profession: string;
  theme: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { success: false as const, error: "Unauthorized" };
  }

  const parsed = updateWorkspaceSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false as const, error: "Invalid workspace details" };
  }

  try {
    const result = await prisma.workspace.updateMany({
      where: {
        id: parsed.data.workspaceId,
        userId: session.user.id,
      },
      data: {
        fullName: parsed.data.fullName,
        bio: parsed.data.bio,
        profession: parsed.data.profession,
        theme: themeMap[parsed.data.theme],
      },
    });

    if (result.count === 0) {
      return { success: false as const, error: "Workspace not found" };
    }

    return { success: true as const };
  } catch (error) {
    console.error("updateWorkspace error:", error);
    return { success: false as const, error: "Unable to save workspace" };
  }
}
