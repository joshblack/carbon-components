/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { replace } = require('../../tools/replace');

const TARGET_VERSION = '11.0.0';

module.exports = {
  version: TARGET_VERSION,
  from: [
    {
      version: '10.x',
      async migrate(options) {
        const changes = [
          {
            from: /\$carbon--spacing-([\d]+)/gm,
            to: '$spacing-$1',
          },
        ];

        // await replace('**/*.scss', changes, options);
      },
    },
  ],
};
