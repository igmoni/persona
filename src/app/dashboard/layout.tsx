import { Navbar } from "@/components/dashboard/navbar";
import { Sidebar } from "@/components/dashboard/side-bar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = {
    name: "Mohan S P",
    email: "abc@example.com",
    avatar: "",
  };

  return (
    <div className="bg-background text-foreground flex min-h-screen">
      <Sidebar profile={profile} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />

        <main className="min-w-0 flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
