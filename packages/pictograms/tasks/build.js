/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { Metadata } = require('@carbon/icon-build-helpers');
const path = require('path');

const PACKAGE_DIR = path.resolve(__dirname, '..');

Metadata.build(Metadata.adapters.yml, PACKAGE_DIR, [
  Metadata.decorators.categories,
  Metadata.decorators.aliases,
]).catch(error => {
  console.error(error);
  process.exit(1);
});
