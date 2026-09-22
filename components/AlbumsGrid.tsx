import Image from "next/image";
import Link from "next/link";
import { AlbumDoc } from "@/lib/albums";

interface AlbumsGridProps {
  albums: AlbumDoc[];
}

export default function AlbumsGrid({ albums }: AlbumsGridProps) {
  return (
    <section id="portfolio" className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin py-space-2xl md:py-space-3xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md mb-space-xl">
        <div>
          <span className="text-label-sm font-label-sm tracking-widest text-primary-container uppercase">
            Selected work
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mt-space-sm">
            Albums &amp; <span className="italic text-primary-container/90">exhibitions.</span>
          </h2>
        </div>
        <span className="text-label-md font-label-md tracking-widest text-on-surface-variant/70 uppercase">
          01 — {String(albums.length).padStart(2, "0")}
        </span>
      </div>

      {albums.length === 0 ? (
        <div className="py-space-3xl text-center rounded-xl border border-dashed border-outline-variant/30">
          <span className="material-symbols-outlined text-[48px] text-outline-variant/50 block mb-space-md">
            photo_library
          </span>
          <p className="text-label-md font-label-md text-on-surface-variant/60 uppercase tracking-wider">
            The archive is currently empty
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-lg">
          {albums.map((album) => (
            <Link
              key={album._id}
              href={`/albums/${album._id}`}
              className="card-group flex flex-col group"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-lg aspect-[4/3] w-full bg-surface-container-lowest shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
                <Image
                  className="img-desat object-cover object-center"
                  src={album.coverImageUrl}
                  alt={album.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={`https://res.cloudinary.com/image/upload/w_20,e_blur:30,q_auto,f_jpg/${album.coverImagePublicId}`}
                />
                {/* Year badge */}
                {album.year && (
                  <span className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-label-sm font-label-sm text-primary-container rounded-full px-3 py-1 z-10">
                    {album.year}
                  </span>
                )}
              </div>

              {/* Caption */}
              <div className="pt-space-md flex flex-col gap-1">
                <div className="flex items-center justify-between gap-space-sm">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">
                    {album.title}
                  </h3>
                  <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase shrink-0">
                    View →
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                  {album.description || ""}
                </p>
                <div className="flex items-center gap-space-md pt-1">
                  {album.location && (
                    <span className="text-label-sm font-label-sm text-on-surface-variant/70 tracking-wide flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        location_on
                      </span>
                      {album.location}
                    </span>
                  )}
                  <span className="text-label-sm font-label-sm text-on-surface-variant/70 tracking-wide">
                    {album.imageCount || 0} plates
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}