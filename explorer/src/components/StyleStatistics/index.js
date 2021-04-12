/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ErrorBoundary } from 'carbon-components-react';
import { Fetch } from '~/components/Fetch';

export function StyleStatistics({ workspace }) {
  return (
    <ErrorBoundary fallback="Error loading style statistics">
      <Fetch
        url={`/api/statistics/scss/${workspace}`}
        fallback="Loading style statistics...">
        {(stats) => {
          console.log(stats);
          return 'STATS';
        }}
      </Fetch>
    </ErrorBoundary>
  );
}
