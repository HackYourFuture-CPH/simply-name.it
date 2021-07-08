import { text } from '@storybook/addon-knobs';

import React from 'react';

import CardList from './CandidateCardList';

export default {
  title: 'Components / Candidate Card List Component',
  component: CardList,
};

export const Component = () => <CardList name={text('name', 'Test title')} />;
