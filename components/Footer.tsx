export default function Footer() {
  return (
    <footer className="bg-background border-t border-outline-variant/50">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-12 border-b border-outline-variant/50">
          <div className="col-span-12 md:col-span-6 border-r-0 md:border-r border-outline-variant/50 px-margin-mobile md:px-margin py-space-2xl">
            <span className="font-headline-md text-headline-md tracking-tight font-black text-on-surface uppercase">
              TONY&nbsp;VISUALS
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant/80 mt-space-md">
              © 2025 TONY VISUALS. ALL RIGHTS RESERVED.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 px-margin-mobile md:px-margin py-space-2xl">
            <div className="grid grid-cols-2 gap-x-8 gap-y-space-sm">
              <a
                href="https://instagram.com"
                rel="noopener noreferrer"
                target="_blank"
                className="text-label-sm font-label-sm tracking-widest uppercase text-on-surface-variant hover:text-primary-container transition-colors flex items-center justify-between border-b border-outline-variant/30 py-space-sm"
              >
                INSTAGRAM <span className="text-primary-container">↗</span>
              </a>
              <a
                href="https://behance.net"
                rel="noopener noreferrer"
                target="_blank"
                className="text-label-sm font-label-sm tracking-widest uppercase text-on-surface-variant hover:text-primary-container transition-colors flex items-center justify-between border-b border-outline-variant/30 py-space-sm"
              >
                BEHANCE <span className="text-primary-container">↗</span>
              </a>
              <a
                href="https://vsco.co"
                rel="noopener noreferrer"
                target="_blank"
                className="text-label-sm font-label-sm tracking-widest uppercase text-on-surface-variant hover:text-primary-container transition-colors flex items-center justify-between border-b border-outline-variant/30 py-space-sm"
              >
                VSCO <span className="text-primary-container">↗</span>
              </a>
              <a
                href="mailto:tonylens.web@outlook.com"
                className="text-label-sm font-label-sm tracking-widest uppercase text-on-surface-variant hover:text-primary-container transition-colors flex items-center justify-between border-b border-outline-variant/30 py-space-sm"
              >
                CONTACT <span className="text-primary-container">↗</span>
              </a>
            </div>
          </div>
        </div>
        <div className="px-margin-mobile md:px-margin py-space-md flex flex-col sm:flex-row justify-between gap-2">
          <span className="text-label-sm font-label-sm tracking-widest uppercase text-on-surface-variant/60 font-mono">
            DESIGNED &amp; DEVELOPED BY SHENODEV
          </span>
          <span className="text-label-sm font-label-sm tracking-widest uppercase text-on-surface-variant/60 font-mono">
            LIVE · EVENTS · PORTRAITURE — CAIRO, EGYPT
          </span>
        </div>
      </div>
    </footer>
  );
}