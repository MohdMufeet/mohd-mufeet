import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { JsonLd } from "@/components/shared/JsonLd";
import { Section } from "@/components/shared/Section";
import {
  getProjectBySlug,
  getPublishedProjects,
  getSiteConfig,
} from "@/lib/content";
import { createPageMetadata } from "@/lib/seo/metadata";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  }

  return createPageMetadata({
    path: `/projects/${project.slug}`,
    title: project.title,
    description:
      project.summary ?? `Verified project case study: ${project.title}.`,
    type: "article",
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const site = getSiteConfig();
  const projects = getPublishedProjects();
  const projectIndex = projects.findIndex((entry) => entry.slug === project.slug);
  const previousProject = projects[projectIndex - 1];
  const nextProject = projects[projectIndex + 1];
  const creativeWorkJsonLd = site.url
    ? {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        url: new URL(`/projects/${project.slug}`, site.url).toString(),
        ...(project.summary ? { description: project.summary } : {}),
        ...(project.technologies.length > 0
          ? { keywords: project.technologies }
          : {}),
      }
    : null;

  return (
    <main id="main" className="section-shell">
      {creativeWorkJsonLd ? <JsonLd data={creativeWorkJsonLd} /> : null}
      <Section
        id="project"
        eyebrow="Project"
        title={project.title}
        description={project.summary ?? undefined}
      >
        {project.role || project.timeframe || project.technologies.length > 0 ? (
          <dl className="grid gap-4 rounded-md border border-border bg-surface p-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.role ? (
              <div>
                <dt className="text-small text-muted-foreground">My role</dt>
                <dd className="mt-1 font-medium text-foreground">{project.role}</dd>
              </div>
            ) : null}
            {project.timeframe ? (
              <div>
                <dt className="text-small text-muted-foreground">Timeframe</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {project.timeframe}
                </dd>
              </div>
            ) : null}
            {project.technologies.length > 0 ? (
              <div>
                <dt className="text-small text-muted-foreground">Technologies</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {project.technologies.join(", ")}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        <div className="mt-8 space-y-8">
          {(
            [
              ["Project overview", project.caseStudy.overview],
              ["Problem", project.caseStudy.problem],
              ["Solution", project.caseStudy.solution],
              ["Outcome", project.caseStudy.outcome],
            ] as const
          ).map(([heading, copy]) =>
            copy ? (
              <section key={heading} aria-label={heading}>
                <h2 className="text-h2 font-semibold text-foreground">{heading}</h2>
                <p className="mt-3 max-w-3xl text-body-lg text-muted-foreground">
                  {copy}
                </p>
              </section>
            ) : null,
          )}

          {project.caseStudy.features.length > 0 ? (
            <section aria-label="Key features">
              <h2 className="text-h2 font-semibold text-foreground">
                Key features
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                {project.caseStudy.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.caseStudy.challenges.length > 0 ? (
            <section aria-label="Challenges">
              <h2 className="text-h2 font-semibold text-foreground">Challenges</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                {project.caseStudy.challenges.map((challenge) => (
                  <li key={challenge}>{challenge}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button-link button-link--secondary"
              aria-label={`${project.title} live demo (opens in a new tab)`}
            >
              Live demo
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button-link button-link--secondary"
              aria-label={`${project.title} source code (opens in a new tab)`}
            >
              GitHub
            </a>
          ) : null}
          <ButtonLink href="/contact">Discuss a project</ButtonLink>
        </div>

        {projects.length > 1 ? (
          <nav
            aria-label="Project navigation"
            className="mt-12 flex flex-wrap justify-between gap-4 border-t border-border pt-6"
          >
            {previousProject ? (
              <ButtonLink
                href={`/projects/${previousProject.slug}`}
                variant="ghost"
              >
                Previous: {previousProject.title}
              </ButtonLink>
            ) : <span />}
            {nextProject ? (
              <ButtonLink href={`/projects/${nextProject.slug}`} variant="ghost">
                Next: {nextProject.title}
              </ButtonLink>
            ) : null}
          </nav>
        ) : null}
      </Section>

      {projects.length > 1 ? (
        <Section
          id="more-projects"
          eyebrow="More work"
          title="More projects"
          description="Other verified projects."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            {projects
              .filter((entry) => entry.slug !== project.slug)
              .slice(0, 2)
              .map((entry) => (
                <ProjectCard key={entry.slug} project={entry} />
              ))}
          </div>
        </Section>
      ) : null}
    </main>
  );
}
