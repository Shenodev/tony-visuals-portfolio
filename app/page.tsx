import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AlbumsGrid from "@/components/AlbumsGrid";
import ContactBand from "@/components/ContactBand";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getAllAlbums } from "@/lib/albums";
import {
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  STUDIO_ADDRESS,
  STUDIO_GEO,
} from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Photographer in Egypt | Live Performances, Events & Portraiture`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
    },
    {
      "@type": "Photographer",
      "@id": `${SITE_URL}/#photographer`,
      name: SITE_NAME,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      description: SITE_DESCRIPTION,
      image: `${SITE_URL}/opengraph-image`,
      address: {
        "@type": "PostalAddress",
        addressLocality: STUDIO_ADDRESS.addressLocality,
        addressCountry: STUDIO_ADDRESS.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: STUDIO_GEO.latitude,
        longitude: STUDIO_GEO.longitude,
      },
      areaServed: "Cairo, Egypt",
      knowsAbout: [
        "Live performance photography",
        "Event photography",
        "Portrait photography",
      ],
    },
  ],
};

export default async function Home() {
  const albums = await getAllAlbums();

  return (
    <>
      <JsonLd data={siteSchema} />
      <Header />
      {/* Main Public Canvas */}
      <main id="main-content" className="flex-grow">
        <Hero />
        <About />
        <AlbumsGrid albums={albums} />
        <ContactBand />
      </main>
      <Footer />
    </>
  );
}