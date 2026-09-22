import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import CookieBanner from "@/components/CookieBanner";
import {
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Photographer in Egypt | Live Performances, Events & Portraiture`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Photographer in Egypt`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Photographer in Egypt`,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#081F26",
  width: "device-width",
  initialScale: 1,
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${fraunces.variable} ${manrope.variable} antialiased`}
    >
      <body className="bg-background text-on-surface antialiased selection:bg-primary-container selection:text-inverse-on-surface overflow-x-hidden min-h-screen flex flex-col justify-between">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-5 focus:py-2 focus:rounded-full focus:bg-primary-container focus:text-inverse-on-surface focus:text-label-md focus:font-label-md focus:uppercase focus:tracking-wider focus:font-semibold"
        >
          Skip to content
        </a>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
