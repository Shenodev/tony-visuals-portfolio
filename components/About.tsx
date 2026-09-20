export default function About() {
  return (
    <section
      id="about"
      className="bg-surface-container-high text-on-surface py-space-2xl md:py-space-3xl border-y border-outline-variant/50 relative overflow-hidden"
    >
      <div className="px-margin-mobile md:px-margin-desktop max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
          {/* Left Column: Tony's Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative group">
              {/* Geometric frame backdrop */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary-container/20 to-transparent border border-primary-container/40 pointer-events-none"></div>
              {/* Soft-edged / Rounded Editorial Avatar Frame */}
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden border-2 border-primary-container p-1.5 shadow-[0_0_30px_rgba(126,252,159,0.15)] bg-surface-container-lowest">
                <img
                  alt="Tony Visuals editorial portrait holding rangefinder camera backstage at a concert venue"
                  className="w-full h-full object-cover rounded-full filter contrast-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAni8xp-IMApTIS2NbhfhJFhRFwYPvBWyhkYvwqR98vp1gFONA9gy7w2xg1rh-FS72MOdYaUbqC1xi4RsJRYWseQh_mfcSZ7vqaCSQwryu6yYZ0c2sY1dXgEXK86jnM56zbI4tazOVqxhpxtGALc-89UUduxhnxZLvLYj3t6zmCajiub0cgoxhw1ekqwEop04elrfo23ZLiW7k8qrHzfhjMz7aPWp1rJ7C35DvL1I8wgk7RqHslm5s"
                />
              </div>
              {/* Floating Film Badge */}
              <div className="absolute -bottom-4 right-4 bg-surface border border-outline-variant/50 px-4 py-2 flex items-center gap-2 shadow-2xl">
                <span className="w-2 h-2 bg-primary-container"></span>
                <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase">
                  DIR. TONY SHEPHERD
                </span>
              </div>
            </div>
          </div>
          {/* Right Column: Editorial Bio & Career Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center mt-8 lg:mt-0">
            <div className="flex items-center gap-2 mb-space-sm">
              <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase">
                THE DOCUMENTARIAN
              </span>
              <span className="h-[1px] w-12 bg-primary-container"></span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-tertiary tracking-tight mb-space-md">
              A DECADE IN THE PIT, BEHIND STACKS &amp; UNDER STROBES
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface opacity-90 mb-space-sm leading-relaxed">
              Based between London and Berlin, Tony Visuals chronicles the
              unfiltered electric pulse of live music performance. Over ten
              years, he has moved in tandem with international headliners and
              underground collectives—standing shoulder-to-shoulder with roaring
              crowds and documenting intimate backstage rituals before the
              curtains rise.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-xl leading-relaxed">
              His work transcends standard live reportage by treating each stage
              as a high-contrast architectural stage. Through tactile film
              emulsions and surgical prime-lens optics, every frame crystallizes
              kinetic soundwaves, neon luminescence, and genuine human euphoria
              into permanent fine art monographs.
            </p>
            {/* Key Metric Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-space-lg border-t border-outline-variant/40">
              <div className="border-l border-primary-container pl-4">
                <span className="block font-headline-lg text-headline-lg text-primary-container font-bold">
                  120+
                </span>
                <span className="text-label-sm font-label-sm text-on-surface tracking-wider uppercase">
                  FESTIVALS
                </span>
              </div>
              <div className="border-l border-primary-container pl-4">
                <span className="block font-headline-lg text-headline-lg text-primary-container font-bold">
                  45
                </span>
                <span className="text-label-sm font-label-sm text-on-surface tracking-wider uppercase">
                  WORLD TOURS
                </span>
              </div>
              <div className="border-l border-primary-container pl-4">
                <span className="block font-headline-lg text-headline-lg text-primary-container font-bold">
                  10YR
                </span>
                <span className="text-label-sm font-label-sm text-on-surface tracking-wider uppercase">
                  STAGE TENURE
                </span>
              </div>
              <div className="border-l border-primary-container pl-4">
                <span className="block font-headline-lg text-headline-lg text-primary-container font-bold">
                  TOP 50
                </span>
                <span className="text-label-sm font-label-sm text-on-surface tracking-wider uppercase">
                  ROLLING STONE &amp; PITCHFORK
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
