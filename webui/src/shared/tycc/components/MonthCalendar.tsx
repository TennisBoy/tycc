import { startTransition, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { RideEvent } from "../types";

type MonthCalendarProps = {
  events: RideEvent[];
};

type CalendarView = "list" | "month" | "day";

type MonthOption = {
  label: string;
  value: string;
};

const MONTHS: MonthOption[] = [
  { label: "April 2026", value: "2026-04" },
  { label: "May 2026", value: "2026-05" },
  { label: "June 2026", value: "2026-06" },
];

// Default the calendar to the month of the next upcoming ride (falling back to
// the current month), clamped to the months we have in range.
const getInitialMonthIndex = (events: RideEvent[]) => {
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .find((event) => event.date >= today);
  const targetMonth = (upcoming?.date ?? today).slice(0, 7);
  const idx = MONTHS.findIndex((month) => month.value === targetMonth);
  if (idx !== -1) return idx;
  return targetMonth < MONTHS[0].value ? 0 : MONTHS.length - 1;
};

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const formatMonthLabel = (monthValue: string) => {
  const [year, month] = monthValue.split("-").map(Number);
  return new Intl.DateTimeFormat("en-CA", { month: "long", year: "numeric" }).format(
    new Date(year, month - 1, 1),
  );
};

const formatDayName = (date: string) =>
  new Intl.DateTimeFormat("en-CA", { weekday: "long" }).format(new Date(`${date}T12:00:00`));

const formatCalendarDate = (date: string) =>
  new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric" }).format(
    new Date(`${date}T12:00:00`),
  );

const buildCalendarCells = (monthValue: string, events: RideEvent[]) => {
  const [year, month] = monthValue.split("-").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const mondayStartOffset = (firstDay.getDay() + 6) % 7;

  return Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - mondayStartOffset + 1;
    const isCurrentMonth = dayNumber >= 1 && dayNumber <= daysInMonth;

    if (!isCurrentMonth) {
      return {
        id: `empty-${monthValue}-${index}`,
        dayNumber: null,
        fullDate: null,
        events: [] as RideEvent[],
      };
    }

    const fullDate = `${monthValue}-${String(dayNumber).padStart(2, "0")}`;

    return {
      id: fullDate,
      dayNumber,
      fullDate,
      events: events.filter((event) => event.date === fullDate),
    };
  });
};

const MonthCalendar = ({ events }: MonthCalendarProps) => {
  // Always open on the month-first grid, on every viewport.
  const [view, setView] = useState<CalendarView>("month");
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(() => getInitialMonthIndex(events));
  const [selectedRideType, setSelectedRideType] = useState("All rides");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All difficulties");
  const [selectedArea, setSelectedArea] = useState("All areas");
  const [selectedDay, setSelectedDay] = useState("Any day");
  const [selectedEventId, setSelectedEventId] = useState("");

  const selectedMonth = MONTHS[selectedMonthIndex];
  const monthEvents = events.filter((event) => event.date.startsWith(selectedMonth.value));

  const rideTypes = ["All rides", ...new Set(monthEvents.map((event) => event.rideType))];
  const difficulties = ["All difficulties", ...new Set(monthEvents.map((event) => event.difficulty))];
  const areas = ["All areas", ...new Set(monthEvents.map((event) => event.area))];
  const days = ["Any day", ...new Set(monthEvents.map((event) => formatDayName(event.date)))];

  const visibleEvents = monthEvents.filter((event) => {
    if (selectedRideType !== "All rides" && event.rideType !== selectedRideType) return false;
    if (selectedDifficulty !== "All difficulties" && event.difficulty !== selectedDifficulty)
      return false;
    if (selectedArea !== "All areas" && event.area !== selectedArea) return false;
    if (selectedDay !== "Any day" && formatDayName(event.date) !== selectedDay) return false;
    return true;
  });

  const selectedEvent =
    visibleEvents.find((event) => event.id === selectedEventId) ?? visibleEvents[0] ?? null;

  const selectFirstVisibleEvent = (nextEvents: RideEvent[]) => {
    setSelectedEventId(nextEvents[0]?.id ?? "");
  };

  const updateFilter = (
    setter: (value: string) => void,
    value: string,
    nextEvents: RideEvent[],
  ) => {
    startTransition(() => {
      setter(value);
      if (!nextEvents.some((event) => event.id === selectedEventId)) {
        selectFirstVisibleEvent(nextEvents);
      }
    });
  };

  const cells = buildCalendarCells(selectedMonth.value, visibleEvents);

  return (
    <section aria-labelledby="calendar-heading" className="pt-14 sm:pt-20" id="calendar">
      <div className="grid gap-6 rounded-[2rem] border border-border/80 bg-white/85 p-5 shadow-[0_28px_80px_-55px_rgba(20,33,38,0.32)] backdrop-blur-sm sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.28em]">
              2026 season
            </p>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl" id="calendar-heading">
              Calendar of rides
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7 sm:text-lg">
              A clean ride calendar made for young riders — browse by month, list, or day, filter
              fast, and open the ride details you need.
            </p>
          </div>

          <Tabs
            className="w-full lg:w-auto"
            onValueChange={(value) => setView(value as CalendarView)}
            value={view}
          >
            <TabsList className="w-full justify-start rounded-full bg-muted p-1" variant="default">
              <TabsTrigger className="rounded-full px-4" value="list">
                List
              </TabsTrigger>
              <TabsTrigger className="rounded-full px-4" value="month">
                Month
              </TabsTrigger>
              <TabsTrigger className="rounded-full px-4" value="day">
                Day
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-4 rounded-[1.5rem] border border-border/80 bg-background/90 p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <Button
                aria-label="Previous month"
                className="rounded-full"
                disabled={selectedMonthIndex === 0}
                onClick={() => {
                  if (selectedMonthIndex === 0) return;
                  startTransition(() => {
                    setSelectedMonthIndex((current) => current - 1);
                    setSelectedRideType("All rides");
                    setSelectedDifficulty("All difficulties");
                    setSelectedArea("All areas");
                    setSelectedDay("Any day");
                    setSelectedEventId("");
                  });
                }}
                size="icon"
                variant="outline"
              >
                <ChevronLeft />
              </Button>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  Viewing
                </p>
                <p className="text-3xl font-bold">{formatMonthLabel(selectedMonth.value)}</p>
              </div>
              <Button
                aria-label="Next month"
                className="rounded-full"
                disabled={selectedMonthIndex === MONTHS.length - 1}
                onClick={() => {
                  if (selectedMonthIndex === MONTHS.length - 1) return;
                  startTransition(() => {
                    setSelectedMonthIndex((current) => current + 1);
                    setSelectedRideType("All rides");
                    setSelectedDifficulty("All difficulties");
                    setSelectedArea("All areas");
                    setSelectedDay("Any day");
                    setSelectedEventId("");
                  });
                }}
                size="icon"
                variant="outline"
              >
                <ChevronRight />
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Filter className="size-4 text-primary" />
              <span>
                {visibleEvents.length} {visibleEvents.length === 1 ? "ride" : "rides"} in view
              </span>
            </div>
          </div>

          <div className="grid gap-3">
            <FilterGroup
              label="Ride type"
              onSelect={(value) => {
                const nextEvents = monthEvents.filter((event) => {
                  if (value !== "All rides" && event.rideType !== value) return false;
                  if (
                    selectedDifficulty !== "All difficulties" &&
                    event.difficulty !== selectedDifficulty
                  )
                    return false;
                  if (selectedArea !== "All areas" && event.area !== selectedArea) return false;
                  if (selectedDay !== "Any day" && formatDayName(event.date) !== selectedDay)
                    return false;
                  return true;
                });
                updateFilter(setSelectedRideType, value, nextEvents);
              }}
              options={rideTypes}
              selected={selectedRideType}
            />
            <FilterGroup
              label="Difficulty"
              onSelect={(value) => {
                const nextEvents = monthEvents.filter((event) => {
                  if (selectedRideType !== "All rides" && event.rideType !== selectedRideType)
                    return false;
                  if (value !== "All difficulties" && event.difficulty !== value) return false;
                  if (selectedArea !== "All areas" && event.area !== selectedArea) return false;
                  if (selectedDay !== "Any day" && formatDayName(event.date) !== selectedDay)
                    return false;
                  return true;
                });
                updateFilter(setSelectedDifficulty, value, nextEvents);
              }}
              options={difficulties}
              selected={selectedDifficulty}
            />
            <FilterGroup
              label="Area"
              onSelect={(value) => {
                const nextEvents = monthEvents.filter((event) => {
                  if (selectedRideType !== "All rides" && event.rideType !== selectedRideType)
                    return false;
                  if (
                    selectedDifficulty !== "All difficulties" &&
                    event.difficulty !== selectedDifficulty
                  )
                    return false;
                  if (value !== "All areas" && event.area !== value) return false;
                  if (selectedDay !== "Any day" && formatDayName(event.date) !== selectedDay)
                    return false;
                  return true;
                });
                updateFilter(setSelectedArea, value, nextEvents);
              }}
              options={areas}
              selected={selectedArea}
            />
            <FilterGroup
              label="Day"
              onSelect={(value) => {
                const nextEvents = monthEvents.filter((event) => {
                  if (selectedRideType !== "All rides" && event.rideType !== selectedRideType)
                    return false;
                  if (
                    selectedDifficulty !== "All difficulties" &&
                    event.difficulty !== selectedDifficulty
                  )
                    return false;
                  if (selectedArea !== "All areas" && event.area !== selectedArea) return false;
                  if (value !== "Any day" && formatDayName(event.date) !== value) return false;
                  return true;
                });
                updateFilter(setSelectedDay, value, nextEvents);
              }}
              options={days}
              selected={selectedDay}
            />
          </div>
        </div>

        <Tabs onValueChange={(value) => setView(value as CalendarView)} value={view}>
          <TabsContent value="month">
            <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
              <div className="overflow-hidden rounded-[1.5rem] border border-border/80 bg-card">
                <div className="grid grid-cols-7 border-b border-border/80 bg-muted/60 text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {WEEKDAY_LABELS.map((label) => (
                    <div className="px-2 py-3" key={label}>
                      {label}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {cells.map((cell) => {
                    const firstEvent = cell.events[0];
                    const isSelected = selectedEvent?.date === cell.fullDate;

                    return (
                      <button
                        className={cn(
                          "min-h-28 border-b border-r border-border/70 p-2 text-left transition-colors last:border-r-0 sm:min-h-32",
                          cell.fullDate ? "bg-white hover:bg-muted/50" : "bg-muted/35",
                          isSelected && "bg-secondary/70",
                        )}
                        disabled={!cell.fullDate || cell.events.length === 0}
                        key={cell.id}
                        onClick={() => {
                          if (!firstEvent) return;
                          setSelectedEventId(firstEvent.id);
                        }}
                        type="button"
                      >
                        <div
                          className={cn(
                            "text-sm font-semibold",
                            cell.fullDate ? "text-foreground" : "text-muted-foreground/60",
                          )}
                        >
                          {cell.dayNumber ?? ""}
                        </div>
                        {firstEvent ? (
                          <div className="mt-2 space-y-2">
                            <Badge className="bg-accent/18 px-2 py-1 text-[0.65rem] text-accent-foreground">
                              {cell.events.length} event{cell.events.length > 1 ? "s" : ""}
                            </Badge>
                            <p className="line-clamp-2 text-sm leading-5 font-semibold text-foreground">
                              {firstEvent.title}
                            </p>
                          </div>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              <SelectedRideCard event={selectedEvent} />
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="grid gap-4">
              {visibleEvents.length === 0 ? (
                <EmptyCalendarState />
              ) : (
                visibleEvents.map((event) => (
                  <Card className="rounded-[1.5rem] border-border/80 bg-card/90" key={event.id}>
                    <CardContent className="grid gap-5 p-6 md:grid-cols-[0.22fr_0.78fr]">
                      <div>
                        <p className="text-primary text-xs font-semibold uppercase tracking-[0.24em]">
                          {formatCalendarDate(event.date)}
                        </p>
                        <p className="mt-2 text-sm font-medium text-muted-foreground">
                          {event.time}
                        </p>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge>{event.rideType}</Badge>
                          <Badge variant="secondary">{event.difficulty}</Badge>
                        </div>
                        <h3 className="mt-4 text-2xl font-bold">{event.title}</h3>
                        <p className="mt-3 text-base leading-7 text-muted-foreground">
                          {event.preview}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="day">
            {visibleEvents.length === 0 ? (
              <EmptyCalendarState />
            ) : (
              <div className="grid gap-5">
                <div className="flex flex-wrap gap-2">
                  {visibleEvents.map((event) => {
                    const isActive = selectedEvent?.id === event.id;
                    return (
                      <button
                        className={cn(
                          "flex flex-col items-start rounded-2xl border px-4 py-2 text-left transition-colors",
                          isActive
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-white text-foreground hover:bg-muted",
                        )}
                        key={event.id}
                        onClick={() => setSelectedEventId(event.id)}
                        type="button"
                      >
                        <span className="text-sm font-bold">{formatCalendarDate(event.date)}</span>
                        <span
                          className={cn(
                            "text-xs",
                            isActive ? "text-white/75" : "text-muted-foreground",
                          )}
                        >
                          {event.time}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <SelectedRideCard event={selectedEvent} />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

type FilterGroupProps = {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

const FilterGroup = ({ label, options, selected, onSelect }: FilterGroupProps) => (
  <div className="grid gap-2">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
      {label}
    </p>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          className={cn(
            "rounded-full border px-3 py-2 text-sm font-medium transition-colors",
            selected === option
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-white text-foreground hover:bg-muted",
          )}
          key={option}
          onClick={() => onSelect(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

const SelectedRideCard = ({ event }: { event: RideEvent | null }) => {
  if (!event) {
    return <EmptyCalendarState />;
  }

  return (
    <Card className="rounded-[1.5rem] border-border/80 bg-primary text-primary-foreground shadow-[0_24px_70px_-55px_rgba(20,33,38,0.75)]">
      <CardContent className="grid gap-5 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border-0 bg-white/15 text-white">{event.rideType}</Badge>
          <Badge className="border-0 bg-white/12 text-white">{event.difficulty}</Badge>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/72">
            Selected ride
          </p>
          <h3 className="mt-3 text-3xl font-bold">{event.title}</h3>
          <p className="mt-3 text-base leading-7 text-white/82">{event.preview}</p>
        </div>

        <div className="grid gap-3 rounded-[1.25rem] border border-white/14 bg-white/8 p-4">
          <DetailRow label="Date" value={`${formatCalendarDate(event.date)} at ${event.time}`} />
          <DetailRow label="Meet up" value={event.meetup} />
          <DetailRow label="Area" value={event.area} />
          <DetailRow label="Distance" value={event.distance} />
          <DetailRow label="Gear" value={event.gear} />
        </div>
      </CardContent>
    </Card>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm last:border-b-0 last:pb-0">
    <span className="uppercase tracking-[0.18em] text-white/58">{label}</span>
    <span className="text-right font-medium text-white">{value}</span>
  </div>
);

const EmptyCalendarState = () => (
  <Card className="rounded-[1.5rem] border-dashed border-border/80 bg-card/90">
    <CardContent className="grid gap-3 p-6 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-primary">
        <CalendarDays className="size-5" />
      </div>
      <h3 className="text-2xl font-bold">No rides match these filters</h3>
      <p className="text-base leading-7 text-muted-foreground">
        Reset a filter to bring the month view back into focus.
      </p>
    </CardContent>
  </Card>
);

export default MonthCalendar;
