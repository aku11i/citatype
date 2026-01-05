# Citatype

Calm, focused typing practice for keyboard enthusiasts.

## Overview

Citatype is a minimal typing app built on Hono and Cloudflare Workers. Pages are server-rendered by default, while the typing session itself is powered by small, framework-free Web Components. Sentence packs are validated at startup and randomly sampled per session to keep runs fresh.

## Features

- English and Japanese typing sessions with locale-aware routing (`/en`, `/ja`).
- Randomized sentence packs using cryptographically secure shuffling.
- Typing session with live progress, miss feedback, and auto-submit on completion.
- Elapsed timer and result summary.
- Focus Island design system (see `docs/design-system.md`).
- Production-safe robots behavior (noindex in local/preview environments).

## Tech Stack

- Hono (SSR) on Cloudflare Workers, Node.js for local development.
- Typengine for typing logic.
- Tailwind CSS for styling.
- Web Components for client-side interactivity.
- Valibot + @hono/standard-validator for runtime validation.

## Development

Install dependencies:

```bash
pnpm install
```

Run the local dev stack (Worker + Tailwind + client components):

```bash
pnpm dev
```

Build assets:

```bash
pnpm build
```

## Testing

```bash
pnpm test
```

Additional test options:

```bash
pnpm test:core
pnpm test:browser
pnpm test:a11y
pnpm test:visual
pnpm capture
```

## Design System

The UI follows the Focus Island design system described in `docs/design-system.md`.
