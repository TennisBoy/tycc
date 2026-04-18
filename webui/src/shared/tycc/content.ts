import type { RideEvent } from "./types";

export const rideEvents: RideEvent[] = [];

export const quickActions = [
  {
    title: "Check Calendar",
    description: "See the month view and watch for upcoming TYCC rides.",
    href: "/calendar",
  },
  {
    title: "About TYCC",
    description: "Read the mission, vision, and why the club exists.",
    href: "/about",
  },
  {
    title: "Past Routes",
    description: "Browse route placeholders until final ride names are published.",
    href: "/routes",
  },
  {
    title: "Connect",
    description: "Jump to Instagram, Discord, or email in one click.",
    href: "#connect",
  },
] as const;

export const routeHighlights = [
  {
    title: "Route name to be announced",
    area: "Toronto / GTA",
    distance: "TBD",
    description:
      "The club already has routes in mind, but public route names and ride details are still being finalized.",
  },
  {
    title: "Meeting point coming soon",
    area: "TBD",
    distance: "TBD",
    description:
      "Meeting points will be published once each ride is confirmed so riders and families can plan confidently.",
  },
  {
    title: "Past route archive in progress",
    area: "TYCC",
    distance: "TBD",
    description:
      "This section is intentionally lightweight for now and will grow as TYCC starts publishing route history.",
  },
] as const;

export const achievements = [] as const;

export const connectLinks = [
  {
    title: "Instagram",
    description: "Follow ride photos, schedule reminders, and club updates.",
    href: "https://www.instagram.com/tycc.to/",
  },
  {
    title: "Discord",
    description: "Join the TYCC community chat and stay close to future ride plans.",
    href: "https://discord.gg/7ZRRF4VdvS",
  },
  {
    title: "Email TYCC",
    description: "Contact the club directly for questions, partnerships, or parent outreach.",
    href: "mailto:torontoyouthcyclingclub@gmail.com",
  },
  {
    title: "Newsletter",
    description: "Newsletter signup can be connected here once TYCC starts publishing updates.",
    href: "mailto:torontoyouthcyclingclub@gmail.com?subject=TYCC%20newsletter%20interest",
  },
] as const;
