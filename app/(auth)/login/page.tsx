"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";

function Field(props: any) {
  const { id, label, type = "text", value, onChange, placeholder, autoComplete } = props;
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} autoComplete={autoComplete} className="h-11" />
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect") || "/dashboard";
  const [isPending, startTransition] = useTransition();

  const [emailIn, setEmailIn] = useState("");
  const [passwordIn, setPasswordIn] = useState("");
  const [errIn, setErrIn] = useState<string | null>(null);

  const [nameUp, setNameUp] = useState("");
  const [emailUp, setEmailUp] = useState("");
  const [passwordUp, setPasswordUp] = useState("");
  const [errUp, setErrUp] = useState<string | null>(null);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrIn(null);
    startTransition(async () => {
      const { user, error } = await authClient.signIn(emailIn.trim(), passwordIn);
      if (error || !user) return setErrIn(error ?? "Login failed");
      router.push(redirectTo);
    });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrUp(null);
    startTransition(async () => {
      const { user, error } = await authClient.signUp(emailUp.trim(), passwordUp, nameUp.trim());
      if (error || !user) return setErrUp(error ?? "Sign-up failed");
      router.push("/dashboard");
    });
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-6">
      <Card className="w-full max-w-[440px]">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>Sign in to continue or create a new account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-6">
              <form className="grid gap-4" onSubmit={handleSignIn}>
                <Field id="email-in" label="Email" type="email" value={emailIn} onChange={setEmailIn} placeholder="you@example.com" autoComplete="email" />
                <Field id="password-in" label="Password" type="password" value={passwordIn} onChange={setPasswordIn} placeholder="••••••••" autoComplete="current-password" />
                {errIn && <p className="text-sm text-destructive">{errIn}</p>}
                <Button type="submit" className="h-11" disabled={isPending}>{isPending ? "Signing in…" : "Sign in"}</Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <form className="grid gap-4" onSubmit={handleSignUp}>
                <Field id="name-up" label="Full name" value={nameUp} onChange={setNameUp} placeholder="Jane Doe" autoComplete="name" />
                <Field id="email-up" label="Email" type="email" value={emailUp} onChange={setEmailUp} placeholder="you@example.com" autoComplete="email" />
                <Field id="password-up" label="Password" type="password" value={passwordUp} onChange={setPasswordUp} placeholder="At least 6 characters" autoComplete="new-password" />
                {errUp && <p className="text-sm text-destructive">{errUp}</p>}
                <Button type="submit" className="h-11" disabled={isPending}>{isPending ? "Creating…" : "Create account"}</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Quantum Sandbox</p>
        </CardFooter>
      </Card>
    </div>
  );
}
