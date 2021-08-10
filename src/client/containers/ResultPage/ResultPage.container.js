import React from 'react';
// import { useHistory } from 'react-router-dom';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import Confetti from '../../components/Confetti/Confetti.component';
import CardElement from '../../components/CandidateCardSingleElement/CandidateCard.component';

export default function Result() {
  // const history = useHistory();
  // const onClick=()=>{
  //   const path = '/Home';
  //   history.push(path);
  // }

  return (
    <div>
      <ArrowButton
        className="arrow-button"
        onClick={() => {
          console.log('clicked');
        }}
        backgroundColor="black"
      />
      <PageTitle title="Result" variant="black-large" />
      <Confetti />
      <CardElement
        display="hidden"
        variant="primary-color"
        dragdisplay="drag-hidden"
        position="position"
      />
    </div>
  );
}
