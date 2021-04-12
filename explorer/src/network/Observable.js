/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class Observable {
  constructor(source) {
    this._source = source;
  }

  subscribe(...args) {
    if (args.length === 0) {
      throw new Error(`Expected an observer to be provided to subscribe`);
    }

    if (args.length === 1) {
      if (typeof args[0] === 'object') {
        return subscribe(this._source, args[0]);
      }

      const observer = {
        next: args[0],
      };

      return subscribe(this._source, observer);
    }

    const observer = {
      next: args[0],
      error: args[1],
      complete: args[2],
    };

    return subscribe(this._source, observer);
  }

  pipe(...operators) {
    return operators.reduce((observable, operator) => {
      return operator(observable);
    }, this);
  }
}

function subscribe(source, observer) {
  let cleanup = null;
  let closed = false;

  const subscription = {
    unsubscribe() {
      if (!closed) {
        closed = true;
        runCleanup();
      }
    },
  };
  const sink = {
    next: (value) => {
      if (!closed && observer.next) {
        observer.next(value);
      }
    },
    error: (error) => {
      if (!closed) {
        if (observer.error) {
          observer.error(error);
        }
        runCleanup();
      }
    },
    complete: () => {
      if (!closed) {
        closed = true;
        if (observer.complete) {
          observer.complete();
        }
        runCleanup();
      }
    },
  };

  cleanup = source(sink);

  function runCleanup() {
    if (cleanup) {
      if (cleanup.unsubscribe) {
        cleanup.unsubscribe();
      } else {
        cleanup();
      }
      cleanup = null;
    }
  }

  return subscription;
}
