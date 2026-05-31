import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { execs, mission, story, vision } from "@/shared/tycc/content";
import type { Exec } from "@/shared/tycc/types";

const AboutPage = () => {
  const [active, setActive] = useState<Exec | null>(null);

  return (
    <main className="pb-20 pt-10 sm:pt-14">
      <Container size="xl">
        <div className="max-w-3xl">
          <Badge className="rounded-full border-0 bg-accent px-4 py-1.5 text-[0.72rem] uppercase tracking-[0.24em] text-accent-foreground">
            About TYCC
          </Badge>
          <h1 className="mt-6 text-5xl font-bold sm:text-7xl">Built by young riders in the GTA.</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground sm:text-xl">
            Toronto Youth Cycling Club is a youth-run club creating an open and inclusive cycling
            community for riders across Toronto and the GTA.
          </p>
        </div>

        {/* STORY */}
        <section className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Our story</p>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {story.map((paragraph, index) => (
              <p className="text-lg leading-8 text-muted-foreground" key={index}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="mt-12 grid gap-5 md:grid-cols-2">
          <Card className="rounded-[1.5rem] border-border bg-card">
            <CardContent className="p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Mission</p>
              <p className="mt-4 text-2xl font-bold leading-snug">{mission}</p>
            </CardContent>
          </Card>
          <Card className="rounded-[1.5rem] border-border bg-secondary/40">
            <CardContent className="p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Vision</p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">{vision}</p>
            </CardContent>
          </Card>
        </section>

        {/* TEAM — 2 per row, click to expand */}
        <section className="mt-14">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Meet the team</p>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">The riders behind TYCC.</h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Tap anyone to read their story.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {execs.map((exec) => {
              const expandable = Boolean(exec.bio);
              const inner = (
                <>
                  {exec.photo ? (
                    <img
                      alt={exec.name}
                      className="size-28 shrink-0 rounded-[1.25rem] object-cover object-top sm:size-32"
                      src={exec.photo}
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="grid size-28 shrink-0 place-items-center rounded-[1.25rem] bg-secondary text-4xl font-bold text-secondary-foreground sm:size-32"
                    >
                      {exec.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-2xl font-bold">{exec.name}</p>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                      {exec.role}
                    </p>
                    {exec.school ? (
                      <p className="mt-1 text-sm text-muted-foreground">{exec.school}</p>
                    ) : null}
                    {expandable ? (
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-foreground/80 group-hover:text-foreground">
                        Read bio
                        <ArrowRight className="size-4" />
                      </span>
                    ) : (
                      <span className="mt-3 inline-block text-sm text-muted-foreground">
                        Bio coming soon
                      </span>
                    )}
                  </div>
                </>
              );

              return expandable ? (
                <button
                  className="group flex items-center gap-5 rounded-[1.5rem] border border-border bg-card p-4 text-left transition-transform hover:-translate-y-1"
                  key={exec.id}
                  onClick={() => setActive(exec)}
                  type="button"
                >
                  {inner}
                </button>
              ) : (
                <div
                  className="flex items-center gap-5 rounded-[1.5rem] border border-border bg-card p-4"
                  key={exec.id}
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14 flex flex-col items-start gap-4 rounded-[1.75rem] border border-border bg-secondary/30 p-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Come ride</p>
            <p className="mt-2 text-2xl font-bold">See what&apos;s next on the calendar.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/calendar">
                Go to Calendar
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild className="rounded-full" variant="outline">
              <Link to="/routes">See our routes</Link>
            </Button>
          </div>
        </section>
      </Container>

      <Dialog onOpenChange={(open) => !open && setActive(null)} open={active !== null}>
        <DialogContent className="max-w-lg">
          {active ? (
            <>
              <div className="flex items-center gap-4">
                {active.photo ? (
                  <img
                    alt={active.name}
                    className="size-20 rounded-2xl object-cover object-top"
                    src={active.photo}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="grid size-20 place-items-center rounded-2xl bg-secondary text-2xl font-bold text-secondary-foreground"
                  >
                    {active.name.charAt(0)}
                  </div>
                )}
                <DialogHeader className="space-y-1 text-left">
                  <DialogTitle className="text-2xl">{active.name}</DialogTitle>
                  <DialogDescription className="font-semibold uppercase tracking-[0.16em] text-primary">
                    {active.role}
                    {active.school ? ` · ${active.school}` : ""}
                  </DialogDescription>
                </DialogHeader>
              </div>
              <p className="mt-2 text-base leading-7 text-muted-foreground">{active.bio}</p>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default AboutPage;
