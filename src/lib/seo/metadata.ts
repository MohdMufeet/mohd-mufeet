import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/content";

type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  path,
  title,
  description,
  type = "website",
}: PageMetadataInput): Metadata {
  const site = getSiteConfig();
  const canonical = site.url ? new URL(path, site.url).toString() : undefined;

  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      title,
      description,
      type,
      siteName: site.name,
      locale: "en_IN",
      ...(canonical ? { url: canonical } : {}),
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
