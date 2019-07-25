/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const { prefix } = settings;

function Grid({
  as = 'div',
  className: customClassName,
  isCondensed,
  fullWidth,
  ...rest
}) {
  const className = cx({
    [`${prefix}--grid`]: true,
    [`${prefix}--grid--condensed`]: isCondensed,
    [`${prefix}--grid--full-width`]: fullWidth,
    [customClassName]: !!customClassName,
  });
  return React.createElement(as, {
    ...rest,
    className,
  });
}

Grid.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  className: PropTypes.string,

  /**
   * Specify if the grid should be rendered as a condensed grid
   */
  isCondensed: PropTypes.bool,

  /**
   * Specify if the grid should span full-dith at the maximum breakpoint
   */
  fullWidth: PropTypes.bool,
};

export default Grid;
