/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { builders, Metadata } = require('@carbon/icon-build-helpers');
const path = require('path');

const SVG_DIR = path.resolve(__dirname, '../src/svg');

async function build() {
  const metadata = await Metadata.build({
    input: path.resolve(__dirname, '../'),
    svgDir: SVG_DIR,
    extensions: [
      Metadata.extensions.icons,
      Metadata.extensions.assets,
      Metadata.extensions.deprecated,
      Metadata.extensions.build,
      Metadata.extensions.categories,
    ],
  });

  await builders.vanilla.run(metadata, {
    output: process.cwd(),
  });
}

build().catch(error => {
  console.log(error);
  process.exit(1);
});
