/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as styles from './Stack.module.scss';
import cx from 'classnames';

function StackImpl({
  as: BaseComponent = 'div',
  className: customClassName,
  children,
  step,
  ...rest
}) {
  const className = cx(getClassName(step), customClassName);
  return (
    <BaseComponent {...rest} className={className}>
      {children}
    </BaseComponent>
  );
}

function getClassName(step) {
  if (!step) {
    return null;
  }

  let name = '' + step;
  if (name.length === 1) {
    name = `0${name}`;
  }
  name = `spacing-${name}`;
  return styles[name];
}

export function Stack({ className, ...rest }) {
  return <StackImpl {...rest} className={cx(styles.stack, className)} />;
}

export function HStack({ className, ...rest }) {
  return <StackImpl {...rest} className={cx(styles.hstack, className)} />;
}
