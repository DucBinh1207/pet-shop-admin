import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CookieKey } from "./constants/cookie-key";
import { RoleKey } from "./constants/role-key";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(CookieKey.AUTH_TOKEN_ADMIN);
  const role = request.cookies.get(RoleKey.USER_ROLE);

  if (request.nextUrl.pathname === "/login") {
    if (token && role) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!token || !role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
