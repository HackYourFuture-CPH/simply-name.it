import React from 'react';
import BoardMenuButton from './BoardMenuButton.component';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

export default {
  title: 'Components/BoardMenuButton',
  component: BoardMenuButton,
};

export const Boards = () => (
  <BoardMenuButton
    isDisabled={boolean('isDisabled', true)}
    onClick={action('clicked')}
    btnText={text('BtnText', 'Boards')}
  />
);
