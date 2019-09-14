/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react';
import { usePassive } from './usePassive';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

/**
 * Provides `window.{scrollX,scrollY}` values that are guaranteed to be
 * up-to-date whenever the browser is scrolled
 */
export function useWindowScroll() {
  const [value, updateValue] = useState({
    scrollX: canUseDOM ? window.scrollX : null,
    scrollY: canUseDOM ? window.scrollY : null,
  });
  const supportsPassive = usePassive();
  const options = supportsPassive ? { passive: true } : undefined;

  useEffect(() => {
    function handler() {
      updateValue({
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      });
    }
    window.addEventListener('scroll', handler, options);
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [options]);

  return value;
}

/**
 * Provides window width and height values that are guaranteed to be
 * up-to-date whenever the browser is resized
 */
export function useWindowResize() {
  const [value, updateValue] = useState({
    innerWidth: canUseDOM ? window.innerWidth : null,
    innerHeight: canUseDOM ? window.innerHeight : null,
    outerWidth: canUseDOM ? window.outerWidth : null,
    outerHeight: canUseDOM ? window.outerHeight : null,
  });
  const supportsPassive = usePassive();
  const options = supportsPassive ? { passive: true } : undefined;

  useEffect(() => {
    function handler() {
      updateValue({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
      });
    }
    window.addEventListener('resize', handler, options);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [options]);

  return value;
}
