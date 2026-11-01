import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Section } from "@/components/shared/Section";
import { getPublishedProjects } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  path: "/projects",
  title: "Projects",
  description:
    "Selected web development projects by Mohd Mufeet, with a clear description of the role in each.",
});

export default function ProjectsPage() {
  const projects = getPublishedProjects();

  return (
    <main id="main" className="section-shell">
      <Section id="work" eyebrow="Work" title="Selected projects" description="Real projects, with a clear description of my role in each.">
        {projects.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Projects are being added"
            description="Only verified, approved project work is published. New cases will appear here once they are ready."
            action={{ label: "Let’s Work Together", href: "/contact" }}
          />
        )}
      </Section>
    </main>
  );
}
