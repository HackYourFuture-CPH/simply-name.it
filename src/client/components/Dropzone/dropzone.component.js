import React from 'react';
import './dropzone.styles.css';
import AddImageIcon from './AddImageIcon.component';
import PropTypes from 'prop-types';

export default function DropzoneComp({ getRootProps, getInputProps, thumbs }) {
  return (
    <div className="DropzoneComp">
      {/* eslint-disable react/jsx-props-no-spreading */}
      <div {...getRootProps({ className: 'dropzone', id: 'dropzone' })}>
        <input {...getInputProps()} />
        {thumbs}
        <p>
          <AddImageIcon /> Browse
        </p>
      </div>
    </div>
  );
}

DropzoneComp.propTypes = {
  getRootProps: PropTypes.func.isRequired,
  getInputProps: PropTypes.func.isRequired,
  thumbs: PropTypes.objectOf(PropTypes.object()).isRequired,
};
