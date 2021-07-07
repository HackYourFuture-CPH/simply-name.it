import React from 'react';
import PropTypes from 'prop-types';

export default function BoardCard({ src, width, height }) {
  return (
    <div>
      <img src={src} width={width} height={height}></img>
      <span>
        <div>Board Title</div>
        <div>Drop Down Button</div>
      </span>
    </div>
  );
}
