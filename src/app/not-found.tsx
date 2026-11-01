import type { Metadata } from "next";
import { ButtonLink } from "@/components/shared/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you’re looking for doesn’t exist or has moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" className="section-shell">
      <div className="container-shell py-16 text-center">
        <p className="font-mono text-label uppercase tracking-[0.2em] text-accent">404</p>
        <h1 className="mt-6 text-display font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-body-lg text-muted-foreground">
          The page you were looking for does not exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/projects" variant="secondary">Projects</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">Contact</ButtonLink>
        </div>
      </div>
    </main>
  );
}
