/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { theme, sets } from './v11';

export { theme, sets };

const TokenName = {
  convert(name, format) {
    if (format === 'javascript') {
      const keywords = new Set(['ui']);
      return name
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

    return name;
  },
};

const TokenValue = {
  convert(value, _format) {
    return value;
  },
};

export const TokenFormat = {
  convert({ name, format, value }) {
    if (name) {
      return TokenName.convert(name, format);
    }
    return TokenValue.convert(value, format);
  },
};
