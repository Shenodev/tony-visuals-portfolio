import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllAlbums } from "@/lib/albums";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/refund-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/cookie-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  let albumRoutes: MetadataRoute.Sitemap = [];
  try {
    const albums = await getAllAlbums();
    albumRoutes = albums.map((album) => ({
      url: `${SITE_URL}/albums/${album._id}`,
      lastModified: album.updatedAt ?? now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    // DB temporarily unreachable — serve the static routes rather than erroring.
  }

  return [...staticRoutes, ...albumRoutes];
}