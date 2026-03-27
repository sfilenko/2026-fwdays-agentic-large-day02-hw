# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Excalidraw is a monorepo containing an open-source virtual hand-drawn style whiteboard. It consists of:
- **`excalidraw-app/`** — The standalone web application (excalidraw.com)
- **`packages/excalidraw/`** — The npm-published React component (`@excalidraw/excalidraw`)
- **`packages/common/`**, **`packages/element/`**, **`packages/math/`**, **`packages/utils/`** — Internal sub-packages

Package manager: Yarn workspaces (Yarn 1.22.x, Node >=18)

## Commands

```bash
# Development
yarn start                # Dev server for excalidraw-app (port 3001)

# Building
yarn build                # Build excalidraw-app
yarn build:packages       # Build all npm packages

# Testing
yarn test:app             # Run vitest tests
yarn test:typecheck       # TypeScript type checking
yarn test:code            # ESLint (0 warnings tolerance)
yarn test:other           # Prettier formatting check
yarn test:all             # Run all of the above

# Run a single test file
yarn test:app path/to/file.test.ts

# Fixing
yarn fix                  # Run ESLint + Prettier with auto-fix

# Coverage
yarn test:coverage        # Tests with coverage report
```

## Architecture

### Monorepo Package Dependency Chain
```
excalidraw-app
  └── @excalidraw/excalidraw (packages/excalidraw)
        ├── @excalidraw/common
        ├── @excalidraw/element
        ├── @excalidraw/math
        └── @excalidraw/utils
```

### Key Architectural Patterns

**State Management**: Jotai atoms for global state. The app enforces that jotai imports go through app-specific modules (not imported from jotai directly in components) — enforced via ESLint rules.

**Build System**: Vite for the app, esbuild for packages. Package builds run via `scripts/buildPackage.js`.

**Rendering**: Canvas-based rendering with roughjs for hand-drawn aesthetics and perfect-freehand for smooth drawing.

**Collaboration**: Socket.io WebSockets + Firebase. End-to-end encryption for shared links.

**App Entry Points**:
- App: `excalidraw-app/App.tsx`
- Component: `packages/excalidraw/index.tsx`

## TypeScript & Code Style

- Strict TypeScript throughout; path aliases `@excalidraw/*` map to package sources via `tsconfig.json`
- Prefer immutable data (`const`, `readonly`)
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- PascalCase for components/interfaces/types, camelCase for functions/variables, ALL_CAPS for constants
- CSS modules for component styling (SCSS in `packages/excalidraw/css/`)
- No anonymous default exports (ESLint enforced)
- Use consistent type imports (`import type { ... }`)

## Math Code

When writing math-related code, always use the `Point` type from `packages/math/src/types.ts` instead of plain `{ x, y }` objects.

## Testing

Run `yarn test:app` after modifications and fix reported issues. Coverage thresholds: lines 60%, branches 70%, functions 63%, statements 60%.

## Embedding the Component (Next.js / SSR)

- Wrap in `"use client"` and use `dynamic(..., { ssr: false })`
- Start with plain `<Excalidraw />` in a `100vh` container
- If canvas is blank, check CSS import and parent container height
- Don't set `window.EXCALIDRAW_ASSET_PATH` unless self-hosting fonts