/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react';
import { useQuery } from '~/network/useQuery';
import { useDebugFallback, useDebugErrorBoundary } from './useDebug';

function Fetch({ children, fallback, url, options, ...params }) {
  const query = useQuery(url, params, options);
  const [shouldShowFallback, setShouldShowFallback] = useState(false);
  const { loading, error, data } = query;

  if (__DEV__) {
    const debugFallback = useDebugFallback();
    const debugBoundary = useDebugErrorBoundary();

    if (debugFallback) {
      return fallback;
    }

    if (debugBoundary) {
      throw error;
    }
  }

  useEffect(() => {
    if (loading === false) {
      return;
    }

    if (shouldShowFallback) {
      return;
    }

    const timerId = window.setTimeout(() => {
      setShouldShowFallback(true);
    }, 500);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [loading, shouldShowFallback]);

  // This component should be used with `ErrorBoundary`
  if (error) {
    throw error;
  }

  if (loading) {
    if (shouldShowFallback) {
      return fallback;
    }
    return null;
  }

  return children(data);
}

export default Fetch;
