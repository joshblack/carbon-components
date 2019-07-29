/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Grid, Row, Column } from '../';

const { prefix } = settings;

describe('Grid', () => {
  afterEach(cleanup);

  it('should render', () => {
    const { container } = render(
      <>
        <Grid />
        <Grid condensed />
        <Grid fullWidth />
      </>
    );
    expect(container.querySelectorAll(`.${prefix}--grid`).length).toBe(3);
    expect(
      container.querySelectorAll(`.${prefix}--grid--condensed`).length
    ).toBe(1);
    expect(
      container.querySelectorAll(`.${prefix}--grid--full-width`).length
    ).toBe(1);
  });

  it('should support a custom class name', () => {
    const customClass = 'custom-class';
    const { container } = render(<Grid className={customClass} />);
    expect(container.querySelectorAll(`.${customClass}`).length).toBe(1);
  });

  it('should support rendering with a custom React element', () => {
    const Container = jest.fn(props => (
      <section data-test-id="custom-element" {...props} />
    ));
    const { container } = render(<Grid as={Container} />);
    expect(Container).toHaveBeenCalledTimes(1);
    expect(
      container.querySelectorAll('[data-test-id="custom-element"]').length
    ).toBe(1);
  });
});

const mountedContainers = new Set();

function render(element) {
  const node = document.createElement('div');
  document.body.appendChild(node);
  mountedContainers.add(node);

  act(() => {
    ReactDOM.render(element, node);
  });

  return {
    container: node,
  };
}

function cleanup() {
  mountedContainers.forEach(container => {
    ReactDOM.unmountComponentAtNode(container);
    container.parentNode.removeChild(container);
    mountedContainers.delete(container);
  });
}
