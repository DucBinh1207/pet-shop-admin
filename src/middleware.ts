import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CookieKey } from "./constants/cookie-key";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(CookieKey.AUTH_TOKEN_ADMIN);

  if (request.nextUrl.pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
