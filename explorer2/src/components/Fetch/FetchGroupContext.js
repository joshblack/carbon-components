/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';

export const FetchGroupContext = React.createContext(null);

export function useFetchGroup(query) {
  const group = React.useContext(FetchGroupContext);

  useEffect(() => {
    if (group) {
      const { queries } = group.current;
      queries.push(query);
      return () => {
        queries.splice(queries.indexOf(query), 1);
      };
    }
  });

  return group;
}
