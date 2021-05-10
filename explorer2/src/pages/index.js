/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ErrorBoundary } from '@carbon/react';
import Link from 'next/link';
import { Header } from '~/components/Header';
import { Fetch } from '~/components/Fetch';
import { MainContent } from '~/components/Main';

export default function Index() {
  return (
    <>
      <Header />
      <MainContent>
        <ErrorBoundary fallback="Error loading project">
          <Fetch url="/api/project" fallback="Loading...">
            {(project) => {
              const { worktree } = project;

              return (
                <section>
                  <h2>Workspaces</h2>
                  {worktree.children.map((workspace) => {
                    return (
                      <article key={workspace.id}>
                        <Link href={`/workspaces/${workspace.id}`}>
                          {workspace.name}
                        </Link>
                      </article>
                    );
                  })}
                </section>
              );
            }}
          </Fetch>
        </ErrorBoundary>
      </MainContent>
    </>
  );
}
