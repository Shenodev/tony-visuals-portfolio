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
      <main className="flex-grow max-w-[1800px] mx-auto">
        {/* Album top bar */}
        <div className="grid grid-cols-12 border-b border-outline-variant/50 mt-space-2xl md:mt-space-3xl">
          <div className="col-span-12 md:col-span-6 border-r border-outline-variant/50 px-margin-mobile md:px-margin py-space-md flex items-center gap-3">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-1 text-label-sm font-label-sm text-primary-container tracking-wider uppercase hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              BACK TO ARCHIVE
            </Link>
          </div>
          <div className="hidden md:flex col-span-6 px-margin py-space-md items-center justify-end gap-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">
            <span>{album.category || "UNCLASSIFIED"}</span>
            <span className="text-primary-container font-mono">{images.length} PLATES</span>
          </div>
        </div>

        {/* Album header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-outline-variant/50">
          <div className="lg:col-span-8 px-margin-mobile md:px-margin py-space-2xl border-r-0 lg:border-r border-outline-variant/50">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface uppercase tracking-tight">
              {album.title}<span className="text-primary-container">.</span>
            </h1>
            {album.description && (
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-md max-w-xl leading-relaxed">
                {album.description}
              </p>
            )}
          </div>
          <div className="lg:col-span-4 px-margin-mobile md:px-margin py-space-2xl flex flex-col justify-end gap-space-sm">
            {album.location && (
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary-container">
                  location_on
                </span>
                {album.location}
              </span>
            )}
            {album.year && (
              <span className="text-label-sm font-label-sm text-primary-container uppercase tracking-widest font-mono">
                {album.year}
              </span>
            )}
          </div>
        </div>

        {/* Masonry Grid */}
        <section>
          {images.length === 0 ? (
            <div className="px-margin-mobile md:px-margin py-space-4xl text-center">
              <span className="material-symbols-outlined text-[48px] text-outline-variant mb-space-md block">
                photo_library
              </span>
              <p className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                NO PLATES IN THIS SERIES YET
              </p>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-12">
              <div className="hidden lg:flex lg:col-span-1 flex-col border-r border-outline-variant/50">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className="text-label-sm font-label-sm text-on-surface-variant font-mono border-b border-outline-variant/50 px-margin py-space-md tracking-widest"
                  >
                    0{i + 1}
                  </span>
                ))}
              </div>
              <div className="lg:col-span-11">
                <div className="columns-1 sm:columns-2 md:columns-3 gap-0">
                  {images.map((img) => {
                    const blurDataURL = `https://res.cloudinary.com/image/upload/w_20,e_blur:30,q_auto,f_jpg/${img.public_id}`;

                    return (
                      <div
                        key={img._id}
                        className="card-group break-inside-avoid py-0"
                      >
                        <div className="relative overflow-hidden bg-surface-container-lowest border-b border-r border-outline-variant/40">
                          <Image
                            className="w-full h-auto object-cover img-desat"
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
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}