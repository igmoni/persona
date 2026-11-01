import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Shell } from "@/components/dashboard/shell";
import { auth } from "@/lib/auth";
import { getUserWorkspaces } from "@/lib/queries/workspaces";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const workspaces = await getUserWorkspaces(session.user.id);

  const profile = {
    name: session.user.name,
    email: session.user.email,
    avatar: session.user.image ?? null,
  };

  return (
    <Shell profile={profile} workspaces={workspaces}>
      {children}
    </Shell>
  );
};

export default DashboardLayout;
