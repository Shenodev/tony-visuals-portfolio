import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Tony Visuals",
  description:
    "How Tony Visuals handles personal information collected through the contact form on this website.",
  alternates: { canonical: "/privacy" },
};

const CONTACT_EMAIL = "tonylens.web@outlook.com";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="22 September 2026"
      intro="This policy explains what personal information this website collects, why it is collected, and how you can exercise your rights over it. Tony Visuals is a photography studio based in Cairo, Egypt."
      sections={[
        {
          heading: "Information we collect",
          body: (
            <>
              <p>
                The only personal information we collect is what you choose to
                send through the contact form: your name, your email address,
                and the text of your message (the details of your shoot or
                inquiry). A hidden anti-bot field is checked but never stored as
                data. We do not create user accounts, and this site does not
                require registration.
              </p>
              <p>
                Nothing else is collected: no date of birth, no location data,
                no payment data, and no browsing behavior.
              </p>
            </>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <p>
              We use your name, email, and message only to respond to your
              inquiry and, if you proceed, to arrange a photography session.
              We do not use this information for marketing, profiling, or
              automated decision-making.
            </p>
          ),
        },
        {
          heading: "Legal basis",
          body: (
            <p>
              We process your information with your consent, given when you
              tick the consent box and submit the form. You may withdraw that
              consent at any time by emailing {CONTACT_EMAIL}.
            </p>
          ),
        },
        {
          heading: "Who we share it with",
          body: (
            <>
              <p>
                Your message is delivered to our inbox through Resend
                (resend.com), our transactional email provider. The content of
                your message is visible only to Tony Visuals. We do not sell,
                rent, or otherwise disclose your information to advertisers,
                data brokers, or any third party for their own purposes.
              </p>
              <p>
                Third-party services that may process data as part of operating
                this site: Vercel (hosting), Cloudinary (photography delivery),
                Google Fonts (font rendering), and Resend (email delivery). Each
                has its own privacy policy. Where possible, fonts are
                self-hosted; the only external font request is for the Material
                Symbols icon set. None of these services places tracking
                cookies on this site.
              </p>
            </>
          ),
        },
        {
          heading: "Cookies & analytics",
          body: (
            <p>
              This website sets no analytics, advertising, or tracking cookies.
              A strictly-necessary session cookie (<em>admin_token</em>) is set
              only when you sign in to the protected administrative area; the
              public site uses no cookies at all. See our{" "}
              <a href="/cookie-policy" className="text-primary-container">
                Cookie Policy
              </a>
              .
            </p>
          ),
        },
        {
          heading: "Retention",
          body: (
            <p>
              We do not store submitted messages in a visitor database. Messages
              live only in our email inbox and are kept for as long as needed to
              handle your inquiry, then deleted. Once a shoot is complete,
              photographs may be retained for the purpose of delivering your
              order and, with your agreement, portfolio use.
            </p>
          ),
        },
        {
          heading: "Children's privacy",
          body: (
            <p>
              This site is not directed at children. We do not knowingly collect
              personal information from anyone under the age of 16. By
              submitting the contact form you confirm that you are 16 or older,
              or that you have permission from a parent or guardian. If we learn
              that we have collected information from a child without consent,
              we will delete it promptly.
            </p>
          ),
        },
        {
          heading: "Your rights & data deletion requests",
          body: (
            <>
              <p>
                You can request access to, correction of, or deletion of the
                personal information you submitted at any time. Because we hold
                no visitor database, deleting your data simply means removing
                your message from our inbox — we will confirm when this is done.
              </p>
              <p>
                To make a request: reply to our reply with the word DELETE, or
                email {CONTACT_EMAIL} with the subject &ldquo;Data deletion
                request&rdquo; and the email address you used. We will action
                requests within a reasonable time and typically within 30 days.
              </p>
            </>
          ),
        },
        {
          heading: "Changes to this policy",
          body: (
            <p>
              We may update this policy from time to time. Changes will be
              published on this page with a new &ldquo;last updated&rdquo; date.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about this policy or your data: {CONTACT_EMAIL} — Tony
              Visuals, Cairo, Egypt.
            </p>
          ),
        },
      ]}
    />
  );
}