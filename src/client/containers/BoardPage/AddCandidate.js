// import React, { useState } from 'react';
import postData from './postData';

export default function AddCandidate({
  newCandidate,
  //   setNewCandidateName,
}) {
  const response = postData(
    `/users/0/boards/${newCandidate.boardId}/candidates`,
    newCandidate.name,
  );
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
