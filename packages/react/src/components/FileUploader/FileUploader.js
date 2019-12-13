/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { settings } from 'carbon-components';
import { ButtonKinds } from '../../prop-types/types';
import FileUploaderButton from './FileUploaderButton';
import Filename from './Filename';

const { prefix } = settings;

const FileUploader = React.forwardRef(function FileUploader(
  {
    iconDescription,
    buttonLabel,
    buttonKind,
    filenameStatus: ownerFilenameStatus,
    labelDescription,
    labelTitle,
    className,
    multiple,
    accept,
    name,
    // Props passed in to handle changes
    onClick,
    onChange,
    ...other
  },
  ref
) {
  const [filenameStatus, updateFilenameStatus] = useState(ownerFilenameStatus);
  const [prevOwnerFilenameStatus, updatePrevOwnerFilenameStatus] = useState(
    ownerFilenameStatus
  );
  const [filenames, updateFilenames] = useState([]);
  const classes = cx({
    [`${prefix}--form-item`]: true,
    [className]: className,
  });

  if (ownerFilenameStatus !== prevOwnerFilenameStatus) {
    updateFilenameStatus(ownerFilenameStatus);
    updatePrevOwnerFilenameStatus(ownerFilenameStatus);
  }

  function handleOnChange(event) {
    event.stopPropagation();
    updateFilenames(
      filenames.concat(
        Array.prototype.map.call(event.target.files, file => file.name)
      )
    );

    if (onChange) {
      onChange(event);
    }
  }

  function handleOnClick(event, index) {
    updateFilenames(filenames => {
      // Return a new filenames array that includes everything _but_ the given
      // index.
      return [...filenames.slice(0, index), ...filenames.slice(index + 1)];
    });

    if (onClick) {
      onClick(event);
    }
  }

  // A clearFiles function that resets filenames and can be referenced using a
  // ref by the parent.
  function clearFiles() {
    updateFilenames([]);
  }

  useImperativeHandle(ref, () => ({
    clearFiles,
  }));

  return (
    <div className={classes} {...other}>
      <strong className={`${prefix}--file--label`}>{labelTitle}</strong>
      <p className={`${prefix}--label-description`}>{labelDescription}</p>
      <FileUploaderButton
        labelText={buttonLabel}
        multiple={multiple}
        buttonKind={buttonKind}
        onChange={handleOnChange}
        disableLabelChanges
        accept={accept}
        name={name}
      />
      {filenames.length !== 0 && (
        <div className={`${prefix}--file-container`}>
          {filenames.map((name, index) => (
            <span
              key={name}
              className={`${prefix}--file__selected-file`}
              {...other}>
              <p className={`${prefix}--file-filename`}>{name}</p>
              <span className={`${prefix}--file__state-container`}>
                <Filename
                  iconDescription={iconDescription}
                  status={filenameStatus}
                  onClick={event => {
                    if (filenameStatus === 'edit') {
                      handleOnClick(event, index);
                    }
                  }}
                />
              </span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
});

FileUploader.propTypes = {
  /**
   * Provide a description for the complete/close icon that can be read by screen
   * readers
   */
  iconDescription: PropTypes.string,

  /**
   * Provide the label text to be read by screen readers when interacting with
   * the <FileUploaderButton>
   */
  buttonLabel: PropTypes.string,

  /**
   * Specify the type of the <FileUploaderButton>
   */
  buttonKind: PropTypes.oneOf(ButtonKinds),

  /**
   * Specify the status of the File Upload
   */
  filenameStatus: PropTypes.oneOf(['edit', 'complete', 'uploading']).isRequired,

  /**
   * Specify the description text of this <FileUploader>
   */
  labelDescription: PropTypes.string,

  /**
   * Specify the title text of this <FileUploader>
   */
  labelTitle: PropTypes.string,

  /**
   * Specify if the component should accept multiple files to upload
   */
  multiple: PropTypes.bool,

  /**
   * Provide a name for the underlying <input> node
   */
  name: PropTypes.string,

  /**
   * Provide an optional `onClick` hook that is called each time the button is
   * clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide a custom className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify the types of files that this input should be able to receive
   */
  accept: PropTypes.arrayOf(PropTypes.string),
};

FileUploader.defaultProps = {
  iconDescription: 'Provide icon description',
  filenameStatus: 'uploading',
  buttonLabel: '',
  buttonKind: 'primary',
  multiple: false,
  accept: [],
};

export default FileUploader;
