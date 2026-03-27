# Skill: Codebase Explorer

## When to use

When you need to understand an unfamiliar area of the Excalidraw codebase.
Triggered by: "explore", "investigate", "how does X work?"

## Inputs

- Area of interest (module, feature, file pattern)

## Steps

1. Identify relevant directory/files using the monorepo layout below
2. Read the top-level comments or README in the area
3. Map the key files and their responsibilities
4. Trace data flow: entry point → processing → output
5. Identify dependencies (imports from other packages)
6. Document findings in a summary

## Excalidraw Monorepo Layout

```text
excalidraw-app/         ← standalone web app (routing, persistence, collab)
packages/
  excalidraw/           ← main npm component; public API via index.tsx
    components/App.tsx  ← root React component (~12 k lines); start here for UI flows
    scene/              ← Scene model + renderScene() pipeline
    renderer/           ← Canvas 2D rendering (staticScene, interactiveScene)
    actions/manager.ts  ← actionManager; all AppState mutations go through here
    data/restore.ts     ← file-format compatibility on import
    types.ts            ← AppState, ExcalidrawElement, and all core types
  element/              ← element types, mutations (mutateElement), geometry
    src/mutateElement.ts← sole sanctioned mutation path for element props
    src/binding.ts      ← arrow/shape binding logic
    src/linearElementEditor.ts ← freehand/linear element editing
  common/               ← shared utilities (no UI, limited cross-package deps)
  math/                 ← pure math: GlobalPoint, LocalPoint, curves, geometry
  utils/                ← export helpers (exportToSvg, exportToBlob) + shape utils
```

## Canvas Rendering Pipeline

```text
User action
  → actionManager.dispatch(action)
    → AppState update
      → Scene.getElementsIncludingDeleted()
        → renderScene(elements, appState, canvas)
          → staticScene renderer  (non-interactive, cached)
          → interactiveScene renderer (selections, handles, overlays)
```

Key files to trace: `renderer/staticScene.ts`, `renderer/interactiveScene.ts`, `scene/Scene.ts`.

## Core Element Types

Elements live in `packages/excalidraw/types.ts` (base) and `packages/element/src/types.ts` (extended):

- `ExcalidrawElement` — base: id, x, y, width, height, opacity, groupIds
- `ExcalidrawTextElement` — adds `text`, `fontSize`, `fontFamily`
- `ExcalidrawLinearElement` — polyline/arrow; `points: GlobalPoint[]`
- `ExcalidrawFreeDrawElement` — freehand strokes via perfect-freehand
- `ExcalidrawImageElement` — embedded raster/SVG images

Coordinates use `GlobalPoint` (scene space) and `LocalPoint` (element space) from `packages/math/src/types.ts`.

## Key React Components

| Component | File | Purpose |
|-----------|------|---------|
| `App` | `components/App.tsx` | Root; owns all event handling and canvas refs |
| `LayerUI` | `components/LayerUI.tsx` | All toolbar/panel UI rendered outside the canvas |
| `Canvas` | (inside App) | `<canvas>` element; delegates to renderer |
| `ActionManager` | `actions/manager.ts` | Registers and dispatches actions |

State flows via Jotai atoms (imported through app-specific wrappers, not directly from `jotai`).

## Outputs

- Summary: purpose, key files, data flow, dependencies
- List of related files for deeper investigation

## Safety

- READ-ONLY — do not modify any files during exploration
- Verify findings against actual code, not assumptions
