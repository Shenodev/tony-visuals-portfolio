import type { Metadata } from "next";
import { Archivo, Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TONY VISUALS — Photographer in Egypt | Live Performances, Events & Portraiture",
  description:
    "Tony Visuals is a photographer based in Egypt specializing in live performances, events, and dramatic portraiture — strong lighting, precise timing, and authentic emotion in every frame.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${archivo.variable} ${spaceGrotesk.variable} ${manrope.variable} antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface antialiased selection:bg-primary-container selection:text-inverse-on-surface overflow-x-hidden min-h-screen flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
