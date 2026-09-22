import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-space-2xl md:pt-space-3xl">
      <div className="max-w-[1800px] mx-auto">
        {/* Top row: eyebrow + slug */}
        <div className="grid grid-cols-12 border-b border-outline-variant/50">
          <div className="col-span-12 md:col-span-5 border-r border-outline-variant/50 px-margin-mobile md:px-margin py-space-md flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary-container"></span>
            <span className="text-label-sm font-label-sm tracking-widest text-primary-container uppercase">
              PORTFOLIO // LIVE · EVENTS · PORTRAITURE
            </span>
          </div>
          <div className="hidden md:flex col-span-7 px-margin py-space-md items-center justify-end gap-4">
            <span className="text-label-sm font-label-sm tracking-widest text-on-surface-variant uppercase font-mono">
              CAIRO, EGYPT — PHOTOGRAPHER
            </span>
            <span className="text-label-sm font-label-sm tracking-widest text-primary-container uppercase font-mono">
              ARCHIVE VOL. 01
            </span>
          </div>
        </div>

        {/* Display headline block */}
        <div className="px-margin-mobile md:px-margin py-space-2xl md:py-space-3xl border-b border-outline-variant/50">
          <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-on-surface leading-none tracking-tight uppercase">
            CAPTURING LIGHT,
            <br />
            EMOTION &amp; THE STAGE<span className="text-primary-container">.</span>
          </h1>
          <div className="mt-space-xl flex flex-col md:flex-row md:items-end md:justify-between gap-space-lg">
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
              Egypt-based visual storytelling — live performances, events, and
              dramatic portraiture built on strong lighting, precise timing, and
              genuine character.
            </p>
            <span className="text-label-md font-label-md tracking-widest uppercase text-primary-container border-b-2 border-primary-container pb-1 w-fit">
              VIEW THE WORK ↓
            </span>
          </div>
        </div>

        {/* Hero media */}
        <div className="relative border-b border-outline-variant/50">
          <div className="relative overflow-hidden aspect-[16/8] md:aspect-[16/7] w-full bg-surface-container-lowest group hud-bracket">
            <Image
              alt="Live concert arena with silhouette performers against dramatic mint cyan stage lighting and crowd hands"
              className="img-desat object-cover object-center"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXvdxrRszmPyADUgLrBzpTiNr4gQyBGMbmYkq6-aSSSPwECa4Wz2adtZSOuq0mMHW0Gqe0X0bqSGzl6xC637vml8VbG5HLbylNNjLnd-f2PEDkCyLU1bal85eNbMZu8LGaRTzvlLZeDE0Y66AmppwAp2JBQkADtsRHZaNcZnIJuQSJtghKLZkYmZuRuNWtJk1Q9Clxt_cjbFia_0sQX7cvWgbfZpzOmAz3lMN0D4RUkB3I82A88Ks"
              fill
              priority
              sizes="100vw"
              unoptimized
            />
            {/* Overlays */}
            <div className="absolute top-space-md left-0 pointer-events-none hidden sm:flex items-center gap-2 bg-background/90 backdrop-blur-md px-4 py-2 border border-outline-variant/40">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase">
                REC // [FRAME 01A]
              </span>
            </div>
            <div className="absolute bottom-space-md right-0 pointer-events-none hidden lg:flex items-center gap-4 bg-background/85 backdrop-blur-md px-4 py-2 border border-outline-variant/40">
              <span className="text-label-sm font-label-sm text-on-surface tracking-wider">
                50MM SUMMILUX
              </span>
              <span className="text-label-sm font-label-sm text-primary-container font-mono">
                1/250s · f/1.4 · ISO 3200
              </span>
            </div>
          </div>
          {/* Caption strip */}
          <div className="grid grid-cols-1 sm:grid-cols-12 text-label-sm font-label-sm border-t border-outline-variant/40">
            <div className="sm:col-span-4 px-margin-mobile md:px-margin py-space-sm border-b sm:border-b-0 sm:border-r border-outline-variant/40">
              <span className="text-primary-container font-bold mr-2">FIG 01.</span>
              <span className="tracking-widest uppercase text-on-surface">
                CAIRO, EGYPT // LIVE PRODUCTION
              </span>
            </div>
            <div className="sm:col-span-8 px-margin-mobile md:px-margin py-space-sm">
              <span className="tracking-widest uppercase text-on-surface-variant/80 font-mono text-[11px]">
                CHRONICLE ID #EG-01 // LIVE · EVENTS · PORTRAITURE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}