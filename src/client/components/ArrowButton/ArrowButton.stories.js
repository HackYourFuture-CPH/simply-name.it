import React from 'react';
import ArrowButton from './ArrowButton.component';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Arrow Button',
};

export const BlackArrow = () => (
  <ArrowButton onClick={action('clicked')} color="black" />
);
export const WhiteArrow = () => (
  <ArrowButton onClick={action('clicked')} color="white" />
);
