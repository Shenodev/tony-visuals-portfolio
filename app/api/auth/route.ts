import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_token";
const MAX_AGE = 60 * 60 * 24; // 24 hours

async function signToken(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );

  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
  return `${payload}.${sigB64}`;
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const COOKIE_SECRET = process.env.COOKIE_SECRET;

    if (!ADMIN_PASSWORD || !COOKIE_SECRET) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const payload = btoa(
      JSON.stringify({ pw: ADMIN_PASSWORD, exp: Date.now() + MAX_AGE * 1000 })
    );
    const token = await signToken(payload, COOKIE_SECRET);

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: MAX_AGE,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
