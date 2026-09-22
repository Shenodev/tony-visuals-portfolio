import Image from "next/image";
import Link from "next/link";
import { AlbumDoc } from "@/lib/albums";

interface AlbumsGridProps {
  albums: AlbumDoc[];
}

export default function AlbumsGrid({ albums }: AlbumsGridProps) {
  return (
    <section id="portfolio" className="max-w-[1800px] mx-auto">
      {/* Section header */}
      <div className="grid grid-cols-12 border-b border-outline-variant/50">
        <div className="col-span-12 md:col-span-8 px-margin-mobile md:px-margin py-space-xl md:py-space-2xl border-r-0 md:border-r border-outline-variant/50">
          <div className="flex items-center gap-2 mb-space-md">
            <span className="w-2 h-2 bg-primary-container"></span>
            <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase">
              ARCHIVAL EXHIBITIONS
            </span>
          </div>
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary-container uppercase tracking-tight">
            SELECTED EXHIBITIONS &amp; ALBUMS<span className="text-tertiary">.</span>
          </h2>
        </div>
        <div className="hidden md:flex col-span-4 px-margin py-space-2xl flex-col justify-end gap-space-sm">
          <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-widest font-mono">
            INDEX: 01 — {String(albums.length).padStart(2, "0")}
          </span>
          <span className="text-label-sm font-label-sm text-primary-container uppercase tracking-widest font-mono">
            / COMPLETE ARCHIVE
          </span>
        </div>
      </div>

      {/* Portfolio grid — horizontal index rail + cards */}
      <div className="lg:grid lg:grid-cols-12">
        <div className="hidden lg:flex lg:col-span-1 flex-col border-r border-outline-variant/50">
          {albums.map((_, i) => (
            <span
              key={i}
              className="text-label-sm font-label-sm text-on-surface-variant font-mono border-b border-outline-variant/50 px-margin py-space-md tracking-widest"
            >
              0{i + 1}
            </span>
          ))}
        </div>

        <div className="lg:col-span-11">
          {albums.length === 0 ? (
            <div className="px-margin-mobile md:px-margin py-space-3xl text-center">
              <span className="material-symbols-outlined text-[48px] text-outline-variant block mb-space-md">
                photo_library
              </span>
              <p className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                THE ARCHIVE IS CURRENTLY EMPTY
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {albums.map((album, i) => (
                <Link
                  key={album._id}
                  href={`/albums/${album._id}`}
                  className="card-group relative flex flex-col group border-b border-outline-variant/50 sm:border-r last:border-r-0 sm:odd:border-r-0 xl:odd:border-r-0"
                >
                  {/* Hover state block */}
                  <div className="absolute inset-0 bg-primary-container hidden group-hover:block mix-blend-screen pointer-events-none"></div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-lowest border-b border-outline-variant/40">
                    <Image
                      className="w-full h-full object-cover img-desat"
                      src={album.coverImageUrl}
                      alt={album.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={`https://res.cloudinary.com/image/upload/w_20,e_blur:30,q_auto,f_jpg/${album.coverImagePublicId}`}
                    />
                    <div className="absolute top-0 left-0 bg-background/90 px-3 py-1 border-b border-r border-outline-variant/40 flex items-center gap-2 z-10">
                      <span className="w-1.5 h-1.5 bg-primary-container"></span>
                      <span className="text-label-sm font-label-sm text-on-surface tracking-wider uppercase">
                        {album.imageCount || 0} PLATES
                      </span>
                    </div>
                    <div className="absolute top-0 right-0 bg-background/90 px-3 py-1 border-b border-l border-outline-variant/40 text-label-sm font-label-sm text-primary-container font-mono z-10">
                      {album.year || "—"}
                    </div>
                  </div>
                  <div className="p-space-lg md:p-space-xl flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between mb-space-xs">
                        <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase">
                          {album.category || "UNCLASSIFIED"}
                        </span>
                        <span className="text-label-sm font-label-sm text-on-surface-variant font-mono tracking-widest hidden sm:block">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-space-sm font-black uppercase">
                        {album.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {album.description || ""}
                      </p>
                    </div>
                    <div className="pt-space-lg mt-space-lg border-t border-outline-variant/30 flex items-center justify-between text-label-sm font-label-sm">
                      <span className="text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary-container">
                          location_on
                        </span>
                        {album.location || "—"}
                      </span>
                      <span className="text-primary-container tracking-wider uppercase flex items-center gap-1 font-bold group-hover:underline">
                        VIEW SERIES →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}