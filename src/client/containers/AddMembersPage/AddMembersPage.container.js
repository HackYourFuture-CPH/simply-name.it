import React from 'react';
import './AddMembersPage.styles.css';
import PageTitle from '../../components/PageTitle/PageTitle.component';

import GenericButton from '../../components/GenericButton/GenericButton.component';
import InputComponent from '../../components/InputComponent/InputComponent';

export default function AddMembers() {
  return (
    <div className="AddMembers-container">
      <PageTitle title={'Add members'} variant={'black-large'} />
      <div className="search-container">
        <div className="search-input">
          <InputComponent
            placeholder="Search"
            borderShape="round"
            theme="light"
            inputValue={'Search name...'}
            showSearchIcon={true}
            onChange={console.log('You have changed the search input content')}
          />
        </div>
        <div className="search-button">
          <GenericButton
            buttonLabel="&#128269;"
            buttonSize="small"
            buttonType="primary"
            buttonDisabled={false}
            onClick={console.log('searching')}
          />
        </div>
      </div>
    </div>
  );
}
