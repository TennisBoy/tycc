export type RideEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  rideType: "Group ride" | "Skills session" | "Community ride" | "Fundraiser";
  difficulty: "Beginner" | "All levels" | "Intermediate";
  area: string;
  meetup: string;
  distance: string;
  preview: string;
  gear: string;
};
