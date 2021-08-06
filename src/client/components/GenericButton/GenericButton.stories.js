import React from 'react';
import GenericButton from './GenericButton.component';
import { action } from '@storybook/addon-actions';
import { text, select, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Components/Generic Button',
  component: GenericButton,
};

export const DynamicButton = () => (
  <GenericButton
    buttonLabel={text('button label')}
    buttonSize={select('button size', ['small', 'medium', 'large'], 'large')}
    buttonType={select('type', ['primary', 'secondary'], 'primary')}
    buttonDisabled={boolean('is disabled', false)}
    onClick={action('you clicked!')}
  />
);

export const PrimaryActive = () => (
  <GenericButton
    buttonLabel={text('button label', 'text')}
    buttonSize={select('button size', ['small', 'medium', 'large'], 'large')}
    buttonType="primary"
    buttonDisabled={false}
    onClick={action('you clicked!')}
  />
);

export const PrimaryDisabled = () => (
  <GenericButton
    buttonLabel={text('button label', 'text')}
    buttonSize={select('button size', ['small', 'medium', 'large'], 'large')}
    buttonType="primary"
    buttonDisabled={true}
    onClick={action('you clicked!')}
  />
);

export const SecondaryActive = () => (
  <GenericButton
    buttonLabel={text('button label', 'text')}
    buttonSize={select('button size', ['small', 'medium', 'large'], 'large')}
    buttonType="secondary"
    buttonDisabled={false}
    onClick={action('you clicked!')}
  />
);

export const SecondaryDisabled = () => (
  <GenericButton
    buttonLabel={text('button label', 'text')}
    buttonSize={select('button size', ['small', 'medium', 'large'], 'large')}
    buttonType="secondary"
    buttonDisabled={true}
    onClick={action('you clicked!')}
  />
);
