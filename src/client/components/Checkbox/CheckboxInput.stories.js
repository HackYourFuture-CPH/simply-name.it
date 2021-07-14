import React from 'react';
import { action } from '@storybook/addon-actions';
import CheckboxContainer from './CheckboxInput.component';
import { boolean, text } from '@storybook/addon-knobs';

export default {
  option: 'Add member',
  title: 'CheckboxInput',
  component: CheckboxContainer,
};

export const checkboxInputList = () => (
  <CheckboxContainer
    isDisabled={boolean('isDisabled')}
    onChange={action('selected')}
    labelText={text('labelText', 'labelText')}
  />
);
