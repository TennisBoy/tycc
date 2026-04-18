# First Steps: Full Stack

You just scaffolded a full stack project. The `webui/` scaffold is already in place — here is what to do next, in order.

## 1. Install webui dependencies and verify the scaffold

```bash
cd webui && npm install && npm run test && npm run type-check
```

Expected: 3 smoke tests pass, type-check exits 0.

## 2. Update your brand in `DESIGN.md` and `webui/src/styles/globals.css`

`DESIGN.md` at the project root is your design system manifest — update the color palette, typography, and radius to match your brand.

The CSS tokens in `webui/src/styles/globals.css` mirror these values and are the source of truth for Tailwind v4. Update them together.

## 3. Set up `webapi` (backend)

This template assumes the AutoOne stack:
- .NET 10 + ABP Framework 10.0 + PostgreSQL + Redis + OpenIddict

```bash
dotnet build
dotnet run
```

Configure the OIDC authority in `webapi` (OpenIddict) and note the client ID — you'll need it for the webui.

## 4. Configure webui environment and auth

Create `webui/.env.local` (gitignored):

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_CLIENT_ID=YourClientId
VITE_AUTHORITY=https://localhost:6001
```

Update the OIDC scope in `webui/src/oidcConfig.ts` to match your registered scopes.

**`BaseClient` note:** The client reads OIDC tokens from `sessionStorage` and injects them as Bearer headers. If you extend `clearUserCache()`, ensure it calls `sessionStorage.removeItem()` — not `localStorage` (common copy-paste mistake).

## 5. Run codegen to generate typed API interfaces

With `webapi` running:

```bash
# Update the URL in webui/package.json → codegen:products to match your webapi port
cd webui && npm run codegen
```

Generated types land in `webui/src/types/generated/`. Import them in your API hooks.

## 6. Implement your first full-stack feature

1. Entity + App Service in `webapi`.
2. Run `webapi` and `npm run codegen` in `webui`.
3. Create `webui/src/features/<name>/` with `pages/`, `components/`, `hooks/` subdirs.
4. Add a query hook in `webui/src/api/hooks/<name>.ts` using the generated types.
5. Register the route in `webui/src/routes/index.ts`.
6. Verify: `dotnet test` + `npm run test` in `webui`.

## 7. Capture Learnings

Run `complete-the-work` after your first session to seed the workspace memory with your architectural decisions.


## Tech Stack & Conventions

# Claude Code - Full Stack

This file extends `AGENTS.md` with fullstack-specific behavior for the **AutoOne** tech stack.

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite + TanStack Query (recommended) or RTK Query + shadcn/ui.
- **Backend**: .NET 10 + ABP Framework 10.0 + PostgreSQL + Redis + OpenIddict.

## Pre-Scaffolded

`webui/` is pre-scaffolded with the full React stack (see `FIRST-STEPS.md`). Run `cd webui && npm install` to activate it.

## State Management Choice

**TanStack Query (recommended):** No Redux needed. `QueryClient` in `AppProviders`. Domain hooks in `src/api/hooks/` wrap `useQuery`/`useMutation` over a shared `BaseClient`. Use unless you have significant global client-side state beyond server data.

**RTK Query:** Use when you have complex global client-side state. Adds Redux store, provider, and typed hooks alongside RTK Query slices.

## Fullstack Patterns

- **API Hooking**: `webui` depends on `webapi` Swagger. Run `webapi` and then `npm run codegen` in `webui` to generate TypeScript types from the live Swagger.
- **Authentication**: OIDC flow between `webapi` (AuthServer) and `webui` (react-oidc-context). `webui` attaches `Bearer` tokens to requests via `BaseClient`.
- **Unified Domain Language**: Use the same domain names and fields in both layers.
- **Feature Isolation**: ESLint boundaries rule — a feature cannot import from another feature; sharing goes through `src/shared/`.

## Commands

### Backend (`webapi`)
```bash
dotnet build
dotnet run
dotnet test
```

### Frontend (`webui`)
```bash
npm run start
npm run build
npm run test
npm run lint
npm run codegen     # Run with webapi running
```

## Before Submitting

1. Both `dotnet test` and `npm run test` must pass.
2. `npm run type-check` in `webui`.
3. Check for API/UI contract drift.
