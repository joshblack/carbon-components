# Layout

> A series of layout-related helpers for the Carbon Design System

## Grid

### Getting Started

This component comes with any installation of the `carbon-components-react`
package on NPM. You can install this package by running the following in your
terminal:

```bash
npm install -S carbon-components-react carbon-components carbon-icons
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add carbon-components-react carbon-components carbon-icons
```

### Usage

You can include the Grid layout helpers by doing the following in your project:

```js
import { Grid, Row, Column } from 'carbon-components-react';
```

The default grid format closely mirrors Bootstrap's grid. At the top-level, you
define a container with the `Grid`. Inside of a grid, you have multiple rows
where you use `Row`. Inside of a row, you use `Column`.

```jsx
import React from 'react';
import { Grid, Row, Column } from 'carbon-components-react';

function MyComponent() {
  return (
    <Grid>
      <Row>
        <Column>1/4</Column>
        <Column>1/4</Column>
        <Column>1/4</Column>
        <Column>1/4</Column>
      </Row>
    </Grid>
  );
}
```
