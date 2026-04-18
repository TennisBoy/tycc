import {
  ArrowRight,
  Bike,
  Flag,
  HeartHandshake,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Trees,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

const programHighlights = [
  {
    icon: Bike,
    title: "Skill-first coaching",
    description:
      "Build control, confidence, and group-ride instincts with sessions that make bike handling feel natural.",
  },
  {
    icon: Trees,
    title: "City-to-trail variety",
    description:
      "Mix park loops, neighbourhood connections, and destination rides so the season always feels active.",
  },
  {
    icon: Users,
    title: "Belonging on every ride",
    description:
      "Create a supportive youth team culture where riders learn from coaches and from each other.",
  },
] as const;

const rideRhythm = [
  {
    label: "Warm up",
    title: "Arrival, tune-up, and confidence check",
    description:
      "Start with bike checks, route notes, and small-group warmups so every rider feels ready before wheels turn.",
  },
  {
    label: "On-bike",
    title: "Focused skill blocks with real-world practice",
    description:
      "Blend drills, group communication, cornering, and pacing into sessions that translate directly to outdoor riding.",
  },
  {
    label: "Cool down",
    title: "Debrief, celebrate progress, and set the next target",
    description:
      "Finish with coaching notes, team encouragement, and a clear idea of what each rider is growing toward next.",
  },
] as const;

const clubValues = [
  {
    icon: ShieldCheck,
    title: "Safety is visible",
    description:
      "Good habits, route awareness, and predictable communication are part of every session, not a side topic.",
  },
  {
    icon: Flag,
    title: "Progress has structure",
    description:
      "Riders move from fundamentals to bigger goals through repeatable coaching, not guesswork.",
  },
  {
    icon: HeartHandshake,
    title: "Community matters",
    description:
      "TYCC is designed to help young cyclists make friends, trust teammates, and feel proud showing up.",
  },
  {
    icon: Sparkles,
    title: "Fun stays in the plan",
    description:
      "The atmosphere should feel energetic and ambitious without losing the joy that keeps riders coming back.",
  },
] as const;

const HomePage = () => {
  return (
    <main className="relative overflow-hidden pb-20" id="top">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_top_left,rgba(242,198,66,0.35),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(230,83,48,0.22),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.2),transparent_85%)]"
      />

      <section className="pt-6 sm:pt-10">
        <Container size="xl">
          <div className="rounded-[2rem] border border-white/60 bg-white/70 shadow-[0_30px_90px_-55px_rgba(18,60,99,0.65)] backdrop-blur-md">
            <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b px-5 py-4 sm:px-8">
              <div>
                <p className="text-primary text-xs font-semibold uppercase tracking-[0.3em]">
                  Toronto Youth Cycling Club
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  A first web presence for young riders, families, and future coaches.
                </p>
              </div>
              <nav className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm font-medium">
                <a className="transition-colors hover:text-foreground" href="#programs">
                  Programs
                </a>
                <a className="transition-colors hover:text-foreground" href="#rhythm">
                  Weekly rhythm
                </a>
                <a className="transition-colors hover:text-foreground" href="#join">
                  Join TYCC
                </a>
              </nav>
            </div>

            <div className="grid gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-12 lg:px-10 lg:py-14">
              <div>
                <Badge className="bg-accent text-accent-foreground border-0 px-3 py-1 text-[0.7rem] uppercase tracking-[0.24em]">
                  Youth cycling. Toronto energy. Real progression.
                </Badge>
                <h1 className="mt-6 max-w-3xl text-5xl leading-[0.94] font-semibold text-balance sm:text-6xl lg:text-7xl">
                  Build confidence on every ride.
                </h1>
                <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-8">
                  TYCC is a club concept built around coached skills sessions, memorable rides, and
                  a welcoming team culture for young cyclists who want to grow together.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild className="h-11 rounded-full px-6 text-sm">
                    <a href="#join">
                      Start the club story
                      <ArrowRight />
                    </a>
                  </Button>
                  <Button asChild className="h-11 rounded-full px-6 text-sm" variant="secondary">
                    <a href="#programs">Explore the riding experience</a>
                  </Button>
                </div>
              </div>

              <Card className="border-primary/10 overflow-hidden rounded-[1.75rem] bg-primary px-0 py-0 text-primary-foreground shadow-[0_26px_70px_-45px_rgba(18,60,99,0.85)]">
                <CardContent className="p-7 sm:p-8">
                  <div className="flex items-center gap-3 text-sm font-medium text-white/75">
                    <MapPinned className="size-4" />
                    Toronto-based rides and team-building sessions
                  </div>
                  <div className="mt-10 grid gap-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-white/55">The feel</p>
                      <p className="mt-2 text-2xl font-semibold">
                        A bright, outdoors-first club identity built for momentum.
                      </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-white/60">
                          For families
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/84">
                          Clear structure, visible safety habits, and a community that feels
                          encouraging from day one.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-white/60">
                          For riders
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/84">
                          Stronger bike skills, better teammates, and rides that feel like an
                          adventure instead of a drill.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-14 sm:pt-20" id="programs">
        <Container size="xl">
          <div className="flex max-w-3xl flex-col gap-4">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.28em]">
              What TYCC should deliver
            </p>
            <h2 className="text-4xl leading-tight font-semibold text-balance sm:text-5xl">
              A club experience that feels capable, social, and worth showing up for.
            </h2>
            <p className="text-muted-foreground max-w-2xl text-lg leading-8">
              The first version of the site should help visitors understand the club at a glance:
              coached riding, clear progression, and a youth community that keeps cycling fun.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {programHighlights.map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="rounded-[1.5rem] border-border/70 bg-white/80 shadow-[0_25px_60px_-50px_rgba(18,60,99,0.7)] backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="bg-secondary text-secondary-foreground flex size-12 items-center justify-center rounded-2xl">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold">{title}</h3>
                  <p className="text-muted-foreground mt-3 text-base leading-7">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-14 sm:pt-20" id="rhythm">
        <Container size="xl">
          <div className="grid gap-8 rounded-[2rem] border border-border/70 bg-white/75 px-5 py-8 shadow-[0_24px_70px_-50px_rgba(18,60,99,0.65)] backdrop-blur-md sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12 lg:px-10 lg:py-10">
            <div className="max-w-xl">
              <p className="text-primary text-sm font-semibold uppercase tracking-[0.28em]">
                Weekly rhythm
              </p>
              <h2 className="mt-4 text-4xl leading-tight font-semibold text-balance sm:text-5xl">
                Make each ride feel intentional from check-in to cooldown.
              </h2>
              <p className="text-muted-foreground mt-5 text-lg leading-8">
                Parents and riders should be able to picture the flow of a TYCC session without
                reading a wall of instructions. The structure needs to feel safe, active, and
                energetic.
              </p>
            </div>

            <div className="grid gap-4">
              {rideRhythm.map(({ label, title, description }) => (
                <div
                  key={label}
                  className="grid gap-4 rounded-[1.5rem] border border-border/70 bg-background/88 p-5 sm:grid-cols-[8rem_1fr]"
                >
                  <div>
                    <p className="text-primary text-xs font-semibold uppercase tracking-[0.28em]">
                      {label}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="text-muted-foreground mt-2 text-base leading-7">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-14 sm:pt-20">
        <Container size="xl">
          <div className="flex max-w-3xl flex-col gap-4">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.28em]">
              Club values
            </p>
            <h2 className="text-4xl leading-tight font-semibold text-balance sm:text-5xl">
              The site should communicate how TYCC rides, not just what TYCC does.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {clubValues.map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="rounded-[1.5rem] border-border/70 bg-card/85 shadow-[0_25px_60px_-52px_rgba(18,60,99,0.72)] backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-2xl">
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">{title}</h3>
                      <p className="text-muted-foreground mt-3 text-base leading-7">
                        {description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-14 sm:pt-20" id="join">
        <Container size="xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#123c63_0%,#1f5e90_55%,#2f78aa_100%)] px-6 py-10 text-primary-foreground shadow-[0_35px_80px_-55px_rgba(18,60,99,0.95)] sm:px-8 lg:px-10 lg:py-12">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(242,198,66,0.4),transparent_28%),radial-gradient(circle_at_70%_65%,rgba(255,255,255,0.18),transparent_35%)]"
            />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
                  Next step
                </p>
                <h2 className="mt-4 text-4xl leading-tight font-semibold text-balance sm:text-5xl">
                  Turn this first presence into a real launch path for families and riders.
                </h2>
                <p className="mt-5 text-lg leading-8 text-white/82">
                  The next product step after this homepage is to connect a real contact or
                  registration flow, then expand into schedules, program details, and season
                  updates.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button asChild className="h-11 rounded-full px-6 text-sm" variant="secondary">
                  <a href="#programs">Review the program story</a>
                </Button>
                <Button
                  asChild
                  className="h-11 rounded-full border-white/30 bg-white/12 px-6 text-sm text-white hover:bg-white/18"
                  variant="outline"
                >
                  <a href="#top">Back to top</a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default HomePage;
