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
    await fetchFromDb(
      `${userId}/boards/${boardId}/candidates`,
      'post',
      candidateObject,
    );
    setIsCandidateLoading(true);
  } catch (error) {
    throw new Error(error);
  }
}
