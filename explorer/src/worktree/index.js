/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs-extra';
import glob from 'fast-glob';
import path from 'path';

const WORKTREE_ROOT = path.resolve(process.cwd(), '..');

let worktree = null;

export const Worktree = {
  async get() {
    if (!worktree) {
      worktree = await Worktree.find(WORKTREE_ROOT);
    }
    return worktree;
  },
  async find(directory) {
    const packageJsonPath = path.join(directory, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
      throw new Error(`Unable to find package.json at ${packageJsonPath}`);
    }

    const packageJson = await fs.readJson(packageJsonPath);

    if (!packageJson.workspaces) {
      throw new Error(
        `Expected package.json at: ${packageJsonPath} to specify workspaces`
      );
    }

    const globs = Array.isArray(packageJson.workspaces)
      ? packageJson.workspaces
      : packageJson.workspaces.packages;
    const workspacePaths = [];

    for (const pattern of globs) {
      const matches = await glob(`${pattern}/package.json`, {
        cwd: directory,
      });
      for (const match of matches) {
        workspacePaths.push(path.join(directory, match));
      }
    }

    const workspaces = await Promise.all(
      workspacePaths.map(async (workspacePath) => {
        const packageJson = await fs.readJson(workspacePath);
        return {
          directory: path.dirname(workspacePath),
          name: packageJson.name,
          packageJson,
        };
      })
    );

    return {
      directory,
      workspaces,
    };
  },
};

export const Workspace = {
  async find(worktree, name) {
    const entry = worktree.workspaces.find((workspace) => {
      return workspace.name === name;
    });

    if (!entry) {
      throw new Error(`Unable to find a workspace named: ${name}`);
    }

    const workspace = {
      name: entry.name,
      version: entry.packageJson.version,
      description: entry.packageJson.description,
      directory: entry.directory,
      dependencies: [
        ...getDependencies('peerDependencies'),
        ...getDependencies('devDependencies'),
        ...getDependencies('dependencies'),
      ],
      files: getFiles(),
    };

    function getFiles() {
      const matches = glob.sync(['src/**/*.js', 'src/**/*.ts', '**/*.scss'], {
        cwd: entry.directory,
        ignore: [
          '**/es/**',
          '**/lib/**',
          '**/umd/**',
          '**/vendor/**',
          '**/node_modules/**',
          '**/examples/**',
          '**/docs/**',
          '**/tasks/**',
          '**/*-test.js',
          '**/__tests__/**',
          '**/__mocks__/**',
          '**/__testfixtures__/**',
          '**/stories/**',
          '**/*-story.js',
        ],
      });

      return matches.map((match) => {
        const filepath = path.join(entry.directory, match);
        return {
          filepath,
          relative: match,
          // Remove leading `.` character
          type: path.extname(filepath).slice(1),
        };
      });
    }

    function getDependencies(type) {
      if (!entry.packageJson[type]) {
        return [];
      }

      return Object.entries(entry.packageJson[type]).map(([name, version]) => {
        const pkg = {
          type,
          name,
          version,
        };

        if (isInWorktree(worktree, pkg)) {
          pkg.workspace = true;
        } else {
          pkg.workspace = false;
        }

        return pkg;
      });
    }

    function isInWorktree(worktree, pkg) {
      return worktree.workspaces.find((workspace) => {
        return workspace.name === pkg.name;
      });
    }

    return workspace;
  },
};
