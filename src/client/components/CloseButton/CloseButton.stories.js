import React from 'react';
import CloseButton from './CloseButton.component.js';
import { action } from '@storybook/addon-actions';

export default { title: 'Components / CloseButton' };
export const CloseButtonExample = () => (
  <CloseButton onClick={action('Close button clicked')} />
);
