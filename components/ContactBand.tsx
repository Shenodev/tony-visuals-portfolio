import ContactForm from "./ContactForm";

export default function ContactBand() {
  return (
    <section id="contact" className="max-w-[1800px] mx-auto">
      {/* Section top bar */}
      <div className="grid grid-cols-12 border-b border-outline-variant/50">
        <div className="col-span-12 md:col-span-6 border-r border-outline-variant/50 px-margin-mobile md:px-margin py-space-md flex items-center gap-2">
          <span className="w-2 h-2 bg-primary-container"></span>
          <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase">
            TOUR &amp; FESTIVAL BOOKINGS — COMMISSIONS OPEN
          </span>
        </div>
        <div className="hidden md:flex col-span-6 px-margin py-space-md items-center justify-end">
          <span className="text-label-sm font-label-sm tracking-widest text-on-surface-variant uppercase font-mono">
            SEC. 04 — CONTACT
          </span>
        </div>
      </div>

      {/* Body grid */}
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-6 px-margin-mobile md:px-margin py-space-2xl border-b md:border-b-0 md:border-r border-outline-variant/50 flex flex-col justify-between gap-space-xl">
          <div>
            <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-black uppercase tracking-tight max-w-xl">
              AVAILABLE FOR COMMISSIONS<span className="text-primary-container">.</span>
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mt-space-md leading-relaxed">
              Live productions, events, and one-on-one portrait sessions. Send
              your name, contact email, and shoot details — Tony replies
              directly.
            </p>
          </div>
          <div className="text-label-sm font-label-sm">
            <span className="text-primary-container tracking-widest uppercase">
              DIRECT LINE
            </span>
            <a
              href="mailto:tonylens.web@outlook.com"
              className="block mt-1 text-headline-sm font-headline-sm text-on-surface hover:text-primary-container transition-colors break-all"
            >
              tonylens.web@outlook.com
            </a>
          </div>
        </div>

        <div className="md:col-span-6 px-margin-mobile md:px-margin py-space-2xl">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}