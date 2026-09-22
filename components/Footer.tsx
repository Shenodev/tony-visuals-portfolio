export default function Footer() {
  return (
    <footer className="border-t border-outline-variant/20 bg-background">
      <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin py-space-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-xl">
          {/* Brand */}
          <div>
            <span className="font-headline-md text-headline-md tracking-tight text-on-surface">
              TONY&nbsp;VISUALS
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant/80 mt-space-sm">
              © {new Date().getFullYear()} TONY VISUALS. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-space-sm sm:gap-space-xl">
            {[
              { href: "https://instagram.com", label: "Instagram", note: "↗" },
              { href: "https://behance.net", label: "Behance", note: "↗" },
              {
                href: "mailto:tonylens.web@outlook.com",
                label: "Email",
                note: "↗",
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                rel="noopener noreferrer"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                className="text-label-md font-label-md tracking-widest uppercase text-on-surface-variant hover:text-primary-container transition-colors inline-flex items-center gap-1"
              >
                {link.label} <span className="text-primary-container">{link.note}</span>
              </a>
            ))}
          </div>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant/60 pt-space-lg mt-space-lg border-t border-outline-variant/20">
          Live · Events · Portraiture — Cairo, Egypt · Designed for Tony Visuals
        </p>
      </div>
    </footer>
  );
}