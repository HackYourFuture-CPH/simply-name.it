import React from 'react';
import './HeaderComponent.styles.css';
import HeaderComponent from './HeaderComponent.component.js';
import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Dropdown from '../Dropdown/Dropdown.component';
import ArrowButton from '../ArrowButton/ArrowButton.component';

export default {
  title: 'Components / HeaderComponent',
};

export const HeaderComponentWithPurpleBackground = () => (
  <HeaderComponent variant={select('background-type', ['color', 'image'])}>
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
    <ArrowButton> </ArrowButton>
  </HeaderComponent>
);
