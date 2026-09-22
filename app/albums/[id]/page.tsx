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
      <main className="flex-grow">
        {/* Album header */}
        <section className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin pt-space-3xl md:pt-space-4xl pb-space-xl">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-1 text-label-sm font-label-sm tracking-widest text-primary-container uppercase hover:opacity-80 transition-opacity mb-space-lg"
          >
            ← Back to portfolio
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div>
              <span className="text-label-sm font-label-sm tracking-widest text-primary-container uppercase">
                {album.category || "Unclassified"}
              </span>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mt-space-sm">
                {album.title}
              </h1>
              <div className="flex items-center gap-space-lg mt-space-md">
                {album.location && (
                  <span className="text-label-md font-label-md tracking-wide text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary-container">
                      location_on
                    </span>
                    {album.location}
                  </span>
                )}
                {album.year && (
                  <span className="text-label-md font-label-md tracking-wide text-primary-container">
                    {album.year}
                  </span>
                )}
                <span className="text-label-md font-label-md tracking-wide text-on-surface-variant">
                  {images.length} plates
                </span>
              </div>
            </div>
          </div>

          {album.description && (
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-space-md leading-relaxed">
              {album.description}
            </p>
          )}
        </section>

        {/* Masonry gallery */}
        <section className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin pb-space-3xl">
          {images.length === 0 ? (
            <div className="py-space-3xl text-center rounded-xl border border-dashed border-outline-variant/30">
              <span className="material-symbols-outlined text-[48px] text-outline-variant/50 block mb-space-md">
                photo_library
              </span>
              <p className="text-label-md font-label-md text-on-surface-variant/60 uppercase tracking-wider">
                No plates in this series yet
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 gap-space-md space-y-space-md">
              {images.map((img) => {
                const blurDataURL = `https://res.cloudinary.com/image/upload/w_20,e_blur:30,q_auto,f_jpg/${img.public_id}`;

                return (
                  <div
                    key={img._id}
                    className="card-group break-inside-avoid"
                  >
                    <div className="relative overflow-hidden rounded-lg bg-surface-container-lowest shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
                      <Image
                        className="img-desat object-cover object-center"
                        src={img.url}
                        alt={album.title}
                        width={img.width}
                        height={img.height}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL={blurDataURL}
                        style={{
                          aspectRatio: `${img.width} / ${img.height}`,
                        }}
                      />
                    </div>
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