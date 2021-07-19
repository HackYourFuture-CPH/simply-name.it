import React, { useState } from 'react';
import MembersModal from './MembersModal.component';
import members from './membersData.json';

export default {
  title: 'Components / ModalView Component',
  component: MembersModal,
};

export function Component() {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);
  return (
    <div>
      {showModal ? (
        <div
          onClick={closeModal}
          onKeyDown={closeModal}
          className="back-drop"
          aria-hidden="true"
        />
      ) : null}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="btn-openModal"
      >
        Members
      </button>
      <MembersModal show={showModal} close={closeModal} members={members} />
    </div>
  );
}
