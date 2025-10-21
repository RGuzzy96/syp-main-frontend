import Protected from "@/components/auth/Protected";

export default function DashboardPage() {
  return (
    <Protected>
      <div className="mx-auto max-w-5xl p-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back. Your runs and shortcuts will live here.
        </p>
      </div>
    </Protected>
  );
}
