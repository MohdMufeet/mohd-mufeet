import type { MetadataRoute } from "next";
import { getPublishedProjects, getSiteConfig } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteConfig().url;

  if (!siteUrl) {
    return [];
  }

  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/projects",
    "/contact",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: new URL(path, siteUrl).toString(),
    })),
    ...getPublishedProjects().map((project) => ({
      url: new URL(`/projects/${project.slug}`, siteUrl).toString(),
    })),
  ];
}
