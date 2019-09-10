/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useMemo } from 'react';
import throttle from 'lodash.throttle';
import { useEventListener } from './useEventListener';
import { useForceUpdate } from './useForceUpdate';
import { usePassive } from './usePassive';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

/**
 * Helper hook that will force an update for any window event that occurs. We
 * force the update so that the calling hook can return values from `window`
 * directly.
 *
 * @param {string} name - the name of the window event
 * @param {object?} options - optional options for the event listener
 */
function useWindowEvent(name, options) {
  const forceUpdate = useForceUpdate();
  // const updater = useMemo(() => throttle(forceUpdate, 300), [forceUpdate]);
  useEventListener(window, name, forceUpdate, options);
}

function identity(fn) {
  return fn;
}

/**
 * Provides `window.{scrollX,scrollY}` values that are guaranteed to be
 * up-to-date whenever the browser is scrolled
 */
export function useWindowScroll(throttle = identity) {
  const supportsPassive = usePassive();
  const options = supportsPassive ? { passive: true } : undefined;
  const [value, updateValue] = useState({});
  const updater = useMemo(
    () =>
      throttle(() => {
        updateValue({
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        });
      }),
    [throttle]
  );

  useEffect(() => {
    window.addEventListener('scroll', updater, options);
    return () => {
      window.removeEventListener('scroll', updater);
    };
  }, [options, updater]);
  // useEventListener(window, 'scroll', updater, options);

  return value;
}

/**
 * Provides window width and height values that are guaranteed to be
 * up-to-date whenever the browser is resized
 */
export function useWindowResize(throttle = identity) {
  const supportsPassive = usePassive();
  const options = supportsPassive ? { passive: true } : undefined;
  const [value, updateValue] = useState({});
  const updater = useMemo(
    () =>
      throttle(() => {
        updateValue({
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          outerWidth: window.outerWidth,
          outerHeight: window.outerHeight,
        });
      }),
    [throttle]
  );

  useEventListener(window, 'resize', updater, options);

  return value;
}
