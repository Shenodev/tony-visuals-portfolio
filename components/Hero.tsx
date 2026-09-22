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

        {/* Temporary art direction placeholder — replace with the final concert photograph. */}
        <div className="lg:col-span-5 hidden lg:block">
          <div
            role="img"
            aria-label="Placeholder artwork showing a concert photographer silhouetted against mint and cyan stage lights"
            className="concert-placeholder relative aspect-[16/10] overflow-hidden rounded-2xl border border-primary-container/20 shadow-[0_24px_80px_rgba(0,0,0,0.38)]"
          >
            <div className="concert-placeholder__beam concert-placeholder__beam--one" />
            <div className="concert-placeholder__beam concert-placeholder__beam--two" />
            <div className="concert-placeholder__beam concert-placeholder__beam--three" />
            <div className="concert-placeholder__fog" />
            <div className="concert-placeholder__crowd" />
            <div className="concert-placeholder__photographer" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-[10px] font-label-sm uppercase tracking-[0.24em] text-on-surface/70">
              <span>Live / Cairo</span>
              <span>Placeholder visual</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
