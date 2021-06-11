/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { themes } from '../../../../src/next';
import {
  TokenFormat,
  theme,
  sets as tokenSets,
} from '../../../../src/next/tokens';

const tokens = theme.getTokens();
const groups = theme.getGroups();
const properties = theme.getProperties();
const sets = tokenSets.getSets();

export default function IndexPage() {
  const [activeGroup, setActiveGroup] = React.useState('v11');
  const [activeProperty, setActiveProperty] = React.useState('All');
  const [activeSet, setActiveSet] = React.useState('All');

  return (
    <main>
      <div className="flex items-center justify-between">
        <h1 id="table-title">Tokens ({tokens.length})</h1>
        <ul className="grid grid-columns-4 gap">
          {activeGroup !== 'v11' ||
          activeProperty !== 'All' ||
          activeSet !== 'All' ? (
            <li className="flex justify-end">
              <button
                onClick={() => {
                  setActiveGroup('v11');
                  setActiveProperty('All');
                  setActiveSet('All');
                }}>
                Reset
              </button>
            </li>
          ) : null}
          <li className="flex flex-col col-start-2">
            <label htmlFor="token-group">Token group</label>
            <select
              id="token-group"
              name="Token group"
              value={activeGroup}
              onChange={(event) => {
                setActiveGroup(event.target.value);
              }}>
              <option>v11</option>
              {groups
                .filter((group) => group !== 'v11')
                .map((group) => {
                  return <option key={group}>{group}</option>;
                })}
            </select>
          </li>
          <li className="flex flex-col">
            <label htmlFor="token-set">Token set</label>
            <select
              id="token-set"
              name="Token set"
              value={activeSet}
              onChange={(event) => {
                setActiveSet(event.target.value);
              }}>
              {sets.map((set) => {
                return <option key={set.name}>{set.name}</option>;
              })}
            </select>
          </li>
          <li className="flex flex-col">
            <label htmlFor="property">Properties</label>
            <select
              id="property"
              name="Property"
              value={activeProperty}
              onChange={(event) => {
                setActiveProperty(event.target.value);
              }}>
              <option>All</option>
              {properties.map((property) => {
                return <option key={property}>{property}</option>;
              })}
            </select>
          </li>
        </ul>
      </div>
      <table aria-labelledby="table-title">
        <thead>
          <tr>
            <th>Token</th>
            <th>White</th>
            <th>g10</th>
            <th>g90</th>
            <th>g100</th>
            <th>Properties</th>
          </tr>
        </thead>
        <tbody>
          {tokens
            .filter((token) => {
              if (!token.groups.includes(activeGroup)) {
                return false;
              }

              if (
                activeProperty !== 'All' &&
                token.properties &&
                !token.properties.includes(activeProperty)
              ) {
                return false;
              }

              if (activeSet !== 'All') {
                const set = tokenSets.getSet(activeSet);
                if (!set.hasToken(token.name)) {
                  return false;
                }
              }

              return true;
            })
            .map((token) => {
              const exportName = TokenFormat.convert({
                name: token.name,
                format: 'javascript',
              });
              return (
                <tr key={exportName} id={token.name}>
                  <td>
                    <a href={`#${token.name}`}>{token.name}</a>
                  </td>
                  <td>
                    <div
                      className="color-preview"
                      style={{
                        '--color-preview-color': themes.white[exportName],
                      }}
                    />
                    {themes.white[exportName]}
                  </td>
                  <td>
                    <div
                      className="color-preview"
                      style={{
                        '--color-preview-color': themes.g10[exportName],
                      }}
                    />
                    {themes.g10[exportName]}
                  </td>
                  <td>
                    <div
                      className="color-preview"
                      style={{
                        '--color-preview-color': themes.g90[exportName],
                      }}
                    />
                    {themes.g90[exportName]}
                  </td>
                  <td>
                    <div
                      className="color-preview"
                      style={{
                        '--color-preview-color': themes.g100[exportName],
                      }}
                    />
                    {themes.g100[exportName]}
                  </td>
                  <td>
                    {token.properties ? (
                      <ul>
                        {token.properties.map((property) => {
                          return <li key={property}>{property}</li>;
                        })}
                      </ul>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </main>
  );
}
