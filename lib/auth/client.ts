"use client";

/** 공통 인터페이스 — 화면단은 이 타입만 사용 */
export type SessionUser = { id: string; email: string; full_name?: string | null };

export interface AuthClient {
  signIn(email: string, password: string): Promise<{ user: SessionUser | null; error?: string }>;
  signUp(email: string, password: string, fullName?: string): Promise<{ user: SessionUser | null; error?: string }>;
  signOut(): Promise<void>;
  getUser(): Promise<SessionUser | null>;
}

/** 모드 선택: mock | supabase */
const MODE = process.env.NEXT_PUBLIC_AUTH_MODE ?? "mock";

/** ---------- Mock 구현 (프론트엔드-only) ---------- */
const STORAGE_KEY = "mock_auth_user";

const mockAuth: AuthClient = {
  async signIn(email, _password) {
    // 로그인 성공으로 가정
    const user = { id: "mock-uid-001", email, full_name: "Mock User" };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    await new Promise((r) => setTimeout(r, 500)); // 살짝 지연
    return { user };
  },
  async signUp(email, _password, fullName) {
    const user = { id: "mock-uid-NEW", email, full_name: fullName ?? null };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    await new Promise((r) => setTimeout(r, 500));
    return { user };
  },
  async signOut() {
    localStorage.removeItem(STORAGE_KEY);
    await new Promise((r) => setTimeout(r, 300));
  },
  async getUser() {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  },
};

/** ---------- Supabase 구현(나중에 활성화) ---------- */
async function loadSupabase() {
  const { supabase } = await import("../supabase/client"); // 이미 만든 client.ts 사용
  return supabase;
}

const supabaseAuth: AuthClient = {
  async signIn(email, password) {
    const supabase = await loadSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { user: data.user ? { id: data.user.id, email: data.user.email ?? "" } : null, error: error?.message };
  },
  async signUp(email, password, fullName) {
    const supabase = await loadSupabase();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName ?? null } },
    });
    return { user: data.user ? { id: data.user.id, email: data.user.email ?? "" } : null, error: error?.message };
  },
  async signOut() {
    const supabase = await loadSupabase();
    await supabase.auth.signOut();
  },
  async getUser() {
    const supabase = await loadSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    return user ? { id: user.id, email: user.email ?? "" } : null;
  },
};

/** ---------- 모드에 따라 export ---------- */
export const authClient: AuthClient = MODE === "supabase" ? supabaseAuth : mockAuth;
