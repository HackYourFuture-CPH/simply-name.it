import React, { useState, useEffect } from 'react';
import './dropzone.styles.css';
import { useDropzone } from 'react-dropzone';
import AddImageIcon from './AddImageIcon.component';

const thumbsContainer = {};

const thumb = {
  width: 325,
  height: 200,
};

const thumbInner = {
  overflow: 'hidden',
};

const img = {
  width: 'auto',
  height: '100%',
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
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="imagepreview" />
      </div>
    </div>
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
          <p>
            <AddImageIcon /> Browse
          </p>
          <aside style={thumbsContainer}>{thumbs}</aside>
        </div>
      </useDropzone>
    </div>
  );
}
