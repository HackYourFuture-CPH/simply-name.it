import React from 'react';
import Dropdown from './Dropdown.component';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

export default { title: 'Dropdown Menu/ Menu' };

export const DropdownDark = () => {
  return (
    <Dropdown
      variant="dark"
      visible={boolean('visible', true)}
      onClick={action('clicked')}
    >
      <ul>
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>
    </Dropdown>
  );
};
export const DropdownLight = () => {
  return (
    <Dropdown
      variant="light"
      visible={boolean('visible', true)}
      onClick={action('clicked')}
    >
      <ul>
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>
    </Dropdown>
  );
};
