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
