import { ButtonLink } from "@/components/shared/ButtonLink";
import { TechChip } from "@/components/shared/TechChip";
import type { Service } from "@/types/content";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="service-card flex h-full flex-col rounded-md border border-border bg-surface p-6">
      <p className="text-label uppercase tracking-[0.12em] text-accent">
        {service.category}
      </p>
      <h3 className="mt-3 text-h3 font-semibold text-foreground">
        {service.title}
      </h3>
      <p className="mt-3 text-muted-foreground">{service.summary}</p>
      <p className="mt-3 text-small text-muted-foreground">
        {service.description}
      </p>

      <div className="mt-5">
        <p className="text-small font-medium text-foreground">
          What this can include
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-small text-muted-foreground">
          {service.benefits.map((benefit) => (
            <li key={`${service.slug}-${benefit}`}>{benefit}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {service.technologies.map((technology) => (
          <TechChip key={`${service.slug}-${technology}`} label={technology} />
        ))}
      </div>

      <ButtonLink
        href={service.cta.href}
        variant="secondary"
        className="mt-6 w-full justify-center"
      >
        {service.cta.label}
      </ButtonLink>
    </article>
  );
}
