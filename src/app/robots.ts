import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteConfig().url;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    ...(siteUrl ? { sitemap: new URL("/sitemap.xml", siteUrl).toString() } : {}),
  };
}
