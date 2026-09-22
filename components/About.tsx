import Image from "next/image";

const specialties = [
  ["01", "Live performances", "Stages, sets, and the energy of the crowd — framed with precision."],
  ["02", "Events & celebrations", "Weddings, festivals, and special occasions told naturally."],
  ["03", "Dramatic portraiture", "Studio and environmental portraits with character and depth."],
];

export default function About() {
  return (
    <section id="about" className="overflow-hidden border-y border-outline-variant/20 bg-surface-container-high/60">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-space-2xl px-margin-mobile py-space-2xl md:px-margin md:py-space-3xl lg:grid-cols-12 lg:items-center lg:gap-space-3xl">
        <div className="lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[470px] overflow-hidden rounded-2xl border border-primary-container/20 bg-surface-container-low shadow-[0_32px_80px_rgba(0,0,0,0.34)]">
            <Image
              src="/images/about.png"
              alt="Tony, photographer based in Cairo"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover object-[50%_34%] brightness-110 contrast-110 saturate-[.9]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,12,16,0.06)_25%,rgba(3,12,16,0.12)_55%,rgba(3,12,16,0.86)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-space-lg md:p-space-xl">
              <div className="mb-space-sm h-px w-12 bg-primary-container" />
              <p className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary-container">Tony Visuals</p>
              <p className="mt-1 font-body-sm text-body-sm text-on-surface/85">Photographer · Cairo, Egypt</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-space-xl">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary-container">About the photographer</span>
          <h2 className="mt-space-md max-w-3xl font-headline-lg text-headline-lg-mobile leading-[1.12] text-on-surface md:text-headline-lg">
            Every frame begins with <span className="italic text-primary-container/90">honest light</span> and an open ear.
          </h2>
          <div className="mt-space-xl max-w-2xl space-y-space-md">
            <p className="font-body-lg text-body-lg leading-relaxed text-on-surface/90">
              I&apos;m a photographer based in Egypt specializing in live performances, events, and dramatic portraiture. My work is rooted in the energy and storytelling of the stage, then carried into every celebration and one-on-one session.
            </p>
            <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
              I focus on strong lighting, precise timing, and authentic emotion to create visual stories that feel as vivid after the moment as they did inside it.
            </p>
          </div>

          <div className="mt-space-xl border-t border-outline-variant/30">
            {specialties.map(([number, title, copy]) => (
              <article key={title} className="grid grid-cols-[2.5rem_1fr] gap-space-md border-b border-outline-variant/30 py-space-lg md:grid-cols-[3rem_10rem_1fr] md:gap-space-lg">
                <span className="pt-1 font-label-sm text-label-sm tracking-widest text-primary-container">{number}</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface md:pt-0.5">{title}</h3>
                <p className="col-start-2 font-body-sm text-body-sm leading-relaxed text-on-surface-variant md:col-start-auto">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
