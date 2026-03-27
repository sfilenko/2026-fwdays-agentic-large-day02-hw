// Result B — architecture.mdc rule DISABLED
// Prompt: "Create element coordinates component"

import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Coordinates = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Element = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  [key: string]: any;         // loose — rule OFF allows any
};

type Props = {
  selectedElements: Element[];
  onChange?: (id: string, coords: Partial<Coordinates>) => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

// default export — rule OFF, no named export requirement
export default function ElementCoordinates({ selectedElements, onChange }: Props) {
  const [coords, setCoords] = useState<Coordinates>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // local state used to mirror element data — bypasses action system
  useEffect(() => {
    if (selectedElements.length > 0) {
      const el = selectedElements[0];
      setCoords({ x: el.x, y: el.y, width: el.width, height: el.height });
    }
  }, [selectedElements]);

  const handleChange = (field: keyof Coordinates) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value);
    const next = { ...coords, [field]: value };
    setCoords(next);

    // calls parent callback directly — no undo, no history, no action system
    if (selectedElements.length > 0) {
      onChange?.(selectedElements[0].id, { [field]: value });
    }
  };

  if (selectedElements.length === 0) {
    return <div>No element selected</div>;
  }

  return (
    <div>
      <h4>Coordinates</h4>
      {(Object.keys(coords) as (keyof Coordinates)[]).map((field) => (
        <div key={field}>
          <label>{field}</label>
          <input
            type="number"
            value={coords[field]}
            onChange={handleChange(field)}
          />
        </div>
      ))}
    </div>
  );
}
