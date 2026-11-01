type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header className="mb-10 max-w-3xl">
      {eyebrow ? (
        <p className="mb-3 font-mono text-label uppercase tracking-wider text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="text-h2 font-semibold leading-tight tracking-tight text-balance"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
          {description}
        </p>
      ) : null}
    </header>
  );
}
