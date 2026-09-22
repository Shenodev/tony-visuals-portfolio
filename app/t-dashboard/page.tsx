"use client";

import { FormEvent, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const inputBase =
  "w-full bg-transparent border-b border-outline-variant/40 px-1 py-3 text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary-container transition-colors duration-300";
const labelBase =
  "block text-label-sm font-label-sm tracking-widest text-primary-container uppercase mb-1";
const primaryBtn =
  "rounded-full bg-primary-container text-inverse-on-surface px-6 py-2.5 text-label-md font-label-md uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed";
const ghostBtn =
  "rounded-full border border-outline-variant text-on-surface-variant px-6 py-2.5 text-label-md font-label-md uppercase tracking-wider hover:border-primary-container hover:text-primary-container transition-colors";

export default function DashboardPage() {
  const router = useRouter();
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
        <div className="rounded-xl border border-error bg-surface-container p-space-xl max-w-md w-full text-center">
          <p className="font-headline-lg text-headline-lg text-error mb-2 uppercase tracking-tight">
            Connection error
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Failed to load dashboard. Please check your connection and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-outline-variant/20 bg-background/85 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin h-16 md:h-20 flex items-center justify-between gap-space-lg">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-headline-md text-headline-md tracking-tight text-on-surface hover:text-primary-container transition-colors"
            >
              TONY&nbsp;VISUALS
            </Link>
            <span className="hidden sm:inline-flex rounded-full border border-primary-container/40 px-3 py-1 text-label-sm font-label-sm text-primary-container tracking-widest uppercase">
              Admin
            </span>
          </div>
          <button onClick={() => setShowCreateModal(true)} className={primaryBtn}>
            + New album
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin py-space-xl md:py-space-2xl">
        {/* Stats Bar */}
        <div className="flex items-center gap-space-md mb-space-xl">
          <span className="text-label-sm font-label-sm tracking-widest text-primary-container uppercase">
            {isLoading ? "Loading..." : `${albums?.length || 0} albums`}
          </span>
          <button
            onClick={() => mutate()}
            className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary-container transition-colors tracking-wider uppercase"
          >
            Refresh
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-outline-variant/20 bg-surface-container-low overflow-hidden animate-pulse"
              >
                <div className="aspect-[4/3] bg-surface-container-lowest"></div>
                <div className="p-space-md">
                  <div className="h-4 bg-surface-container-high w-2/3 mb-2 rounded"></div>
                  <div className="h-3 bg-surface-container-high w-1/3 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && albums && albums.length === 0 && (
          <div className="text-center py-space-3xl">
            <p className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-space-sm italic">
              No albums yet
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-xl">
              Create your first album to start building your portfolio.
            </p>
            <button onClick={() => setShowCreateModal(true)} className={primaryBtn}>
              Create first album
            </button>
          </div>
        )}

        {/* Albums Grid */}
        {!isLoading && albums && albums.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {albums.map((album) => (
              <article
                key={album._id}
                className="card-group relative flex flex-col bg-surface-container-low rounded-lg border border-outline-variant/20 hover:border-primary-container/50 overflow-hidden transition-colors duration-200 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-lowest">
                  <img
                    src={album.coverImageUrl}
                    alt={album.title}
                    className="img-desat w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-background/85 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-container"></span>
                    <span className="text-label-sm font-label-sm text-on-surface tracking-wider uppercase">
                      Cover
                    </span>
                  </div>
                </div>
                <div className="p-space-md flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                      {album.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Created{" "}
                      {new Date(album.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="pt-space-sm mt-space-sm border-t border-outline-variant/20 flex items-center justify-between gap-2">
                    <button
                      onClick={() => router.push(`/t-dashboard/albums/${album._id}`)}
                      className="text-label-sm font-label-sm text-primary-container hover:text-primary-container/80 tracking-wider uppercase transition-colors"
                    >
                      Manage photos
                    </button>
                    <button
                      onClick={() => setDeleteTarget(album)}
                      className="text-label-sm font-label-sm text-error hover:text-error/80 tracking-wider uppercase transition-colors"
                    >
                      Delete
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
          <div className="relative w-full max-w-md bg-surface-container rounded-xl border border-outline-variant/20 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
            <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                New album
              </h2>
              <button
                onClick={resetCreateForm}
                className="text-on-surface-variant hover:text-primary-container transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-space-lg flex flex-col gap-space-lg">
              <div>
                <span className={labelBase}>Album title</span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Summer Music Concert"
                  className={inputBase}
                />
              </div>

              <div>
                <span className={labelBase}>Cover image</span>
                <div className="relative mt-1">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    required
                  />
                  <div className="border-2 border-dashed border-outline-variant hover:border-primary-container/70 transition-colors rounded-lg p-space-lg text-center">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full aspect-[4/3] object-cover rounded-md mb-2"
                      />
                    ) : (
                      <div className="py-4">
                        <p className="font-body-md text-body-md text-on-surface-variant mb-1">
                          Click to select or drag and drop
                        </p>
                        <p className="text-label-sm font-label-sm text-on-surface-variant/60 tracking-wider">
                          JPEG, PNG, WEBP, GIF — MAX 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {createError && (
                <p className="text-label-sm font-label-sm text-error tracking-wider uppercase">
                  {createError}
                </p>
              )}

              <div className="flex gap-4 pt-space-sm">
                <button type="submit" disabled={creating} className={`${primaryBtn} flex-1`}>
                  {creating ? "Creating..." : "Create album"}
                </button>
                <button type="button" onClick={resetCreateForm} className={ghostBtn}>
                  Cancel
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
          <div className="relative w-full max-w-sm bg-surface-container rounded-xl border border-outline-variant/20 shadow-[0_8px_40px_rgba(0,0,0,0.4)] p-space-lg">
            <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight mb-space-md">
              Delete album?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
              Permanently remove{" "}
              <span className="font-semibold text-on-surface">
                &quot;{deleteTarget.title}&quot;
              </span>{" "}
              and all its images from the database and Cloudinary?
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
    </div>
  );
}