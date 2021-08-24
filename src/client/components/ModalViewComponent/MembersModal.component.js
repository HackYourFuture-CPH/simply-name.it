import React from 'react';
import PropTypes from 'prop-types';
import './MembersModal.styles.css';
import AdminPanel from './AdminPanel';
import MembersPanel from './MembersPanel';
import CloseButton from '../CloseButton/CloseButton.component';

export default function MembersModal({ show, close, members }) {
  const ownerData = members.filter((member) => member.role === 'owner');
  const membersData = members.filter((member) => member.role !== 'owner');
  return (
    <div className={show ? 'modal-wrapper' : 'modal-wrapper invisible'}>
      <div className="toggle-wrapper">
        <button type="button" aria-label="Toggle" className="toggle-btn" />
      </div>
      <div className="modal-header">
        <h2>Members</h2>
        <div className="close-btn">
          <CloseButton onClick={close} />
        </div>
      </div>
      <AdminPanel owner={ownerData[0]} />
      <MembersPanel members={membersData} />
    </div>
  );
}

MembersModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  members: PropTypes.instanceOf(Object).isRequired,
};
