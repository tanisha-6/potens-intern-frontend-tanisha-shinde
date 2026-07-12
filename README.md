# Operations Cockpit Dashboard

A single-screen ops dashboard: today's top 5 action items, flagged anomalies, and a live
ticking metric — built for a 9 a.m. glance-and-go workflow. Full English/Hindi toggle.

## Setup

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/   # UI components (ActionItems, AnomalyPanel, LiveMetric, Header, etc.)
  data/         # Mock JSON: actionItems.json, anomalies.json
  i18n/         # strings.json — bilingual copy dictionary (en/hi)
  hooks/        # custom hooks (e.g. useInterval, useKeyboardShortcuts)
  App.jsx
  main.jsx
  index.css
```

## Design Decisions

<!-- Fill in as you build. Examples of what to cover: -->
- Why two-column layout, no sidebar nav
- Why Hindi as the second language
- What metric is "live" and why
- What was cut and why, if anything, under the 24h timebox

## Next Steps / Known Gaps

<!-- e.g. localStorage persistence for approve/hold state, dark mode contrast pass, etc. -->

## AI Use Log

<!-- Be honest and specific. Example format: -->
- Used Claude to generate the initial PRD and project scaffold (Vite + Tailwind config, folder
  structure, mock JSON, i18n skeleton).
- Used Claude to draft/debug [components/features] — describe what was AI-authored vs.
  hand-written or hand-edited.
- Used [tool] for [specific task].
