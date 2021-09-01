import React from 'react';
import '../BoardPage.style.css';
import GenericButton from '../../../components/GenericButton/GenericButton.component';

export default function ResultButtonPreDeadline() {
  return (
    <div className="Result">
      <GenericButton
        className="Result-button"
        buttonLabel="Result"
        buttonSize="medium"
        buttonType="primary"
        buttonDisabled={true}
      />
    </div>
  );
}
