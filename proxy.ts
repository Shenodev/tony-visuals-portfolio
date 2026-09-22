import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifyAdminToken } from "@/lib/session";

const PROTECTED_PREFIXES = ["/t-dashboard", "/api/admin"];

function isProtectedPath(pathname: string): boolean {
  if (pathname === "/t-dashboard/login") return false;
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );
}

async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const isValid = token ? await verifyAdminToken(token) : false;

  if (isValid) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/t-dashboard/login";
  return NextResponse.redirect(loginUrl);
}

export default proxy;

export const config = {
  matcher: ["/t-dashboard/:path*", "/api/admin/:path*"],
};