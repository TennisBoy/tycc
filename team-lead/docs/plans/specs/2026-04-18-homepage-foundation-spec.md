# Homepage Foundation Spec

Date: 2026-04-18
Project: `tycc`
Status: Approved for execution

## Goal

Turn the blank fullstack scaffold into a credible first public-facing homepage for Toronto Youth Cycling Club.

## Problem

The repository currently exposes only the generated frontend shell. There is no project voice, no visual identity, and no user-facing content that explains what TYCC is or what visitors should do next.

## Scope

In scope:
- A single homepage route in `webui/`
- Brand direction for colors, typography, and visual tone
- Clear sections for mission, programs, ride experience, and a join/contact call to action
- Supporting updates to root docs that stop advertising the repo as a blank scaffold

Out of scope:
- Backend setup
- CMS/admin tools
- Member registration flows
- Event calendar integration
- Authentication-protected pages

## Audience

- Parents evaluating youth cycling programs
- Youth riders looking for a club community
- Volunteers or coaches interested in helping

## Experience Requirements

- The homepage should feel energetic, outdoors-oriented, and youth-focused without looking childish.
- The hero should explain the club in one glance and provide a next step.
- The page should scan well on mobile and desktop.
- The design tokens should move away from the generic scaffold defaults.

## Content Structure

1. Hero: club positioning, short summary, primary actions
2. Program highlights: what riders get from the club
3. Weekly rhythm: how a typical TYCC season or week feels
4. Community values: safety, progression, confidence, belonging
5. Join/contact call to action

## Acceptance Criteria

- Visiting `/` renders a real homepage instead of an empty route registry
- The homepage includes TYCC-specific copy and at least four meaningful sections
- `DESIGN.md` and `webui/src/styles/globals.css` reflect the same brand direction
- The scaffolded project docs no longer present the project as undefined
