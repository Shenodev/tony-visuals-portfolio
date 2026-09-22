import { ReactNode } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

interface LegalSection {
  heading: string;
  body: ReactNode;
}

interface LegalPageProps {
  title: string;
  updated: string;
  intro?: ReactNode;
  sections: LegalSection[];
}

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="flex-grow max-w-3xl mx-auto px-gutter-mobile md:px-gutter w-full pt-space-3xl md:pt-space-4xl pb-space-3xl"
      >
        <article>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
          <header>
            <span className="text-label-sm font-label-sm tracking-widest text-primary-container uppercase">
              Legal
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mt-space-sm">
              {title}
            </h1>
            <p className="text-label-sm font-label-sm text-on-surface-variant mt-space-md uppercase tracking-widest">
              Last updated — {updated}
            </p>
          </header>

          {intro && (
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-lg leading-relaxed">
              {intro}
            </p>
          )}

          <div className="mt-space-xl flex flex-col gap-space-2xl">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  {section.heading}
                </h2>
                <div className="mt-space-md font-body-md text-body-md text-on-surface-variant leading-relaxed flex flex-col gap-space-md">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </article>

        <p className="mt-space-3xl pt-space-lg border-t border-outline-variant/20 text-label-sm font-label-sm text-on-surface-variant/75 tracking-widest uppercase">
          <Link
            href="/"
            className="hover:text-primary-container transition-colors"
          >
            ← Back to the portfolio
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}