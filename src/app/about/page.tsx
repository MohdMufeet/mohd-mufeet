import type { Metadata } from "next";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { EmptyState } from "@/components/shared/EmptyState";
import { Section } from "@/components/shared/Section";
import { TechChip } from "@/components/shared/TechChip";
import { getAbout, getExperience, getServices, getSiteConfig, getSkills } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  path: "/about",
  title: "About",
  description:
    "Learn about Mohd Mufeet, a freelance full stack developer working with Next.js, React, Node.js, and Supabase.",
});

export default function AboutPage() {
  const about = getAbout();
  const siteConfig = getSiteConfig();
  const experience = getExperience();
  const skills = getSkills();
  const services = getServices("active");

  return (
    <main id="main" className="section-shell">
      <Section id="about" eyebrow="About" title="A developer you work with directly" description="Clear communication, practical delivery, and no guesswork.">
        <div className="space-y-6 text-body-lg text-muted-foreground">
          <p>{about.introduction}</p>
          {about.background ? <p>{about.background}</p> : null}
          {about.workingStyle ? <p>{about.workingStyle}</p> : null}
          {!about.background && !about.workingStyle ? (
            <EmptyState
              title="More about me is pending"
              description="I’m keeping the personal story honest and only publishing details once they are approved."
              action={{ label: "Contact me", href: "/contact" }}
            />
          ) : null}
        </div>
      </Section>

      <Section id="profile" eyebrow="Profile" title="Working style" description="A straightforward, production-focused approach.">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-md border border-border bg-surface p-6">
            <p className="text-label uppercase tracking-[0.12em] text-accent">Based in</p>
            <p className="mt-3 text-h3 font-semibold text-foreground">
              {siteConfig.location.locality}, {siteConfig.location.region}, {siteConfig.location.country}
            </p>
          </div>
          <div className="rounded-md border border-border bg-surface p-6">
            <p className="text-label uppercase tracking-[0.12em] text-accent">Focus</p>
            <p className="mt-3 text-h3 font-semibold text-foreground">
              Full stack web apps built with modern JavaScript tooling.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="skills"
        eyebrow="Technologies"
        title="Tools I build with"
        description="Confirmed technologies and core concepts."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((group) => (
            <div key={group.group} className="rounded-md border border-border bg-surface p-5">
              <h2 className="text-label uppercase tracking-[0.12em] text-accent">
                {group.group}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <TechChip key={`${group.group}-${skill}`} label={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {experience.length > 0 ? (
        <Section
          id="experience"
          eyebrow="Experience"
          title="Professional experience"
          description="Verified experience and responsibilities."
        >
          <div className="space-y-4">
            {experience.map((item) => (
              <article
                key={`${item.company}-${item.role}`}
                className="rounded-md border border-border bg-surface p-6"
              >
                <h2 className="text-h3 font-semibold text-foreground">{item.role}</h2>
                {item.companyUrl ? (
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-muted-foreground underline-offset-4 hover:underline"
                    aria-label={`${item.company} (opens in a new tab)`}
                  >
                    {item.company}
                  </a>
                ) : (
                  <p className="mt-1 text-muted-foreground">{item.company}</p>
                )}
                {item.period || item.type ? (
                  <p className="mt-2 text-small text-muted-foreground">
                    {[item.period, item.type].filter(Boolean).join(" · ")}
                  </p>
                ) : null}
                {item.highlights.length > 0 ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                    {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      <Section
        id="services"
        eyebrow="Services"
        title="Development services"
        description="Ways I can help with a web development project."
      >
        <div className="flex flex-wrap gap-3">
          {services.map((service) => (
            <ButtonLink
              key={service.slug}
              href={service.cta.href}
              variant="secondary"
            >
              {service.title}
            </ButtonLink>
          ))}
        </div>
      </Section>
    </main>
  );
}
