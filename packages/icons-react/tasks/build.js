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
  const packagePath = require.resolve('@carbon/icons/package.json');
  const metadata = await Metadata.load({
    input: path.dirname(packagePath),
    svgDir: path.join(path.dirname(packagePath), 'src/svg'),
    extensions: [
      Metadata.extensions.icons,
      Metadata.extensions.assets,
      Metadata.extensions.deprecated,
      Metadata.extensions.build,
    ],
  });

  await builders.react.run(metadata, {
    output: process.cwd(),
  });
}

build().catch(error => {
  console.error(error);
  process.exit(1);
});
