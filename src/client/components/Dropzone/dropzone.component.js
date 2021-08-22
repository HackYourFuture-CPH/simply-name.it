import React from 'react';
import './dropzone.styles.css';
import { useDropzone } from 'react-dropzone';
import AddImageIcon from './AddImageIcon.component';

export default function DropzoneComp() {
  const onDrop = (acceptedFiles) => acceptedFiles.map((file) => file.name);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div className="DropzoneComp">
      <useDropzone>
        <div {...getRootProps({ className: 'dropzone', id: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>
            <AddImageIcon /> Upload{' '}
          </p>
        </div>
      </useDropzone>
    </div>
  );
}
