"use client";

import { useState, FormEvent } from "react";
import Icon from "@/components/Icon";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full bg-transparent border-b border-outline-variant/40 px-1 py-3 text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/70 focus:border-primary-container transition-colors duration-300";
const labelBase =
  "block text-label-sm font-label-sm tracking-widest text-on-surface-variant uppercase mb-1";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [consent, setConsent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // Honeypot — hidden from humans, bots auto-fill it.
  const [company, setCompany] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, details, consent, company }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(
          (data && data.message) || "Something went wrong. Please try again later."
        );
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setDetails("");
      setConsent(false);
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again later.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-primary-container/30 p-space-xl text-center">
        <Icon
          name="check_circle"
          className="w-11 h-11 mx-auto mb-3 block text-primary-container"
        />
        <h4 className="font-headline-sm text-headline-sm text-primary-container mb-1">
          Inquiry received
        </h4>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Your message is on its way. I&apos;ll reply at{" "}
          <span className="text-primary-container">{email}</span> shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-space-md text-label-sm font-label-sm tracking-widest uppercase text-primary-container hover:opacity-80 transition-opacity"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-space-lg"
      noValidate
    >
      {/* Honeypot — visually hidden from users, bots fill it in */}
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        name="company"
      />

      <div>
        <label htmlFor="cf-name" className={labelBase}>
          Your name
        </label>
        <input
          id="cf-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={120}
          required
          placeholder="Jane Doe"
          className={inputBase}
        />
      </div>

      <div>
        <label htmlFor="cf-email" className={labelBase}>
          Email address
        </label>
        <input
          id="cf-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={254}
          required
          placeholder="jane@example.com"
          className={inputBase}
        />
      </div>

      <div>
        <label htmlFor="cf-details" className={labelBase}>
          Tell me about your shoot
        </label>
        <textarea
          id="cf-details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          maxLength={5000}
          required
          minLength={10}
          rows={5}
          placeholder="Event type, date, location, references..."
          className={`${inputBase} resize-y`}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="cf-consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-1 h-4 w-4 shrink-0 accent-primary-container"
        />
        <label
          htmlFor="cf-consent"
          className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed cursor-pointer"
        >
          I am 16 or older (or have a parent/guardian&apos;s permission), and I
          agree that my name, email, and message may be used so Tony Visuals can
          reply to my inquiry, as described in the{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary-container hover:opacity-80 transition-opacity"
          >
            privacy policy
          </a>
          . I understand I can ask for my data to be deleted at any time.
        </label>
      </div>

      {status === "error" && (
        <p className="text-label-sm font-label-sm text-error tracking-wider uppercase">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting" || !consent}
        className="rounded-full bg-primary-container text-inverse-on-surface px-8 py-3.5 text-label-lg font-label-lg uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed w-fit"
      >
        {status === "submitting" ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}