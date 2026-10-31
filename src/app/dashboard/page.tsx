import { getCurrentProfile } from "@/lib/queries/profile";

export default async function DashboardPage() {
  const result = await getCurrentProfile();

  if (!result.success) {
    return <div>{result.error}</div>;
  }

  return (
    <div>
      <h1>Welcome, {result.profile.full_name}</h1>
      <p>@{result.profile.username}</p>
    </div>
  );
}
