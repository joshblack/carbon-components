/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');

/**
 * @param {Adapter} adapter
 * @param {string} directory
 * @param {Array<Decorator>} decoratorsToLoad
 * @returns {object}
 */
async function load(adapter, directory, decoratorsToLoad = []) {
  const iconsFilePath = path.join(directory, adapter.getFilenameFor('icons'));
  if (!(await fs.pathExists(iconsFilePath))) {
    throw new Error(
      `Unable to find metadata file at path: \`${iconsFilePath}\``
    );
  }

  const metadata = await adapter.deserialize(
    await fs.readFile(iconsFilePath, 'utf8')
  );
  const decorators = await Promise.all(
    decoratorsToLoad.map(async decorator => {
      // If generated, the decorator has no file that has been persisted to disk
      // so we don't have to load it.
      if (decorator.generated) {
        return {
          decorator,
        };
      }

      const filepath = path.join(
        directory,
        adapter.getFilenameFor(decorator.name)
      );
      if (!(await fs.pathExists(filepath))) {
        throw new Error(
          `Unable to find decorator \`${decorator.name}\` at filepath: ` +
            `${filepath}`
        );
      }
      const data = adapter.deserialize(await fs.readFile(filepath, 'utf8'));
      return {
        decorator,
        data,
      };
    })
  );

  return {
    metadata,
    decorators,
  };
}

/**
 * @param {Adapter} adapter
 * @param {string} directory
 * @param {object} metadata
 * @param {Array} decorators
 * @returns {void}
 */
async function save(adapter, directory, metadata, decorators = []) {
  const iconsFilePath = path.join(directory, adapter.getFilenameFor('icons'));

  await fs.ensureFile(iconsFilePath);
  await fs.writeFile(iconsFilePath, adapter.serialize(metadata), 'utf8');

  await Promise.all(
    decorators.map(async ({ decorator, data }) => {
      const filepath = path.join(
        directory,
        adapter.getFilenameFor(decorator.name)
      );
      await fs.ensureFile(filepath);
      await fs.writeFile(filepath, adapter.serialize(data), 'utf8');
    })
  );
}

module.exports = {
  load,
  save,
};
