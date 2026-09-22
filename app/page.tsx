import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AlbumsGrid from "@/components/AlbumsGrid";
import ContactBand from "@/components/ContactBand";
import Footer from "@/components/Footer";
import { getAllAlbums } from "@/lib/albums";

export const dynamic = "force-dynamic";

export default async function Home() {
  const albums = await getAllAlbums();

  return (
    <>
      <Header />
      {/* Main Public Canvas */}
      <main className="flex-grow">
        <Hero />
        <About />
        <AlbumsGrid albums={albums} />
        <ContactBand />
      </main>
      <Footer />
    </>
  );
}
