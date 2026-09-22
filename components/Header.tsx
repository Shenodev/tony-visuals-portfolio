export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-outline-variant/50 bg-background">
      <div className="grid grid-cols-12 items-stretch">
        {/* Brand — bold block */}
        <a
          href="#"
          className="col-span-10 md:col-span-5 border-r border-outline-variant/50 px-margin-mobile md:px-margin py-space-md flex items-center gap-3 group relative"
        >
          <span className="w-2.5 h-2.5 bg-primary-container inline-block shadow-[0_0_12px_rgba(126,252,159,0.7)]"></span>
          <span className="font-headline-md text-headline-md tracking-tight font-black text-on-surface uppercase group-hover:text-primary-container transition-colors">
            TONY&nbsp;VISUALS
          </span>
        </a>

        {/* Nav */}
        <nav className="hidden md:flex col-span-5 items-stretch">
          {[
            { href: "#portfolio", label: "PORTFOLIO", active: true },
            { href: "#about", label: "ABOUT", active: false },
            { href: "#contact", label: "CONTACT", active: false },
          ].map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center px-margin border-r border-outline-variant/50 font-label-md text-label-md tracking-widest uppercase transition-colors ${
                item.active
                  ? "bg-primary-container text-inverse-on-surface"
                  : "text-on-surface hover:bg-surface-container hover:text-primary-container"
              } ${i === 0 ? "border-l-0" : ""}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Trailing CTA */}
        <div className="hidden md:flex col-span-2 items-stretch justify-stretch">
          <a
            href="#contact"
            className="flex items-center justify-center w-full font-label-md text-label-md tracking-widest uppercase text-primary-container hover:bg-primary-container hover:text-inverse-on-surface border-l-0 transition-all duration-150"
          >
            BOOK US →
          </a>
        </div>

        {/* Mobile CTA */}
        <a
          href="#contact"
          className="col-span-2 md:hidden border-l border-outline-variant/50 flex items-center justify-center font-label-md text-label-md tracking-widest uppercase text-primary-container"
        >
          BOOK →
        </a>
      </div>
    </header>
  );
}