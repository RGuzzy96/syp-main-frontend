"use client";

import { useState, useTransition } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { supabase } from "@/lib/supabase/client";
import { authClient } from "@/lib/auth/client";

export function LoginDialog({ redirectTo = "/dashboard", triggerClassName = "" }: { redirectTo?: string; triggerClassName?: string; }) {
    const [open, setOpen] = useState(false);

    // sign in
    const [emailIn, setEmailIn] = useState("");
    const [passwordIn, setPasswordIn] = useState("");
    const [errIn, setErrIn] = useState<string | null>(null);
    const [isPendingIn, startIn] = useTransition();

    // sign up
    const [nameUp, setNameUp] = useState("");
    const [emailUp, setEmailUp] = useState("");
    const [passwordUp, setPasswordUp] = useState("");
    const [errUp, setErrUp] = useState<string | null>(null);
    const [isPendingUp, startUp] = useTransition();

    const signIn = (e: React.FormEvent) => {
        e.preventDefault();
        setErrIn(null);
        startIn(async () => {
            const { user, error } = await authClient.signIn(emailIn.trim(), passwordIn);
            if (error || !user) {
                setErrIn(error ?? "Login failed");
            } else {
                setOpen(false);
                window.location.href = redirectTo; // 로그인 성공 → 페이지 이동
            }
        });
    };


    const signUp = (e: React.FormEvent) => {
        e.preventDefault();
        setErrUp(null);
        startUp(async () => {
            const { user, error } = await authClient.signUp(emailUp.trim(), passwordUp, nameUp.trim());
            if (error || !user) {
                setErrUp(error ?? "Sign-up failed");
            } else {
                setOpen(false);
                window.location.href = "/dashboard"; // mock 모드에서는 바로 로그인된 걸로 처리
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className={triggerClassName}>Log in</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[430px]">
                <DialogHeader>
                    <DialogTitle>Welcome</DialogTitle>
                    <DialogDescription>Sign in or create an account.</DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="signin" className="w-full mt-2">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">Sign in</TabsTrigger>
                        <TabsTrigger value="signup">Create account</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin" className="mt-4">
                        <form className="grid gap-4" onSubmit={signIn}>
                            <div className="grid gap-2">
                                <Label htmlFor="email-in">Email</Label>
                                <Input id="email-in" type="email" value={emailIn} onChange={(e) => setEmailIn(e.target.value)} placeholder="you@example.com" autoComplete="email" className="h-11" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password-in">Password</Label>
                                <Input id="password-in" type="password" value={passwordIn} onChange={(e) => setPasswordIn(e.target.value)} placeholder="••••••••" autoComplete="current-password" className="h-11" />
                            </div>
                            {errIn && <p className="text-sm text-destructive">{errIn}</p>}
                            <div className="flex items-center justify-between text-sm">
                                <a href="/forgot-password" className="text-primary hover:underline">Forgot password?</a>
                                <a href="/login" className="hover:underline text-muted-foreground">Open full page</a>
                            </div>
                            <Button type="submit" className="h-11" disabled={isPendingIn}>
                                {isPendingIn ? "Signing in…" : "Sign in"}
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="signup" className="mt-4">
                        <form className="grid gap-4" onSubmit={signUp}>
                            <div className="grid gap-2">
                                <Label htmlFor="name-up">Full name</Label>
                                <Input id="name-up" value={nameUp} onChange={(e) => setNameUp(e.target.value)} placeholder="Jane Doe" className="h-11" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email-up">Email</Label>
                                <Input id="email-up" type="email" value={emailUp} onChange={(e) => setEmailUp(e.target.value)} placeholder="you@example.com" autoComplete="email" className="h-11" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password-up">Password</Label>
                                <Input id="password-up" type="password" value={passwordUp} onChange={(e) => setPasswordUp(e.target.value)} placeholder="At least 6 characters" autoComplete="new-password" className="h-11" />
                            </div>
                            {errUp && <p className="text-sm text-destructive">{errUp}</p>}
                            <Button type="submit" className="h-11" disabled={isPendingUp}>
                                {isPendingUp ? "Creating…" : "Create account"}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
