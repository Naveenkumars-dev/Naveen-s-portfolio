# Naveenkumar — AI-Powered Developer Portfolio

A dark, futuristic "developer operating system" style portfolio built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.

## Quick start

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Before you deploy — edit one file

Almost everything you need to personalize lives in **`src/data/config.ts`**:

- `email`, `github`, `githubUsername`, `linkedin`, `leetcode`, `resumeUrl`

Set `githubUsername` to your real GitHub handle and the "Code Activity" section will automatically pull your live repositories via the public GitHub API. Until then it shows a clearly-labeled placeholder.

Other editable data files:

- `src/data/projects.ts` — project cards + case-study modal content
- `src/data/skills.ts` — the technology graph nodes and their connections
- `src/data/journey.ts` — the timeline steps and the (currently empty) `achievements` array — add real hackathons/awards here and they'll render automatically
- `src/data/navi.ts` — canned Q&A for the NAVI AI assistant

## Notable interactions

- **Boot sequence** — cinematic loading screen on first load
- **Custom cursor** — dot + ring, with contextual labels (VIEW / CODE / CONNECT / EXPLORE) on project, GitHub, contact, and skill elements
- **NAVI AI** — floating assistant, bottom right, or press **N**
- **Terminal** — press **T**, or the navbar button. Try `whoami`, `skills`, `projects`, `contact`, `github`, `clear`
- **Command palette** — press **/**
- Scroll progress bar, scroll-spy navigation, tilt project cards, hover-linked skills graph, animated timeline

## Notes on data honesty

Per the original brief, no fake stats, testimonials, or achievements were invented:

- The Achievements section ships empty with a friendly "add real entries here" state.
- The Problem Solving (DSA) section uses unlabeled placeholder rings rather than invented percentages — connect a LeetCode profile to make it real.
- Project "Outcome" text describes what was built, not invented metrics.
- All external links (`github`, `linkedin`, project repos/demos) are `#` placeholders — replace them before publishing.

## Stack

React 19 · Vite · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react

Three.js was intentionally left out of the base build to keep the bundle lean and the animations smooth on mid-range devices (the brief asks to avoid 3D effects that hurt performance) — the design achieves the "AI dashboard" feel with CSS/SVG animation, glassmorphism, and Framer Motion instead. If you'd like a true 3D hero (React Three Fiber), that can be layered in on top of this structure.
