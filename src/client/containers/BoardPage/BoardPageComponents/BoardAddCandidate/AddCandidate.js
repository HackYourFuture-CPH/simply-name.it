import postData from './PostData';

export default async function AddCandidate(
  newCandidate,
  userId,
  boardId,
  setIsCandidateLoading,
) {
  try {
    await postData(`/api/users/${userId}/boards/${boardId}/candidates`, {
      name: newCandidate.name,
    });
    setIsCandidateLoading(true);
  } catch (error) {
    throw new Error(error);
  }
}
