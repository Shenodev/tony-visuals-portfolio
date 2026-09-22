import { NextRequest } from "next/server";

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 20_000;

/**
 * Minimal in-memory sliding-window rate limiter keyed by route scope + IP.
 * Serverless (per-instance) semantics make this a blunter instrument than a
 * centralized store, but it still stops single-source brute-force/spam spikes.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();

  if (buckets.size > MAX_BUCKETS) {
    const cutoff = now - 60 * 60 * 1000;
    for (const [k, bucket] of buckets) {
      if (bucket.resetAt < cutoff) buckets.delete(k);
    }
  }

  const existing = buckets.get(key);
  if (!existing || now >= existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (existing.count >= limit) return false;
  existing.count += 1;
  return true;
}

export function clientKey(request: NextRequest, scope: string): string {
  const xff = request.headers.get("x-forwarded-for");
  const ip = (xff ? xff.split(",")[0].trim() : "unknown") || "unknown";
  return `${scope}:${ip}`;
}