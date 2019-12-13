/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { matches, keys } from '../../internal/keyboard';
import { ButtonKinds } from '../../prop-types/types';
import setupGetInstanceId from '../../tools/setupGetInstanceId';

const { prefix } = settings;
const getInstanceId = setupGetInstanceId();

function FileUploaderButton({
  className: containerClassName,
  disableLabelChanges,
  labelText: ownerLabelText,
  multiple,
  role,
  tabIndex,
  buttonKind,
  accept,
  name,
  disabled,
  id,
  onChange,
  ...other
}) {
  const inputNode = useRef(null);
  const { current: inputId } = useRef(
    id || `file-uploader-btn-${getInstanceId()}`
  );
  const [labelText, updateLabelText] = useState(ownerLabelText);
  const [prevOwnerLabelText, updatePrevOwnerLabelText] = useState(
    ownerLabelText
  );
  const className = cx(
    {
      [`${prefix}--btn`]: true,
      [`${prefix}--btn--sm`]: true,
      [`${prefix}--btn--${buttonKind}`]: buttonKind,
      [`${prefix}--btn--disabled`]: disabled,
    },
    containerClassName
  );

  if (ownerLabelText !== prevOwnerLabelText) {
    updateLabelText(ownerLabelText);
    updatePrevOwnerLabelText(ownerLabelText);
  }

  function handleOnChange(event) {
    const files = event.target.files;
    const length = event.target.files.length;
    if (files && !disableLabelChanges) {
      if (length > 1) {
        updateLabelText(`${length} files`);
      } else if (length === 1) {
        updateLabelText(files[0].name);
      }
    }
    onChange(event);
  }

  function onClick(event) {
    event.target.value = null;
  }

  function onKeyDown(event) {
    if (matches(event, [keys.Space, keys.Enter])) {
      inputNode.current.click();
    }
  }

  return (
    <>
      <label
        aria-disabled={disabled}
        className={className}
        htmlFor={inputId}
        onKeyDown={onKeyDown}
        tabIndex={disabled ? -1 : tabIndex || 0}
        {...other}>
        <span role={role}>{labelText}</span>
      </label>
      <input
        accept={accept}
        className={`${prefix}--visually-hidden`}
        disabled={disabled}
        id={inputId}
        multiple={multiple}
        name={name}
        onChange={handleOnChange}
        onClick={onClick}
        ref={inputNode}
        tabIndex="-1"
        type="file"
      />
    </>
  );
}

FileUploaderButton.propTypes = {
  /**
   * Provide a custom className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether you want to disable any updates to the FileUploaderButton
   * label
   */
  disableLabelChanges: PropTypes.bool,

  /**
   * Provide a unique id for the underlying <input> node
   */
  id: PropTypes.string,

  /**
   * Provide the label text to be read by screen readers when interacting with
   * this control
   */
  labelText: PropTypes.node,

  /**
   * Specify whether you want the component to list the files that have been
   * submitted to be uploaded
   */
  listFiles: PropTypes.bool,

  /**
   * Specify if the component should accept multiple files to upload
   */
  multiple: PropTypes.bool,

  /**
   * Provide a name for the underlying <input> node
   */
  name: PropTypes.string,

  /**
   * Provide an optional `onChange` hook that is called each time the <input>
   * value changes
   */
  onChange: PropTypes.func,

  /**
   * Provide an optional `onClick` hook that is called each time the button is
   * clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an accessibility role for the <FileUploaderButton>
   */
  role: PropTypes.string,

  /**
   * Provide a custom tabIndex value for the <FileUploaderButton>
   */
  tabIndex: PropTypes.number,

  /**
   * Specify the type of underlying button
   */
  buttonKind: PropTypes.oneOf(ButtonKinds),

  /**
   * Specify the types of files that this input should be able to receive
   */
  accept: PropTypes.arrayOf(PropTypes.string),

  /**
   * Specify whether file input is disabled
   */
  disabled: PropTypes.bool,
};

FileUploaderButton.defaultProps = {
  tabIndex: 0,
  disableLabelChanges: false,
  labelText: 'Add file',
  buttonKind: 'primary',
  multiple: false,
  onChange: () => {},
  onClick: () => {},
  accept: [],
  disabled: false,
  role: 'button',
};

export default FileUploaderButton;
