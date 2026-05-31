# TODOS

Deferred work from code and plan reviews. Remove items when they ship.

---

## Discuss with the execs

- **Waiver** — from the Session 2 minutes (ride sign-up: questionnaire + waiver + number/checkmark).
  Decide how a ride sign-up + waiver should work for youth riders (parental consent?), then build it.
- **Review form** — was removed from the redesign for now ("add it when the time comes"). Decide
  when/how families leave reviews and re-add the section with real storage.

## Site follow-ups (from redesign)

- **Branded email** — set up a mailbox on the domain (e.g. `contact@tycctoronto.com` /
  `somename@tycctoronto.com`) and switch the site from `torontoyouthcyclingclub@gmail.com`
  to it (update `site.email` in `webui/src/shared/tycc/content.ts`).
- Swap placeholder stats numbers for the execs' real figures.
- Replace stock hero/gallery photos + add gallery video; add William's photo/bio.
- Discord → calendar bot: pick `/ride` command vs read-posts, then build.
- Routes: wire a Google My Maps embed to hide Google's alternative-route lines.
- Reconcile local `main` with the Google Analytics commits on origin, then push/deploy.
