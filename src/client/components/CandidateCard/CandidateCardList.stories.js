import { text } from '@storybook/addon-knobs';

import React from 'react';

import CardList from './CandidateCardList';

export default {
  name: 'Eric',
  title: 'Components / Candidate Card List Component',
  component: CardList,
};

export const CardListExample = () => (
  <CardList name={text('name', 'candidate name')} />
);
