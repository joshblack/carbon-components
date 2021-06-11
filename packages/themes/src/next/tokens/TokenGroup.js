/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Token } from './token';

export class TokenGroup {
  static create({ name, properties, tokens = [] }) {
    return new TokenGroup(name, tokens, properties);
  }

  constructor(name, tokens, properties) {
    this.kind = 'TokenGroup';
    this.name = name;
    this.properties = properties;
    this.children = tokens.map((child) => {
      if (child.kind === 'TokenGroup') {
        return child;
      }

      return Token.create(child);
    });
  }

  getTokens() {
    return this.children.flatMap((group) => {
      return group.getTokens();
    });
  }
}
