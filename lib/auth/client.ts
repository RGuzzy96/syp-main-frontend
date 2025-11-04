"use client";

export type SessionUser = { id: string; email: string; full_name?: string | null };

export interface AuthClient {
  signIn(email: string, password: string): Promise<{ user: SessionUser | null; error?: string }>;
  signUp(email: string, password: string, fullName?: string): Promise<{ user: SessionUser | null; error?: string }>;
  signOut(): Promise<void>;
  getUser(): Promise<SessionUser | null>;
}

const MODE = process.env.NEXT_PUBLIC_AUTH_MODE ?? "mock";

/* --- mock 구현 --- */
const STORAGE_KEY = "mock_auth_user";
const mockAuth: AuthClient = {
  async signIn(email) {
    const user = { id: "mock-uid-001", email, full_name: "Mock User" };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    await new Promise(r => setTimeout(r, 300));
    return { user };
  },
  async signUp(email, _pw, fullName) {
    const user = { id: "mock-uid-NEW", email, full_name: fullName ?? null };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    await new Promise(r => setTimeout(r, 300));
    return { user };
  },
  async signOut() {
    localStorage.removeItem(STORAGE_KEY);
    await new Promise(r => setTimeout(r, 150));
  },
  async getUser() {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    return raw ? JSON.parse(raw) : null;
  },
};

export const authClient: AuthClient = mockAuth; // (지금은 mock만 사용)
