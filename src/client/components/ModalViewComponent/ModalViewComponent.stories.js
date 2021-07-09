import React, { useState } from 'react';
import Modal from './ModalViewComponent';

export default {
  title: 'Components / ModalView Component',
  component: Modal,
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
      <Modal show={showModal} close={closeModal} />
    </div>
  );
}
