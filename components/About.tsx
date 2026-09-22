export default function About() {
  return (
    <section
      id="about"
      className="bg-surface-container-high text-on-surface py-space-2xl md:py-space-3xl border-y border-outline-variant/50 relative overflow-hidden"
    >
      <div className="px-margin-mobile md:px-margin-desktop max-w-[1500px] mx-auto">
        {/* Eyebrow & headline */}
        <div className="max-w-3xl mb-space-2xl">
          <div className="flex items-center gap-2 mb-space-sm">
            <span className="w-2 h-2 bg-primary-container"></span>
            <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase">
              THE PHOTOGRAPHER // CAIRO, EGYPT
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-tertiary tracking-tight">
            DOCUMENTING LIGHT, TIMING &amp; AUTHENTIC EMOTION
          </h2>
        </div>

        {/* Asymmetric two-column bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop mb-space-2xl">
          <div className="lg:col-span-5">
            <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
              I&apos;m a photographer based in Egypt specializing in live
              performances, events, and dramatic portraiture. While my roots are
              deeply tied to the energy and storytelling of the stage, my work
              extends across live events and personal portraits that capture
              genuine character and emotion.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:mt-4">
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Whether documenting a live production, capturing key moments at an
              event, or directing a one-on-one portrait session, I focus on
              strong lighting, timing, and authentic emotions to create striking
              visual stories.
            </p>
          </div>
        </div>

        {/* Discipline pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-space-xl border-t border-outline-variant/40">
          <div className="border-l border-primary-container pl-4">
            <span className="material-symbols-outlined text-[18px] text-primary-container block mb-1">
              equalizer
            </span>
            <span className="block font-headline-sm text-headline-sm text-on-surface font-semibold mb-0.5">
              LIVE PERFORMANCES
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Concerts, stages, and the kinetic tension of live sound captured
              with precision and dramatic contrast.
            </span>
          </div>
          <div className="border-l border-primary-container pl-4">
            <span className="material-symbols-outlined text-[18px] text-primary-container block mb-1">
              event
            </span>
            <span className="block font-headline-sm text-headline-sm text-on-surface font-semibold mb-0.5">
              EVENTS
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Key moments across festivals, corporate productions, and private
              gatherings — framed with narrative intent.
            </span>
          </div>
          <div className="border-l border-primary-container pl-4">
            <span className="material-symbols-outlined text-[18px] text-primary-container block mb-1">
              portrait
            </span>
            <span className="block font-headline-sm text-headline-sm text-on-surface font-semibold mb-0.5">
              DRAMATIC PORTRAITURE
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Personal sessions shaped by intentional lighting and direction,
              revealing the real character behind the subject.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
