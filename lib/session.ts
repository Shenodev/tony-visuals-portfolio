import { NextRequest, NextResponse } from "next/server";

export const COOKIE_NAME = "admin_token";
export const MAX_AGE = 60 * 60 * 24; // 24 hours, in seconds

export async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value)
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function toB64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function fromB64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function getConfig(): { password: string; secret: string } | null {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.COOKIE_SECRET;
  if (!password || !secret) return null;
  return { password, secret };
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * Constant-time comparison. Both inputs are hashed first so the comparison
 * runs over fixed-length digests (no length or early-exit timing leak).
 */
export async function safeEqual(a: string, b: string): Promise<boolean> {
  const [ha, hb] = [await sha256Hex(a), await sha256Hex(b)];
  let diff = 0;
  for (let i = 0; i < ha.length; i++) {
    diff |= ha.charCodeAt(i) ^ hb.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Sign an admin session token. The payload carries only a fingerprint of the
 * admin password (not the password itself), so the plaintext secret never
 * leaves the server. Token validity is bound to the current password hash,
 * so rotating ADMIN_PASSWORD immediately invalidates outstanding sessions.
 */
export async function signAdminToken(): Promise<string> {
  const config = getConfig();
  if (!config) {
    throw new Error("Admin session: COOKIE_SECRET / ADMIN_PASSWORD are not set.");
  }

  const payload = JSON.stringify({
    sub: "admin",
    pwh: await sha256Hex(config.password),
    exp: Date.now() + MAX_AGE * 1000,
  });
  const payloadB64 = toB64(new TextEncoder().encode(payload));

  const key = await hmacKey(config.secret);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payloadB64)
  );

  return `${payloadB64}.${toB64(new Uint8Array(signature))}`;
}

export async function verifyAdminToken(
  token: string | undefined
): Promise<boolean> {
  const config = getConfig();
  if (!config || !token) return false;

  const dot = token.indexOf(".");
  if (dot === -1) return false;
  const payloadB64 = token.slice(0, dot);
  const sigB64 = token.slice(dot + 1);

  try {
    const key = await hmacKey(config.secret);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromB64(sigB64) as BufferSource,
      new TextEncoder().encode(payloadB64)
    );
    if (!valid) return false;

    const payload = JSON.parse(
      new TextDecoder().decode(fromB64(payloadB64))
    ) as { sub?: string; pwh?: string; exp?: number };

    if (payload.sub !== "admin") return false;
    if (typeof payload.exp !== "number" || Date.now() > payload.exp) {
      return false;
    }
    if (payload.pwh !== (await sha256Hex(config.password))) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Defense-in-depth: every /api/admin handler calls this in addition to the
 * proxy guard, so a misconfigured proxy can never expose a route.
 */
export async function requireAdmin(
  request: NextRequest
): Promise<NextResponse | null> {
  if (!(await verifyAdminToken(request.cookies.get(COOKIE_NAME)?.value))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

/**
 * CSRF defense-in-depth on top of the sameSite cookie. Rejects state-changing
 * requests whose explicit Origin does not match the request Host. Requests
 * without an Origin header (curl, native clients) are allowed.
 */
export function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const host = request.headers.get("host") || "";
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}