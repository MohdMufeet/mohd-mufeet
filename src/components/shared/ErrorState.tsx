type ErrorStateProps = {
  title?: string;
  description: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Something went wrong",
  description,
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="rounded-md border border-destructive bg-surface p-6 sm:p-8"
      role="alert"
    >
      <h2 className="text-h3 font-semibold">{title}</h2>
      <p className="mt-3 text-muted-foreground">{description}</p>
      {onRetry ? (
        <button
          className="button-link button-link--secondary mt-6"
          onClick={onRetry}
          type="button"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
