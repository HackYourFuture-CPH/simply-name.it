import React from 'react';
import PropTypes from 'prop-types';

export default function AdminPanel({ owner }) {
  return (
    <div className="modal-content">
      <div className="modal-body">
        <img className="round" src={owner.photoUrl} alt="owner" />
        <div className="profile">
          <h4>{owner.fullName}</h4>
          <p className="caption">{owner.role}</p>
        </div>
      </div>
    </div>
  );
}

AdminPanel.propTypes = {
  owner: PropTypes.instanceOf(Object).isRequired,
};
