import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Award, CalendarDays, Compass, ExternalLink, Instagram, Mail, MessageCircle, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MonthCalendar from "@/shared/tycc/components/MonthCalendar";
import {
  achievements,
  connectLinks,
  quickActions,
  rideEvents,
  routeHighlights,
} from "@/shared/tycc/content";

const actionIcons = [CalendarDays, Compass, Compass, MessageCircle] as const;
const connectIcons = [Instagram, MessageCircle, Mail, ExternalLink] as const;

const HomePage = () => {
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="overflow-x-hidden pb-20" id="top">
      <section className="relative pt-8 sm:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(circle_at_top_left,rgba(242,169,59,0.18),transparent_22%),radial-gradient(circle_at_80%_18%,rgba(30,107,82,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.72),transparent_90%)]"
        />
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="max-w-3xl">
              <Badge className="rounded-full border-0 bg-accent px-4 py-1.5 text-[0.72rem] uppercase tracking-[0.28em]">
                Youth cycling in the GTA
              </Badge>
              <h1 className="mt-6 text-6xl font-bold sm:text-7xl lg:text-8xl">
                Ride Toronto Together.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                TYCC is building an open and inclusive youth cycling community for the GTA through
                accessible rides, practical coaching, and partnerships that help more riders show
                up with confidence.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="h-12 rounded-full px-6 text-sm sm:text-base">
                  <Link to="/calendar">
                    Check Calendar
                    <ArrowRight />
                  </Link>
                </Button>
                <Button asChild className="h-12 rounded-full px-6 text-sm sm:text-base" variant="outline">
                  <Link to="/about">About TYCC</Link>
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card shadow-[0_30px_80px_-55px_rgba(20,33,38,0.4)]">
              <img
                alt="Young cyclists riding together through Toronto."
                className="h-full min-h-[24rem] w-full object-cover"
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#13231f]/88 via-[#13231f]/55 to-transparent p-6 text-white sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                  First impression
                </p>
                <p className="mt-3 max-w-md text-2xl font-bold">
                  Practical enough for parents. Energized enough for young riders.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action, index) => {
              const Icon = actionIcons[index];
              const content = (
                <>
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h2 className="mt-5 text-3xl font-bold">{action.title}</h2>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">
                    {action.description}
                  </p>
                </>
              );

              return action.href.startsWith("/") ? (
                <Link
                  className="group rounded-[1.5rem] border border-border/80 bg-white/85 p-5 shadow-[0_18px_48px_-38px_rgba(20,33,38,0.26)] transition-transform duration-200 hover:-translate-y-1"
                  key={action.title}
                  to={action.href}
                >
                  {content}
                </Link>
              ) : (
                <a
                  className="group rounded-[1.5rem] border border-border/80 bg-white/85 p-5 shadow-[0_18px_48px_-38px_rgba(20,33,38,0.26)] transition-transform duration-200 hover:-translate-y-1"
                  href={action.href}
                  key={action.title}
                >
                  {content}
                </a>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pt-14 sm:pt-20" id="about">
        <Container size="xl">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="max-w-xl">
              <p className="text-primary text-sm font-semibold uppercase tracking-[0.28em]">
                About TYCC
              </p>
              <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                A youth cycling community for the GTA.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                TYCC is here to make youth cycling in Toronto feel more open, welcoming, and easy
                to join for riders across the GTA.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <AboutCard
                description="Creating an open and inclusive community for youth cyclists in the GTA."
                title="Mission"
              />
              <AboutCard
                description="Accessible rides, meaningful partnerships, and impactful fundraising events that help the youth biking community grow."
                title="Vision"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Badge className="rounded-full px-4 py-2 text-sm" variant="secondary">
              Inclusive
            </Badge>
            <Badge className="rounded-full px-4 py-2 text-sm" variant="secondary">
              Youth-led
            </Badge>
            <Badge className="rounded-full px-4 py-2 text-sm" variant="secondary">
              GTA rides
            </Badge>
            <Badge className="rounded-full px-4 py-2 text-sm" variant="secondary">
              Community-first
            </Badge>
          </div>
        </Container>
      </section>

      <Container size="xl">
        <MonthCalendar events={rideEvents} />
      </Container>

      <section className="pt-14 sm:pt-20" id="routes">
        <Container size="xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-primary text-sm font-semibold uppercase tracking-[0.28em]">
                Past routes
              </p>
              <h2 className="mt-3 text-4xl font-bold sm:text-5xl">Routes are still being finalized.</h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                TYCC already has routes planned, but public route names and meeting points will be
                published later. This section stays intentionally light until that information is ready.
              </p>
            </div>
            <Button asChild className="rounded-full px-5" variant="outline">
              <Link to="/routes">Open routes page</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {routeHighlights.map((route) => (
              <Card className="rounded-[1.5rem] border-border/80 bg-card/90" key={route.title}>
                <CardContent className="p-6">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <Compass className="size-5" />
                  </div>
                  <h3 className="mt-4 text-3xl font-bold">{route.title}</h3>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    {route.area} · {route.distance}
                  </p>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">{route.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-14 sm:pt-20" id="reviews">
        <Container size="xl">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-xl">
              <p className="text-primary text-sm font-semibold uppercase tracking-[0.28em]">
                Reviews
              </p>
              <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                Let families leave a quick review.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                TYCC does not need login for this. The review flow should stay lightweight:
                optional name, required review, and a simple submission path.
              </p>
            </div>

            <Card className="rounded-[1.75rem] border-border/80 bg-card/90">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center gap-3 text-primary">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary">
                    <Star className="size-5" />
                  </div>
                  <p className="text-base font-semibold">First public review form</p>
                </div>

                <form
                  className="grid gap-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (!reviewText.trim()) return;
                    setSubmitted(true);
                    setReviewName("");
                    setReviewText("");
                  }}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="review-name">Your name</Label>
                    <Input
                      id="review-name"
                      onChange={(event) => setReviewName(event.target.value)}
                      placeholder="Optional"
                      value={reviewName}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="review-text">Your review</Label>
                    <Textarea
                      id="review-text"
                      onChange={(event) => setReviewText(event.target.value)}
                      placeholder="Share what the TYCC experience felt like."
                      rows={5}
                      value={reviewText}
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground">
                      Reviews are not stored yet, but the frontend flow is ready.
                    </p>
                    <Button disabled={!reviewText.trim()} type="submit">
                      Submit review
                    </Button>
                  </div>
                  {submitted ? (
                    <p className="text-sm font-medium text-primary">
                      Review captured locally. Connect storage when TYCC is ready to publish them.
                    </p>
                  ) : null}
                </form>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="pt-14 sm:pt-20" id="achievements">
        <Container size="xl">
          <div className="grid gap-6 rounded-[2rem] border border-border/80 bg-primary p-6 text-primary-foreground shadow-[0_28px_80px_-55px_rgba(20,33,38,0.75)] sm:p-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
                Achievements and proof
              </p>
              <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Achievements can land later.</h2>
              <p className="mt-4 text-lg leading-8 text-white/80">
                This block is kept intentionally simple until TYCC has a real list of partnerships,
                magazine mentions, or fundraising milestones to publish.
              </p>
            </div>

            <Card className="rounded-[1.5rem] border-white/12 bg-white/8 text-white shadow-none">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Award className="size-6 text-accent" />
                  <p className="text-xl font-bold">Achievements list coming soon</p>
                </div>
                <p className="mt-4 text-base leading-7 text-white/78">
                  Replace this placeholder once TYCC is ready to publish recognized partnerships,
                  media mentions, or fundraising impact.
                </p>
                {achievements.length > 0 ? (
                  <div className="mt-4 grid gap-3">
                    {achievements.map((achievement) => (
                      <div
                        className="rounded-[1.25rem] border border-white/10 px-4 py-3"
                        key={achievement}
                      >
                        {achievement}
                      </div>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="pt-14 sm:pt-20" id="connect">
        <Container size="xl">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="max-w-xl">
              <p className="text-primary text-sm font-semibold uppercase tracking-[0.28em]">
                Connect
              </p>
              <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                Keep contact friction low.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Social links and direct email should be visible from the homepage without making
                riders and families search for them.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {connectLinks.map((link, index) => {
                const Icon = connectIcons[index];

                return (
                  <a
                    className="rounded-[1.5rem] border border-border/80 bg-card/90 p-5 shadow-[0_18px_48px_-38px_rgba(20,33,38,0.26)] transition-transform duration-200 hover:-translate-y-1"
                    href={link.href}
                    key={link.title}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 text-3xl font-bold">{link.title}</h3>
                    <p className="mt-3 text-base leading-7 text-muted-foreground">{link.description}</p>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-border/80 bg-white/82 p-6 shadow-[0_20px_50px_-40px_rgba(20,33,38,0.24)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-primary text-sm font-semibold uppercase tracking-[0.28em]">
                  Direct contact
                </p>
                <p className="mt-2 text-2xl font-bold">torontoyouthcyclingclub@gmail.com</p>
              </div>
              <Button asChild className="rounded-full px-5">
                <a href="mailto:torontoyouthcyclingclub@gmail.com">Email TYCC</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

const AboutCard = ({ title, description }: { title: string; description: string }) => (
  <Card className="rounded-[1.5rem] border-border/80 bg-card/90">
    <CardContent className="p-6">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
        <Compass className="size-5" />
      </div>
      <h3 className="mt-5 text-3xl font-bold">{title}</h3>
      <p className="mt-3 text-base leading-7 text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default HomePage;
