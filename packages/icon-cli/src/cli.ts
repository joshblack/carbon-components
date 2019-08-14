/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cli from 'yargs';
import packageJson from '../package.json';

type CustomError = Error & {
  // Sometimes we'll receive an error from execa which places stderr on the
  // Error object
  stderr?: string;
};

async function main({ argv }: NodeJS.Process) {
  cli
    .scriptName(packageJson.name)
    .version(packageJson.version)
    .usage('Usage: $0 [options]');

  // build <react|angular|vanilla>
  // --include-metadata

  // metadata
  // generate first time
  // sync
  // validate
  cli
    .commandDir('commands')
    .strict()
    .fail((message: string, error: CustomError) => {
      if (error) {
        if (error.stderr) {
          console.error(error.stderr);
          process.exit(1);
        }
        throw error;
      }
      console.log(message);
      process.exit(1);
    })
    .parse(argv.slice(2)).argv;
}

export default main;
