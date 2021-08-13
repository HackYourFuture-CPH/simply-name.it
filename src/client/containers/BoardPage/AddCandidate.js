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
  try {
    if (!newCandidate.name) {
      setAddCandidateError('Please put a candidate name');
      return;
    }

    if (!isNaN(newCandidate.name)) {
      setAddCandidateError('Candidate name can not be number');
      return;
    }

    postData(`/api/users/${userId}/boards/${boardId}/candidates`, {
      name: newCandidate.name,
    });
    setAddCandidateSuccess(true);
    setAddCandidateError(null);

    setcandidateCardList((prev) => {
      const addNewCandidate = {
        id:
          candidateCardList.length > 0
            ? candidateCardList[candidateCardList.length - 1].id + 1
            : 1,
        boardId,
        name: newCandidate.name,
      };

      return [...prev, addNewCandidate];
    });
  } catch (error) {
    throw new Error(error);
  }
}
