/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, cleanup } from '@carbon/test-utils/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { usePortalNode } from '../usePortalNode';

describe('usePortalNode', () => {
  afterEach(cleanup);

  it('should create a portal node', () => {
    const testId = 'test-id';
    let portalNode;
    function Component() {
      portalNode = usePortalNode();
      return (
        <>
          <span>Component</span>
          {portalNode &&
            ReactDOM.createPortal(<div data-test-id={testId} />, portalNode)}
        </>
      );
    }

    act(() => {
      render(<Component />);
    });

    expect(portalNode).toBeDefined();
    // The portal node should exist in document.body
    const children = Array.from(document.body.childNodes);
    expect(children.indexOf(portalNode)).not.toBe(-1);

    // The portal node should have rendered a node with our `data-test-id`
    expect(
      document.body.querySelector(`[data-test-id="${testId}"]`)
    ).toBeDefined();
  });

  it('should create a new node when given an id', () => {
    const id = 'test-id';
    function Component() {
      usePortalNode(id);
      return null;
    }

    act(() => {
      render(<Component />);
    });

    expect(document.body.querySelector(id)).toBeDefined();
  });

  it('should reuse an existing node with a given id', () => {
    const id = 'test-id';
    function Component() {
      usePortalNode(id);
      return null;
    }

    act(() => {
      const { rerender } = render(<Component />);
      rerender();
    });

    expect(document.body.querySelectorAll(`#${id}`).length).toBe(1);
  });
});
