import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — Tony Visuals",
  description:
    "Terms of service for engaging Tony Visuals photography services and using this website.",
  alternates: { canonical: "/terms" },
};

const CONTACT_EMAIL = "tonylens.web@outlook.com";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="22 September 2026"
      intro="These terms govern both your use of this website and the provision of photography services by Tony Visuals, a photography studio based in Cairo, Egypt."
      sections={[
        {
          heading: "Services",
          body: (
            <p>
              Tony Visuals provides live performance, event, and portrait
              photography. Every session is agreed on an individual basis —
              scope, date, location, deliverables, and price are confirmed in
              writing (email) before work begins. No service is sold by this
              website itself.
            </p>
          ),
        },
        {
          heading: "Quotes, payments & no hidden fees",
          body: (
            <>
              <p>
                All quotes are free of charge and include every cost you will be
                asked to pay. We do not charge hidden fees. Any travel,
                overtime, printing, or delivery costs are stated in your quote
                up front and will only apply if you agree to them.
              </p>
              <p>
                Some sessions require a deposit to hold a date. Deposits,
                cancellation, and rescheduling are covered by our{" "}
                <a href="/refund-policy" className="text-primary-container">
                  Refund Policy
                </a>
                .
              </p>
            </>
          ),
        },
        {
          heading: "Intellectual property",
          body: (
            <>
              <p>
                All photographs taken by Tony Visuals are protected by copyright
                and remain the property of the photographer unless a written
                agreement states otherwise. Delivery of images grants you a
                license for the agreed use (personal, social, or commercial) —
                not ownership. You may not resell or stock-license the images.
              </p>
              <p>
                The photography shown on this site is the creator&apos;s own
                work. If you buy a gallery print, your print is a decorative
                reproduction for personal display, not a license to reproduce
                or redistribute the image.
              </p>
            </>
          ),
        },
        {
          heading: "Site content & licenses",
          body: (
            <p>
              Typography used on this site is openly licensed: Fraunces and
              Manrope are licensed under the SIL Open Font License 1.1 and are
              self-hosted; the Material Symbols icon set is licensed under the
              Apache License 2.0. Photographic portfolio images are owned by
              Tony Visuals (or licensed to the studio) and may not be reused
              without written permission. Sample placeholder artwork used during
              site setup is being replaced with original work.
            </p>
          ),
        },
        {
          heading: "Client responsibilities",
          body: (
            <p>
              You agree to provide accurate booking information, ensure
              appropriate permissions are in place for people you photograph or
              venues you book, and make the agreed location or subjects
              available at the agreed time. Where a likeness release is needed,
              we will agree it before the session.
            </p>
          ),
        },
        {
          heading: "Testimonials & representations",
          body: (
            <p>
              This site contains no fabricated testimonials. Any review,
              portfolio piece, or statement about our work is genuine. We
              describe our services factually and make no claims of rankings,
              awards, guarantees, or specific outcomes.
            </p>
          ),
        },
        {
          heading: "Liability",
          body: (
            <p>
              We work to deliver the agreed images in good condition and on the
              agreed schedule. Except where the law provides otherwise, our
              liability for any claim connected to a session is limited to the
              amount paid for that session. We are not liable for events beyond
              our reasonable control, including venue issues, weather, or
              technical failure outside our systems.
            </p>
          ),
        },
        {
          heading: "Governing law",
          body: (
            <p>
              These terms are governed by the laws of the Arab Republic of
              Egypt. Any dispute will be subject to the exclusive jurisdiction
              of the courts of Cairo.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these terms: {CONTACT_EMAIL} — Tony Visuals,
              Cairo, Egypt.
            </p>
          ),
        },
      ]}
    />
  );
}