export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/40">
      <div className="w-full px-margin-mobile md:px-margin-desktop py-space-md flex items-center justify-between mx-auto max-w-full">
        {/* Brand Anchor */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="w-2.5 h-2.5 bg-primary-container inline-block shadow-[0_0_12px_rgba(126,252,159,0.7)]"></span>
          <span className="font-headline-md text-headline-md tracking-tight font-extrabold text-on-surface uppercase group-hover:text-primary-container transition-colors">
            TONY VISUALS
          </span>
        </a>

        {/* Public Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#portfolio"
            className="text-label-lg font-label-lg uppercase tracking-wider text-primary-container border-b-2 border-primary-container pb-1 transition-colors"
          >
            PORTFOLIO
          </a>
          <a
            href="#about"
            className="text-label-lg font-label-lg uppercase tracking-wider text-on-surface hover:text-primary-container transition-colors"
          >
            ABOUT
          </a>
          <a
            href="#contact"
            className="text-label-lg font-label-lg uppercase tracking-wider text-on-surface hover:text-primary-container transition-colors"
          >
            CONTACT
          </a>
        </nav>

        {/* Trailing Action */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="px-space-md py-space-sm border border-primary-container text-primary-container hover:bg-primary-container hover:text-inverse-on-surface text-label-lg font-label-lg uppercase tracking-wider transition-all duration-150 shadow-[0_0_16px_rgba(126,252,159,0.15)]"
          >
            BOOK INQUIRY
          </a>
        </div>
      </div>
    </header>
  );
}
