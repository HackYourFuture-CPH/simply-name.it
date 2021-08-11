// import React, { useState } from 'react';
import postData from './postData';

export default function AddCandidate(
  newCandidate,
  //   setNewCandidateName,
) {
  console.log(newCandidate);
  const response = postData(`/users/2/boards/1/candidates`, newCandidate.name);
  console.log(response);

  if (response) {
    console.log(`New candidate added`);
  } else {
    throw new Error(response.status);
  }
  //   setStateEmpty();
}

// const setStateEmpty = () => {
//   setNewCandidateName('');
// };
