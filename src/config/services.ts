import { projects } from "@/config/projects";
import { serviceSchema } from "@/types/content";

const publishedProjectSlugs = new Set(
  projects
    .filter((project) => project.status === "published" && project.verified)
    .map((project) => project.slug),
);

const servicesSchema = serviceSchema.array().superRefine((entries, context) => {
  const slugs = new Set<string>();

  entries.forEach((service, index) => {
    if (slugs.has(service.slug)) {
      context.addIssue({
        code: "custom",
        message: `Duplicate service slug: ${service.slug}`,
        path: [index, "slug"],
      });
    }

    slugs.add(service.slug);

    service.projectRefs.forEach((projectRef) => {
      if (!publishedProjectSlugs.has(projectRef)) {
        context.addIssue({
          code: "custom",
          message: `Service project reference must point to a verified, published project: ${projectRef}`,
          path: [index, "projectRefs"],
        });
      }
    });
  });
});

export const services = servicesSchema.parse([
  {
    slug: "full-stack-web-development",
    category: "development",
    title: "Full Stack Web Development",
    summary:
      "End-to-end web applications, from interface to database, including MERN stack projects.",
    description:
      "Work across the user interface, application logic, and data layer of a web application.",
    benefits: [
      "One developer across frontend and backend",
      "Consistent architecture",
      "Clear communication",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Supabase",
    ],
    projectRefs: [],
    cta: {
      label: "Discuss this project",
      href: "/contact?service=full-stack-web-development",
    },
    status: "active",
    order: 1,
  },
  {
    slug: "nextjs-development",
    category: "development",
    title: "Next.js Development",
    summary: "Fast, search-friendly sites and apps built with Next.js.",
    description:
      "Build sites and applications with Next.js, React, and maintainable TypeScript.",
    benefits: [
      "Good performance foundations",
      "SEO-friendly rendering",
      "Maintainable TypeScript",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    projectRefs: [],
    cta: {
      label: "Discuss this project",
      href: "/contact?service=nextjs-development",
    },
    status: "active",
    order: 2,
  },
  {
    slug: "business-website-development",
    category: "development",
    title: "Business Website Development",
    summary:
      "Professional, responsive websites that present your business clearly.",
    description:
      "Create responsive business pages with a clear information structure and enquiry path.",
    benefits: [
      "Mobile-friendly design",
      "Clear structure",
      "Contact and enquiry paths",
    ],
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "React Hook Form",
      "Zod",
    ],
    projectRefs: [],
    cta: {
      label: "Discuss this project",
      href: "/contact?service=business-website-development",
    },
    status: "active",
    order: 3,
  },
  {
    slug: "ecommerce-development",
    category: "development",
    title: "E-commerce Development",
    summary: "Online store builds with product, cart, and order flows.",
    description:
      "Build online store experiences that can include product, cart, and order flows.",
    benefits: [
      "Tailored flows",
      "Secure authentication and roles",
      "Scalable data layer",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT Authentication",
    ],
    projectRefs: [],
    cta: {
      label: "Discuss this project",
      href: "/contact?service=ecommerce-development",
    },
    status: "active",
    order: 4,
  },
  {
    slug: "backend-api-development",
    category: "development",
    title: "Backend Development & API Integration",
    summary: "REST APIs, authentication, and third-party integrations.",
    description:
      "Build REST APIs and connect them with application authentication and third-party services.",
    benefits: [
      "Structured APIs",
      "Protected routes and role-based access",
      "Reliable integrations",
    ],
    technologies: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
      "Role-Based Access Control",
    ],
    projectRefs: [],
    cta: {
      label: "Discuss this project",
      href: "/contact?service=backend-api-development",
    },
    status: "active",
    order: 5,
  },
  {
    slug: "database-integration",
    category: "development",
    title: "Database Integration",
    summary: "Connecting applications to well-structured databases.",
    description:
      "Connect an application to a database with data models and appropriate access patterns.",
    benefits: [
      "Sensible data modelling",
      "Safe data access",
      "Migration help",
    ],
    technologies: ["MongoDB", "Mongoose", "Prisma ORM", "Supabase"],
    projectRefs: [],
    cta: {
      label: "Discuss this project",
      href: "/contact?service=database-integration",
    },
    status: "active",
    order: 6,
  },
]);
