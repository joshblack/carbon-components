/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const { createFsFromVolume, Volume } = require('memfs');
const { yml } = require('../adapters');
const { categories } = require('../decorators');

// beforeEach(() => {
// jest.resetModules();
// const mockVol = Volume.fromJSON({});
// const mockFs = createFsFromVolume(mockVol);
// jest.mock('fs', () => mockFs);
// });

// Metadata does not exist
// Decorator file does not exist
// Metadata with no decorators
// Metadata with decorators
test('read and write', async () => {
  const mockVol = Volume.fromJSON({
    // '/metadata.yml': yml.serialize({
    // icons: [],
    // }),
  });
  const mockFs = createFsFromVolume(mockVol);
  jest.mock('fs', () => mockFs);

  const fs = require('fs-extra');
  const { load, save } = require('../storage');
  // const output = await load(yml, '/');
  // console.log(output);

  await save(
    yml,
    '/',
    {
      icons: [
        {
          name: 'hi',
        },
      ],
    },
    [
      {
        decorator: {
          name: 'categories',
        },
        data: {
          categories: [
            {
              name: 'A',
            },
          ],
        },
      },
    ]
  );

  // console.log(mockVol);
  // console.log(await fs.readdir('/'));
});

test('build', async () => {
  const mockVol = Volume.fromJSON({
    '/metadata.yml': yml.serialize({
      icons: [
        {
          name: 'icon-a',
        },
        {
          name: 'icon-b',
        },
        {
          name: 'icon-c',
        },
      ],
    }),
    '/categories.yml': yml.serialize({
      categories: [
        {
          name: 'category-a',
          members: ['icon-a', 'icon-b'],
        },
        {
          name: 'category-b',
          members: ['icon-c'],
        },
      ],
    }),
  });
  const mockFs = createFsFromVolume(mockVol);
  jest.mock('fs', () => mockFs);

  const fs = require('fs-extra');
  const { build } = require('../build');

  await build(yml, '/', [categories]);

  // console.log(await fs.readFile('/metadata-index.json', 'utf8'));
});

test.only('check', async () => {
  const mockVol = Volume.fromJSON({
    '/metadata.yml': yml.serialize({
      icons: [
        {
          name: 'icon-a',
        },
        {
          name: 'icon-b',
        },
        {
          name: 'icon-c',
        },
      ],
    }),
    '/categories.yml': yml.serialize({
      categories: [
        {
          name: 'category-a',
          members: ['icon-a', 'icon-b'],
        },
        {
          name: 'category-b',
          members: ['icon-c'],
        },
      ],
    }),
  });
  const mockFs = createFsFromVolume(mockVol);
  jest.mock('fs', () => mockFs);

  const fs = require('fs-extra');
  const { check } = require('../');

  await check(yml, '/', [categories]);
  // await build(yml, '/', [categories]);

  // console.log(await fs.readFile('/metadata-index.json', 'utf8'));
});
