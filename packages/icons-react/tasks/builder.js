/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { default: generate } = require('@babel/generator');
const { default: template } = require('@babel/template');
const t = require('@babel/types');

const iconComponentImports = template.ast(`
import PropTypes from 'prop-types';
import React from 'react';
import Icon from './Icon';
`);

function buildIconComponent() {
  return template`
const ICON_NAME = React.forwardRef(function ICON_NAME(
  { children, ...rest },
  ref
) {
  return (
    <Icon {...rest} ref={ref}>
      ICON_PATHS
      {children}
    </Icon>
  );
});

ICON_NAME.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  viewBox: PropTypes.string,
};

ICON_NAME.defaultProps = {
  width: ICON_WIDTH,
  height: ICON_HEIGHT,
  viewBox: ICON_VIEWBOX,
};
`;
}

module.exports = {
  iconComponentImports,
  buildIconComponent,
};
