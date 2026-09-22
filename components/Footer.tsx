import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-outline-variant/20 bg-background">
      <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin py-space-2xl">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-space-xl">
          {/* Brand */}
          <div>
            <Link href="/" className="font-headline-md text-headline-md tracking-tight text-on-surface hover:text-primary-container transition-colors">
              TONY&nbsp;VISUALS
            </Link>
            <p className="font-body-sm text-body-sm text-on-surface-variant/80 mt-space-sm">
              © {new Date().getFullYear()} TONY VISUALS. All rights reserved.
            </p>
          </div>

          {/* Site */}
          <div className="flex flex-col gap-1">
            <span className="text-label-sm font-label-sm tracking-widest text-primary-container uppercase">
              Site
            </span>
            <Link
              href="/#portfolio"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary-container transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href="/#about"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary-container transition-colors"
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary-container transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Business details */}
          <div className="flex flex-col gap-1">
            <span className="text-label-sm font-label-sm tracking-widest text-primary-container uppercase">
              Studio
            </span>
            <a
              href="mailto:tonylens.web@outlook.com"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary-container transition-colors break-all"
            >
              tonylens.web@outlook.com
            </a>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Live · Events · Portraiture
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Cairo, Egypt
            </p>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-1">
            <span className="text-label-sm font-label-sm tracking-widest text-primary-container uppercase">
              Legal
            </span>
            <Link
              href="/privacy"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary-container transition-colors"
            >
              Privacy policy
            </Link>
            <Link
              href="/terms"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary-container transition-colors"
            >
              Terms of service
            </Link>
            <Link
              href="/refund-policy"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary-container transition-colors"
            >
              Refund policy
            </Link>
            <Link
              href="/cookie-policy"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary-container transition-colors"
            >
              Cookie policy
            </Link>
          </div>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant/75 pt-space-lg mt-space-lg border-t border-outline-variant/20">
          Designed for Tony Visuals · No tracking on this site.
        </p>
      </div>
    </footer>
  );
}