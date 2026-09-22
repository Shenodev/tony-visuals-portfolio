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
        setError("Access denied — invalid credentials");
      }
    } catch {
      setError("Connection failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center mb-space-xl">
          <span className="font-headline-lg text-headline-lg text-on-surface">
            TONY&nbsp;VISUALS
          </span>
          <span className="text-label-sm font-label-sm tracking-widest text-primary-container uppercase mt-2">
            Admin console
          </span>
        </div>

        <div className="bg-surface-container rounded-xl border border-outline-variant/20 shadow-[0_8px_40px_rgba(0,0,0,0.35)] p-space-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-space-lg">
            <div>
              <label className="block text-label-sm font-label-sm tracking-widest text-on-surface-variant uppercase mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-outline-variant/40 px-1 py-3 text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary-container transition-colors duration-300"
              />
            </div>

            {error && (
              <p className="text-label-sm font-label-sm text-error tracking-wider uppercase">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-primary-container text-inverse-on-surface px-8 py-3 text-label-lg font-label-lg uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <div className="mt-space-lg text-center">
          <span className="text-label-sm font-label-sm text-on-surface-variant/70 tracking-widest uppercase">
            © {new Date().getFullYear()} Tony Visuals · Cairo, Egypt
          </span>
        </div>
      </div>
    </div>
  );
}