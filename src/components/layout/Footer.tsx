import Link from "next/link";
import { navigation } from "@/config/navigation";
import { getVisibleSocialLinks, getSiteConfig } from "@/lib/content";

export function Footer() {
  const siteConfig = getSiteConfig();
  const socialLinks = getVisibleSocialLinks("footer");

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-shell py-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
              Mohd Mufeet
            </Link>
            <p className="mt-4 max-w-md text-small text-muted-foreground">
              Freelance Full Stack Developer based in Kanpur, India.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="space-y-2">
            {navigation.map((item) => (
              <div key={item.href}>
                <Link href={item.href} className="text-small text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="space-y-2">
            {socialLinks.length > 0 ? (
              socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url ?? "#"}
                  target={link.url?.startsWith("http") ? "_blank" : undefined}
                  rel={link.url?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block text-small text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </a>
              ))
            ) : (
              <p className="text-small text-muted-foreground">Social links pending approval.</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-small text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
          <a href="#top" className="hover:text-foreground">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
