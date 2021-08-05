import React from 'react';
import './HeaderComponent.styles.css';
import HeaderComponent from './HeaderComponent.component.js';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Dropdown from '../Dropdown/Dropdown.component';

export default {
  title: 'Components / HeaderComponent',
};

export const HeaderComponentWithPurpleBackground = () => (
  <HeaderComponent
    src={text('Image', 'https://i.ibb.co/n84WtZW/maxresdefault.jpg')}
    alt="purple-background"
  >
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

export const HeaderComponentWithoutPurpleBackground = () => (
  <HeaderComponent
    src={text(
      'Image',
      'https://i.ibb.co/nqysxTN/photo-1583710457367-47de0ea21fef.jpg',
    )}
    alt="baby-image"
  >
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
