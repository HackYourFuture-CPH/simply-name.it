import React from 'react';
import PropTypes from 'prop-types';
import './MembersModal.styles.css';
import AdminPanel from './AdminPanel';
import MembersPanel from './MembersPanel';

export default function MembersModal({ show, close, members }) {
  return (
    <div className={show ? 'modal-wrapper' : 'modal-wrapper invisible'}>
      <div className="toggle-wrapper">
        <button type="button" aria-label="Toggle" className="toggle-btn" />
      </div>
      <div className="modal-header">
        <h1>Members</h1>
        <button
          className="close-btn"
          onClick={close}
          onKeyDown={close}
          aria-label="Close Button"
          type="button"
        />
      </div>
      <AdminPanel />
      <MembersPanel members={members} />
    </div>
  );
}

MembersModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  members: PropTypes.instanceOf(Object).isRequired,
};
