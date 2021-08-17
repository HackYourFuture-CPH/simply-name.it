import React from 'react';
import './dropzone.styles.css';
import { useDropzone } from 'react-dropzone';

export default function DropzoneComp() {
  const onDrop = (acceptedFiles) => acceptedFiles.map((file) => file.name);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div className="DropzoneComp">
      <useDropzone>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Upload</p>
        </div>
      </useDropzone>
    </div>
  );
}
