/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const Module = require('module');
const rollup = require('rollup').rollup;
const virtual = require('rollup-plugin-virtual');
const vm = require('vm');

function createModuleGenerator({ external = [], plugins = [] } = {}) {
  return async (source, { name = '<MockModule>' } = {}) => {
    const bundle = await rollup({
      input: '__entrypoint__',
      external,
      plugins: [
        ...plugins,
        virtual({
          __entrypoint__: source,
        }),
      ],
    });
    const { output } = await bundle.generate({
      format: 'cjs',
    });
    const module = new Module(name);
    const sandbox = {
      console,
      module,
      require,
      exports: module.exports,
    };
    vm.createContext(sandbox);
    vm.runInContext(output[0].code, sandbox);

    return sandbox.module.exports;
  };
}

module.exports = {
  createModuleGenerator,
};
