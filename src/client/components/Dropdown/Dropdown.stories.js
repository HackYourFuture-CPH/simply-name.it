import React from 'react';
import Dropdown from './Dropdown.component';

export default { title: 'Dropdown Menu/ Menu' };

export const DropdownDark = () => {
  return (
    <Dropdown variant="dark">
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
    <Dropdown variant="light">
      <ul>
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>
    </Dropdown>
  );
};
