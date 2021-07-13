import React from 'react';
import ContactListItem from './ContactListItem.component';

export default {
  title: 'Components/Contact-List-Item',
  component: ContactListItem,
};

export const userDetails = () => (
  <ContactListItem
    userName="Darrell Steward"
    userEmail="darrell.steward@example.com"
  />
);
