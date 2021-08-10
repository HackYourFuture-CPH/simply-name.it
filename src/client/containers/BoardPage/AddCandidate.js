// import React, { useState } from 'react';
import postData from './postData';

export default function AddCandidate({
  newCandidate,
  //   setNewCandidateName,
}) {
  const response = postData('/:boardId/candidates', newCandidate);
  // console.log(response);

  if (response) {
    alert(`New candidate added`);
  } else {
    throw new Error(response.status);
  }
  //   setStateEmpty();
}

// const setStateEmpty = () => {
//   setNewCandidateName('');
// };
