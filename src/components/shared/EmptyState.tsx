import { ButtonLink } from "@/components/shared/ButtonLink";

type EmptyStateProps = {
  title: string;
  description: string;
  action: {
    label: string;
    href: string;
  };
};

export function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-md border border-border bg-surface p-6 sm:p-8">
      <h3 className="text-h3 font-semibold">{title}</h3>
      <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      <ButtonLink href={action.href} variant="secondary" className="mt-6">
        {action.label}
      </ButtonLink>
    </div>
  );
}
