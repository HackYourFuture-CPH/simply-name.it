import React from 'react';
import './BoardCard.style.css';
import PropTypes from 'prop-types';

export default function BoardCard({
  src,
  width,
  height,
  alt,
  fontWeight,
  fontSize,
  boardTitle,
  children,
}) {
  const style = {
    width,
    height,
  };
  return (
    <div className="card-container" style={style}>
      <img src={src} alt={alt} className="card" style={style} />
      <div className="headerContainer">
        <div className="title" style={{ fontSize, fontWeight }}>
          {boardTitle}
        </div>

        {/* // D for Drop down button component  */}
        <div className="button">{children}</div>
      </div>
    </div>
  );
}

BoardCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  boardTitle: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  fontWeight: PropTypes.string,
  fontSize: PropTypes.string,
};

BoardCard.defaultProps = {
  width: '200px',
  height: '200px',
  fontWeight: '300',
  fontSize: '40px',
};
