"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "#about", id: "about", label: "About" },
  { href: "#portfolio", id: "portfolio", label: "Portfolio" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export default function Header() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => ({
      item,
      el: document.getElementById(item.id),
    })).filter((s) => s.el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Track visibility; the section closest to the top of the viewport wins.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement);

        let best: HTMLElement | null = null;
        for (const el of visible) {
          if (!best || el.getBoundingClientRect().top < best.getBoundingClientRect().top) {
            best = el;
          }
        }
        if (best) {
          const match = sections.find((s) => s.el === best);
          if (match) setActive(match.item.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s.el!));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-outline-variant/20">
      <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin h-16 md:h-20 flex items-center justify-between gap-6">
        {/* Brand */}
        <a
          href="#"
          className="text-display-xs md:text-headline-md text-headline-md tracking-tight text-on-surface hover:text-primary-container transition-colors"
        >
          TONY&nbsp;VISUALS
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-label-md font-label-md tracking-widest uppercase transition-colors ${
                active === item.id
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
          className="rounded-full text-label-xs md:text-label-md border border-primary-container/50 px-3 py-1.5 md:px-5 md:py-2 font-label-md tracking-widest uppercase text-primary-container hover:bg-primary-container hover:text-inverse-on-surface transition-colors"
        >
          Book a session
        </a>
      </div>
    </header>
  );
}