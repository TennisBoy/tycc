import { Link } from "react-router";
import { ArrowRight, Compass, Instagram, Mail, MapPinned, MessageCircle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import MonthCalendar from "@/shared/tycc/components/MonthCalendar";
import {
  connectLinks,
  execs,
  rideEvents,
  site,
  stats,
  story,
} from "@/shared/tycc/content";
import { getNextRide } from "@/shared/tycc/rides";

const connectIcons = [Instagram, MessageCircle, Compass, Mail] as const;

const HomePage = () => {
  // Only surface the soonest upcoming ride; past rides drop off the homepage
  // but stay in the calendar below.
  const nextRide = getNextRide(rideEvents);

  return (
    <main className="overflow-x-hidden pb-20">
      {/* HERO — left-aligned text on a road-ride photo */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <img
            alt=""
            className="size-full object-cover object-center"
            decoding="async"
            fetchPriority="high"
            height={1200}
            src="/images/hero.webp"
            width={1600}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#11201c]/85 via-[#11201c]/55 to-[#11201c]/15" />
        </div>
        <Container size="xl">
          <div className="flex min-h-[40rem] max-w-2xl flex-col justify-center py-24 text-white sm:min-h-[46rem]">
            <h1 className="text-5xl font-bold leading-[0.95] sm:text-7xl lg:text-8xl">
              Ride <span className="text-accent">with us.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/90 sm:text-xl">
              Creating an open and inclusive community for youth cyclists in the GTA.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-12 rounded-full bg-accent px-6 text-base text-accent-foreground hover:bg-accent/90"
              >
                <Link to="/calendar">
                  Check the calendar
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                className="h-12 rounded-full border-white/70 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
                variant="outline"
              >
                <a href={site.discord} rel="noreferrer" target="_blank">
                  Join our Discord
                </a>
              </Button>
            </div>
            {nextRide ? (
              <Link
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm text-accent-foreground shadow-lg transition-transform hover:-translate-y-0.5"
                to="/calendar"
              >
                <span className="font-semibold text-accent-foreground">◆ Next ride</span>
                <span className="text-accent-foreground/80">
                  {formatRideDate(nextRide.date)} · {nextRide.time} · {nextRide.title}
                </span>
              </Link>
            ) : null}
          </div>
        </Container>
      </section>

      {/* NEXT RIDE */}
      {nextRide ? (
        <section className="pt-14 sm:pt-20">
          <Container size="xl">
            <SectionLabel>Next ride</SectionLabel>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">Our next ride is on the calendar.</h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <Card className="rounded-[1.5rem] border-border bg-card">
                <CardContent className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    {formatRideDate(nextRide.date)} · {nextRide.time}
                  </p>
                  <h3 className="mt-2 text-3xl font-bold">{nextRide.title}</h3>
                  <p className="mt-2 text-base text-muted-foreground">{nextRide.meetup}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge>{nextRide.rideType}</Badge>
                    <Badge variant="secondary">{nextRide.difficulty}</Badge>
                    <Badge variant="secondary">{nextRide.distance}</Badge>
                  </div>
                  <p className="mt-5 text-base leading-7 text-muted-foreground">{nextRide.preview}</p>
                  <Button asChild className="mt-6 rounded-full">
                    <Link to="/calendar">
                      See ride details
                      <ArrowRight />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <div className="rounded-[1.5rem] border border-border bg-secondary/40 p-6">
                <MessageCircle className="size-7 text-primary" />
                <p className="mt-4 text-xl font-bold">New rides drop first in our Discord.</p>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  That&apos;s where the club plans every ride. The calendar fills in as dates get
                  confirmed — so follow along and you&apos;ll never miss one.
                </p>
                <Button
                  asChild
                  className="mt-5 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <a href={site.discord} rel="noreferrer" target="_blank">
                    Join the Discord
                  </a>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* WHO WE ARE */}
      <section className="pt-14 sm:pt-20">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-xl">
              <SectionLabel>Who we are</SectionLabel>
              <h2 className="mt-3 text-4xl font-bold sm:text-5xl">A youth-run cycling club, built in Toronto.</h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{story[0]}</p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">{story[2]}</p>
              <Button asChild className="mt-6 rounded-full" variant="outline">
                <Link to="/about">
                  Read our full story
                  <ArrowRight />
                </Link>
              </Button>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-border">
              <img
                alt="TYCC riders out on a group ride"
                className="h-full min-h-[20rem] w-full object-cover"
                decoding="async"
                loading="lazy"
                src="/images/about-us.webp"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* BY THE NUMBERS */}
      <section className="pt-14 sm:pt-20">
        <Container size="xl">
          <SectionLabel>By the numbers</SectionLabel>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">A community that&apos;s already moving.</h2>
          <div className="mt-8 rounded-[2rem] border border-border bg-secondary/40 p-6 sm:p-10">
            <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-6xl font-bold tracking-tight text-accent sm:text-7xl">{stat.value}</p>
                  <p className="mt-3 text-base font-medium text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* HOW WE RIDE — road-forward */}
      <section className="pt-14 sm:pt-20">
        <Container size="xl">
          <div className="grid gap-6 rounded-[2rem] border border-border bg-secondary/30 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="max-w-md">
              <SectionLabel>How we ride</SectionLabel>
              <h2 className="mt-3 text-4xl font-bold sm:text-5xl">Mostly road. Always together.</h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                We ride across Toronto and the GTA — mostly road rides through the city and the Don
                Valley, with the occasional longer adventure.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              <RideFeature icon={Compass} title="Group road rides" text="City and Don Valley loops at a friendly pace." />
              <RideFeature icon={Sparkles} title="All levels welcome" text="New riders and returning riders, side by side." />
              <RideFeature icon={MapPinned} title="Longer adventures" text="Routes beyond the city when the season calls for it." />
            </div>
          </div>
        </Container>
      </section>

      {/* CALENDAR (kept) */}
      <Container size="xl">
        <MonthCalendar events={rideEvents} />
      </Container>

      {/* MEET THE TEAM teaser */}
      <section className="pt-14 sm:pt-20">
        <Container size="xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <SectionLabel>Meet the team</SectionLabel>
              <h2 className="mt-3 text-4xl font-bold sm:text-5xl">The riders behind TYCC.</h2>
            </div>
            <Button asChild className="rounded-full" variant="outline">
              <Link to="/about">
                Meet everyone
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {execs.map((exec) => (
              <Link
                className="group overflow-hidden rounded-[1.5rem] border border-border bg-card transition-transform hover:-translate-y-1"
                key={exec.id}
                to="/about"
              >
                {exec.photo ? (
                  <img
                    alt={exec.name}
                    className="h-56 w-full object-cover object-top"
                    decoding="async"
                    loading="lazy"
                    src={exec.photo}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="grid h-56 w-full place-items-center bg-secondary text-6xl font-bold text-secondary-foreground"
                  >
                    {exec.name.charAt(0)}
                  </div>
                )}
                <div className="p-4">
                  <p className="text-lg font-bold">{exec.name}</p>
                  <p className="text-sm text-muted-foreground">{exec.role}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CONNECT */}
      <section className="pt-14 sm:pt-20" id="connect">
        <Container size="xl">
          <SectionLabel>Connect</SectionLabel>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">Ride with us — pick a channel.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {connectLinks.map((link, index) => {
              const Icon = connectIcons[index] ?? Compass;
              const isDiscord = link.title === "Discord";
              return (
                <a
                  className="rounded-[1.5rem] border border-border bg-card p-6 transition-transform hover:-translate-y-1"
                  href={link.href}
                  key={link.title}
                  rel="noreferrer"
                  target="_blank"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                    {isDiscord ? (
                      <img alt="" className="size-6" src="/discord.png" />
                    ) : (
                      <Icon className="size-5" />
                    )}
                  </div>
                  <h3 className="mt-5 text-2xl font-bold">{link.title}</h3>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">{link.description}</p>
                </a>
              );
            })}
          </div>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] border border-border bg-card p-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Direct contact</p>
              <p className="mt-2 text-2xl font-bold">{site.email}</p>
            </div>
            <Button asChild className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
              <a href={`mailto:${site.email}`}>
                <Mail />
                Email TYCC
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
};

const SectionLabel = ({ children }: { children: string }) => (
  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">{children}</p>
);

const RideFeature = ({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) => (
  <div className="rounded-[1.5rem] border border-border bg-card p-7">
    <div className="flex size-14 items-center justify-center rounded-2xl bg-accent/15 text-accent-foreground">
      <Icon className="size-7" />
    </div>
    <h3 className="mt-5 text-xl font-bold">{title}</h3>
    <p className="mt-3 text-base leading-7 text-muted-foreground">{text}</p>
  </div>
);

const formatRideDate = (date: string) =>
  new Intl.DateTimeFormat("en-CA", { weekday: "short", month: "short", day: "numeric" }).format(
    new Date(`${date}T12:00:00`),
  );

export default HomePage;
