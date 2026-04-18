import { Link } from "react-router";
import { ArrowRight, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

const AboutPage = () => {
  return (
    <main className="pb-20 pt-10 sm:pt-14">
      <Container size="xl">
        <div className="max-w-3xl">
          <Badge className="rounded-full border-0 bg-accent px-4 py-1.5 text-[0.72rem] uppercase tracking-[0.28em]">
            About TYCC
          </Badge>
          <h1 className="mt-6 text-6xl font-bold sm:text-7xl">Built for young riders in the GTA.</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground sm:text-xl">
            Toronto Youth Cycling Club exists to create an open and inclusive cycling community for
            youth riders across Toronto and the GTA.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <ValueCard
            description="Creating an open and inclusive community for youth cyclists in the GTA."
            icon={Users}
            title="Mission"
          />
          <ValueCard
            description="Grow a recognizable youth cycling organization through accessible rides, meaningful partnerships, and fundraising events."
            icon={HeartHandshake}
            title="Vision"
          />
          <ValueCard
            description="TYCC should feel welcoming for riders and trustworthy for families from the first click."
            icon={ShieldCheck}
            title="Club approach"
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Badge className="rounded-full px-4 py-2 text-sm">Inclusive</Badge>
          <Badge className="rounded-full px-4 py-2 text-sm" variant="secondary">
            Youth-first
          </Badge>
          <Badge className="rounded-full px-4 py-2 text-sm" variant="secondary">
            GTA community
          </Badge>
          <Badge className="rounded-full px-4 py-2 text-sm" variant="secondary">
            Practical and welcoming
          </Badge>
        </div>

        <div className="mt-12 rounded-[1.75rem] border border-border/80 bg-card/90 p-6 shadow-[0_20px_50px_-40px_rgba(20,33,38,0.24)]">
          <p className="text-primary text-sm font-semibold uppercase tracking-[0.28em]">
            What this site needs to do
          </p>
          <ul className="mt-4 space-y-3 text-base leading-7 text-muted-foreground">
            <li>Explain who TYCC is in less than 30 seconds.</li>
            <li>Make the calendar easy to find and easy to scan.</li>
            <li>Give riders and parents one obvious way to connect with the club.</li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full px-5">
              <Link to="/calendar">
                Go to Calendar
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild className="rounded-full px-5" variant="outline">
              <Link to="/">Back Home</Link>
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
};

const ValueCard = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <Card className="rounded-[1.5rem] border-border/80 bg-card/90">
    <CardContent className="p-6">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
        <Icon className="size-5" />
      </div>
      <h2 className="mt-5 text-3xl font-bold">{title}</h2>
      <p className="mt-3 text-base leading-7 text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default AboutPage;
