const SERVICES = [
  { index: "01", label: "Live performances" },
  { index: "02", label: "Events & celebrations" },
  { index: "03", label: "Dramatic portraiture" },
];

export default function Hero() {
  return (
    <section className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin pt-space-3xl md:pt-space-4xl pb-space-2xl md:pb-space-3xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-3xl items-center">
        {/* Copy */}
        <div className="lg:col-span-7 flex flex-col gap-space-lg">
          <span className="text-label-sm font-label-sm tracking-widest text-primary-container uppercase">
            Live · Events · Portraiture — Cairo, Egypt
          </span>
          <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-on-surface leading-none">
            Capturing light, <br className="hidden md:block" />
            <span className="italic text-primary-container/90">emotion</span>, &amp; the{" "}
            <span className="italic">stage.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
            Egypt-based visual storytelling — live performances, events, and
            dramatic portraiture built on strong lighting, precise timing, and
            genuine character.
          </p>
          <div className="flex items-center gap-space-md pt-space-sm">
            <a
              href="#portfolio"
              className="rounded-full bg-primary-container text-inverse-on-surface px-7 py-3 text-label-lg font-label-lg uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              View the work
            </a>
            <a
              href="#contact"
              className="text-label-lg font-label-lg tracking-widest uppercase text-on-surface-variant hover:text-primary-container transition-colors"
            >
              Get in touch →
            </a>
          </div>
        </div>

        {/* Editorial plate */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="relative overflow-hidden rounded-xl bg-surface-container border border-outline-variant/20 p-space-2xl shadow-[0_8px_40px_rgba(0,0,0,0.45)] before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:bg-[radial-gradient(60%_80%_at_85%_10%,rgba(126,252,159,0.12),transparent),radial-gradient(50%_60%_at_10%_90%,rgba(35,104,113,0.35),transparent)]">
            <div className="flex items-start justify-between">
              <span className="font-display-lg italic text-primary-container">TV</span>
              <span className="text-label-sm font-label-sm tracking-widest text-on-surface-variant uppercase">
                Est. Cairo
              </span>
            </div>

            <div className="mt-space-xl flex flex-col divide-y divide-outline-variant/25">
              {SERVICES.map((service) => (
                <div
                  key={service.index}
                  className="flex items-baseline justify-between gap-space-md py-space-md"
                >
                  <span className="text-label-sm font-label-sm text-on-surface-variant/60">
                    {service.index}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    {service.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-space-xl font-body-sm text-body-sm text-on-surface-variant">
              Available for commissions across Egypt and worldwide — dates
              agreed personally by email.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}