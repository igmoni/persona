import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Wizard } from "@/components/onboarding/wizard";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type PageProps = {
  searchParams: Promise<{
    new?: string;
  }>;
};

export default async function OnboardingPage({ searchParams }: PageProps) {
  const { new: newParam } = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Authentication is always required.
  if (!session) {
    redirect("/login");
  }

  // Only ?new=1 can open onboarding.
  if (newParam !== "1") {
    redirect("/dashboard");
  }

  // Don't allow existing profiles to repeat onboarding.
  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  if (profile) {
    redirect("/dashboard");
  }

  return <Wizard />;
}
