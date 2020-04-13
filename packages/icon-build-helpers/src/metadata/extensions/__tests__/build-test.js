/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

describe('build', () => {
  let build;
  let icons;
  let Metadata;
  let moduleName;
  let vol;
  let yml;

  beforeEach(() => {
    jest.mock('fs', () => {
      const memfs = require('memfs');
      vol = memfs.vol;
      return memfs.fs;
    });

    Metadata = require('../..');
    build = require('../build');
    icons = require('../icons');
    moduleName = require('../module-name');
    yml = require('../../adapters').yml;
  });

  afterEach(() => {
    vol.reset();
  });

  it('should work', async () => {
    const filename = yml.getFilenameFor(icons.name);
    const files = {
      '/svg/32/a.svg': 'mock',
      [`/${filename}`]: yml.serialize([
        {
          name: 'a',
          friendly_name: 'a',
          aliases: [],
          sizes: [32],
        },
      ]),
    };
    vol.fromJSON(files);

    const metadata = await Metadata.load({
      input: '/',
      extensions: [icons, moduleName, build],
    });

    console.log(metadata.icons[0].output);
  });
});
