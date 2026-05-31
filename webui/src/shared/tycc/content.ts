import type { Exec, GalleryItem, RideEvent, RouteInfo, Stat } from "./types";

export const site = {
  name: "Toronto Youth Cycling Club",
  short: "TYCC",
  domain: "tycctoronto.com",
  email: "torontoyouthcyclingclub@gmail.com",
  instagram: "https://www.instagram.com/tycc.to/",
  discord: "https://discord.gg/7ZRRF4VdvS",
  strava: "https://www.strava.com/clubs/1292217",
} as const;

export const mission =
  "Creating an open and inclusive community for youth cyclists in the GTA.";

export const vision =
  "Expanding the club to open opportunities to youth riders in the GTA, and building relationships with other organizations to grow our sphere of influence. We aim to be one of Toronto's best-known youth cycling organizations — empowering the youth biking community through accessible rides, meaningful partnerships, and impactful fundraising events.";

// Real founding story, drawn from the club's own write-up (no invented copy).
export const story: string[] = [
  "Our passion for biking emerged in the summer of 2024. What started as casual interest — a feed full of cycling content and the Tour de France — quickly grew into something bigger.",
  "The idea for TYCC was born when Nathan met Brandon, a Western University student who'd started a cycling club at his own high school, at an internship conference. That night Nathan messaged Roger, Gavin, and Cooper, and the Toronto Youth Cycling Club was born.",
  "We noticed there were almost no cycling clubs built around youth riders, so we made our own — a community first, on Discord and out on the road. The club took off fast: nearly 50 Discord members and 50 Instagram followers on day one.",
  "Today we've grown to around a thousand followers and a tight Discord of true riders, and we're shifting our focus from popularity toward partnerships and charity — working to become a non-profit that gives back through cycling.",
];

export const stats: Stat[] = [
  { value: "1.2M", label: "views on Instagram" },
  { value: "~1,000", label: "Instagram followers" },
  { value: "~90", label: "riders on Discord" },
  { value: "13–25", label: "the youth we ride with" },
];

export const execs: Exec[] = [
  {
    id: "gavin",
    name: "Gavin",
    role: "Co-founder",
    school: "York Mills Collegiate Institute",
    photo: "/images/exec-gavin.jpg",
    bio: "Hello, my name is Gavin and I'm one of the co-presidents of Toronto Youth Cycling Club. As of 2026 I am 18 years old and attend York Mills Collegiate Institute. I'm very passionate about physical activities/sports such as basketball, football, hockey and biking, and I also love hanging out with friends. I got into biking over the summer of 2024, after watching a Tour de France documentary, and have been enjoying the sport ever since.",
  },
  {
    id: "roger",
    name: "Roger Kim",
    role: "Co-founder",
    school: "York Mills Collegiate Institute",
    photo: "/images/exec-roger.jpg",
    bio: "My name is Roger Kim, co-president of the Toronto Youth Cycling Club. I am currently 17 years old, attending York Mills Collegiate Institute. As of now, I have committed to Engineering + Ivey at the University of Western Ontario. In my free time, I enjoy playing hockey, eating out, and of course, biking! I started biking around Grade 10, and fell in love with the sport ever since.",
  },
  {
    id: "nathan",
    name: "Nathan",
    role: "Co-founder",
    school: "Victoria Park Secondary School",
    photo: "/images/exec-nathan.jpg",
    bio: "Hi! My name is Nathan, one of the co-presidents of Toronto Youth Cycling Club! I'm 17 years old, and I've been a part of the North York community for as long as I can remember. I currently attend Victoria Park Secondary School near York Mills and Parkwoods. Some passions or hobbies of mine include playing hockey, swimming, playing piano, and of course, biking (particularly longer distances).",
  },
  {
    id: "cooper",
    name: "Cooper",
    role: "Exec",
    school: "Northern Secondary School",
    photo: "/images/exec-cooper.jpg",
    bio: "Hi, my name is Cooper, I am also one of the co-presidents of the Toronto Youth Cycling Club. I am 16 years old and I attend Northern Secondary School. I have a passion for soccer and play competitively for Power FC U17. Some hobbies of mine include playing sports, engaging in calisthenics, and biking long distances.",
  },
];

// No rides scheduled yet — add entries here as dates get confirmed.
export const rideEvents: RideEvent[] = [];

// Real routes shared by the club (Google Maps cycling directions).
export const routeList: RouteInfo[] = [
  {
    id: "york-mills-tommy-thompson",
    title: "York Mills → Tommy Thompson Park",
    type: "Road",
    summary:
      "A road ride from York Mills down toward the waterfront, finishing out on the Leslie Street Spit at Tommy Thompson Park.",
    mapsUrl:
      "https://www.google.com/maps/dir/808+York+Mills+Rd,+North+York,+ON+M3B+1X8/Tommy+Thompson+Park,+1+Leslie+St,+Toronto,+ON+M4M+3M2/data=!4m2!4m1!3e1",
    embedUrl:
      "https://maps.google.com/maps?saddr=808+York+Mills+Rd,+North+York,+ON+M3B+1X8&daddr=Tommy+Thompson+Park,+1+Leslie+St,+Toronto,+ON+M4M+3M2&dirflg=b&output=embed",
  },
  {
    id: "north-york-lamoreaux",
    title: "North York → L'Amoreaux North Park",
    type: "Road",
    summary:
      "An east-bound road ride from the Bessarion area of North York across to L'Amoreaux North Park in Scarborough.",
    mapsUrl:
      "https://www.google.com/maps/dir/90+Ethennonnhawahstihnen%27+Ln,+North+York,+ON+M2K+1H8/L%27Amoreaux+North+Park,+1900+McNicoll+Ave,+Scarborough,+ON+M1V+5N4/data=!4m2!4m1!3e1",
    embedUrl:
      "https://maps.google.com/maps?saddr=90+Ethennonnhawahstihnen%27+Ln,+North+York,+ON+M2K+1H8&daddr=L%27Amoreaux+North+Park,+1900+McNicoll+Ave,+Scarborough,+ON+M1V+5N4&dirflg=b&output=embed",
  },
  {
    id: "north-york-g-ross-lord",
    title: "North York → G Ross Lord Park",
    type: "Road",
    summary:
      "A westbound ride across north Toronto to G Ross Lord Park. From the park it can keep going north — all the way up to Canada's Wonderland.",
    mapsUrl:
      "https://www.google.com/maps/dir/43.7684018,-79.3754208/43.7722195,-79.3644217/43.7745713,-79.4540724/data=!4m2!4m1!3e1",
    embedUrl:
      "https://maps.google.com/maps?saddr=43.7684018,-79.3754208&daddr=43.7722195,-79.3644217+to:43.7745713,-79.4540724&dirflg=b&output=embed",
  },
];

export const gallery: GalleryItem[] = [
  { id: "g1", src: "/images/gallery-1.jpg", alt: "TYCC riders in a road group ride" },
  { id: "g2", src: "/images/gallery-2.jpg", alt: "A cyclist on a sunlit Toronto road" },
  { id: "g6", src: "/images/gallery-6.jpg", alt: "Riding through the city" },
  { id: "g8", src: "/images/gallery-8.jpg", alt: "A road bike against an open route" },
  { id: "g4", src: "/images/gallery-4.jpg", alt: "The group rolling out together" },
  { id: "g12", src: "/images/gallery-12.jpg", alt: "Exploring a route beyond the city" },
  { id: "g3", src: "/images/gallery-3.jpg", alt: "A TYCC road bike up close" },
  { id: "g11", src: "/images/gallery-11.jpg", alt: "Out on a long ride" },
  { id: "g7", src: "/images/gallery-7.jpg", alt: "Bikes ready for the next ride" },
];

export const connectLinks = [
  {
    title: "Instagram",
    description: "Ride photos, reels, and club updates — where we share what we're up to.",
    href: site.instagram,
  },
  {
    title: "Discord",
    description: "Where every ride is planned. Join to see what's coming and ride with us.",
    href: site.discord,
  },
  {
    title: "Strava",
    description: "Follow the club, see our routes, and track the rides we've done.",
    href: site.strava,
  },
  {
    title: "Email",
    description: "Questions, partnerships, or parent outreach — reach the club directly.",
    href: `mailto:${site.email}`,
  },
] as const;
