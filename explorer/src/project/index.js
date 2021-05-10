/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Terminology
 *
 * Project: the whole directory tree making up your workspaces
 * Workspace: a specific named package stored anywhere within the project
 * Worktree: the name given to packages that list their own child workspaces
 *
 * A project contains one or more worktrees, a worktree may contain any number
 * of workspaces.
 *
 * @see https://yarnpkg.com/features/workspaces
 */

import fs from 'fs-extra';
import path from 'path';

const cwd = process.cwd();
const { root: OS_ROOT_DIR } = path.parse(cwd);

/**
 * Find the root project `package.json` from a given workspace directory
 */
async function getWorkspaceProjectRoot(directory) {
  const packageJsonPath = path.join(directory, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    const parent = path.dirname(directory);
    if (parent === OS_ROOT_DIR && directory === OS_ROOT_DIR) {
      throw new Error('Unable to find workspace root');
    }
    return getWorkspaceProjectRoot(parent);
  }

  const packageJson = await fs.readJson(packageJsonPath);
  if (packageJson.workspaces) {
    return directory;
  }

  const parent = path.dirname(directory);
  if (parent === OS_ROOT_DIR && directory === OS_ROOT_DIR) {
    throw new Error('Unable to find workspace root');
  }
  return getWorkspaceProjectRoot(parent);
}

let _project = null;

/**
 * Get the project for the running process' cwd
 */
function get(directory = cwd) {
  if (_project === null) {
    const children = [
      {
        type: 'workspace',
      },
      {
        type: 'worktree',
        children: [],
      },
    ];

    _project = {
      directory,
      children,
    };
  }

  return _project;
}

export const Project = {
  get,
  getWorkspaceProjectRoot,
};
