/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs-extra';
import path from 'path';
import { flatMapAsync } from './flatMap';

interface SVGFile {
  readonly filepath: string;
  readonly filename: string;
  readonly basename: string;
  readonly size?: number;
}

interface SVGAsset extends SVGFile {
  readonly prefix: Array<string>;
}

export async function search(directory: string): Promise<Array<SVGAsset>> {
  if (!(await fs.pathExists(directory))) {
    throw new Error(`Unable to find directory at: \`${directory}\``);
  }

  const files = await searchForSVGAssets(directory);
  const filesWithPrefix = files.map(file => {
    const { filepath } = file;
    const dirname = path.dirname(filepath);
    const prefix = path
      .relative(directory, dirname)
      .split('/')
      .filter(part => {
        return !Number.isNaN(parseInt(part, 10));
      });
    return {
      ...file,
      prefix,
    };
  });

  return filesWithPrefix;
}

async function searchForSVGAssets(directory: string): Promise<Array<SVGFile>> {
  const filenames = (await fs.readdir(directory)).filter(filename => {
    if (path.extname(filename) === '.svg') {
      return true;
    }
    const stats = fs.statSync(path.join(directory, filename));
    return stats.isDirectory();
  });

  return flatMapAsync<Array<string>, SVGFile | Array<SVGFile>>(
    filenames,
    async filename => {
      const filepath = path.join(directory, filename);
      const stats = await fs.stat(filepath);

      if (await stats.isDirectory()) {
        const dirname = path.basename(filepath);
        const results = await searchForSVGAssets(filepath);
        if (Number.isNaN(parseInt(dirname, 10))) {
          return results;
        }
        return results.map(result => ({
          ...result,
          size: parseInt(dirname, 10),
        }));
      }

      return {
        filepath,
        filename,
        basename: path.basename(filename, '.svg'),
      };
    }
  );
}
