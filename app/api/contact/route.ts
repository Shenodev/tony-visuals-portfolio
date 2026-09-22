import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { isSameOrigin } from "@/lib/session";
import { clientKey, rateLimit } from "@/lib/rate-limit";

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_DETAILS = 5000;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  details?: unknown;
  consent?: unknown;
  // Honeypot field — real users never see it, bots always fill it.
  company?: unknown;
}

function isSafeEmail(email: string): boolean {
  if (email.length > MAX_EMAIL) return false;
  // ASCII-only address: blocks quotes/angle brackets/labels that could be
  // used to smuggle markup or headers into the notification email.
  return /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/.test(email);
}

function cleanString(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

// Strips CR/LF and other C0 control chars used for header-injection attempts.
function stripControlChars(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f]/g, "");
}

// Escapes HTML-sensitive characters (used for every interpolated field).
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  const key = clientKey(request, "contact");
  if (!rateLimit(key, 5, 10 * 60 * 1000)) {
    const res = NextResponse.json(
      { error: "RATE_LIMITED", message: "Too many requests. Try again later." },
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

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "INVALID_PAYLOAD", message: "Invalid request body." },
      { status: 400 }
    );
  }

  // Honeypot: reject silently (pretend success) so bots keep thinking it worked.
  if (typeof body.company === "string" && body.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (body.consent !== true) {
    return NextResponse.json(
      {
        error: "CONSENT_REQUIRED",
        message: "Please accept the privacy policy to send your inquiry.",
      },
      { status: 422 }
    );
  }

  const name = stripControlChars(cleanString(body.name, MAX_NAME));
  const email = cleanString(body.email, MAX_EMAIL).toLowerCase();
  const details = stripControlChars(cleanString(body.details, MAX_DETAILS));

  if (!name) {
    return NextResponse.json(
      { error: "NAME_REQUIRED", message: "Please provide your name." },
      { status: 422 }
    );
  }
  if (!isSafeEmail(email)) {
    return NextResponse.json(
      { error: "EMAIL_INVALID", message: "Please provide a valid email address." },
      { status: 422 }
    );
  }
  if (details.length < 10) {
    return NextResponse.json(
      {
        error: "DETAILS_TOO_SHORT",
        message: "Please describe the photoshoot details (min 10 characters).",
      },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL || "tonylens.web@outlook.com";
  const from = process.env.RESEND_FROM || "onboarding@resend.dev";

  if (!apiKey) {
    console.error("Contact route: RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "SERVER_ERROR", message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeDetails = escapeHtml(details);

  const text = [
    `New photography inquiry from ${name}`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    `Photoshoot details:`,
    details,
    "",
    "— Sent from Tony Visuals portfolio",
  ].join("\n");

  const emailFooter =
    "Tony Visuals · Cairo, Egypt · No promotional emails are sent. To request deletion of the personal data in this message, reply with DELETE.";

  try {
    await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `📸 New inquiry — ${name}`,
      text,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #081F26; color: #FAFAFA; padding: 32px; border: 1px solid #236871;">
          <h2 style="color: #7EFC9F; margin: 0 0 20px; letter-spacing: 1px; text-transform: uppercase;">New Photoshoot Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #7EFC9F; width: 140px; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Name</td>
              <td style="padding: 8px 0;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #7EFC9F; width: 140px; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #7EFC9F;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top; color: #7EFC9F; width: 140px; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Details</td>
              <td style="padding: 8px 0; white-space: pre-wrap;">${safeDetails}</td>
            </tr>
          </table>
          <p style="margin-top: 28px; font-size: 12px; color: #bccabb;">${escapeHtml(
            emailFooter
          )}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Contact route: Resend send failed.", e);
    return NextResponse.json(
      { error: "SERVER_ERROR", message: "Could not send your message. Please try again later." },
      { status: 500 }
    );
  }
}