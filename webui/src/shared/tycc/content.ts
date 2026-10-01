import type { Exec, GalleryItem, RideEvent, RouteInfo, Stat } from "./types";

export const site = {
  name: "Toronto Youth Cycling Club",
  short: "TYCC",
  domain: "tycctoronto.com",
  email: "torontoyouthcyclingclub@gmail.com",
  phone: "647 914 3949",
  phoneHref: "+16479143949",
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
  "Today we've grown to around 1,500 followers and a tight Discord of true riders, and we're shifting our focus from popularity toward partnerships and charity — working to become a non-profit that gives back through cycling.",
];

export const stats: Stat[] = [
  { value: "8M+", label: "views on Instagram" },
  { value: "~1,500", label: "Instagram followers" },
  { value: "~110", label: "riders on Discord" },
  { value: "13–25", label: "the ages we ride with" },
];

export const execs: Exec[] = [
  {
    id: "gavin",
    name: "Gavin Tam",
    role: "Co-founder",
    school: "Western University",
    photo: "/images/exec-gavin.webp",
    bio: "Hello, my name is Gavin and I'm one of the co-presidents of Toronto Youth Cycling Club. As of 2026 I am 18 years old and attend Western University. I'm very passionate about physical activities/sports such as basketball, football, hockey and biking, and I also love hanging out with friends. I got into biking over the summer of 2024, after watching a Tour de France documentary, and have been enjoying the sport ever since.",
  },
  {
    id: "roger",
    name: "Roger Kim",
    role: "Co-founder",
    school: "Western University",
    photo: "/images/exec-roger.webp",
    bio: "My name is Roger Kim, co-president of the Toronto Youth Cycling Club. I am currently 18 years old, studying Engineering + Ivey at Western University. In my free time, I enjoy playing hockey, eating out, and of course, biking! I started biking around Grade 10, and fell in love with the sport ever since.",
  },
  {
    id: "nathan",
    name: "Nathan Ye",
    role: "Co-founder",
    school: "Western University",
    photo: "/images/exec-nathan.webp",
    bio: "Hi! My name is Nathan, a co-founder of the Toronto Youth Cycling Club! I'm 18 years old, with the large majority of my residence taking place in the North York community. I attend Western University, pursuing a bachelor's degree in Medical Sciences. During my spare time, some passions of mine include playing hockey, swimming, playing piano, and, of course, cycling. I'm looking forward to exploring new areas of the province through cycling in the near future!",
  },
  {
    id: "cooper",
    name: "Cooper Sacks",
    role: "Exec",
    school: "Queen's University",
    photo: "/images/exec-cooper.webp",
    bio: "Hi, my name is Cooper, I am also one of the co-presidents of the Toronto Youth Cycling Club. I am 18 years old and I attend Queen's University. I have a passion for soccer and play competitively for Power FC U17. Some hobbies of mine include playing sports, engaging in calisthenics, and biking long distances.",
  },
  {
    id: "ali",
    name: "Ali Mehdi Ladhiwala",
    role: "Events Manager",
    photo: "/images/exec-ali.webp",
    bio: "Ali helps plan the club's events and helps manage the club's finances.",
  },
  {
    id: "william",
    name: "William Yin",
    role: "Developer & Exec",
    // Photo and bio to be added later.
  },
];

// Real rides from the 2026 season (chronological). Add new entries here as dates get confirmed.
export const rideEvents: RideEvent[] = [
  {
    id: "2026-04-26-g-ross-lord",
    title: "Group Ride — G Ross Lord Park",
    date: "2026-04-26",
    time: "2:45 PM – 4:00 PM",
    rideType: "Group ride",
    difficulty: "All levels",
    area: "North York",
    meetup: "Ethennonnhawahstihnen Community Centre",
    distance: "20–25 km",
    preview:
      "An early-season spin from the Ethennonnhawahstihnen Community Centre out to G Ross Lord Park, along Sheppard Avenue East, the Don River Trail, and the Finch Hydro Corridor.",
    gear: "Helmet, water bottle (drink mix optional) + snacks, and an emergency repair kit (tubes, tools) at your discretion.",
  },
  {
    id: "2026-05-02-lamoreaux",
    title: "Group Ride — L'Amoreaux North Park",
    date: "2026-05-02",
    time: "1:30 PM – 4:00 PM",
    rideType: "Group ride",
    difficulty: "All levels",
    area: "Scarborough",
    meetup: "Ethennonnhawahstihnen Community Centre",
    distance: "25–30 km",
    preview:
      "An east-bound ride from North York across to L'Amoreaux North Park, taking in the Upper Don Recreational Trail and the McNicoll–Finch Hydro Corridor.",
    gear: "Helmet, water bottle (drink mix optional) + snacks, and an emergency repair kit (tubes, tools) at your discretion.",
  },
  {
    id: "2026-05-09-tommy-thompson",
    title: "Group Ride — Tommy Thompson Park",
    date: "2026-05-09",
    time: "2:00 PM – 4:00 PM",
    rideType: "Group ride",
    difficulty: "All levels",
    area: "Waterfront",
    meetup: "808 York Mills Road (outside Longo's)",
    distance: "~40 km",
    preview:
      "A road ride from York Mills down to the waterfront, finishing out on the Leslie Street Spit at Tommy Thompson Park.",
    gear: "Helmet, water bottle (drink mix optional) + snacks, and an emergency repair kit (tubes, tools) at your discretion.",
  },
  {
    id: "2026-05-18-victoria-day",
    title: "Victoria Day Group Ride — Tommy Thompson Park",
    date: "2026-05-18",
    time: "2:00 PM – 4:00 PM",
    rideType: "Group ride",
    difficulty: "All levels",
    area: "Waterfront",
    meetup: "808 York Mills Road (outside Longo's)",
    distance: "~40 km",
    preview:
      "A Victoria Day long-weekend ride from York Mills out to Tommy Thompson Park on the Leslie Street Spit.",
    gear: "Helmet, water bottle (drink mix optional) + snacks, and an emergency repair kit (tubes, tools) at your discretion.",
  },
  {
    id: "2026-05-30-bike-depot",
    title: "Bike Depot Group Ride",
    date: "2026-05-30",
    time: "7:00 AM roll out",
    rideType: "Group ride",
    difficulty: "Intermediate",
    area: "Bayview",
    meetup: "Bike Depot Bayview",
    distance: "~70 km",
    preview:
      "An early-morning partner ride with Bike Depot Bayview — a faster 70 km at 25–30 kph for intermediate and advanced road riders. RSVP via Bike Depot's Instagram bio.",
    gear: "Helmet, water bottle (drink mix optional) + snacks, and an emergency repair kit (tubes, tools) at your discretion.",
  },
  {
    id: "2026-06-05-scarborough-bluffs",
    title: "Group Ride — Scarborough Bluffs",
    date: "2026-06-05",
    time: "4:00 PM – 6:30 PM",
    rideType: "Group ride",
    difficulty: "All levels",
    area: "Scarborough",
    meetup: "808 York Mills Road (outside Longo's)",
    distance: "~19 km one way",
    preview:
      "An afternoon road ride from York Mills southeast down to the Scarborough Bluffs, finishing at Bluffer's Park on the lake — about 19 km one way at a steady 20–25 kph.",
    gear: "Helmet, water bottle (drink mix optional) + snacks, and an emergency repair kit (tubes, tools) at your discretion.",
  },
  {
    id: "2026-06-13-bmo-field",
    title: "Group Ride — BMO Field",
    date: "2026-06-13",
    time: "1:30 PM – 4:30 PM",
    rideType: "Group ride",
    difficulty: "All levels",
    area: "Waterfront",
    meetup: "808 York Mills Road (outside Longo's)",
    distance: "~20 km one way",
    preview:
      "A road ride from York Mills down to Exhibition Place, finishing at BMO Field by the lake — about 20 km one way at a steady 20–25 kph.",
    gear: "Helmet, water bottle (drink mix optional) + snacks, and an emergency repair kit (tubes, tools) at your discretion.",
  },
  {
    id: "2026-07-23-tommy-thompson",
    title: "Group Ride — Tommy Thompson Park",
    date: "2026-07-23",
    time: "2:30 PM – 3:30 PM",
    rideType: "Group ride",
    difficulty: "Intermediate",
    area: "Waterfront",
    meetup: "808 York Mills Road (outside Longo's)",
    distance: "~30 km",
    preview:
      "A quick midsummer run on the downtown route — York Mills to the waterfront and out on the Leslie Street Spit at Tommy Thompson Park, about 30 km at a brisk 25–30 kph.",
    gear: "Helmet, water bottle (drink mix optional) + snacks, and an emergency repair kit (tubes, tools) at your discretion.",
  },
  {
    id: "2026-08-23-richmond-green",
    title: "Group Ride — Richmond Green Park",
    date: "2026-08-23",
    time: "1:00 PM – 4:00 PM",
    rideType: "Group ride",
    difficulty: "All levels",
    area: "Richmond Hill",
    meetup: "808 York Mills Road (outside Longo's)",
    distance: "~40 km",
    preview:
      "A northbound ride out of York Mills up through Thornhill into Richmond Hill, finishing at Richmond Green Park — about 40 km round trip at a steady 20–25 kph.",
    gear: "Helmet, water bottle (drink mix optional) + snacks, and an emergency repair kit (tubes, tools) at your discretion.",
  },
];

// Real routes shared by the club (Google Maps cycling directions).
export const routeList: RouteInfo[] = [
  {
    id: "york-mills-tommy-thompson",
    title: "York Mills → Tommy Thompson Park",
    type: "Road cycling",
    summary:
      "A road ride from York Mills down toward the waterfront, finishing out on the Leslie Street Spit at Tommy Thompson Park.",
    distance: "~20 km one way",
    mapsUrl:
      "https://www.google.com/maps/dir/808+York+Mills+Rd,+North+York,+ON+M3B+1X8/43.6930395,-79.3592464/Tommy+Thompson+Park,+1+Leslie+St,+Toronto,+ON+M4M+3M2/data=!4m2!4m1!3e1",
    embedUrl:
      "https://maps.google.com/maps?saddr=808+York+Mills+Rd,+North+York,+ON+M3B+1X8&daddr=43.6930395,-79.3592464+to:Tommy+Thompson+Park,+1+Leslie+St,+Toronto,+ON+M4M+3M2&dirflg=b&output=embed",
  },
  {
    id: "north-york-lamoreaux",
    title: "North York → L'Amoreaux North Park",
    type: "Road cycling",
    summary:
      "An east-bound road ride from the Bessarion area of North York across to L'Amoreaux North Park in Scarborough.",
    distance: "~13 km one way",
    mapsUrl:
      "https://www.google.com/maps/dir/90+Ethennonnhawahstihnen%27+Ln,+North+York,+ON+M2K+1H8/A+Y+Jackson+Secondary+School,+50+Francine+Dr,+North+York,+ON+M2H+2G6/L%27Amoreaux+North+Park,+1900+McNicoll+Ave,+Scarborough,+ON+M1V+5N4/data=!4m2!4m1!3e1",
    embedUrl:
      "https://maps.google.com/maps?saddr=90+Ethennonnhawahstihnen%27+Ln,+North+York,+ON+M2K+1H8&daddr=A+Y+Jackson+Secondary+School,+50+Francine+Dr,+North+York,+ON+M2H+2G6+to:L%27Amoreaux+North+Park,+1900+McNicoll+Ave,+Scarborough,+ON+M1V+5N4&dirflg=b&output=embed",
  },
  {
    id: "north-york-g-ross-lord",
    title: "North York → G Ross Lord Park",
    type: "Road cycling",
    summary:
      "A westbound ride across north Toronto to G Ross Lord Park. From the park it can keep going north — all the way up to Canada's Wonderland.",
    distance: "~12 km one way",
    mapsUrl:
      "https://www.google.com/maps/dir/43.7684018,-79.3754208/43.7722195,-79.3644217/43.7745713,-79.4540724/data=!4m2!4m1!3e1",
    embedUrl:
      "https://maps.google.com/maps?saddr=43.7684018,-79.3754208&daddr=43.7722195,-79.3644217+to:43.7745713,-79.4540724&dirflg=b&output=embed",
  },
  {
    id: "york-mills-canadas-wonderland",
    title: "York Mills → Canada's Wonderland",
    type: "Road cycling",
    summary:
      "A longer road ride heading northwest out of York Mills and up through Vaughan, finishing all the way out at Canada's Wonderland.",
    distance: "~29 km one way",
    mapsUrl:
      "https://www.google.com/maps/dir/808+York+Mills+Rd,+North+York,+ON+M3B+1X8/43.7722195,-79.3644217/43.7745713,-79.4540724/43.7775853,-79.4651839/43.7671909,-79.4895874/Canada%27s+Wonderland,+Vaughan,+ON+L6A+1S6/data=!4m2!4m1!3e1",
    embedUrl:
      "https://maps.google.com/maps?saddr=808+York+Mills+Rd,+North+York,+ON+M3B+1X8&daddr=43.7722195,-79.3644217+to:43.7745713,-79.4540724+to:43.7775853,-79.4651839+to:43.7671909,-79.4895874+to:Canada%27s+Wonderland,+Vaughan,+ON+L6A+1S6&dirflg=b&output=embed",
  },
  {
    id: "york-mills-scarborough-bluffs",
    title: "York Mills → Scarborough Bluffs",
    type: "Road cycling",
    summary:
      "A southeast road ride from York Mills down to the lakeshore, finishing out on the Scarborough Bluffs at Bluffer's Park.",
    distance: "~19 km one way",
    mapsUrl:
      "https://www.google.com/maps/dir/808+York+Mills+Rd,+North+York,+ON+M3B+1X8/43.714336,-79.3434444/43.7082672,-79.2417257/Scarborough+Bluffs,+1+Brimley+Rd+S,+Scarborough,+ON/data=!4m2!4m1!3e1",
    embedUrl:
      "https://maps.google.com/maps?saddr=808+York+Mills+Rd,+North+York,+ON+M3B+1X8&daddr=43.714336,-79.3434444+to:43.7082672,-79.2417257+to:Scarborough+Bluffs,+1+Brimley+Rd+S,+Scarborough,+ON&dirflg=b&output=embed",
  },
  {
    id: "york-mills-richmond-green",
    title: "York Mills → Richmond Green Park",
    type: "Road cycling",
    summary:
      "A northbound road ride out of York Mills up through Thornhill and into Richmond Hill, pausing for lunch at The Big Casserole on Major Mackenzie before finishing at Richmond Green Park.",
    distance: "~20 km one way",
    mapsUrl:
      "https://www.google.com/maps/dir/808+York+Mills+Rd,+North+York,+ON+M3B+1X8/43.8808826,-79.3941339/Richmond+Green+Park,+1200+Elgin+Mills+Rd+E,+Richmond+Hill,+ON+L4S+1M5/data=!4m2!4m1!3e1",
    embedUrl:
      "https://maps.google.com/maps?saddr=808+York+Mills+Rd,+North+York,+ON+M3B+1X8&daddr=43.8808826,-79.3941339+to:Richmond+Green+Park,+1200+Elgin+Mills+Rd+E,+Richmond+Hill,+ON+L4S+1M5&dirflg=b&output=embed",
  },
  {
    id: "york-mills-niagara-falls",
    title: "York Mills → Niagara Falls",
    type: "Road cycling",
    summary:
      "The club's biggest adventure — a long road ride from York Mills around the western end of Lake Ontario all the way to Queen Victoria Park at Niagara Falls.",
    distance: "~163 km one way",
    mapsUrl:
      "https://www.google.com/maps/dir/808+York+Mills+Rd,+North+York,+ON+M3B+1X8/43.6930395,-79.3592464/43.6522518,-79.3542008/43.5270409,-79.6020207/43.5166139,-79.609376/43.4865888,-79.6239652/Queen+Victoria+Park,+6345+Niagara+River+Pkwy,+Niagara+Falls,+ON+L2E+6X8/data=!4m2!4m1!3e1",
    embedUrl:
      "https://maps.google.com/maps?saddr=808+York+Mills+Rd,+North+York,+ON+M3B+1X8&daddr=43.6930395,-79.3592464+to:43.6522518,-79.3542008+to:43.5270409,-79.6020207+to:43.5166139,-79.609376+to:43.4865888,-79.6239652+to:Queen+Victoria+Park,+6345+Niagara+River+Pkwy,+Niagara+Falls,+ON+L2E+6X8&dirflg=b&output=embed",
  },
];

// Real ride photos from the club's Drive "website media" folder.
export const gallery: GalleryItem[] = [
  { id: "g1", src: "/images/gallery-01.webp", alt: "Two TYCC riders heading up a tree-lined path together", width: 712, height: 945 },
  { id: "g2", src: "/images/gallery-02.webp", alt: "A cyclist riding through vivid autumn foliage", width: 900, height: 1600 },
  { id: "g3", src: "/images/gallery-03.webp", alt: "A pair of road bikes resting side by side at a park stop", width: 1600, height: 1200 },
  { id: "g4", src: "/images/gallery-04.webp", alt: "The TYCC crew gathered in their club shirts before a ride", width: 1600, height: 1200 },
  { id: "g6", src: "/images/gallery-06.webp", alt: "Bikes and riders gathered outside a shop before rolling out", width: 1200, height: 1600 },
  { id: "g7", src: "/images/gallery-07.webp", alt: "A rider with their bike on the Toronto waterfront", width: 1205, height: 1600 },
  { id: "g8", src: "/images/gallery-08.webp", alt: "A young TYCC rider taking a break on the grass", width: 1200, height: 1600 },
  { id: "g9", src: "/images/gallery-09.webp", alt: "A road bike leaning by a lakeside park in autumn", width: 1600, height: 900 },
  { id: "g10", src: "/images/gallery-10.webp", alt: "Holding up a Windfields newsletter featuring the team", width: 1205, height: 1600 },
  { id: "g11", src: "/images/gallery-11.webp", alt: "A bike resting along the Lake Ontario boardwalk", width: 1600, height: 1205 },
  { id: "g12", src: "/images/gallery-12.webp", alt: "A rider with their bike at a venue entrance", width: 1205, height: 1600 },
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
  {
    title: "Call",
    description: "Questions, partnerships, or parent outreach — call the club directly.",
    href: `tel:${site.phoneHref}`,
  },
] as const;
