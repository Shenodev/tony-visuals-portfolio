"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/t-dashboard");
      } else {
        setError("ACCESS DENIED — INVALID CREDENTIALS");
      }
    } catch {
      setError("CONNECTION FAILED");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-inverse-on-surface flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Terminal header */}
        <div className="border-2 border-primary-container bg-surface-container-lowest px-4 py-3 mb-0">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 bg-error rounded-full"></span>
            <span className="w-2.5 h-2.5 bg-tertiary-fixed-dim rounded-full"></span>
            <span className="w-2.5 h-2.5 bg-primary-container rounded-full"></span>
          </div>
          <p className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase">
            SYS://SECURE_ACCESS_PORTAL
          </p>
          <p className="text-label-sm font-label-sm text-on-surface-variant/60 tracking-wider mt-1">
            AUTHENTICATION REQUIRED
          </p>
        </div>

        {/* Form body */}
        <form
          onSubmit={handleSubmit}
          className="border-x-2 border-b-2 border-primary-container bg-surface-container-lowest p-6"
        >
          <label className="block mb-4">
            <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase mb-2 block">
              PASSWORD Credential
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              placeholder="••••••••"
              className="w-full bg-inverse-on-surface border-2 border-outline-variant text-on-surface font-body-md px-4 py-3 placeholder:text-on-surface-variant/30 focus:border-primary-container focus:outline-none transition-colors"
            />
          </label>

          {error && (
            <div className="border border-error bg-error-container/20 px-4 py-3 mb-4">
              <p className="text-label-sm font-label-sm text-error tracking-wider uppercase">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-space-md py-space-sm bg-primary-container text-inverse-on-surface font-label-lg text-label-lg uppercase tracking-wider font-bold hover:shadow-[0_0_20px_rgba(126,252,159,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
          >
            {loading ? "AUTHENTICATING..." : "AUTHENTICATE"}
          </button>
        </form>

        {/* Footer watermark */}
        <div className="mt-4 text-center">
          <p className="text-label-sm font-label-sm text-on-surface-variant/40 tracking-widest uppercase">
            TONY VISUALS — ADMIN CONSOLE v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
