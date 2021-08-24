import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import DropzoneComp from '../../components/Dropzone/dropzone.component';

const img = {
  height: '70px',
};

export default function Dropzone() {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      // acceptedFiles.forEach((file) => {
      // upload to backend :
      // const formData = new FormData();
      // formData.append('image', file)
      // example fetch mising authentication header
      // fetch('api/image', {
      //     method: 'POST',
      //     body: formData,
      //     headers : {
      //         'Accept' : 'multipart/form-data'
      //     }
      // })
      // });

      setFiles(
        acceptedFiles.map((file) =>
          // setting image as preview in dropzone
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
    <DropzoneComp
      getRootProps={getRootProps}
      getInputProps={getInputProps}
      thumbs={thumbs}
    />
  );
}
