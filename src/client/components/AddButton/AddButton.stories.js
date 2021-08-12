import React from 'react';
import AddButton from './AddButton.component';
import { action } from '@storybook/addon-actions';

export default { title: 'Components / AddButton' };

export const AddButtonExample = () => (
  <AddButton onClick={action('Add button clicked')} buttonDisabled={true} />
);

export const DisabledButtonExample = () => (
  <AddButton onClick={action('Add button clicked')} buttonDisabled={false} />
);
