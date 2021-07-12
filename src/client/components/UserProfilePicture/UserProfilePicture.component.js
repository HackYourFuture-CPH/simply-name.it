import React from 'react';
import './UserProfilePicture.styles.css';
/* eslint-disable react/prop-types */
function UserProfilePicture({ size, profilePictureLink }) {
  return (
    <img
      className={`profile-picture ${size}`}
      src={profilePictureLink}
      alt="profilePicture"
    />
  );
}

export default UserProfilePicture;
