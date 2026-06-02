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

export type Exec = {
  id: string;
  name: string;
  role: string;
  school?: string;
  photo?: string;
  bio?: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type RouteInfo = {
  id: string;
  title: string;
  type: "Road cycling" | "Gravel" | "Trail";
  summary: string;
  /** Google Maps directions link (opens full route). */
  mapsUrl: string;
  /** Embeddable Google Maps directions src (iframe). */
  embedUrl: string;
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
};
