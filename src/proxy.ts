import { type NextRequest, NextResponse } from "next/server";

import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Refresh and validate the Supabase session.
  const { data, error } = await supabase.auth.getClaims();

  const isAuthenticated = !error && !!data?.claims;

  const pathname = request.nextUrl.pathname;

  // Routes
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  const isDashboardPage = pathname.startsWith("/dashboard");

  // Redirect authenticated users away from auth pages.
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users away from dashboard.
  if (!isAuthenticated && isDashboardPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Return response with refreshed cookies.
  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
