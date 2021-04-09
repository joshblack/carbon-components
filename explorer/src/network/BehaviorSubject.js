/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Observable } from './Observable';

const initialValue = Symbol();

export class BehaviorSubject {
  constructor() {
    this._completed = false;
    this._value = initialValue;
    this._error = initialValue;
    this._sinks = new Set();
    this._observable = new Observable((sink) => {
      this._sinks.add(sink);

      if (this._completed === true) {
        sink.complete();
      } else if (this._error !== initialValue) {
        sink.error(this._error);
        sink.complete();
      } else if (this._value !== initialValue) {
        sink.next(this._value);
      }

      return () => {
        this._sinks.delete(sink);
      };
    });
  }

  next(value) {
    if (this._completed === true) {
      return;
    }

    this._value = value;
    this._sinks.forEach((sink) => {
      sink.next(value);
    });
  }

  error(error) {
    if (this._completed === true) {
      return;
    }

    this._completed = true;
    this._sinks.forEach((sink) => {
      sink.error(error);
    });
  }

  complete() {
    if (this._completed === true) {
      return;
    }

    this._completed = true;

    this._sinks.forEach((sink) => {
      sink.complete();
    });
  }

  subscribe(observer) {
    this._subscription = this._observable.subscribe(observer);
    return this._subscription;
  }

  unsubscribe() {
    if (this._subscription) {
      this._subscription.unsubscribe();
      this._subscription = null;
    }
  }
}
