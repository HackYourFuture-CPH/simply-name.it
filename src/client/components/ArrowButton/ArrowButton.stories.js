import React from 'react';
import ArrowButton from './ArrowButton.component';
import { action } from '@storybook/addon-actions';
import { withKnobs, color } from '@storybook/addon-knobs';

export default {
  title: 'Arrow Button',
  decorators: [withKnobs],
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: 'white' },
        { name: 'black', value: 'black' },
      ],
    },
  },
};

export const BlackArrow = () => (
  <ArrowButton
    backgroundColor={color('color', 'black')}
    onClick={action('clicked')}
  />
);
export const WhiteArrow = () => (
  <ArrowButton
    backgroundColor={color('color', 'white')}
    onClick={action('clicked')}
  />
);

WhiteArrow.parameters = {
  backgrounds: { default: 'black' },
};
