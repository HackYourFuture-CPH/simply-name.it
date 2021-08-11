import React from 'react';
import ArrowButton from './ArrowButton.component';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Arrow Button',
  decorators: [withKnobs],
};

export const BlackArrow = () => (
  <ArrowButton onClick={action('clicked')} color={true} />
);
export const WhiteArrow = () => (
  <ArrowButton color={false} onClick={action('clicked')} />
);
