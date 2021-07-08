import React from 'react';
import PageTitle from './PageTitle.component';

export default {
  title: 'Components / Page Title',
  component: PageTitle,
};

export const TestTitle = () => (
  <PageTitle
    title=" Welcome"
    color="#ffffff"
    fontSize="200Px"
    fontWeight="bold"
    width="200px"
  />
);
