/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getByText } from '@carbon/test-utils/dom';
import { render, cleanup } from '@carbon/test-utils/react';
import React from 'react';
import { Filename } from '../';

const statusOptions = ['uploading', 'edit', 'complete'];

describe('Filename', () => {
  afterEach(cleanup);

  describe('automated accessibility tests', () => {
    test.each(statusOptions)(
      'it should have no Axe violations with status `%s`',
      async status => {
        const { container } = render(<Filename status={status} />);
        await expect(container).toHaveNoAxeViolations();
      }
    );
  });

  // `invalid` (describedby enhancement??)
  // ...other

  it('should render a visible node with the text provided from `iconDescription`', () => {
    const { container: edit } = render(
      <Filename status="edit" iconDescription="test-edit" />
    );
    expect(getByText(edit, 'test-edit')).not.toEqual(null);

    const { container: complete } = render(
      <Filename status="complete" iconDescription="test-complete" />
    );
    expect(getByText(complete, 'test-complete')).not.toEqual(null);
  });
});
