"use client";

import { FormEvent, useState, useCallback } from "react";
import useSWR from "swr";

interface Album {
  _id: string;
  title: string;
  coverImageUrl: string;
  coverImagePublicId: string;
  createdAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
});

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export default function DashboardPage() {
  const { data: albums, error, isLoading, mutate } = useSWR<Album[]>(
    "/api/admin/albums",
    fetcher
  );

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<Album | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const resetCreateForm = useCallback(() => {
    setTitle("");
    setFile(null);
    setPreview(null);
    setCreateError("");
    setShowCreateModal(false);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!ALLOWED_TYPES.includes(selected.type)) {
      setCreateError(`Invalid file type. Allowed: ${ALLOWED_TYPES.join(", ")}`);
      return;
    }

    if (selected.size > MAX_FILE_SIZE) {
      setCreateError("File too large. Maximum size: 10MB");
      return;
    }

    setFile(selected);
    setCreateError("");

    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(selected);
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError("");

    try {
      if (!title.trim()) {
        setCreateError("Album title is required");
        setCreating(false);
        return;
      }

      if (!file) {
        setCreateError("Cover image is required");
        setCreating(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("coverImage", file);

      const res = await fetch("/api/admin/albums", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create album");
      }

      await mutate();
      resetCreateForm();
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Failed to create album");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError("");

    try {
      const res = await fetch(`/api/admin/albums/${deleteTarget._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete album");
      }

      await mutate();
      setDeleteTarget(null);
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete album");
    } finally {
      setDeleting(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="border-2 border-error bg-surface-container-lowest p-8 max-w-md w-full">
          <h1 className="text-headline-md font-headline-md text-error mb-2">
            CONNECTION ERROR
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Failed to load dashboard. Please check your connection and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-outline-variant/40 bg-surface/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop py-space-md flex items-center justify-between">
          <div>
            <h1 className="text-headline-md font-headline-md text-primary-container uppercase tracking-tight">
              ADMIN DASHBOARD
            </h1>
            <p className="text-label-sm font-label-sm text-on-surface-variant tracking-wider">
              TONY VISUALS — CONTENT MANAGEMENT
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-space-md py-space-sm bg-primary-container text-inverse-on-surface font-label-lg text-label-lg uppercase tracking-wider font-bold hover:shadow-[0_0_20px_rgba(126,252,159,0.3)] transition-all duration-150"
          >
            + NEW ALBUM
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop py-space-xl">
        {/* Stats Bar */}
        <div className="flex items-center gap-4 mb-space-xl border-b border-outline-variant/40 pb-space-md">
          <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase">
            {isLoading ? "LOADING..." : `${albums?.length || 0} ALBUMS`}
          </span>
          <span className="h-[1px] w-12 bg-primary-container"></span>
          <button
            onClick={() => mutate()}
            className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary-container transition-colors tracking-wider uppercase"
          >
            REFRESH
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-outline-variant/30 bg-surface-container-low animate-pulse"
              >
                <div className="aspect-[4/3] bg-surface-container-lowest"></div>
                <div className="p-space-md">
                  <div className="h-4 bg-surface-container-high w-2/3 mb-2"></div>
                  <div className="h-3 bg-surface-container-high w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && albums && albums.length === 0 && (
          <div className="text-center py-space-3xl">
            <p className="text-headline-sm font-headline-sm text-on-surface-variant mb-4">
              NO ALBUMS YET
            </p>
            <p className="text-body-md text-on-surface-variant/60 mb-8">
              Create your first album to start building your portfolio.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-space-xl py-space-md bg-primary-container text-inverse-on-surface font-label-lg text-label-lg uppercase tracking-wider font-bold hover:shadow-[0_0_20px_rgba(126,252,159,0.3)] transition-all duration-150"
            >
              CREATE FIRST ALBUM
            </button>
          </div>
        )}

        {/* Albums Grid */}
        {!isLoading && albums && albums.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album) => (
              <article
                key={album._id}
                className="relative flex flex-col bg-surface-container-low border border-outline-variant/30 hover:border-primary-container/70 transition-all duration-200"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-lowest">
                  <img
                    src={album.coverImageUrl}
                    alt={album.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-surface/90 px-2.5 py-1 border border-outline-variant/40 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-container"></span>
                    <span className="text-label-sm font-label-sm text-on-surface tracking-wider uppercase">
                      COVER
                    </span>
                  </div>
                </div>
                <div className="p-space-md flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs font-semibold">
                      {album.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Created {new Date(album.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="pt-space-sm mt-space-sm border-t border-outline-variant/20 flex items-center justify-between">
                    <button
                      onClick={() => setDeleteTarget(album)}
                      className="text-label-sm font-label-sm text-error hover:text-error/80 tracking-wider uppercase transition-colors"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Create Album Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-inverse-on-surface/80 backdrop-blur-sm"
            onClick={resetCreateForm}
          ></div>
          <div className="relative w-full max-w-md bg-surface-container-lowest border-2 border-primary-container">
            <div className="px-space-lg py-space-md border-b border-outline-variant/40 flex items-center justify-between">
              <h2 className="text-headline-sm font-headline-sm text-primary-container uppercase tracking-tight">
                CREATE NEW ALBUM
              </h2>
              <button
                onClick={resetCreateForm}
                className="text-on-surface-variant hover:text-primary-container transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-space-lg">
              <label className="block mb-space-md">
                <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase mb-2 block">
                  ALBUM TITLE
                </span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Summer Music Concert"
                  className="w-full bg-inverse-on-surface border-2 border-outline-variant text-on-surface font-body-md px-4 py-3 placeholder:text-on-surface-variant/30 focus:border-primary-container focus:outline-none transition-colors"
                />
              </label>

              <label className="block mb-space-md">
                <span className="text-label-sm font-label-sm text-primary-container tracking-widest uppercase mb-2 block">
                  COVER IMAGE
                </span>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    required
                  />
                  <div className="border-2 border-dashed border-outline-variant hover:border-primary-container/70 transition-colors p-space-lg text-center">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-40 object-cover mb-2"
                      />
                    ) : (
                      <div className="py-4">
                        <p className="text-body-md text-on-surface-variant mb-1">
                          Click to select or drag and drop
                        </p>
                        <p className="text-label-sm font-label-sm text-on-surface-variant/60 tracking-wider">
                          JPEG, PNG, WEBP, GIF — MAX 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </label>

              {createError && (
                <div className="border border-error bg-error-container/20 px-4 py-3 mb-space-md">
                  <p className="text-label-sm font-label-sm text-error tracking-wider uppercase">
                    {createError}
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 px-space-md py-space-sm bg-primary-container text-inverse-on-surface font-label-lg text-label-lg uppercase tracking-wider font-bold hover:shadow-[0_0_20px_rgba(126,252,159,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
                >
                  {creating ? "CREATING..." : "CREATE ALBUM"}
                </button>
                <button
                  type="button"
                  onClick={resetCreateForm}
                  className="px-space-md py-space-sm border border-outline-variant text-on-surface-variant font-label-lg text-label-lg uppercase tracking-wider hover:border-primary-container hover:text-primary-container transition-all duration-150"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              <p className="text-body-md text-on-surface mb-space-md">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-on-surface">
                  &quot;{deleteTarget.title}&quot;
                </span>
                ? This will permanently remove the album and all its images from
                the database and Cloudinary.
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
