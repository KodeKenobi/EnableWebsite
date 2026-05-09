# Enable Technologies

Single-page marketing experience and supporting routes (news, disclaimers, internal **Learn** tools), built with **React**, **Vite**, **TypeScript**, **Tailwind CSS v4**, and **Sanity** for structured content.

This document is the **single source of truth** for architecture decisions, shared patterns, reusability expectations, git workflow, branching, naming, and deployment—unless a topic is explicitly delegated elsewhere (for example Sanity’s own docs for studio-only behavior).

---

## Contents

- [Project philosophy](#project-philosophy)
- [Core principle](#core-principle)
- [Tech stack](#tech-stack)
- [Repository layout](#repository-layout)
- [Local development](#local-development)
- [Environment variables](#environment-variables)
- [Build, typecheck, and lint](#build-typecheck-and-lint)
- [Architecture decisions](#architecture-decisions)
- [Shared logic patterns](#shared-logic-patterns)
- [Reusability expectations](#reusability-expectations)
- [Naming conventions](#naming-conventions)
- [Routing](#routing)
- [Styling and design tokens](#styling-and-design-tokens)
- [Sanity CMS](#sanity-cms)
- [Learn (internal)](#learn-internal)
- [Git workflow and branching](#git-workflow-and-branching)
- [Deployment flow](#deployment-flow)
- [Security and secrets](#security-and-secrets)

---

## Project philosophy

We optimize for **coherent systems** over novelty: one way to do things by default, with deliberate exceptions when they pay off.

## Core principle

**Favor extending and improving existing systems before introducing new ones.**

When implementing features, first take time to:

- understand the current architecture,
- explore existing patterns,
- identify reusable logic,
- and maintain consistency across the codebase.

Before creating a new:

- utility,
- component,
- hook,
- service,
- abstraction,
- provider,
- state store,
- API pattern,
- styling pattern,
- folder structure,
- architecture layer,
- dependency,
- or convention,

consider whether the problem can be solved cleanly using existing systems.

New abstractions are encouraged when they:

- meaningfully improve maintainability,
- reduce long-term complexity,
- improve scalability,
- improve developer experience,
- or solve limitations in the current architecture.

Avoid introducing parallel patterns or duplicate systems unless there is a clear architectural benefit. That said, ideas are always welcome and suggestions, we are a team.

---

## Tech stack

| Area | Choice | Notes |
|------|--------|------|
| UI | React 19 | Functional components; `react-router-dom` v6 for routing |
| Build | Vite 8 | Production bundle to `dist/`; Rolldown-backed pipeline |
| Language | TypeScript 6 | Project references via `tsc -b`; path alias `@/` → `src/` |
| Styling | Tailwind CSS 4 | `@import "tailwindcss"` in `src/index.css`; shadcn-style tokens under `@theme` / `:root` |
| Motion | Framer Motion, GSAP, Motion | Use consistent easing typings where variants touch Motion (`ease` as literal / `as const` when needed) |
| 3D / GL | Three.js, R3F, drei, postprocessing | Heavy sections isolated; lazy-load where practical |
| CMS | Sanity | Browser read via `@sanity/client`; GROQ in `src/lib/news.ts` etc. |
| UI primitives | shadcn (Base UI) | `components.json`; `cn()` from `src/lib/utils.ts` |
| Icons | Lucide (primary), react-icons | Match existing section usage |

---

## Repository layout

```
NewSite/
├── src/
│   ├── App.tsx                 # Route table
│   ├── main.tsx                # BrowserRouter + root
│   ├── index.css               # Tailwind + @theme + global utilities
│   ├── App.css                 # App-level styles
│   ├── components/
│   │   ├── animations/         # backgrounds, interactive, motionUi, textAnimations
│   │   ├── sections/          # Full-page sections (Hero, Services, …)
│   │   ├── pageSections/      # Composable page blocks (e.g. PartnersBand, ClientsBand)
│   │   ├── navigation/
│   │   ├── news/
│   │   ├── ui/                # shadcn-compatible primitives (buttons, etc.)
│   │   └── …
│   ├── constants/             # Nav items, product metadata, etc.
│   ├── hooks/                 # Shared hooks (colocate until reuse is real)
│   ├── learn/                 # Learn registry, previews, animation resolution
│   ├── lib/                   # Sanity client, GROQ helpers, `cn`
│   └── pages/                 # Route-level pages + learn shells
├── sanity-studio/             # Separate package: Sanity Studio (schemas, deploy)
├── cms-examples/              # Example NDJSON / JSON for content shape reference
├── public/                    # Static assets
├── vite.config.ts             # `@` alias → `./src`
├── tsconfig.app.json          # Path mapping `@/*`
├── components.json            # shadcn CLI config
└── package.json
```

**Boundaries**

- **`pages/`** — Routing concerns; compose **`sections/`** and domain folders.
- **`sections/`** — Marketing “strip” modules (home scroll story, news strip, etc.).
- **`pageSections/`** — Reusable **templates** for Solutions-style or inner pages (bands, rails); pair with Learn previews when adding variants.
- **`learn/`** — Internal-only documentation UI; not a second public product surface without an explicit decision.

---

## Local development

**Requirements:** Node.js LTS (match team standard), npm.

```bash
npm install
cp .env.example .env
# Fill VITE_SANITY_* as needed (see below)
npm run dev
```

Vite serves the app with HMR. **Learn** is at `/learn` (redirects to `/learn/handbook`, the README playbook).

**Sanity Studio** (optional, for editors):

```bash
cd sanity-studio
npm install
npm run dev
```

---

## Environment variables

Defined in **`.env`** (not committed) and documented in **`.env.example`**.

| Variable | Required for CMS | Purpose |
|----------|------------------|---------|
| `VITE_SANITY_PROJECT_ID` | Yes, for live news | Sanity project |
| `VITE_SANITY_DATASET` | Yes | Dataset name |
| `VITE_SANITY_API_VERSION` | Recommended | Dated API version (e.g. `2024-01-01`); avoid far-future dates for CDN stability |
| `VITE_SANITY_TOKEN` | Only if dataset is private / browser needs auth | Viewer token; when set, CDN mode is disabled in client config |

Sanity wiring: `src/lib/sanity.ts` (`sanityConfigured`, `sanityClient`, `urlForImage`).

---

## Build, typecheck, and lint

| Script | Command | Purpose |
|--------|---------|---------|
| Develop | `npm run dev` | Vite dev server |
| Production build | `npm run build` | `tsc -b` then `vite build` → `dist/` |
| Preview build | `npm run preview` | Serves `dist` locally |
| Lint | `npm run lint` | ESLint |

**Typecheck only:** `npx tsc -b`.

There is **no `.github/workflows` directory in-repo yet**; add CI when ready. Minimum bar before merge: **`npm run build`** passes.

---

## Architecture decisions

Challenge these in PR if needed; do not bypass silently.

1. **SPA, client-side routing** — `BrowserRouter` in `main.tsx`. Home deep links use hash anchors (`/#section`) where implemented.

2. **Static hosting for the Vite app** — Ship `dist/` to Netlify, Vercel, S3+CloudFront, Azure Static Web Apps, etc.

3. **Sanity for editorial content** — GROQ from the browser when `sanityConfigured`; graceful behavior when unset.

4. **Path alias `@/`** — Imports use `@/...` per `components.json` and `tsconfig`; avoid long `../../` chains.

5. **Learn stays in sync with the filesystem** — `SITE_PARTS` for sections; `import.meta.glob` for `animations/**/*.tsx`. Renames/moves change Learn URLs.

6. **Animation folders** — `components/animations/{backgrounds,interactive,motionUi,textAnimations}/`, PascalCase files. New top-level categories: update `CATEGORY_ORDER` in `src/learn/animationDiscovery.ts` for sidebar order.

7. **Framer Motion typings** — Use easing literals or `as const` so variants match Motion’s `Transition` types.

8. **Sandpack** — `@codesandbox/sandpack-react` is required for `ParagraphSlide`, `WordByWord`; do not drop the dependency without replacing those UIs.

---

## Shared logic patterns

### `cn()` — Tailwind class merging

`src/lib/utils.ts`: `clsx` + `tailwind-merge`. Use for conditional classes.

### Sanity images

Check `sanityConfigured` / `sanityClient`; use `urlForImage()` instead of hand-built CDN URLs.

### GROQ + TypeScript

News queries and types: **`src/lib/news.ts`**. New document types: update `sanity-studio` schema, then GROQ and exported types here.

### Learn — animations

- **`animationDiscovery.ts`** — Glob `../components/animations/**/*.tsx`.
- **`resolveAnimationModule.ts`** — Default vs named export resolution.
- **`animationPreviewOverrides.tsx`** — Slug-specific preview tweaks.

### Learn — site sections

**`siteComponentsRegistry.tsx`** — `SITE_PARTS`: `{ id, label, description, Preview }`. New previews: optional wrapper component, **`kebab-case` `id`**.

### Navigation

**`constants/headerNav.ts`** — In-page links use **`/#...`** so they work from routes like `/news`.

---

## Reusability expectations

1. **Extract after the second real use** — First use may be inline; refactor when duplication is meaningful.

2. **Props over copies** — e.g. one `PartnersBand` with `layout: 1 | 2 | 3 | 4`, not four separate components.

3. **Colocate until shared** — Move to `src/lib` or `src/hooks` at two call sites or when tests require it.

4. **Design tokens** — Prefer `var(--color-*)` / `var(--font-*)` from `index.css` over new raw colors in JSX.

5. **Learn parity** — Template-level UI the team reviews in isolation should register in `SITE_PARTS`.

6. **Single CMS source of truth** — Schema in Sanity, not duplicate JSON fields elsewhere.

---

## Naming conventions

| Kind | Convention | Example |
|------|------------|---------|
| React files | PascalCase | `HeroSection.tsx` |
| Hooks | `use` + camelCase | `useScrollLock.ts` |
| Utilities | camelCase | `animationDiscovery.ts` |
| Route / Learn ids | kebab-case | `partners-templates` |
| GROQ constants | SCREAMING_SNAKE | `NEWS_POST_DETAIL_QUERY` |
| Imports | `@/` alias | `@/components/sections/HeroSection.tsx` |

---

## Routing

From `src/App.tsx`:

| Path | Page |
|------|------|
| `/` | Home |
| `/news` | News list |
| `/news/:slug` | Article |
| `/disclaimers` | Disclaimers |
| `/learn` | → `/learn/handbook` |
| `/learn/handbook` | Team handbook (renders `README.md` in the Learn portal) |
| `/learn/components/:componentId` | Component catalog |
| `/learn/animations` | Animation index |
| `/learn/animations/:slug` | One animation |

---

## Styling and design tokens

- **`@theme`** — Brand palette (`--color-bg`, `--color-fg`, `--color-primary-blue`, …).
- **`:root`** — shadcn OKLCH semantic tokens (`--card`, `--primary`, …) for UI primitives.

Reuse utilities like `type-kicker`, `section-title-type`, `section-pad` from `index.css` before adding one-off type scales.

---

## Sanity CMS

- **Studio:** `sanity-studio/` — `npm run dev`, `npm run build`, `npm run deploy`.
- **Schemas:** `sanity-studio/schemaTypes/`.
- **Sample data:** `cms-examples/`.
- **Browser:** read-only; no write tokens in the app bundle.

---

## Learn (internal)

Documentation-style layout: **persistent left navigation** (outline + components + animations) and a **white content column** on the right, similar to GitHub Docs / Microsoft Learn. The README is rendered from **`README.md?raw`** at build time (`src/learn/handbookMarkdownSource.ts`); heading IDs power the “In this article” outline.

Live section previews + glob-discovered animation modules for design/engineering alignment.

- Handbook: `src/pages/learn/LearnHandbookPanel.tsx` + `src/pages/learn/learnHandbookMarkdown.tsx`; outline: `getHandbookToc()` in `src/learn/handbookDocUtils.ts`.
- Components: `SITE_PARTS` in `src/learn/siteComponentsRegistry.tsx`.
- Animations: every `*.tsx` under `src/components/animations/**` (except non-component files—follow existing patterns).

**Slug:** `{category}-{ComponentName}` (see `animationDiscovery.ts`).

---

## Git workflow and branching

**Team defaults** (override with org policy if needed):

1. **Default branch** — `main` (align with remote).
2. **Branches** — `feature/…`, `fix/…`, `chore/…` for scope clarity.
3. **Pull requests** — Required to default; include purpose, UI screenshots, env/schema notes.
4. **Commits** — Small, logical; imperative subject (`Add Learn preview for ClientsBand`); Conventional Commits optional.
5. **History** — Rebase or merge by team preference; no force-push to shared branches.
6. **Before merge** — `npm run build`, no secrets, update `.env.example` when new `VITE_*` vars appear.

---

## Deployment flow

**Front-end**

1. Configure host env vars (same names as `.env.example`).
2. `npm ci` (or `npm install`).
3. `npm run build`.
4. Upload **`dist/`**.
5. **SPA fallback:** all routes → `index.html`.

**Sanity Studio**

- `sanity-studio`: build or `sanity deploy` per Sanity hosting.

**Release order**

- If the release needs new schema fields, ship Sanity (and content) before or with the web deploy; render defensively for optional fields.

---

## Security and secrets

- Do not commit **`.env`**.
- **`VITE_*`** is public in the browser—never service roles or private API keys.
- Sanity: viewer/read tokens in the client only when required; write access stays in Studio or server code.

---

## Troubleshooting

| Issue | What to check |
|-------|----------------|
| Missing `@codesandbox/sandpack-react` | `npm install` in project root |
| No news | `VITE_SANITY_*` and `sanityConfigured` |
| Animation not in Learn | Path `animations/<category>/<Name>.tsx` |
| Motion `ease` type errors | `as const` or cubic-bezier tuple |

---

*Keep this README updated when workflows or architecture change.*
