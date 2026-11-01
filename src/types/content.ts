import { z } from "zod";

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const optionalUrlSchema = z.string().url().nullable();

export const serviceSchema = z.object({
  slug: slugSchema,
  category: z.enum(["development", "growth", "branding"]),
  title: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  benefits: z.array(z.string()),
  technologies: z.array(z.string()),
  projectRefs: z.array(slugSchema),
  cta: z.object({ label: z.string().min(1), href: z.string().min(1) }),
  status: z.enum(["active", "coming-soon", "hidden"]),
  order: z.number().int().nonnegative(),
});

export const projectSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  summary: z.string().nullable(),
  featured: z.boolean(),
  status: z.enum(["published", "draft"]),
  liveUrl: optionalUrlSchema,
  githubUrl: optionalUrlSchema,
  image: z.string().nullable(),
  technologies: z.array(z.string()),
  role: z.string().nullable(),
  timeframe: z.string().nullable(),
  caseStudy: z.object({
    overview: z.string().nullable(),
    problem: z.string().nullable(),
    solution: z.string().nullable(),
    features: z.array(z.string()),
    challenges: z.array(z.string()),
    outcome: z.string().nullable(),
  }),
  verified: z.boolean(),
});

export const experienceItemSchema = z.object({
  company: z.string().min(1),
  companyUrl: optionalUrlSchema,
  role: z.string().min(1),
  period: z.string().nullable(),
  type: z.string().nullable(),
  highlights: z.array(z.string()),
});

export const skillGroupSchema = z.object({
  group: z.enum(["Frontend", "Backend", "Database", "Tools", "Core Concepts"]),
  items: z.array(z.string().min(1)),
});

export const socialLinkSchema = z.object({
  id: z.enum([
    "github",
    "linkedin",
    "instagram",
    "facebook",
    "x",
    "youtube",
    "whatsapp",
    "email",
  ]),
  label: z.string().min(1),
  url: z
    .string()
    .url()
    .refine(
      (url) =>
        url.startsWith("https://") ||
        url.startsWith("mailto:") ||
        url.startsWith("https://wa.me/"),
    )
    .nullable(),
  kind: z.enum(["profile", "message", "mailto"]),
  handle: z.string().nullable(),
  placements: z.array(
    z.enum(["contact", "footer", "mobile-menu", "navbar"]),
  ),
  order: z.number().int().nonnegative(),
});

export const testimonialSchema = z.object({
  quote: z.string().min(1),
  author: z.string().min(1),
  role: z.string().nullable(),
  permissionConfirmed: z.boolean(),
});

export type Service = z.infer<typeof serviceSchema>;
export type ServiceStatus = Service["status"];
export type Project = z.infer<typeof projectSchema>;
export type ExperienceItem = z.infer<typeof experienceItemSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
