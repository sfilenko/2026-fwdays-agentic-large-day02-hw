// Result A — architecture.mdc rule ACTIVE
// Prompt: "Create element coordinates component"

import type { AppState } from "../../packages/excalidraw/types";
import type { NonDeletedExcalidrawElement } from "../../packages/element/src/types";
import { actionManager } from "../../packages/excalidraw/actions/manager";
import { register } from "../../packages/excalidraw/actions/register";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ElementCoordinatesProps = {
  appState: AppState;
  elements: readonly NonDeletedExcalidrawElement[];
};

type CoordinateField = "x" | "y" | "width" | "height";

// ─── Action (state change goes through actionManager) ─────────────────────────

export const actionUpdateElementCoordinates = register({
  name: "updateElementCoordinates",
  trackEvent: false,
  perform(elements, appState, formData: { field: CoordinateField; value: number }) {
    const selectedIds = new Set(Object.keys(appState.selectedElementIds));
    const nextElements = elements.map((el) => {
      if (!selectedIds.has(el.id)) {
        return el;
      }
      return { ...el, [formData.field]: formData.value };
    });
    return {
      elements: nextElements,
      appState,
      captureUpdate: "IMMEDIATELY" as const,
    };
  },
});

// ─── Component ────────────────────────────────────────────────────────────────

export const ElementCoordinates = ({
  appState,
  elements,
}: ElementCoordinatesProps) => {
  const selectedIds = Object.keys(appState.selectedElementIds);
  const selected = elements.filter((el) => selectedIds.includes(el.id));

  if (selected.length === 0) {
    return null;
  }

  const first = selected[0];

  const handleChange =
    (field: CoordinateField) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      if (!Number.isFinite(value)) {
        return;
      }
      actionManager.executeAction(actionUpdateElementCoordinates, "ui", {
        field,
        value,
      });
    };

  return (
    <div className="element-coordinates">
      {(["x", "y", "width", "height"] as CoordinateField[]).map((field) => (
        <label key={field}>
          {field.toUpperCase()}
          <input
            type="number"
            value={first[field]}
            onChange={handleChange(field)}
          />
        </label>
      ))}
    </div>
  );
};
