# Design System

This document serves as the design system manifest for the workspace, providing persistent context for UI development and AI agents. Update the values below to match your project's brand.

## Core Principles

- **Energetic & outdoors-first**: The site should feel like motion, fresh air, and progression.
- **Confident but welcoming**: Parents need clarity and trust; riders should feel invited, not talked down to.
- **Responsive**: Fluid layouts using Flexbox and Grid with strong mobile readability.

## Colors

### Brand Palette

- **Primary**: `#123c63` (Club Navy) — Main brand color, strong sections, primary actions.
- **Secondary**: `#f2c642` (High-Vis Gold) — Warm contrast used for buttons, highlights, and motion cues.
- **Accent**: `#e65330` (Ride Red) — Energetic emphasis color for callouts and badges.
- **Destructive**: `#b42318` (Signal Red) — Errors and destructive actions.

### Semantic Tokens

- **Background**: `#f7fbff` (Cool daylight white)
- **Foreground**: `#15263d` (Ink navy)
- **Muted**: `#dfe8eb`
- **Muted Foreground**: `#556578`
- **Border**: `rgba(18, 60, 99, 0.14)`
- **Input Background**: `rgba(255, 255, 255, 0.88)`

## Typography

### Font Settings

- **Base Font Size**: `16px`
- **Primary Font Family**: `"Avenir Next", "Segoe UI", "Trebuchet MS", sans-serif`
- **Display Font Family**: `"Iowan Old Style", "Palatino Linotype", "Book Antiqua", serif`
- **Normal Weight**: `400`
- **Medium Weight**: `500`
- **Display Weight**: `600`

### Scale

- **h1**: `2xl` (approx. 24px–30px), Weight: Medium, Line-height: 1.5
- **h2**: `xl` (approx. 20px–24px), Weight: Medium, Line-height: 1.5
- **h3**: `lg` (approx. 18px–20px), Weight: Medium, Line-height: 1.5
- **h4**: `base` (16px), Weight: Medium, Line-height: 1.5
- **Body**: `base` (16px), Weight: Normal, Line-height: 1.5

## Spacing & Layout

- **Base Radius**: `1rem` (16px)
- **Radius Variations**:
  - `sm`: `calc(var(--radius) - 4px)` (6px)
  - `md`: `calc(var(--radius) - 2px)` (8px)
  - `lg`: `var(--radius)` (10px)
  - `xl`: `calc(var(--radius) + 4px)` (14px)
- **Card Padding**: `6` (Tailwind units, approx. 24px)
- **Gap Scaling**: Based on a standard 4px/8px grid.

## Design Tokens (CSS Variables)

These tokens are defined in `webui/src/styles/globals.css` and are the primary source of truth for the styling. Update them to match your brand.

```css
:root {
  --primary: #123c63;
  --primary-foreground: #f8fbff;
  --secondary: #f2c642;
  --secondary-foreground: #14253d;
  --background: #f7fbff;
  --foreground: #15263d;
  --muted: #dfe8eb;
  --muted-foreground: #556578;
  --accent: #e65330;
  --accent-foreground: #fff7f2;
  --destructive: #b42318;
  --destructive-foreground: #ffffff;
  --border: rgba(18, 60, 99, 0.14);
  --radius: 1rem;
}
```

## Component Patterns

### Buttons

- **Variants**:
  - `default`: Club navy background, white text.
  - `outline`: Glassy border treatment for overlays and light CTA use.
  - `secondary`: High-vis gold background with dark navy text.
  - `destructive`: Red background, white text.
  - `ghost`: Transparent background, subtle wash hover.
- **Sizes**: `default` (h-9, px-4), `sm` (h-8), `lg` (h-10).

### Cards

- **Style**: Soft glass cards with generous radius and low-contrast shadows.
- **Structure**: Header, Title, Description, Content, Footer with consistent `px-6` padding.

### Forms

- **Inputs**: `rounded-md`, `bg-input-background`, `border`.
- **Focus**: `ring-ring/50`, `focus-visible:ring-[3px]`.

## Technical Stack

- **Framework**: React (TypeScript)
- **Styling**: Tailwind CSS v4
- **Component Library**: Radix UI primitives (shadcn/ui)
- **Icons**: Lucide React
