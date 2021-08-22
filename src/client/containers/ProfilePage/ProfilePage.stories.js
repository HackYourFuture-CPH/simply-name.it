import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import ProfilePage from './ProfilePage.container';

export default {
  title: 'Containers / Profile Page',
};

export const TestProfilePage = () => <ProfilePage />;
