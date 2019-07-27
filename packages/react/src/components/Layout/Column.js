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

function Column({
  as = 'div',
  className: customClassName,
  offset = [],
  span = [],
  noGutter,
  noGutterLeft,
  noGutterRight,
  ...rest
}) {
  const columnsPerBreakpoint = mapBreakpointsToArray(span).map(
    (columnCount, i) => {
      return `${prefix}--col-${breakpoints[i]}-${columnCount}`;
    }
  );
  const offsetsPerBreakpoint = mapBreakpointsToArray(offset).map(
    (offsetCount, i) => {
      return `${prefix}--offset-${breakpoints[i]}-${offsetCount}`;
    }
  );
  const className = cx(
    {
      [`${prefix}--col`]:
        columnsPerBreakpoint.length === 0 && offsetsPerBreakpoint.length === 0,
      [`${prefix}--no-gutter`]: noGutter,
      [`${prefix}--no-gutter--left`]: noGutterLeft,
      [`${prefix}--no-gutter--right`]: noGutterRight,
    },
    ...columnsPerBreakpoint,
    ...offsetsPerBreakpoint,
    customClassName
  );

  return React.createElement(as, {
    ...rest,
    className,
  });
}

const breakpointPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.number),
  PropTypes.shape({
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xlg: PropTypes.number,
    max: PropTypes.number,
  }),
]);

Column.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /**
   * Provide a custom className to be applied to the containing node
   */
  className: PropTypes.string,

  offset: breakpointPropType,
  span: breakpointPropType,

  noGutter: PropTypes.bool,
  noGutterLeft: PropTypes.bool,
  noGutterRight: PropTypes.bool,
};

const breakpoints = ['sm', 'md', 'lg', 'xlg', 'max'];

function mapBreakpointsToArray(object) {
  if (Array.isArray(object)) {
    return object;
  }
  return Object.keys(object).reduce((acc, key) => {
    const index = breakpoints.indexOf(key);
    acc[index] = object[key];
    return acc;
  }, []);
}

export default Column;
