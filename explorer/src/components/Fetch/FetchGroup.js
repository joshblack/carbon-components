/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import { FetchGroupContext } from './FetchGroupContext';
import { useDebugFallback, useDebugErrorBoundary } from './useDebug';

function FetchGroup({ children, fallback }) {
  const [groupLoaded, setGroupLoaded] = useState(false);
  const [shouldShowFallback, setShouldShowFallback] = useState(false);
  const [error, setError] = useState(null);
  const value = useRef({
    reveal: false,
    queries: [],
    setError: (err) => {
      if (error) {
        return;
      }
      setError(err);
    },
  });

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
    if (groupLoaded === true) {
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
  }, [groupLoaded, shouldShowFallback]);

  useEffect(() => {
    const error = value.current.queries.find((query) => {
      return query.error;
    });

    if (error) {
      setError(error);
      return;
    }

    const loaded = value.current.queries.every((query) => {
      return query.loading === false && query.error === null && query.data;
    });
    if (loaded) {
      setGroupLoaded(true);
      value.current.reveal = true;
    }
  });

  if (error) {
    throw error;
  }

  if (shouldShowFallback) {
    return (
      <FetchGroupContext.Provider value={value}>
        {fallback}
        {children}
      </FetchGroupContext.Provider>
    );
  }

  return (
    <FetchGroupContext.Provider value={value}>
      {children}
    </FetchGroupContext.Provider>
  );
}

export default FetchGroup;
