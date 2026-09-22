export default function About() {
  return (
    <section
      id="about"
      className="bg-surface-container-high/60 border-y border-outline-variant/20"
    >
      <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin py-space-2xl md:py-space-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-3xl">
          {/* Headline column */}
          <div className="lg:col-span-5">
            <span className="text-label-sm font-label-sm tracking-widest text-primary-container uppercase">
              About
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mt-space-md">
              A photographer based in <span className="italic text-primary-container/90">Egypt</span>
            </h2>
          </div>

          {/* Bio + pillars */}
          <div className="lg:col-span-7 flex flex-col gap-space-xl">
            <p className="font-body-lg text-body-lg text-on-surface/90 leading-relaxed">
              I&apos;m a photographer based in Egypt specializing in live
              performances, events, and dramatic portraiture. While my roots are
              deeply tied to the energy and storytelling of the stage, my work
              extends across live events and personal portraits that capture
              genuine character and emotion.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-2xl">
              Whether documenting a live production, capturing key moments at an
              event, or directing a one-on-one portrait session, I focus on
              strong lighting, timing, and authentic emotions to create striking
              visual stories.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-md">
              {[
                {
                  title: "Live Performances",
                  copy: "Stages, sets, and the energy of the crowd — framed with precision.",
                },
                {
                  title: "Events & Celebrations",
                  copy: "Weddings, festivals, and special occasions told naturally.",
                },
                {
                  title: "Dramatic Portraiture",
                  copy: "Studio and environmental portraits with character and depth.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-surface-container rounded-lg p-space-lg border border-outline-variant/20 flex flex-col gap-space-sm"
                >
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    {item.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}