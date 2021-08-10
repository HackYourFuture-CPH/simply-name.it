import React from 'react';
import ArrowButton from './ArrowButton.component';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Arrow Button',
  decorators: [withKnobs],
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: 'white' },
        {
          name: 'purple',
          value: 'linear-gradient(90deg, #9400D3 0%, #4B0082 100%);',
        },
      ],
    },
  },
};

export const BlackArrow = () => (
  <ArrowButton onClick={action('clicked')} color={true} />
);
export const WhiteArrow = () => (
  <ArrowButton color={false} onClick={action('clicked')} />
);

WhiteArrow.parameters = {
  backgrounds: { default: 'purple' },
};
