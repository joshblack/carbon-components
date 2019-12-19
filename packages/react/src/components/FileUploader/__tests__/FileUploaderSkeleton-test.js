/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, cleanup } from '@carbon/test-utils/react';
import React from 'react';
import { FileUploaderSkeleton } from '../';

describe('FileUploaderSkeleton', () => {
  afterEach(cleanup);

  describe('automated accessibility tests', () => {
    it('should have no Axe violations', async () => {
      const { container } = render(<FileUploaderSkeleton />);
      await expect(container).toHaveNoAxeViolations();
    });
  });

  it('should accept a custom class name on the root element', () => {
    const className = 'test';
    const { container } = render(
      <FileUploaderSkeleton className={className} />
    );

    expect(container.querySelector(`.${className}`)).toEqual(
      container.firstChild
    );
  });
});
