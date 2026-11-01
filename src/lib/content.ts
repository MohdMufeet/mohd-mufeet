import { about } from "@/config/about";
import { experience } from "@/config/experience";
import { processSteps } from "@/config/process";
import { projects } from "@/config/projects";
import { services } from "@/config/services";
import { skills } from "@/config/skills";
import { socialLinks } from "@/config/social";
import { siteConfig } from "@/config/site";
import { testimonials } from "@/config/testimonials";
import type { ServiceStatus } from "@/types/content";

export function getSiteConfig() {
  return siteConfig;
}

export function getSkills() {
  return skills;
}

export function getServices(
  status: Exclude<ServiceStatus, "hidden"> = "active",
) {
  return services
    .filter((service) => service.status === status)
    .sort((first, second) => first.order - second.order);
}

export function getPublishedProjects() {
  return projects.filter(
    (project) => project.status === "published" && project.verified,
  );
}

export function getFeaturedProjects() {
  return getPublishedProjects()
    .filter((project) => project.featured)
    .slice(0, 3);
}

export function getProjectBySlug(slug: string) {
  return getPublishedProjects().find((project) => project.slug === slug);
}

export function getExperience() {
  return experience;
}

export function getAbout() {
  return about;
}

export function getProcessSteps() {
  return processSteps;
}

export function getTestimonials() {
  return testimonials.filter((testimonial) => testimonial.permissionConfirmed);
}

export function getVisibleSocialLinks(
  placement: (typeof socialLinks)[number]["placements"][number],
) {
  return socialLinks.filter(
    (link) => link.url !== null && link.placements.includes(placement),
  );
}
