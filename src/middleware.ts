import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/jwt/jwt";

// 1. Specify protected and public routes
const publicRoutes = ["/sign-in", "/sign-up"];
const protectedRoutes = ["/"];

export default async function middleware(request: NextRequest) {
  // Get session or token from cookie storage
  const token = cookies().get("sessions")?.value;

  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. decoded token
  const payload = await decrypt(token);

  if (isProtectedRoute && !payload?.userId) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (payload?.userId && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next/static|_next/image|Icon|favicon.ico).*)"],
};
