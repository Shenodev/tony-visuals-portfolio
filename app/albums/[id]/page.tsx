import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAlbumById, getAlbumImages } from "@/lib/albums";

interface AlbumPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: AlbumPageProps) {
  const { id } = await params;
  const album = await getAlbumById(id);
  if (!album) return { title: "Album Not Found" };
  return {
    title: `${album.title} — Tony Visuals`,
    description: album.description || `Photography album: ${album.title}`,
  };
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { id } = await params;
  const [album, images] = await Promise.all([
    getAlbumById(id),
    getAlbumImages(id),
  ]);

  if (!album) notFound();

  return (
    <>
      <Header />
      <main className="pt-24 pb-space-3xl flex-grow">
        {/* Album Hero */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-[1600px] mx-auto mb-space-2xl">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-1 text-label-sm font-label-sm text-primary-container tracking-wider uppercase hover:underline mb-space-lg"
          >
            <span className="material-symbols-outlined text-[16px]">
              arrow_back
            </span>
            BACK TO ARCHIVE
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/40 pb-space-md">
            <div>
              <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase mb-1 block">
                {album.category || "UNCLASSIFIED"}
              </span>
              <h1 className="font-headline-lg text-headline-lg text-primary-container uppercase tracking-tight">
                {album.title}
              </h1>
            </div>
            <div className="flex items-center gap-4 text-label-sm font-label-sm text-on-surface-variant">
              {album.location && (
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary-container">
                    location_on
                  </span>
                  {album.location}
                </span>
              )}
              {album.year && (
                <span className="text-primary-container font-mono">
                  {album.year}
                </span>
              )}
              <span className="text-primary-container font-bold">
                {images.length} PLATES
              </span>
            </div>
          </div>

          {album.description && (
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-md max-w-2xl">
              {album.description}
            </p>
          )}
        </section>

        {/* Masonry Grid */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-[1600px] mx-auto">
          {images.length === 0 ? (
            <div className="text-center py-space-3xl">
              <span className="material-symbols-outlined text-[48px] text-outline-variant mb-space-md block">
                photo_library
              </span>
              <p className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                NO PLATES IN THIS SERIES YET
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {images.map((img) => {
                const blurDataURL = `https://res.cloudinary.com/image/upload/w_20,e_blur:30,q_auto,f_jpg/${img.public_id}`;

                return (
                  <div
                    key={img._id}
                    className="card-group break-inside-avoid relative overflow-hidden bg-surface-container-lowest border border-outline-variant/20 hover:border-primary-container/50 transition-all duration-200"
                  >
                    <Image
                      className="w-full h-auto object-cover img-desat"
                      src={img.url}
                      alt={album.title}
                      width={img.width}
                      height={img.height}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                      style={{
                        aspectRatio: `${img.width} / ${img.height}`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
