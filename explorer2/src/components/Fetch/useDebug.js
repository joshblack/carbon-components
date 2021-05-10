/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from 'react';

function emptyFunction() {}

export const useDebugFallback = __DEV__
  ? function useDebugFallback() {
      const [suspend] = useState(false);
      return suspend;
    }
  : emptyFunction;

export const useDebugErrorBoundary = __DEV__
  ? function useDebugErrorBoundary() {
      const [boundary] = useState(false);
      return boundary;
    }
  : emptyFunction;
