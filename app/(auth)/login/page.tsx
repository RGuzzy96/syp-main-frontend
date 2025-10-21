"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { supabase } from "@/lib/supabase/client";
import { authClient } from "@/lib/auth/client";

function Field({
    id, label, type = "text", placeholder, value, onChange, autoComplete
}: {
    id: string; label: string; type?: string; placeholder?: string;
    value: string; onChange: (v: string) => void; autoComplete?: string;
}) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoComplete={autoComplete}
                className="h-11"
            />
        </div>
    );
}

export default function AuthPage() {
    const router = useRouter();
    const params = useSearchParams();
    const redirectTo = params.get("redirect") || "/dashboard";

    const [isPending, startTransition] = useTransition();

    // Sign-in
    const [emailIn, setEmailIn] = useState("");
    const [passwordIn, setPasswordIn] = useState("");
    const [errorIn, setErrorIn] = useState<string | null>(null);

    // Sign-up
    const [nameUp, setNameUp] = useState("");
    const [emailUp, setEmailUp] = useState("");
    const [passwordUp, setPasswordUp] = useState("");
    const [errorUp, setErrorUp] = useState<string | null>(null);

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorIn(null);
        startTransition(async () => {
            const { user, error } = await authClient.signIn(emailIn.trim(), passwordIn);
            if (error || !user) return setErrorIn(error ?? "Failed to sign in");
            router.push(redirectTo);
        });
    };

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorUp(null);
        startTransition(async () => {
            const { user, error } = await authClient.signUp(emailUp.trim(), passwordUp, nameUp.trim());
            if (error || !user) return setErrorUp(error ?? "Failed to create account");
            // mock 모드: 바로 로그인 상태로 간주 → 대시보드
            router.push("/dashboard");
        });
    };


    return (
        <div className="relative min-h-[100dvh] flex items-center justify-center px-4 py-16">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/40" />
                <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl bg-primary/10" />
                <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full blur-3xl bg-purple-500/10" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-[440px]"
            >
                <Card className="shadow-lg border-border/60">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Welcome</CardTitle>
                        <CardDescription>Sign in to continue or create a new account.</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Tabs defaultValue="signin" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="signin">Sign in</TabsTrigger>
                                <TabsTrigger value="signup">Create account</TabsTrigger>
                            </TabsList>

                            <TabsContent value="signin" className="mt-6">
                                <form className="grid gap-4" onSubmit={handleSignIn}>
                                    <Field
                                        id="email-in"
                                        label="Email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={emailIn}
                                        onChange={setEmailIn}
                                        autoComplete="email"
                                    />
                                    <Field
                                        id="password-in"
                                        label="Password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={passwordIn}
                                        onChange={setPasswordIn}
                                        autoComplete="current-password"
                                    />

                                    {errorIn && <p className="text-sm text-destructive" role="alert">{errorIn}</p>}

                                    <div className="flex items-center justify-between text-sm">
                                        <a href="/forgot-password" className="text-primary hover:underline">Forgot password?</a>
                                        <span className="text-muted-foreground">
                                            Need an account?{" "}
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.querySelector<HTMLElement>("[data-value='signup']")?.click();
                                                }}
                                                className="hover:underline"
                                            >
                                                Sign up
                                            </a>
                                        </span>
                                    </div>

                                    <Button type="submit" className="h-11" disabled={isPending}>
                                        {isPending ? "Signing in…" : "Sign in"}
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="signup" className="mt-6">
                                <form className="grid gap-4" onSubmit={handleSignUp}>
                                    <Field
                                        id="name-up"
                                        label="Full name"
                                        placeholder="Jane Doe"
                                        value={nameUp}
                                        onChange={setNameUp}
                                        autoComplete="name"
                                    />
                                    <Field
                                        id="email-up"
                                        label="Email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={emailUp}
                                        onChange={setEmailUp}
                                        autoComplete="email"
                                    />
                                    <Field
                                        id="password-up"
                                        label="Password"
                                        type="password"
                                        placeholder="At least 6 characters"
                                        value={passwordUp}
                                        onChange={setPasswordUp}
                                        autoComplete="new-password"
                                    />

                                    {errorUp && <p className="text-sm text-destructive" role="alert">{errorUp}</p>}

                                    <Button type="submit" className="h-11" disabled={isPending}>
                                        {isPending ? "Creating…" : "Create account"}
                                    </Button>

                                    <p className="text-xs text-muted-foreground">
                                        By continuing, you agree to our <a href="/terms" className="underline">Terms</a> and <a href="/privacy" className="underline">Privacy Policy</a>.
                                    </p>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </CardContent>

                    <CardFooter className="justify-center">
                        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Quantum Sandbox</p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
