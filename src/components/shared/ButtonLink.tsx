import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkBaseProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

type ButtonLinkProps = ButtonLinkBaseProps &
  (
    | { external: true; accessibleName: string }
    | { external?: false; accessibleName?: never }
  );

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  accessibleName,
  className,
}: ButtonLinkProps) {
  const linkClassName = [
    "button-link",
    `button-link--${variant}`,
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if (external === true) {
    return (
      <a
        href={href}
        className={linkClassName}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${accessibleName} (opens in a new tab)`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClassName}>
      {children}
    </Link>
  );
}
