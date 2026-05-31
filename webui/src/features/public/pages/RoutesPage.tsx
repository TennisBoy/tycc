import { useRef, useState } from "react";
import { ExternalLink, MapPinned } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { routeList } from "@/shared/tycc/content";
import { cn } from "@/lib/utils";

const RoutesPage = () => {
  const [activeId, setActiveId] = useState(routeList[0]?.id ?? "");
  const active = routeList.find((route) => route.id === activeId) ?? routeList[0];
  const mapRef = useRef<HTMLDivElement>(null);

  const selectRoute = (id: string) => {
    setActiveId(id);
    // Bring the map into view when a card is tapped (matters on mobile, where
    // the map sits above the cards).
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <main className="pb-20 pt-10 sm:pt-14">
      <Container size="xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Routes</p>
          <h1 className="mt-3 text-5xl font-bold sm:text-7xl">Where we ride.</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Explore the routes TYCC rides across Toronto and the GTA. Tap a route below to load it on
            the map, then open it in Google Maps to follow the turn-by-turn and ride it yourself.
          </p>
        </div>

        {/* Map — driven by the selected route card */}
        {active ? (
          <div
            className="mt-10 overflow-hidden rounded-[1.75rem] border border-border bg-card"
            ref={mapRef}
          >
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
              <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                <MapPinned className="size-4" />
                {active.title}
              </p>
              <a
                className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                href={active.mapsUrl}
                rel="noreferrer"
                target="_blank"
              >
                Open in Google Maps
                <ExternalLink className="size-4" />
              </a>
            </div>
            <iframe
              allowFullScreen
              className="h-[24rem] w-full sm:h-[30rem]"
              key={active.id}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={active.embedUrl}
              title={`Map of ${active.title}`}
            />
          </div>
        ) : null}

        {/* Route cards — click to change the map above */}
        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Route details</p>
              <h2 className="mt-3 text-4xl font-bold sm:text-5xl">Pick a route to see it on the map.</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {routeList.map((route) => {
              const isActive = route.id === active?.id;
              return (
                <Card
                  aria-pressed={isActive}
                  className={cn(
                    "cursor-pointer rounded-[1.5rem] border-border bg-card transition-colors hover:border-accent/60",
                    isActive && "border-accent ring-1 ring-accent",
                  )}
                  key={route.id}
                  onClick={() => selectRoute(route.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      selectRoute(route.id);
                    }
                  }}
                >
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="secondary">{route.type}</Badge>
                      <span
                        className={cn(
                          "text-xs font-semibold uppercase tracking-[0.14em]",
                          isActive ? "text-accent-foreground" : "text-muted-foreground",
                        )}
                      >
                        {isActive ? "Showing on map" : "View on map"}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold">{route.title}</h3>
                    <p className="mt-3 flex-1 text-base leading-7 text-muted-foreground">{route.summary}</p>
                    <a
                      className="mt-5 inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary hover:underline"
                      href={route.mapsUrl}
                      onClick={(event) => event.stopPropagation()}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Open in Google Maps
                      <ExternalLink className="size-4" />
                    </a>
                  </CardContent>
                </Card>
              );
            })}

            <Card className="rounded-[1.5rem] border-dashed border-border bg-card/60">
              <CardContent className="flex h-full min-h-40 flex-col items-center justify-center p-6 text-center">
                <div className="text-3xl text-muted-foreground">＋</div>
                <p className="mt-2 text-base font-medium text-muted-foreground">
                  More routes added as we ride them.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </Container>
    </main>
  );
};

export default RoutesPage;
