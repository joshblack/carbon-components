/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Observable } from './Observable';

export function delay(ms = 1000) {
  return (observable) => {
    return new Observable((sink) => {
      let timeoutId = null;
      let flushed = false;
      let completed = false;
      const subscription = observable.subscribe({
        ...sink,
        next(value) {
          clearTimeout(timeoutId);
          flushed = false;
          timeoutId = setTimeout(() => {
            sink.next(value);
            flushed = true;
            if (completed) {
              sink.complete();
            }
          }, ms);
        },
        complete() {
          completed = true;
          if (flushed) {
            sink.complete();
          }
        },
      });

      return () => {
        clearTimeout(timeoutId);
        subscription.unsubscribe();
      };
    });
  };
}

export function of(value) {
  return new Observable((sink) => {
    sink.next(value);
    sink.complete();
  });
}

export function map(mapFn) {
  return (observable) => {
    return new Observable((sink) => {
      const subscription = observable.subscribe({
        ...sink,
        next(value) {
          sink.next(mapFn(value));
        },
      });

      return subscription;
    });
  };
}

export function zip(...observables) {
  return new Observable((sink) => {
    const values = Array(observables.length);
    const subscriptions = Array(observables.length);
    const completed = Array(observables.length).fill(0);

    for (let i = 0; i < observables.length; i++) {
      const observable = observables[i];
      const observer = {
        ...sink,
        next(value) {
          values[i] = value;
        },
        complete() {
          completed[i] = 1;

          if (completed.every((state) => state === 1)) {
            sink.next(values);
            sink.complete();
          }
        },
      };

      completed[i] = 0;

      observable.subscribe(observer);
    }

    return () => {
      for (const subscription of subscriptions) {
        subscription.unsubscribe();
      }
    };
  });
}
