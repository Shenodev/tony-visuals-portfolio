import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin pt-space-3xl md:pt-space-4xl pb-space-2xl md:pb-space-3xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-3xl items-center">
        {/* Copy */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          <span className="text-label-sm font-label-sm tracking-widest text-primary-container uppercase">
            Live · Events · Portraiture
          </span>
          <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-on-surface leading-none">
            Capturing light, <br className="hidden md:block" />
            <span className="italic text-primary-container/90">emotion</span>, &amp; the{" "}
            <span className="italic">stage.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md leading-relaxed">
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

        {/* Hero image */}
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-xl aspect-[4/5] md:aspect-[3/4] w-full bg-surface-container-lowest group shadow-[0_8px_40px_rgba(0,0,0,0.45)]">
            <Image
              alt="Live concert arena with silhouette performers against dramatic stage lighting"
              className="img-desat object-cover object-center"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXvdxrRszmPyADUgLrBzpTiNr4gQyBGMbmYkq6-aSSSPwECa4Wz2adtZSOuq0mMHW0Gqe0X0bqSGzl6xC637vml8VbG5HLbylNNjLnd-f2PEDkCyLU1bal85eNbMZu8LGaRTzvlLZeDE0Y66AmppwAp2JBQkADtsRHZaNcZnIJuQSJtghKLZkYmZuRuNWtJk1Q9Clxt_cjbFia_0sQX7cvWgbfZpzOmAz3lMN0D4RUkB3I82A88Ks"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}