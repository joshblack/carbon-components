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

  constructor(name, properties = {}, state, states = []) {
    this.kind = 'Token';
    this.name = name;
    this.properties = properties;
    this.state = state;
    this.children = states.map((child) => {
      return Token.create(child);
    });
  }

  getTokens() {
    return [
      this,
      ...this.children.flatMap((state) => {
        return state.getTokens();
      }),
    ];
  }

  getName(format) {
    const keywords = new Set(['ui']);

    if (format === 'javascript') {
      return this.name
        .split('-')
        .map((part, index) => {
          if (index === 0) {
            return part;
          }

          if (keywords.has(part)) {
            return part.toUpperCase();
          }

          return part[0].toUpperCase() + part.slice(1);
        })
        .join('');
    }
    return this.name;
  }
}
