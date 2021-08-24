import React, { useState } from 'react';
import MembersModal from './MembersModal.component';
import members from './membersData.json';
import GenericButton from '../GenericButton/GenericButton.component';

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
      <GenericButton
        buttonSize="small"
        buttonType="secondary"
        buttonDisabled={false}
        onClick={() => setShowModal(true)}
        buttonLabel="Members"
      />
      <MembersModal show={showModal} close={closeModal} members={members} />
    </div>
  );
}
