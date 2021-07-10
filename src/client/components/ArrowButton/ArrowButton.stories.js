import React from 'react';
import ArrowButton from './ArrowButton.component.js';
import { withKnobs, color } from '@storybook/addon-knobs';

export default { title: 'Arrow Button', decorators: [withKnobs] };

export const blackArrow = () => <ArrowButton onClick={() => onClick()} />;
export const whiteArrow = () => (
  <ArrowButton
    backgroundColor={color('color', '#fff')}
    onClick={() => onClick()}
  />
);
