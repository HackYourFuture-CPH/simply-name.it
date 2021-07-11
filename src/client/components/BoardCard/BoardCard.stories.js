import React from 'react';
import BoardCard from './BoardCard.component';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Dropdown from '../Dropdown/Dropdown.component';

export default {
  title: 'Components / Board Card',
};

export const testCard = () => (
  <BoardCard
    src={text(
      'Image',
      'https://www.forbes.com/health/wp-content/uploads/2021/05/baby_spit_up_1-getty_creative.jpg',
    )}
    width={text('Width', '400')}
    height={text('Height', '400')}
    boardTitle={text('Board title', 'Baby name')}
    fontSize={text('Font size', '40px')}
    fontWeight={text('Font weight', 'bold')}
  >
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
  </BoardCard>
);
