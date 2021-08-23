import React, { useState, useEffect } from 'react';
import './dropzone.styles.css';
import { useDropzone } from 'react-dropzone';
import AddImageIcon from './AddImageIcon.component';

const img = {
  height: '70px',
};

export default function DropzoneComp() {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });
  const thumbs = files.map((file) => (
    <img key={file.name} style={img} src={file.preview} alt="imagepreview" />
  ));
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  return (
    <div className="DropzoneComp">
      <useDropzone>
        <div {...getRootProps({ className: 'dropzone', id: 'dropzone' })}>
          <input {...getInputProps()} />
          {thumbs}
          <p>
            <AddImageIcon /> Browse
          </p>
        </div>
      </useDropzone>
    </div>
  );
}
