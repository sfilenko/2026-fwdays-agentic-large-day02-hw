---
description: Scaffold a new React component following Excalidraw conventions
---

Create a new React component based on the name and location provided.

Follow these rules from conventions.mdc and the relevant module-*.mdc:

1. **File naming** — kebab-case filename: `my-component.tsx`
2. **Component naming** — PascalCase: `MyComponent`
3. **Props interface** — named `MyComponentProps`, defined above the component
4. **Export** — named export only, no default export
5. **Style** — CSS module import if styles are needed: `import styles from "./my-component.module.scss"`
6. **Tests** — create colocated test file: `my-component.test.tsx` with at least one smoke test
7. **Types** — use `import type { ... }` for type-only imports

## Template

```tsx
import type { MyComponentProps } from "./my-component";
import styles from "./my-component.module.scss";

export type MyComponentProps = {
  // props here
};

export const MyComponent = ({ ...props }: MyComponentProps) => {
  return (
    <div className={styles.container}>
      {/* content */}
    </div>
  );
};
```

## After creating

- [ ] Add export to the nearest `index.tsx` if it is part of the public API
- [ ] Run `yarn test:code` — ESLint must pass with 0 warnings
- [ ] Run `yarn test:typecheck` — no type errors
- [ ] Add the component to `activeContext.md` if it is a significant new feature
