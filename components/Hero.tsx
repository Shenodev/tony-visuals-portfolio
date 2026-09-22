import Image from "next/image";

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
          <Image src="/"
          alt="Hero" width={500} height={500} className="w-full h-full object-cover rounded-xl" />
        </div>
      </div>
    </section>
  );
}