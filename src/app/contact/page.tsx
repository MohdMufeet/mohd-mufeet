import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Section } from "@/components/shared/Section";
import { isContactSubmissionEnabled } from "@/lib/contact/config";
import { getServices, getVisibleSocialLinks } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  path: "/contact",
  title: "Contact",
  description:
    "Tell Mohd Mufeet about your project and get in touch about freelance web development.",
});

type ContactPageProps = {
  searchParams: Promise<{ service?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { service } = await searchParams;
  const socialLinks = getVisibleSocialLinks("contact");
  const services = getServices("active");

  return (
    <main id="main" className="section-shell">
      <Section id="contact" eyebrow="Contact" title="Tell me about your project" description="Share a few details and I’ll get back to you.">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 rounded-md border border-border bg-surface p-6">
            <p className="text-body-lg text-muted-foreground">
              Share what you want to build and the problem you want it to solve.
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
                    className="flex items-center justify-between rounded-md border border-border bg-background px-4 py-3 text-foreground hover:border-accent"
                  >
                    <span>{link.label}</span>
                    <span className="text-muted-foreground">{link.handle ?? "Connect"}</span>
                  </a>
                ))
              ) : (
                <p className="text-muted-foreground">No contact channels are configured yet.</p>
              )}
            </div>
          </div>

          <ContactForm
            services={services}
            initialService={service}
            enabled={isContactSubmissionEnabled()}
          />
        </div>
      </Section>
    </main>
  );
}
