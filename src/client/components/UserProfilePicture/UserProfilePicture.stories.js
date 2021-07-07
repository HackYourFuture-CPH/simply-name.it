import React from 'react';
import UserProfilePicture from './UserProfilePicture';

export default {
  title: 'Components /User Profile Picture',
  component: UserProfilePicture,
};

export const SmallProfilePicture = () => (
  <UserProfilePicture
    size="small"
    profilePictureLink="https://picsum.photos/seed/picsum/200/300"
  />
);
export const BigProfilePicture = () => (
  <UserProfilePicture
    size="big"
    profilePictureLink="https://picsum.photos/seed/picsum/200/300"
  />
);
