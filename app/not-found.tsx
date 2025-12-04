import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 px-6">
      <h1 className="text-5xl font-bold">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-slate-400 text-center max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <div className="mt-6">
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </main>
  );
}
