import type { MetadataRoute } from "next";

// Marketing site origin. Override per environment with NEXT_PUBLIC_SITE_URL
// (no trailing slash), e.g. https://auroraxp.io.
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.auroraxp.io"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/coming-soon`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}
