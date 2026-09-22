"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const STORAGE_KEY = "tony-visuals:cookie-notice";

function readConsent(): boolean {
  try {
    // Show the notice until it has been acknowledged.
    return !localStorage.getItem(STORAGE_KEY);
  } catch {
    return true;
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

export default function CookieBanner() {
  const visible = useSyncExternalStore(subscribe, readConsent, () => false);

  if (!visible) return null;

  function acknowledge() {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* ignore storage errors */
    }
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-40 px-gutter-mobile pb-4"
    >
      <div className="mx-auto max-w-3xl bg-surface-container-high border border-outline-variant/40 rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.45)] p-space-lg flex flex-col sm:flex-row items-start sm:items-center gap-space-md">
        <p className="font-body-sm text-body-sm text-on-surface-variant flex-1">
          This site uses no tracking or analytics cookies — a session cookie is
          used only inside the protected admin area. Read our{" "}
          <Link
            href="/cookie-policy"
            className="underline text-primary-container hover:opacity-80 transition-opacity"
          >
            cookie policy
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline text-primary-container hover:opacity-80 transition-opacity"
          >
            privacy policy
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={acknowledge}
          className="rounded-full bg-primary-container text-inverse-on-surface px-5 py-2 text-label-md font-label-md uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0"
        >
          Got it
        </button>
      </div>
    </div>
  );
}