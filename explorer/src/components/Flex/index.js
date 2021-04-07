/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';

function Flex({
  as: BaseComponent = 'div',
  className: customClassName,
  children,
  ...rest
}) {
  const { className, props } = getClassName(rest);
  return (
    <BaseComponent className={cx(className, customClassName)} {...props}>
      {children}
    </BaseComponent>
  );
}

const flex = new Set([
  // Justify content
  'justify-start',
  'justify-end',
  'justify-center',
  'justify-between',
  'justify-around',
  'justify-evenly',

  // Align items
  'items-start',
  'items-end',
  'items-center',
  'items-baseline',
  'items-stretch',
]);

function getClassName(props) {
  const rest = {};
  const classes = [];

  for (const [key, value] of Object.entries(props)) {
    if (flex.has(key)) {
      if (value) {
        classes.push(key);
      }
    } else {
      rest[key] = value;
    }
  }

  return {
    className: cx('flex', ...classes),
    props: rest,
  };
}

export default Flex;
