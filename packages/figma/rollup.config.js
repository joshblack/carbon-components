/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

module.exports = {
  input: path.resolve(__dirname, './src/index.js'),
  output: {
    format: 'umd',
    file: path.resolve(__dirname, 'umd/index.js'),
  },
  external: [],
  plugins: [
    nodeResolve({ mainFields: ['module', 'main'] }),
    commonjs({
      include: /node_modules/,
      extensions: ['.js'],
    }),
    babel({
      exclude: /node_modules/,
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              browsers: ['last 1 version'],
            },
            useBuiltIns: 'entry',
            corejs: '3',
          },
        ],
      ],
    }),
  ],
};
