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

// Output metadata.json -> `[icon]-[metadata]-index.json`? file
// 1) Load base metadata.<format> file
// 2) Load each <decorator>.<format> file
// 3) Validate each according to schema
// 4) Bring decorator info into metadata under each icon name
// 5) Write icon info and each decorator to `metadata.json`
async function build(adapter, directory, decoratorsToBuild = []) {
  const { metadata, decorators } = await load(
    adapter,
    directory,
    decoratorsToBuild
  );

  validate(metadata, decorators);

  const indexFilePath = path.join(directory, 'build-info.json');
  const index = Object.assign({}, metadata);

  // Add each decorator data to the index, decorator names should be unique
  for (const { decorator, data } of decorators) {
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
    decorator.decorate(index.icons, data);
  }

  await fs.ensureFile(indexFilePath);
  await fs.writeJson(indexFilePath, index, {
    spaces: 2,
  });
}

module.exports = {
  build,
};
