import { ButtonLink } from "@/components/shared/ButtonLink";
import { TechChip } from "@/components/shared/TechChip";
import type { Project } from "@/types/content";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card flex h-full flex-col overflow-hidden rounded-md border border-border bg-surface">
      <div className="border-b border-border bg-surface-raised p-6">
        <p className="text-label uppercase tracking-[0.12em] text-accent">
          {project.featured ? "Featured" : "Project"}
        </p>
        <h2 className="mt-3 text-h3 font-semibold text-foreground">
          {project.title}
        </h2>
        {project.summary ? (
          <p className="mt-3 text-muted-foreground">{project.summary}</p>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6">
        {project.technologies.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <TechChip key={`${project.slug}-${technology}`} label={technology} />
            ))}
          </div>
        ) : null}
        <div className="mt-auto flex flex-wrap items-center gap-4">
          <ButtonLink href={`/projects/${project.slug}`} variant="secondary">
            View case study
          </ButtonLink>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-small font-medium text-foreground underline-offset-4 hover:underline"
              aria-label={`View ${project.title} live project (opens in a new tab)`}
            >
              Live demo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
