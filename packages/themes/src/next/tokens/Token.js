/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class Token {
  static create(token) {
    if (typeof token === 'string') {
      return new Token(token);
    }

    const { name, properties, state, states } = token;
    return new Token(name, properties, state, states);
  }

  constructor(name, properties, state, states = []) {
    this.kind = 'Token';
    this.name = name;

    if (properties) {
      this.properties = properties;
    }

    if (state) {
      this.state = state;
    }
  }
}
