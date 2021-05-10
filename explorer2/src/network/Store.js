/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { hash } from './hash';
import { Observable } from './Observable';
import { BehaviorSubject } from './BehaviorSubject';

const cache = new Map();

function get(url, options = {}) {
  const key = makeKey(url, options);

  if (cache.has(key)) {
    return cache.get(key);
  }

  const source = makeRequest(url, options);
  const subject = new BehaviorSubject();

  source.subscribe({
    error(err) {
      subject.error(err);
    },
    next(value) {
      subject.next(value);
    },
  });

  cache.set(key, subject);

  return subject;
}

function preload(url, options) {
  return get(url, options);
}

function makeRequest(url, options) {
  return new Observable((sink) => {
    let closed = false;

    fetch(url, options)
      .then((response) => response.json())
      .then((json) => {
        if (!closed) {
          sink.next(json);
          sink.complete();
        }
      })
      .catch((error) => {
        if (!closed) {
          sink.error(error);
        }
      });

    return () => {
      closed = true;
    };
  });
}

function makeKey(url, options) {
  if (options) {
    return hash(`${url}:${JSON.stringify(options)}`);
  }
  return hash(url);
}

export const Store = {
  get,
  preload,
};
