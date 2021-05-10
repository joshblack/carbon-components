/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ErrorBoundary } from 'carbon-components-react';
import Link from 'next/link';
import { Fetch } from '~/components/Fetch';
import Header from '~/components/Header';
import { Stack } from '~/components/Stack';

export default function IndexPage() {
  return (
    <>
      <Header />
      <ErrorBoundary fallback="Error loading worktree">
        <Fetch url="/api/worktree" fallback="Loading worktree...">
          {(data) => {
            return (
              <main>
                <h1>Workspaces</h1>
                <Stack as="section" step={8} className="bx--css-grid">
                  {data.workspaces.map((workspace) => {
                    return (
                      <article
                        key={workspace.directory}
                        className="bx--col-span-4">
                        <header>{workspace.name}</header>
                        <Link href={`/workspaces/${workspace.name}`}>
                          <a>Link</a>
                        </Link>
                      </article>
                    );
                  })}
                </Stack>
              </main>
            );
          }}
        </Fetch>
      </ErrorBoundary>
    </>
  );
}
