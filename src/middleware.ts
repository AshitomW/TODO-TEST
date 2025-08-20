import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Check if user is trying to access login/signup while already authenticated
  if ((pathname === "/login" || pathname === "/signup") && token) {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid token format");
      }

      JSON.parse(atob(parts[1]));

      // Valid token exists, redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch (error) {
      // Invalid token, clear it and allow access to login/signup
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid token format");
      }

      JSON.parse(atob(parts[1]));
    } catch (error) {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
