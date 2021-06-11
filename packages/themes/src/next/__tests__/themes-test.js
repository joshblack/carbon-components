/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { themes } from '../';
import { tokens } from '../tokens';

describe('themes', () => {
  describe.each(Object.entries(themes))('%s', (_name, theme) => {
    test.each(tokens)('%s should exist', (token) => {
      expect(theme[token]).toBeDefined();
    });
  });
});
