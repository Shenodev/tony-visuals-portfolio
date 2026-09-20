export default function Hero() {
  return (
    <section className="relative px-margin-mobile md:px-margin-desktop py-space-xl md:py-space-2xl max-w-[1600px] mx-auto">
      <div className="flex flex-col mb-space-lg">
        <div className="flex items-center gap-2 mb-space-sm">
          <span className="inline-block w-2 h-2 bg-primary-container"></span>
          <span className="text-label-sm font-label-sm tracking-widest text-primary-container uppercase">
            EXHIBITION MONOGRAPH // VOL. 08
          </span>
        </div>
        <h1 className="hidden md:block font-display-xl text-display-xl text-primary-container tracking-tight leading-none mb-space-sm">
          CAPTURING RAW SONIC ENERGY
        </h1>
        <h1 className="block md:hidden font-display-xl-mobile text-display-xl-mobile text-primary-container tracking-tight leading-none mb-space-sm">
          CAPTURING RAW SONIC ENERGY
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface max-w-2xl font-light tracking-wide opacity-90">
          ATMOSPHERIC EVENT &amp; CONCERT CHRONICLES. Unfiltered live-stage
          tension, stage lights, sonic frequencies, and transcendent audience
          communion preserved on 35mm formats.
        </p>
      </div>

      {/* Hero Featured Media Container */}
      <div className="relative w-full border border-outline-variant/40 bg-surface-container-lowest p-1 md:p-2 hud-bracket">
        <div className="relative overflow-hidden aspect-[16/9] w-full bg-surface-container-lowest group">
          <img
            alt="Live concert arena with silhouette performers against dramatic mint cyan stage lighting and crowd hands"
            className="w-full h-full object-cover object-center img-desat group-hover:scale-[1.01]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXvdxrRszmPyADUgLrBzpTiNr4gQyBGMbmYkq6-aSSSPwECa4Wz2adtZSOuq0mMHW0Gqe0X0bqSGzl6xC637vml8VbG5HLbylNNjLnd-f2PEDkCyLU1bal85eNbMZu8LGaRTzvlLZeDE0Y66AmppwAp2JBQkADtsRHZaNcZnIJuQSJtghKLZkYmZuRuNWtJk1Q9Clxt_cjbFia_0sQX7cvWgbfZpzOmAz3lMN0D4RUkB3I82A88Ks"
          />
          {/* Viewfinder HUD Overlays */}
          <div className="absolute top-4 left-4 pointer-events-none hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase">
              REC // [FRAME 24A]
            </span>
          </div>
          <div className="absolute bottom-4 right-4 pointer-events-none hidden sm:flex items-center gap-4 bg-surface/85 backdrop-blur-md px-3 py-1.5 border border-outline-variant/40">
            <span className="text-label-sm font-label-sm text-on-surface tracking-wider">
              35MM SUMMILUX
            </span>
            <span className="text-label-sm font-label-sm text-primary-container font-mono">
              1/250s · f/1.4 · ISO 3200
            </span>
          </div>
        </div>
        {/* Frame Metadata Caption */}
        <div className="w-full pt-space-sm pb-space-xs px-space-xs flex flex-col sm:flex-row justify-between items-start sm:items-center text-label-sm font-label-sm text-on-surface-variant border-t border-outline-variant/30 mt-1 gap-2">
          <div className="flex items-center gap-3">
            <span className="text-primary-container font-bold">FIG 01.</span>
            <span className="tracking-widest uppercase text-on-surface">
              AUSTIN PSYCH FEST // MAIN ARENA TRANSMISSION
            </span>
          </div>
          <div className="tracking-widest uppercase text-on-surface-variant/80 font-mono text-[11px]">
            LEICA M11 // 35MM SUMMILUX // CHRONICLE ID #802-TX
          </div>
        </div>
      </div>
    </section>
  );
}
