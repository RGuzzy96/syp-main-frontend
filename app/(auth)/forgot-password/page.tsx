"use client";

import { useState, useTransition } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setMsg(null);

    startTransition(async () => {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined,
      });
      if (error) setErr(error.message);
      else setMsg("Check your inbox for reset instructions.");
    });
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
          <CardDescription>We’ll send you a reset link.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            {err && <p className="text-sm text-destructive">{err}</p>}
            {msg && <p className="text-sm text-emerald-500">{msg}</p>}
            <Button type="submit" className="h-11" disabled={isPending}>
              {isPending ? "Sending…" : "Send reset link"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          <a href="/login" className="underline">Back to login</a>
        </CardFooter>
      </Card>
    </div>
  );
}
