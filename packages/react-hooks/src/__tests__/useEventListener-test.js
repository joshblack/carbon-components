/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, cleanup } from '@carbon/test-utils/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { useEventListener } from '../useEventListener';

describe('useEventListener', () => {
  afterEach(cleanup);

  it('should call the given callback each time the event is dispatched', () => {
    const callback = jest.fn();
    function Component() {
      useEventListener(document, 'click', callback);
      return null;
    }

    act(() => {
      render(<Component />);
    });

    document.dispatchEvent(new MouseEvent('click'));
    document.dispatchEvent(new MouseEvent('click'));
    document.dispatchEvent(new MouseEvent('click'));
    expect(callback).toHaveBeenCalledTimes(3);
  });
});
