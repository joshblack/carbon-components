/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useDebounce } from './useDebounce';

export function useThrottle(value, wait, options = {}) {
  const { leading = true, trailing = true } = options;
  return useDebounce(value, wait, {
    leading,
    trailing,
    maxWait: wait,
  });
}
