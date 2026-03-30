# Jainish Koladiya - Frontend Developer

A premium-quality submission for the **Visual Page Hierarchy Editor** assignment.

## What this project includes

- React + TypeScript + Vite setup
- React Flow hierarchy canvas
- Dagre-powered automatic vertical layout
- DndKit drag-and-drop reordering inside the **Home** page node
- localStorage save and load
- JSON export + live JSON preview panel
- Tailwind CSS based polished UI
- Vitest test coverage for persistence and export logic

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Flow (`@xyflow/react`)
- Dagre
- DndKit
- Vitest + Testing Library

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Test

```bash
npm run test
```

## Submission checklist

- Add private GitHub repository named: `Jainish Koladiya - Frontend Developer`
- Invite collaborators after the final rename:
  - `bsf-zanev`
  - `patilvikasj`
  - `neerajmasai`
  - `sandeshjangam`
- Deploy to Vercel or Netlify
- Add deployed URL to README
- Add demo video URL to README
- Email repository link, deployment link, and video URL to `join@bsf.io`

## Suggested demo flow for your video

1. Open the app and explain the hierarchy levels
2. Show the Home node draggable section list
3. Reorder sections
4. Save to localStorage
5. Refresh and load saved structure
6. Export JSON and show the preview panel
7. Briefly show tests running

## Notes

This implementation intentionally keeps the page tree static, because the assignment defines a fixed hierarchy. The interactive part is focused on the homepage section ordering, persistence, and export experience.