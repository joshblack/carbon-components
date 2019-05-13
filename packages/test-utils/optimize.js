/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const Terser = require('terser');
const { createModuleGenerator } = require('./module');

const defaultTerserOptions = {
  parse: {
    ecma: 8,
  },
  compress: {
    ecma: 5,
    warnings: false,
    // Disabled because of an issue with Uglify breaking seemingly valid code:
    // https://github.com/facebook/create-react-app/issues/2376
    // Pending further investigation:
    // https://github.com/mishoo/UglifyJS2/issues/2011
    comparisons: false,
    // Disabled because of an issue with Terser breaking valid code:
    // https://github.com/facebook/create-react-app/issues/5250
    // Pending futher investigation:
    // https://github.com/terser-js/terser/issues/120
    inline: 2,
  },
  mangle: false,
  output: {
    beautify: true,
    ecma: 5,
    comments: false,
    // Turned on because emoji and regex is not minified properly using default
    // https://github.com/facebook/create-react-app/issues/2488
    ascii_only: true,
  },
};

function createMinifier({
  generate = createModuleGenerator(),
  terserOptions = defaultTerserOptions,
  transform,
} = {}) {
  return async function minify(source, {} = {}) {
    const input = transform ? transform(source) : source;
    const { code, error } = Terser.minify(input, terserOptions);
    if (error) {
      throw error;
    }
    return {
      code,
      input,
      source,
      virtual: await generate(code),
    };
  };
}

async function main() {
  const minify = createMinifier();
  const code = `
  let counter = 0;
  class A {
    constructor() {
      counter++;
    }
  }
  const a = new A();
  console.log(counter);
`;
  const output = await minify(code);
}

main().catch(error => {
  console.error(error);
});
