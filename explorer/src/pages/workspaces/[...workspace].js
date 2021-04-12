/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ErrorBoundary } from 'carbon-components-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fetch } from '~/components/Fetch';
import Header from '~/components/Header';
import { Stack } from '~/components/Stack';
import { StyleStatistics } from '~/components/StyleStatistics';

export default function WorkspacePage() {
  const { query } = useRouter();
  if (!query.workspace) {
    return null;
  }

  const name = query.workspace.join('/');

  return (
    <>
      <Header />
      <ErrorBoundary fallback="Error loading workspace">
        <Fetch url={`/api/workspaces/${name}`} fallback="Loading workspace...">
          {(workspace) => {
            const hasStyleSheets = workspace.files.some((file) => {
              return file.type === 'scss';
            });
            const stylesheets = workspace.files.filter((file) => {
              return file.type === 'scss';
            });

            return (
              <main>
                <h1>
                  {workspace.name} <small>{workspace.version}</small>
                </h1>
                {workspace.description ? <p>{workspace.description}</p> : null}

                {hasStyleSheets ? (
                  <section>
                    <h2>Style Sheets ({stylesheets.length})</h2>
                    <StyleStatistics workspace={name} />
                  </section>
                ) : null}

                <section>
                  <h2>Workspace dependencies</h2>
                  <Stack className="bx--css-grid" step={7}>
                    {workspace.dependencies
                      .filter((dependency) => {
                        return dependency.workspace;
                      })
                      .map((dependency) => {
                        const key = [dependency.type, dependency.name].join(
                          ':'
                        );
                        return (
                          <article key={key} className="bx--col-span-4">
                            <header>{dependency.name}</header>

                            <Link href={`/workspaces/${dependency.name}`}>
                              <a>Link</a>
                            </Link>
                          </article>
                        );
                      })}
                  </Stack>
                </section>
              </main>
            );
          }}
        </Fetch>
      </ErrorBoundary>
    </>
  );
}
