# A/B Validation: `conventions.mdc` — Named Exports Rule

**Rule file**: `.cursor/rules/conventions.mdc`
**Rule under test**: "Named exports only (no default exports)"
**Date**: 2026-03-28
**Verification command**: `grep -r "export default" packages/ --include="*.ts" --include="*.tsx"`

---

## Test Scenario

**Question**: Does the `conventions.mdc` rule reflect the actual state of the codebase?
Does enforcement exist, or is the rule aspirational?

**Method**: Run the "How to verify" grep command from the rule against the live codebase
and compare expected vs. actual output. Then check whether ESLint enforces the constraint.

---

## Result A — Expected (rule as written)

The rule states:

> Named exports only (no default exports)

Expected grep output: **no matches**.

Expected ESLint behavior: `import/no-default-export` or equivalent rule fires on any
file using `export default`, blocking CI (`yarn test:code` runs ESLint with 0-warning tolerance).

---

## Result B — Actual (codebase state, 2026-03-28)

```
grep -r "export default" packages/ --include="*.ts" --include="*.tsx" | wc -l
→ 65 matches across packages/
```

Sample violations:

| File | Line | Pattern |
|------|------|---------|
| `packages/excalidraw/components/App.tsx` | 12818 | `export default App;` |
| `packages/excalidraw/components/canvases/InteractiveCanvas.tsx` | 304 | `export default React.memo(InteractiveCanvas, areEqual);` |
| `packages/excalidraw/components/canvases/StaticCanvas.tsx` | 134 | `export default React.memo(StaticCanvas, areEqual);` |
| `packages/excalidraw/components/BraveMeasureTextError.tsx` | 43 | `export default BraveMeasureTextError;` |
| `packages/excalidraw/components/canvases/NewElementCanvas.tsx` | 59 | `export default NewElementCanvas;` |

All 65 violations are in `packages/excalidraw/` (internal components not part of
the public API surface). ESLint does **not** currently enforce `no-default-export`
for these internal files — `yarn test:code` passes despite the violations.

---

## Conclusion

The rule is **aspirational / partially scoped**, not fully enforced:

- **What holds**: the public API (`packages/excalidraw/index.tsx`) uses only named
  exports — the rule is correctly enforced at the boundary that matters most.
- **What does not hold**: 65 internal component files use `export default`. These
  predate the rule and are not caught by the current ESLint config.
- **Risk**: low — the violations are in internal files consumed only within the same
  package; they do not affect the published API.

**Recommended action**: Narrow the rule scope in `conventions.mdc` to reflect reality:

```
- Named exports only (no default exports) — enforced at public API boundaries (index.tsx)
- Internal components may use default exports for React.memo wrapping; prefer named exports for new files
```

Alternatively, add `import/no-default-export` to the ESLint config scoped to
`packages/*/src/index.tsx` to enforce it only where it matters.
