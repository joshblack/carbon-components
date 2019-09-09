/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { builders, Metadata } = require('@carbon/icon-build-helpers');
const path = require('path');

const PACKAGE_DIR = path.resolve(__dirname, '..');

async function build() {
  const index = await Metadata.build(Metadata.adapters.yml, PACKAGE_DIR, [
    Metadata.decorators.aliases,
    Metadata.decorators.categories,
    Metadata.decorators.moduleName,
  ]);

  await builders.vanilla(index);
}

build().catch(error => {
  console.error(error);
  process.exit(1);
});
