import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import InputComponent from './InputComponent';

export default {
  title: 'Input Component',
  component: InputComponent,
  argTypes: { onChange: { action: 'changed' } },
};

function useMainType1() {
  const [inputValue, setInputValue] = useState('');
  return (
    <InputComponent
      placeholder="Type 1"
      borderShape="round"
      theme="light"
      inputValue={inputValue}
      onChange={(e) => {
        setInputValue(e);
        action('You have changed the input content')(e);
      }}
    />
  );
}

export const MainType1 = () => useMainType1();

function useMainType2() {
  const [inputValue, setInputValue] = useState('');
  return (
    <InputComponent
      placeholder="Type 2"
      borderShape="curved"
      theme="dark"
      inputValue={inputValue}
      onChange={(e) => {
        setInputValue(e);
        action('You have changed the input content')(e);
      }}
    />
  );
}

export const MainType2 = () => useMainType2();

function useDynamicInput() {
  const [inputValue, setInputValue] = useState('');
  return (
    <InputComponent
      type={select(
        'Input Type',
        ['text', 'date', 'number', 'password'],
        'text',
      )}
      placeholder={text('Placeholder', 'Add Name')}
      borderShape={select('Border Shape', ['curved', 'round'], 'curved')}
      theme={select('Theme', ['light', 'dark'], 'light')}
      inputValue={inputValue}
      showSearchIcon={boolean('Show Search Icon', false)}
      onChange={(e) => {
        setInputValue(e);
        action('You have changed the input content')(e);
      }}
    />
  );
}

export const DynamicInput = () => useDynamicInput();

function useSearchInput() {
  const [inputValue, setInputValue] = useState('');
  return (
    <InputComponent
      placeholder="Search"
      borderShape="round"
      theme="light"
      inputValue={inputValue}
      showSearchIcon={true}
      onChange={(e) => {
        setInputValue(e);
        action('You have changed the search input content')(e);
      }}
    />
  );
}

export const SearchInput = () => useSearchInput();

function useBoardNameInput() {
  const [inputValue, setInputValue] = useState('');
  return (
    <InputComponent
      placeholder="Board Name"
      borderShape="round"
      theme="light"
      inputValue={inputValue}
      onChange={(e) => {
        setInputValue(e);
        action('You have changed the input content')(e);
      }}
    />
  );
}

export const BoardNameInput = () => useBoardNameInput();

function useDateInput() {
  const [inputValue, setInputValue] = useState('');
  return (
    <InputComponent
      type="date"
      placeholder="Date"
      borderShape="round"
      theme="light"
      inputValue={inputValue}
      onChange={(e) => {
        setInputValue(e);
        action('You have changed the date input content')(e);
      }}
    />
  );
}

export const DateInput = () => useDateInput();

function useDateTimeInput() {
  const [inputValue, setInputValue] = useState('');
  return (
    <InputComponent
      type="datetime-local"
      placeholder="Date/Time"
      borderShape="round"
      theme="light"
      inputValue={inputValue}
      onChange={(e) => {
        setInputValue(e);
        action('You have changed the date/time input content')(e);
      }}
    />
  );
}

export const DateTimeInput = () => useDateTimeInput();

function usePasswordInput() {
  const [inputValue, setInputValue] = useState('');
  return (
    <InputComponent
      type="password"
      placeholder="Password"
      borderShape="round"
      theme="light"
      inputValue={inputValue}
      onChange={(e) => {
        setInputValue(e);
        action('You have changed the password input content')(e);
      }}
    />
  );
}

export const PasswordInput = () => usePasswordInput();
