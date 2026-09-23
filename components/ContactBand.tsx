import ContactForm from "./ContactForm";

export default function ContactBand() {
  return (
    <section id="contact" className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin py-space-2xl md:py-space-3xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-3xl">
        {/* Left — info */}
        <div className="lg:col-span-7 bg-surface-container rounded-xl p-space-xl md:p-space-2xl border border-outline-variant/20 shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
          <ContactForm />
        </div>

        {/* Right — booking notes */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-space-xl">
          <div>
            <span className="text-label-sm font-label-sm tracking-widest text-primary-container uppercase">
              Commissions &amp; bookings
            </span>
            <div className="relative overflow-hidden rounded-xl bg-surface-container border border-outline-variant/20 p-space-xl mt-space-md shadow-[0_8px_40px_rgba(0,0,0,0.45)] before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:bg-[radial-gradient(70%_60%_at_15%_0%,rgba(126,252,159,0.10),transparent)]">
              <dl className="flex flex-col divide-y divide-outline-variant/25">
                <div className="flex items-baseline justify-between gap-space-md py-space-md">
                  <dt className="text-label-sm font-label-sm tracking-widest text-on-surface-variant uppercase">
                    Location
                  </dt>
                  <dd className="font-headline-sm text-headline-sm text-on-surface">
                    Cairo · working worldwide
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-space-md py-space-md">
                  <dt className="text-label-sm font-label-sm tracking-widest text-on-surface-variant uppercase">
                    Response time
                  </dt>
                  <dd className="font-headline-sm text-headline-sm text-on-surface">
                    Within 1–2 days
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-space-md py-space-md">
                  <dt className="text-label-sm font-label-sm tracking-widest text-on-surface-variant uppercase">
                    Booking
                  </dt>
                  <dd className="font-headline-sm text-headline-sm text-on-surface">
                    Quote confirmed in writing
                  </dd>
                </div>
              </dl>
              <p className="mt-space-lg font-body-sm text-body-sm text-on-surface-variant">
                Dates, deliverables, and pricing are agreed personally before any
                session — see the{" "}
                <a
                  href="/refund-policy"
                  className="underline text-primary-container hover:opacity-80 transition-opacity"
                >
                  refund policy
                </a>{" "}
                for deposits and cancellations.
              </p>
            </div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mt-space-md">
              Let&apos;s create <span className="italic text-primary-container/90">something</span> together.
            </h2>
          </div>

          <div className="flex flex-col gap-space-md">
            <a
              href="https://www.instagram.com/tony_portfolioo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-space-sm rounded-full border border-primary-container/60 bg-primary-container/5 px-7 py-3 text-label-lg font-label-lg tracking-widest uppercase text-primary-container transition-colors hover:bg-primary-container/15"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
              </svg>
              @tony_portfolioo
            </a>
            <a
              href="mailto:tonylens.web@outlook.com"
              className="font-body-lg text-body-lg text-on-surface hover:text-primary-container transition-colors break-all underline decoration-outline-variant/40 underline-offset-4 decoration-1 hover:decoration-primary-container"
            >
              tonylens.web@outlook.com
            </a>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              Send your name, contact email, and shoot details — I reply
              directly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}