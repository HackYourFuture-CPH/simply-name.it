import React from 'react';
import PageTitle from './PageTitle.component';
import { text, select } from '@storybook/addon-knobs';

export default {
  title: 'Components / Page Title',
  component: PageTitle,
};

export const TestTitle = () => (
  <PageTitle
    title={text('Title', ' Welcome ')}
    variant={select('Text color', ['white', 'black', 'black-large'])}
  />
);
