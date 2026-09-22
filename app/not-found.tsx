import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-grow min-h-[70vh] flex items-center justify-center px-margin-mobile md:px-margin">
        <div className="max-w-3xl w-full text-center py-space-3xl">
          <p className="font-headline-lg text-headline-lg text-primary-container tracking-tight">
            404
          </p>
          <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-on-surface mt-space-md leading-none">
            Frame not <span className="italic text-primary-container/90">found.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto mt-space-lg leading-relaxed">
            The page you&apos;re looking for has been moved, deleted, or never
            made it into the archive.
          </p>
          <div className="mt-space-xl flex items-center justify-center gap-space-md">
            <Link
              href="/"
              className="rounded-full bg-primary-container text-inverse-on-surface px-7 py-3 text-label-lg font-label-lg uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Back home
            </Link>
            <Link
              href="/#contact"
              className="text-label-lg font-label-lg tracking-widest uppercase text-on-surface-variant hover:text-primary-container transition-colors"
            >
              Contact →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}