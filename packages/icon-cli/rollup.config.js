/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const nodeResolve = require('rollup-plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const packageJson = require('./package.json');

module.exports = {
  input: {
    cli: path.resolve(__dirname, './src/cli.ts'),
    'commands/build': path.resolve(__dirname, './src/commands/build.ts'),
  },
  output: {
    format: 'cjs',
    dir: path.resolve(__dirname, 'lib'),
  },
  external: Object.keys(packageJson.dependencies),
  plugins: [
    nodeResolve({
      mainFields: ['module', 'main'],
      preferBuiltins: true,
      extensions: ['.js', '.ts'],
    }),
    commonjs({
      include: /node_modules/,
      extensions: ['.js'],
    }),
    json({
      exclude: /node_modules/,
      compact: true,
      namedExports: false,
    }),
    babel({
      extensions: ['.ts', '.js'],
      exclude: /node_modules/,
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              node: '10',
            },
          },
        ],
        '@babel/preset-typescript',
      ],
    }),
    terser(),
  ],
};
