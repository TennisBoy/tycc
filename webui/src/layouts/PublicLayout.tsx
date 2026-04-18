import { Link, NavLink, Outlet } from "react-router";
import { Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const PublicLayout = () => {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/88 backdrop-blur-md">
        <Container size="xl">
          <div className="flex min-h-18 items-center justify-between gap-4 py-3">
            <Link className="block" to="/">
              <p className="text-primary text-xs font-semibold uppercase tracking-[0.3em]">TYCC</p>
              <p className="text-sm text-muted-foreground">Toronto Youth Cycling Club</p>
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-5 text-sm font-medium lg:flex">
              <NavItem to="/about">About</NavItem>
              <NavItem to="/calendar">Calendar</NavItem>
              <NavItem to="/routes">Routes</NavItem>
              <a
                aria-label="Instagram"
                className="text-muted-foreground transition-colors hover:text-foreground"
                href="https://www.instagram.com/tycc.to/"
                rel="noreferrer"
                target="_blank"
                title="Instagram"
              >
                <Instagram className="size-4" />
              </a>
              <a
                aria-label="Discord"
                className="text-muted-foreground transition-colors hover:text-foreground"
                href="https://discord.gg/7ZRRF4VdvS"
                rel="noreferrer"
                target="_blank"
                title="Discord"
              >
                <MessageCircle className="size-4" />
              </a>
            </nav>

            <Button asChild className="rounded-full px-5">
              <Link to="/calendar">Check Calendar</Link>
            </Button>
          </div>
        </Container>
      </header>
      <Outlet />
      <footer className="border-t border-border/80 bg-background/94 py-8">
        <Container className="flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between" size="xl">
          <p>Toronto Youth Cycling Club</p>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:torontoyouthcyclingclub@gmail.com">torontoyouthcyclingclub@gmail.com</a>
            <a
              aria-label="Instagram"
              href="https://www.instagram.com/tycc.to/"
              rel="noreferrer"
              target="_blank"
              title="Instagram"
            >
              <Instagram className="size-4" />
            </a>
            <a
              aria-label="Discord"
              href="https://discord.gg/7ZRRF4VdvS"
              rel="noreferrer"
              target="_blank"
              title="Discord"
            >
              <MessageCircle className="size-4" />
            </a>
          </div>
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
