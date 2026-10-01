"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAlbumsStore } from "@/lib/store";
import Icon from "@/components/Icon";

export default function AlbumsGridClient() {
  const { albums, isLoading, error, setAlbums, setLoading, setError, shouldRefetch } =
    useAlbumsStore();

  useEffect(() => {
    if (!shouldRefetch()) return;

    const fetchAlbums = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/albums");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAlbums(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    fetchAlbums();
  }, [setAlbums, setLoading, setError, shouldRefetch]);

  if (error) {
    return (
      <div className="py-space-3xl text-center rounded-xl border border-dashed border-outline-variant/30">
        <p className="text-label-md font-label-md text-on-surface-variant/75 uppercase tracking-wider">
          {error}
        </p>
      </div>
    );
  }

  if (isLoading && albums.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-lg">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/3] bg-surface-container-lowest rounded-lg" />
            <div className="pt-space-md space-y-2">
              <div className="h-4 bg-surface-container-lowest rounded w-3/4" />
              <div className="h-3 bg-surface-container-lowest rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (albums.length === 0) {
    return (
      <div className="py-space-3xl text-center rounded-xl border border-dashed border-outline-variant/30">
        <Icon
          name="photo_library"
          className="w-12 h-12 text-outline-variant/50 block mx-auto mb-space-md"
        />
        <p className="text-label-md font-label-md text-on-surface-variant/75 uppercase tracking-wider">
          The archive is currently empty
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-lg">
      {albums.map((album) => (
        <Link
          key={album._id}
          href={`/albums/${album._id}`}
          className="card-group flex flex-col group"
        >
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
            {album.year && (
              <span className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-label-sm font-label-sm text-primary-container rounded-full px-3 py-1 z-10">
                {album.year}
              </span>
            )}
          </div>
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
                  <Icon name="location_on" className="w-4 h-4" />
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
  );
}
