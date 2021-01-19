/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Popover = React.forwardRef(function Popover(
  { as, children, direction = 'bottom', open = false, ...rest },
  ref
) {
  return (
    <Box
      as={as}
      className={cx('popover', `popover--${direction}`)}
      ref={ref}
      {...rest}>
      {children}
    </Box>
  );
});

Popover.displayName = 'Popover';
Popover.propTypes = {
  direction: PropTypes.oneOf([
    'top',
    'top-left',
    'top-right',

    'bottom',
    'bottom-left',
    'bottom-right',

    'left',
    'left-bottom',
    'left-top',

    'right',
    'right-bottom',
    'right-top',
  ]),
  open: PropTypes.bool,
};

const PopoverContent = React.forwardRef(function PopoverContent(
  { as, children, ...rest },
  ref
) {
  return (
    <Box as={as} className="popover-content" ref={ref} {...rest}>
      {children}
    </Box>
  );
});

PopoverContent.displayName = 'PopoverContent';
PopoverContent.propTypes = {};

const Box = React.forwardRef(function Box(
  { as: BaseComponent = 'div', children, ...rest },
  ref
) {
  return (
    <BaseComponent ref={ref} {...rest}>
      {children}
    </BaseComponent>
  );
});

export { Popover, PopoverContent };
