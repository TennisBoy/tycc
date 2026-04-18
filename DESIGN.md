# TYCC Design System

This `DESIGN.md` defines the visual and content system for `tycctoronto.com`.

It should produce a site that feels:

- credible like a real cycling organization
- youth-forward without feeling childish
- fast to scan in 30 seconds or less
- practical first, energetic second

The design should borrow:

- structural clarity and trust from Ontario Cycling
- warmer tone, friendlier typography, and stronger first-screen energy from NICA

## 1. Overview

### Brand

- **Name**: Toronto Youth Cycling Club
- **Short Name**: TYCC
- **Domain**: `tycctoronto.com`

### Mission

Creating an open and inclusive community for youth cyclists in the GTA.

### Vision

TYCC aims to become one of Toronto's best-known youth cycling organizations by growing the youth biking community through accessible rides, meaningful partnerships, and impactful fundraising events.

### Primary Audience

- youth cyclists in Toronto and the GTA
- parents and guardians who need quick trust signals
- community partners, schools, clubs, and sponsors

### Homepage Goals

Within 30 seconds, the homepage must communicate:

1. who TYCC is
2. what TYCC does
3. why youth should care
4. where to go next

### Primary User Actions

- `Check Calendar`
- `Read About TYCC`
- `View Past Routes`
- `Connect on Instagram or Discord`
- `Join the Newsletter`

### Voice and Tone

- clear
- youth-positive
- inviting
- active
- non-corporate
- concise

Avoid:

- long institutional paragraphs
- heavy nonprofit jargon
- startup slang
- overly technical cycling language on public-facing pages

### Headline Style

Use short, direct, motivating headlines.

Examples of the right style:

- `Ride Toronto Together`
- `A Youth Cycling Community for the GTA`
- `Find the Next Ride`
- `Built for Young Riders`

## 2. Color Palette

The palette should feel civic, outdoorsy, and energetic. It should be cleaner and brighter than a typical MTB brand, with enough contrast to feel official and legible.

### Core Palette

- **Background**: `#F7F6F1`
- **Foreground**: `#142126`
- **Primary**: `#1E6B52`
- **Primary Dark**: `#124734`
- **Secondary Surface**: `#DDE7DD`
- **Accent**: `#F2A93B`
- **Accent Dark**: `#C97C12`
- **Border**: `#C8D2CA`
- **Muted Surface**: `#EEF1EA`
- **Muted Foreground**: `#586568`
- **Destructive**: `#B7442A`
- **Success**: `#2D7A58`

### Semantic Use

- **Primary**: primary CTAs, navigation emphasis, important badges
- **Accent**: highlights, active labels, route callouts, event emphasis
- **Secondary Surface**: cards, section bands, supporting backgrounds
- **Muted Surface**: quiet support areas and form surfaces
- **Foreground**: body text, headings, icon strokes

### Color Rules

- Keep the background mostly light.
- Use dark text for readability.
- Use green as the default trust/action color.
- Use orange sparingly for urgency, dates, badges, and callout energy.
- Do not use purple gradients, neon effects, or overly dark black-heavy surfaces.

## 3. Typography

Typography should carry much of the emotional tone. It should feel friendly, athletic, and human, while staying highly legible on mobile.

### Font Families

- **Display / Headings**: `Barlow Condensed`, fallback `Arial Narrow`, sans-serif
- **Body / UI**: `Public Sans`, fallback `Segoe UI`, sans-serif

### Type Personality

- Headings: compact, assertive, energetic
- Body: clean, readable, neutral
- Navigation and buttons: slightly bold, practical, highly legible

### Type Scale

- **Hero H1**: `clamp(2.5rem, 6vw, 4.75rem)`, weight `700`, line-height `0.95`
- **H2**: `clamp(1.75rem, 3vw, 2.5rem)`, weight `700`, line-height `1.05`
- **H3**: `1.375rem`, weight `700`, line-height `1.15`
- **H4**: `1.125rem`, weight `700`, line-height `1.2`
- **Body Large**: `1.125rem`, weight `400`, line-height `1.6`
- **Body**: `1rem`, weight `400`, line-height `1.65`
- **Small / Meta**: `0.875rem`, weight `500`, line-height `1.5`

### Typography Rules

- Keep paragraphs short.
- Prefer headings of 3 to 8 words.
- Avoid dense text blocks above the fold.
- Use sentence case for most UI text.
- Reserve all caps for small labels only.

## 4. Spacing and Layout

The layout must feel organized immediately. It should scan like a clean sports/community site, not a complex admin portal.

### Layout Principles

- fast first read
- strong top-to-bottom hierarchy
- obvious sections
- generous whitespace
- card-based scanning for secondary content

### Spacing System

- Base unit: `8px`
- Tight spacing: `8px`, `12px`
- Standard spacing: `16px`, `24px`
- Section spacing: `48px`, `64px`, `96px`

### Radius

- Base radius: `14px`
- Small radius: `10px`
- Large radius: `20px`
- Pill radius: `999px`

### Container Rules

- Max content width: `1200px`
- Reading width for text-heavy content: `680px`
- Use 2-column or 3-column cards only when the content remains scannable
- Stack early on tablet and mobile

### Homepage Order

1. Hero with mission + CTA
2. Quick action row
3. Upcoming rides / calendar preview
4. About / mission summary
5. Past routes or ride highlights
6. Reviews and achievements
7. Newsletter and social connection

## 5. Components

Components should prioritize scan speed and clear action.

### Header / Navigation

- Keep navigation lean:
  - `About`
  - `Calendar`
  - `Routes`
  - `Reviews`
  - `Achievements`
  - `Connect`
- Include one high-visibility CTA button: `Check Calendar`
- Header should feel clean, sticky, and trustworthy

### Hero

- One large headline
- One short supporting sentence
- Two actions max:
  - primary: `Check Calendar`
  - secondary: `About TYCC`
- Use a real youth cycling image with visible motion or group energy
- Keep visible copy compact enough to scan in under 10 seconds

### Quick Action Cards

Use 4 high-scannability cards near the top:

- Calendar
- About TYCC
- Past Routes
- Connect

Each card should include:

- short title
- 1-line description
- icon or simple visual cue

### Calendar / Ride Preview

The calendar should follow the structure and scan pattern of Ontario Cycling's month events view:

- default to a **month view**
- show a clear month heading with previous / next month navigation
- allow switching between `List`, `Month`, and `Day` views if needed
- keep filters visible and practical, not visually dominant

### Calendar Layout Rules

- The main calendar experience should be a month grid first, not a feed first.
- Each day cell should show the event count and the top event title when relevant.
- Clicking a day or event should open a cleaner ride detail view.
- Show an adjacent or below-the-grid event summary for selected dates on smaller screens if needed.

### Calendar Filters

TYCC should use a lighter version of Ontario Cycling's filters. Keep only the filters that help youth riders decide quickly:

- ride type
- difficulty
- area / neighborhood
- day of week

Avoid overbuilt filtering. Do not add organizer, venue, or administrative filters unless they become necessary later.

### Calendar Event Content

Each event should show:

- date
- start time
- route or ride name
- ride type
- difficulty or pace
- short location or meetup area

Optional event details:

- route preview
- distance
- required gear
- signup or RSVP link

### Calendar UX Rules

- Make the month grid easy to understand in under a few seconds.
- Keep event titles short enough to fit inside day cells.
- Use accent color sparingly to highlight active dates and selected events.
- On mobile, preserve a strong month-based browsing experience instead of collapsing immediately into a cluttered list.
- Do not bury rides inside long copy blocks.

### About Block

- Use a short mission statement
- Use 2 to 4 short supporting points, not a long essay
- Consider stat chips or short values such as `inclusive`, `youth-led`, `GTA rides`, `community-first`

### Past Routes

- Prefer map thumbnails, route cards, or ride snapshots
- Show route name, area, and short ride summary
- Make this section feel active and practical, not archival

### Reviews

- Use short pull quotes from parents or participants
- Limit quote length to 2 or 3 lines
- Pair with small attribution lines

### Achievements / Partnerships

- Use compact logo cards or badge cards
- Show recognizable proof without creating a cluttered logo wall
- Prioritize legibility and spacing over quantity

### Newsletter / Social / Contact

- Keep this block simple and direct
- Include:
  - Instagram
  - Discord
  - newsletter signup
  - contact email
- Reduce friction: one-click actions where possible

### Buttons

- High contrast
- Bold label text
- Minimum height `44px`
- Soft rectangle or rounded-pill styling

Primary button:

- green background
- light text
- strong hover darkening

Secondary button:

- light background
- dark text
- visible border

### Cards

- Light surfaces
- clear border or soft shadow
- compact content
- obvious headline hierarchy

Avoid:

- oversized paragraphs inside cards
- low-contrast ghost styling for key content
- decorative complexity that slows scanning

## 6. Icons and Imagery

### Icon Style

- clean outlined icons
- slightly rounded geometry
- simple and readable at small sizes

### Image Style

Use real photography that shows:

- youth riders
- group rides
- outdoor movement
- Toronto or GTA context when possible
- community, not just solo athletic performance

### Image Rules

- prefer authentic photos over abstract graphics
- prioritize sunlight, motion, and human connection
- avoid stock imagery that feels corporate or staged
- avoid dark, muddy, aggressive MTB imagery as the dominant tone

## 7. Motion and Animation

Motion should support clarity, not spectacle.

### Motion Style

- crisp
- light
- responsive
- confidence-building

### Motion Rules

- Use subtle fade and slide-in for sections
- Use small hover lifts on cards and buttons
- Use quick visual feedback on CTA interactions
- Keep durations mostly between `140ms` and `220ms`
- Avoid dramatic parallax, heavy blur transitions, or long cinematic animations

## 8. Responsive Breakpoints

- **Mobile**: `0-639px`
- **Tablet**: `640-1023px`
- **Desktop**: `1024-1439px`
- **Wide**: `1440px+`

### Responsive Rules

- Prioritize mobile readability first
- Hero copy must stay short on mobile
- Navigation should collapse cleanly without hiding the main CTA
- Cards should stack naturally
- Calendar items must remain readable without horizontal scrolling

## 9. Accessibility

Accessibility is required, especially because the site must work for youth, families, and community members on varied devices.

### Rules

- Maintain WCAG-compliant color contrast for text and buttons
- Use visible focus states on all interactive elements
- Keep minimum tap target size at `44x44px`
- Do not rely on color alone to convey meaning
- Use plain language in key public-facing copy
- Support keyboard navigation across nav, cards, newsletter, and calendar actions

## CSS Token Mapping

Use these tokens as the implementation baseline in `webui/src/styles/globals.css`.

```css
:root {
  --background: #f7f6f1;
  --foreground: #142126;
  --primary: #1e6b52;
  --primary-foreground: #f7f6f1;
  --secondary: #dde7dd;
  --secondary-foreground: #142126;
  --accent: #f2a93b;
  --accent-foreground: #142126;
  --muted: #eef1ea;
  --muted-foreground: #586568;
  --border: #c8d2ca;
  --destructive: #b7442a;
  --destructive-foreground: #ffffff;
  --success: #2d7a58;
  --radius: 0.875rem;
}
```

## Final Guardrails

- The site must feel readable in 30 seconds.
- The homepage should never open with a wall of text.
- Every major section should be understandable from its heading alone.
- Practical navigation and ride information matter more than decorative flourishes.
- The emotional tone should be hopeful, active, and inclusive.
