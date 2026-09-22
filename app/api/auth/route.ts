import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  MAX_AGE,
  isSameOrigin,
  safeEqual,
  signAdminToken,
} from "@/lib/session";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const key = clientKey(request, "login");
  if (!rateLimit(key, 10, 10 * 60 * 1000)) {
    const res = NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429 }
    );
    res.headers.set("Retry-After", "600");
    return res;
  }

  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { error: "Invalid request origin" },
      { status: 403 }
    );
  }

  let body: { password?: unknown };
  try {
    body = (await request.json()) as { password?: unknown };
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (!password) {
    return NextResponse.json(
      { error: "Password is required" },
      { status: 400 }
    );
  }

  const valid = await safeEqual(password, ADMIN_PASSWORD);

  if (!valid) {
    await new Promise((resolve) =>
      setTimeout(resolve, 300 + Math.random() * 400)
    );
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = await signAdminToken();

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: MAX_AGE,
  });

  return NextResponse.json({ success: true });
}