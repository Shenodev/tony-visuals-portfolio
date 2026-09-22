"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";

interface Album {
  _id: string;
  title: string;
  coverImageUrl: string;
}

interface AlbumImage {
  _id: string;
  albumId: string;
  url: string;
  public_id: string;
  width: number;
  height: number;
  createdAt: string;
}

const imagesFetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const primaryBtn =
  "rounded-full bg-primary-container text-inverse-on-surface px-6 py-2.5 text-label-md font-label-md uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed";
const ghostBtn =
  "rounded-full border border-outline-variant text-on-surface-variant px-6 py-2.5 text-label-md font-label-md uppercase tracking-wider hover:border-primary-container hover:text-primary-container transition-colors";

export default function AlbumPhotosPage() {
  const params = useParams();
  const router = useRouter();
  const albumId = params.id as string;

  const [album, setAlbum] = useState<Album | null>(null);
  const [albumLoading, setAlbumLoading] = useState(true);
  const [albumError, setAlbumError] = useState(false);

  useEffect(() => {
    fetch("/api/admin/albums")
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((albums: Album[]) => {
        const found = albums.find((a) => a._id === albumId);
        if (found) {
          setAlbum(found);
        } else {
          setAlbumError(true);
        }
      })
      .catch(() => setAlbumError(true))
      .finally(() => setAlbumLoading(false));
  }, [albumId]);

  const {
    data: images,
    error: imagesError,
    isLoading: imagesLoading,
    mutate: mutateImages,
  } = useSWR<AlbumImage[]>(
    `/api/admin/images?albumId=${albumId}`,
    imagesFetcher
  );

  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<AlbumImage | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (files: File[]): string | null => {
    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return `Invalid file type: ${file.name}. Allowed: JPEG, PNG, WEBP, GIF`;
      }
      if (file.size > MAX_FILE_SIZE) {
        return `File too large: ${file.name}. Maximum: 10MB`;
      }
    }
    return null;
  };

  const uploadFiles = async (files: File[]) => {
    const validationError = validateFiles(files);
    if (validationError) {
      setUploadError(validationError);
      return;
    }

    setUploading(true);
    setUploadError("");
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("albumId", albumId);
      for (const file of files) {
        formData.append("files", file);
      }

      const result = await new Promise<{ ok: boolean; data?: unknown }>(
        (resolve) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.addEventListener("progress", (e) => {
            if (e.lengthComputable) {
              setUploadProgress(Math.round((e.loaded / e.total) * 100));
            }
          });

          xhr.addEventListener("load", () => {
            try {
              const data = JSON.parse(xhr.responseText);
              resolve({ ok: xhr.status >= 200 && xhr.status < 300, data });
            } catch {
              resolve({ ok: false });
            }
          });

          xhr.addEventListener("error", () => resolve({ ok: false }));
          xhr.open("POST", "/api/admin/images/upload");
          xhr.send(formData);
        }
      );

      if (!result.ok) {
        const errorMsg =
          result.data &&
          typeof result.data === "object" &&
          "error" in result.data
            ? String((result.data as { error: string }).error)
            : "Upload failed";
        throw new Error(errorMsg);
      }

      await mutateImages();
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(0), 1000);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Failed to upload images"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/")
      );
      if (files.length > 0) {
        uploadFiles(files);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [albumId]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      uploadFiles(files);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError("");

    try {
      const res = await fetch(`/api/admin/images/${deleteTarget._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete image");
      }

      await mutateImages();
      setDeleteTarget(null);
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Failed to delete image"
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleAlbumDelete = async () => {
    if (!album) return;
    setDeleting(true);
    setDeleteError("");

    try {
      const res = await fetch(`/api/admin/albums/${album._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete album");
      }
      router.push("/t-dashboard");
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Failed to delete album"
      );
    } finally {
      setDeleting(false);
    }
  };

  if (albumError || imagesError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="rounded-xl border border-error bg-surface-container p-space-xl max-w-md w-full text-center">
          <p className="font-headline-lg text-headline-lg text-error mb-2 uppercase tracking-tight">
            Connection error
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Failed to load album data. Please try again.
          </p>
          <button onClick={() => router.push("/t-dashboard")} className={`${primaryBtn} mt-space-lg`}>
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-outline-variant/20 bg-background/85 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin h-16 md:h-20 flex items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-lg">
            <button
              onClick={() => router.push("/t-dashboard")}
              className="text-label-md font-label-md text-on-surface-variant hover:text-primary-container transition-colors uppercase tracking-wider"
            >
              ← Back
            </button>
            <span className="h-5 w-px bg-outline-variant/30"></span>
            <div className="flex items-baseline gap-space-md">
              <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                {albumLoading ? "Loading..." : album?.title || "Album"}
              </h1>
              <span className="hidden sm:inline-flex rounded-full border border-primary-container/40 px-3 py-1 text-label-sm font-label-sm text-primary-container tracking-widest uppercase">
                {imagesLoading ? "Loading..." : `${images?.length || 0} photos`}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin py-space-xl md:py-space-2xl">
        {/* Upload Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-lg transition-all duration-200 mb-space-xl cursor-pointer ${
            isDragOver
              ? "border-primary-container bg-primary-container/10"
              : "border-outline-variant/40 hover:border-primary-container/70"
          } ${uploading ? "pointer-events-none opacity-75" : ""}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            onChange={handleFileInput}
            className="hidden"
          />

          <div className="p-space-2xl text-center">
            {uploading ? (
              <div>
                <div className="w-full max-w-md mx-auto mb-space-md">
                  <div className="h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-container rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
                <p className="font-headline-sm text-headline-sm text-primary-container mb-2">
                  Uploading...
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {uploadProgress}% complete
                </p>
              </div>
            ) : (
              <div>
                <p className="font-headline-sm text-headline-sm text-on-surface-variant mb-2">
                  {isDragOver ? "Drop files here" : "Drag & drop images"}
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant/60 mb-4">
                  or click to browse
                </p>
                <p className="text-label-sm font-label-sm text-on-surface-variant/40 tracking-wider">
                  JPEG, PNG, WEBP, GIF — MAX 10MB PER FILE — UP TO 50 FILES
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Upload Error */}
        {uploadError && (
          <p className="text-label-sm font-label-sm text-error tracking-wider uppercase mb-space-xl">
            {uploadError}
          </p>
        )}

        {/* Images Grid */}
        {imagesLoading && (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-space-md">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="mb-space-md break-inside-avoid rounded-lg border border-outline-variant/20 bg-surface-container-low overflow-hidden animate-pulse"
              >
                <div className="aspect-[3/4] bg-surface-container-lowest"></div>
              </div>
            ))}
          </div>
        )}

        {!imagesLoading && images && images.length === 0 && (
          <div className="text-center py-space-3xl rounded-xl border border-dashed border-outline-variant/30">
            <p className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-space-sm italic">
              No photos yet
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant/60">
              Drag and drop images above to start building this album.
            </p>
          </div>
        )}

        {!imagesLoading && images && images.length > 0 && (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-space-md">
            {images.map((image) => (
              <div
                key={image._id}
                className="mb-space-md break-inside-avoid relative group bg-surface-container-low rounded-lg border border-outline-variant/20 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
              >
                <img
                  src={image.url}
                  alt=""
                  width={image.width}
                  height={image.height}
                  className="img-desat w-full h-auto block"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-inverse-on-surface/0 group-hover:bg-inverse-on-surface/40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTarget(image);
                    }}
                    className={primaryBtn}
                  >
                    Delete
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-surface/85 backdrop-blur-sm px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-label-sm font-label-sm text-on-surface-variant tracking-wider">
                    {image.width} × {image.height}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-inverse-on-surface/80 backdrop-blur-sm"
            onClick={() => !deleting && setDeleteTarget(null)}
          ></div>
          <div className="relative w-full max-w-sm bg-surface-container rounded-xl border border-outline-variant/20 shadow-[0_8px_40px_rgba(0,0,0,0.4)] p-space-lg">
            <div className="mb-space-md">
              <img
                src={deleteTarget.url}
                alt=""
                className="w-full aspect-[4/3] object-cover rounded-md"
              />
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight mb-space-md">
              Delete image?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
              This action cannot be undone.
            </p>

            {deleteError && (
              <p className="text-label-sm font-label-sm text-error tracking-wider uppercase mb-space-md">
                {deleteError}
              </p>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-full bg-error text-inverse-on-surface px-6 py-2.5 text-label-md font-label-md uppercase tracking-wider font-semibold flex-1 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className={ghostBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Album Delete Confirmation Modal */}
      {album && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-inverse-on-surface/80 backdrop-blur-sm"
            onClick={() => !deleting && setDeleteTarget(null)}
          ></div>
          <div className="relative w-full max-w-sm bg-surface-container rounded-xl border border-outline-variant/20 shadow-[0_8px_40px_rgba(0,0,0,0.4)] p-space-lg">
            <div className="mb-space-md">
              <img
                src={album.coverImageUrl}
                alt=""
                className="w-full aspect-[4/3] object-cover rounded-md"
              />
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight mb-space-md">
              Delete album?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
              This action cannot be undone.
            </p>

            {deleteError && (
              <p className="text-label-sm font-label-sm text-error tracking-wider uppercase mb-space-md">
                {deleteError}
              </p>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleAlbumDelete}
                disabled={deleting}
                className="rounded-full bg-error text-inverse-on-surface px-6 py-2.5 text-label-md font-label-md uppercase tracking-wider font-semibold flex-1 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className={ghostBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
