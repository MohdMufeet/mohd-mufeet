import { z } from "zod";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || null;
const siteUrl = z
  .string()
  .url()
  .refine((value) => value.startsWith("https://"), {
    message: "NEXT_PUBLIC_SITE_URL must use HTTPS.",
  })
  .nullable()
  .parse(configuredSiteUrl);

export const siteConfig = {
  name: "Mohd Mufeet",
  title: "Mohd Mufeet – Freelance Full Stack Developer",
  description:
    "I'm Mohd Mufeet, a Freelance Full Stack Developer specializing in building modern, scalable, and user-friendly web applications.",
  role: "Freelance Full Stack Developer (MERN Stack)",
  location: {
    locality: "Kanpur",
    region: "Uttar Pradesh",
    country: "India",
  },
  url: siteUrl,
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  contact: {
    email: null as string | null,
    whatsappNumber: null as string | null,
    whatsappMessage: "Hi Mufeet, I'd like to discuss a project.",
    resumePath: null as string | null,
  },
};
