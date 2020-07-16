/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const CarbonIconsReact = require('@carbon/icons-react');
const CarbonIconsReact16 = require('@carbon/icons-react/16');
const CarbonIconsReact20 = require('@carbon/icons-react/20');
const CarbonIconsReact24 = require('@carbon/icons-react/24');
const CarbonIconsReact32 = require('@carbon/icons-react/32');

describe('@carbon/icons-react', () => {
  it('should not update exports without a semver change', () => {
    expect(Object.keys(CarbonIconsReact).sort()).toMatchSnapshot();
  });

  it('should not update the 16 entrypoint exports without a semver change', () => {
    expect(Object.keys(CarbonIconsReact16).sort()).toMatchSnapshot();
  });

  it('should not update the 20 entrypoint exports without a semver change', () => {
    expect(Object.keys(CarbonIconsReact20).sort()).toMatchSnapshot();
  });

  it('should not update the 24 entrypoint exports without a semver change', () => {
    expect(Object.keys(CarbonIconsReact24).sort()).toMatchSnapshot();
  });

  it('should not update the 32 entrypoint exports without a semver change', () => {
    expect(Object.keys(CarbonIconsReact32).sort()).toMatchSnapshot();
  });
});
