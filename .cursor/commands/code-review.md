---
description: Review staged or changed code for correctness, style, security, and architecture compliance
---

Review the changed code using `git diff HEAD` (or the files provided).

For each changed file, check:

1. **Correctness** — logic errors, off-by-one, unhandled edge cases
2. **TypeScript** — no `any`, no `@ts-ignore`, strict types used correctly
3. **Style** — follows conventions.mdc: named exports, functional components, kebab-case files
4. **Architecture** — no forbidden cross-package imports, dependency direction respected (see architecture.mdc and module-*.mdc rules)
5. **Security** — no `eval`, no `dangerouslySetInnerHTML`, no hardcoded secrets (see security.mdc)
6. **Protected files** — flag if any file from do-not-touch.mdc is modified
7. **Excalidraw-specific**
   - **Canvas rendering** — verify drawing uses Canvas 2D API (`ctx.*`); reject any use of React DOM or third-party renderers (react-konva, fabric, pixi) for visual output
   - **Element immutability** — confirm element types/props are never mutated directly outside `mutateElement()`; changes must return new objects
   - **SVG / user-input sanitization** — check that exported/imported SVG and user-supplied text are sanitized before rendering to prevent XSS
   - **Action dispatch** — all `AppState` mutations must go through `actionManager.dispatch()`; reject direct state assignment
   - **Collaboration encryption** — verify any real-time/shared-room feature uses end-to-end encryption (see `excalidraw-app/data/`)

Output format:

## Summary
One-line verdict: APPROVED / NEEDS CHANGES / BLOCKED

## Issues
List each issue as:
- `file:line` — **[severity: critical|major|minor]** — description + suggested fix

## Nitpicks (optional)
Non-blocking style suggestions.

## Checklist
- [ ] No `any` or `@ts-ignore`
- [ ] No forbidden cross-package imports
- [ ] No security violations
- [ ] Protected files not modified (or explicitly approved)
- [ ] Tests updated if behaviour changed
- [ ] Drawing uses Canvas 2D API, not React DOM
- [ ] Element mutations only via `mutateElement()`
- [ ] SVG/user input sanitized
- [ ] State changes via `actionManager.dispatch()`
- [ ] Real-time features use E2E encryption
