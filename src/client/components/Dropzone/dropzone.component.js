import React, { useState, useEffect } from 'react';
import './dropzone.styles.css';
import AddImageIcon from './AddImageIcon.component';

export default function DropzoneComp({ getRootProps, getInputProps, thumbs }) {
  return (
    <div className="DropzoneComp">
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
