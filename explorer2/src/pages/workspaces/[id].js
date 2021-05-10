/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ErrorBoundary, Grid, Column } from '@carbon/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fetch } from '~/components/Fetch';
import { Header } from '~/components/Header';
import { MainContent } from '~/components/Main';

export default function WorkspacePage() {
  const router = useRouter();

  return (
    <>
      <Header />
      <MainContent>
        {router.query.id ? (
          <ErrorBoundary fallback="Error loading workspace">
            <Fetch
              url={`/api/workspaces/${router.query.id}`}
              fallback="Loading workspace...">
              {(workspace) => {
                return (
                  <Grid>
                    <Column>
                      <h1>{workspace.name}</h1>
                      <p>v{workspace.packageJson.version}</p>
                      {workspace.packageJson.description ? (
                        <p>{workspace.packageJson.description}</p>
                      ) : null}
                      {workspace.packageJson.private ? <p>Private</p> : null}
                    </Column>
                    <section>
                      <h2>Tasks</h2>
                      {workspace.packageJson.scripts ? (
                        Object.keys(workspace.packageJson.scripts).map(
                          (name) => {
                            return <article key={name}>{name}</article>;
                          }
                        )
                      ) : (
                        <p>No tasks available</p>
                      )}
                    </section>
                    <section>
                      <h2>Dependencies</h2>
                      <ErrorBoundary fallback="Error loading dependencies">
                        <Fetch
                          url={`/api/workspaces/${router.query.id}/dependencies`}
                          fallback="Loading dependencies">
                          {({ dependencies }) => {
                            if (dependencies.length === 0) {
                              return <p>No workspace dependencies</p>;
                            }

                            return dependencies.map((workspace) => {
                              return (
                                <article key={workspace.id}>
                                  <header>
                                    <Link href={`/workspaces/${workspace.id}`}>
                                      <a>{workspace.name}</a>
                                    </Link>
                                  </header>
                                  <p>v{workspace.packageJson.version}</p>
                                </article>
                              );
                            });
                          }}
                        </Fetch>
                      </ErrorBoundary>
                    </section>
                    <section>
                      <h2>Files</h2>
                      <ErrorBoundary fallback="Error loading files">
                        <Fetch
                          url={`/api/workspaces/${router.query.id}/files`}
                          fallback="Loading files...">
                          {({ categories, aggregate }) => {
                            if (categories.length === 0) {
                              return <p>No files available</p>;
                            }

                            return (
                              <>
                                <p>Total: {aggregate.files.total}</p>
                                {categories.map((category) => {
                                  return (
                                    <article key={category}>
                                      <header>{category}</header>
                                      <p>
                                        {aggregate.files.categories[category]}{' '}
                                        files
                                      </p>
                                    </article>
                                  );
                                })}
                              </>
                            );
                          }}
                        </Fetch>
                      </ErrorBoundary>
                    </section>
                  </Grid>
                );
              }}
            </Fetch>
          </ErrorBoundary>
        ) : (
          <Grid>
            <span>Loading...</span>
          </Grid>
        )}
      </MainContent>
    </>
  );
}
