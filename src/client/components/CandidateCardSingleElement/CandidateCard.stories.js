import React from 'react';
import CardElement from './CandidateCard.component';

export default {
  title: 'Components / Candidate Card Single Component',
  component: CardElement,
};
export const CardWithIconsBlue = () => {
  return <CardElement display="visible" variant="primary-color" />;
};
export const CardWithoutDeleteBlue = () => {
  return <CardElement display="hidden" variant="primary-color" />;
};
export const CardWithIconsGray = () => {
  return <CardElement display="visible" variant="secondary-color" />;
};
export const CardWithoutDeleteGray = () => {
  return <CardElement display="hidden" variant="secondary-color" />;
};
export const CardMiddleBlue = () => {
  return (
    <CardElement
      display="hidden"
      variant="primary-color"
      dragdisplay="drag-hidden"
      position="position"
    />
  );
};
export const CardMiddleGray = () => {
  return (
    <CardElement
      display="hidden"
      variant="secondary-color"
      dragdisplay="drag-hidden"
      position="position"
    />
  );
};
