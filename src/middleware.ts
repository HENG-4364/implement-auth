import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt, refreshdecrypt } from "./lib/jwt/jwt";
import { getRefreshToken } from "../src/actions/refresh-token";
import { signout } from "./actions/sign-out";
import { isExpiredToken } from "./lib/is-expired-token";
// 1. Specify protected and public routes
const publicRoutes = ["/sign-in", "/sign-up"];
const protectedRoutes = ["/"];

export default async function middleware(request: NextRequest) {
  // Get session or token from cookie storage
  const token = cookies().get("sessions")?.value;
  const refreshToken = cookies().get("refreshToken")?.value;
  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. decoded token
  const payload = await decrypt(token);

  // Refresh Token Middleware
  if (isExpiredToken(payload) && refreshToken) {
    const response = NextResponse.next();
    const { data } = await getRefreshToken(refreshToken);

    if (data) {
      response.cookies.set({
        name: "sessions",
        value: data?.accessToken,
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
      });

      response.cookies.set({
        name: "refreshToken",
        value: data?.refreshToken,
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
      });
    }

    return response;
  }

  // Authentication Middleware
  if (isProtectedRoute && !payload?.userId) {
    const response = NextResponse.redirect(new URL("/sign-in", request.url));
    response.cookies.delete("sessions");
    response.cookies.delete("refreshToken");
    return response;
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
