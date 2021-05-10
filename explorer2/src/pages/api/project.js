/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Project } from '../../project';

export default async function handler(_req, res) {
  const project = await Project.get();
  res.json(project);
}
