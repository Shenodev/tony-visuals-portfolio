import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy — Tony Visuals",
  description:
    "How cookies are used on the Tony Visuals website, including the admin session cookie and the consent preference.",
  alternates: { canonical: "/cookie-policy" },
};

const CONTACT_EMAIL = "tonylens.web@outlook.com";

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="22 September 2026"
      intro="This page explains which cookies this website uses and why. In short: the public site uses none."
      sections={[
        {
          heading: "What is a cookie?",
          body: (
            <p>
              A cookie is a small text file a website asks your browser to
              store. Cookies can be &ldquo;strictly necessary&rdquo; (needed for
              the site to function), or used for analytics, advertising, and
              tracking.
            </p>
          ),
        },
        {
          heading: "Cookies on the public site",
          body: (
            <p>
              The public pages of this website set no cookies at all. There are
              no analytics, advertising, or third-party tracking cookies, and no
              tracking scripts of any kind.
            </p>
          ),
        },
        {
          heading: "The admin session cookie",
          body: (
            <>
              <p>
                The only cookie used anywhere on this site is{" "}
                <em>admin_token</em>, a strictly-necessary session cookie. It is
                set only when you sign in to the protected administrative area (
                <em>/t-dashboard</em>) and is:
              </p>
              <ul className="list-disc pl-6 flex flex-col gap-1">
                <li>HTTP-only (not readable by scripts)</li>
                <li>restricted to the same site (SameSite=strict)</li>
                <li>sent only over HTTPS in production</li>
                <li>expiring after 24 hours</li>
              </ul>
              <p>
                It exists solely to keep you signed in, and it is never used for
                tracking.
              </p>
            </>
          ),
        },
        {
          heading: "Consent preference",
          body: (
            <p>
              When you dismiss the cookie notice, a small preference flag is
              saved in your browser&apos;s local storage on this site. This is
              not a cookie and contains no personal data — it simply remembers
              that you have seen the notice so it does not reappear. You can
              clear it any time through your browser&apos;s site-data or local
              storage settings.
            </p>
          ),
        },
        {
          heading: "Third-party services",
          body: (
            <p>
              This site is hosted on Vercel, displays images through Cloudinary,
              sends contact-form email through Resend, and loads an icon font
              from Google Fonts. None of these services places tracking cookies
              on this site. They may place technical cookies on their own
              domains when you visit them directly; those are governed by their
              own policies.
            </p>
          ),
        },
        {
          heading: "Managing cookies",
          body: (
            <p>
              You can refuse or delete cookies through your browser settings and
              clear the site&apos;s local storage at any time. Because this site
              does not use tracking cookies, blocking cookies changes nothing
              about the public experience, with the small exception that the
              cookie notice may reappear if you clear local storage.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about cookies or privacy: {CONTACT_EMAIL} — Tony Visuals,
              Cairo, Egypt.
            </p>
          ),
        },
      ]}
    />
  );
}