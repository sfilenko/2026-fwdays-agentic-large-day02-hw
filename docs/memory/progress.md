# Progress

> Last updated: 2026-03-28 (session 12)
> Related: [activeContext.md](activeContext.md) | [decisionLog.md](decisionLog.md) | [PRD](../product/PRD.md) | [dev-setup](../technical/dev-setup.md)

## Completion snapshot

All Workshop PR deliverables complete (Memory Bank, PRD, `.cursorignore`, `.claudeignore`). Doc audit pass complete (session 6). PR opened (2026-03-26); review follow-up fixes applied (commit `90d52b7`). Implementation work not yet started.
Status: On track

---

## Done

**Rule accuracy pass (session 12)**
- [x] `do-not-touch.mdc` — globs narrowed to 4 exact protected file paths
- [x] `memory-bank.mdc` — globs scoped; Excalidraw-specific update triggers added
- [x] `module-common.mdc` — rule corrected to match actual cross-package deps (verified in source)
- [x] `module-element.mdc` — immutability contract clarified; grep checks tightened
- [x] `module-math.mdc` — `Point` → `GlobalPoint`/`LocalPoint` (verified types.ts)
- [x] `module-utils.mdc` — scope, deps, example exports, concrete verify commands added
- [x] `testing.mdc.off` — deleted (dead duplicate of conventions.mdc)
- [x] `code-review.md` — Excalidraw-specific section + checklist items added
- [x] `codebase-explore/SKILL.md` — monorepo layout, render pipeline, element types, component table added
- [x] `repomix-reference SKILL.md` — 3 unlabeled code fences fixed (`text`)
- [x] `tech-stack.md` — trailing newline added
- [x] `.cursorrules` — `Point` → `GlobalPoint or LocalPoint` corrected
- [x] `AGENTS.md` — invalid `<CodeBlockWrapper>` removed; Tech Stack table, Conventions, Do-Not-Touch sections added; code block language tags fixed
- [x] `.cursorrules` — generated from `.cursor/rules/*.mdc` (legacy Cursor format)

**Rule validation**
- [x] `docs/validation/ab-conventions-rule.md` — A/B test of `conventions.mdc`; finding: rule is aspirational for internal files, enforced only at public API boundary
- [x] `docs/ABResult/comparison.md` — A/B test of `architecture.mdc` via "Create element coordinates component" prompt; rule proven effective at preventing wrong state management patterns
- [x] `docs/ABResult/A/element-coordinates.tsx` — rule-compliant implementation (actionManager, named export, strict types)
- [x] `docs/ABResult/B/element-coordinates.tsx` — rule-off implementation (useState, default export, any)
- [x] `.cursor/commands/code-review.md` — Cursor `/code-review` command
- [x] `.cursor/commands/create-component.md` — Cursor `/create-component` command

**Agentic tooling**
- [x] `.cursor/rules/` — 11 rules with "How to verify" sections (architecture, conventions, do-not-touch, memory-bank, security, 6 module-* rules)
- [x] `.cursor/skills/` — 4 skills (build-verify, codebase-explore, memory-bank-update, repomix-reference)
- [x] `.claude/rules/` + `.claude/skills/` — mirrored from `.cursor/` for Claude Code auto-discovery
- [x] `.agents/` — Cursor-compatible copies for homework/lecturer compatibility
- [ ] `.cursor/rules/testing.mdc.off` — disabled; enable when test work begins

**Memory Bank — core docs**
- [x] `CLAUDE.md` — commands, monorepo structure, import rules, test thresholds, Memory Bank index; reference docs list updated with `decisionLog-archive.md`
- [x] `docs/memory/projectbrief.md` — project purpose, package hierarchy, key features
- [x] `docs/memory/techContext.md` — versions, dev commands, build system, ESLint rules, test infra
- [x] `docs/memory/systemPatterns.md` — state management layers, mutation pattern, action system, rendering pipeline (5 layers)
- [x] `docs/memory/productContext.md` — WHY/WHO/WHAT, UX intent, success signals, anti-goals, constraints
- [x] `docs/memory/activeContext.md` — session state, open questions, next steps; H1 added (MD041)
- [x] `docs/memory/progress.md` — this file; H1 added (MD041), checklist markers fixed

**Reference docs**
- [x] `docs/memory/decisionLog.md` — 6 undocumented-behavior entries (158 lines); pre-2026 entries archived
- [x] `docs/technical/decisionLog-archive.md` — 11 archived architectural + policy decisions (259 lines)
- [x] `docs/technical/architecture.md` — corrected: "Five layers" (was Four); ShapeCache description fixed (element reference key, correct value type)
- [x] `docs/technical/dev-setup.md` — corrected: H1 moved to line 1 (MD041); 3 fences tagged `text` (MD040); fork URL placeholder replaces hardcoded upstream URL
- [x] `docs/technical/prd-technical-notes.md` — extracted from PRD; known constraints, Q-1–Q-3, dependency table
- [x] `docs/technical/undocumented-behavior.md` — corrected: flushSync count (14 App.tsx, 2 ConfirmDialog.tsx, 1 UnlockPopup.tsx); mutateElement ShapeCache.delete triggers corrected (`height`, `width`, `fileId`, `points` only)
- [x] `docs/product/PRD.md` — 233 lines; 4 mandated sections added (Product Purpose, Target Audience, Key Features, Technical constraints / Non-goals)
- [x] `docs/product/domain-glossary.md` — ExcalidrawElement entry: 6 missing base fields documented with `_ExcalidrawElementBase` reference
- [x] `docs/product/launch-plan.md` — extracted from PRD; full phase gates, launch checklist, comm plan
- [x] `.cursorignore` — created in repo root (copy of `.claudeignore`); committed `ad88a75`
- [x] `.claudeignore` — committed `b842994`
- [x] Workshop PR — opened (2026-03-26); review follow-up fixes applied (commit `90d52b7`)

---

## In progress

- No tasks actively in progress — 2026-03-26. Next action awaits user direction on first implementation task.

---

## Not started

- [ ] First implementation task — TBD; needs user direction
- [ ] `docs/memory/progress.md` updates as implementation milestones are hit
- [ ] `docs/memory/activeContext.md` rewrite at end of each session

---

## Blocked

- No tasks blocked — 2026-03-26. Pending items in `## Not started` depend on user direction, not on a technical blocker.

---

## Discovered work

- [!] `yarn.lock` has an unstaged modification (last observed: 2026-03-26) — severity: **low** — investigate before adding dependencies; root cause not yet confirmed.
- [!] `frame.test.tsx` — frame element detection passes in browser, fails in jsdom, root cause unknown — severity: **medium** — do not attempt to fix without a reproducible root cause; avoid working around it silently.
- [!] `textWysiwyg.test.tsx:335` — arrow label version-bump test is non-deterministically flaky, acknowledged in code with no known cause — severity: **low** — do not mark as fixed without a reproducible root cause.
- [!] `isSomeElementSelected` in `packages/element/src/selection.ts` uses module-level memoization shared across all `Scene` instances — severity: **medium** — breaks multi-editor setups; marked as FIXME but no fix is in progress.
- [!] Theme detection in `packages/excalidraw/wysiwyg/textWysiwyg.tsx:964` uses `onChangeEmitter` watching elements instead of a dedicated Store theme emitter — severity: **low** — pending Store refactor, acknowledged with FIXME.
- [!] `UIOptions` normalization inside `Excalidraw` component (`packages/excalidraw/index.tsx:105`) defeats `React.memo` — severity: **low** — creates a new object every render; acknowledged with FIXME.
- [!] Minimum supported browser version not confirmed — severity: **low** — resolution path: check `excalidraw-app/vite.config.ts` `build.target`; tracked as Q-1 in `docs/product/PRD.md`.

---

## Milestones

- `Memory Bank setup` — **Done** — All orientation docs created, audited (3 passes), and cross-referenced; AI can onboard to this repo without verbal re-orientation.
- `PRD v0.1` — **Done** — Reverse-engineered PRD of Excalidraw created; In Review status; scope clarification (Q-4) still needed.
- `Doc audit pass` — **Done** (sessions 6–8) — All reference docs verified against source; MD041/MD040 lint fixes applied to memory files.
- `Workshop PR complete` — **Done** — PR opened (2026-03-26); review follow-up fixes applied (commit `90d52b7`).
- `First implementation task` — **Not started** — Scope TBD; no code changed yet.
- `Test coverage baseline` — **Not started** — Run `yarn test:all` to confirm current pass/fail state before any changes.
- `Feature implementation` — **Not started** — Depends on: first task defined, test baseline confirmed.
- `CI green` — **Not started** — All thresholds met: lines 60%, branches 70%, functions 63%, statements 60%.
