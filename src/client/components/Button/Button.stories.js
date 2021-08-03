import React from 'react';
import Button from './Button.component';
import { action } from '@storybook/addon-actions';
import { text, select, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Components/Button',
  component: Button,
};

// buttonLabel, size, buttonType, disabled, onClick
export const DynamicButton = () => (
  <Button
    buttonLabel={text('button label')}
    buttonSize={select('button size', ['small', 'medium', 'large'], 'large')}
    buttonType={select('type', ['primary', 'secondary'], 'primary')}
    buttonDisabled={boolean('is disabled', false)}
    onClick={action('you clicked!')}
  />
);

export const PrimaryActive = () => (
  <Button
    buttonLabel={text('button label', 'text')}
    buttonSize={select('button size', ['small', 'medium', 'large'], 'large')}
    buttonType="primary"
    buttonDisabled={false}
    onClick={action('you clicked!')}
  />
);

export const PrimaryDisabled = () => (
  <Button
    buttonLabel={text('button label', 'text')}
    buttonSize={select('button size', ['small', 'medium', 'large'], 'large')}
    buttonType="primary"
    buttonDisabled={true}
    onClick={action('you clicked!')}
  />
);

export const SecondaryActive = () => (
  <Button
    buttonLabel={text('button label', 'text')}
    buttonSize={select('button size', ['small', 'medium', 'large'], 'large')}
    buttonType="secondary"
    buttonDisabled={false}
    onClick={action('you clicked!')}
  />
);

export const SecondaryDisabled = () => (
  <Button
    buttonLabel={text('button label', 'text')}
    buttonSize={select('button size', ['small', 'medium', 'large'], 'large')}
    buttonType="secondary"
    buttonDisabled={true}
    onClick={action('you clicked!')}
  />
);
