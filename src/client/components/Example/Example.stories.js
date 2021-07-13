import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import React from 'react';

import Example from './Example.component';

export default {
  title: 'Example Component',
  component: Example,
  argTypes: {
    onClick: { action: 'clicked' },
  },
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export const ExampleStory = () => (
  <Example
    title={text('Title', 'Test title')}
    onClick={action('You have clicked the button')}
  />
);
