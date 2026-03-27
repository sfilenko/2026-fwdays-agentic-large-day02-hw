# Active Context

> Last updated: 2026-03-28 (session 12)
> Related: [progress.md](progress.md) | [decisionLog.md](decisionLog.md) | [PRD](../product/PRD.md) | [architecture](../technical/architecture.md) | [undocumented-behavior](../technical/undocumented-behavior.md)

## Current focus

Agentic tooling rules and docs refined for accuracy; AGENTS.md expanded. Awaiting first implementation task.

## What was just done

Session 12 — rule accuracy pass + doc improvements:

- `.cursor/rules/do-not-touch.mdc` — narrowed `globs` from broad `packages/excalidraw/**` to the 4 exact protected file paths
- `.cursor/rules/memory-bank.mdc` — replaced `globs: "**/*"` with targeted patterns; added Excalidraw-specific update triggers (renderer, action system, element mutations)
- `.cursor/rules/module-common.mdc` — corrected "no upward imports" rule; code-verified that `packages/common` legitimately imports from `@excalidraw/math` (values) and `@excalidraw/element/types` + `@excalidraw/excalidraw/types` (type-only)
- `.cursor/rules/module-element.mdc` — clarified immutability contract (external immutable / `mutateElement()` for internal); tightened grep checks
- `.cursor/rules/module-math.mdc` — corrected `Point` → `GlobalPoint`/`LocalPoint` (verified `packages/math/src/types.ts`; `Point` does not exist as a standalone type)
- `.cursor/rules/module-utils.mdc` — added explicit scope, dependency constraints, example exports, concrete verify commands
- `.cursor/rules/testing.mdc.off` — deleted (dead duplicate of `conventions.mdc`)
- `.cursor/commands/code-review.md` — added `7. Excalidraw-specific` section (canvas 2D, element immutability, SVG sanitization, action dispatch, E2E encryption) + matching checklist items
- `.cursor/skills/codebase-explore/SKILL.md` — expanded with monorepo layout, render pipeline, element type hierarchy, key React component table
- `.cursor/skills/repomix-reference-.../SKILL.md` — added `text` language tags to 3 unlabeled code fences
- `.cursor/skills/repomix-reference-.../references/tech-stack.md` — added trailing newline
- `.cursorrules` — corrected `Point` → `GlobalPoint or LocalPoint`
- `AGENTS.md` — removed invalid `<CodeBlockWrapper>` Vue tag; added `## Tech Stack` table (React 17/18/19, TS 5.9.3, Vite 5.0.12, Vitest 3.0.6, esbuild 0.19.10, Yarn 1.22.22); added `## Conventions`; added `## Do-Not-Touch / Constraints`; fixed code block language tags

Session 11 — rule validation and A/B testing:

- `docs/validation/ab-conventions-rule.md` — A/B test of `conventions.mdc` "named exports only" rule. Finding: 65 `export default` violations exist in internal components; ESLint does not enforce the rule there. Rule holds at public API boundary only.
- `docs/ABResult/A/element-coordinates.tsx` — component generated with `architecture.mdc` rule ON: `actionManager`, named export, `NonDeletedExcalidrawElement`, no `any`
- `docs/ABResult/B/element-coordinates.tsx` — component generated with `architecture.mdc` rule OFF: `useState`, default export, `[key: string]: any`, no undo/sync
- `docs/ABResult/comparison.md` — side-by-side comparison across state management, export style, type safety, conventions. Conclusion: rule is effective — without it AI produces idiomatic-but-wrong React code that bypasses undo/redo and collaboration sync.
- `.cursor/commands/code-review.md` and `create-component.md` — two Cursor commands added

Session 10 — agentic tooling scaffolding:

- `.cursor/rules/` — 11 rule files created with **How to verify** sections
- `.cursor/skills/` — 4 skills; `.claude/rules/` + `.claude/skills/` mirrored; `.agents/` for lecturer compatibility

## Active decisions

- `docs/memory/` files are capped at ~200 lines — they are loaded every session; keep them scannable, not exhaustive.
- `docs/memory/decisionLog.md` holds only 6 undocumented-behavior entries (active findings); pre-2026 architectural decisions are in `docs/technical/decisionLog-archive.md`.
- `docs/technical/` and `docs/product/` files are reference docs — longer is fine, depth over brevity.
- All docs are facts-only, source-verified — no assumptions or inferred behavior without a cited file/line.
- Memory Bank files cross-reference each other via relative Markdown links, not plain text.

## In progress (not finished)

- **Workshop PR** — open; review follow-up fixes applied (commit `90d52b7`); awaiting review outcome.
- **Implementation work** — not yet started; awaiting direction after PR review.
- **Agentic tooling** — rules and skills scaffolded and accuracy-corrected; `testing.mdc.off` deleted (was dead duplicate).

## Known issues & open questions

*Issues*:
- `docs/memory/techContext.md` and `systemPatterns.md` were modified by the user after creation (cross-reference links added at top) — treat user edits as authoritative, do not overwrite.
- `frame.test.tsx` FIXME: frame detection passes in browser, fails in jsdom — root cause unknown, do not attempt to fix without more context.
- Arrow label version-bump test (`textWysiwyg.test.tsx:335`) is non-deterministically flaky — do not mark as fixed without a reproducible root cause.
- `fixBindingsAfterDuplication()` uses `Object.assign` bypassing `mutateElement()` — latent collaboration bug: binding ref updates on duplicated elements may not propagate to remote clients (version not bumped). See `decisionLog.md` — Object.assign binding bypass entry.

*Questions* (also tracked in [docs/product/PRD.md](../product/PRD.md) Open Questions):
- Q-1: Minimum supported browser version — check `excalidraw-app/vite.config.ts` `build.target` — Owner: Engineering Lead.
- Q-2: Maximum acceptable gzipped bundle size for `@excalidraw/excalidraw` — Owner: Engineering Lead.
- Q-3: Collaboration server encryption — Owner: Infrastructure.
- Q-4: PRD scope — reverse-engineered vs. new work — Owner: Workshop Facilitator/PM.

## Next steps

1. ✓ `.cursorignore` created (copied from `.claudeignore`) — committed `ad88a75`.
2. ✓ Doc audit pass complete — all reference docs corrected against source.
3. ✓ Workshop PR opened; review follow-up fixes applied (commit `90d52b7`).
4. Identify the first implementation task — needs user direction after PR review; no feature code changed yet.
5. Run `yarn test:all` to establish a clean baseline before any code changes.

## Context that expires

- `yarn.lock` has an unstaged modification (last observed: 2026-03-26) — check before running `yarn install` or adding dependencies; root cause not yet investigated.
- Feature flag system exists at `packages/common/src/utils.ts:1282` (`FEATURE_FLAGS` type, `getFeatureFlag`/`setFeatureFlag`); one defined flag: `COMPLEX_BINDINGS: false` (disabled by default). No `tempWorkaround`, `WORKAROUND`, or `isWorkaroundActive` identifiers found in `.ts`/`.tsx` files (searched 2026-03-26).
