import React from 'react';
import PageTitle from './PageTitle.component';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'Components / Page Title',
  component: PageTitle,
};

export const TestTitle = () => (
  <PageTitle
    title={text('Title', ' Welcome ')}
    fontSize={text('Font-size', '60px')}
    fontWeight={text('Font-weight', 'bold')}
  />
);
