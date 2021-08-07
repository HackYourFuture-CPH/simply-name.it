import React from 'react';
import './Header.styles.css';
import HeaderComponent from './Header.component.js';
import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Dropdown from '../Dropdown/Dropdown.component';
import ArrowButton from '../ArrowButton/ArrowButton.component';

export default {
  title: 'Components / HeaderComponent',
};

export const TestHeaderComponent = () => (
  <HeaderComponent variant={select('background-type', ['color', 'image'])}>
    <ArrowButton />
    <Dropdown
      variant="dark"
      visible={boolean('Menu Options', false)}
      onClick={action('clicked')}
    >
      <ul>
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>
    </Dropdown>
  </HeaderComponent>
);
