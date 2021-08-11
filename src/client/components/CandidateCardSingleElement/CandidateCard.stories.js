import React from 'react';
import CardElement from './CandidateCard.component';

export default {
  title: 'Components / Candidate Card Single Component',
  component: CardElement,
};
export const CardWithIconsBlue = () => {
  const candidate = ['SteveWilson'];
  return (
    <CardElement
      candidate={candidate}
      display="visible"
      variant="primary-color"
    />
  );
};
export const CardWithoutDeleteBlue = () => {
  const candidate = ['SteveWilson'];
  return (
    <CardElement
      candidate={candidate}
      display="hidden"
      variant="primary-color"
    />
  );
};
export const CardWithIconsGray = () => {
  const candidate = ['SteveWilson'];
  return (
    <CardElement
      candidate={candidate}
      display="visible"
      variant="secondary-color"
    />
  );
};
export const CardWithoutDeleteGray = () => {
  const candidate = ['PeterPeter'];
  return (
    <CardElement
      candidate={candidate}
      display="hidden"
      variant="secondary-color"
    />
  );
};
export const CardMiddleBlue = () => {
  const candidate = ['SteveWilson'];
  return (
    <CardElement
      candidate={candidate}
      display="hidden"
      variant="primary-color"
      dragdisplay="drag-hidden"
      position="position"
    />
  );
};
export const CardMiddleGray = () => {
  const candidate = ['Steve'];
  return (
    <CardElement
      candidate={candidate}
      display="hidden"
      variant="secondary-color"
      dragdisplay="drag-hidden"
      position="position"
    />
  );
};
