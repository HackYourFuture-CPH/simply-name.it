import React from 'react';
import Button from './Button.component';
import { action } from '@storybook/addon-actions';
import { text, select } from '@storybook/addon-knobs';

export default {
  title: 'Components/Button',
  component: Button,
};

export const AllButtons = () => (
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

export const LargeGrayButton = () => (
  <Button
    buttonLabel="Login"
    onClick={action('you clicked!')}
    size="large"
    buttonColor="gray"
    buttonLabelColor="gray"
  />
);

export const MediumPurpleGradientButton = () => (
  <Button
    buttonLabel="Create"
    onClick={action('you clicked!')}
    size="medium"
    buttonColor="purple-gradient"
    buttonLabelColor="white"
  />
);

export const SmallWhiteButton = () => (
  <Button
    buttonLabel="Members"
    onClick={action('you clicked!')}
    size="small"
    buttonColor="white"
    buttonBorder="purple"
    buttonLabelColor="purple"
  />
);
