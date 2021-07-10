import React from 'react';
import PropTypes from 'prop-types';
import './ModalViewComponent.styles.css';
import AdminPanel from './AdminPanel';
import MembersPanel from './MembersPanel';

export default function Modal({ show, close }) {
  return (
    <div className={show ? 'modal-wrapper' : 'modal-wrapper invisible'}>
      <button type="button" aria-label="Toggle" className="toggle-btn" />
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
      <MembersPanel />
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};
