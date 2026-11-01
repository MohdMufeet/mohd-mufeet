"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { navigation } from "@/config/navigation";
import { getVisibleSocialLinks } from "@/lib/content";

const sectionMap: Record<string, string> = {
  "/projects": "#work",
  "/services": "#services",
  "/about": "#about",
  "/contact": "#contact",
};

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#home");

  const socialLinks = useMemo(
    () => getVisibleSocialLinks("mobile-menu"),
    [],
  );

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.1, 0.5, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const currentPage = pathname || "/";
  const isHome = currentPage === "/";

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm transition-colors",
        isScrolled ? "shadow-sm" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="container-shell flex h-20 items-center gap-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
          Mohd Mufeet
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden flex-1 items-center justify-center gap-8 lg:flex"
        >
          {navigation.map((item) => {
            const href = isHome ? sectionMap[item.href] ?? item.href : item.href;
            const isActive = isHome
              ? activeSection === (sectionMap[item.href] ?? item.href)
              : currentPage === item.href;

            return (
              <Link
                key={item.href}
                href={href}
                className={[
                  "text-small font-medium transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <div className="hidden lg:block">
            <ButtonLink href="/contact">Let&apos;s Work Together</ButtonLink>
          </div>
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface text-foreground lg:hidden"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="sr-only">Toggle menu</span>
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-shell flex flex-col gap-3 py-4">
            {navigation.map((item) => {
              const href = isHome ? sectionMap[item.href] ?? item.href : item.href;
              const isActive = isHome
                ? activeSection === (sectionMap[item.href] ?? item.href)
                : currentPage === item.href;

              return (
                <Link
                  key={item.href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={[
                    "rounded-md px-3 py-3 text-base font-medium",
                    isActive ? "bg-surface text-foreground" : "text-muted-foreground",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}

            <ButtonLink href="/contact" className="mt-2 w-full justify-center">
              Let&apos;s Work Together
            </ButtonLink>

            {socialLinks.length > 0 ? (
              <div className="mt-2 flex items-center gap-3 border-t border-border pt-4 text-muted-foreground">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url ?? "#"}
                    target={link.url?.startsWith("http") ? "_blank" : undefined}
                    rel={link.url?.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-small font-medium hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
