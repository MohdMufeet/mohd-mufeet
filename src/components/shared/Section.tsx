import type { ReactNode } from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`section-shell ${className ?? ""}`}
    >
      <Container>
        <SectionHeading
          id={`${id}-heading`}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        {children}
      </Container>
    </section>
  );
}
