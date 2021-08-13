// import React, { useState } from 'react';
import postData from './postData';

export default async function AddCandidate(
  newCandidate,
  userId,
  boardId,
  setcandidateCardList,
  candidateCardList,
  setAddCandidateError,
  setAddCandidateSuccess,
) {
  console.log(newCandidate);

  try {
    if (!newCandidate.name) {
      setAddCandidateError('Please put a candidate name');
      return;
    }
    console.log(typeof newCandidate.name);
    if (!isNaN(newCandidate.name)) {
      setAddCandidateError('Candidate name can not be number');
      return;
    }

    const response = postData(
      `/api/users/${userId}/boards/${boardId}/candidates`,
      {
        name: newCandidate.name,
      },
    );
    setAddCandidateSuccess(true);
    setAddCandidateError(null);
    console.log(response);

    console.log(`New candidate added`);
    setcandidateCardList((prev) => {
      const addNewCandidate = {
        id:
          candidateCardList.length > 0
            ? candidateCardList[candidateCardList.length - 1].id + 1
            : 1,
        boardId,
        name: newCandidate.name,
      };
      console.log(candidateCardList);
      return [...prev, addNewCandidate];
    });
  } catch (error) {
    throw new Error(error);
  }
}
