/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('useId', () => {
  let render;
  let cleanup;
  let React;
  let useId;

  beforeEach(() => {
    jest.resetModules();
    render = require('@carbon/test-utils/react').render;
    cleanup = require('@carbon/test-utils/react').cleanup;
    React = require('react');
    useId = require('../useId').useId;
  });

  afterEach(() => {
    if (cleanup) {
      cleanup();
    }
  });

  it('should generate a unique id for each component', () => {
    function Component() {
      const id = useId();
      return <div id={id} />;
    }

    const { container } = render(
      <>
        <Component />
        <Component />
      </>
    );

    const ids = Array.from(container.childNodes).map(node => node.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(2);
  });

  it('should keep the same id for each call to render', () => {
    function Component() {
      const id = useId();
      return <div id={id} />;
    }

    const { container } = render(<Component />);
    const id = container.childNodes[0].id;

    render(<Component />);
    expect(container.childNodes[0].id).toBe(id);
  });

  it('should include a prefix in the generated `id`', () => {
    const prefix = 'prefix';
    function Component() {
      const id = useId(prefix);
      return <div id={id} />;
    }

    const { container } = render(<Component />);
    const id = container.childNodes[0].id;
    expect(id).toEqual(expect.stringContaining(prefix));
  });
});
