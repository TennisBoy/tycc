import { Link } from "react-router";
import { Compass, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { routeHighlights } from "@/shared/tycc/content";

const RoutesPage = () => {
  return (
    <main className="pb-20 pt-10 sm:pt-14">
      <Container size="xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.28em]">
              Routes
            </p>
            <h1 className="mt-3 text-6xl font-bold sm:text-7xl">Routes are being finalized.</h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              TYCC already has routes in mind, but route names, meeting points, and published ride
              details are still to be confirmed.
            </p>
          </div>

          <Button asChild className="rounded-full px-5" variant="outline">
            <Link to="/">Back Home</Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {routeHighlights.map((route) => (
            <Card className="rounded-[1.5rem] border-border/80 bg-card/90" key={route.title}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-primary">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary">
                    <Compass className="size-5" />
                  </div>
                  <MapPinned className="size-5" />
                </div>
                <h2 className="mt-5 text-3xl font-bold">{route.title}</h2>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  {route.area} · {route.distance}
                </p>
                <p className="mt-3 text-base leading-7 text-muted-foreground">{route.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
};

export default RoutesPage;
