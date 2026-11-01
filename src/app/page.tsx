import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { EmptyState } from "@/components/shared/EmptyState";
import { JsonLd } from "@/components/shared/JsonLd";
import { PortfolioStats } from "@/components/shared/PortfolioStats";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Section } from "@/components/shared/Section";
import { TechChip } from "@/components/shared/TechChip";
import { isContactSubmissionEnabled } from "@/lib/contact/config";
import { getAbout, getExperience, getFeaturedProjects, getProcessSteps, getPublishedProjects, getServices, getSiteConfig, getSkills, getTestimonials, getVisibleSocialLinks } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  path: "/",
  title: "Mohd Mufeet – Freelance Full Stack Developer",
  description:
    "Freelance Full Stack Developer in Kanpur, India, building modern, scalable web applications with Next.js, React, and the MERN stack.",
});

export default function Home() {
  const siteConfig = getSiteConfig();
  const skills = getSkills();
  const services = getServices();
  const featuredProjects = getFeaturedProjects();
  const publishedProjects = getPublishedProjects();
  const about = getAbout();
  const experience = getExperience();
  const processSteps = getProcessSteps();
  const testimonials = getTestimonials();
  const socialLinks = getVisibleSocialLinks("contact");
  const activeServices = getServices("active");
  const apiCount = publishedProjects.reduce((highestCount, project) => {
    const apiFeature = project.caseStudy.features.find((feature) =>
      /^\d+\+ REST APIs$/.test(feature),
    );
    const count = apiFeature ? Number.parseInt(apiFeature, 10) : 0;
    return Math.max(highestCount, count);
  }, 0);
  const portfolioStats = [
    {
      value: publishedProjects.length,
      label: "Verified projects",
      detail: "Published work you can explore",
    },
    {
      value: apiCount,
      suffix: apiCount > 0 ? "+" : undefined,
      label: "REST APIs",
      detail: "Built for real application workflows",
    },
    {
      value: activeServices.length,
      label: "Active services",
      detail: "Ways I can help your next build",
    },
    {
      value: skills.length,
      label: "Skill areas",
      detail: "From frontend to core concepts",
    },
  ];
  const personJsonLd = siteConfig.url
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.name,
        jobTitle: siteConfig.role,
        url: siteConfig.url,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.locality,
          addressRegion: siteConfig.location.region,
          addressCountry: siteConfig.location.country,
        },
        sameAs: socialLinks
          .filter((link) => link.kind === "profile" && link.url)
          .map((link) => link.url),
        knowsAbout: skills.flatMap((group) => group.items),
      }
    : null;

  return (
    <main id="main">
      {personJsonLd ? <JsonLd data={personJsonLd} /> : null}
      <section id="home" className="section-shell">
        <Container>
          <p className="font-mono text-label uppercase tracking-[0.2em] text-muted-foreground">
            {siteConfig.title}
          </p>
          <h1 className="mt-4 max-w-4xl text-display font-semibold leading-tight tracking-tight text-balance">
            Building Modern Web Experiences That Help Businesses Grow.
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
            {siteConfig.description}
          </p>
          <nav className="mt-8 flex flex-col gap-3 sm:flex-row" aria-label="Primary">
            <ButtonLink href="/contact" className="w-full sm:w-auto">Let&apos;s Work Together</ButtonLink>
            <ButtonLink href="/projects" variant="secondary" className="w-full sm:w-auto">
              Explore My Work
            </ButtonLink>
          </nav>

          <div className="mt-12 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden rounded-md border border-border bg-surface">
              <div className="flex items-center justify-between border-b border-border bg-surface-raised px-5 py-3">
                <p className="font-mono text-small text-foreground">profile.config</p>
                <span className="flex items-center gap-2 text-label text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                  Profile data
                </span>
              </div>
              <div className="space-y-1 p-5 font-mono text-small leading-7">
                <p className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3">
                  <span className="text-muted-foreground/60" aria-hidden="true">01</span>
                  <span className="break-words"><span className="text-accent">role</span>: <span className="text-foreground">{siteConfig.role}</span></span>
                </p>
                <p className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3">
                  <span className="text-muted-foreground/60" aria-hidden="true">02</span>
                  <span className="break-words"><span className="text-accent">location</span>: <span className="text-foreground">{siteConfig.location.locality}, {siteConfig.location.region}, {siteConfig.location.country}</span></span>
                </p>
                <p className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3">
                  <span className="text-muted-foreground/60" aria-hidden="true">03</span>
                  <span className="break-words"><span className="text-accent">stack</span>: <span className="text-foreground">[{skills.flatMap((group) => group.items).slice(0, 7).join(", ")}]</span></span>
                </p>
              </div>
            </div>
            <div className="rounded-md border border-border bg-surface p-6">
              <p className="text-label uppercase tracking-[0.12em] text-accent">Profile</p>
              <p className="mt-4 text-h3 font-semibold text-foreground">{siteConfig.role}</p>
              <p className="mt-3 text-muted-foreground">
                {siteConfig.location.locality}, {siteConfig.location.region}, {siteConfig.location.country}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <PortfolioStats stats={portfolioStats} />

      <Section id="skills" eyebrow="Technologies" title="Tools I build with" description="The technologies I use to design, build, and ship web applications.">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {skills.map((group) => (
            <div key={group.group} className="rounded-md border border-border bg-surface p-5">
              <p className="text-label uppercase tracking-[0.12em] text-accent">{group.group}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <TechChip key={`${group.group}-${item}`} label={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="services" eyebrow="Services" title="How I can help" description="Web development work for businesses and individuals.">
        {services.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No active services are published"
            description="Please check back later or get in touch to discuss your project."
            action={{ label: "Contact me", href: "/contact" }}
          />
        )}
      </Section>

      <Section id="work" eyebrow="Work" title="Selected projects" description="Real projects, with a clear description of my role in each.">
        {featuredProjects.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article key={project.slug} className="rounded-md border border-border bg-surface p-6">
                <p className="text-label uppercase tracking-[0.12em] text-accent">Featured</p>
                <h3 className="mt-3 text-h3 font-semibold text-foreground">{project.title}</h3>
                {project.summary ? <p className="mt-3 text-muted-foreground">{project.summary}</p> : null}
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <TechChip key={`${project.slug}-${technology}`} label={technology} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No published projects yet"
            description="Selected case studies are intentionally withheld until the content is verified and approved."
            action={{ label: "Discuss your project", href: "/contact" }}
          />
        )}
      </Section>

      <Section id="about" eyebrow="About" title="A developer you work with directly" description="A straightforward, production-focused approach.">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 text-body-lg text-muted-foreground">
            <p>{about.introduction}</p>
            {about.background ? <p>{about.background}</p> : null}
            {about.workingStyle ? <p>{about.workingStyle}</p> : null}
          </div>
          <div className="rounded-md border border-border bg-surface p-6">
            <p className="text-label uppercase tracking-[0.12em] text-accent">Based in</p>
            <p className="mt-3 text-h3 font-semibold text-foreground">
              {siteConfig.location.locality}, {siteConfig.location.region}, {siteConfig.location.country}
            </p>
          </div>
        </div>
      </Section>

      {experience.length > 0 ? (
        <Section id="experience" eyebrow="Experience" title="Where I&apos;ve worked" description="Verified experience and project context only.">
          <div className="space-y-4">
            {experience.map((item) => (
              <article key={`${item.company}-${item.role}`} className="rounded-md border border-border bg-surface p-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-h3 font-semibold text-foreground">{item.role}</h3>
                    <p className="text-muted-foreground">{item.company}</p>
                  </div>
                  <p className="text-small text-muted-foreground">{item.period ?? "Ongoing"}</p>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {processSteps.length > 0 ? (
        <Section id="process" eyebrow="Process" title="How a project runs" description="A low-friction, collaborative process from brief to launch.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rounded-md border border-border bg-surface p-5">
                <p className="text-label uppercase tracking-[0.12em] text-accent">0{index + 1}</p>
                <h3 className="mt-3 text-h3 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-small text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {testimonials.length > 0 ? (
        <Section id="testimonials" eyebrow="Feedback" title="What clients say" description="Client feedback is only shown when genuine, permitted testimonials exist.">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((testimonial) => (
              <blockquote key={`${testimonial.author}-${testimonial.quote}`} className="rounded-md border border-border bg-surface p-6">
                <p className="text-body-lg text-foreground">“{testimonial.quote}”</p>
                <footer className="mt-5 text-small text-muted-foreground">
                  <span className="font-medium text-foreground">{testimonial.author}</span>
                  {testimonial.role ? ` · ${testimonial.role}` : ""}
                </footer>
              </blockquote>
            ))}
          </div>
        </Section>
      ) : null}

      <Section id="contact" eyebrow="Contact" title="Tell me about your project" description="Share a few details and I’ll get back to you.">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 rounded-md border border-border bg-surface p-6">
            <p className="text-body-lg text-muted-foreground">
              I help founders and businesses turn ideas into clear, reliable web experiences.
            </p>
            <div className="space-y-2">
              {socialLinks.length > 0 ? (
                socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url ?? "#"}
                    target={link.url?.startsWith("http") ? "_blank" : undefined}
                    rel={link.url?.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={`${link.label} (opens in a new tab)`}
                    className="block rounded-md border border-border bg-background px-4 py-3 text-foreground hover:border-accent"
                  >
                    {link.label}
                  </a>
                ))
              ) : (
                <p className="text-muted-foreground">No contact channels are configured yet.</p>
              )}
            </div>
          </div>

          <ContactForm
            services={activeServices}
            enabled={isContactSubmissionEnabled()}
          />
        </div>
      </Section>
    </main>
  );
}
