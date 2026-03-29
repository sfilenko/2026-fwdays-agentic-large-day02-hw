# A/B Test: architecture.mdc

- **Prompt**: "Create element coordinates component"
- **Result A (rule ON)**: `docs/ABResult/A/element-coordinates.tsx`
- **Result B (rule OFF)**: `docs/ABResult/B/element-coordinates.tsx`
- **Rule file**: `.cursor/rules/architecture.mdc`

---

## State Management

| | A (rule ON) | B (rule OFF) |
|---|---|---|
| Mechanism | `actionManager.executeAction()` | `useState` + `useEffect` |
| State type | `AppState` from `packages/excalidraw/types` | Local `Coordinates` struct |
| Undo/redo | Yes — `captureUpdate: "IMMEDIATELY"` wired to history | No — state change is fire-and-forget |
| Collaboration sync | Yes — goes through `syncActionResult` pipeline | No — bypasses Scene entirely |
| Side effects | Handled by action system | Manual `useEffect` watching `selectedElements` |

**Verdict**: Rule A correctly routes mutations through the action system. Rule B produces a component that can get out of sync with remote clients and loses undo support.

---

## Export Style

| | A (rule ON) | B (rule OFF) |
|---|---|---|
| Component export | `export const ElementCoordinates` (named) | `export default function ElementCoordinates` (default) |
| Action export | `export const actionUpdateElementCoordinates` (named) | — |
| Props type export | `export type ElementCoordinatesProps` (named) | inline, not exported |

**Verdict**: Rule A is tree-shakeable and importable by name. Rule B default export makes refactoring harder and is inconsistent with the rest of `packages/excalidraw`.

---

## Type Safety

| | A (rule ON) | B (rule OFF) |
|---|---|---|
| Element type | `NonDeletedExcalidrawElement` (strict, from `@excalidraw/element`) | `{ id: string; x: number; ...; [key: string]: any }` (index signature + `any`) |
| Coordinate fields | `CoordinateField = "x" \| "y" \| "width" \| "height"` (union) | `keyof Coordinates` (derived, acceptable) |
| `any` usage | None | `[key: string]: any` on element type |
| Null safety | Returns `null` if nothing selected | Returns `<div>No element selected</div>` but `selectedElements[0]` still accessed unsafely |

**Verdict**: Rule A enforces strict types throughout. Rule B introduces `any` via the loose element definition, defeating TypeScript's ability to catch property-name typos on elements.

---

## Conventions

| | A (rule ON) | B (rule OFF) |
|---|---|---|
| Props interface name | `ElementCoordinatesProps` (matches `{ComponentName}Props` pattern) | `Props` (generic, non-descriptive) |
| File would pass ESLint | Yes | No — `export default` and `any` both flagged |
| Imports | `import type` for types, named imports | Mixed, no `import type` |
| New external dependencies | None | None |

---

## Conclusion

Rule `architecture.mdc` is **effective**. With the rule active:

- State changes enter the undo/redo pipeline automatically
- The component is safe for collaborative sessions (mutations propagate via `syncActionResult`)
- TypeScript catches mistakes at the element-field level
- Code is consistent with the rest of `packages/excalidraw`

Without the rule, the AI defaults to idiomatic React patterns (`useState`, default export, loose types) that are correct for a generic app but **broken in the Excalidraw context** — a coordinate edit would not be undoable and would not sync to remote users.

The rule is not redundant: the violations in Result B are not obvious mistakes — they are reasonable defaults that happen to be wrong for this codebase.


