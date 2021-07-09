import React from 'react';
import { action } from '@storybook/addon-actions';
import Checkbox from './CheckboxInput.component';
import { boolean, text } from '@storybook/addon-knobs';

export default {
  title: 'CheckboxInput',
  component: Checkbox,
};

export const checkboxInputList = () => (
  <Checkbox
    isDisabled={boolean('isDisabled')}
    onChange={action('selected')}
    labelText={text('labelText', 'Item')}
  />
);
