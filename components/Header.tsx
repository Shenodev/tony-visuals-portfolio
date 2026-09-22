export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-outline-variant/20">
      <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin h-16 md:h-20 flex items-center justify-between gap-6">
        {/* Brand */}
        <a
          href="#"
          className="font-headline-md text-headline-md tracking-tight text-on-surface hover:text-primary-container transition-colors"
        >
          TONY&nbsp;VISUALS
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: "#portfolio", label: "Portfolio", active: true },
            { href: "#about", label: "About", active: false },
            { href: "#contact", label: "Contact", active: false },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-label-md font-label-md tracking-widest uppercase transition-colors ${
                item.active
                  ? "text-primary-container"
                  : "text-on-surface/70 hover:text-primary-container"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="rounded-full border border-primary-container/50 px-5 py-2 text-label-md font-label-md tracking-widest uppercase text-primary-container hover:bg-primary-container hover:text-inverse-on-surface transition-colors"
        >
          Book a session
        </a>
      </div>
    </header>
  );
}