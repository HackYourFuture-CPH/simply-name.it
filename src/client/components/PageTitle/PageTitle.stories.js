import React from 'react';
import PageTitle from './PageTitle.component';
import { text, select, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Components / Page Title',
  component: PageTitle,
};

export const TestTitle = () => (
  <PageTitle
    title={text('Title', ' Welcome ')}
    fontSize={text('Font-size', '60px')}
    isBold={boolean('Bold', false)}
    colorVariant={select('Text color', ['White', 'Black'])}
  />
);
