import ContactForm from "./ContactForm";

export default function ContactBand() {
  return (
    <section
      id="contact"
      className="px-margin-mobile md:px-margin-desktop py-space-2xl max-w-[1600px] mx-auto"
    >
      <div className="bg-surface-container border border-outline-variant/40 p-space-lg md:p-space-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 relative overflow-hidden">
        <div className="max-w-xl z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-primary-container"></span>
            <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase">
              TOUR &amp; FESTIVAL BOOKINGS
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight mb-2">
            AVAILABLE WORLDWIDE FOR SELECT DATES IN 2024 / 2025
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Accepting commissions for headline world tours, editorial music
            press portraits, and premier international festival documentation.
            Send your name, contact email, and shoot details — Tony replies
            directly.
          </p>
          <div className="mt-space-lg text-label-sm font-label-sm text-on-surface-variant">
            <span className="text-primary-container tracking-widest uppercase">
              DIRECT LINE
            </span>
            <a
              href="mailto:tonylens.web@outlook.com"
              className="block mt-1 text-on-surface hover:text-primary-container transition-colors"
            >
              tonylens.web@outlook.com
            </a>
          </div>
        </div>
        <ContactForm />
        {/* Atmospheric corner flare */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </section>
  );
}