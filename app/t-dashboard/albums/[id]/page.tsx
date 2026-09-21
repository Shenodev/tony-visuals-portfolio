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

  if (albumError || imagesError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="border-2 border-error bg-surface-container-lowest p-8 max-w-md w-full">
          <h1 className="text-headline-md font-headline-md text-error mb-2">
            CONNECTION ERROR
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Failed to load album data. Please try again.
          </p>
          <button
            onClick={() => router.push("/t-dashboard")}
            className="mt-4 px-space-md py-space-sm bg-primary-container text-inverse-on-surface font-label-lg text-label-lg uppercase tracking-wider font-bold"
          >
            BACK TO DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-outline-variant/40 bg-surface/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop py-space-md flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/t-dashboard")}
              className="text-label-lg font-label-lg text-on-surface-variant hover:text-primary-container transition-colors uppercase tracking-wider"
            >
              ← BACK
            </button>
            <span className="h-[1px] w-8 bg-outline-variant/40"></span>
            <div>
              <h1 className="text-headline-md font-headline-md text-primary-container uppercase tracking-tight">
                {albumLoading ? "LOADING..." : album?.title || "ALBUM"}
              </h1>
              <p className="text-label-sm font-label-sm text-on-surface-variant tracking-wider">
                {imagesLoading
                  ? "LOADING IMAGES..."
                  : `${images?.length || 0} PHOTOS`}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop py-space-xl">
        {/* Upload Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed transition-all duration-200 mb-space-xl cursor-pointer ${
            isDragOver
              ? "border-primary-container bg-primary-container/10"
              : "border-outline-variant hover:border-primary-container/70"
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
                  <div className="h-2 bg-surface-container-lowest overflow-hidden">
                    <div
                      className="h-full bg-primary-container transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-headline-sm font-headline-sm text-primary-container mb-2">
                  UPLOADING...
                </p>
                <p className="text-body-md text-on-surface-variant">
                  {uploadProgress}% complete
                </p>
              </div>
            ) : (
              <div>
                <p className="text-headline-sm font-headline-sm text-on-surface-variant mb-2">
                  {isDragOver ? "DROP FILES HERE" : "DRAG & DROP IMAGES"}
                </p>
                <p className="text-body-md text-on-surface-variant/60 mb-4">
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
          <div className="border border-error bg-error-container/20 px-4 py-3 mb-space-xl">
            <p className="text-label-sm font-label-sm text-error tracking-wider uppercase">
              {uploadError}
            </p>
          </div>
        )}

        {/* Images Grid */}
        {imagesLoading && (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="mb-4 break-inside-avoid border border-outline-variant/30 bg-surface-container-low animate-pulse"
              >
                <div className="aspect-[3/4] bg-surface-container-lowest"></div>
              </div>
            ))}
          </div>
        )}

        {!imagesLoading && images && images.length === 0 && (
          <div className="text-center py-space-3xl">
            <p className="text-headline-sm font-headline-sm text-on-surface-variant mb-4">
              NO PHOTOS YET
            </p>
            <p className="text-body-md text-on-surface-variant/60">
              Drag and drop images above to start building this album.
            </p>
          </div>
        )}

        {!imagesLoading && images && images.length > 0 && (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {images.map((image) => (
              <div
                key={image._id}
                className="mb-4 break-inside-avoid relative group bg-surface-container-low border border-outline-variant/30"
              >
                <img
                  src={image.url}
                  alt=""
                  width={image.width}
                  height={image.height}
                  className="w-full h-auto block"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-inverse-on-surface/0 group-hover:bg-inverse-on-surface/40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTarget(image);
                    }}
                    className="px-space-md py-space-sm bg-error text-inverse-on-surface font-label-lg text-label-lg uppercase tracking-wider font-bold hover:bg-error/80 transition-colors"
                  >
                    DELETE
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-surface/85 backdrop-blur-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
          <div className="relative w-full max-w-sm bg-surface-container-lowest border-2 border-error">
            <div className="px-space-lg py-space-md border-b border-outline-variant/40">
              <h2 className="text-headline-sm font-headline-sm text-error uppercase tracking-tight">
                CONFIRM DELETION
              </h2>
            </div>
            <div className="p-space-lg">
              <div className="mb-space-md">
                <img
                  src={deleteTarget.url}
                  alt=""
                  className="w-full h-40 object-cover"
                />
              </div>
              <p className="text-body-md text-on-surface mb-space-md">
                Are you sure you want to delete this image? This action cannot be
                undone.
              </p>

              {deleteError && (
                <div className="border border-error bg-error-container/20 px-4 py-3 mb-space-md">
                  <p className="text-label-sm font-label-sm text-error tracking-wider uppercase">
                    {deleteError}
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 px-space-md py-space-sm bg-error text-inverse-on-surface font-label-lg text-label-lg uppercase tracking-wider font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
                >
                  {deleting ? "DELETING..." : "YES, DELETE"}
                </button>
                <button
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                  className="px-space-md py-space-sm border border-outline-variant text-on-surface-variant font-label-lg text-label-lg uppercase tracking-wider hover:border-primary-container hover:text-primary-container transition-all duration-150 disabled:opacity-50"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
