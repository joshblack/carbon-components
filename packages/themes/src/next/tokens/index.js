/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { theme as v11 } from './v11';

export const tokens = v11.getTokens().map((token) => {
  return token.getName('javascript');
});
