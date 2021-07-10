import React from 'react';
import Button from './Button.component';
import { action } from '@storybook/addon-actions';
import { text, select, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Button',
  component: Button,
};

export const allButtons = () => (
  <Button
    buttonLabel={text('button label')}
    onClick={action('you clicked!')}
    size={select('size', ['large', 'medium', 'small'], 'large')}
    buttonColor={select(
      'color',
      ['white', 'gray', 'turquoise-gradient', 'purple', 'purple-gradient'],
      'purple',
    )}
    buttonBorder={select(
      'border',
      ['none', 'black', 'purple', 'purple-gradient'],
      'none',
    )}
    buttonLabelColor={select(
      'text color',
      ['black', 'gray', 'white', 'purple'],
      'white',
    )}
  />
);

export const largeGrayButton = () => (
  <Button
    buttonLabel="Login"
    onClick={action('you clicked!')}
    size="large"
    buttonColor="gray"
    buttonLabelColor="gray"
  />
);

export const mediumPurpleGradientButton = () => (
  <Button
    buttonLabel="Create"
    onClick={action('you clicked!')}
    size="medium"
    buttonColor="purple-gradient"
    buttonLabelColor="white"
  />
);

export const smallWhiteButton = () => (
  <Button
    buttonLabel="Members"
    onClick={action('you clicked!')}
    size="small"
    buttonColor="white"
    buttonBorder="purple"
    buttonLabelColor="purple"
  />
);
