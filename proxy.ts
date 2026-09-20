import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "admin_token";
const PROTECTED_PREFIXES = ["/t-dashboard", "/api/admin"];

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

function isProtectedPath(pathname: string): boolean {
  if (pathname === "/t-dashboard/login") return false;
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );
}

async function verifyToken(token: string): Promise<boolean> {
  if (!COOKIE_SECRET) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payloadB64, sigB64] = parts;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(COOKIE_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const sigBytes = Uint8Array.from(atob(sigB64), (c) => c.charCodeAt(0));
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    sigBytes,
    new TextEncoder().encode(payloadB64)
  );

  if (!valid) return false;

  try {
    const payload = JSON.parse(atob(payloadB64));
    if (typeof payload.exp !== "number") return false;
    if (Date.now() > payload.exp) return false;
    return payload.pw === ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const isValid = token ? await verifyToken(token) : false;

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
