# Design System

This document serves as the design system manifest for the workspace, providing persistent context for UI development and AI agents. Update the values below to match your project's brand.

## Core Principles

- **Modern & Clean**: Minimalist aesthetic with a strong focus on typography and whitespace.
- **Accessible**: High contrast ratios and clear focus states.
- **Responsive**: Fluid layouts using Flexbox and Grid.

## Colors

### Brand Palette

- **Primary**: `#030213` (Deep Black) — Used for primary actions, text, and main branding.
- **Secondary**: `oklch(0.95 0.0058 264.53)` (Soft Grayish-Blue) — Used for secondary actions and background elements.
- **Accent**: `#e9ebef` (Light Gray) — Used for highlighting and subtle accents.
- **Destructive**: `#d4183d` (Vibrant Red) — Used for errors and destructive actions.

### Semantic Tokens

- **Background**: `#ffffff` (White)
- **Foreground**: `oklch(0.145 0 0)` (Near Black)
- **Muted**: `#ececf0`
- **Muted Foreground**: `#717182`
- **Border**: `rgba(0, 0, 0, 0.1)`
- **Input Background**: `#f3f3f5`

## Typography

### Font Settings

- **Base Font Size**: `16px`
- **Primary Font Family**: Standard system fonts (Inter/Geist preferred if available).
- **Normal Weight**: `400`
- **Medium Weight**: `500`

### Scale

- **h1**: `2xl` (approx. 24px–30px), Weight: Medium, Line-height: 1.5
- **h2**: `xl` (approx. 20px–24px), Weight: Medium, Line-height: 1.5
- **h3**: `lg` (approx. 18px–20px), Weight: Medium, Line-height: 1.5
- **h4**: `base` (16px), Weight: Medium, Line-height: 1.5
- **Body**: `base` (16px), Weight: Normal, Line-height: 1.5

## Spacing & Layout

- **Base Radius**: `0.625rem` (10px)
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
  --primary: #030213;
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.95 0.0058 264.53);
  --secondary-foreground: #030213;
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  --muted: #ececf0;
  --muted-foreground: #717182;
  --accent: #e9ebef;
  --accent-foreground: #030213;
  --destructive: #d4183d;
  --destructive-foreground: #ffffff;
  --border: rgba(0, 0, 0, 0.1);
  --radius: 0.625rem;
}
```

## Component Patterns

### Buttons

- **Variants**:
  - `default`: Primary background, white text.
  - `outline`: Bordered, transparent background, accent hover.
  - `secondary`: Secondary background, primary text.
  - `destructive`: Red background, white text.
  - `ghost`: Transparent background, accent hover.
- **Sizes**: `default` (h-9, px-4), `sm` (h-8), `lg` (h-10).

### Cards

- **Style**: `rounded-xl` (12px radius), `border`, `bg-card`.
- **Structure**: Header, Title, Description, Content, Footer with consistent `px-6` padding.

### Forms

- **Inputs**: `rounded-md`, `bg-input-background`, `border`.
- **Focus**: `ring-ring/50`, `focus-visible:ring-[3px]`.

## Technical Stack

- **Framework**: React (TypeScript)
- **Styling**: Tailwind CSS v4
- **Component Library**: Radix UI primitives (shadcn/ui)
- **Icons**: Lucide React
