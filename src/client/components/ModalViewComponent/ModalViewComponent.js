import React from 'react';
import PropTypes from 'prop-types';
import './ModalViewComponent.styles.css';

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
      <div className="modal-content">
        <div className="modal-body">
          <img
            className="round"
            src="https://randomuser.me/api/portraits/men/79.jpg"
            alt="member"
          />
          <div className="profile">
            <h3>Jacop Jones</h3>
            <p className="caption">Admin</p>
          </div>
        </div>
      </div>
      <div className="members-wrapper">
        <div className="modal-members">
          <div className="modal-body">
            <img
              className="round"
              src="https://randomuser.me/api/portraits/women/80.jpg"
              alt="member"
            />
            <div className="profile">
              <h3>Darrell Steward</h3>
              <p className="caption">Member</p>
            </div>
          </div>
          <div className="dropdown" />
        </div>
        <div className="modal-members">
          <div className="modal-body">
            <img
              className="round"
              src="https://randomuser.me/api/portraits/women/81.jpg"
              alt="member"
            />
            <div className="profile">
              <h3>Kristin Watson</h3>
              <p className="caption">Member</p>
            </div>
          </div>
          <div className="dropdown" />
        </div>
        <div className="modal-members">
          <div className="modal-body">
            <img
              className="round"
              src="https://randomuser.me/api/portraits/men/80.jpg"
              alt="member"
            />
            <div className="profile">
              <h3>Theresa Webb</h3>
              <p className="caption">Member</p>
            </div>
          </div>
          <div className="dropdown" />
        </div>
        <div className="modal-members">
          <div className="modal-body">
            <img
              className="round"
              src="https://randomuser.me/api/portraits/women/82.jpg"
              alt="member"
            />
            <div className="profile">
              <h3>Dianne Russell</h3>
              <p className="caption">Member</p>
            </div>
          </div>
          <div className="dropdown" />
        </div>
        <div className="modal-members">
          <div className="modal-body">
            <img
              className="round"
              src="https://randomuser.me/api/portraits/men/83.jpg"
              alt="member"
            />
            <div className="profile">
              <h3>Arlene McCoy</h3>
              <p className="caption">Member</p>
            </div>
          </div>
          <div className="dropdown" />
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};
