import { redirect } from "next/navigation";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { getUser } from "@/lib/auth";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  if (!user) redirect("/login");

  const profile = {
    name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? "User",
    email: user.email ?? "",
    avatar:
      user.user_metadata?.avatar_url ?? user.user_metadata?.picture ?? null,
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar profile={profile} />

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;
