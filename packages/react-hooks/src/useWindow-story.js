/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/react';
import React, { useEffect, useState, useRef } from 'react';
import { useWindowResize, useWindowScroll } from './useWindow';
import { useDebounce } from './useDebounce';
import { useThrottle } from './useThrottle';

storiesOf('useWindowResize', module)
  .add('default', () => {
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
  })
  .add('with debounce', () => {
    function DemoComponent() {
      const dimensions = useWindowResize();
      const [value] = useDebounce(dimensions, 500);
      return (
        <>
          <p>Resize the window to see the dimensions update</p>
          <pre>
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        </>
      );
    }

    return <DemoComponent />;
  })
  .add('with throttle', () => {
    function DemoComponent() {
      const dimensions = useWindowResize();
      const [value] = useThrottle(dimensions, 500);
      return (
        <>
          <p>Resize the window to see the dimensions update</p>
          <pre>
            <code>{JSON.stringify(value, null, 2)}</code>
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
  .add('with debounce', () => {
    function DemoComponent() {
      const [wait, updateWait] = useState(500);
      const dimensions = useWindowScroll();
      const [value, cancel] = useDebounce(dimensions, wait);
      return (
        <>
          <div
            style={{
              backgroundColor: 'white',
              position: 'sticky',
              top: 0,
              paddingLeft: dimensions.scrollX,
            }}>
            <div>
              <label htmlFor="wait-time">Wait</label>
              <input
                id="wait-time"
                type="text"
                onChange={event => updateWait(event.target.value || 500)}
                value={wait}
              />
            </div>
            <button onClick={cancel}>Cancel</button>
            <pre>
              <code>{JSON.stringify(dimensions, null, 2)}</code>
            </pre>
            <pre>
              <code>{JSON.stringify(value, null, 2)}</code>
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
      const [wait, updateWait] = useState(500);
      const dimensions = useWindowScroll();
      const [value, cancel] = useThrottle(dimensions, wait);
      return (
        <>
          <div
            style={{
              backgroundColor: 'white',
              position: 'sticky',
              top: 0,
              paddingLeft: dimensions.scrollX,
            }}>
            <div>
              <label htmlFor="wait-time">Wait</label>
              <input
                id="wait-time"
                type="text"
                onChange={event => updateWait(event.target.value || 500)}
                value={wait}
              />
            </div>
            <button onClick={cancel}>Cancel</button>
            <pre>
              <code>{JSON.stringify(dimensions, null, 2)}</code>
            </pre>
            <pre>
              <code>{JSON.stringify(value, null, 2)}</code>
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
