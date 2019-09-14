/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef, useState } from 'react';

export function useDebounce(value, wait = 0, options = {}) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const savedValue = useRef(value);
  const timerId = useRef(null);
  const lastCallTime = useRef(null);
  const lastUpdate = useRef(null);
  const { leading = false, maxWait, trailing = true } = options;

  function shouldUpdate(time) {
    const timeSinceLastCall = time - lastCallTime.current;
    const timeSinceLastUpdate = time - lastUpdate.current;
    return (
      lastCallTime.current === null ||
      timeSinceLastCall >= wait ||
      (maxWait && timeSinceLastUpdate >= maxWait)
    );
  }

  function cancel() {
    if (timerId.current !== null) {
      clearTimeout(timerId.current);
    }
    timerId.current = null;
    lastCallTime.current = null;
  }

  function leadingEdge(time) {
    timerId.current = setTimeout(timerExpired, wait);
    if (leading) {
      lastUpdate.current = Date.now();
      setDebouncedValue(value);
    }
  }

  function trailingEdge() {
    if (trailing) {
      lastUpdate.current = Date.now();
      setDebouncedValue(savedValue.current);
    }

    timerId.current = null;
    lastCallTime.current = null;
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldUpdate(time)) {
      trailingEdge();
      return;
    }

    const timeSinceLastCall = time - lastCallTime.current;
    const timeSinceLastUpdate = time - lastUpdate.current;
    const timeWaiting = wait - timeSinceLastCall;
    const remainingTime = maxWait
      ? Math.min(timeWaiting, maxWait - timeSinceLastUpdate)
      : timeSinceLastCall;
    timerId.current = setTimeout(timerExpired, remainingTime);
  }

  function debounce() {
    savedValue.current = value;
    lastCallTime.current = Date.now();

    if (timerId.current === null) {
      leadingEdge(lastCallTime.current);
      return;
    }
  }

  // In order to synchronize with options for the hook, we'll need to clear
  // any existing timers and reset the `timerId` ref to null. The timer will
  // be re-created below in the timer effect
  useEffect(cancel, [wait, leading, trailing]);

  // If the hook is dropped, cancel any running timers
  useEffect(() => cancel, []);

  useEffect(debounce, [value, wait, leading, trailing]);

  return [debouncedValue, cancel];
}
