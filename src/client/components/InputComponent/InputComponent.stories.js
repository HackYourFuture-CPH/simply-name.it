import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import React from 'react';
import InputComponent from './InputComponent';

export default {
  title: 'Input Component',
  component: InputComponent,
  argTypes: { onChange: { action: 'changed' } },
};

export const DynamicInput = () => (
  <InputComponent
    type={select('Input Type', ['text', 'date', 'nmuber'], 'text')}
    placeholder={text('Placeholder', 'Add Name')}
    inputValue={text('Initial Input Value')}
    borderShape={select('Border Shape', ['curved', 'round'], 'curved')}
    theme={select('Theme', ['light', 'dark'], 'light')}
    showSearchIcon={boolean('Show Search Icon', false)}
    onChange={action('You have changed the input text content')}
  />
);

export const SearchInput = () => (
  <InputComponent
    placeholder="Search"
    borderShape="round"
    theme="light"
    showSearchIcon="true"
    onChange={action('You have changed the search input content')}
  />
);

export const BoardNameInput = () => (
  <InputComponent
    placeholder="Borad Name"
    borderShape="round"
    theme="light"
    onChange={action('You have changed the board name')}
  />
);

export const DateInput = () => (
  <InputComponent
    type="date"
    placeholder="Date"
    borderShape="round"
    theme="light"
    onChange={action('You have changed the date')}
  />
);
