/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const Registry = require('../../metadata/registry');
const { plugins, svgo } = require('./optimizer');

/**
 * @param {string} directory
 * @param {object} [config]
 * @param {Function} [config.optimizer]
 * @param {string} [config.output]
 * @returns {Array}
 */
async function run(directory, { optimizer = svgo, output } = {}) {
  const registry = await Registry.create(directory);
  const optimized = await Promise.all(
    Array.from(registry.values()).flatMap(icon => {
      return icon.assets.map(async asset => {
        const source = await fs.readFile(asset.filepath);
        const optimized = await optimizer.optimize(source, {
          path: asset.filepath,
        });
        return {
          ...asset,
          id: icon.id,
          namespace: icon.namespace,
          optimized,
          source,
        };
      });
    })
  );

  if (output) {
    await fs.emptyDir(output);
    await Promise.all(
      optimized.map(async icon => {
        const filepath = path.join(
          output,
          path.relative(directory, icon.filepath)
        );
        await fs.ensureFile(filepath);
        await fs.writeFile(filepath, icon.optimized.data, 'utf8');
      })
    );
  }

  return optimized;
}

module.exports = {
  run,
  plugins,
};
