/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import * as yargs from 'yargs';
import { search } from './build-helpers/search';

export const command = 'build <asset-path>';
export const description = 'build an icon package';

export function builder(yargs: yargs.Argv) {
  yargs.positional('path', {
    describe: 'the path to the SVG assets you would like to build',
    demand: true,
    type: 'string',
  });

  yargs.option('target', {
    describe: 'the library package to build',
    choices: ['vanilla', 'react', 'angular', 'vue'],
    default: 'vanilla',
  });
}

interface HandlerOptions {
  readonly assetPath: string;
  readonly target: 'vanilla' | 'react' | 'angular' | 'vue';
}

export async function handler({ assetPath, target }: HandlerOptions) {
  const cwd = process.cwd();
  const assets = await search(path.resolve(cwd, assetPath));
}
