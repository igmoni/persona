import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Wizard } from "@/components/onboarding/wizard";
import { auth } from "@/lib/auth";

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

  if (!session) {
    redirect("/login");
  }

  if (newParam !== "1") {
    redirect("/dashboard");
  }

  return <Wizard />;
}
