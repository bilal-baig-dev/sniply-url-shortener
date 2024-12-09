import { LANGUAGES } from "@/lib/constants";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = String(process.env.NEXT_PUBLIC_BASE_URL);
  const sitemapEntries: MetadataRoute.Sitemap = [];
  Object.keys(LANGUAGES).forEach((lang) => {
    sitemapEntries.push({
      url: `${siteUrl}/${lang}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });
  return [
    {
      url: siteUrl,
      lastModified: new Date().toISOString(),
      priority: 1,
    },
    {
      url: `${siteUrl}/login`,
      lastModified: new Date().toISOString(),
      priority: 0.9,
    },
    ...sitemapEntries,
  ];
}
