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

import glob from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';
import semver from 'semver';
import { createCryptoHash, createWebHash } from '../hash';

const cwd = process.cwd();
const { root: OS_ROOT_DIR } = path.parse(cwd);

/**
 * Find the root project `package.json` from a given workspace directory
 */
async function getProjectRoot(directory) {
  const packageJsonPath = path.join(directory, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    const parent = path.dirname(directory);
    if (parent === OS_ROOT_DIR && directory === OS_ROOT_DIR) {
      throw new Error('Unable to find workspace root');
    }
    return getProjectRoot(parent);
  }

  const packageJson = await fs.readJson(packageJsonPath);
  if (packageJson.workspaces) {
    return directory;
  }

  const parent = path.dirname(directory);
  if (parent === OS_ROOT_DIR && directory === OS_ROOT_DIR) {
    throw new Error('Unable to find workspace root');
  }
  return getProjectRoot(parent);
}

let _project = null;

/**
 * Get the project for the running process' cwd
 */
async function get() {
  if (_project === null) {
    const directory = await getProjectRoot(cwd);
    const worktree = await loadPackageJson(directory);

    function getWorkspaceById(worktree, id) {
      for (const child of worktree.children) {
        if (child.type === 'worktree') {
          const match = getWorkspaceById(child, id);
          if (match) {
            return match;
          }
        }

        if (child.id === id) {
          return child;
        }
      }

      return null;
    }

    function findWorkspace(worktree, name, version) {
      for (const child of worktree.children) {
        if (child.type === 'worktree') {
          const match = findWorkspace(child, name, version);
          if (match) {
            return match;
          }
        }

        if (child.packageJson.name !== name) {
          continue;
        }

        if (semver.satisfies(child.packageJson.version, version)) {
          return child;
        }
      }

      return null;
    }

    function getDependenciesForWorkspace(workspace) {
      const dependencies = [
        'peerDependencies',
        'dependencies',
        'devDependencies',
      ]
        .filter((type) => {
          return workspace.packageJson[type];
        })
        .flatMap((type) => {
          return Object.entries(workspace.packageJson[type]).map(
            ([name, version]) => {
              return {
                name,
                version,
                type,
              };
            }
          );
        });

      const workspaces = [];
      for (const dependency of dependencies) {
        const workspace = findWorkspace(
          worktree,
          dependency.name,
          dependency.version
        );
        if (workspace) {
          workspaces.push(workspace);
        }
      }

      return {
        dependencies: workspaces,
      };
    }

    async function getFilesForWorkspace(workspace) {
      const matches = await glob(
        ['src/**/*.css', 'src/**/*.scss', 'src/**/*.js'],
        {
          cwd: workspace.directory,
          ignore: [
            '**/__tests__/**',
            '**/es/**',
            '**/lib/**',
            '**/umd/**',
            '**/scripts/**',
            '**/vendor/**',
            '**/*-story.js',
            '**/*-story.scss',
            '**/*-story.css',
            '**/.storybook/**',
          ],
        }
      );
      const types = {
        '.css': 'css',
        '.scss': 'scss',
        '.js': 'js',
      };
      const files = matches.map((match) => {
        const filepath = path.join(workspace.directory, match);
        const type = path.extname(filepath);

        return {
          filepath,
          type: types[type],
          relativePath: match,
          id: createWebHash(filepath),
          sha256: createCryptoHash(filepath),
        };
      });

      const categories = [];
      const aggregate = {
        files: {
          total: 0,
          categories: {},
        },
      };

      for (const file of files) {
        if (!categories.includes(file.type)) {
          categories.push(file.type);
        }

        aggregate.files.total += 1;

        if (!aggregate.files.categories[file.type]) {
          aggregate.files.categories[file.type] = 0;
        }

        aggregate.files.categories[file.type] += 1;
      }

      return {
        categories,
        aggregate,
        files,
      };
    }

    _project = {
      directory,
      worktree,
      getWorkspaceById: (id) => {
        return getWorkspaceById(worktree, id);
      },
      getDependenciesForWorkspace,
      getFilesForWorkspace,
    };
  }

  return _project;
}

async function loadPackageJson(directory) {
  const packageJsonPath = path.join(directory, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`Unable to resolve package.json at: ${packageJsonPath}`);
  }

  const packageJson = await fs.readJson(packageJsonPath);

  // Worktree
  if (packageJson.workspaces) {
    let patterns = null;

    if (Array.isArray(packageJson.workspaces)) {
      patterns = packageJson.workspaces.map((pattern) => {
        return `${pattern}/package.json`;
      });
    } else if (Array.isArray(packageJson.workspaces.packages)) {
      patterns = packageJson.workspaces.packages.map((pattern) => {
        return `${pattern}/package.json`;
      });
    }

    const matches = await glob(patterns, {
      cwd: directory,
    });
    const children = await Promise.all(
      matches.map((match) => {
        return loadPackageJson(path.join(directory, path.dirname(match)));
      })
    );
    const ordered = children.slice().sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    const shas = ordered.map((child) => {
      return child.sha256;
    });
    const ids = ordered.map((child) => {
      return child.id;
    });
    const sha256 = createCryptoHash(...shas);
    const id = createWebHash(...ids);

    return {
      type: 'worktree',
      name: packageJson.name,
      id,
      sha256,
      children: ordered,
      packageJson,
    };
  }

  // Workspace
  const sha256 = createCryptoHash(packageJson.name);
  const id = createWebHash(sha256);
  return {
    type: 'workspace',
    name: packageJson.name,
    id,
    sha256,
    directory,
    packageJson,
  };
}

export const Project = {
  get,
  getProjectRoot,
};
