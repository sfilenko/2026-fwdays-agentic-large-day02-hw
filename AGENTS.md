# AGENTS.md

## Project Structure

Excalidraw is a **monorepo** with a clear separation between the core library and the application:

- **`packages/excalidraw/`** - Main React component library published to npm as `@excalidraw/excalidraw`
- **`excalidraw-app/`** - Full-featured web application (excalidraw.com) that uses the library
- **`packages/`** - Core packages: `@excalidraw/common`, `@excalidraw/element`, `@excalidraw/math`, `@excalidraw/utils`
- **`examples/`** - Integration examples (NextJS, browser script)

## Development Workflow

1. **Package Development**: Work in `packages/*` for editor features
2. **App Development**: Work in `excalidraw-app/` for app-specific features
3. **Testing**: Always run `yarn test:update` before committing
4. **Type Safety**: Use `yarn test:typecheck` to verify TypeScript

## Tech Stack

| Tool | Version |
|------|---------|
| React | 17 / 18 / 19 (peer dep) |
| TypeScript | 5.9.3 |
| Vite | 5.0.12 |
| Vitest | 3.0.6 |
| esbuild | 0.19.10 |
| Yarn | 1.22.22 |

## Conventions

- **PascalCase** for component files and types: `LayerUI.tsx`, `AppState`
- **kebab-case** for utility/module files: `element-utils.ts`, `collision.ts`
- Prefer `type` over `interface` for type aliases
- Named exports only — no default exports
- Strict TypeScript: no `any`, no `@ts-ignore`
- CSS Modules (SCSS) for component styling

## Development Commands

```bash
yarn test:typecheck  # TypeScript type checking
yarn test:update     # Run all tests (with snapshot updates)
yarn fix             # Auto-fix formatting and linting issues
```

## Memory Bank

Project documentation lives in `docs/` and is organized into three areas:

```text
docs/
├── memory/          # Session context — read these at the start of every task
│   ├── activeContext.md    # Current focus, active decisions, next steps
│   ├── decisionLog.md      # Undocumented behavior decisions with rationale
│   ├── progress.md         # Milestones completed and discovered work items
│   ├── projectbrief.md     # Project overview and package dependency order
│   ├── systemPatterns.md   # Architectural patterns and design rules
│   ├── techContext.md      # Runtime versions, dependencies, build/test commands
│   └── productContext.md   # Product purpose, target users, success metrics
├── product/         # Product reference docs (PRD, domain glossary, launch plan)
└── technical/       # Technical reference (architecture, dev-setup, decision archive)
```

### Memory Bank Usage

- **Always read `docs/memory/` before starting a task** to pick up current context without re-exploring the codebase.
- **Update memory files when facts change**: new decisions go in `decisionLog.md`, completed milestones go in `progress.md`, pattern discoveries go in `systemPatterns.md`.
- All docs are **facts-only and source-verified** — include file/line citations when recording new findings.
- Keep each memory file under ~200 lines; archive stale entries to `docs/technical/decisionLog-archive.md`.

## Do-Not-Touch / Constraints

The following files require explicit approval before modification. Changes must be accompanied by a full test suite run and manual QA:

| File | Reason |
|------|--------|
| `packages/excalidraw/scene/renderer.ts` | Core render pipeline — breakage affects all drawing |
| `packages/excalidraw/data/restore.ts` | File-format compatibility — breakage corrupts saved files |
| `packages/excalidraw/actions/manager.ts` | Action system — all state mutations flow through here |
| `packages/excalidraw/types.ts` | Core types — changes ripple across the entire codebase |
| `docs/memory/*` | Session context — update only via the Memory Bank workflow |
| `package.json` / `yarn.lock` | Dependency manifest — changes require security review |

## Architecture Notes

### Package System

- Uses Yarn workspaces for monorepo management
- Internal packages use path aliases (see `vitest.config.mts`)
- Build system uses esbuild for packages, Vite for the app
- TypeScript throughout with strict configuration
