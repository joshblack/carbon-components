/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class TokenSet {
  static create({ name, tokens }) {
    return new TokenSet(name, tokens);
  }

  constructor(name, tokens = []) {
    this.kind = 'TokenSet';
    this.name = name;
    this.children = tokens;
  }

  *[Symbol.iterator]() {
    for (const child of this.children) {
      yield child;

      if (child.kind === 'TokenSet') {
        yield* child;
      }
    }
  }

  getSets() {
    const children = this.children
      .filter((child) => {
        return child.kind === 'TokenSet';
      })
      .flatMap((child) => {
        return child.getSets();
      });

    return [{ name: this.name }, ...children];
  }

  getSet(name) {
    for (const child of this) {
      if (!child.kind === 'TokenSet') {
        continue;
      }

      if (child.name === name) {
        return child;
      }
    }

    return null;
  }

  hasToken(name) {
    for (const child of this) {
      if (child.kind === 'TokenSet') {
        continue;
      }

      if (child.name === name) {
        return true;
      }
    }

    return false;
  }
}
