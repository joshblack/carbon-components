/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const { load } = require('./storage');
const { validate } = require('./validate');

async function build(adapter, directory, decoratorsToBuild = []) {
  const { metadata, decorators } = await load(
    adapter,
    directory,
    decoratorsToBuild
  );

  validate(metadata, decorators);

  const indexFilePath = path.join(directory, 'metadata.json');
  const index = Object.assign({}, metadata);

  // Add each decorator data to the index, decorator names should be unique
  for (const { decorator, data } of decorators) {
    // Decorators that are generated won't have any data associated with them as
    // they operate on the icon list in-memory versus saving any data to disk.
    if (!data) {
      continue;
    }

    // Ergonomic check to see if the decorator has a top-level key that matches
    // its name. If so, we'll include the contents as a convenience instead of
    // duplicate the key. For example, instead of:
    //
    // { "aliases": { "aliases": [...] } }
    //
    // We'd have:
    //
    // { "aliases": [...] }
    index[decorator.name] = data[decorator.name] || data;
  }

  // For each decorator, decorate the icon index with the given loaded data for
  // the decorator
  for (const { decorator, data } of decorators) {
    if (decorator.decorate) {
      decorator.decorate(index.icons, data);
    }
  }

  await fs.ensureFile(indexFilePath);
  await fs.writeJson(indexFilePath, index, {
    spaces: 2,
  });

  return index;
}

module.exports = {
  build,
};
