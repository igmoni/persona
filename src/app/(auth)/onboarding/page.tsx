import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Wizard } from "@/components/onboarding/wizard";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const Page = async () => {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // if (!session) {
  //   redirect("/login");
  // }

  // const profile = await prisma.profile.findUnique({
  //   where: {
  //     userId: session.user.id,
  //   },
  //   select: {
  //     id: true,
  //   },
  // });

  // if (profile) {
  //   redirect("/dashboard");
  // }

  return <Wizard />;
};

export default Page;
