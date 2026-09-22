"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full bg-transparent border-b-2 border-outline-variant/60 px-0 py-3 text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary-container transition-colors duration-150";
const labelBase =
  "block text-label-sm font-label-sm text-primary-container tracking-widest uppercase mb-1";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
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
        body: JSON.stringify({ name, email, details, company }),
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
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again later.");
    }
  }

  if (status === "success") {
    return (
      <div className="w-full md:max-w-md bg-surface-container p-space-xl text-center border-2 border-primary-container/50">
        <span className="material-symbols-outlined text-primary-container text-[40px] mb-2">
          check_circle
        </span>
        <h4 className="font-headline-sm text-headline-sm text-primary-container uppercase tracking-tight mb-1">
          INQUIRY RECEIVED
        </h4>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Your message is on its way. Tony will reply at{" "}
          <span className="text-primary-container">{email}</span> shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-space-md text-label-sm font-label-sm text-primary-container tracking-wider uppercase hover:underline"
        >
          SEND ANOTHER →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:max-w-md bg-surface-container p-space-xl flex flex-col gap-space-lg border-2 border-outline-variant/50"
      noValidate
    >
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-primary-container animate-pulse"></span>
        <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase">
          BOOKING FORM // INQUIRY
        </span>
      </div>

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
          YOUR NAME
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
          YOUR EMAIL
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
          PHOTOSHOOT DETAILS
        </label>
        <textarea
          id="cf-details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          maxLength={5000}
          required
          minLength={10}
          rows={5}
          placeholder="Event type, date, location, expected duration, references..."
          className={`${inputBase} resize-y`}
        />
      </div>

      {status === "error" && (
        <p className="text-label-sm font-label-sm text-error uppercase tracking-wider">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="px-space-xl py-space-md bg-primary-container text-inverse-on-surface font-label-lg text-label-lg uppercase tracking-wider text-center font-bold hover:bg-tertiary transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "SENDING..." : "SEND INQUIRY"}
      </button>
    </form>
  );
}