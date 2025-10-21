"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      // URL의 code 파라미터를 세션으로 교환
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
      // 에러가 있어도 일단 대시보드로 이동(원하면 에러 페이지로)
      router.replace("/dashboard");
    })();
  }, [router]);

  return (
    <div className="min-h-[100dvh] flex items-center justify-center">
      <p className="text-sm text-muted-foreground">Completing sign-in…</p>
    </div>
  );
}
