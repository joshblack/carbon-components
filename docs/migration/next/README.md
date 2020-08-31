# `next` Release

> This folder is responsible for **work-in-progress** migration guides. All
> files in this directory are subject to change and are not final.

## Packages

### `carbon-components-react`

- New location: `@carbon/react`

**Changes**

All components use the `className` to provide a `className` on the outermost DOM
node rendered by the component

Components impacted:

- [ ] Component name

**Components**

Accordion

| Prop name (v10) | Prop type (v10)                     | Prop name (next) | Prop type (next) | Reason |
| --------------- | ----------------------------------- | ---------------- | ---------------- | ------ |
| `align`         | `PropTypes.oneOf(['start', 'end'])` | No change        | No change        |        |
| `children`      | `PropTypes.node`                    | No change        | No change        |        |
| `className`     | `PropTypes.string`                  | No change        | No change        |        |
