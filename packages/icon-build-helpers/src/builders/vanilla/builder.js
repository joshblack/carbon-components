/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { reporter } = require('@carbon/cli-reporter');
const { pascalCase } = require('change-case');
const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const { rollup } = require('rollup');
const { flatMapAsync } = require('../../tools');
const { parse } = require('./svg');
const virtual = require('../plugins/virtual');

const prettierOptions = {
  parser: 'babel',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  proseWrap: 'always',
};

//
const Registry = require('../../metadata/registry');
//

async function run(directory, { output, optimized } = {}) {
  const registry = await Registry.create(directory);
  console.log(registry.get('composer-edit'));
  return;

  reporter.info(`Building the module source for ${registry.size} icons...`);

  const ORIGINAL_SIZE = 32;
  const SCALED_SIZES = [24, 20, 16];
  const files = await flatMapAsync(Array.from(registry.values()), icon => {
    return flatMapAsync(icon.assets, async asset => {
      const artifact = optimized.find(item => item.filepath === asset.filepath);
      if (!artifact) {
        throw new Error(
          `Unable to find build artifact for asset ${asset.filepath}`
        );
      }

      const sizes = [asset.size];
      if (asset.size === ORIGINAL_SIZE) {
        const sizesToBuild = SCALED_SIZES.filter(size => {
          return !icon.assets.find(asset => asset.size === size);
        });
        sizes.push(...sizesToBuild);
      }

      return Promise.all(
        sizes.map(async size => {
          const descriptor = await createDescriptor(
            icon.id,
            artifact.optimized.data,
            size,
            size !== asset.size ? asset.size : undefined
          );
          const { source, moduleName } = createIconSource(
            icon.id,
            descriptor,
            size,
            icon.namespace
          );

          console.log(icon.id, size, moduleName);

          return {
            ...asset,
            id: icon.id,
            namespace: icon.namespace,
            descriptor,
            source,
            moduleName,
          };
        })
      );
    });
  });

  console.log(JSON.stringify(files, null, 2));
  return;
  reporter.info('Building JavaScript modules...');

  const inputs = files.map(file => {
    const { id, namespace, size } = file;
    const formattedPrefix = namespace.filter(step => isNaN(step));
    const moduleFolder = path.join(...formattedPrefix, id);
    const filepath = path.join(moduleFolder, size ? `${size}.js` : 'index.js');

    return {
      ...file,
      filepath,
    };
  });

  const bundle = await rollup({
    input: inputs.reduce(
      (acc, input) => ({
        ...acc,
        [input.filepath]: input.filepath,
      }),
      {}
    ),
    external: [],
    plugins: [
      virtual(
        inputs.reduce(
          (acc, input) => ({
            ...acc,
            [input.filepath]: input.source,
          }),
          {}
        )
      ),
    ],
  });

  const BUNDLE_FORMATS = [
    {
      directory: 'es',
      file: path.join(output, 'es/index.js'),
      format: 'esm',
    },
    {
      directory: 'lib',
      file: path.join(output, 'lib/index.js'),
      format: 'cjs',
    },
  ];

  await Promise.all(
    BUNDLE_FORMATS.map(({ directory, format }) => {
      return bundle.write({
        dir: directory,
        format,
        // We already specify `.js` in the `filepath` used in `input` above
        entryFileNames: '[name]',
      });
    })
  );

  reporter.info('Building module entrypoints...');

  let entrypoint = `/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

  for (const file of files) {
    const { moduleName, descriptor } = file;
    const value = JSON.stringify(descriptor);
    entrypoint += `\nexport const ${moduleName} = ${value}`;
  }

  const entrypointBundle = await rollup({
    input: '__entrypoint__.js',
    external: [],
    plugins: [
      virtual({
        '__entrypoint__.js': prettier.format(entrypoint, prettierOptions),
      }),
    ],
  });

  await Promise.all(
    BUNDLE_FORMATS.map(({ format, file }) => {
      const outputOptions = {
        format,
        file,
      };

      return entrypointBundle.write(outputOptions);
    })
  );

  const formattedOutput = inputs.map(input => {
    const {
      filename,
      basename,
      size,
      prefix,
      descriptor,
      moduleName,
      original,
      filepath,
    } = input;
    return {
      filename,
      basename,
      size,
      prefix,
      descriptor,
      moduleName,
      original,
      outputOptions: {
        file: path.join('es', filepath),
      },
    };
  });

  await fs.writeJson(path.join(output, 'build-info.json'), formattedOutput, {
    spaces: 2,
  });

  reporter.success('Done! 🎉');
}

/**
 * @param {string} name
 * @param {string} [size]
 * @param {Array<string>} [prefixParts]
 * @param {object} descriptor
 */
function getModuleName(name, size, prefixParts, descriptor) {
  const width = parseInt(descriptor.attrs.width, 10);
  const height = parseInt(descriptor.attrs.height, 10);
  let prefix = prefixParts
    .filter(size => isNaN(size))
    .map(pascalCase)
    .join('');
  const isGlyph = width < 16 || height < 16;

  if (prefix !== '') {
    if (prefix.match(/^\d/)) {
      prefix = '_' + prefix;
    }
    if (!size) {
      if (isGlyph) {
        return prefix + pascalCase(name) + 'Glyph';
      }
      return prefix + pascalCase(name);
    }
    return prefix + pascalCase(name) + size;
  }

  if (!size) {
    if (isGlyph) {
      return pascalCase(name) + 'Glyph';
    }
    if (isNaN(name[0])) {
      return pascalCase(name);
    }
    return '_' + pascalCase(name);
  }

  if (isNaN(name[0])) {
    return pascalCase(name) + size;
  }

  return '_' + pascalCase(name) + size;
}

/**
 * @param {string} id
 * @param {object} descriptor
 * @param {string} [size]
 * @param {Array<string>} [namespace]
 * @returns {object}
 */
function createIconSource(id, descriptor, size, namespace = []) {
  return {
    source: prettier.format(
      `export default ${JSON.stringify(descriptor)};`,
      prettierOptions
    ),
    moduleName: getModuleName(id, size, namespace, descriptor),
  };
}

/**
 * @param {string} name
 * @param {string} data
 * @param {string} [size]
 * @param {string} [original]
 * @returns {object}
 */
async function createDescriptor(name, data, size, original) {
  const info = await parse(data, name);
  const descriptor = {
    ...info,
    name,
  };

  if (size) {
    descriptor.size = size;
    descriptor.attrs.width = size;
    descriptor.attrs.height = size;
    descriptor.attrs.viewBox = original
      ? `0 0 ${original} ${original}`
      : `0 0 ${size} ${size}`;
  } else {
    const [width, height] = info.attrs.viewBox.split(' ').slice(2);
    descriptor.attrs.width = width;
    descriptor.attrs.height = height;
  }

  return descriptor;
}

module.exports = {
  run,
};
