import Image from "next/image";
import Link from "next/link";
import { AlbumDoc } from "@/lib/albums";

interface AlbumsGridProps {
  albums: AlbumDoc[];
}

export default function AlbumsGrid({ albums }: AlbumsGridProps) {
  return (
    <section
      id="portfolio"
      className="px-margin-mobile md:px-margin-desktop py-space-2xl md:py-space-3xl max-w-[1600px] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl border-b border-outline-variant/40 pb-space-md gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 bg-primary-container"></span>
            <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase">
              ARCHIVAL EXHIBITIONS
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary-container uppercase tracking-tight">
            SELECTED EXHIBITIONS &amp; ALBUMS
          </h2>
        </div>
        <div className="text-label-md font-label-md text-on-surface-variant flex items-center gap-2">
          <span>
            INDEX: 01 — {String(albums.length).padStart(2, "0")}
          </span>
          <span className="text-primary-container font-bold">
            / COMPLETE ARCHIVE
          </span>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {albums.map((album) => (
          <Link
            key={album._id}
            href={`/albums/${album._id}`}
            className="card-group relative flex flex-col bg-surface-container-low border border-outline-variant/30 hover:border-primary-container/70 transition-all duration-200"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-lowest">
              <Image
                className="w-full h-full object-cover img-desat"
                src={album.coverImageUrl}
                alt={album.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL={`https://res.cloudinary.com/image/upload/w_20,e_blur:30,q_auto,f_jpg/${album.coverImagePublicId}`}
              />
              <div className="absolute top-3 left-3 bg-surface/90 px-2.5 py-1 border border-outline-variant/40 flex items-center gap-2 z-10">
                <span className="w-1.5 h-1.5 bg-primary-container"></span>
                <span className="text-label-sm font-label-sm text-on-surface tracking-wider uppercase">
                  {album.imageCount || 0} PLATES
                </span>
              </div>
              <div className="absolute bottom-3 right-3 bg-surface/90 px-2 py-0.5 border border-outline-variant/30 text-label-sm font-label-sm text-primary-container font-mono z-10">
                {album.year || "—"}
              </div>
            </div>
            <div className="p-space-md flex flex-col justify-between flex-grow">
              <div>
                <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase mb-1 block">
                  {album.category || "UNCLASSIFIED"}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs font-semibold">
                  {album.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                  {album.description || ""}
                </p>
              </div>
              <div className="pt-space-sm mt-space-sm border-t border-outline-variant/20 flex items-center justify-between text-label-sm font-label-sm">
                <span className="text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary-container">
                    location_on
                  </span>
                  {album.location || "—"}
                </span>
                <span className="text-primary-container tracking-wider uppercase hover:underline flex items-center gap-1 font-semibold">
                  VIEW SERIES →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
