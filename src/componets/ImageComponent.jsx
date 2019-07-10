import React from 'react';
import Dropzone from 'react-dropzone';

export const ImageComponent = props => {
  const onDrop = files => {
    console.log(files);
  };
  return <div>hola</div>;
};
