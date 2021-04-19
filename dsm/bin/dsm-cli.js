#!/usr/bin/env node

/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

process.on('unhandledRejection', (error) => {
  console.error(error);
});

var currentNodeVersion = process.versions.node;
var semver = currentNodeVersion.split('.');
var major = semver[0];

if (major < 14) {
  console.error(
    `You are running Node ${currentNodeVersion}.\n` +
      `dsm requires Node 14 or higher, please update your ` +
      `version of Node.`
  );
  process.exit(1);
}

var main = require('../src/cli');

main(process).catch((error) => {
  console.error(error);
  process.exit(1);
});
