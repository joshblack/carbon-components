/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SassRenderer } from '@carbon/test-utils/src/renderer';
import cssstats from 'cssstats';
import fs from 'fs-extra';
import path from 'path';
import { Worktree, Workspace } from '~/worktree';

export default async function handler(req, res) {
  const worktree = await Worktree.get();
  const workspace = await Workspace.find(
    worktree,
    req.query.workspace.join('/')
  );
  const entrypoint = getEntrypoint(workspace);
  const result = {
    entrypoint,
    files: [],
  };

  const queue = [entrypoint.filepath];
  const graph = new Map();

  while (queue.length !== 0) {
    const filepath = queue.shift();

    if (graph.has(filepath)) {
      continue;
    }

    const source = await fs.readFile(filepath, 'utf8');
    const file = {
      id: path.relative(workspace.directory, filepath),
      filepath,
      imports: new Set(),
    };

    // Imports
    for (const [_match, group] of source.matchAll(/\@import '(.+)';$/gm)) {
      const parts = group.split('/');
      let filename = parts.pop();
      const directory = path.resolve(path.dirname(filepath), parts.join('/'));
      const candidates = [
        filename,
        `_${filename}`,
        `${filename}.scss`,
        `_${filename}.scss`,
        `${filename}.css`,
        `_${filename}.css`,
      ].map((candidate) => {
        return path.join(directory, candidate);
      });
      const importPath = candidates.find((candidate) => {
        return fs.existsSync(candidate);
      });

      if (importPath) {
        file.imports.add(path.relative(workspace.directory, importPath));
        queue.push(importPath);
      } else {
        console.log();
        console.log('MISS');
        console.log(filepath);
        console.log(group);
        console.log();
      }
    }

    graph.set(file.id, file);
  }

  console.log(graph);

  res.json(result);
}

function getEntrypoint(workspace) {
  if (workspace.name === 'carbon-components') {
    return workspace.files.find((file) => {
      return file.relative === 'src/globals/scss/styles.scss';
    });
  }

  const candidates = ['index.scss', 'scss/index.scss'];
  const entrypoint = candidates.find((candidate) => {
    return workspace.files.find((file) => {
      return file.relative === candidate;
    });
  });

  if (entrypoint) {
    return entrypoint;
  }

  throw new Error(`Unable to find entrypoint for workspace: ${workspace.name}`);
}

function collect(entrypoint) {}
