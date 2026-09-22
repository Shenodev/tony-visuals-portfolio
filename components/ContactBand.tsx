import ContactForm from "./ContactForm";

export default function ContactBand() {
  return (
    <section id="contact" className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin py-space-2xl md:py-space-3xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-3xl">
        {/* Left — info */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-space-xl">
          <div>
            <span className="text-label-sm font-label-sm tracking-widest text-primary-container uppercase">
              Commissions &amp; bookings
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mt-space-md">
              Let&apos;s create <span className="italic text-primary-container/90">something</span> together.
            </h2>
          </div>

          <div className="flex flex-col gap-space-md">
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

        {/* Right — form panel */}
        <div className="lg:col-span-7 bg-surface-container rounded-xl p-space-xl md:p-space-2xl border border-outline-variant/20 shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}