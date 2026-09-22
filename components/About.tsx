export default function About() {
  return (
    <section id="about" className="bg-surface-container-high text-on-surface relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        {/* Section top bar */}
        <div className="grid grid-cols-12 border-b border-outline-variant/50">
          <div className="col-span-12 md:col-span-6 border-r border-outline-variant/50 px-margin-mobile md:px-margin py-space-md flex items-center gap-2">
            <span className="w-2 h-2 bg-primary-container"></span>
            <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase">
              THE PHOTOGRAPHER // CAIRO, EGYPT
            </span>
          </div>
          <div className="hidden md:flex col-span-6 px-margin py-space-md items-center justify-end">
            <span className="text-label-sm font-label-sm tracking-widest text-on-surface-variant uppercase font-mono">
              SEC. 02 — ABOUT
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="px-margin-mobile md:px-margin py-space-2xl border-b border-outline-variant/50">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-tertiary tracking-tight uppercase max-w-4xl">
            DOCUMENTING LIGHT, TIMING &amp; AUTHENTIC EMOTION<span className="text-primary-container">.</span>
          </h2>
        </div>

        {/* Asymmetric bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-outline-variant/50">
          <div className="lg:col-span-6 px-margin-mobile md:px-margin py-space-2xl border-r-0 lg:border-r border-outline-variant/50">
            <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
              I&apos;m a photographer based in Egypt specializing in live
              performances, events, and dramatic portraiture. While my roots are
              deeply tied to the energy and storytelling of the stage, my work
              extends across live events and personal portraits that capture
              genuine character and emotion.
            </p>
          </div>
          <div className="lg:col-span-6 px-margin-mobile md:px-margin py-space-2xl">
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-xl">
              Whether documenting a live production, capturing key moments at an
              event, or directing a one-on-one portrait session, I focus on
              strong lighting, timing, and authentic emotions to create striking
              visual stories.
            </p>
          </div>
        </div>

        {/* Discipline pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            {
              icon: "equalizer",
              title: "LIVE PERFORMANCES",
              copy: "Concerts, stages, and the kinetic tension of live sound captured with precision and dramatic contrast.",
            },
            {
              icon: "event",
              title: "EVENTS",
              copy: "Key moments across festivals, corporate productions, and private gatherings — framed with narrative intent.",
            },
            {
              icon: "portrait",
              title: "DRAMATIC PORTRAITURE",
              copy: "Personal sessions shaped by intentional lighting and direction, revealing the real character behind the subject.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="flex flex-col gap-space-md px-margin-mobile md:px-margin py-space-xl border-r-0 md:border-r last:border-r-0 border-outline-variant/50"
            >
              <div className="flex items-center justify-between border-b border-outline-variant/40 pb-space-md">
                <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase font-mono">
                  0{i + 1}
                </span>
                <span className="material-symbols-outlined text-[22px] text-primary-container">
                  {item.icon}
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold uppercase">
                {item.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}