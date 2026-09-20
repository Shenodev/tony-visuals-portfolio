import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AlbumsGrid from "@/components/AlbumsGrid";
import ContactBand from "@/components/ContactBand";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      {/* Main Public Canvas */}
      <main className="pt-24 flex-grow">
        <Hero />
        <About />
        <AlbumsGrid />
        <ContactBand />
      </main>
      <Footer />
    </>
  );
}
