import React from 'react';
import ArrowButton from './ArrowButton.component';
import { action } from '@storybook/addon-actions';
import { withKnobs, color } from '@storybook/addon-knobs';

export default { title: 'Arrow Button', decorators: [withKnobs] };

export const blackArrow = () => <ArrowButton onClick={action('clicked')} />;
export const whiteArrow = () => (
  <ArrowButton
    backgroundColor={color('color', '#fff')}
    onClick={action('clicked')}
  />
);
