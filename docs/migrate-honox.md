# Hono -> Honox Migration Plan

## Goals

- Replace the current Hono app entry with Honox while keeping the existing SSR flow, Web Components, and standard form submissions.
- Preserve current routing behavior, locale handling, and Cloudflare Workers deployment.
- Keep changes incremental (minimize refactors outside routing/bootstrapping).

## References (Honox README)

- Honox provides file-based routing under `app/routes`, a `server.ts` entry via `createApp()`, and route helpers via `createRoute()`.
- Rendering is configured with `_renderer.tsx`, and renderer scope can be nested by directory.
- Middleware can be defined inline on routes or via `_middleware.(ts|tsx)` for a directory subtree.
- Client entry is `app/client.ts` with `createClient()` for islands.
- Cloudflare Workers builds are configured with `@hono/vite-build/cloudflare-workers` and the Cloudflare dev adapter from `@hono/vite-dev-server/cloudflare`.

## Current App Summary

- `src/app.ts` wires global middleware, language detection, and locale-scoped routes under `/:lang`.
- Pages are fully SSR (they render full HTML via `BaseLayout`).
- Web Components are shipped via separate `tsdown` build into `public/client-components` and loaded via `<script type="module" ...>` in the pages.
- Cloudflare Worker entry is `src/worker.ts` exporting the Hono app.

## Proposed Target Structure

- New Honox app root: `app/`
  - `app/server.ts` — Honox entry using `createApp()`.
  - `app/routes/_renderer.tsx` — SSR renderer (keep it minimal so `BaseLayout` can keep owning full HTML).
  - `app/routes/_middleware.ts` — global middleware (`validateBindings`, `applyNoindexForNonProduction`).
  - `app/routes/index.tsx` — `/` root redirect, still using language detection and `handleGetRoot`.
  - `app/routes/robots.txt.ts` — `/robots.txt`.
  - `app/routes/[lang]/_middleware.ts` — locale init (`applyLocale`).
  - `app/routes/[lang]/index.tsx` — localized home.
  - `app/routes/[lang]/play.tsx` — localized play.
  - `app/routes/[lang]/result.tsx` — localized result (GET + POST).
  - `app/global.d.ts` — renderer type definitions if `c.render()` is used.
  - `app/client.ts` — `createClient()` (kept minimal; no islands yet).
- Keep `src/` as-is for domain/UI modules; routes import from `src/...`.

## Migration Steps

1. **Add Honox + Vite plumbing**
   - Add `honox`, `@hono/vite-build`, `@hono/vite-dev-server`, and `vite` (if not already installed).
   - Add `vite.config.ts` with `honox()` and the Cloudflare build/dev adapters.
   - Decide whether to keep Tailwind CLI output in `public/` or move to Vite + `@tailwindcss/vite`.

2. **Create Honox entry + renderer**
   - `app/server.ts` uses `createApp()` and exports the app.
   - If we keep page components returning full HTML, set `_renderer.tsx` to a pass-through renderer to avoid double `<html>` nesting.

3. **Move routes to file-based structure**
   - Replace `src/app.ts` routing with `app/routes` files.
   - Use `_middleware.ts` at root and under `[lang]` for locale handling.
   - Reuse existing handlers and validation utilities (import from `src/handlers/*`).

4. **Align Cloudflare settings**
   - Update `wrangler.toml` to use `dist/index.js` as main and `dist/` for assets.
   - Ensure Vite build outputs static assets and copies `public/`.

5. **Adjust dev/build scripts**
   - Replace `wrangler dev` with `vite` for Honox dev server, while keeping Tailwind + web components watchers.
   - Update `build` to run `vite build --mode client && vite build` plus any existing client-components build.

6. **Validate & refactor tests**
   - Update integration-style tests (if any) to use `createApp()` and file-based routes.
   - Run `pnpm fix`, `pnpm typecheck`, `pnpm test`, and `pnpm capture` (per project rules).

## Open Decisions / Checks

- Decide whether to migrate Tailwind to Vite or keep the current CLI-based pipeline.
- Decide whether to consolidate the HTML layout into `_renderer.tsx` or keep per-page full HTML rendering.

## Risks / Mitigations

- **Double HTML wrapping**: avoid by using a minimal `_renderer.tsx` or by refactoring `BaseLayout` to render only body content.
- **Asset paths in dev/build**: verify that `public/` assets and `client-components` are served correctly by Vite/Workers.
- **Locale routing**: ensure middleware scoping matches the current `/:lang/*` behavior.
