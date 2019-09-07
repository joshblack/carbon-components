/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/react';
import React, { useCallback } from 'react';
import throttle from 'lodash.throttle';
import { useWindowResize, useWindowScroll } from './useWindow';

storiesOf('useWindowResize', module).add('default', () => {
  function DemoComponent() {
    const dimensions = useWindowResize();
    return (
      <>
        <p>Resize the window to see the dimensions update</p>
        <pre>
          <code>{JSON.stringify(dimensions, null, 2)}</code>
        </pre>
      </>
    );
  }

  return <DemoComponent />;
});

storiesOf('useWindowScroll', module)
  .add('default', () => {
    function DemoComponent() {
      const dimensions = useWindowScroll();
      return (
        <>
          <div
            style={{
              backgroundColor: 'white',
              position: 'sticky',
              top: 0,
              paddingLeft: dimensions.scrollX,
            }}>
            <pre>
              <code>{JSON.stringify(dimensions, null, 2)}</code>
            </pre>
          </div>
          <div
            style={{
              width: 10000,
              height: 10000,
              border: '1px solid black',
              padding: '1rem',
              margin: '1rem',
            }}>
            <p>Scroll in this region to see the dimensions change above</p>
          </div>
        </>
      );
    }

    return <DemoComponent />;
  })
  .add('with throttle', () => {
    function DemoComponent() {
      const dimensions = useWindowScroll(
        useCallback(updater => throttle(updater, 300), []),
        useCallback(throttled => {
          throttled.cancel();
        }, [])
      );
      return (
        <>
          <div
            style={{
              backgroundColor: 'white',
              position: 'sticky',
              top: 0,
              paddingLeft: dimensions.scrollX,
            }}>
            <pre>
              <code>{JSON.stringify(dimensions, null, 2)}</code>
            </pre>
          </div>
          <div
            style={{
              width: 10000,
              height: 10000,
              border: '1px solid black',
              padding: '1rem',
              margin: '1rem',
            }}>
            <p>Scroll in this region to see the dimensions change above</p>
          </div>
        </>
      );
    }

    return <DemoComponent />;
  });
