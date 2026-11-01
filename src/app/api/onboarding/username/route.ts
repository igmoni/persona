import { NextRequest, NextResponse } from "next/server";

import { RESERVED_USERNAMES } from "@/lib/constants/reserved";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams
    .get("username")
    ?.trim()
    .toLowerCase();

  if (!username || !/^[a-z0-9_]{3,20}$/.test(username)) {
    return NextResponse.json(
      { available: false, message: "Invalid username" },
      { status: 400 }
    );
  }

  if (RESERVED_USERNAMES.includes(username)) {
    return NextResponse.json({
      available: false,
      message: "This username is reserved.",
    });
  }

  try {
    const workspace = await prisma.workspace.findUnique({
      where: { username },
      select: { id: true },
    });

    return NextResponse.json({
      available: !workspace,
      message: workspace
        ? "The username is already taken."
        : "The username is available!",
    });
  } catch (error) {
    console.error("Username availability error:", error);

    return NextResponse.json(
      { available: false, message: "Unable to check username right now." },
      { status: 500 }
    );
  }
}
