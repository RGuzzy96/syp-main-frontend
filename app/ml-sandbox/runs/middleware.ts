import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { user } } = await supabase.auth.getUser();

  // 보호할 경로들
  const protectedPrefixes = ["/ml-sandbox", "/runs", "/platform/dashboard", "/dashboard"];

  const isProtected = protectedPrefixes.some((p) => req.nextUrl.pathname.startsWith(p));

  if (isProtected && !user) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

// 필요한 경로만 검사하도록 설정
export const config = {
  matcher: ["/ml-sandbox/:path*", "/runs/:path*", "/platform/dashboard/:path*", "/dashboard/:path*"],
};
