/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const adapters = require('./adapters');
const decorators = require('./decorators');
const { build } = require('./build');
const { load, save } = require('./storage');
const { validate } = require('./validate');

async function check(adapter, directory, decoratorsToCheck = []) {
  const { metadata, decorators } = await load(
    adapter,
    directory,
    decoratorsToCheck
  );
  validate(metadata, decorators);
}

module.exports = {
  adapters,
  build,
  check,
  decorators,
  load,
  validate,
  save,
};
