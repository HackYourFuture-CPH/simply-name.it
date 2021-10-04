import { fetchFromDb } from '../../../fetchMethod/fetch';

export default async function AddCandidate(
  newCandidate,
  userId,
  boardId,
  setIsCandidateLoading,
) {
  try {
    const candidateObject = {
      name: newCandidate.name,
    };
    fetchFromDb(
      `${userId}/boards/${boardId}/candidates`,
      'post',
      candidateObject,
    ).then(() => setIsCandidateLoading(true));
  } catch (error) {
    console.log('addcandidate error', error);
    throw new Error(error);
  }
}
