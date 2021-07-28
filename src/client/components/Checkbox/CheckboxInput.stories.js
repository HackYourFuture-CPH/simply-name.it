import React, { useState } from 'react';
import { CheckboxContainer, CheckboxItem } from './CheckboxInput.component';

export default {
  option: 'Add member',
  title: 'CheckboxInput',
  component: CheckboxContainer,
};

const optionList = [
  {
    id: 1,
    description: 'Add contact',
    isChecked: false,
    isDisabled: false,
  },
  { id: 2, description: 'Block member', isChecked: false, isDisabled: false },
  { id: 3, description: 'Add member', isChecked: false, isDisabled: false },
];

export const CheckboxInputListExample = () => {
  const [optionListState, setOptionListState] = useState(optionList);

  function onCheckboxChange(id) {
    setOptionListState((prev) => {
      return prev.map((option) => {
        if (option.id === id) {
          return { ...option, isChecked: !option.isChecked };
        }
        return option;
      });
    });
  }

  return (
    <CheckboxContainer>
      {optionListState.map((option) => {
        return (
          <CheckboxItem
            key={option.id}
            id={option.id}
            description={option.description}
            isDisabled={option.isDisabled}
            isChecked={option.isChecked}
            onCheckboxChange={onCheckboxChange}
          />
        );
      })}
    </CheckboxContainer>
  );
};
