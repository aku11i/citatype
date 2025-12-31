# DakenMania

Typing App for Keyboard fleaks.

## Stack rules
- Core typing library: Typengine (https://github.com/aku11i/typengine)
- Framework: Hono-based full-stack web application
- ES Modules only (latest ESM).
- Rendering: server-side rendering by default
- Prefer standard web tech such as form submissions
- Client JS is implemented with Web Components
- UI: Tailwind CSS with a simple, modern design
- Runtime: Cloudflare Workers in production, Node.js for local development

## Directory structure
```
src/
  app.ts
  handlers/
  ui/
    layouts/
    pages/
    components/
    client-components/ # Web components
```

## Development Principles

- Start small and follow YAGNI: implement only what is required now.
- Keep code DRY: factor repeated logic into appropriately sized functions.
- One file per function or class (types are allowed).
- Internal helper functions may live in the same file when they are module-private.
- After implementation, run `pnpm fix`, `pnpm typecheck`, and `pnpm test`.

## Language policy
All source code, comments, documentation, Issues, and PRs are written in English.
