# Operations Cockpit Dashboard

A single-screen dashboard for a senior operations manager's 9 a.m. glance-and-go workflow:
today's top 5 action items, system-flagged anomalies, and a live-ticking metric — with a
full English/Hindi toggle, light/dark themes, and desktop/tablet responsive layouts.

## Setup

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/   # Header.jsx, AnomalyPanel.jsx, PriorityList.jsx
  data/         # Mock JSON: actionItems.json, anomalies.json
  i18n/         # strings.json — full bilingual copy dictionary (en/hi)
  utils/        # Utility functions (e.g. formatRelativeTime.js)
  App.jsx
  main.jsx
  index.css
```

## What's Implemented

**Required (per brief):**
- Top 5 priority interventions for today, each with one-line context, a category tag, and
  Approve/Hold actions
- A panel of system-flagged anomalies (mock JSON), sorted by severity then recency, with
  severity-coded left-accent styling driven directly by the data
- A live-ticking metric in the header (Active Shipments count, updating on an interval) plus
  a live clock
- Full bilingual toggle (English/Hindi) — every string in the interface, including buttons,
  toasts, tags, and dynamically loaded content, routes through a single `strings.json`
  dictionary
- Desktop-optimized (1440px), responsive down to tablet (768px–1279px): two-column layout
  collapses to a single stacked column, header/toasts/buttons adapt without horizontal
  overflow at any width in that range
- Tailwind CSS throughout, using a design-token system (not arbitrary hex values) so light
  and dark themes share the same component code

**Stretch goals — not implemented:**
- Keyboard shortcuts (j/k navigate, a approve, h hold)
- Functional low-bandwidth mode 

**Dark mode:**
A genuinely distinct palette rather than an inverted light mode — separate token sets for
light and dark themes (CSS custom properties, switched via a `.dark` class), preserving
correct contrast and severity-color legibility in both.

## Design Decisions

- **Reversible actions over instant removal.** Approve/Hold originally removed a row
  outright, but with only 5 items this made the panel feel sparse after just one or two
  actions and gave no way to correct a misclick. Switched to an in-place "Undo" pattern
  (row mutes, shows what was done, offers Undo) — closer to Gmail's archive/undo model than
  a typical to-do list.
- **SLA-adjacent metric kept as "Active Shipments," not a countdown.** Considered building a
  countdown tied to the most urgent item's SLA deadline for a stronger narrative link between
  the header and the Top 5 list, but decided to prioritize a stable, working metric over the
  added shared-state complexity a countdown would introduce. The current ticking counter
  satisfies the brief's literal requirement (a live, ticking, time-sensitive metric).
- **Anomaly panel simplified to two columns.** Kept the panel to just Details + Detected,
  with detected times shown as human-friendly relative time ("12 min ago") instead of raw
  timestamps — reduces clutter per the "no gimmicks" requirement.
- **View more / View less pagination**, rather than showing all mock items at once, so both
  panels start dense but not overwhelming, with additional items loaded on demand and
  auto-scrolled into view for clear feedback.
- **No sidebar navigation.** This is a single-purpose cockpit, not a multi-page app shell — a
  nav bar would imply destinations that don't exist and contradicts the "one glance, no
  clutter" brief.
- **Light mode defaults on first visit**; the user's toggle choice (light/dark) then persists
  via localStorage across reloads and sessions.

## Known Gaps / Next Steps

- Keyboard shortcuts and low-bandwidth mode (stretch goals) not implemented — would be the
  next additions.
- No backend/persistence beyond localStorage for theme preference — approve/hold/undo state
  resets on page refresh, which is expected for this scope (mock data, no auth).
- The Active Shipments counter is a simulated random walk, not tied to any other panel's
  data — a countdown tied to the most urgent Top 5 item (discussed but not built, see Design
  Decisions above) would be a natural next iteration.

## AI Use Log

AI tools were used throughout this project's development, under my direction and subject to
my review at each stage:

- **Claude** — used to draft the initial PRD from the assignment brief, and to plan the
  build sequence across the 24-hour timeline.
- **Antigravity** — used to implement individual features based on my specifications:
  project scaffolding, layout structure, Top 5 panel logic (approve/hold/undo), anomaly
  panel logic (severity styling, sort order), live metric, light/dark theming, responsive
  breakpoints, and pagination (View more/less).
- **Stitch** — used to generate a visual design reference, which was then translated into
  the project's Tailwind design tokens and component styling.

Each feature was specified, tested in the browser, and verified against the intended design
before being committed. Bug fixes were made by identifying the specific issue through manual
testing and directing a targeted correction.

This log reflects tool usage; design decisions, feature scope, and final review were my own.
