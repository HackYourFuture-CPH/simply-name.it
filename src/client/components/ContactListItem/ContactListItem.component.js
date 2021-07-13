import React from 'react';
import PropTypes from 'prop-types';
import './ContactListItem.styles.css';
import { MediumPurpleGradientButton } from '../Button/Button.stories';
import { SmallProfilePicture } from '../UserProfilePicture/UserProfilePicture.stories';

function ContactListItem({ userName, userEmail }) {
  return (
    <li>
      <SmallProfilePicture />
      <div>
        <span className="user-name">{userName}</span>
        <br />
        <span className="user-email">{userEmail}</span>
      </div>
      <MediumPurpleGradientButton />
    </li>
  );
}
ContactListItem.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default ContactListItem;
