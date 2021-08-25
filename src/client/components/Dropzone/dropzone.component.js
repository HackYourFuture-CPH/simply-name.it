import React from 'react';
import './dropzone.styles.css';
import AddImageIcon from './AddImageIcon.component';
import PropTypes from 'prop-types';

export default function DropzoneComp({ getRootProps, getInputProps, thumbs }) {
  return (
    <div className="DropzoneComp">
      {/* eslint-disable react/jsx-props-no-spreading */}
      <div
        {...getRootProps({ className: 'dropzone-component', id: 'dropzone' })}
      >
        <input {...getInputProps()} />
        <div className={'dropzone-component-thumb'}>{thumbs}</div>
        <AddImageIcon /> Browse
      </div>
    </div>
  );
}

DropzoneComp.propTypes = {
  getRootProps: PropTypes.func.isRequired,
  getInputProps: PropTypes.func.isRequired,
  thumbs: PropTypes.array.isRequired,
};
