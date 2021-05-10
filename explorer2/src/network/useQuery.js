/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react';
import { Store } from './Store';

export function useQuery(url, params, options) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const savedParams = useValue(params);
  const savedOptions = useValue(options);

  useEffect(() => {
    const subscription = Store.get(
      getURL(url, savedParams),
      savedOptions
    ).subscribe({
      next(value) {
        setData(value);
        setLoading(false);
      },
      error(err) {
        setError(err);
        setLoading(false);
      },
      complete() {
        setLoading(false);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [url, savedParams, savedOptions]);

  return {
    data,
    error,
    loading,
  };
}

function isEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false;
    }
    return a.every((item, index) => {
      isEqual(item, b[index]);
    });
  }

  if (typeof a === 'object') {
    if (typeof b !== 'object') {
      return false;
    }

    for (const [key, value] of Object.entries(a)) {
      if (!isEqual(value, b[key])) {
        return false;
      }
    }

    return true;
  }

  throw new Error('Unexpected type');
}

function useValue(value) {
  const [savedValue, setValue] = useState(value);

  if (savedValue !== value) {
    if (!isEqual(savedValue, value)) {
      setValue(value);
    }
  }

  return savedValue;
}

function getURL(url, params) {
  if (Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      searchParams.set(key, value);
    }
    return `${url}?${searchParams.toString()}`;
  }
  return url;
}
