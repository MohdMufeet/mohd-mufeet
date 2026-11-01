import type { Metadata } from "next";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/Container";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Reveal } from "@/components/shared/Reveal";
import { Section } from "@/components/shared/Section";
import { StatusMessage } from "@/components/shared/StatusMessage";
import { TechChip } from "@/components/shared/TechChip";

export const metadata: Metadata = {
  title: "Design system preview",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignPreviewPage() {
  return (
    <main id="main">
      <Container className="pt-8">
        <h1 className="text-h1 font-semibold tracking-tight">
          Design system preview
        </h1>
      </Container>
      <Section
        id="design-system"
        eyebrow="Internal preview"
        title="Design system"
        description="A temporary view of the proposed palette, type scale, spacing, and shared UI components."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Background", "bg-background"],
            ["Surface", "bg-surface"],
            ["Raised surface", "bg-surface-raised"],
            ["Accent", "bg-accent text-accent-foreground"],
          ].map(([label, classes]) => (
            <div
              key={label}
              className={`rounded-md border border-border p-4 ${classes}`}
            >
              <span className="text-small font-medium">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="type-and-controls"
        eyebrow="Type and controls"
        title="Clear hierarchy, restrained emphasis"
        description="Typography carries the hierarchy, while accent color is reserved for emphasis and focus."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#states">Primary action</ButtonLink>
          <ButtonLink href="#states" variant="secondary">
            Secondary action
          </ButtonLink>
          <ButtonLink href="#states" variant="ghost">
            Quiet action
          </ButtonLink>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <TechChip>Next.js</TechChip>
          <TechChip>TypeScript</TechChip>
          <TechChip>Supabase</TechChip>
        </div>
      </Section>

      <Section
        id="states"
        eyebrow="Feedback"
        title="Status and empty states"
        description="Messages use text and semantic roles as well as color."
      >
        <div className="grid gap-4">
          <StatusMessage type="success">
            Your changes have been saved.
          </StatusMessage>
          <StatusMessage type="error">
            The preview could not be loaded.
          </StatusMessage>
          <EmptyState
            title="Nothing to show yet"
            description="When verified content is available, it will appear here."
            action={{ label: "Contact", href: "/contact" }}
          />
          <ErrorState description="This is an example of a recoverable error state." />
        </div>
      </Section>

      <Section
        id="motion"
        eyebrow="Motion"
        title="Subtle by default"
        description="This sample reveals once and respects reduced-motion preferences."
      >
        <Reveal>
          <Container
            as="div"
            size="narrow"
            className="rounded-md border border-border bg-surface p-6"
          >
            <p className="text-muted-foreground">
              Reveal animation uses opacity and a short vertical translation.
            </p>
          </Container>
        </Reveal>
      </Section>
    </main>
  );
}
