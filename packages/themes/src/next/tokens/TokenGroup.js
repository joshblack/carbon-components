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

    if (properties) {
      this.properties = properties;
    }

    this.children = tokens.map((child) => {
      if (child.kind === 'TokenGroup') {
        return child;
      }

      return Token.create(child);
    });
  }

  *[Symbol.iterator]() {
    for (const child of this.children) {
      yield child;

      if (child.kind === 'TokenGroup') {
        yield* child;
      }
    }
  }

  getTokens(parentContext = {}) {
    const context = {
      ...parentContext,
      groups: parentContext.groups
        ? parentContext.groups.concat(this.name)
        : [this.name],
      properties: this.properties || parentContext.properties,
    };

    return this.children.flatMap((child) => {
      if (child.kind === 'TokenGroup') {
        return child.getTokens(context);
      }

      const token = {
        ...context,
        name: child.name,
        properties: child.properties || context.properties,
      };

      if (child.state) {
        token.state = child.state;
      }

      return token;
    });
  }

  getToken(name) {
    for (const child of this) {
      if (child.kind === 'TokenGroup') {
        continue;
      }

      if (child.name === name) {
        return child;
      }
    }
    return null;
  }

  getGroups() {
    const set = new Set();

    for (const child of this) {
      if (child.kind !== 'TokenGroup') {
        continue;
      }
      set.add(child.name);
    }

    return Array.from(set);
  }

  getProperties() {
    const set = new Set();

    for (const child of this) {
      if (!Array.isArray(child.properties)) {
        continue;
      }

      for (const property of child.properties) {
        set.add(property);
      }
    }

    return Array.from(set);
  }
}
