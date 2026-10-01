import { create } from "zustand";
import { AlbumDoc } from "@/lib/albums";

interface AlbumsState {
  albums: AlbumDoc[];
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  setAlbums: (albums: AlbumDoc[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  shouldRefetch: () => boolean;
}

export const useAlbumsStore = create<AlbumsState>((set, get) => ({
  albums: [],
  isLoading: false,
  error: null,
  lastFetched: null,
  setAlbums: (albums) =>
    set({ albums, lastFetched: Date.now(), isLoading: false, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  shouldRefetch: () => {
    const { lastFetched } = get();
    if (!lastFetched) return true;
    return Date.now() - lastFetched > 60000;
  },
}));
