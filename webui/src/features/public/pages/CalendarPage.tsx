import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import MonthCalendar from "@/shared/tycc/components/MonthCalendar";
import { rideEvents } from "@/shared/tycc/content";

const CalendarPage = () => {
  return (
    <main className="pb-20 pt-10 sm:pt-14">
      <Container size="xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.28em]">
              TYCC Calendar
            </p>
            <h1 className="mt-3 text-6xl font-bold sm:text-7xl">Rides are coming.</h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              The first TYCC ride of the season is on the calendar. More dates will be added as the
              schedule is confirmed.
            </p>
          </div>
          <Button asChild className="rounded-full px-5" variant="outline">
            <Link to="/">Back Home</Link>
          </Button>
        </div>

        <MonthCalendar events={rideEvents} />
      </Container>
    </main>
  );
};

export default CalendarPage;
