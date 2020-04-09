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
const SVG_OUTPUT_DIR = path.resolve(__dirname, '../svg');
const METADATA_DIR = path.resolve(__dirname, '../');

async function build() {
  const optimized = await builders.svg.run(SVG_DIR, {
    output: SVG_OUTPUT_DIR,
  });

  await builders.vanilla.run(SVG_DIR, {
    output: process.cwd(),
    optimized,
  });

  await Metadata.build({
    input: METADATA_DIR,
    extensions: [
      Metadata.extensions.pictograms,
      Metadata.extensions.moduleName,
      Metadata.extensions.deprecated,
      Metadata.extensions.categories,
    ],
  });
}

build().catch(error => {
  console.error(error);
  process.exit(1);
});
