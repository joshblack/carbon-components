/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, cleanup } from '@carbon/test-utils/react';
import React from 'react';
import { useForceUpdate } from '../useForceUpdate';

describe('useForceUpdate', () => {
  afterEach(cleanup);

  it('should force a component to re-render', () => {
    let renderCount = 0;

    function Component() {
      const forceUpdate = useForceUpdate();
      ++renderCount;
      return <button onClick={forceUpdate}>Update</button>;
    }

    function getButton() {
      return document.querySelector('button');
    }

    render(<Component />);

    // Capture the prev render count and check that the current render count si
    // greater than the prev render count. We don't want to check exact values
    // as React could run render multiple times, all we care about is that the
    // count has increased when interactiving with <button> that triggers
    // `forceUpdate`
    const prevRenderCount = renderCount;
    getButton().click();
    expect(renderCount).toBeGreaterThan(prevRenderCount);
  });
});
