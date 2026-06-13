import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { Instagram, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/shared/tycc/content";
import { getRouteMeta } from "@/shared/seo/routeMeta";
import { useSeo } from "@/shared/seo/useSeo";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/about", label: "About" },
  { to: "/calendar", label: "Calendar" },
  { to: "/routes", label: "Routes" },
  { to: "/gallery", label: "Gallery" },
] as const;

const PublicLayout = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useSeo(getRouteMeta(pathname));

  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg"
        href="#main-content"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <Container size="xl">
          <div className="flex min-h-18 items-center justify-between gap-4 py-3">
            <Link aria-label="TYCC home" className="flex items-center gap-3" to="/" onClick={() => setOpen(false)}>
              <img alt="" className="h-9 w-auto" src="/logo.png" />
              <span className="leading-tight">
                <span className="block text-foreground text-xs font-bold uppercase tracking-[0.22em]">TYCC</span>
                <span className="block text-[0.7rem] text-muted-foreground">Toronto Youth Cycling Club</span>
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-6 text-sm font-medium lg:flex">
              {NAV.map((item) => (
                <NavItem key={item.to} to={item.to}>
                  {item.label}
                </NavItem>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                aria-label="TYCC on Instagram"
                asChild
                className="hidden rounded-full bg-accent text-accent-foreground hover:bg-accent/90 sm:inline-flex"
                size="icon"
              >
                <a href={site.instagram} rel="noreferrer" target="_blank" title="Follow us on Instagram">
                  <Instagram />
                </a>
              </Button>
              <Button
                aria-label="Join our Discord"
                asChild
                className="hidden rounded-full bg-accent hover:bg-accent/90 sm:inline-flex"
                size="icon"
              >
                <a href={site.discord} rel="noreferrer" target="_blank" title="Join our Discord">
                  <img alt="" className="size-5" src="/discord.png" />
                </a>
              </Button>
              <Button
                aria-expanded={open}
                aria-label="Toggle menu"
                className="rounded-full lg:hidden"
                onClick={() => setOpen((value) => !value)}
                size="icon"
                variant="outline"
              >
                {open ? <X /> : <Menu />}
              </Button>
            </div>
          </div>

          {open ? (
            <nav aria-label="Mobile" className="flex flex-col gap-1 pb-4 lg:hidden">
              {NAV.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "rounded-xl px-3 py-2.5 text-base font-medium transition-colors",
                      isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-muted",
                    )
                  }
                  key={item.to}
                  onClick={() => setOpen(false)}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
              <a
                className="mt-1 flex items-center gap-2 rounded-xl bg-accent px-3 py-2.5 text-base font-semibold text-accent-foreground"
                href={site.discord}
                onClick={() => setOpen(false)}
                rel="noreferrer"
                target="_blank"
              >
                <img alt="" className="size-5" src="/discord.png" />
                Connect on Discord
              </a>
              <a
                className="flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-base font-medium text-foreground"
                href={site.instagram}
                onClick={() => setOpen(false)}
                rel="noreferrer"
                target="_blank"
              >
                <Instagram className="size-5" />
                Follow on Instagram
              </a>
            </nav>
          ) : null}
        </Container>
      </header>

      <div className="outline-none" id="main-content" tabIndex={-1}>
        <Outlet />
      </div>

      <footer className="border-t border-border/70 bg-background py-8">
        <Container size="xl">
          <div className="flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p className="text-primary/90">Toronto Youth Cycling Club</p>
            <div className="flex flex-wrap items-center gap-4">
              <a className="hover:text-foreground" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <a className="inline-flex items-center gap-1.5 hover:text-foreground" href={`tel:${site.phoneHref}`}>
                <Phone className="size-4" />
                {site.phone}
              </a>
              <a
                aria-label="Instagram"
                className="hover:text-foreground"
                href={site.instagram}
                rel="noreferrer"
                target="_blank"
                title="Instagram"
              >
                <Instagram className="size-4" />
              </a>
              <a
                aria-label="Discord"
                className="opacity-90 transition-opacity hover:opacity-100"
                href={site.discord}
                rel="noreferrer"
                target="_blank"
                title="Discord"
              >
                <img alt="" className="size-4" src="/discord.png" />
              </a>
            </div>
          </div>
          <p className="mt-6 border-t border-border/60 pt-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Toronto Youth Cycling Club. All rights reserved.
          </p>
        </Container>
      </footer>
    </>
  );
};

const NavItem = ({ to, children }: { to: string; children: string }) => (
  <NavLink
    className={({ isActive }) =>
      isActive
        ? "text-foreground"
        : "text-muted-foreground transition-colors hover:text-foreground"
    }
    to={to}
  >
    {children}
  </NavLink>
);

export default PublicLayout;
