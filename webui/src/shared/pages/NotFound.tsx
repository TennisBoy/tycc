import { Link } from "react-router";
import { ArrowRight, Compass } from "lucide-react";

const NotFound = () => {
  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
      <div className="bg-accent/15 text-accent-foreground flex size-14 items-center justify-center rounded-2xl">
        <Compass className="size-7" />
      </div>
      <p className="text-primary mt-6 text-sm font-semibold uppercase tracking-[0.24em]">
        Off the route
      </p>
      <h1 className="mt-3 text-7xl font-bold leading-none sm:text-8xl">
        4<span className="text-accent">0</span>4
      </h1>
      <h2 className="mt-5 text-3xl font-bold sm:text-4xl">This trail doesn&apos;t exist.</h2>
      <p className="text-muted-foreground mt-4 max-w-md text-lg leading-8">
        Looks like you&apos;ve ridden off the map. Let&apos;s get you back on a route.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="bg-accent text-accent-foreground hover:bg-accent/90 inline-flex h-12 items-center gap-2 rounded-full px-6 text-base font-medium transition-colors"
        >
          Back home
          <ArrowRight className="size-4" />
        </Link>
        <Link
          to="/routes"
          className="border-border text-foreground hover:bg-muted inline-flex h-12 items-center rounded-full border bg-white px-6 text-base font-medium transition-colors"
        >
          Browse routes
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
