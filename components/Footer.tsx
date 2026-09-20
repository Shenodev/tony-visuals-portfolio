export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/40">
      <div className="w-full px-margin-mobile md:px-margin-desktop py-space-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-space-lg mx-auto max-w-[1600px]">
        {/* Brand & Watermark */}
        <div className="flex flex-col gap-2">
          <span className="font-headline-md text-headline-md tracking-widest font-extrabold text-on-surface uppercase">
            TONY VISUALS
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant/80">
            © 2024 TONY VISUALS. ALL RIGHTS RESERVED. DESIGNED &amp; DEVELOPED
            BY SHENODEV.
          </p>
        </div>
        {/* Public Editorial Social & Index Links */}
        <div className="flex flex-wrap items-center gap-6 md:gap-8">
          <a
            href="https://instagram.com"
            rel="noopener noreferrer"
            target="_blank"
            className="text-label-sm font-label-sm tracking-widest uppercase text-on-surface-variant hover:text-primary-container transition-colors"
          >
            INSTAGRAM
          </a>
          <a
            href="https://soundcloud.com"
            rel="noopener noreferrer"
            target="_blank"
            className="text-label-sm font-label-sm tracking-widest uppercase text-on-surface-variant hover:text-primary-container transition-colors"
          >
            SOUNDCLOUD
          </a>
          <a
            href="https://behance.net"
            rel="noopener noreferrer"
            target="_blank"
            className="text-label-sm font-label-sm tracking-widest uppercase text-on-surface-variant hover:text-primary-container transition-colors"
          >
            BEHANCE
          </a>
          <a
            href="https://vsco.co"
            rel="noopener noreferrer"
            target="_blank"
            className="text-label-sm font-label-sm tracking-widest uppercase text-on-surface-variant hover:text-primary-container transition-colors"
          >
            VSCO
          </a>
          <a
            href="#portfolio"
            className="text-label-sm font-label-sm tracking-widest uppercase text-on-surface-variant hover:text-primary-container transition-colors"
          >
            INDEX
          </a>
        </div>
      </div>
    </footer>
  );
}
