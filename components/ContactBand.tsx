export default function ContactBand() {
  return (
    <section
      id="contact"
      className="px-margin-mobile md:px-margin-desktop py-space-2xl max-w-[1600px] mx-auto"
    >
      <div className="bg-surface-container border border-outline-variant/40 p-space-lg md:p-space-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
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
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto z-10">
          <a
            href="mailto:inquiries@tonyvisuals.com"
            className="px-space-xl py-space-md bg-primary-container text-inverse-on-surface font-label-lg text-label-lg uppercase tracking-wider text-center font-bold hover:bg-tertiary transition-all duration-150 shadow-[0_0_20px_rgba(126,252,159,0.3)]"
          >
            INITIATE INQUIRY
          </a>
        </div>
        {/* Atmospheric corner flare */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </section>
  );
}
