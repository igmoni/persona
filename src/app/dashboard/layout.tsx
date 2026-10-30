import { redirect } from "next/navigation";

import { Navbar } from "@/components/dashboard/Navbar";
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
    <div className="bg-background text-foreground grid min-h-screen grid-cols-[320px_minmax(0,1fr)]">
      <Sidebar profile={profile} />

      <div className="flex min-w-0 flex-col">
        <Navbar />

        <main className="min-w-0 flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
