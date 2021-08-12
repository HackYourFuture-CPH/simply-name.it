// import React, { useState } from 'react';
import postData from './postData';

export default function AddCandidate(newCandidate, userId, boardId) {
  console.log(newCandidate);

  const response = postData(
    `/api/users/${userId}/boards/${boardId}/candidates`,
    {
      name: newCandidate.name,
    },
  );
  console.log(response);

  if (response) {
    console.log(`New candidate added`);
  } else {
    throw new Error(response.status);
  }
}
