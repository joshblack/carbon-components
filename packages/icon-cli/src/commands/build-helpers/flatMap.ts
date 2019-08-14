/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export async function flatMapAsync<T, S>(
  source: Array<T>,
  mapFn: (item: T, index: number, array: Array<T>) => Promise<S> | S
): Promise<Array<S>> {
  const results = await Promise.all(source.map(mapFn));
  return results.reduce((acc, result) => acc.concat(result), [] as Array<S>);
}
