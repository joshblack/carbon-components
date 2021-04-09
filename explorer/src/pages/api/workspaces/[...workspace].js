/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Worktree, Workspace } from '../../../worktree';

export default async function handler(req, res) {
  const worktree = await Worktree.get();
  const name = req.query.workspace.join('/');
  const workspace = await Workspace.find(worktree, name);

  res.json(workspace);
}
