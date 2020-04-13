/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { builders, Metadata } = require('@carbon/icon-build-helpers');
const path = require('path');

async function build() {
  const metadata = await Metadata.build({
    input: path.resolve(__dirname, '../'),
    svgDir: path.resolve(__dirname, '../src/svg'),
    extensions: [
      Metadata.extensions.pictograms,
      Metadata.extensions.assets,
      Metadata.extensions.build,
      Metadata.extensions.deprecated,
      Metadata.extensions.categories,
    ],
  });

  await builders.vanilla.run(metadata, {
    output: process.cwd(),
  });
}

build().catch(error => {
  console.error(error);
  process.exit(1);
});
